'use client';

import { useState } from 'react';

interface Recommendation {
  id: number;
  universityName: string;
  country: string;
  matchPercentage: number;
  scholarshipChance?: string;
  scholarshipChanceDetails?: string;
  reason: string;
  description: string;
  scholarshipName: string;
  website: string;
}

export default function Home() {
  const [schoolGrade, setSchoolGrade] = useState('5');
  const [ielts, setIelts] = useState('7.0');
  const [sat, setSat] = useState('');
  const [majors, setMajors] = useState<string[]>(['Computer Science']);
  const [fundingTypes, setFundingTypes] = useState<string[]>(['Full scholarship only']);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['All Countries']);
  const [userOriginCountry, setUserOriginCountry] = useState('Uzbekistan');

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
        body: JSON.stringify({
          schoolGrade,
          ielts,
          sat,
          majors,
          fundingTypes,
          selectedCountries,
          userOriginCountry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Serverda xatolik yuz berdi');
      }

      setRecommendations(data.recommendations || []);
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 1. Header Navigation */}
      <header>
        <div className="container nav">
          <div className="logo">
            <span className="mark">SB</span>
            ScholarBridge <span style={{ color: 'var(--gold)' }}>AI</span>
          </div>
          <a href="#interactive-demo" className="nav-cta">
            Get Matched
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="container hero">
        <div>
          <span className="eyebrow">
            ScholarBridge AI — Find the universities that would actually want you
          </span>
          <h1>
            An AI-driven matcher pairing ambitious international students with <em>full scholarships</em>.
          </h1>
          <p className="lede">
            Precision recommendations, verified deadlines, and prioritized scholarship opportunities — presented with academic clarity.
          </p>
          <div style={{ marginTop: '24px' }}>
            <a href="#interactive-demo" className="btn-primary">
              Get Matched →
            </a>
            <a href="#how-it-works" className="btn-ghost">
              Learn more ↓
            </a>
          </div>
        </div>

        {/* Dossier Card */}
        <div className="dossier">
          <div className="dossier-head">
            <span>Applicant Dossier - Live Preview</span>
            <span className="mark">SB</span>
          </div>
          <div style={{ display: 'grid', gap: '12px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--rule-dark)', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>GPA</span>
              <strong>3.8 / 4.0</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--rule-dark)', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>IELTS</span>
              <strong>7.5 Overall</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Top Match</span>
              <strong style={{ color: 'var(--sage-light)' }}>87% Fit Score</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Common Student Challenges */}
      <section className="section section-alt">
        <div className="container">
          <span className="eyebrow">The Problem</span>
          <h2 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '2rem', color: 'var(--navy)', marginBottom: '32px' }}>
            Common Student Challenges
          </h2>

          <div className="grid-3">
            <div className="card">
              <span className="num">01</span>
              <h3>No sense of fit</h3>
              <p>Students apply broadly without program-level fit. Our AI assesses alignment to surface institutions where candidacy is credible.</p>
            </div>
            <div className="card">
              <span className="num">02</span>
              <h3>Hidden scholarships</h3>
              <p>Many full scholarships remain undiscovered. ScholarBridge mines institutional funds to surface opportunities matched to your profile.</p>
            </div>
            <div className="card">
              <span className="num">03</span>
              <h3>Missed deadlines</h3>
              <p>Deadlines vary by program and rolling cycles. We deliver prioritized countdowns so applicants never miss critical submissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Dashboard / Form Demo */}
      <section id="interactive-demo" className="section container">
        <div style={{ marginBottom: '32px' }}>
          <span className="eyebrow">Live Engine</span>
          <h2 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '2rem', color: 'var(--navy)' }}>
            Interactive Dashboard
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
          {/* Form */}
          <div className="form-card">
            <h3 style={{ fontFamily: 'Source Serif 4, serif', marginBottom: '20px', color: 'var(--navy)' }}>Application Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>GPA (Baholar)</label>
                <input type="text" value={schoolGrade} onChange={(e) => setSchoolGrade(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>IELTS Balli</label>
                <input type="text" value={ielts} onChange={(e) => setIelts(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Yo'nalish (Major)</label>
                <input type="text" value={majors.join(', ')} onChange={(e) => setMajors(e.target.value.split(',').map(s => s.trim()))} required />
              </div>
              <div className="form-group">
                <label>Grant Turi</label>
                <select value={fundingTypes[0]} onChange={(e) => setFundingTypes([e.target.value])}>
                  <option value="Full scholarship only">To'liq grant (Full Scholarship)</option>
                  <option value="Partial scholarship">Qisman grant</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'AI Tahlil qilmoqda...' : 'Universitetlarni topish →'}
              </button>
            </form>
          </div>

          {/* Results Dossier */}
          <div className="dossier" style={{ minHeight: '400px' }}>
            <div className="dossier-head">
              <span>AI Analysis Results</span>
              <span style={{ color: 'var(--sage-light)' }}>{recommendations.length} MATCHES FOUND</span>
            </div>

            {loading && <p style={{ color: 'var(--gold-light)', fontFamily: 'IBM Plex Mono' }}>Imkoniyatlar hisoblanmoqda...</p>}
            {error && <p style={{ color: '#ef4444' }}>⚠️ {error}</p>}
            {!loading && !error && recommendations.length === 0 && (
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Formani to'ldiring va "Universitetlarni topish" tugmasini bosing. Natijalar foiz shaklida shu yerda namoyon bo'ladi.
              </p>
            )}

            {!loading && recommendations.length > 0 && (
              <div style={{ display: 'grid', gap: '16px', maxHeight: '500px', overflowY: 'auto' }}>
                {recommendations.map((rec) => (
                  <div key={rec.id} style={{ background: 'var(--navy-2)', padding: '16px', borderRadius: '6px', border: '1px solid var(--rule-dark)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontFamily: 'Source Serif 4, serif', fontSize: '1.1rem', color: '#fff' }}>{rec.universityName}</h4>
                      <span style={{ background: 'rgba(184, 146, 59, 0.2)', color: 'var(--gold-light)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {rec.matchPercentage}%
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 12px' }}>📍 {rec.country}</p>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{rec.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container foot-row">
          <div>ScholarBridge AI</div>
          <div>Built in Namangan · ScholarBridge AI</div>
          <div>Contact: admissions@scholarbridge.ai</div>
        </div>
      </footer>
    </div>
  );
}
