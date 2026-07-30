export default function RecommendationsPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="eyebrow">AI Recommendations</p>
          <h1>Personalized university and scholarship guidance</h1>
          <p>
            Review a tailored list of universities based on your academic profile
            and application goals.
          </p>
          <div className="cards">
            <article>
              <h3>Harvard University</h3>
              <p>Best fit: AI and quantitative economics with strong leadership.</p>
            </article>
            <article>
              <h3>Stanford University</h3>
              <p>
                Top choice for entrepreneurship, tech, and scholarship-backed
                applications.
              </p>
            </article>
            <article>
              <h3>MIT</h3>
              <p>
                Strong recommendation for STEM students with startup and project
                experience.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
