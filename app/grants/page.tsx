'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GrantsPage() {
  const [selectedCountry, setSelectedCountry] = useState('Barcha davlatlar');
  const [selectedMajor, setSelectedMajor] = useState('Barcha sohalar');

  const grantsList = [
    {
      id: 1,
      title: "Talabalar va mutaxassislar uchun KOICA granti asosida 12 haftalik bepul o'quv dasturi — AI Training Center",
      country: "Janubiy Koreya",
      category: "Professional rivojlanish",
      tag: "Malaka oshirish",
      funding: "To'liq moliyalash",
      deadline: "15 Aug, 2026",
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "GovAI Research Fellow 2026 — Sun'iy intellekt boshqaruvi bo'yicha tadqiqot dasturi (UK & USA Sponsorship)",
      country: "Buyuk Britaniya",
      category: "Professional rivojlanish",
      tag: "Tadqiqot",
      funding: "To'liq moliyalash",
      deadline: "16 Aug, 2026",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Lester B. Pearson International Scholarship 2027 — Kanadada bakalavr uchun to'liq grant",
      country: "Kanada",
      category: "Bakalavr",
      tag: "To'liq ta'lim",
      funding: "To'liq moliyalash",
      deadline: "15 Jan, 2027",
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Stipendium Hungaricum 2027/2028 — Vengriya davlat granti barcha bosqichlar uchun",
      country: "Vengriya",
      category: "Bakalavr / Magistratura",
      tag: "Davlat Granti",
      funding: "To'liq moliyalash",
      deadline: "15 Jan, 2027",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SHAXSIY SARALASH BANNERI VA TUGMA */}
      <div style={{ backgroundColor: '#16233F', color: '#fff', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '12px' }}>Ochiq Grantlar va Stipendiyalar Katalogi</h1>
        <p style={{ fontSize: '15px', color: '#94A3B8', maxWidth: '650px', margin: '0 auto 24px auto' }}>
          O'zingizning aniq natijalaringiz (IELTS, GPA, SAT) bo'yicha AI orqali real saralashni xohlaysizmi?
        </p>
        
        {/* TUGMA: FOYDALANUVCHINI FORMAGA O'TKAZADI */}
        <Link href="/find">
          <button style={{ 
            backgroundColor: '#2563EB', 
            color: '#ffffff', 
            padding: '14px 32px', 
            borderRadius: '8px', 
            border: 'none', 
            fontWeight: 'bold', 
            fontSize: '16px', 
            cursor: 'pointer', 
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
            transition: 'all 0.2s'
          }}>
            🚀 Shaxsiy Profil Bo'yicha Mos Grant Topish
          </button>
        </Link>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
        
        {/* CHAP SIDEBAR - FILTRLAR (2-RASMDAGIDEK) */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', height: 'fit-content' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>Filtrlar</h3>
          
          {/* DAVLAT */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>DAVLAT</label>
            <select 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', backgroundColor: '#F9FAFB' }}
            >
              <option value="Barcha davlatlar">Barcha davlatlar</option>
              <option value="Janubiy Koreya">Janubiy Koreya</option>
              <option value="Buyuk Britaniya">Buyuk Britaniya</option>
              <option value="Kanada">Kanada</option>
              <option value="Vengriya">Vengriya</option>
            </select>
          </div>

          {/* DARAJA */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#6B7280', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>DARAJA</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#374151' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Bakalavr</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Magistratura</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Almashinuv (Maktab)</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Almashinuv (Bakalavr)</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> PhD</label>
            </div>
          </div>

          {/* SOHA */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>SOHA</label>
            <select 
              value={selectedMajor} 
              onChange={(e) => setSelectedMajor(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', backgroundColor: '#F9FAFB' }}
            >
              <option value="Barcha sohalar">Barcha sohalar</option>
              <option value="IT">Kompyuter fanlari va IT</option>
              <option value="Biznes">Biznes boshqaruvi</option>
              <option value="Muhandislik">Muhandislik va texnologiya</option>
            </select>
          </div>

          {/* MOLIYALASHTIRISH */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#6B7280', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>MOLIYALASHTIRISH</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#374151' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> To'liq moliyalash</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Qisman moliyalash</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Stipendiya</label>
            </div>
          </div>
        </div>

        {/* O'NG TOMON - GRANTLAR RO'YXATI */}
        <div>
          {/* TELEGRAM NOTIFICATION BANNER */}
          <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '14px 20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', color: '#1E40AF', fontWeight: '500' }}>✈️ Telegram kanalimizni kuzatib boring hamda yangi grantlardan xabardor bo'ling!</span>
            <a href="https://t.me" target="_blank" rel="noreferrer" style={{ backgroundColor: '#2563EB', color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>Obuna bo'lish</a>
          </div>

          {/* LIST OF CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {grantsList.map((grant) => (
              <div key={grant.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '18px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <img src={grant.image} alt={grant.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: '#FFF7ED', color: '#C2410C', fontSize: '12px', padding: '3px 10px', borderRadius: '6px', fontWeight: '600' }}>{grant.category}</span>
                    <span style={{ backgroundColor: '#F0FDF4', color: '#15803D', fontSize: '12px', padding: '3px 10px', borderRadius: '6px', fontWeight: '600' }}>{grant.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#111827', marginBottom: '14px', lineHeight: '1.4' }}>{grant.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#6B7280', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                    <span>💰 MOLIYALASH: <strong style={{ color: '#111827' }}>{grant.funding}</strong></span>
                    <span>📅 OXIRGI MUDDAT: <strong style={{ color: '#EF4444' }}>{grant.deadline}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
