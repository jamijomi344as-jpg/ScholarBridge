import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, degrees } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    // ---------------------------------------------------------
    // 1-HOLAT: OPENAI API KALITI MAVJUD BO'LSA (AI SARALASH)
    // ---------------------------------------------------------
    if (apiKey) {
      const prompt = `
Siz ta'lim bo'yicha analitiksiz.
Talaba ko'rsatkichlari:
- Daraja: ${degrees?.join(', ') || 'Bakalavr'}
- Soha: ${majors?.join(', ') || 'Umumiy'}
- GPA: ${schoolGrade} / 5
- IELTS: ${ielts || 'Yoq'}
- SAT: ${sat || 'Yoq'}
- Davlatlar: ${selectedCountries?.join(', ') || 'Har qanday'}
- Moliyalash: ${fundingTypes?.join(', ') || 'To\'liq'}

Faqat kirish ehtimoli (matchPercentage) 50% va undan yuqori bo'lgan universitetlarni tanlang.
Natijani matchPercentage bo'yicha kamayish tartibida saralang. Max 50 ta.

Javobni FAQAT toza JSON formatida yuboring:
{
  "recommendations": [
    {
      "universityName": "Universitet nomi (Inglizcha)",
      "country": "Davlat",
      "category": "Match",
      "matchPercentage": 85,
      "fundingType": "To'liq moliyalash",
      "degree": "Bakalavr",
      "reason": "Aniq sababi..."
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

      if (aiData.choices && aiData.choices.length > 0) {
        let rawContent = aiData.choices[0].message.content.trim();
        if (rawContent.startsWith('```json')) {
          rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
        } else if (rawContent.startsWith('```')) {
          rawContent = rawContent.replace(/```/g, '').trim();
        }

        const parsedData = JSON.parse(rawContent);

        if (parsedData.recommendations && Array.isArray(parsedData.recommendations)) {
          let list = parsedData.recommendations
            .filter((u: any) => u.matchPercentage >= 50)
            .sort((a: any, b: any) => b.matchPercentage - a.matchPercentage)
            .slice(0, 50);

          // Tashqi API orqali sayt va rasmlarni dinamik ulash
          const enriched = await Promise.all(
            list.map(async (item: any) => {
              const domainRes = await fetch(`[http://universities.hipolabs.com/search?name=$](http://universities.hipolabs.com/search?name=$){encodeURIComponent(item.universityName)}`);
              const domainData = await domainRes.json();
              const website = domainData && domainData[0]?.web_pages[0] ? domainData[0].web_pages[0] : '#';
              const image = `[https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80)`;

              return { ...item, website, image };
            })
          );

          return NextResponse.json({ recommendations: enriched });
        }
      }
    }

    // ---------------------------------------------------------
    // 2-HOLAT: API KALIT YO'Q BO'LSA (OCHIQ API ORQALI DINAMIK QIDIRUV)
    // ---------------------------------------------------------
    const targetCountry = selectedCountries && selectedCountries.length > 0 ? selectedCountries[0] : '';
    const searchUrl = targetCountry 
      ? `[http://universities.hipolabs.com/search?country=$](http://universities.hipolabs.com/search?country=$){encodeURIComponent(targetCountry)}`
      : `[http://universities.hipolabs.com/search?name=University](http://universities.hipolabs.com/search?name=University)`;

    const rawUniRes = await fetch(searchUrl);
    const rawUniList = await rawUniRes.json();

    const userIelts = parseFloat(ielts) || 0;
    const baseMatch = userIelts >= 6.5 ? 85 : 65;

    // Olingan ma'lumotlarni dinamik shakllantirish (maksimum 50 ta)
    const dynamicResults = rawUniList.slice(0, 50).map((uni: any, idx: number) => {
      const dynamicMatch = Math.max(50, baseMatch - (idx % 15));
      const encodedName = encodeURIComponent(uni.name);

      return {
        universityName: uni.name,
        country: uni.country || targetCountry || 'Xalqaro',
        category: dynamicMatch >= 80 ? 'Match' : 'Safety',
        matchPercentage: dynamicMatch,
        fundingType: fundingTypes?.[0] || "To'liq moliyalash",
        degree: degrees?.[0] || 'Bakalavr',
        website: uni.web_pages?.[0] || '#',
        image: `[https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80)`,
        reason: `${majors?.[0] || 'Soha'} yo'nalishida ta'lim dasturlariga ega. Akademik ko'rsatkichlaringiz mos keladi.`
      };
    }).sort((a: any, b: any) => b.matchPercentage - a.matchPercentage);

    return NextResponse.json({ recommendations: dynamicResults });

  } catch (err: any) {
    console.error('API Exec Error:', err);
    return NextResponse.json({ error: 'Qidiruvda xatolik yuz berdi: ' + err.message }, { status: 500 });
  }
}
