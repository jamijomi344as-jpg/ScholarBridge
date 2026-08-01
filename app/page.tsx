'use client';

import { useState } from 'react';

interface Recommendation {
  id: number;
  universityName: string;
  country: string;
  matchPercentage: number;
  scholarshipChance?: string;
  scholarshipName: string;
  description: string;
}

export default function Home() {
  const [schoolGrade, setSchoolGrade] = useState('5');
  const [ielts, setIelts] = useState('7.0');
  const [sat, setSat] = useState('');
  const [majors, setMajors] = useState<string[]>(['Computer Science']);
  const [fundingTypes, setFundingTypes] = useState<string[]>(['Full scholarship only']);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolGrade, ielts, sat, majors, fundingTypes }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Serverda xatolik');
      setRecommendations(data.recommendations || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F6F4EC', color: '#232320', fontFamily: 'sans-serif', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(246, 244, 236, 0.95)', borderBottom: '1px solid #D8D2C0', padding: '16px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: '#16233F' }}>
            <span style={{ backgroundColor: '#16233F', color: '#D9BE7E', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>SB</span>
            ScholarBridge <span style={{ color: '#B8923B' }}>AI</span>
          </div>
          <a href="#demo" style={{ backgroundColor: '#16233F', color: '#F6F4EC', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Get Matched
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#5F7A5A', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>
            ScholarBridge AI — Find the universities that would actually want you
          </span>
          <h1 style={{ fontSize: '2.8rem', color: '#16233F', lineHeight: 1.2, marginBottom: '20px' }}>
            An AI-driven matcher pairing ambitious international students with <em style={{ color: '#B8923B' }}>full scholarships</em>.
          </h1>
          <p style={{ color: '#5B584E', fontSize: '1.1rem', marginBottom: '28px' }}>
            Precision recommendations, verified deadlines, and prioritized scholarship opportunities — presented with academic clarity.
          </p>
          <a href="#demo" style={{ backgroundColor: '#16233F', color: '#F6F4EC', padding: '14px 28px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
            Get Matched →
          </a>
        </div>

        {/* Dossier Card */}
        <div style={{ backgroundColor: '#16233F', color: '#F6F4EC', padding: '28px', borderRadius: '12px', border: '1px solid #3A4A6B', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #3A4A6B', pb: '12px', marginBottom: '16px', color: '#D9BE7E', fontSize: '12px', fontWeight: 'bold' }}>
            <span>Applicant Dossier - Live Preview</span>
            <span>SB</span>
          </div>
          <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(58,74,107,0.5)', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>GPA</span>
              <strong>3.8 / 4.0</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(58,74,107,0.5)', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>IELTS</span>
              <strong>7.5 Overall</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Fit Score Snapshot</span>
              <strong style={{ color: '#8CB088' }}>Top Match: 87%</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Form & Result Section */}
      <section id="demo" style={{ backgroundColor: '#EFEBDD', padding: '60px 20px', borderTop: '1px solid #D8D2C0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: '#16233F', marginBottom: '30px' }}>Interactive Dashboard</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
            {/* Form */}
            <div style={{ backgroundColor: '#F6F4EC', padding: '24px', borderRadius: '8px', border: '1px solid #D8D2C0' }}>
              <h3 style={{ marginBottom: '20px', color: '#16233F' }}>Application Form</h3>
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5B584E', marginBottom: '4px' }}>GPA (Baholar)</label>
                  <input type="text" value={schoolGrade} onChange={(e) => setSchoolGrade(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #D8D2C0' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5B584E', marginBottom: '4px' }}>IELTS Balli</label>
                  <input type="text" value={ielts} onChange={(e) => setIelts(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #D8D2C0' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5B584E', marginBottom: '4px' }}>Yo'nalish (Major)</label>
                  <input type="text" value={majors.join(', ')} onChange={(e) => setMajors(e.target.value.split(',').map(s=>s.trim()))} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #D8D2C0' }} required />
                </div>
                <button type="submit" disabled={loading} style={{ backgroundColor: '#16233F', color: '#F6F4EC', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  {loading ? 'AI Tahlil qilmoqda...' : 'Universitetlarni topish →'}
                </button>
              </form>
            </div>

            {/* Results */}
            <div style={{ backgroundColor: '#16233F', color: '#F6F4EC', padding: '24px', borderRadius: '8px', minHeight: '380px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #3A4A6B', paddingBottom: '10px' }}>
                <span style={{ color: '#D9BE7E', fontSize: '12px', fontWeight: 'bold' }}>AI Analysis Results</span>
                <span style={{ color: '#5F7A5A', fontSize: '12px', fontWeight: 'bold' }}>{recommendations.length} MATCHES</span>
              </div>

              {loading && <p style={{ color: '#D9BE7E' }}>Imkoniyatlar hisoblanmoqda...</p>}
              {error && <p style={{ color: '#ef4444' }}>⚠️ {error}</p>}
              {!loading && !error && recommendations.length === 0 && (
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                  Formani to'ldiring va "Universitetlarni topish" tugmasini bosing. Natijalar foiz shaklida shu yerda chiqadi.
                </p>
              )}

              {!loading && recommendations.length > 0 && (
                <div style={{ display: 'grid', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                  {recommendations.map((rec) => (
                    <div key={rec.id} style={{ backgroundColor: '#1F3155', padding: '16px', borderRadius: '6px', border: '1px solid #3A4A6B' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 style={{ margin: 0, color: '#fff' }}>{rec.universityName}</h4>
                        <span style={{ backgroundColor: 'rgba(184,146,59,0.2)', color: '#D9BE7E', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{rec.matchPercentage}%</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 8px' }}>📍 {rec.country}</p>
                      <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}>{rec.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#16233F', color: '#94a3b8', padding: '24px 20px', fontSize: '12px', textAlign: 'center', borderTop: '1px solid #3A4A6B' }}>
        Built in Namangan · ScholarBridge AI
      </footer>
    </div>
  );
}
