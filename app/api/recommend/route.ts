import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, userOriginCountry } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY sozlanmagan! Render Environment Variables bo'limini tekshiring." },
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

    // Google Gemini API so'rovi (gemini-2.5-flash va v1beta bilan)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        }),
      }
    );

    // Agar so'rov muvaffaqiyatsiz bo'lsa (masalan 404 yoki 400 status kelsa)
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API RAW Error Response:', errorText);
      
      let parsedError = 'Gemini API so‘rovida xatolik yuz berdi';
      try {
        const errJson = JSON.parse(errorText);
        parsedError = errJson?.error?.message || parsedError;
      } catch (e) {
        // HTTP HTML error page bo'lsa
        parsedError = `Gemini Server Error (Status ${response.status})`;
      }

      return NextResponse.json(
        { error: parsedError },
        { status: 400 }
      );
    }

    const data = await response.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      return NextResponse.json({ error: "Gemini AI bo'sh javob qaytardi." }, { status: 400 });
    }

    const recommendations = JSON.parse(rawContent);
    return NextResponse.json({ recommendations });

  } catch (error: any) {
    console.error('API Catch Error:', error);
    return NextResponse.json(
      { error: 'Server Catch Xatosi: ' + error.message },
      { status: 500 }
    );
  }
}
