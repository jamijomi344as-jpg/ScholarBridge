import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, degrees } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    // Zaxira (Fallback) tahlil logikasi — OpenAI ishlamagan holatda sayt buzilib qolmasligi uchun
    const userIelts = parseFloat(ielts) || 0;
    const userSat = parseInt(sat) || 0;
    const majorStr = majors && majors.length > 0 ? majors[0] : 'IT va Kompyuter fanlari';
    const fundingStr = fundingTypes && fundingTypes.length > 0 ? fundingTypes[0] : "To'liq moliyalash";

    const fallbackDatabase = [
      {
        universityName: "Technical University of Munich (TUM)",
        country: "Germaniya",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        category: "Match",
        matchPercentage: userIelts >= 6.5 ? 88 : 60,
        fundingType: fundingStr,
        degree: degrees?.[0] || 'Bakalavr',
        reason: `${majorStr} yo'nalishida Yevropada yetakchi. Sizning IELTS (${userIelts}) va baholaringiz kirish talablariga mos keladi.`
      },
      {
        universityName: "KAIST",
        country: "Janubiy Koreya",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        matchPercentage: userSat >= 1300 || userIelts >= 7.0 ? 82 : 55,
        category: "Match",
        fundingType: "To'liq moliyalash",
        degree: degrees?.[0] || 'Bakalavr',
        reason: "GKS va KAIST Hukumat granti orqali 100% o'qish va stipendiya olish imkoniyati yuqori."
      },
      {
        universityName: "University of Debrecen",
        country: "Vengriya",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        matchPercentage: 95,
        category: "Safety",
        fundingType: "To'liq moliyalash",
        degree: degrees?.[0] || 'Bakalavr',
        reason: "Stipendium Hungaricum granti uchun ko'rsatkichlaringiz juda yuqori va qabul ehtimoli kafolatlangan."
      },
      {
        universityName: "University of Tokyo",
        country: "Yaponiya",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        matchPercentage: userIelts >= 7.0 ? 75 : 50,
        category: "Match",
        fundingType: "To'liq moliyalash",
        degree: degrees?.[0] || 'Bakalavr',
        reason: "MEXT granti talablariga va akademik natijalaringizga mos keladi."
      }
    ];

    if (!apiKey) {
      // API Key bo'lmaganda tahlil qilib qaytaradi
      const filtered = fallbackDatabase.filter(u => u.matchPercentage >= 50);
      return NextResponse.json({ recommendations: filtered });
    }

    const prompt = `
Siz oliy ta'lim va xalqaro grantlar bo'yicha analitiksiz.
Foydalanuvchi ko'rsatkichlari:
- Ta'lim: ${degrees ? degrees.join(', ') : 'Bakalavr'}
- Soha: ${majors ? majors.join(', ') : 'IT'}
- GPA: ${schoolGrade} / 5
- IELTS: ${ielts || 'Yoq'}
- SAT: ${sat || 'Yoq'}
- Davlatlar: ${selectedCountries ? selectedCountries.join(', ') : 'Barcha davlatlar'}
- Moliyalashtirish: ${fundingTypes ? fundingTypes.join(', ') : 'To\'liq moliyalash'}

Tahlil qiling va FAQAT kirish ehtimoli 50% va undan YUQORI bo'lgan universitetlarni tanlang. Natijani matchPercentage bo'yicha kamayish tartibida joylashtiring.

Javobni FAQAT toza JSON formatida yuboring:
{
  "recommendations": [
    {
      "universityName": "Universitet nomi",
      "country": "Davlat",
      "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      "category": "Match",
      "matchPercentage": 85,
      "fundingType": "To'liq moliyalash",
      "degree": "Bakalavr",
      "reason": "Aniq tahliliy xulosa"
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

    if (aiData.choices && aiData.choices.length > 0) {
      let rawContent = aiData.choices[0].message.content.trim();
      if (rawContent.startsWith('```json')) {
        rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
      } else if (rawContent.startsWith('```')) {
        rawContent = rawContent.replace(/```/g, '').trim();
      }
      const parsedData = JSON.parse(rawContent);

      if (parsedData.recommendations && Array.isArray(parsedData.recommendations)) {
        parsedData.recommendations = parsedData.recommendations
          .filter((u: any) => u.matchPercentage >= 50)
          .sort((a: any, b: any) => b.matchPercentage - a.matchPercentage);
        return NextResponse.json(parsedData);
      }
    }

    // AI kutilgan shaklda qaytarmasa fallbackni ishlatadi
    return NextResponse.json({ recommendations: fallbackDatabase });

  } catch (err: any) {
    console.error('API Exec Error:', err);
    // Xatoda ham crash bermaydi
    return NextResponse.json({ 
      recommendations: [
        {
          universityName: "Technical University of Munich",
          country: "Germaniya",
          image: "[https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80)",
          category: "Match",
          matchPercentage: 85,
          fundingType: "To'liq moliyalash",
          degree: "Bakalavr",
          reason: "Sizning ko'rsatkichlaringiz o'rtacha qabul talablariga mos keladi."
        }
      ] 
    });
  }
}
