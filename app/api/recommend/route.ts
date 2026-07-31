import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, userOriginCountry } = body;

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY topilmadi! Render Environment Variables bo'limini tekshiring." },
        { status: 400 }
      );
    }

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

Quyidagi JSON strukturasida javob qaytar:
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

    // Hozirgi kunda Google AI Studio da ishlaydigan barcha faol modellar iyerarxiyasi
    const models = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-2.5-pro',
      'gemini-1.5-flash-8b'
    ];

    let lastErrorMessage = '';

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.7,
              },
            }),
          }
        );

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          const rawContent = data.candidates[0].content.parts[0].text;
          const recommendations = JSON.parse(rawContent);
          return NextResponse.json({ recommendations });
        } else if (data.error?.message) {
          lastErrorMessage = `[${model}]: ${data.error.message}`;
        }
      } catch (err: any) {
        lastErrorMessage = `[${model}]: ${err.message}`;
      }
    }

    return NextResponse.json(
      { error: `Gemini API Xatosi (Barcha modellar tekshirildi): ${lastErrorMessage}` },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Catch Error:', error);
    return NextResponse.json(
      { error: 'Server Catch Xatosi: ' + error.message },
      { status: 500 }
    );
  }
}
