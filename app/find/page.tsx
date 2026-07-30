'use client';

import { useState } from 'react';

export default function ResultsView() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (formData: any) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) {
        setErrorMsg(data.error);
      } else {
        setRecommendations(data.recommendations || []);
      }
    } catch (err: any) {
      setErrorMsg('So\'rov yuborishda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* LOADING HOLATI */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>🔍 Ma'lumotlar tahlil qilinmoqda va real xalqaro bazadan qidirilmoqda...</h3>
        </div>
      )}

      {/* XATOLIK HOLATI */}
      {errorMsg && (
        <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
          {errorMsg}
        </div>
      )}

      {/* DINAMIK NATIJALAR RO'YXATI (MAX 50 TA) */}
      {!loading && recommendations.length > 0 && (
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>
            Siz uchun mos kelgan universitetlar va grantlar ({recommendations.length} ta)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {recommendations.map((uni, idx) => (
              <div key={idx} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                
                {/* HEAD & LOGO */}
                <div style={{ position: 'relative', height: '140px', backgroundColor: '#F3F4F6' }}>
                  <img src={uni.image} alt={uni.universityName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {uni.logo && (
                    <img 
                      src={uni.logo} 
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
                      alt="University Logo" 
                      style={{ position: 'absolute', bottom: '-18px', left: '16px', width: '44px', height: '44px', borderRadius: '8px', border: '2px solid #fff', backgroundColor: '#fff', padding: '2px' }} 
                    />
                  )}
                  <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#10B981', color: '#fff', fontWeight: 'bold', padding: '4px 10px', borderRadius: '16px', fontSize: '12px' }}>
                    {uni.matchPercentage}% Mos
                  </span>
                </div>

                {/* CONTENT */}
                <div style={{ padding: '24px 16px 16px 16px', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>{uni.universityName}</h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>📍 {uni.country} • 🎓 {uni.degree}</p>
                  
                  <div style={{ backgroundColor: '#F9FAFB', padding: '10px', borderRadius: '8px', fontSize: '13px', color: '#374151' }}>
                    💡 {uni.reason}
                  </div>
                </div>

                {/* FOOTER & LINK */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2563EB', backgroundColor: '#EFF6FF', padding: '4px 8px', borderRadius: '6px' }}>
                    {uni.fundingType}
                  </span>
                  
                  {uni.website && uni.website !== '#' && (
                    <a 
                      href={uni.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ fontSize: '13px', fontWeight: 'bold', color: '#111827', textDecoration: 'none' }}
                    >
                      Website ↗
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
