import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, degrees } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    // Agar OpenAI API Key o'rnatilmagan bo'lsa, xatolik qaytarish yoki fallback ishlatish
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API kaliti .env.local faylida topilmadi!" },
        { status: 500 }
      );
    }

    const prompt = `
Siz xalqaro universitetlar va grantlar bo'yicha ekspert AI assistentisiz. 
Foydalanuvchi profil ma'lumotlari:
- Ta'lim darajasi: ${degrees ? degrees.join(', ') : 'Bakalavr'}
- Yo'nalishi / Soha: ${majors ? majors.join(', ') : 'IT'}
- Maktab/Kollej bahosi: ${schoolGrade} (5 ballik tizimda)
- IELTS bali: ${ielts || 'Topshirilmagan'}
- SAT bali: ${sat || 'Topshirilmagan'}
- Qiziqqan mamlakatlari: ${selectedCountries ? selectedCountries.join(', ') : 'Barcha davlatlar'}
- Moliyalashtirish turi: ${fundingTypes ? fundingTypes.join(', ') : "To'liq moliyalash"}

VAZIPA:
Ushbu foydalanuvchining REAL imkoniyatlarini xolis va qat'iy baholang.
Misol uchun: MIT, Harvard kabi top-10 universitetlarga IELTS 7.0 va SAT 1350 bilan kirish imkoniyati 85% bo'la olmaydi (maksimum 15-20% bo'lishi mumkin). SAT 1350 top universitetlar uchun past ko'rsatkich. 

Iltimos, foydalanuvchi tanlagan kriteriyalarga mos keladigan 4 ta REAL universitet va grant dasturini tanlang va har biri uchun quyidagi JSON formatida aniq tahlil qaytaring. Response FAQAT toza JSON formatida bo'lsin, boshqa hech qanday ortiqcha tekst yozmang!

JSON Formati:
{
  "recommendations": [
    {
      "universityName": "Universitet nomi",
      "country": "Mamlakat",
      "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      "category": "Reach" | "Match" | "Safety",
      "matchPercentage": 35,
      "fundingType": "To'liq moliyalash / Qisman / ...",
      "degree": "Bakalavr",
      "reason": "Nima uchun ushbu ko'rsatkich berilganligi va foydalanuvchi nimani oshirishi kerakligi haqida qisqa real ekspert xulosasi."
    }
  ]
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      }),
    });

    const aiData = await response.json();
    
    if (!aiData.choices || aiData.choices.length === 0) {
      throw new Error("AI dan javob olishda xatolik");
    }

    let rawContent = aiData.choices[0].message.content.trim();
    // JSON dagi backtick (```json) belgilarni tozalash
    if (rawContent.startsWith('```json')) {
      rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (rawContent.startsWith('```')) {
      rawContent = rawContent.replace(/```/g, '').trim();
    }

    const parsedData = JSON.parse(rawContent);

    return NextResponse.json(parsedData);

  } catch (err: any) {
    console.error('AI Processing Error:', err);
    return NextResponse.json({ error: 'AI tahlilida xatolik yuz berdi: ' + err.message }, { status: 500 });
  }
}
