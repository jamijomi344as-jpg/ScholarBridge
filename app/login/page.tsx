export default function LoginPage() {
  return (
    <main>
      <section className="section centered-card">
        <div className="container form-card">
          <h1>Login to ScholarBridge</h1>
          <p>Access your profile, university matches, and scholarship tracker.</p>
          <form className="form-grid">
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Enter your password" />
            </label>
            <button type="submit" className="button primary">
              Continue
            </button>
          </form>
          <p className="form-note">
            This is a prototype login page. User authentication will be added in
            later development stages.
          </p>
        </div>
      </section>
    </main>
  );
}
