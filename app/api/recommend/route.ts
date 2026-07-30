import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, userOriginCountry } = body;

    const apiKey = process.env.GROK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROK_API_KEY sozlanmagan. Iltimos, .env.local yoki Server Environment'ga GROK_API_KEY joylang." },
        { status: 500 }
      );
    }

    // Prompt matnini xavfsiz shaklga keltiramiz
    const prompt = `
Abituriyent profili:
- O'rtacha bahosi (GPA): ${schoolGrade} (5 ballik sistemada)
- IELTS balli: ${ielts}
- SAT balli: ${sat || 'Mavjud emas'}
- Qiziqqan yo'nalishlari: ${majors ? majors.join(', ') : 'Ko"rsatilmadi'}
- Kerakli grant turi (Funding): ${fundingTypes ? fundingTypes.join(', ') : 'To"liq grant'}
- Yashash davlati: ${userOriginCountry || 'Uzbekistan'}
- Tanlangan target davlatlar: ${selectedCountries ? selectedCountries.join(', ') : 'Barcha davlatlar'}

Vazifa:
Ushbu abituriyent profili va imkoniyatlariga to'liq mos keladigan EXACTLY 5 ta eng yaxshi xalqaro universitet va grant dasturlarini tahlil qilib ber.

Quyidagi strukturada faqat va faqat strictly valid JSON array shaklida javob qaytar. Hech qanday qo'shimcha tushuntirish, salomlashish yoki markdown bezak yozma:
[
  {
    "id": 1,
    "universityName": "Universitet nomi",
    "country": "Davlat nomi",
    "category": "safety",
    "matchPercentage": 92,
    "reason": "Nega aynan bu universitet va grant mos kelishi haqida qisqa xulosa",
    "description": "Universitet haqida batafsil ma'lumot: Qanday grant beradi, turar joy va qabul imkoniyatlari.",
    "scholarshipName": "Aynan taklif etilayotgan grant yoki stipendiya nomi",
    "website": "https://universitet-rasmiy-sayti.edu"
  }
]
`;

    // xAI (Grok) API ga so'rov yuborish
    const response = await fetch('https://api.xai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-2-latest',
        messages: [
          {
            role: 'system',
            content: 'Siz xalqaro universitetlar va grantlar bo‘yicha professional konsultantsiz. Faqat ko‘rsatilgan formatdagi valid JSON array qaytarasiz.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Grok API Error Response:', data);
      return NextResponse.json(
        { error: data.error?.message || `Grok API xatoligi: ${response.statusText}` },
        { status: response.status }
      );
    }

    const rawContent = data.choices[0].message.content;

    // AI qaytargan javobdan markdown teglarni tozalash
    const cleanJson = rawContent
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const recommendations = JSON.parse(cleanJson);

    return NextResponse.json({ recommendations });
  } catch (error: any) {
    console.error('API Catch Error:', error);
    return NextResponse.json(
      { error: 'Universitetlarni tahlil qilishda xatolik yuz berdi: ' + error.message },
      { status: 500 }
    );
  }
}
