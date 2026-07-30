import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, degrees } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY muhit o'zgaruvchisi o'rnatilmagan!" },
        { status: 500 }
      );
    }

    const prompt = `
Siz oliy ta'lim va xalqaro grantlar bo'yicha dunyodagi eng tajribali AI analitiksiz.
Sizda dunyoning top-1000 universitetlari va unga o'rtacha kirgan talabalarning statistikasi (GPA, SAT, IELTS, acceptance rate) bo'yicha to'liq bilim mavjud.

FOYDALANUVCHI PROFILI:
- Ta'lim darajasi: ${degrees ? degrees.join(', ') : 'Bakalavr'}
- Qiziqqan sohasi: ${majors ? majors.join(', ') : 'Kompyuter fanlari va IT'}
- Maktab/Kollej bahosi (GPA): ${schoolGrade} / 5.0
- IELTS bali: ${ielts || 'Yo\'q'}
- SAT bali: ${sat || 'Yo\'q'}
- Tanlagan davlatlari: ${selectedCountries ? selectedCountries.join(', ') : 'Barcha davlatlar'}
- Qidirayotgan moliyalashtirish turi: ${fundingTypes ? fundingTypes.join(', ') : 'To\'liq moliyalash'}

SINOV VA MANTIQLIY TAHLIL QOIDALARI:
1. Ushbu profilni dunyodagi top 1000 ta universitetlarning o'rtacha qabul qilingan talabalari ko'rsatkichlari bilan solishtiring.
2. FAQAT VA FAQAT kirish ehtimoli (matchPercentage) 50% yoki undan YUQORI bo'lgan universitet va grant dasturlarini tanlang!
3. Agar top universitetlarga (masalan MIT, Oxford, Harvard) bu ko'rsatkich yetmasa, ularni UMUMAN ro'yxatga kiritmang (chunki ularga imkoniyat 50% dan past).
4. Saralash natijalarini 'matchPercentage' bo'yicha ENG YUQORI FOIZDAN ENG PAST FOIZGA qarab tartiblang (Descending order, masalan: 95%, 88%, 72%, 55%).
5. Kamida 4 ta, maksimal 8 ta mos universitet va grantni qaytaring.

JAVOB FORMATI (Strictly valid JSON):
{
  "recommendations": [
    {
      "universityName": "Universitet nomi va rasmiy nomi",
      "country": "Davlat",
      "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      "category": "Match" yoki "Safety",
      "matchPercentage": 92,
      "fundingType": "To'liq moliyalash",
      "degree": "Bakalavr",
      "reason": "Ushbu talabaning IELTS/SAT/GPA ko'rsatkichi nima uchun aynan shu universitet profiliga 50%+ mos kelishi haqida aniq tahliliy xulosa."
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
        temperature: 0.2,
      }),
    });

    const aiData = await response.json();
    
    if (!aiData.choices || aiData.choices.length === 0) {
      throw new Error("AI tahlilida xatolik yuz berdi");
    }

    let rawContent = aiData.choices[0].message.content.trim();
    if (rawContent.startsWith('```json')) {
      rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (rawContent.startsWith('```')) {
      rawContent = rawContent.replace(/```/g, '').trim();
    }

    const parsedData = JSON.parse(rawContent);

    // AI foiz bo'yicha to'g'ri saralaganini kafolatlash
    if (parsedData.recommendations && Array.isArray(parsedData.recommendations)) {
      parsedData.recommendations = parsedData.recommendations
        .filter((u: any) => u.matchPercentage >= 50)
        .sort((a: any, b: any) => b.matchPercentage - a.matchPercentage);
    }

    return NextResponse.json(parsedData);

  } catch (err: any) {
    console.error('AI Processing Error:', err);
    return NextResponse.json({ error: 'AI tahlil xatosi: ' + err.message }, { status: 500 });
  }
}
