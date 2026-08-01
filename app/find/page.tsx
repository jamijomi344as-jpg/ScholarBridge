"use client";

import React, { useState } from "react";

export default function FindPage() {
  const [formData, setFormData] = useState({
    country: "Uzbekistan",
    gpa: "3.85",
    ielts: "7.5",
    major: "Computer Science",
    budget: "Full Scholarship Required",
  });

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasSearched(true);
    }, 1000);
  };

  return (
    <div
      style={{
        background: "#F7F8FC",
        color: "#1E2A4A",
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.6,
        WebkitFontSmoothing: "antialiased",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 32px;
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 0 18px;
          }
        }

        /* NAV */
        nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(247, 248, 252, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #e2e6f0;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 66px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Instrument Serif", serif;
          font-size: 1.2rem;
          color: #1e2a4a;
        }
        .logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #1e2a4a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          font-weight: 500;
          color: #aae4fe;
          flex-shrink: 0;
        }
        .nav-link-back {
          font-size: 0.87rem;
          color: #5a6882;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          transition: color 0.15s;
        }
        .nav-link-back:hover {
          color: #1e2a4a;
        }

        /* LAYOUT */
        .find-container {
          padding: 48px 0 80px;
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .find-container {
            grid-template-columns: 1fr;
          }
        }

        /* SIDEBAR FORM CARD */
        .form-card {
          background: #fff;
          border: 1px solid #dde3ef;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(30, 42, 74, 0.04);
          position: sticky;
          top: 90px;
        }

        .form-title {
          font-family: "Instrument Serif", serif;
          font-size: 1.5rem;
          color: #1e2a4a;
          margin-bottom: 6px;
        }

        .form-sub {
          font-size: 0.82rem;
          color: #8a96aa;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #5a6882;
          margin-bottom: 6px;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 10px 14px;
          background: #f7f9fd;
          border: 1px solid #dde3ef;
          border-radius: 8px;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: #1e2a4a;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: #3b6fe0;
          box-shadow: 0 0 0 3px rgba(59, 111, 224, 0.12);
          background: #fff;
        }

        .btn-submit {
          width: 100%;
          margin-top: 10px;
          background: #1e2a4a;
          color: #fff;
          font-size: 0.92rem;
          font-weight: 600;
          padding: 12px;
          border-radius: 9px;
          border: none;
          cursor: pointer;
          transition: background 0.18s, transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-submit:hover {
          background: #2a3a60;
          transform: translateY(-1px);
        }

        /* RESULTS AREA */
        .results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #dde3ef;
        }

        .results-title {
          font-family: "Instrument Serif", serif;
          font-size: 1.8rem;
          color: #1e2a4a;
        }

        .results-count {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          background: #eef3fd;
          color: #3b6fe0;
          border: 1px solid #c5d5f8;
          padding: 4px 10px;
          border-radius: 100px;
        }

        .matches-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .match-card {
          background: #fff;
          border: 1px solid #dde3ef;
          border-radius: 14px;
          padding: 20px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }

        .match-card:hover {
          border-color: #aae4fe;
          box-shadow: 0 6px 20px rgba(30, 42, 74, 0.06);
          transform: translateY(-2px);
        }

        .match-card.featured {
          border-color: #c5d5f8;
          background: #f7f9fd;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 12px;
        }

        .uni-title {
          font-family: "Instrument Serif", serif;
          font-size: 1.4rem;
          color: #1e2a4a;
          line-height: 1.2;
        }

        .uni-location {
          font-size: 0.8rem;
          color: #8a96aa;
          margin-top: 2px;
        }

        .match-badge-wrap {
          text-align: right;
        }

        .match-pct-val {
          font-family: "JetBrains Mono", monospace;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .match-pct-val.vhigh {
          color: #0d9488;
        }
        .match-pct-val.high {
          color: #16a34a;
        }
        .match-pct-val.mid {
          color: #d97706;
        }

        .uni-tag {
          font-size: 0.68rem;
          padding: 3px 8px;
          border-radius: 100px;
          font-family: "JetBrains Mono", monospace;
          display: inline-block;
          margin-top: 4px;
        }
        .uni-tag.reach {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #fde68a;
        }
        .uni-tag.target {
          background: #eef3fd;
          color: #1d4ed8;
          border: 1px solid #c5d5f8;
        }
        .uni-tag.safety {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .card-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          padding: 12px;
          background: #f7f8fc;
          border-radius: 8px;
          border: 1px solid #e2e6f0;
          margin-top: 12px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 0.7rem;
          color: #8a96aa;
          font-family: "JetBrains Mono", monospace;
        }

        .detail-val {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1e2a4a;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #edf0f7;
        }

        .deadline-text {
          font-size: 0.8rem;
          color: #5a6882;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-apply {
          font-size: 0.82rem;
          font-weight: 600;
          color: #3b6fe0;
          border: 1px solid #c5d5f8;
          background: #eef3fd;
          padding: 6px 14px;
          border-radius: 6px;
          transition: all 0.15s;
        }

        .btn-apply:hover {
          background: #3b6fe0;
          color: #fff;
        }

        /* FOOTER */
        footer {
          border-top: 1px solid #dde3ef;
          padding: 28px 0;
          background: #fff;
        }
        .foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .foot-right {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.72rem;
          color: #a0aabb;
          display: flex;
          gap: 20px;
        }
      `}</style>

      {/* NAVBAR */}
      <nav>
        <div className="wrap nav-inner">
          <a href="/" className="logo">
            <div className="logo-mark">SB</div>
            ScholarBridge
            <span
              style={{
                color: "#AAE4FE",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                marginLeft: "5px",
                background: "#1E2A4A",
                padding: "1px 5px",
                borderRadius: "4px",
              }}
            >
              AI
            </span>
          </a>
          <a href="/" className="nav-link-back">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="wrap find-container">
        {/* SIDEBAR FORM */}
        <div className="form-card">
          <h1 className="form-title">Match Engine</h1>
          <p className="form-sub">
            Update your profile metrics to generate accurate admission
            probabilities.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Country of Origin</label>
              <input
                type="text"
                name="country"
                className="form-input"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">GPA (Out of 4.0)</label>
              <input
                type="text"
                name="gpa"
                className="form-input"
                value={formData.gpa}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">IELTS / TOEFL Score</label>
              <input
                type="text"
                name="ielts"
                className="form-input"
                value={formData.ielts}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Intended Major</label>
              <input
                type="text"
                name="major"
                className="form-input"
                value={formData.major}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Funding Preference</label>
              <select
                name="budget"
                className="form-select"
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value="Full Scholarship Required">
                  Full Scholarship Required
                </option>
                <option value="Partial Aid Needed">Partial Aid Needed</option>
                <option value="Self-Funded">Self-Funded</option>
              </select>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Analyzing profile..." : "Recalculate Matches →"}
            </button>
          </form>
        </div>

        {/* RESULTS AREA */}
        <div>
          <div className="results-header">
            <div>
              <h2 className="results-title">Matched Universities</h2>
            </div>
            <span className="results-count">3 Recommendations</span>
          </div>

          {hasSearched && (
            <div className="matches-list">
              {/* CARD 1 */}
              <div className="match-card featured">
                <div className="card-top">
                  <div>
                    <h3 className="uni-title">Seoul National University</h3>
                    <div className="uni-location">📍 Seoul, South Korea</div>
                  </div>
                  <div className="match-badge-wrap">
                    <div className="match-pct-val vhigh">91% Match</div>
                    <span className="uni-tag safety">Safety School</span>
                  </div>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <span className="detail-label">Scholarship</span>
                    <span className="detail-val">Global Korea (GKS) Full</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Coverage</span>
                    <span className="detail-val">100% Tuition + Stipend</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Program</span>
                    <span className="detail-val">{formData.major}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="deadline-text">⏳ Deadline: Nov 30, 2026</span>
                  <a
                    href="https://snu.ac.kr"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-apply"
                  >
                    View Program →
                  </a>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="match-card">
                <div className="card-top">
                  <div>
                    <h3 className="uni-title">University of Toronto</h3>
                    <div className="uni-location">📍 Toronto, Canada</div>
                  </div>
                  <div className="match-badge-wrap">
                    <div className="match-pct-val high">87% Match</div>
                    <span className="uni-tag target">Target School</span>
                  </div>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <span className="detail-label">Scholarship</span>
                    <span className="detail-val">Lester B. Pearson</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Coverage</span>
                    <span className="detail-val">Full Tuition + Books</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Program</span>
                    <span className="detail-val">{formData.major}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="deadline-text">⏳ Deadline: Dec 01, 2026</span>
                  <a
                    href="https://utoronto.ca"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-apply"
                  >
                    View Program →
                  </a>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="match-card">
                <div className="card-top">
                  <div>
                    <h3 className="uni-title">TU Delft</h3>
                    <div className="uni-location">📍 Delft, Netherlands</div>
                  </div>
                  <div className="match-badge-wrap">
                    <div className="match-pct-val mid">74% Match</div>
                    <span className="uni-tag reach">Reach School</span>
                  </div>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <span className="detail-label">Scholarship</span>
                    <span className="detail-val">Justus & Louise van Effen</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Coverage</span>
                    <span className="detail-val">Full Tuition + Living</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Program</span>
                    <span className="detail-val">{formData.major}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <span className="deadline-text">⏳ Deadline: Jan 15, 2027</span>
                  <a
                    href="https://tudelft.nl"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-apply"
                  >
                    View Program →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="wrap foot">
          <div className="logo">
            <div className="logo-mark">SB</div>ScholarBridge
          </div>
          <div className="foot-right">
            <span>Built in Tashkent</span>
            <span>© 2026 ScholarBridge AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
