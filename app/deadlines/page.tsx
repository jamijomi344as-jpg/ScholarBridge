export default function DeadlinesPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Deadline Tracker</p>
          <h1>Track applications, essays, and scholarship deadlines</h1>
          <p>
            Keep your admissions process on schedule with a centralized
            deadline overview.
          </p>
          <div className="cards">
            <article>
              <h3>Early Action</h3>
              <p>Nov 1 - Harvard, Princeton, MIT</p>
            </article>
            <article>
              <h3>Regular Decision</h3>
              <p>Jan 5 - Stanford, Yale, Caltech</p>
            </article>
            <article>
              <h3>Scholarship Deadlines</h3>
              <p>Dec 15 - Merit awards and need-based aid applications</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
