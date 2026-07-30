export default function FindPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Find My Universities</p>
          <h1>Build your profile for smart university matches</h1>
          <p>
            Enter the details that matter most to your international application
            strategy.
          </p>
          <form className="form-grid">
            <label>
              Country
              <input type="text" placeholder="Uzbekistan" />
            </label>
            <label>
              GPA
              <input type="text" placeholder="4.0" />
            </label>
            <label>
              IELTS
              <input type="text" placeholder="7.0" />
            </label>
            <label>
              Major
              <input type="text" placeholder="Computer Science" />
            </label>
            <label>
              Budget
              <input type="text" placeholder="Full scholarship" />
            </label>
            <button type="submit" className="button primary">
              Get matches
            </button>
          </form>
          <div className="cards" style={{ marginTop: "2rem" }}>
            <article>
              <h3>Real university matches</h3>
              <p>
                Each recommendation is based on academic fit, scholarship
                likelihood, and program selectivity.
              </p>
            </article>
            <article>
              <h3>Deadline focus</h3>
              <p>
                Focus on the most important applications and avoid missed
                deadlines.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
