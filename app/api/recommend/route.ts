import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schoolGrade, ielts, majors, fundingTypes, selectedCountries, degrees } = body;

    const major = majors && majors.length > 0 ? majors[0] : 'IT va Kompyuter fanlari';
    const funding = fundingTypes && fundingTypes.length > 0 ? fundingTypes[0] : "To'liq moliyalash";
    const degree = degrees && degrees.length > 0 ? degrees[0] : 'Bakalavr';
    
    // Universitetlar bazasi (Dinamik tanlov uchun)
    const database = [
      {
        name: "MIT (Massachusetts Institute of Technology)",
        country: "AQSH",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        match: 85,
        cat: "Reach",
        desc: `${major} yo'nalishida dunyoda #1-o'rin. Need-blind va 100% moliyaviy yordam mavjud.`
      },
      {
        name: "Technical University of Munich (TUM)",
        country: "Germaniya",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        match: 94,
        cat: "Match",
        desc: `Germaniyada bepul ta'lim. ${major} sohasi bo'yicha Yevropadagi yetakchi oliygoh. IELTS ${ielts || '7.0'} mos keladi.`
      },
      {
        name: "KAIST",
        country: "Janubiy Koreya",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        match: 90,
        cat: "Match",
        desc: `Koreya Hukumat Granti va KAIST Scholarship orqali 100% o'qish va oylik stipendiya taqdim etiladi.`
      },
      {
        name: "University of Oxford",
        country: "Buyuk Britaniya",
        image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80",
        match: 82,
        cat: "Reach",
        desc: "Clarendon va Reach Oxford grantlari orqali to'liq moliyalashtiriladigan dasturlar."
      },
      {
        name: "University of Debrecen",
        country: "Vengriya",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        match: 97,
        cat: "Safety",
        desc: "Stipendium Hungaricum to'liq granti orqali bepul o'qish va turar joy imkoniyati."
      },
      {
        name: "University of Tokyo",
        country: "Yaponiya",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        match: 88,
        cat: "Match",
        desc: "MEXT Yapon Hukumat Granti orqali barcha xarajatlar qoplanadi."
      },
      {
        name: "University of Toronto",
        country: "Kanada",
        image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
        match: 89,
        cat: "Reach",
        desc: "Lester B. Pearson to'liq xalqaro granti taqdim etiladi."
      }
    ];

    // Tanlangan davlatlarga ko'ra filterlash
    let filtered = database;
    if (selectedCountries && !selectedCountries.includes('Barcha davlatlar')) {
      filtered = database.filter(u => selectedCountries.includes(u.country));
    }

    if (filtered.length === 0) {
      filtered = database.slice(0, 3);
    }

    const recommendations = filtered.map(u => ({
      universityName: u.name,
      country: u.country,
      image: u.image,
      category: u.cat,
      matchPercentage: u.match,
      fundingType: funding,
      degree: degree,
      reason: u.desc
    }));

    return NextResponse.json({ recommendations });

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
