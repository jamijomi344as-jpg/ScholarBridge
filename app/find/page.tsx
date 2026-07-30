'use client';

import { useState } from 'react';

export default function FindPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [searched, setSearched] = useState(false);

  // Dinamik forma holati
  const [form, setForm] = useState({
    gpa: '',
    ielts: '',
    major: '',
    country: '',
    budget: '',
    sat: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.gpa || !form.ielts || !form.major || !form.country || !form.budget) {
      alert('Iltimos, barcha majburiy maydonlarni to\'ldiring.');
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
          schoolGrade: form.gpa,
          ielts: form.ielts,
          sat: form.sat,
          majors: [form.major],
          fundingTypes: [form.budget],
          selectedCountries: [form.country],
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
      {/* Google Fonts ulanishi */}
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
              <div className="two-col">
                <div className="field">
                  <label htmlFor="gpa">GPA</label>
                  <span className="hint">On a 4.0 scale</span>
                  <input
                    type="number"
                    id="gpa"
                    name="gpa"
                    placeholder="3.80"
                    min="0"
                    max="5"
                    step="0.01"
                    value={form.gpa}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="ielts">IELTS Overall</label>
                  <span className="hint">e.g. 7.0</span>
                  <input
                    type="number"
                    id="ielts"
                    name="ielts"
                    placeholder="7.0"
                    min="0"
                    max="9"
                    step="0.5"
                    value={form.ielts}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="major">Intended Major</label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  placeholder="e.g. Computer Science, Economics, Medicine…"
                  value={form.major}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="country">Your Country</label>
                <div className="select-wrap">
                  <select
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="budget">Scholarship Need</label>
                <div className="select-wrap">
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select your budget need
                    </option>
                    <option value="Full scholarship only">Full scholarship only</option>
                    <option value="Partial scholarship">Partial scholarship (can pay some)</option>
                    <option value="Any funding helps">Any funding helps</option>
                    <option value="Self-funded">Self-funded (no scholarship needed)</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="sat">
                  SAT Score <span style={{ fontWeight: 400, color: 'var(--ink-soft)' }}>(optional)</span>
                </label>
                <input
                  type="number"
                  id="sat"
                  name="sat"
                  placeholder="e.g. 1450"
                  min="400"
                  max="1600"
                  value={form.sat}
                  onChange={handleChange}
                />
              </div>

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
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid rgba(246,244,236,0.3)',
                        borderTopColor: '#F6F4EC',
                        borderRadius: '50%',
                        animation: 'spin 0.9s linear infinite',
                      }}
                    />
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

              {/* Dastlabki holat */}
              {!searched && !loading && (
                <div className="rp-empty">
                  <div className="icon">?</div>
                  <p>Fill in your profile and we'll find your best-fit universities.</p>
                </div>
              )}

              {/* Yuklanish holati */}
              {loading && (
                <div className="rp-loading" style={{ display: 'flex' }}>
                  <div className="spinner"></div>
                  <p>Analyzing your profile…</p>
                </div>
              )}

              {/* Xatolik holati */}
              {!loading && errorMsg && (
                <div className="rp-error" style={{ display: 'flex' }}>
                  <p>⚠️ {errorMsg}</p>
                </div>
              )}

              {/* Natijalar ko'rinishi */}
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

      {/* CSS Stillar */}
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

        .field input::placeholder {
          color: #b0ac9e;
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

        /* Result Panel */
        .result-side {
          position: sticky;
          top: 40px;
        }

        .result-panel {
          background: var(--navy);
          border-radius: 6px;
          padding: 28px 26px 24px;
          position: relative;
          min-height: 380px;
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
          max-height: 520px;
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
          margin-bottom: 6px;
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
