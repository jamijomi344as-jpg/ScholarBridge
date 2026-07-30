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
        console.error(err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div style={{ padding: '60px', textAlign: 'center' }}>Natijalar yuklanmoqda...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h2>Tavsiya Etilgan Universitet va Grantlar</h2>
        <Link href="/find" style={{ padding: '8px 16px', backgroundColor: '#E5E7EB', borderRadius: '6px', textDecoration: 'none', color: '#1F2937' }}>
          ← Qayta saralash
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {recommendations.map((uni, idx) => (
          <div key={idx} style={{ border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <img src={uni.image} alt={uni.universityName} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 'bold' }}>
                  {uni.category} ({uni.matchPercentage}% mos)
                </span>
                <span style={{ fontSize: '13px', color: '#6B7280' }}>📍 {uni.country}</span>
              </div>
              <h3 style={{ fontSize: '18px', margin: '10px 0', color: '#16233F' }}>{uni.universityName}</h3>
              <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.5', marginBottom: '16px' }}>{uni.reason}</p>
              <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#059669' }}>{uni.fundingType}</span>
                <button style={{ backgroundColor: '#16233F', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
                  Batafsil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
