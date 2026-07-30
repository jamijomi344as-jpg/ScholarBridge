export default function ProfilePage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="eyebrow">User profile</p>
          <h1>Applicant Overview</h1>
          <p>
            Track your GPA, IELTS score, intended major, and budget to tailor
            AI recommendations for top universities.
          </p>
          <div className="profile-grid">
            <div className="profile-card">
              <h2>Academic profile</h2>
              <ul>
                <li>Country: Uzbekistan</li>
                <li>GPA: 4.0+</li>
                <li>IELTS goal: 7.0–7.5</li>
                <li>Major: Computer Science / Engineering</li>
              </ul>
            </div>
            <div className="profile-card">
              <h2>Application goals</h2>
              <ul>
                <li>Top US universities</li>
                <li>Full or major scholarship</li>
                <li>Strong extracurricular impact</li>
                <li>Real projects and startup experience</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
