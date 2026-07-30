import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          ScholarBridge AI
        </Link>
        <nav className="nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/find">Find</Link>
          <Link href="/scholarships">Scholarships</Link>
          <Link href="/deadlines">Deadlines</Link>
          <Link href="/login" className="button secondary small">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
