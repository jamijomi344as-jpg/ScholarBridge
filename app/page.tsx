'use client';

import { useState } from 'react';

interface Recommendation {
  id: number;
  universityName: string;
  country: string;
  category: string;
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
    <main className="min-h-screen bg-[#FDFBF7] text-[#1E293B] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
            ScholarBridge AI
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Imkoniyatlaringiz va profilingizga to'liq mos keladigan grantlar hamda universitetlarni tahlil qiling.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Form */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-slate-900 border-b pb-3">
              Profilingizni kiriting
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    GPA (Baholaringiz)
                  </label>
                  <input
                    type="text"
                    value={schoolGrade}
                    onChange={(e) => setSchoolGrade(e.target.value)}
                    placeholder="Masalan: 4.8 yoki 5"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    IELTS Balli
                  </label>
                  <input
                    type="text"
                    value={ielts}
                    onChange={(e) => setIelts(e.target.value)}
                    placeholder="Masalan: 7.0"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  SAT Balli (Ixtiyoriy)
                </label>
                <input
                  type="text"
                  value={sat}
                  onChange={(e) => setSat(e.target.value)}
                  placeholder="Masalan: 1450 (mavjud bo'lsa)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Qiziqqan Yo'nalish (Major)
                </label>
                <input
                  type="text"
                  value={majors.join(', ')}
                  onChange={(e) => setMajors(e.target.value.split(',').map((s) => s.trim()))}
                  placeholder="Masalan: Computer Science, Business"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Grant Turi (Funding)
                </label>
                <select
                  value={fundingTypes[0]}
                  onChange={(e) => setFundingTypes([e.target.value])}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-white"
                >
                  <option value="Full scholarship only">To'liq grant (Full scholarship)</option>
                  <option value="Partial scholarship">Qisman grant (Partial scholarship)</option>
                  <option value="Any funding option">Har qanday grant turi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Maqsadli Davlatlar
                </label>
                <input
                  type="text"
                  value={selectedCountries.join(', ')}
                  onChange={(e) => setSelectedCountries(e.target.value.split(',').map((s) => s.trim()))}
                  placeholder="Masalan: USA, South Korea, Germany"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 text-sm flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Tahlil qilinmoqda...</span>
                ) : (
                  <span>Universitetlarni topish &rarr;</span>
                )}
              </button>
            </form>
          </div>

          {/* Right Panel: Results Container */}
          <div className="lg:col-span-7 bg-[#0F172A] p-6 md:p-8 rounded-2xl text-white min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                AI Analysis Results
              </span>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
                {recommendations.length} MATCHES FOUND
              </span>
            </div>

            {loading && (
              <div className="my-auto text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-amber-400 border-t-transparent mb-4"></div>
                <p className="text-slate-400 text-sm">
                  Sun'iy intellekt 10 ta eng mos universitet va grant dasturlarini tahlil qilmoqda...
                </p>
              </div>
            )}

            {error && (
              <div className="my-auto p-4 bg-red-950/60 border border-red-800 rounded-xl text-red-200 text-center text-sm">
                ⚠️ {error}
              </div>
            )}

            {!loading && !error && recommendations.length === 0 && (
              <div className="my-auto text-center py-12 text-slate-400">
                <p className="text-base">Natijalar hozircha yo'q.</p>
                <p className="text-xs mt-1 text-slate-500">
                  Formani to'ldiring va "Universitetlarni topish" tugmasini bosing.
                </p>
              </div>
            )}

            {/* Universitetlar ro'yxati (10 ta kartochka) */}
            {!loading && recommendations.length > 0 && (
              <div className="space-y-5 overflow-y-auto max-h-[750px] pr-2 custom-scrollbar">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-400/50 transition-all duration-200 space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-snug">
                          {rec.universityName}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <span>📍 {rec.country}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/30">
                          {rec.matchPercentage}% Moslik
                        </span>
                      </div>
                    </div>

                    {/* Grant Nomi */}
                    <div className="text-xs font-medium text-amber-300/90 bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-500/20 inline-block">
                      🎓 Grant: {rec.scholarshipName}
                    </div>

                    {/* Grant Olish Ehtimoli (Chances) bo'limi */}
                    {rec.scholarshipChance && (
                      <div className="p-3 bg-blue-950/50 border border-blue-800/60 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                            Grant yutish ehtimoli:
                          </span>
                          <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                            {rec.scholarshipChance}
                          </span>
                        </div>
                        {rec.scholarshipChanceDetails && (
                          <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-blue-900/50 mt-1">
                            {rec.scholarshipChanceDetails}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {rec.description}
                    </p>

                    {/* Reason */}
                    <div className="text-xs text-slate-400 italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                      💡 <strong>Nega mos keladi:</strong> {rec.reason}
                    </div>

                    {/* Rasmiy sayt havolasi */}
                    {rec.website && (
                      <div className="pt-1 text-right">
                        <a
                          href={rec.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-1"
                        >
                          Rasmiy saytga o'tish &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
