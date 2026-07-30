'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GrantsPage() {
  const [selectedCountry, setSelectedCountry] = useState('Barcha davlatlar');
  const [selectedMajor, setSelectedMajor] = useState('Barcha sohalar');

  // Asl va real grantlar bazasi
  const grantsList = [
    {
      id: 1,
      title: "Talabalar va mutaxassislar uchun KOICA granti asosida 12 haftalik bepul o'quv dasturi — AI Training Center",
      country: "Janubiy Koreya",
      flag: "🇰🇷",
      category: "Professional rivojlanish",
      tag: "Malaka oshirish",
      funding: "To'liq moliyalash",
      deadline: "15 Aug, 2026",
      image: "[https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80)",
      link: "#"
    },
    {
      id: 2,
      title: "GovAI Research Fellow 2026 — Sun'iy intellekt boshqaruvi bo'yicha tadqiqot dasturi",
      country: "Buyuk Britaniya",
      flag: "🇬🇧",
      category: "Professional rivojlanish",
      tag: "Tadqiqot",
      funding: "To'liq moliyalash",
      deadline: "16 Aug, 2026",
      image: "[https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80)",
      link: "#"
    },
    {
      id: 3,
      title: "Lester B. Pearson International Scholarship 2027 — Kanadada bakalavr uchun to'liq grant",
      country: "Kanada",
      flag: "🇨🇦",
      category: "Bakalavr",
      tag: "To'liq ta'lim",
      funding: "To'liq moliyalash",
      deadline: "15 Jan, 2027",
      image: "[https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80)",
      link: "#"
    },
    {
      id: 4,
      title: "Stipendium Hungaricum 2027/2028 — Vengriya davlat granti barcha bosqichlar uchun",
      country: "Vengriya",
      flag: "🇭🇺",
      category: "Bakalavr / Magistratura",
      tag: "Davlat Granti",
      funding: "To'liq moliyalash",
      deadline: "15 Jan, 2027",
      image: "[https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80)",
      link: "#"
    }
  ];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '60px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER CALL-TO-ACTION BANNER */}
      <div style={{ backgroundColor: '#16233F', color: '#fff', padding: '32px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>Ochiq Grantlar va Stipendiyalar Katalogi</h1>
        <p style={{ fontSize: '15px', color: '#94A3B8', maxWidth: '600px', margin: '0 auto 20px auto' }}>
          O'zingizning aniq ko'rsatkichlaringiz (IELTS, GPA, SAT) bo'yicha tahlil qilib, qaysi grantga tushish imkoniyatingiz 50%+ ekanligini bilmoqchimisiz?
        </p>
        <Link href="/find">
          <button style={{ backgroundColor: '#2563EB', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)' }}>
            🎯 Shaxsiy Profil Bo'yicha Mos Grant Topish
          </button>
        </Link>
      </div>

      <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
        
        {/* CHAP SIDEBAR - FILTRLAR */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', height: 'fit-content' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1E293B' }}>Filtrlar</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>DAVLAT</label>
            <select 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '14px' }}
            >
              <option value="Barcha davlatlar">Barcha davlatlar</option>
              <option value="Janubiy Koreya">Janubiy Koreya</option>
              <option value="Buyuk Britaniya">Buyuk Britaniya</option>
              <option value="Kanada">Kanada</option>
              <option value="Vengriya">Vengriya</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>DARAJA</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <label><input type="checkbox" defaultChecked /> Bakalavr</label>
              <label><input type="checkbox" defaultChecked /> Magistratura</label>
              <label><input type="checkbox" /> Almashinuv dasturi</label>
              <label><input type="checkbox" /> Professional rivojlanish</label>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>MOLIYALASHTIRISH</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <label><input type="checkbox" defaultChecked /> To'liq moliyalash</label>
              <label><input type="checkbox" /> Qisman moliyalash</label>
            </div>
          </div>
        </div>

        {/* O'NG TOMON - GRANTLAR RO'YXATI */}
        <div>
          {/* BANNER NOTIFICATION */}
          <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', color: '#1E40AF' }}>📢 Telegram kanalimizda eng so'nggi grantlarni kuzatib boring!</span>
            <a href="[https://t.me](https://t.me)" target="_blank" style={{ backgroundColor: '#2563EB', color: '#fff', textDecoration: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>Obuna bo'lish</a>
          </div>

          {/* CARDS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {grantsList.map((grant) => (
              <div key={grant.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '16px', alignItems: 'center' }}>
                <img src={grant.image} alt={grant.title} style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ backgroundColor: '#FFF7ED', color: '#C2410C', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{grant.category}</span>
                    <span style={{ backgroundColor: '#F0FDF4', color: '#15803D', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{grant.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0F172A', marginBottom: '12px', lineHeight: '1.4' }}>{grant.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
                    <span>💰 {grant.funding}</span>
                    <span>📅 Oxirgi muddat: <strong style={{ color: '#EF4444' }}>{grant.deadline}</strong></span>
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
