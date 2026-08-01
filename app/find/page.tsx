"use client";

import React, { useState } from "react";

const TOP_20_MAJORS = [
  "Computer Science & AI",
  "Software Engineering",
  "Data Science & Analytics",
  "Business Administration & Management",
  "Finance & Economics",
  "Cybersecurity",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Biomedical Engineering",
  "Civil & Environmental Engineering",
  "International Relations & Politics",
  "Graphic & UI/UX Design",
  "Architecture",
  "Medicine & Pre-Med",
  "Biotechnology",
  "Marketing & Digital Media",
  "Psychology",
  "Law & Legal Studies",
  "Physics & Astronomy",
  "Mathematics & Statistics",
];

const COUNTRIES_LIST = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "South Korea",
  "Japan",
  "Netherlands",
  "Australia",
  "China",
  "Singapore",
  "Italy",
  "France",
  "Turkey",
];

interface UniversityMatch {
  name: string;
  location: string;
  matchScore: number;
  category: "Reach" | "Target" | "Safety";
  scholarshipName: string;
  coverage: string;
  program: string;
  deadline: string;
  officialWebsite: string;
}

export default function FindPage() {
  const [formData, setFormData] = useState({
    country: "Uzbekistan",
    gpa: "4.8",
    sat: "1450",
    ielts: "7.5",
    budget: "Full Scholarship Required",
  });

  const [selectedMajors, setSelectedMajors] = useState<string[]>([
    "Computer Science & AI",
  ]);
  const [targetCountries, setTargetCountries] = useState<string[]>([
    "All Countries",
  ]);

  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState<UniversityMatch[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleMajorToggle = (major: string) => {
    if (selectedMajors.includes(major)) {
      if (selectedMajors.length > 1) {
        setSelectedMajors(selectedMajors.filter((m) => m !== major));
      }
    } else {
      setSelectedMajors([...selectedMajors, major]);
    }
  };

  const handleCountryToggle = (c: string) => {
    if (c === "All Countries") {
      setTargetCountries(["All Countries"]);
      return;
    }

    let updated = targetCountries.filter((item) => item !== "All Countries");
    if (updated.includes(c)) {
      updated = updated.filter((item) => item !== c);
      if (updated.length === 0) updated = ["All Countries"];
    } else {
      updated.push(c);
    }
    setTargetCountries(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: formData.country,
          gpa: formData.gpa,
          sat: formData.sat,
          ielts: formData.ielts,
          budget: formData.budget,
          majors: selectedMajors,
          targetCountries: targetCountries,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUniversities(data.universities);
      } else {
        setErrorMsg(data.error || "AI qidiruvda xatolik yuz berdi.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Server bilan bog'lanishda xatolik bo'ldi. Tarmoqni tekshiring.");
    } finally {
      setLoading(false);
    }
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
      }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }

        .wrap { max-width: 1160px; margin: 0 auto; padding: 0 32px; }
        @media (max-width: 640px) { .wrap { padding: 0 18px; } }

        nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(247, 248, 252, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #E2E6F0;
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 66px; }
        .logo { display: flex; align-items: center; gap: 10px; font-family: 'Instrument Serif', serif; font-size: 1.2rem; color: #1E2A4A; }
        .logo-mark {
          width: 34px; height: 34px; border-radius: 9px; background: #1E2A4A;
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 500; color: #AAE4FE;
        }
        .nav-link-back { font-size: 0.87rem; color: #5A6882; font-weight: 500; transition: color .15s; }
        .nav-link-back:hover { color: #1E2A4A; }

        .find-container {
          padding: 48px 0 80px;
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 32px;
          align-items: start;
        }
        @media(max-width: 900px) { .find-container { grid-template-columns: 1fr; } }

        .form-card {
          background: #fff; border: 1px solid #DDE3EF; border-radius: 16px;
          padding: 24px; box-shadow: 0 4px 20px rgba(30,42,74,0.04);
        }
        .form-title { font-family: 'Instrument Serif', serif; font-size: 1.5rem; color: #1E2A4A; margin-bottom: 6px; }
        .form-sub { font-size: 0.82rem; color: #8A96AA; margin-bottom: 20px; }
        .form-group { margin-bottom: 18px; }
        .form-label {
          display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
          letter-spacing: 0.05em; text-transform: uppercase; color: #5A6882; margin-bottom: 8px;
        }
        .form-input, .form-select {
          width: 100%; padding: 10px 14px; background: #F7F9FD;
          border: 1px solid #DDE3EF; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #1E2A4A; outline: none;
        }
        .form-input:focus, .form-select:focus { border-color: #3B6FE0; background: #fff; }

        .chip-container { display: flex; flex-wrap: wrap; gap: 6px; max-height: 160px; overflow-y: auto; padding: 4px; border: 1px solid #E2E6F0; border-radius: 8px; background: #F7F9FD; }
        .chip {
          font-size: 0.75rem; padding: 4px 10px; border-radius: 6px; cursor: pointer;
          border: 1px solid #DDE3EF; background: #fff; color: #5A6882; transition: all .15s;
        }
        .chip.active { background: #EEF3FD; border-color: #3B6FE0; color: #3B6FE0; font-weight: 600; }

        .btn-submit {
          width: 100%; margin-top: 10px; background: #1E2A4A; color: #fff;
          font-size: 0.92rem; font-weight: 600; padding: 12px; border-radius: 9px;
          border: none; cursor: pointer; transition: background .18s;
        }
        .btn-submit:hover { background: #2A3A60; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .results-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #DDE3EF; }
        .results-title { font-family: 'Instrument Serif', serif; font-size: 1.8rem; color: #1E2A4A; }
        .results-count { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: #EEF3FD; color: #3B6FE0; border: 1px solid #C5D5F8; padding: 4px 10px; border-radius: 100px; }

        .matches-list { display: flex; flex-direction: column; gap: 16px; }
        .match-card { background: #fff; border: 1px solid #DDE3EF; border-radius: 14px; padding: 20px; transition: border-color .2s, box-shadow .2s; }
        .match-card:hover { border-color: #AAE4FE; box-shadow: 0 6px 20px rgba(30,42,74,0.06); }
        .card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 12px; }
        .uni-title { font-family: 'Instrument Serif', serif; font-size: 1.4rem; color: #1E2A4A; line-height: 1.2; }
        .uni-location { font-size: 0.8rem; color: #8A96AA; margin-top: 2px; }

        .match-pct-val { font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; font-weight: 700; text-align: right; }
        .match-pct-val.vhigh { color: #0D9488; }
        .match-pct-val.high { color: #16A34A; }
        .match-pct-val.mid { color: #D97706; }

        .uni-tag { font-size: 0.68rem; padding: 3px 8px; border-radius: 100px; font-family: 'JetBrains Mono', monospace; display: inline-block; margin-top: 4px; }
        .uni-tag.reach { background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A; }
        .uni-tag.target { background: #EEF3FD; color: #1D4ED8; border: 1px solid #C5D5F8; }
        .uni-tag.safety { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }

        .card-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; padding: 12px; background: #F7F8FC; border-radius: 8px; border: 1px solid #E2E6F0; margin-top: 12px; }
        .detail-item { display: flex; flex-direction: column; }
        .detail-label { font-size: 0.7rem; color: #8A96AA; font-family: 'JetBrains Mono', monospace; }
        .detail-val { font-size: 0.85rem; font-weight: 600; color: #1E2A4A; }

        .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding-top: 12px; border-top: 1px solid #EDF0F7; }
        .deadline-text { font-size: 0.8rem; color: #5A6882; }

        .btn-apply {
          font-size: 0.82rem; font-weight: 600; color: #3B6FE0; border: 1px solid #C5D5F8;
          background: #EEF3FD; padding: 6px 14px; border-radius: 6px; transition: all .15s;
        }
        .btn-apply:hover { background: #3B6FE0; color: #fff; }

        .empty-state {
          background: #fff; border: 1px dashed #DDE3EF; border-radius: 14px; padding: 48px; text-align: center; color: #8A96AA;
        }

        footer { border-top: 1px solid #DDE3EF; padding: 28px 0; background: #fff; }
        .foot { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .foot-right { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #A0AABB; display: flex; gap: 20px; }
      `}</style>

      {/* NAVBAR */}
      <nav>
        <div className="wrap nav-inner">
          <a href="/" className="logo">
            <div className="logo-mark">SB</div>
            ScholarBridge
            <span style={{ color: "#AAE4FE", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", marginLeft: "5px", background: "#1E2A4A", padding: "1px 5px", borderRadius: "4px" }}>
              AI
            </span>
          </a>
          <a href="/" className="nav-link-back">← Back to Home</a>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="wrap find-container">
        {/* FORM SIDEBAR */}
        <div className="form-card">
          <h1 className="form-title">Match Engine</h1>
          <p className="form-sub">Adjust your criteria to query real-time AI matches.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Country of Origin</label>
              <input
                type="text"
                className="form-input"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">GPA (Out of 5.0)</label>
              <input
                type="text"
                className="form-input"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">SAT Score (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 1450 or N/A"
                value={formData.sat}
                onChange={(e) => setFormData({ ...formData, sat: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">IELTS / TOEFL Score</label>
              <input
                type="text"
                className="form-input"
                value={formData.ielts}
                onChange={(e) => setFormData({ ...formData, ielts: e.target.value })}
              />
            </div>

            {/* MULTI SELECT MAJORS */}
            <div className="form-group">
              <label className="form-label">Select Majors (Multiple)</label>
              <div className="chip-container">
                {TOP_20_MAJORS.map((m) => (
                  <span
                    key={m}
                    className={`chip ${selectedMajors.includes(m) ? "active" : ""}`}
                    onClick={() => handleMajorToggle(m)}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* MULTI SELECT TARGET COUNTRIES */}
            <div className="form-group">
              <label className="form-label">Target Countries</label>
              <div className="chip-container">
                {COUNTRIES_LIST.map((c) => (
                  <span
                    key={c}
                    className={`chip ${targetCountries.includes(c) ? "active" : ""}`}
                    onClick={() => handleCountryToggle(c)}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Funding Preference</label>
              <select
                className="form-select"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="Full Scholarship Required">Full Scholarship Required</option>
                <option value="Partial Aid Needed">Partial Aid Needed</option>
                <option value="Self-Funded">Self-Funded</option>
              </select>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Analyzing with AI..." : "Recalculate Matches →"}
            </button>
          </form>
        </div>

        {/* RESULTS AREA */}
        <div>
          <div className="results-header">
            <h2 className="results-title">Matched Universities</h2>
            <span className="results-count">
              {universities.length} {universities.length === 1 ? "Match" : "Matches"}
            </span>
          </div>

          {errorMsg && (
            <div style={{ color: "#DC2626", background: "#FEE2E2", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "0.85rem" }}>
              {errorMsg}
            </div>
          )}

          {loading ? (
            <div className="empty-state">
              <p>🤖 AI is scanning real admission datasets based on your parameters...</p>
            </div>
          ) : universities.length > 0 ? (
            <div className="matches-list">
              {universities.map((uni, idx) => (
                <div key={idx} className="match-card">
                  <div className="card-top">
                    <div>
                      <h3 className="uni-title">{uni.name}</h3>
                      <div className="uni-location">📍 {uni.location}</div>
                    </div>
                    <div>
                      <div
                        className={`match-pct-val ${
                          uni.matchScore >= 90
                            ? "vhigh"
                            : uni.matchScore >= 80
                            ? "high"
                            : "mid"
                        }`}
                      >
                        {uni.matchScore}% Match
                      </div>
                      <span className={`uni-tag ${(uni.category || "target").toLowerCase()}`}>
                        {uni.category} University
                      </span>
                    </div>
                  </div>

                  <div className="card-details">
                    <div className="detail-item">
                      <span className="detail-label">Scholarship</span>
                      <span className="detail-val">{uni.scholarshipName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Coverage</span>
                      <span className="detail-val">{uni.coverage}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Program</span>
                      <span className="detail-val">{uni.program}</span>
                    </div>
                  </div>

                  <div className="card-footer">
                    <span className="deadline-text">⏳ Deadline: {uni.deadline}</span>
                    <a
                      href={uni.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-apply"
                    >
                      View Website →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Formada maʼlumotlarni tanlang va AI yordamida universitetlarni izlash uchun **"Recalculate Matches →"** tugmasini bosing.</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="wrap foot">
          <div className="logo"><div className="logo-mark">SB</div>ScholarBridge</div>
          <div className="foot-right"><span>Built in Tashkent</span><span>© 2026 ScholarBridge AI</span></div>
        </div>
      </footer>
    </div>
  );
}
