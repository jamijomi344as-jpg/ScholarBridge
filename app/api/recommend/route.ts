import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, userOriginCountry } = body;

    // Render'dagi GEMINI_API_KEY ni olamiz
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY sozlanmagan. Render Dashboard'ni tekshiring." },
        { status: 500 }
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

    // Google Gemini API v1beta so'rovi (JSON Mode yoqilgan)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
            responseMimeType: 'application/json', // Bu parametr javobni STRICT JSON qiladi
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Gemini API Error:', data);
      return NextResponse.json(
        { error: data.error?.message || `Gemini API xatoligi: ${response.statusText}` },
        { status: 500 }
      );
    }

    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      return NextResponse.json({ error: "Gemini AI bo'sh javob qaytardi." }, { status: 500 });
    }

    const recommendations = JSON.parse(rawContent);

    return NextResponse.json({ recommendations });
  } catch (error: any) {
    console.error('API Catch Error:', error);
    return NextResponse.json(
      { error: 'Serverda ichki xatolik: ' + error.message },
      { status: 500 }
    );
  }
}
