'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Recommendation {
  universityName: string;
  country: string;
  degree: string;
  category: 'Reach' | 'Match' | 'Safety';
  matchPercentage: number;
  fundingType: string;
  annualTuition: string;
  availableScholarships: string[];
  reason: string;
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('scholarBridge_results');
    if (data) {
      try {
        setRecommendations(JSON.parse(data));
      } catch (err) {
        console.error('Data parsing error:', err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Yuklanmoqda...</div>;
  }

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'Reach':
        return { backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171' };
      case 'Match':
        return { backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #4ade80' };
      case 'Safety':
        return { backgroundColor: '#e0f2fe', color: '#075985', border: '1px solid #38bdf8' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' };
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Siz uchun AI Tavsiyalari</h2>
        <Link href="/find" style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', borderRadius: '6px', textDecoration: 'none', color: '#333' }}>
          ← Qayta saralash
        </Link>
      </div>

      {recommendations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <p>Hozircha hech qanday natija topilmadi.</p>
          <Link href="/find" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            Ma'lumotlarni kiritish uchun bosing
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {recommendations.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '20px' }}>{item.universityName}</h3>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                    📍 {item.country} | 🎓 {item.degree}
                  </p>
                </div>
                
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  ...getCategoryBadgeStyle(item.category)
                }}>
                  {item.category} ({item.matchPercentage}% mos)
                </span>
              </div>

              <div style={{ margin: '16px 0', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                  <strong>Nega sizga mos:</strong> {item.reason}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                <div>
                  <strong>Moliyalashtirish:</strong> {item.fundingType}
                </div>
                <div>
                  <strong>Taxminiy kontrakt:</strong> {item.annualTuition}
                </div>
              </div>

              {item.availableScholarships && item.availableScholarships.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <strong style={{ fontSize: '14px' }}>Mavjud Grant va Stipendiyalar:</strong>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '20px', fontSize: '14px', color: '#4b5563' }}>
                    {item.availableScholarships.map((sch, i) => (
                      <li key={i}>{sch}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
