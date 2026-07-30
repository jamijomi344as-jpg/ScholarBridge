'use client';

import { useState } from 'react';

// Jahon bo'yicha eng mashhur asosiy yo'nalishlar
const MAJOR_OPTIONS = [
  'Computer Science & IT',
  'Software Engineering & AI',
  'Business Administration & Management',
  'Economics & Finance',
  'Data Science & Analytics',
  'Medicine & Healthcare',
  'Engineering (Civil, Mechanical, Electrical)',
  'International Relations & Law',
  'Marketing & Digital Media',
  'Graphic Design & Architecture',
  'Biotechnology & Life Sciences',
  'Psychology & Social Work'
];

// Target davlatlar ro'yxati
const COUNTRY_OPTIONS = [
  'All Countries (Barcha davlatlar)',
  'United States (USA)',
  'United Kingdom (UK)',
  'Germany',
  'Turkey',
  'South Korea',
  'China',
  'Canada',
  'Australia',
  'Italy',
  'Japan',
  'Poland',
  'Hungary'
];

export default function FindPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [searched, setSearched] = useState(false);

  // Dinamik forma holati
  const [gpa, setGpa] = useState('');
  const [ielts, setIelts] = useState('');
  const [sat, setSat] = useState('');
  const [userCountry, setUserCountry] = useState('Uzbekistan');
  const [budget, setBudget] = useState('');
  
  // Bir nechta tanlash uchun masivlar
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedTargetCountries, setSelectedTargetCountries] = useState<string[]>(['All Countries (Barcha davlatlar)']);

  // Yo'nalishlarni tanlash/o'chirish
  const toggleMajor = (major: string) => {
    if (selectedMajors.includes(major)) {
      setSelectedMajors(selectedMajors.filter((m) => m !== major));
    } else {
      setSelectedMajors([...selectedMajors, major]);
    }
  };

  // Target davlatlarni tanlash/o'chirish
  const toggleTargetCountry = (country: string) => {
    if (country === 'All Countries (Barcha davlatlar)') {
      setSelectedTargetCountries(['All Countries (Barcha davlatlar)']);
      return;
    }

    let updated = selectedTargetCountries.filter(c => c !== 'All Countries (Barcha davlatlar)');
    if (updated.includes(country)) {
      updated = updated.filter(c => c !== country);
    } else {
      updated.push(country);
    }

    if (updated.length === 0) {
      updated = ['All Countries (Barcha davlatlar)'];
    }
    setSelectedTargetCountries(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gpa || !ielts || selectedMajors.length === 0 || !userCountry || !budget) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring hamda kamida bitta yo'nalishni tanlang.");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSearched(true);
    setRecommendations([]);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolGrade: gpa, // 5 ballik baho
          ielts: ielts,
          sat: sat,
          majors: selectedMajors,
          fundingTypes: [budget],
          selectedCountries: selectedTargetCountries,
          userOriginCountry: userCountry,
          degrees: ['Bakalavr']
        }),
      });

      if (!res.ok) throw new Error(`Server xatosi: Status ${res.status}`);

      const data = await res.json();

      if (data.error) {
        setErrorMsg(data.error);
      } else {
        setRecommendations(data.recommendations || []);
      }
    } catch (err: any) {
      console.error('Fetch Error:', err);
      setErrorMsg(err.message || 'Server bilan bog\'lanishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,500&display=swap"
        rel="stylesheet"
      />

      <div className="sb-page-wrapper">
        <div className="wrap page">
          {/* CHAP TARAFI: FORMA */}
          <div className="form-side">
            <div className="form-kicker">Build your dossier</div>
            <h1>Tell us about yourself.</h1>
            <p className="form-sub">
              We'll match your profile against real admission patterns and surface the scholarships worth applying to.
            </p>

            <form className="fieldset" onSubmit={handleSubmit}>
              {/* GPA (5 ballik) VA IELTS */}
              <div className="two-col">
                <div className="field">
                  <label htmlFor="gpa">GPA (O'rtacha baho)</label>
                  <span className="hint">5 ballik sistemada (masalan: 4.85)</span>
                  <input
                    type="number"
                    id="gpa"
                    placeholder="4.80"
                    min="1"
                    max="5"
                    step="0.01"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="ielts">IELTS Overall</label>
                  <span className="hint">e.g. 7.0</span>
                  <input
                    type="number"
                    id="ielts"
                    placeholder="7.0"
                    min="0"
                    max="9"
                    step="0.5"
                    value={ielts}
                    onChange={(e) => setIelts(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* YO'NALISH TANLASH (MULTI-SELECT PILLS) */}
              <div className="field">
                <label>Intended Major(s)</label>
                <span className="hint">Bir nechta yo'nalishni tanlashingiz mumkin:</span>
                <div className="pills-container">
                  {MAJOR_OPTIONS.map((major) => {
                    const isSelected = selectedMajors.includes(major);
                    return (
                      <button
                        type="button"
                        key={major}
                        className={`pill-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleMajor(major)}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {major}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TARGET DAVLATLARNI TANLASH (MULTI-SELECT PILLS) */}
              <div className="field">
                <label>Target Countries (Grant kutilayotgan davlatlar)</label>
                <span className="hint">Qaysi davlatlardan universitet va grant qidirilsin?</span>
                <div className="pills-container">
                  {COUNTRY_OPTIONS.map((country) => {
                    const isSelected = selectedTargetCountries.includes(country);
                    return (
                      <button
                        type="button"
                        key={country}
                        className={`pill-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleTargetCountry(country)}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {country}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* USER NATIVE COUNTRY */}
              <div className="field">
                <label htmlFor="userCountry">Your Country of Residence</label>
                <div className="select-wrap">
                  <select
                    id="userCountry"
                    value={userCountry}
                    onChange={(e) => setUserCountry(e.target.value)}
                    required
                  >
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* SCHOLARSHIP NEED */}
              <div className="field">
                <label htmlFor="budget">Scholarship Need</label>
                <div className="select-wrap">
                  <select
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select your budget need
                    </option>
                    <option value="Full scholarship only">Full scholarship only (To'liq grant)</option>
                    <option value="Partial scholarship">Partial scholarship (Qisman grant)</option>
                    <option value="Any funding helps">Any funding helps (Har qanday moliya yordami)</option>
                    <option value="Self-funded">Self-funded (O'z hisobidan)</option>
                  </select>
                </div>
              </div>

              {/* SAT SCORE */}
              <div className="field">
                <label htmlFor="sat">
                  SAT Score <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>(optional)</span>
                </label>
                <input
                  type="number"
                  id="sat"
                  placeholder="e.g. 1450"
                  min="400"
                  max="1600"
                  value={sat}
                  onChange={(e) => setSat(e.target.value)}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button className="btn-submit" type="submit" disabled={loading}>
                {!loading ? (
                  <>
                    <svg viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3.5 9h11M10 4.5L14.5 9 10 13.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Find my universities
                  </>
                ) : (
                  <>
                    <div className="btn-spinner" />
                    Analyzing…
                  </>
                )}
              </button>
            </form>
          </div>

          {/* O'NG TARAFI: AI RESULT PANEL */}
          <div className="result-side">
            <div className="result-panel">
              <div className="rp-head">
                <span>AI Analysis</span>
                <span className={`rp-status ${loading ? 'analyzing' : ''}`}>
                  {loading
                    ? 'Analyzing…'
                    : searched
                    ? `${recommendations.length} matches found`
                    : 'Waiting'}
                </span>
              </div>

              {!searched && !loading && (
                <div className="rp-empty">
                  <div className="icon">?</div>
                  <p>Fill in your profile and we'll find your best-fit universities.</p>
                </div>
              )}

              {loading && (
                <div className="rp-loading" style={{ display: 'flex' }}>
                  <div className="spinner"></div>
                  <p>Analyzing your profile & scholarship matching…</p>
                </div>
              )}

              {!loading && errorMsg && (
                <div className="rp-error" style={{ display: 'flex' }}>
                  <p>⚠️ {errorMsg}</p>
                </div>
              )}

              {!loading && searched && !errorMsg && (
                <div className="rp-results" style={{ display: 'flex' }}>
                  {recommendations.length === 0 ? (
                    <div className="rp-empty">
                      <p>No matching universities found for this profile.</p>
                    </div>
                  ) : (
                    recommendations.map((u, idx) => {
                      const category =
                        u.category?.toLowerCase() ||
                        (u.matchPercentage > 85
                          ? 'safety'
                          : u.matchPercentage > 70
                          ? 'target'
                          : 'reach');

                      return (
                        <div key={idx} className="uni-card">
                          <div className="uni-top">
                            <div className="uni-name">{u.universityName || u.name}</div>
                            <span className={`badge ${category}`}>{category}</span>
                          </div>
                          <p style={{ fontSize: '0.78rem', color: 'var(--gold-light)', marginBottom: '4px' }}>
                            📍 {u.country || 'International'}
                          </p>
                          <div className="uni-detail">
                            {u.reason || u.description || 'Fits your academic and funding requirements.'}
                          </div>
                          {u.website && u.website !== '#' && (
                            <a
                              href={u.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: 'var(--gold-light)',
                                fontSize: '0.78rem',
                                marginTop: '8px',
                                display: 'inline-block',
                              }}
                            >
                              Visit Website ↗
                            </a>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --navy: #16233f;
          --navy-2: #1f3155;
          --paper: #f6f4ec;
          --paper-2: #efebdd;
          --gold: #b8923b;
          --gold-light: #d9be7e;
          --sage: #5f7a5a;
          --ink: #232320;
          --ink-soft: #5b584e;
          --rule: #d8d2c0;
          --rule-dark: #3a4a6b;
          --err: #b84040;
        }

        .sb-page-wrapper {
          background: var(--paper);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          line-height: 1.5;
        }

        .wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 32px;
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 0 18px;
          }
        }

        .page {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 40px 0 80px;
          align-items: start;
        }

        @media (max-width: 860px) {
          .page {
            grid-template-columns: 1fr;
          }
        }

        .form-kicker {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.76rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--sage);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-kicker::before {
          content: '';
          width: 20px;
          height: 1px;
          background: var(--sage);
        }

        h1 {
          font-family: 'Source Serif 4', serif;
          font-weight: 600;
          font-size: clamp(1.7rem, 3vw, 2.35rem);
          letter-spacing: -0.015em;
          color: var(--navy);
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .form-sub {
          color: var(--ink-soft);
          font-size: 0.96rem;
          margin-bottom: 36px;
          max-width: 44ch;
        }

        .fieldset {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .field label {
          font-size: 0.87rem;
          font-weight: 600;
          color: var(--navy);
          letter-spacing: 0.01em;
        }

        .field .hint {
          font-size: 0.8rem;
          color: var(--ink-soft);
          margin-top: -3px;
        }

        .field input,
        .field select {
          width: 100%;
          padding: 13px 14px;
          border: 1.5px solid var(--rule);
          border-radius: 3px;
          background: white;
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          font-size: 0.97rem;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
          appearance: none;
        }

        .field input:focus,
        .field select:focus {
          outline: none;
          border-color: var(--navy);
          box-shadow: 0 0 0 3px rgba(22, 35, 63, 0.1);
        }

        .pills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .pill-btn {
          background: white;
          border: 1.5px solid var(--rule);
          color: var(--ink);
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pill-btn:hover {
          border-color: var(--navy);
        }

        .pill-btn.active {
          background: var(--navy);
          color: white;
          border-color: var(--navy);
        }

        .select-wrap {
          position: relative;
        }

        .select-wrap select {
          padding-right: 36px;
        }

        .select-wrap::after {
          content: '▾';
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--ink-soft);
          pointer-events: none;
          font-size: 0.85rem;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        @media (max-width: 480px) {
          .two-col {
            grid-template-columns: 1fr;
          }
        }

        .btn-submit {
          margin-top: 10px;
          width: 100%;
          background: var(--navy);
          color: var(--paper);
          font-weight: 700;
          font-size: 1rem;
          padding: 17px 24px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .btn-submit:hover:not(:disabled) {
          background: var(--navy-2);
          transform: translateY(-1px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-submit svg {
          width: 18px;
          height: 18px;
        }

        .btn-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(246, 244, 236, 0.3);
          border-top-color: #f6f4ec;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }

        .result-side {
          position: sticky;
          top: 40px;
        }

        .result-panel {
          background: var(--navy);
          border-radius: 6px;
          padding: 28px 26px 24px;
          position: relative;
          min-height: 420px;
          display: flex;
          flex-direction: column;
        }

        .result-panel::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(217, 190, 126, 0.22);
          border-radius: 3px;
          pointer-events: none;
        }

        .rp-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 22px;
        }

        .rp-status {
          font-size: 0.72rem;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(217, 190, 126, 0.35);
          color: var(--gold-light);
          font-family: 'IBM Plex Mono', monospace;
        }

        .rp-status.analyzing {
          border-color: rgba(95, 122, 90, 0.6);
          color: #8cb088;
        }

        .rp-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 14px;
        }

        .rp-empty .icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px solid rgba(217, 190, 126, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-light);
          opacity: 0.6;
          font-size: 1.4rem;
          font-family: 'Source Serif 4', serif;
          font-style: italic;
        }

        .rp-empty p {
          color: rgba(246, 244, 236, 0.42);
          font-size: 0.9rem;
          max-width: 26ch;
        }

        .rp-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
        }

        .spinner {
          width: 36px;
          height: 36px;
          border: 2px solid rgba(217, 190, 126, 0.2);
          border-top-color: var(--gold-light);
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .rp-loading p {
          color: rgba(246, 244, 236, 0.55);
          font-size: 0.88rem;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.04em;
        }

        .rp-results {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 540px;
          overflow-y: auto;
        }

        .uni-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 14px 16px;
        }

        .uni-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 4px;
        }

        .uni-name {
          font-size: 0.97rem;
          font-weight: 600;
          color: var(--paper);
          line-height: 1.3;
        }

        .badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          padding: 3px 9px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
          margin-top: 2px;
          text-transform: lowercase;
        }

        .badge.reach {
          background: rgba(184, 68, 68, 0.2);
          color: #e8908a;
          border: 1px solid rgba(184, 68, 68, 0.35);
        }

        .badge.target {
          background: rgba(95, 122, 90, 0.2);
          color: #8cb088;
          border: 1px solid rgba(95, 122, 90, 0.4);
        }

        .badge.safety {
          background: rgba(184, 146, 59, 0.2);
          color: var(--gold-light);
          border: 1px solid rgba(184, 146, 59, 0.4);
        }

        .uni-detail {
          font-size: 0.82rem;
          color: rgba(246, 244, 236, 0.58);
          line-height: 1.5;
        }

        .rp-error {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-align: center;
        }

        .rp-error p {
          color: #e8908a;
          font-size: 0.9rem;
          max-width: 28ch;
        }
      `}</style>
    </>
  );
}
