export function EmailSignup() {
  return (
    <form className="form-card soon" aria-disabled="true">
      <h2>Be first to hear about the next event.</h2>
      <p className="form-status">Opening soon.</p>
      <label htmlFor="first-name">
        First name *
        <input id="first-name" name="firstName" autoComplete="given-name" disabled />
      </label>
      <label htmlFor="email">
        Email address *
        <input id="email" name="email" type="email" autoComplete="email" disabled />
      </label>
      <label className="check" htmlFor="consent">
        <input id="consent" name="consent" type="checkbox" disabled />
        <span>We can email you about upcoming events and updates.</span>
      </label>
      <button className="btn" type="button" disabled>
        Join the list
      </button>
    </form>
  );
}
