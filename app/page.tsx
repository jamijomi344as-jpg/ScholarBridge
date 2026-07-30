import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#F6F4EC', color: '#232320', fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '80px 32px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#5F7A5A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', fontWeight: 600 }}>
            — Built for students applying abroad
          </div>
          <h1 style={{ fontFamily: 'serif', fontSize: '3.2rem', lineHeight: 1.1, color: '#16233F', marginBottom: '24px' }}>
            Find the universities that would <em style={{ color: '#B8923B', fontStyle: 'italic' }}>actually</em> want you.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#5B584E', marginBottom: '36px', lineHeight: 1.6 }}>
            Baho va imtihon natijalaringiz, qiziqqan sohangiz hamda byudjetingizni kiriting. Sun'iy intellekt sizga mos keladigan universitetlar va to'liq grantlarni saralab beradi.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/find" style={{ backgroundColor: '#16233F', color: '#F6F4EC', padding: '16px 32px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Saralashni boshlash 🚀
            </Link>
            <a href="#how" style={{ color: '#5B584E', textDecoration: 'none', borderBottom: '1px solid #D8D2C0', paddingBottom: '2px', fontWeight: 500 }}>
              Qanday ishlaydi?
            </a>
          </div>
        </div>

        {/* Dossier Card Visual */}
        <div style={{ backgroundColor: '#16233F', borderRadius: '8px', padding: '32px', color: '#F6F4EC', boxShadow: '0 24px 60px -20px rgba(22,35,63,0.45)', border: '1px solid rgba(217,190,126,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', color: '#D9BE7E', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span>Applicant Dossier</span>
            <span style={{ border: '1px solid #D9BE7E', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SB</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <span style={{ color: 'rgba(246,244,236,0.6)', fontSize: '0.9rem' }}>GPA / Baho</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>5.0 / 5.0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <span style={{ color: 'rgba(246,244,236,0.6)', fontSize: '0.9rem' }}>IELTS Score</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>7.5 Overall</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <span style={{ color: 'rgba(246,244,236,0.6)', fontSize: '0.9rem' }}>Soha</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>Computer Science</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <span style={{ color: 'rgba(246,244,236,0.6)', fontSize: '0.9rem' }}>Moliyalashtirish</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>To'liq Grant</span>
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(95,122,90,0.2)', border: '1px solid rgba(95,122,90,0.5)', borderRadius: '6px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.8rem', color: '#8CB088', marginBottom: '8px' }}>
              <span>Moslik natijasi</span>
              <span>5 ta aniq grant</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(246,244,236,0.1)', border: '1px solid rgba(246,244,236,0.2)' }}>Reach × 2</span>
              <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(246,244,236,0.1)', border: '1px solid rgba(246,244,236,0.2)' }}>Match × 2</span>
              <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(246,244,236,0.1)', border: '1px solid rgba(246,244,236,0.2)' }}>Safety × 1</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how" style={{ backgroundColor: '#16233F', color: '#F6F4EC', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#D9BE7E', textTransform: 'uppercase', marginBottom: '12px' }}>Jarayon</div>
          <h2 style={{ fontFamily: 'serif', fontSize: '2.2rem', marginBottom: '48px' }}>3 bosqichda aniq ro'yxatga ega bo'ling</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '2rem', color: '#D9BE7E', display: 'block', marginBottom: '12px' }}>01</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Ma'lumotlarni kiriting</h3>
              <p style={{ color: 'rgba(246,244,236,0.7)', fontSize: '0.95rem' }}>Baho, til sertifikatlari, sohangiz hamda moliyaviy imkoniyatingizni tanlang.</p>
            </div>
            <div>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '2rem', color: '#D9BE7E', display: 'block', marginBottom: '12px' }}>02</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>AI tahlil qiladi</h3>
              <p style={{ color: 'rgba(246,244,236,0.7)', fontSize: '0.95rem' }}>Profilinigiz global qabul talablari va grant dasturlari bilan solishtiriladi.</p>
            </div>
            <div>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '2rem', color: '#D9BE7E', display: 'block', marginBottom: '12px' }}>03</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Tayyor ro'yxatni oling</h3>
              <p style={{ color: 'rgba(246,244,236,0.7)', fontSize: '0.95rem' }}>Reach, Match va Safety darajasiga bo'lingan grantlar va deadline'larni oling.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
