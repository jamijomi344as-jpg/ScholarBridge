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
      setError(err.message || 'Xatolik yuz berdi. Qaytadan urinib ko‘ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4EC] text-[#232320] font-sans">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#F6F4EC]/90 backdrop-blur-md border-b border-[#D8D2C0]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-serif font-bold text-xl text-[#16233F]">
            <span className="w-8 h-8 rounded-full bg-[#16233F] text-[#D9BE7E] flex items-center justify-center font-mono text-xs">
              SB
            </span>
            ScholarBridge <span className="text-[#B8923B] font-sans text-xs">AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5B584E]">
            <a href="#interactive-demo" className="hover:text-[#16233F]">University Matcher</a>
            <a href="#features" className="hover:text-[#16233F]">Scholarships</a>
            <a href="#how-it-works" className="hover:text-[#16233F]">Deadlines</a>
            <a href="#interactive-demo" className="hover:text-[#16233F]">Dashboard</a>
          </nav>
          <a
            href="#interactive-demo"
            className="bg-[#16233F] text-[#F6F4EC] px-5 py-2.5 rounded font-semibold text-xs tracking-wider uppercase hover:bg-[#1F3155] transition"
          >
            Get Matched
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-[#5F7A5A] font-semibold">
            ScholarBridge AI — Find the universities that would actually want you
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#16233F] font-bold leading-tight">
            An AI-driven matcher pairing ambitious international students with <em className="text-[#B8923B] italic">full scholarships</em>.
          </h1>
          <p className="text-[#5B584E] text-base md:text-lg max-w-xl">
            Precision recommendations, verified deadlines, and prioritized scholarship opportunities — presented with academic clarity.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="#interactive-demo"
              className="bg-[#16233F] text-[#F6F4EC] px-6 py-3 rounded font-semibold text-sm hover:bg-[#1F3155] transition shadow-lg"
            >
              Get Matched
            </a>
            <a
              href="#how-it-works"
              className="border-b border-[#232320] pb-1 text-sm font-medium hover:text-[#B8923B] transition"
            >
              Learn more ↓
            </a>
          </div>
        </div>

        {/* Hero Preview Card (Applicant Dossier) */}
        <div className="lg:col-span-5 bg-[#16233F] text-[#F6F4EC] p-6 rounded-xl shadow-2xl border border-[#3A4A6B] relative">
          <div className="flex justify-between items-center mb-6 border-b border-[#3A4A6B] pb-3">
            <span className="font-mono text-xs uppercase text-[#D9BE7E] tracking-wider">Applicant Dossier - Live Preview</span>
            <span className="w-6 h-6 rounded-full bg-[#B8923B]/30 border border-[#D9BE7E] text-[10px] text-[#D9BE7E] flex items-center justify-center font-serif">SB</span>
          </div>
          <div className="space-y-4 font-mono text-xs">
            <div className="flex justify-between border-b border-[#3A4A6B]/50 pb-2">
              <span className="text-slate-400">GPA</span>
              <span className="text-white font-bold">3.8 / 4.0</span>
            </div>
            <div className="flex justify-between border-b border-[#3A4A6B]/50 pb-2">
              <span className="text-slate-400">IELTS</span>
              <span className="text-white font-bold">7.5 Overall</span>
            </div>
            <div className="flex justify-between border-b border-[#3A4A6B]/50 pb-2">
              <span className="text-slate-400">Fit Score Snapshot</span>
              <span className="text-[#8CB088] font-bold">Top Match: 87%</span>
            </div>
          </div>
          <div className="mt-6 bg-[#5F7A5A]/20 p-3 rounded border border-[#5F7A5A]/40 text-[11px] text-[#8CB088]">
            ✓ Matches shown as percentages — immediate clarity on fit and funding probability.
          </div>
        </div>
      </section>

      {/* 3. Common Student Challenges */}
      <section className="bg-[#EFEBDD] py-20 border-y border-[#D8D2C0]">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#B8923B] font-semibold block mb-2">The Problem</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#16233F] font-bold mb-12">Common Student Challenges</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F6F4EC] p-6 rounded border border-[#D8D2C0]">
              <span className="font-mono text-xs text-[#B8923B] font-bold block mb-2">01</span>
              <h3 className="font-serif text-xl font-bold text-[#16233F] mb-2">No sense of fit</h3>
              <p className="text-sm text-[#5B584E]">
                Students apply broadly without program-level fit. Our AI assesses alignment to surface institutions where candidacy is credible.
              </p>
            </div>
            <div className="bg-[#F6F4EC] p-6 rounded border border-[#D8D2C0]">
              <span className="font-mono text-xs text-[#B8923B] font-bold block mb-2">02</span>
              <h3 className="font-serif text-xl font-bold text-[#16233F] mb-2">Hidden scholarships</h3>
              <p className="text-sm text-[#5B584E]">
                Many full scholarships remain undiscovered. ScholarBridge mines institutional funds to surface opportunities matched to your profile.
              </p>
            </div>
            <div className="bg-[#F6F4EC] p-6 rounded border border-[#D8D2C0]">
              <span className="font-mono text-xs text-[#B8923B] font-bold block mb-2">03</span>
              <h3 className="font-serif text-xl font-bold text-[#16233F] mb-2">Missed deadlines</h3>
              <p className="text-sm text-[#5B584E]">
                Deadlines vary by program and rolling cycles. We deliver prioritized countdowns so applicants never miss critical submissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="bg-[#16233F] text-[#F6F4EC] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D9BE7E] font-semibold block mb-2">Methodology</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-12">How It Works — Three Clear Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-2 border-[#B8923B] pl-6 space-y-2">
              <span className="font-serif italic text-3xl text-[#D9BE7E]">01</span>
              <h3 className="font-bold text-lg">Input Profile</h3>
              <p className="text-xs text-slate-300">GPA, IELTS, SAT scores, major preferences, and budget priorities.</p>
            </div>
            <div className="border-l-2 border-[#B8923B] pl-6 space-y-2">
              <span className="font-serif italic text-3xl text-[#D9BE7E]">02</span>
              <h3 className="font-bold text-lg">AI Fit Analysis</h3>
              <p className="text-xs text-slate-300">Curriculum overlap, faculty fit, published funding, and historical admission signals.</p>
            </div>
            <div className="border-l-2 border-[#B8923B] pl-6 space-y-2">
              <span className="font-serif italic text-3xl text-[#D9BE7E]">03</span>
              <h3 className="font-bold text-lg">Ranked Shortlist</h3>
              <p className="text-xs text-slate-300">Top 10 universities with exact Match % and estimated Full Scholarship %.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Dashboard Preview & Live Form */}
      <section id="interactive-demo" className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#5F7A5A] font-semibold block mb-1">Live Engine</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#16233F] font-bold">Interactive Dashboard</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Application Form (Left) */}
          <div className="lg:col-span-5 bg-[#EFEBDD] p-6 rounded-lg border border-[#D8D2C0] shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#16233F] mb-4 pb-2 border-b border-[#D8D2C0]">
              Application Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#5B584E] mb-1">GPA (Baholar)</label>
                  <input
                    type="text"
                    value={schoolGrade}
                    onChange={(e) => setSchoolGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#D8D2C0] bg-[#F6F4EC] text-sm focus:outline-none focus:border-[#16233F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#5B584E] mb-1">IELTS Balli</label>
                  <input
                    type="text"
                    value={ielts}
                    onChange={(e) => setIelts(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#D8D2C0] bg-[#F6F4EC] text-sm focus:outline-none focus:border-[#16233F]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#5B584E] mb-1">SAT Balli (Ixtiyoriy)</label>
                <input
                  type="text"
                  value={sat}
                  onChange={(e) => setSat(e.target.value)}
                  placeholder="Masalan: 1400"
                  className="w-full px-3 py-2 rounded border border-[#D8D2C0] bg-[#F6F4EC] text-sm focus:outline-none focus:border-[#16233F]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#5B584E] mb-1">Yo'nalish (Major)</label>
                <input
                  type="text"
                  value={majors.join(', ')}
                  onChange={(e) => setMajors(e.target.value.split(',').map((s) => s.trim()))}
                  className="w-full px-3 py-2 rounded border border-[#D8D2C0] bg-[#F6F4EC] text-sm focus:outline-none focus:border-[#16233F]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#5B584E] mb-1">Grant Turi</label>
                <select
                  value={fundingTypes[0]}
                  onChange={(e) => setFundingTypes([e.target.value])}
                  className="w-full px-3 py-2 rounded border border-[#D8D2C0] bg-[#F6F4EC] text-sm focus:outline-none focus:border-[#16233F]"
                >
                  <option value="Full scholarship only">To'liq grant (Full Scholarship)</option>
                  <option value="Partial scholarship">Qisman grant</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#5B584E] mb-1">Maqsadli Davlatlar</label>
                <input
                  type="text"
                  value={selectedCountries.join(', ')}
                  onChange={(e) => setSelectedCountries(e.target.value.split(',').map((s) => s.trim()))}
                  className="w-full px-3 py-2 rounded border border-[#D8D2C0] bg-[#F6F4EC] text-sm focus:outline-none focus:border-[#16233F]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-[#16233F] text-[#F6F4EC] font-semibold text-sm rounded hover:bg-[#1F3155] transition disabled:opacity-50"
              >
                {loading ? 'AI Tahlil qilmoqda...' : 'Universitetlarni topish →'}
              </button>
            </form>
          </div>

          {/* Live AI Analysis Results (Right) */}
          <div className="lg:col-span-7 bg-[#16233F] text-[#F6F4EC] p-6 rounded-lg shadow-xl relative min-h-[500px]">
            <div className="flex items-center justify-between pb-4 border-b border-[#3A4A6B] mb-6">
              <span className="font-mono text-xs text-[#D9BE7E] tracking-widest uppercase">
                AI Analysis Results
              </span>
              <span className="font-mono text-xs text-[#5F7A5A] font-bold bg-[#5F7A5A]/20 px-3 py-1 rounded">
                {recommendations.length} MATCHES FOUND
              </span>
            </div>

            {loading && (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#D9BE7E] border-t-transparent mb-4"></div>
                <p className="text-sm text-slate-300 font-mono">Imkoniyatlar hisoblanmoqda...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-900/40 border border-red-700/50 rounded text-red-200 text-sm">
                ⚠️ {error}
              </div>
            )}

            {!loading && !error && recommendations.length === 0 && (
              <div className="text-center py-20 text-slate-400 font-mono text-sm leading-relaxed">
                Formani to'ldiring va "Universitetlarni topish" tugmasini bosing.<br />
                Natijalar foiz shaklida shu yerda namoyon bo'ladi.
              </div>
            )}

            {/* Recommendations List */}
            {!loading && recommendations.length > 0 && (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-5 bg-[#1F3155]/60 border border-[#3A4A6B] rounded-lg hover:border-[#D9BE7E]/60 transition space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif font-bold text-lg text-white">
                          {rec.universityName}
                        </h4>
                        <p className="text-xs font-mono text-slate-400">📍 {rec.country}</p>
                      </div>
                      <div className="bg-[#B8923B]/20 border border-[#B8923B]/50 px-3 py-1 rounded text-right">
                        <span className="block text-[10px] font-mono text-[#D9BE7E]">MOSLIK</span>
                        <span className="font-mono text-sm font-bold text-amber-300">{rec.matchPercentage}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#16233F] p-2.5 rounded border border-[#3A4A6B]">
                        <span className="text-[#D9BE7E] block font-mono">🎓 Grant:</span>
                        <span className="font-medium text-slate-200">{rec.scholarshipName}</span>
                      </div>
                      {rec.scholarshipChance && (
                        <div className="bg-[#5F7A5A]/20 p-2.5 rounded border border-[#5F7A5A]/40">
                          <span className="text-[#8CB088] block font-mono">📈 Grant ehtimoli:</span>
                          <span className="font-bold text-white text-sm">{rec.scholarshipChance}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{rec.description}</p>

                    {rec.website && (
                      <div className="text-right pt-1">
                        <a
                          href={rec.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-[#D9BE7E] hover:underline"
                        >
                          Rasmiy saytga o'tish →
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Key Features */}
      <section id="features" className="bg-[#EFEBDD] py-20 border-t border-[#D8D2C0]">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#B8923B] font-semibold block mb-2">Capabilities</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#16233F] font-bold mb-12">Key Features & Critical Metrics</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F6F4EC] p-6 rounded border border-[#D8D2C0]">
              <h3 className="font-bold text-lg text-[#16233F] mb-2">Match Probability Engine</h3>
              <p className="text-sm text-[#5B584E]">
                Proprietary model weighs curriculum overlap, faculty fit, published funding, and historical admission signals.
              </p>
            </div>
            <div className="bg-[#F6F4EC] p-6 rounded border border-[#D8D2C0]">
              <h3 className="font-bold text-lg text-[#16233F] mb-2">Deadline Countdown Tracker</h3>
              <p className="text-sm text-[#5B584E]">
                Personalized timeline with prioritized tasks and automated reminders to preserve eligibility for full scholarships.
              </p>
            </div>
            <div className="bg-[#F6F4EC] p-6 rounded border border-[#D8D2C0]">
              <h3 className="font-bold text-lg text-[#16233F] mb-2">Scholarship Breakdown</h3>
              <p className="text-sm text-[#5B584E]">
                Clear separation of Full vs Partial awards, with estimated award probability and application complexity scoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-[#16233F] text-slate-400 py-10 border-t border-[#3A4A6B]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-white">
            <span className="w-6 h-6 rounded-full bg-[#B8923B] text-[#16233F] flex items-center justify-center font-bold text-[10px]">SB</span>
            ScholarBridge AI
          </div>
          <div>Built in Namangan · ScholarBridge AI</div>
          <div>Contact: admissions@scholarbridge.ai</div>
        </div>
      </footer>
    </div>
  );
}
