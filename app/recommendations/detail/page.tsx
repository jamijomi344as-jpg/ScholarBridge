'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UniversityDetailPage() {
  const [uni, setUni] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('selected_uni');
    if (data) {
      setUni(JSON.parse(data));
    }
  }, []);

  if (!uni) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Ma'lumot yuklanmoqda...</div>;
  }

  // Unsplash orqali mos universitet rasmini chiqarish
  const uniImageUrl = `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80`;

  return (
    <div style={{ maxWidth: '850px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <Link href="/recommendations" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>
        ← Orqaga qaytish
      </Link>

      {/* Universitet Rasmi */}
      <div style={{ marginTop: '20px', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={uniImageUrl} 
          alt={uni.universityName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: '#fff' }}>
          <h1 style={{ margin: 0, fontSize: '32px' }}>{uni.universityName}</h1>
          <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>📍 {uni.country} | 🎓 {uni.degree}</p>
        </div>
      </div>

      {/* To'liq Ma'lumotlar Kartochkasi */}
      <div style={{ marginTop: '24px', display: 'grid', gap: '20px' }}>
        
        <div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '10px', backgroundColor: '#f9fafb' }}>
          <h3 style={{ marginTop: 0 }}>💡 Nega AI sizga bu universitetni tavsiya qildi?</h3>
          <p style={{ color: '#374151', lineHeight: '1.6' }}>{uni.reason}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '10px' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Moslik Darajasi</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#0070f3' }}>{uni.matchPercentage}% ({uni.category})</h2>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '10px' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Moliyalashtirish Sharti</span>
            <h2 style={{ margin: '4px 0 0 0', color: '#16a34a' }}>{uni.fundingType}</h2>
          </div>
        </div>

        <div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ marginTop: 0 }}>🏆 Mavjud Grantlar va Stipendiyalar</h3>
          <ul>
            {uni.availableScholarships?.map((sch: string, i: number) => (
              <li key={i} style={{ margin: '8px 0', fontSize: '16px', color: '#374151' }}>{sch}</li>
            ))}
          </ul>
        </div>

        <div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ marginTop: 0 }}>💰 Taxminiy Kontrakt / Xarajatlar</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{uni.annualTuition}</p>
        </div>

      </div>
    </div>
  );
}
