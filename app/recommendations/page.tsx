'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('scholarBridge_results');
    if (data) {
      try {
        setRecommendations(JSON.parse(data));
      } catch (err) {
        console.error('JSON parse error:', err);
      }
    }
    setLoading(false);
  }, []);

  const getBadgeStyle = (cat: string) => {
    if (cat === 'Reach') return { backgroundColor: '#fee2e2', color: '#991b1b' };
    if (cat === 'Match') return { backgroundColor: '#dcfce7', color: '#166534' };
    return { backgroundColor: '#e0f2fe', color: '#075985' };
  };

  if (loading) {
    return <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'sans-serif' }}>Natijalar yuklanmoqda...</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>AI Tavsiya Etgan Universitetlar</h2>
        <Link href="/find" style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', borderRadius: '6px', textDecoration: 'none', color: '#333' }}>
          ← Qayta saralash
        </Link>
      </div>

      {recommendations.length === 0 ? (
        <div style={{ border: '2px dashed #e5e7eb', padding: '40px', textAlign: 'center', borderRadius: '12px' }}>
          <h3>Hozircha natijalar mavjud emas</h3>
          <p style={{ color: '#6b7280' }}>Siz hali shaklni to'ldirmadiz yoki AI ma'lumot keltirishda to'xtab qoldi.</p>
          <Link href="/find" style={{ display: 'inline-block', marginTop: '12px', padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>
            Formani To'ldirish →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {recommendations.map((uni, idx) => (
            <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ ...getBadgeStyle(uni.category), padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px' }}>
                  {uni.category} ({uni.matchPercentage || 85}% mos)
                </span>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>📍 {uni.country}</span>
              </div>

              <h3 style={{ fontSize: '22px', margin: '14px 0 8px 0' }}>{uni.universityName}</h3>
              <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5' }}>{uni.reason}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                <div>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>Grant turi:</span>
                  <div style={{ fontWeight: 'bold', color: '#16a34a' }}>{uni.fundingType}</div>
                </div>

                <button 
                  onClick={() => {
                    localStorage.setItem('selected_uni', JSON.stringify(uni));
                    window.location.href = `/recommendations/detail`;
                  }}
                  style={{
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Batafsil Ma'lumot va Rasm →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
