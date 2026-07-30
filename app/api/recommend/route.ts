import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      schoolGrade, // 5 ballik tizim bo'yicha (masalan: 4.8 yoki 5.0)
      degrees, // array: ['Bakalavr', 'Magistratura']
      fundingTypes, // array: ["To'liq moliyalash", "Stipendiya"]
      majors, // array: ['Kompyuter fanlari va IT', 'Biznes']
      selectedCountries, // array: ['AQSh', 'Buyuk Britaniya', 'Barcha davlatlar']
      ielts, // string (ixtiyoriy)
      sat, // string (ixtiyoriy)
      otherCertificates, // string (ixtiyoriy)
      budget // string
    } = body;

    const prompt = `
Siz xalqaro universitet va grantlar bo'yicha professional maslahatchisiz.
Foydalanuvchi ma'lumotlari:
- Maktab bahosi: ${schoolGrade} / 5.0 (O'zbekiston baholash tizimi)
- Maqsadi bo'lgan daraja(lar): ${degrees?.length ? degrees.join(', ') : 'Bakalavr'}
- Moliyalashtirish turi: ${fundingTypes?.length ? fundingTypes.join(', ') : 'Har qanday'}
- Qiziqqan sohalari: ${majors?.length ? majors.join(', ') : 'Barcha sohalar'}
- Tanlangan davlatlar: ${selectedCountries?.length ? selectedCountries.join(', ') : 'Barcha davlatlar'}
- IELTS: ${ielts || 'Topshirmagan'}
- SAT: ${sat || 'Topshirmagan'}
- Boshqa sertifikatlar: ${otherCertificates || 'Mavjud emas'}
- Yillik maksimum byudjet: $${budget || '0'}

Ushbu ma'lumotlarga mos кеladigan universitet va grant takliflarini shakllantiring.
Javobingiz faqat va faqat quyidagi JSON formatida bo'lishi shart:
{
  "recommendations": [
    {
      "universityName": "Universitet nomi",
      "country": "Davlat nomi",
      "degree": "Daraja (masalan: Bakalavr)",
      "category": "Reach" | "Match" | "Safety",
      "matchPercentage": 85,
      "fundingType": "To'liq moliyalash / Qisman / Grant",
      "annualTuition": "$0 - $10,000",
      "availableScholarships": ["Scholarship nomi 1", "Scholarship nomi 2"],
      "reason": "Ushbu talabaga nega mos kelishi haqida aniq 2 ta gap."
    }
  ]
}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: 'AI tahlilida xatolik yuz berdi' }, { status: 500 });
  }
}
