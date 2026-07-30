import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, majors, fundingTypes, degrees } = body;

    const selectedMajor = majors && majors.length > 0 ? majors[0] : 'IT va Kompyuter fanlari';
    const selectedFunding = fundingTypes && fundingTypes.length > 0 ? fundingTypes[0] : "To'liq Grant";
    const selectedDegree = degrees && degrees.length > 0 ? degrees[0] : 'Bakalavr';

    // Standart / Zaxira (Fallback) Natijalar - API key bo'lmasa ham muammosiz ishlaydi
    const fallbackRecommendations = [
      {
        universityName: 'KAIST (Korea Advanced Institute of Science and Technology)',
        country: 'Janubiy Koreya',
        category: 'Reach',
        matchPercentage: 88,
        fundingType: selectedFunding,
        degree: selectedDegree,
        reason: `${selectedMajor} sohasi bo'yicha dunyodagi eng kuchli universitetlardan biri. IELTS ${ielts || '7.0'} va a'lo baholar bilan 100% tuition waiver (oqish pulidan ozod) hamda oylik stipendiya olish imkoniyati yuqori.`
      },
      {
        universityName: 'Technical University of Munich (TUM)',
        country: 'Germaniya',
        category: 'Match',
        matchPercentage: 92,
        fundingType: "Bepul ta'lim",
        degree: selectedDegree,
        reason: `Germaniyada davlat universitetlarida o'qish bepul. ${selectedMajor} yo'nalishida Yevropada yetakchi. Bahoyingiz (${schoolGrade || '5'}) va IELTS ballingiz mos keladi.`
      },
      {
        universityName: 'University of Debrecen (Stipendium Hungaricum)',
        country: 'Vengriya',
        category: 'Safety',
        matchPercentage: 96,
        fundingType: "To'liq Grant (Stipendium)",
        degree: selectedDegree,
        reason: `Stipendium Hungaricum dasturi orqali fully-funded (oqish, turar joy va oylik stipendiya) sharoitga ega bo'lish uchun ideal variant.`
      }
    ];

    // Agar OpenAI/Gemini API key ulangan bo'lsa, AI'ga so'rov yuboramiz
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `Foydalanuvchi ma'lumotlari:
- Maktab bahosi: ${schoolGrade}
- IELTS: ${ielts}
- Tanlagan sohasi: ${selectedMajor}
- Daraja: ${selectedDegree}
- Moliyalashtirish turi: ${selectedFunding}

Ushbu foydalanuvchiga mos keladigan 3 ta chet el universitetini va ularning grantlarini tavsiya qil.
Javobni FAQAT QUYIDAGI JSON FORMATIDA QAYTAR (boshqa hech qanday matn yozma):
[
  {
    "universityName": "Universitet nomi",
    "country": "Davlat nomi",
    "category": "Reach" yoki "Match" yoki "Safety",
    "matchPercentage": 90,
    "fundingType": "Grant turi",
    "reason": "Nega mos kelishi haqida qisqa izoh"
  }
]`;

        const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
          })
        });

        const aiData = await aiRes.json();
        const content = aiData.choices?.[0]?.message?.content;

        if (content) {
          const parsed = JSON.parse(content);
          return NextResponse.json({ recommendations: parsed });
        }
      } catch (aiErr) {
        console.warn('AI API error, fallback data used:', aiErr);
      }
    }

    // AI API sozlanmagan bo'lsa zaxira ma'lumotlarni qaytaradi
    return NextResponse.json({ recommendations: fallbackRecommendations });

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
