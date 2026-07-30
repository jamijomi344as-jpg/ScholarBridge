'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FindPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    schoolGrade: '5',
    degrees: ['Bakalavr'],
    fundingTypes: ['To\'liq Grant'],
    majors: ['Kompyuter Ilmlari / IT'],
    selectedCountries: ['AQSH', 'Janubiy Koreya', 'Germaniya'],
    ielts: '7.0',
    sat: '1350',
    otherCertificates: '',
    budget: '1000'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        alert('AI javob berishda xatolik yuz berdi. Qaytadan urinib ko\'ring.');
      }
    } catch (err) {
      console.error(err);
      alert('Tarmoq xatosi yuz berdi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Universitet va Grant Saralash Formasi</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ fontWeight: 'bold' }}>Maktab baho o'rtalamangiz (5 ballik tizimda):</label>
          <input 
            type="text" 
            value={formData.schoolGrade} 
            onChange={(e) => setFormData({...formData, schoolGrade: e.target.value})}
            style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>IELTS ballingiz:</label>
          <input 
            type="text" 
            value={formData.ielts} 
            onChange={(e) => setFormData({...formData, ielts: e.target.value})}
            style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold' }}>Qiziqqan sohangiz:</label>
          <input 
            type="text" 
            value={formData.majors[0]} 
            onChange={(e) => setFormData({...formData, majors: [e.target.value]})}
            style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '6px', border: '1px solid #ccc' }} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '14px',
            backgroundColor: loading ? '#94a3b8' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'AI Universitetlarni Qidirmoqda...' : 'Universitet va Grantlarni Topish 🚀'}
        </button>
      </form>
    </div>
  );
}
