'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DEGREE_OPTIONS = ['Bakalavr', 'Almashinuv (Bakalavr)', 'Magistratura', 'PhD', 'Professional rivojlanish'];
const FUNDING_OPTIONS = ["To'liq moliyalash", "Qisman moliyalash", "O'z-o'zini moliyalash", 'Bepul ishtirok', 'Stipendiya'];
const MAJOR_OPTIONS = [
  'Barcha sohalar',
  'Amaliy fanlar va kasblar',
  'Biznes boshqaruvi',
  'Kompyuter fanlari va IT',
  'Muhandislik va texnologiya',
  'Atrof-muhit va Geologiya fanlari',
  'Gumanitar fanlar',
  'Huquqshunoslik va qonunchilik',
  'Tabiiy fanlar va matematika',
  'Ijtimoiy fanlar',
  'Qishloq va o‘rmon xo‘jaligi',
  'San’at, dizayn va arxitektura',
  'Ta’lim va tarbiya',
  'Tibbiyot va sog‘liqni saqlash',
  'Jurnalistika va OAV',
  'Mehmonxona biznesi, hordiq va sport'
];
const COUNTRY_OPTIONS = ['AQSh', 'Buyuk Britaniya', 'Olmanya', 'Janubiy Koreya', 'Xitoy', 'Kanada', 'Avstraliya', 'Evropa davlatlari', 'Turkiya'];

export default function FindPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [schoolGrade, setSchoolGrade] = useState('4.8');
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>(['Bakalavr']);
  const [selectedFunding, setSelectedFunding] = useState<string[]>(["To'liq moliyalash"]);
  const [selectedMajors, setSelectedMajors] = useState<string[]>(['Kompyuter fanlari va IT']);
  
  const [allCountries, setAllCountries] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  
  const [ielts, setIelts] = useState('');
  const [sat, setSat] = useState('');
  const [otherCertificates, setOtherCertificates] = useState('');
  const [budget, setBudget] = useState('0');

  const toggleArrayItem = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      schoolGrade,
      degrees: selectedDegrees,
      fundingTypes: selectedFunding,
      majors: selectedMajors,
      selectedCountries: allCountries ? ['Barcha davlatlar'] : selectedCountries,
      ielts,
      sat,
      otherCertificates,
      budget,
    };

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      localStorage.setItem('scholarBridge_results', JSON.stringify(data.recommendations || []));
      router.push('/recommendations');
    } catch (err) {
      alert('Xatolik yuz berdi. Qayta urinib ko‘ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>ScholarBridge AI — Universitet va Grant Saralash</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* MAKTAB BAHOSI */}
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
          <h3>Maktab Bahosi (5 Ballik Tizimda)</h3>
          <input 
            type="number" step="0.1" min="1" max="5" 
            value={schoolGrade} 
            onChange={(e) => setSchoolGrade(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        {/* DARAJA */}
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
          <h3>DARAJA</h3>
          {DEGREE_OPTIONS.map((deg) => (
            <label key={deg} style={{ display: 'block', margin: '8px 0', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedDegrees.includes(deg)} 
                onChange={() => toggleArrayItem(selectedDegrees, setSelectedDegrees, deg)} 
              /> {' '}
              {deg}
            </label>
          ))}
        </div>

        {/* MOLIYALASHTIRISH */}
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
          <h3>MOLIYALASHTIRISH</h3>
          {FUNDING_OPTIONS.map((fund) => (
            <label key={fund} style={{ display: 'block', margin: '8px 0', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={selectedFunding.includes(fund)} 
                onChange={() => toggleArrayItem(selectedFunding, setSelectedFunding, fund)} 
              /> {' '}
              {fund}
            </label>
          ))}
        </div>

        {/* SOHALAR */}
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
          <h3>SOHALAR</h3>
          <select 
            multiple 
            value={selectedMajors}
            onChange={(e) => setSelectedMajors(Array.from(e.target.selectedOptions, option => option.value))}
            style={{ width: '100%', height: '150px', padding: '8px' }}
          >
            {MAJOR_OPTIONS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <small style={{ color: '#666' }}>Ctrl/Cmd tugmasini bosib bir nechta sohani tanlashingiz mumkin.</small>
        </div>

        {/* DAVLATLAR TANLOVI */}
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
          <h3>DAVLATLAR</h3>
          <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
            <input 
              type="checkbox" 
              checked={allCountries} 
              onChange={(e) => setAllCountries(e.target.checked)} 
            /> Barcha davlatlar
          </label>

          {!allCountries && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {COUNTRY_OPTIONS.map((c) => (
                <label key={c} style={{ cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedCountries.includes(c)} 
                    onChange={() => toggleArrayItem(selectedCountries, setSelectedCountries, c)} 
                  /> {' '}
                  {c}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* SERTIFIKATLAR (IXTIYORIY) */}
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
          <h3>Xalqaro Sertifikatlar (Ixtiyoriy)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label>IELTS (masalan: 7.5):</label>
              <input type="text" value={ielts} onChange={(e) => setIelts(e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div>
              <label>SAT (masalan: 1450):</label>
              <input type="text" value={sat} onChange={(e) => setSat(e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <label>Boshqa sertifikatlar (Duolingo, CEFR, HSK va hokazo):</label>
            <input type="text" value={otherCertificates} onChange={(e) => setOtherCertificates(e.target.value)} style={{ width: '100%', padding: '8px' }} placeholder="masalan: CEFR B2, Duolingo 120" />
          </div>
        </div>

        {/* BYUDJET */}
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
          <h3>Yillik Maksimal Byudjet ($)</h3>
          <input 
            type="number" 
            value={budget} 
            onChange={(e) => setBudget(e.target.value)} 
            style={{ width: '100%', padding: '8px' }} 
            placeholder="0 dollardan boshlab (0 = faqat to'liq grantlar)"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ padding: '16px', fontSize: '18px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          {loading ? 'AI Tahlil va Qidiruv Bormoqda...' : 'Universitet va Grantlarni Topish'}
        </button>

      </form>
    </div>
  );
}
