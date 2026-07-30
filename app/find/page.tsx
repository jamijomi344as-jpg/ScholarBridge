'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FindPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [degrees, setDegrees] = useState<string[]>(['Bakalavr']);
  const [fundingTypes, setFundingTypes] = useState<string[]>(["To'liq moliyalash"]);
  const [major, setMajor] = useState<string>('Kompyuter fanlari va IT');
  const [schoolGrade, setSchoolGrade] = useState<string>('5');
  const [ielts, setIelts] = useState<string>('7.0');
  const [sat, setSat] = useState<string>('1350');
  const [budget, setBudget] = useState<string>('1000');

  const degreeOptions = ['Bakalavr', 'Almashinuv (Bakalavr)', 'Magistratura', 'PhD', 'Professional rivojlanish'];
  const majorOptions = [
    'Kompyuter fanlari va IT',
    'Amaliy fanlar va kasblar',
    'Biznes boshqaruvi',
    'Muhandislik va texnologiya',
    'Atrof-muhit va Geologiya fanlari',
    'Gumanitar fanlar',
    'Huquqshunoslik va qonunchilik',
    'Tabiiy fanlar va matematika',
    'Ijtimoiy fanlar',
    'Qishloq va o‘rmon xo‘jaligi',
    'San\'at, dizayn va arxitektura',
    'Ta\'lim va tarbiya',
    'Tibbiyot va sog‘liqni saqlash',
    'Jurnalistika va OAV',
    'Mehmonxona biznesi, hordiq va sport'
  ];
  const fundingOptions = ["To'liq moliyalash", "Qisman moliyalash", "O'z-o'zini moliyalash", "Bepul ishtirok", "Stipendiya"];

  const handleCheckboxChange = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      schoolGrade,
      degrees,
      fundingTypes,
      majors: [major],
      selectedCountries: ['AQSH', 'Janubiy Koreya', 'Germaniya', 'Buyuk Britaniya'],
      ielts,
      sat,
      budget
    };

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.recommendations && Array.isArray(data.recommendations)) {
        localStorage.setItem('scholarBridge_results', JSON.stringify(data.recommendations));
        router.push('/recommendations');
      } else {
        alert("AI tavsiya tayyorlashda uzilish bo'ldi. Qayta urinib ko'ring.");
      }
    } catch (err) {
      console.error(err);
      alert('Ulanishda xatolik yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '40px auto', padding: '32px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#16233F', marginBottom: '24px', borderBottom: '2px solid #F6F4EC', paddingBottom: '12px' }}>
        Universitet va Grant Saralash Formasi
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* DARAJA SEKSIYASI */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', color: '#4B5563', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>
            DARAJA
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', maxHeight: '160px', overflowY: 'auto', padding: '8px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            {degreeOptions.map((item) => (
              <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer', color: '#1F2937' }}>
                <input
                  type="checkbox"
                  checked={degrees.includes(item)}
                  onChange={() => handleCheckboxChange(degrees, setDegrees, item)}
                  style={{ width: '18px', height: '18px', accentColor: '#16233F' }}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* SOHA SEKSIYASI */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', color: '#4B5563', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
            SOHA TANLANG
          </label>
          <select
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '15px', color: '#1F2937', backgroundColor: '#F9FAFB' }}
          >
            {majorOptions.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* MOLIYALASHTIRISH SEKSIYASI */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '13px', color: '#4B5563', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>
            MOLIYALASHTIRISH TURI
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', maxHeight: '160px', overflowY: 'auto', padding: '8px', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
            {fundingOptions.map((item) => (
              <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer', color: '#1F2937' }}>
                <input
                  type="checkbox"
                  checked={fundingTypes.includes(item)}
                  onChange={() => handleCheckboxChange(fundingTypes, setFundingTypes, item)}
                  style={{ width: '18px', height: '18px', accentColor: '#16233F' }}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* AKADEMIK BALLAR */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>Maktab bahosi (5 ballik):</label>
            <input
              type="text"
              value={schoolGrade}
              onChange={(e) => setSchoolGrade(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>IELTS balli:</label>
            <input
              type="text"
              value={ielts}
              onChange={(e) => setIelts(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>SAT balli (agar bo'lsa):</label>
            <input
              type="text"
              value={sat}
              onChange={(e) => setSat(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '12px',
            padding: '16px',
            backgroundColor: loading ? '#94A3B8' : '#16233F',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'AI Universitet va Grantlarni Qidirmoqda...' : 'Universitet va Grantlarni Topish 🚀'}
        </button>
      </form>
    </div>
  );
}
