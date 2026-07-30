import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#111' }}>
      {/* Hero Section */}
      <section style={{
        padding: '80px 20px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <span style={{
          backgroundColor: '#e0f2fe',
          color: '#0369a1',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          🚀 AI-Powered Scholarship & Admission Assistant
        </span>

        <h1 style={{ fontSize: '48px', fontWeight: '800', marginTop: '24px', lineHeight: '1.2' }}>
          O'zingizga mos TOP Universitetlar va <span style={{ color: '#0070f3' }}>100% Grantlarni</span> AI bilan toping
        </h1>

        <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '650px', margin: '20px auto 32px auto' }}>
          Maktab baholaringiz (5 ballik), ixtiyoriy IELTS/SAT va qiziqishlaringizni kiriting. ScholarBridge AI sizga Reach, Match va Safety universitetlarni aniqlab beradi.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/find" style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '14px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Universitet Topishni Boshlash →
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '40px' }}>Nega ScholarBridge AI?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ border: '1px solid #e5e7eb', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎓</div>
            <h3 style={{ margin: '0 0 8px 0' }}>Uzbek Scale Support</h3>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
              O'zbekiston maktablaridagi 5 ballik tizimni xalqaro standartlarga moslab tahlil qiladi.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
            <h3 style={{ margin: '0 0 8px 0' }}>To'liq Grant Saralash</h3>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
              Moliyalashtirish turi, yillik byudjet va mavjud stipendiyalar bo'yicha eng aniq moslikni ko'rsatadi.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '24px', borderRadius: '12px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
            <h3 style={{ margin: '0 0 8px 0' }}>Tezkor AI Tahlil</h3>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
              Natijalarni Reach, Match va Safety toifalariga ajratib, nima uchun mosligini tushuntirib beradi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
