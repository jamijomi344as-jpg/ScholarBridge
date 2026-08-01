import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#F6F4EC', color: '#232320', fontFamily: "'Inter', sans-serif", lineHeight: 1.5, minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(246,244,236,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #D8D2C0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: '1.28rem', letterSpacing: '-0.01em', color: '#16233F' }}>
            <span style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#16233F', color: '#D9BE7E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 500 }}>SB</span>
            ScholarBridge
          </div>
          <Link href="/find" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.92rem', backgroundColor: '#16233F', color: '#F6F4EC', padding: '11px 22px', borderRadius: '3px', textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'background .18s ease, transform .18s ease' }}>
            Get matched
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1180px', margin: '0 auto', padding: '92px 32px 100px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '56px', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: '#5F7A5A', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            Built for students applying abroad
          </div>
          <h1 style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: '3.55rem', lineHeight: 1.06, letterSpacing: '-0.015em', color: '#16233F', marginBottom: '26px' }}>
            Find the universities that would <em style={{ fontStyle: 'italic', fontWeight: 500, color: '#B8923B' }}>actually</em> want you.
          </h1>
          <p style={{ fontSize: '1.13rem', color: '#5B584E', maxWidth: '46ch', marginBottom: '36px' }}>
            Tell us your grades, your scores, your budget. We match you against real admission patterns and surface the scholarships worth your time — before the deadline does.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/find" style={{ backgroundColor: '#16233F', color: '#F6F4EC', fontWeight: 600, fontSize: '0.98rem', padding: '15px 28px', borderRadius: '3px', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              Start your match
              <svg viewBox="0 0 16 16" fill="none" style={{ width: '16px', height: '16px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="#how" style={{ fontSize: '0.92rem', fontWeight: 500, color: '#5B584E', textDecoration: 'none', borderBottom: '1px solid #D8D2C0', paddingBottom: '2px' }}>
              See how it works
            </a>
          </div>
        </div>

        {/* Dossier Card */}
        <div style={{ backgroundColor: '#16233F', borderRadius: '6px', padding: '30px 28px 26px', position: 'relative', boxShadow: '0 24px 60px -20px rgba(22,35,63,0.45)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px', fontFamily: "'IBM Plex Mono', monospace", color: '#D9BE7E', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span>Applicant Dossier</span>
            <span style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(217,190,126,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', color: '#D9BE7E', fontSize: '0.95rem' }}>SB</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '11px', borderBottom: '1px solid rgba(255,255,255,0.10)', fontSize: '0.92rem' }}>
              <span style={{ color: 'rgba(246,244,236,0.55)', fontSize: '0.82rem' }}>GPA</span>
              <span style={{ color: '#F6F4EC', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>3.85 / 4.0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '11px', borderBottom: '1px solid rgba(255,255,255,0.10)', fontSize: '0.92rem' }}>
              <span style={{ color: 'rgba(246,244,236,0.55)', fontSize: '0.82rem' }}>IELTS</span>
              <span style={{ color: '#F6F4EC', fontFamily: "'IBM Plex Mono', monospace", fontWeight 500 }}>7.5 Overall</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '11px', borderBottom: '1px solid rgba(255,255,255,0.10)', fontSize: '0.92rem' }}>
              <span style={{ color: 'rgba(246,244,236,0.55)', fontSize: '0.82rem' }}>Intended major</span>
              <span style={{ color: '#F6F4EC', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>Computer Science</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '11px', borderBottom: '1px solid rgba(255,255,255,0.10)', fontSize: '0.92rem' }}>
              <span style={{ color: 'rgba(246,244,236,0.55)', fontSize: '0.82rem' }}>Budget</span>
              <span style={{ color: '#F6F4EC', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>Full scholarship</span>
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(95,122,90,0.16)', border: '1px solid rgba(95,122,90,0.4)', borderRadius: '4px', padding: '16px 16px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', color: '#5F7A5A', marginBottom: '10px' }}>
              <span>Matches found</span>
              <span style={{ color: '#8CB088', fontWeight: 500 }}>5 strong fits</span>
            </div>
            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.76rem', padding: '5px 10px', borderRadius: '20px', backgroundColor: 'rgba(246,244,236,0.08)', color: '#F6F4EC', border: '1px solid rgba(246,244,236,0.14)' }}>Reach × 2</span>
              <span style={{ fontSize: '0.76rem', padding: '5px 10px', borderRadius: '20px', backgroundColor: 'rgba(246,244,236,0.08)', color: '#F6F4EC', border: '1px solid rgba(246,244,236,0.14)' }}>Target × 2</span>
              <span style={{ fontSize: '0.76rem', padding: '5px 10px', borderRadius: '20px', backgroundColor: 'rgba(246,244,236,0.08)', color: '#F6F4EC', border: '1px solid rgba(246,244,236,0.14)' }}>Safety × 1</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: '88px 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: '62ch', marginBottom: '52px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: '#B8923B', marginBottom: '14px', fontWeight: 500 }}>The problem</div>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: '2.35rem', color: '#16233F', letterSpacing: '-0.01em' }}>Good students still apply to the wrong schools.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: '#D8D2C0', border: '1px solid #D8D2C0' }}>
            <div style={{ backgroundColor: '#F6F4EC', padding: '34px 30px' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#B8923B', fontSize: '0.82rem', marginBottom: '16px', display: 'block' }}>01</span>
              <h3 style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontStyle: 'italic', fontSize: '1.18rem', color: '#16233F', marginBottom: '10px' }}>No sense of fit</h3>
              <p style={{ color: '#5B584E', fontSize: '0.95rem' }}>Rankings don't tell you which schools would actually admit — or fund — someone with your exact profile.</p>
            </div>
            <div style={{ backgroundColor: '#F6F4EC', padding: '34px 30px' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#B8923B', fontSize: '0.82rem', marginBottom: '16px', display: 'block' }}>02</span>
              <h3 style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontStyle: 'italic', fontSize: '1.18rem', color: '#16233F', marginBottom: '10px' }}>Scholarships stay hidden</h3>
              <p style={{ color: '#5B584E', fontSize: '0.95rem' }}>The funding that would cover your tuition is scattered across a hundred pages, most never searched.</p>
            </div>
            <div style={{ backgroundColor: '#F6F4EC', padding: '34px 30px' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#B8923B', fontSize: '0.82rem', marginBottom: '16px', display: 'block' }}>03</span>
              <h3 style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontStyle: 'italic', fontSize: '1.18rem', color: '#16233F', marginBottom: '10px' }}>Deadlines slip quietly</h3>
              <p style={{ color: '#5B584E', fontSize: '0.95rem' }}>Every school runs its own calendar. One missed date can undo a year of otherwise strong work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" style={{ backgroundColor: '#16233F', color: '#F6F4EC', padding: '88px 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: '62ch', marginBottom: '52px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: '#D9BE7E', marginBottom: '14px', fontWeight: 500 }}>How it works</div>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: '2.35rem', color: '#F6F4EC', letterSpacing: '-0.01em' }}>Three inputs. A ranked, funded shortlist.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '8px' }}>
            <div>
              <span style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontWeight: 500, color: '#D9BE7E', fontSize: '2.1rem', display: 'block', marginBottom: '14px' }}>01</span>
              <div style={{ height: '1px', background: 'rgba(217,190,126,0.3)', margin: '0 0 26px', width: '36px' }}></div>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 600, marginBottom: '9px' }}>Enter your profile</h3>
              <p style={{ color: 'rgba(246,244,236,0.68)', fontSize: '0.94rem', maxWidth: '32ch' }}>GPA, test scores, intended major, and budget — the same signals admission offices actually weigh.</p>
            </div>
            <div>
              <span style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontWeight: 500, color: '#D9BE7E', fontSize: '2.1rem', display: 'block', marginBottom: '14px' }}>02</span>
              <div style={{ height: '1px', background: 'rgba(217,190,126,0.3)', margin: '0 0 26px', width: '36px' }}></div>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 600, marginBottom: '9px' }}>We analyze the fit</h3>
              <p style={{ color: 'rgba(246,244,236,0.68)', fontSize: '0.94rem', maxWidth: '32ch' }}>Your profile is compared against real admission and funding patterns, not just prestige rankings.</p>
            </div>
            <div>
              <span style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontWeight: 500, color: '#D9BE7E', fontSize: '2.1rem', display: 'block', marginBottom: '14px' }}>03</span>
              <div style={{ height: '1px', background: 'rgba(217,190,126,0.3)', margin: '0 0 26px', width: '36px' }}></div>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 600, marginBottom: '9px' }}>Get your shortlist</h3>
              <p style={{ color: 'rgba(246,244,236,0.68)', fontSize: '0.94rem', maxWidth: '32ch' }}>A ranked set of reach, target, and safety schools — each with its scholarships and deadlines attached.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="start" style={{ padding: '96px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: '2.35rem', color: '#16233F', maxWidth: '20ch', margin: '0 auto 18px' }}>Your shortlist is three fields away.</h2>
          <p style={{ color: '#5B584E', maxWidth: '46ch', margin: '0 auto 34px', fontSize: '1.02rem' }}>No cost to see your matches. Built by a student who was tired of guessing too.</p>
          <Link href="/find" style={{ backgroundColor: '#16233F', color: '#F6F4EC', fontWeight: 600, fontSize: '0.98rem', padding: '15px 28px', borderRadius: '3px', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            Start your match
            <svg viewBox="0 0 16 16" fill="none" style={{ width: '16px', height: '16px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #D8D2C0', padding: '34px 0' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: '1.02rem', color: '#16233F' }}>
            <span style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#16233F', color: '#D9BE7E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 500 }}>SB</span>
            ScholarBridge
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', color: '#5B584E' }}>
            Built in Tashkent · ScholarBridge AI
          </div>
        </div>
      </footer>
    </div>
  );
}
