import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { CONTACT_EMAIL } from "../components/constants";

export default function Contact() {
  return (
    <>
      <Nav />

      <PageHero
        title={
          <>
            Say <em>hello.</em>
          </>
        }
        lede="Questions, partnerships, press, or just want to say hi? Drop us a note. We read every message."
      />

      <section className="sec">
        <div className="wrap">
          <div className="contact-grid">
            <form
              className="form-grid"
              action={`mailto:${CONTACT_EMAIL}`}
              method="post"
              encType="text/plain"
            >
              <div className="form-row">
                <div>
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    className="form-input"
                    type="email"
                    placeholder="you@somewhere.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  className="form-input"
                  type="text"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us a bit more..."
                  required
                />
              </div>

              <div>
                <button type="submit" className="btn btn-primary">
                  Send message <span className="arrow">→</span>
                </button>
              </div>
            </form>

            <aside className="contact-info">
              <div className="contact-item">
                <h4>Email</h4>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div className="contact-item">
                <h4>Press &amp; partnerships</h4>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div className="contact-item">
                <h4>Follow along</h4>
                <p className="text-muted" style={{ fontSize: 15 }}>
                  Social channels are coming soon. Join on Luma for event updates in the meantime.
                </p>
              </div>
              <div className="contact-item">
                <h4>Response time</h4>
                <p className="text-muted" style={{ fontSize: 15 }}>
                  We aim to reply within 1–2 business days.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
