import Link from "next/link";

export default function DashboardPage() {
  return (
    <main>
      <section className="section hero">
        <div className="container">
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome back to ScholarBridge</h1>
          <p>
            Your application strategy dashboard is the hub for recommended
            universities, scholarships, deadlines, and profile insights.
          </p>
          <div className="actions">
            <Link href="/find" className="button primary">
              Find My Universities
            </Link>
            <Link href="/recommendations" className="button secondary">
              View AI Recommendations
            </Link>
          </div>
        </div>
      </section>

      <section className="section cards-grid">
        <div className="container">
          <h2>Quick access</h2>
          <div className="cards">
            <article>
              <h3>Profile</h3>
              <p>Review your education, test scores, and application targets.</p>
              <Link href="/profile" className="link-button">
                Open profile
              </Link>
            </article>
            <article>
              <h3>Scholarships</h3>
              <p>Browse scholarships matched to your budget and credentials.</p>
              <Link href="/scholarships" className="link-button">
                Explore opportunities
              </Link>
            </article>
            <article>
              <h3>Deadlines</h3>
              <p>Track important application milestones and due dates.</p>
              <Link href="/deadlines" className="link-button">
                View deadlines
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
