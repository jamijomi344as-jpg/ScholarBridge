'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('scholarBridge_results');
    if (data) {
      setRecommendations(JSON.parse(data));
    }
  }, []);

  const getBadgeColor = (cat: string) => {
    if (cat === 'Reach') return '#ffebee';
    if (cat === 'Match') return '#e8f5e9';
    return '#e3f2fd';
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>AI Tavsiya Etgan Universitetlar</h2>
        <Link href="/find" style={{ padding: '8px 16px', backgroundColor: '#eee', borderRadius: '6px', textDecoration: 'none' }}>
          ← Qayta saralash
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {recommendations.map((uni, idx) => (
          <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ backgroundColor: getBadgeColor(uni.category), padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                {uni.category} ({uni.matchPercentage}% mos)
              </span>
              <span style={{ fontSize: '14px', color: '#666' }}>📍 {uni.country}</span>
            </div>

            <h3 style={{ fontSize: '22px', margin: '12px 0 6px 0' }}>{uni.universityName}</h3>
            <p style={{ color: '#4b5563', fontSize: '14px' }}>{uni.reason}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '12px' }}>
              <div>
                <strong>Grant turi:</strong> {uni.fundingType}
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
    </div>
  );
}
