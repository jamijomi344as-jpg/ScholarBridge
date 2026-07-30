import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      borderBottom: '1px solid #eaeaea',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#000' }}>
          ScholarBridge <span style={{ color: '#0070f3', fontSize: '14px' }}>AI</span>
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/find" style={{ textDecoration: 'none', color: '#444' }}>Universitet Topish</Link>
        <Link href="/scholarships" style={{ textDecoration: 'none', color: '#444' }}>Grantlar</Link>
        <Link href="/deadlines" style={{ textDecoration: 'none', color: '#444' }}>Deadline'lar</Link>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: '#444' }}>Dashboard</Link>
        <Link href="/login" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: 'bold' }}>Kirish</Link>
      </div>
    </nav>
  );
}
