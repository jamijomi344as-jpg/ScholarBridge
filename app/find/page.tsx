'use client';

import { useState } from 'react';

export default function FindPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [searched, setSearched] = useState(false);

  // Form ma'lumotlari
  const [formData, setFormData] = useState({
    schoolGrade: '4.5',
    ielts: '7.0',
    sat: '1400',
    majors: ['Kompyuter ilmlari'],
    fundingTypes: ["To'liq grant"],
    selectedCountries: ['AQSH'],
    degrees: ['Bakalavr']
  });

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSearched(true);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Server xatoligi: Status ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        setErrorMsg(data.error);
        setRecommendations([]);
      } else {
        setRecommendations(data.recommendations || []);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setErrorMsg(err.message || 'Server bilan bog\'lanishda xatolik yuz berdi');
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* SARALASH TUGMASI VA FORMA SECTION */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
          🎓 Universitet va Grant Saralash
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '20px', fontSize: '14px' }}>
          Profil ko'rsatkichlaringiz bo'yicha mos keladigan oliygohlarni toping.
        </p>

        <button
          onClick={() => handleSearch()}
          disabled={loading}
          style={{
            backgroundColor: loading ? '#9CA3AF' : '#2563EB',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px 28px',
            borderRadius: '10px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '15px'
          }}
        >
          {loading ? '🔍 Qidirilmoqda va Tahlil Qilinmoqda...' : '🚀 Saralashni Boshlash'}
        </button>
      </div>

      {/* XATOLIK BO'LSA */}
      {errorMsg && (
        <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
          ⚠️ <strong>Xatolik:</strong> {errorMsg}
        </div>
      )}

      {/* NATIJALAR */}
      {!loading && searched && recommendations.length === 0 && !errorMsg && (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
          <p style={{ color: '#6B7280' }}>Afsuski, kiritilgan mezonlarga mos universitetlar topilmadi.</p>
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>
            Siz uchun mos kelgan universitetlar ({recommendations.length} ta)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {recommendations.map((uni, idx) => (
              <div key={idx} style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                
                <div style={{ position: 'relative', height: '140px', backgroundColor: '#F3F4F6' }}>
                  <img 
                    src={uni.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'} 
                    alt={uni.universityName} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {uni.logo && (
                    <img 
                      src={uni.logo} 
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
                      alt="Logo" 
                      style={{ position: 'absolute', bottom: '-16px', left: '16px', width: '40px', height: '40px', borderRadius: '8px', border: '2px solid #fff', backgroundColor: '#fff', padding: '2px' }} 
                    />
                  )}
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#10B981', color: '#fff', fontWeight: 'bold', padding: '4px 10px', borderRadius: '16px', fontSize: '12px' }}>
                    {uni.matchPercentage || 70}% Mos
                  </span>
                </div>

                <div style={{ padding: '22px 16px 16px 16px', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                    {uni.universityName}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '10px' }}>
                    📍 {uni.country} • 🎓 {uni.degree || 'Bakalavr'}
                  </p>
                  
                  <div style={{ backgroundColor: '#F9FAFB', padding: '10px', borderRadius: '8px', fontSize: '12.5px', color: '#374151' }}>
                    💡 {uni.reason || 'Sohangiz va akademik ko\'rsatkichlaringizga mos keladi.'}
                  </div>
                </div>

                <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2563EB', backgroundColor: '#EFF6FF', padding: '4px 8px', borderRadius: '6px' }}>
                    {uni.fundingType || "To'liq grant"}
                  </span>
                  
                  {uni.website && uni.website !== '#' && (
                    <a 
                      href={uni.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ fontSize: '13px', fontWeight: 'bold', color: '#111827', textDecoration: 'none' }}
                    >
                      Saytga o'tish ↗
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
