import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, sat, majors, fundingTypes, selectedCountries, degrees } = body;

    // Kalitlarni dinamik ravishda tekshirish
    const apiKey = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;
    const isOpenAI = !!process.env.OPENAI_API_KEY;

    let aiRecommendations: any[] = [];

    // 1. Agar API Kalit mavjud bo'lsa - AI orqali real-time tahlil
    if (apiKey) {
      const apiUrl = isOpenAI 
        ? 'https://api.openai.com/v1/chat/completions' 
        : 'https://api.groq.com/openai/v1/chat/completions';
        
      const modelName = isOpenAI ? 'gpt-4o-mini' : 'llama-3.3-70b-versatile';

      const prompt = `
Siz xalqaro ta'lim va grantlar bo'yicha tahlilchisiz.
Foydalanuvchi profili:
- Ta'lim darajasi: ${degrees?.join(', ') || 'Bakalavr'}
- Soha: ${majors?.join(', ') || 'Umumiy'}
- GPA: ${schoolGrade} / 5.0
- IELTS: ${ielts || 'Yoq'}
- SAT: ${sat || 'Yoq'}
- Davlatlar: ${selectedCountries?.join(', ') || 'Barcha davlatlar'}
- Moliya turi: ${fundingTypes?.join(', ') || 'To\'liq grant'}

TALAB:
Foydalanuvchi profiliga mos keladigan (matchPercentage >= 50%) universitet va grantlarni tanlang (max 50 ta).
Match foizlari bo'yicha kamayish tartibida saralang.

JAVOBNI FAQAT SHU JSON FORMATIDA QAYTARING:
{
  "recommendations": [
    {
      "universityName": "Universitet rasmiy nomi (Inglizcha)",
      "country": "Davlat nomi",
      "category": "Match",
      "matchPercentage": 85,
      "fundingType": "To'liq grant",
      "degree": "Bakalavr",
      "domain": "universitet.edu",
      "reason": "Aniq va xolis tahlil sababi."
    }
  ]
}
`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          response_format: { type: 'json_object' }
        }),
      });

      const aiData = await response.json();
      if (aiData.choices && aiData.choices[0]?.message?.content) {
        const parsed = JSON.parse(aiData.choices[0].message.content);
        aiRecommendations = parsed.recommendations || [];
      }
    }

    // 2. Kalit bo'lmagan taqdirda — Ochiq Live API'dan dinamik qidiruv
    if (aiRecommendations.length === 0) {
      const countryParam = selectedCountries?.[0] 
        ? `country=${encodeURIComponent(selectedCountries[0])}` 
        : `name=University`;

      const liveRes = await fetch(`http://universities.hipolabs.com/search?${countryParam}`);
      const rawLiveList = await liveRes.json();

      const userIelts = parseFloat(ielts) || 0;
      const baseMatch = userIelts >= 6.5 ? 85 : 60;

      aiRecommendations = rawLiveList.slice(0, 50).map((u: any, idx: number) => {
        const calcMatch = Math.max(50, baseMatch - (idx % 15));
        return {
          universityName: u.name,
          country: u.country || selectedCountries?.[0] || 'Xalqaro',
          category: calcMatch >= 75 ? 'Match' : 'Safety',
          matchPercentage: calcMatch,
          fundingType: fundingTypes?.[0] || "To'liq grant",
          degree: degrees?.[0] || 'Bakalavr',
          domain: u.domains?.[0] || '',
          reason: `${majors?.[0] || 'Tanlangan'} sohasida dasturlar mavjud. Kirish imkoniyati yuqori.`
        };
      });
    }

    // 3. Dinamik metadata ulab natijani shakllantirish (Sayt, Logo, Rasm)
    const finalResults = await Promise.all(
      aiRecommendations
        .filter((item) => item.matchPercentage >= 50)
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        .slice(0, 50)
        .map(async (item) => {
          let website = '#';
          let logo = '';

          if (item.domain) {
            website = `https://${item.domain}`;
            logo = `https://logo.clearbit.com/${item.domain}`;
          } else {
            try {
              const hipoRes = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(item.universityName)}`);
              const hipoData = await hipoRes.json();
              if (hipoData && hipoData[0]) {
                website = hipoData[0].web_pages?.[0] || '#';
                const domain = hipoData[0].domains?.[0];
                if (domain) logo = `https://logo.clearbit.com/${domain}`;
              }
            } catch (e) {
              website = '#';
            }
          }

          return {
            ...item,
            website,
            logo,
            image: `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80`
          };
        })
    );

    return NextResponse.json({ recommendations: finalResults });

  } catch (err: any) {
    console.error('API Exec Error:', err);
    return NextResponse.json({ error: 'Xatolik yuz berdi: ' + err.message }, { status: 500 });
  }
}
