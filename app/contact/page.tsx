import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CONTACT_EMAIL } from "../components/constants";

export default function Contact() {
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">§ Index · Contact</span>
          <h1>
            Say <em>hello.</em>
          </h1>
          <p className="lede">
            Questions, partnerships, press, or just want to say hi? Drop us a
            note — we read every message.
          </p>
        </div>
      </section>

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
                <h4>§ Email</h4>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div className="contact-item">
                <h4>§ Press &amp; partnerships</h4>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div className="contact-item">
                <h4>§ Follow along</h4>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                  <a
                    href="#"
                    className="btn btn-ghost"
                    style={{ padding: "8px 14px", fontSize: 13 }}
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="btn btn-ghost"
                    style={{ padding: "8px 14px", fontSize: 13 }}
                  >
                    YouTube
                  </a>
                  <a
                    href="#"
                    className="btn btn-ghost"
                    style={{ padding: "8px 14px", fontSize: 13 }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="btn btn-ghost"
                    style={{ padding: "8px 14px", fontSize: 13 }}
                  >
                    X / Twitter
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <h4>§ Response time</h4>
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
