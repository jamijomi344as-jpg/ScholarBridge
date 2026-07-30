import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">ScholarBridge AI</p>
          <h1>Top university guidance for ambitious international students</h1>
          <p>
            Discover best-fit universities, scholarships, admission chances, and
            application deadlines with AI-powered recommendations.
          </p>
          <div className="actions">
            <Link href="#features" className="button primary">
              Explore features
            </Link>
            <Link href="/dashboard" className="button secondary">
              Try the dashboard
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2>Initial MVP</h2>
          <div className="cards">
            <article>
              <h3>Find My Universities</h3>
              <p>Get AI-recommended schools matched to your profile and goals.</p>
            </article>
            <article>
              <h3>Scholarship List</h3>
              <p>Browse scholarships and filter by eligibility and deadlines.</p>
            </article>
            <article>
              <h3>Deadline Tracker</h3>
              <p>Track application deadlines and next steps for every program.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="workflow">
        <div className="container">
          <h2>How it works</h2>
          <ol>
            <li>Enter your country, GPA, test scores, major, and budget.</li>
            <li>Receive smart university, scholarship, and admission guidance.</li>
            <li>Track deadlines and plan your next application steps.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
