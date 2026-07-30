import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      schoolGrade, 
      degrees, 
      fundingTypes, 
      majors, 
      selectedCountries, 
      ielts, 
      sat, 
      otherCertificates, 
      budget 
    } = body;

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json', // Javobni qat'iy JSON qilish
        temperature: 0.3,
      },
    });

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

Ushbu ma'lumotlarga mos keladigan universitet va grant takliflarini shakllantiring.
Javobingiz faqat va faqat quyidagi JSON schema formatida bo'lishi shart:
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

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsedData = JSON.parse(responseText || '{}');

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return NextResponse.json({ error: 'AI tahlilida xatolik yuz berdi' }, { status: 500 });
  }
}
