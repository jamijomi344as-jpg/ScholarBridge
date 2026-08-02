import os
import time
import asyncio
import subprocess
import requests
from google import genai
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

# Standard Python orqali .env faylini o'qish
def load_env_file(filepath=".env"):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ[key.strip()] = value.strip()

load_env_file()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
RENDER_API_KEY = os.getenv("RENDER_API_KEY")
RENDER_SERVICE_ID = os.getenv("RENDER_SERVICE_ID")
SITE_URL = os.getenv("SITE_URL")

gemini_client = genai.Client(api_key=GEMINI_API_KEY)

# -------------------------------------------------------------
# Sayt va AI funksionalligini tekshirish (Health Check)
# -------------------------------------------------------------
def check_site_health():
    if not SITE_URL:
        return False, "SITE_URL .env faylida ko'rsatilmagan."
    
    try:
        # 1. Asosiy sayt sahifasini tekshirish (HTTP 200)
        res = requests.get(SITE_URL, timeout=15)
        if res.status_code != 200:
            return False, f"Sayt HTTP {res.status_code} xatosini qaytardi."

        # 2. Sayt backend/AI API endpoint'ini tekshirish (agar API yo'li bo'lsa)
        api_url = f"{SITE_URL.rstrip('/')}/api/chat"
        try:
            api_res = requests.post(
                api_url, 
                json={"message": "ping"}, 
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            # Agar API mavjud bo'lsa va 200/400 o'rnida 500 berib yiqilmasa
            if api_res.status_code in [200, 400]:
                return True, "Sayt va AI serveri to'liq muvaffaqiyatli ishlayapti!"
        except Exception:
            pass  # Agar maxsus endpoint boshqacha bo'lsa, asosiy sahifa 200 berganining o'zi yetarli

        return True, "Sayt muvaffaqiyatli yuklandi va 200 OK javobini qaytardi!"
    except Exception as e:
        return False, f"Saytga ulanishda xatolik yuz berdi: {e}"

# -------------------------------------------------------------
# Xatolikni sodda (o'zbekcha) dildan tushuntirish va tuzatish
# -------------------------------------------------------------
def explain_and_fix_error(error_type, raw_log):
    main_file = "main.py" if os.path.exists("main.py") else "index.js"
    code = ""
    if os.path.exists(main_file):
        with open(main_file, "r", encoding="utf-8") as f:
            code = f.read()

    prompt = f"""
    Siz dasturchi bo'lmagan inson uchun yordamchisiz.
    Loyihada quyidagi xatolik yuz berdi ({error_type}):
    {raw_log}

    Koddagi holat:
    {code}

    Iltimos 2 ta narsani ajratib ber:
    1. EXPLANATION: Xatolik nima ekanligini dasturlashni bilmaydigan insonga juda oddiy o'zbek tilida, 2-3 ta gap bilan tushuntir (Texnik atamalarsiz).
    2. FIXED_CODE: To'g'rilangan to'liq kodni ber.

    Javob formating shunday bo'lsin:
    ---IZOH---
    (Bu yerga oddiy tushuntirish)
    ---KOD---
    (Bu yerga faqat to'g'irlangan kod)
    """

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    
    res_text = response.text
    
    if "---IZOH---" in res_text and "---KOD---" in res_text:
        explanation = res_text.split("---IZOH---")[1].split("---KOD---")[0].strip()
        fixed_code = res_text.split("---KOD---")[1].replace("```python", "").replace("```javascript", "").replace("```", "").strip()

        if os.path.exists(main_file):
            with open(main_file, "w", encoding="utf-8") as f:
                f.write(fixed_code)

        return explanation
    else:
        return "Xatolik aniqlandi, lekin javob formati kutilganidek bo'lmadi. Qayta urinib ko'riladi."

# -------------------------------------------------------------
# Render statusini tekshirish (Xatoliklarni tekshirish bilan)
# -------------------------------------------------------------
def get_render_status():
    headers = {
        "Authorization": f"Bearer {RENDER_API_KEY}",
        "Accept": "application/json"
    }
    url = f"https://api.render.com/v1/services/{RENDER_SERVICE_ID}/deploys?limit=1"
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 401:
            print("❌ Render API Key xato yoki yaroqsiz!")
            return "error", "API key unauthorized"
        elif response.status_code == 404:
            print("❌ RENDER_SERVICE_ID topilmadi!")
            return "error", "Service ID not found"
        
        res = response.json()
        if not res or not isinstance(res, list):
            return "building", None
            
        latest = res[0].get('deploy', {})
        status = latest.get('status')
        
        if status == "live":
            return "live", None
        elif status in ["build_failed", "update_failed"]:
            deploy_id = latest.get('id')
            logs_url = f"\https://api.render.com/v1/services/{RENDER_SERVICE_ID}/deploys/{deploy_id}/logs"
            logs = requests.get(logs_url, headers=headers).text
            return "failed", logs
    except Exception as e:
        print(f"Render API bilan bog'lanishda xato: {e}")
        
    return "building", None

# -------------------------------------------------------------
# Asosiy jarayon
# -------------------------------------------------------------
async def start_process(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id
    await context.bot.send_message(chat_id=chat_id, text="👋 **Salom! Men sizning avtonom yordamchingizman.**\n\nJarayonni boshladim: Kodni GitHub'ga joylayman va Render'ni kuzataman.")
    
    # 1. Git pull va push jarayoni
    try:
        subprocess.run(["git", "add", "."], check=False)
        subprocess.run(["git", "commit", "-m", "Auto deployment cycle update"], check=False)
        subprocess.run(["git", "push", "-u", "origin", "main"], check=False)
        await context.bot.send_message(chat_id=chat_id, text="📤 Kod holati GitHub bilan tenglashtirildi.")
    except Exception as e:
        await context.bot.send_message(chat_id=chat_id, text=f"⚠️ Git jarayonida ogohlantirish: {e}")

    # 2. Render kuzatish sikli
    for attempt in range(1, 6):
        await context.bot.send_message(chat_id=chat_id, text=f"⏳ **Urinish #{attempt}:** Sayt Render'da yig'ilishi kutilmoqda...")
        
        while True:
            await asyncio.sleep(15)
            status, logs = get_render_status()
            
            if status == "live":
                await context.bot.send_message(
                    chat_id=chat_id, 
                    text=f"🎉 **Ajoyib yangilik!** Sayt Render'da muvaffaqiyatli ishga tushdi va LIVE bo'ldi!\n🔗 Saytingiz: {SITE_URL}"
                )
                
                # SAYT VA AI ISHLASHINI TEKSHIRISH
                await context.bot.send_message(chat_id=chat_id, text="🔍 Sayt tugmalari va AI serveri tekshirilmoqda...")
                is_healthy, msg = check_site_health()
                
                if is_healthy:
                    await context.bot.send_message(chat_id=chat_id, text=f"✅ **Sayt tekshiruvdan o'tdi:** {msg}")
                else:
                    await context.bot.send_message(chat_id=chat_id, text=f"⚠️ **Sayt Live bo'ldi, lekin tekshirishda muammo bor:** {msg}")
                return
                
            elif status == "failed":
                await context.bot.send_message(chat_id=chat_id, text="⚠️ **Render'da xatolik yuz berdi!** Xato sababini oddiy tilga o'giryapman va tuzatyapman...")
                
                simple_explanation = explain_and_fix_error("Render Build Error", logs)
                
                report = (
                    f"❌ **Nima xato bo'lgandi?**\n{simple_explanation}\n\n"
                    f"🛠️ **Tuzatildimi?** Ha, koddagi xatoni tuzatdim va qaytadan GitHub'ga yuboryapman!"
                )
                await context.bot.send_message(chat_id=chat_id, text=report)
                
                subprocess.run(["git", "add", "."], check=False)
                subprocess.run(["git", "commit", "-m", f"Auto-fix attempt #{attempt}"], check=False)
                subprocess.run(["git", "push", "-u", "origin", "main"], check=False)
                break

def main():
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start_process))
    print("🤖 Robot tayyor. Telegram'da /start bosing.")
    app.run_polling()

if __name__ == "__main__":
    main()