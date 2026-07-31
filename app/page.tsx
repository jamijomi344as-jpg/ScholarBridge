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
    setRecommendations([]);

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
      setError(err.message || 'Xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4EC] text-[#232320] font-sans">
      {/* Header Nav */}
      <header className="sticky top-0 z-50 bg-[#F6F4EC]/90 backdrop-blur-md border-b border-[#D8D2C0]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-serif font-semibold text-xl text-[#16233F]">
            <span className="w-8 h-8 rounded-full bg-[#16233F] text-[#D9BE7E] flex items-center justify-center font-mono text-xs font-medium">
              SB
            </span>
            ScholarBridge AI
          </div>
          <a
            href="#form-section"
            className="text-xs font-semibold uppercase tracking-wider bg-[#16233F] text-[#F6F4EC] px-4 py-2.5 rounded hover:bg-[#1F3155] transition-colors"
          >
            Match Tayyorlash
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10 text-center md:text-left">
          <p className="text-xs font-mono uppercase tracking-widest text-[#5F7A5A] font-semibold mb-2">
            AI-POWERED COLLEGE MATCHING
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-[#16233F] font-bold mb-3">
            O'zingizga mos <em>universitetlar va grantlarni</em> toping.
          </h1>
          <p className="text-[#5B584E] max-w-2xl text-base">
            Baholaringiz, test natijalaringiz va byudjetingizni kiriting. Sun'iy intellekt sizga mos keladigan top 10 ta universitetni foiz ko'rinishidagi aniq imkoniyatlar bilan hisoblab beradi.
          </p>
        </div>

        <div id="form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card */}
          <div className="lg:col-span-5 bg-[#EFEBDD] p-6 md:p-8 rounded-lg border border-[#D8D2C0] shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#16233F] mb-6 pb-2 border-b border-[#D8D2C0]">
              Profilingizni kiriting
            </h2>

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
                <label className="block text-xs font-mono text-[#5B584E] mb-1">Yo'nalishingiz (Major)</label>
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
                  <option value="Partial scholarship">Qisman grant (Partial Scholarship)</option>
                  <option value="Any funding option">Har qanday grant turi</option>
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
                className="w-full mt-2 py-3 bg-[#16233F] text-[#F6F4EC] font-semibold text-sm rounded hover:bg-[#1F3155] transition-colors disabled:opacity-50"
              >
                {loading ? 'Tahlil qilinmoqda...' : 'Universitetlarni topish →'}
              </button>
            </form>
          </div>

          {/* Results Dossier Panel */}
          <div className="lg:col-span-7 bg-[#16233F] text-[#F6F4EC] p-6 md:p-8 rounded-lg shadow-xl relative min-h-[500px]">
            <div className="flex items-center justify-between pb-4 border-b border-[#3A4A6B] mb-6">
              <span className="font-mono text-xs text-[#D9BE7E] tracking-widest uppercase">
                Applicant Matches Dossier
              </span>
              <span className="font-mono text-xs text-[#5F7A5A] font-bold bg-[#5F7A5A]/20 px-3 py-1 rounded">
                {recommendations.length} MATCHES FOUND
              </span>
            </div>

            {loading && (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#D9BE7E] border-t-transparent mb-4"></div>
                <p className="text-sm text-slate-300 font-mono">10 ta universitet va grant imkoniyatlari hisoblanmoqda...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-900/40 border border-red-700/50 rounded text-red-200 text-sm">
                ⚠️ {error}
              </div>
            )}

            {!loading && !error && recommendations.length === 0 && (
              <div className="text-center py-20 text-slate-400 font-mono text-sm">
                Formani to'ldiring va "Universitetlarni topish" tugmasini bosing.
              </div>
            )}

            {/* Recommendations List */}
            {!loading && recommendations.length > 0 && (
              <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-5 bg-[#1F3155]/60 border border-[#3A4A6B] rounded-lg hover:border-[#D9BE7E]/60 transition-colors space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-white">
                          {rec.universityName}
                        </h3>
                        <p className="text-xs font-mono text-slate-400">📍 {rec.country}</p>
                      </div>
                      
                      {/* Moslik Foizi Badge */}
                      <div className="bg-[#B8923B]/20 border border-[#B8923B]/50 px-3 py-1 rounded text-right">
                        <span className="block text-[10px] font-mono text-[#D9BE7E] uppercase">Moslik</span>
                        <span className="font-mono text-sm font-bold text-amber-300">{rec.matchPercentage}%</span>
                      </div>
                    </div>

                    {/* Grant Nomi & Ehtimoli */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#16233F] p-2.5 rounded border border-[#3A4A6B]">
                        <span className="text-[#D9BE7E] block font-mono">🎓 Grant dasturi:</span>
                        <span className="font-medium text-slate-200">{rec.scholarshipName}</span>
                      </div>
                      {rec.scholarshipChance && (
                        <div className="bg-[#5F7A5A]/20 p-2.5 rounded border border-[#5F7A5A]/40">
                          <span className="text-[#8CB088] block font-mono">📈 Grant yutish ehtimoli:</span>
                          <span className="font-bold text-white text-sm">{rec.scholarshipChance}</span>
                        </div>
                      )}
                    </div>

                    {/* Ehtimol Sababi va Tahlili */}
                    {rec.scholarshipChanceDetails && (
                      <p className="text-xs text-slate-300 bg-[#16233F]/50 p-2.5 rounded border border-[#3A4A6B]/50 leading-relaxed">
                        🔍 <strong>Imkoniyat tahlili:</strong> {rec.scholarshipChanceDetails}
                      </p>
                    )}

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
      </main>

      <footer className="mt-20 border-t border-[#D8D2C0] py-6 text-center text-xs font-mono text-[#5B584E]">
        Built in Tashkent · ScholarBridge AI
      </footer>
    </div>
  );
}
