export default function ScholarshipsPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Scholarship List</p>
          <h1>Explore funding opportunities for international applicants</h1>
          <p>
            Find scholarships that match your profile, intended major, and
            financial need.
          </p>
          <div className="cards">
            <article>
              <h3>Global Excellence Award</h3>
              <p>Full tuition scholarship for top international STEM applicants.</p>
            </article>
            <article>
              <h3>Leadership Grant</h3>
              <p>
                Funding for students with strong initiative, community impact,
                and startup experience.
              </p>
            </article>
            <article>
              <h3>Need-Based Scholarship</h3>
              <p>Support for high-achieving students from emerging markets.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
