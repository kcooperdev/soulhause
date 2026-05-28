import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Stamp } from "../components/Motifs";
import { JOIN_URL } from "../components/constants";

export default function Membership() {
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">§ Index · Membership</span>
          <h1>
            Two ways in. <em>Both open today.</em>
          </h1>
          <p className="lede">
            Join the free community to get started, or unlock the full SoulHause
            experience with Pro. Cancel anytime. The door is always open.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid-2">
            <article className="tier">
              <div className="tier-head">
                <span>★ Tier · 01</span>
                <span>Free Community</span>
              </div>
              <h3>Free</h3>
              <p className="tier-blurb">
                A free way in. Browse public channels, RSVP to free online
                events, and sample the resource library. Workshops, cohorts,
                and in-person events live in Pro.
              </p>
              <div className="tier-price">
                $0<small>/forever</small>
              </div>
              <ul className="tier-features">
                <li>Public community channels</li>
                <li>Free online events (RSVP)</li>
                <li>Monthly newsletter + member spotlights</li>
                <li>Preview of the resource library</li>
              </ul>
              <a
                className="btn btn-ghost tier-cta"
                href={JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Coming Soon · Fall 2026 <span className="arrow">→</span>
              </a>
            </article>

            <article className="tier pro">
              <div className="tier-head">
                <span>★ Tier · 02</span>
                <span>SoulHause Pro</span>
              </div>
              <h3>Pro</h3>
              <p className="tier-blurb">
                The full house. Workshops, cohorts, tech perks, in-person
                events, and Pro-only rooms — $25 a month.
              </p>
              <div className="tier-price">
                $25<small>/month</small>
              </div>
              <ul className="tier-features">
                <li>Tech perks — pooled AI credits + software discounts (Anthropic, Cursor, Linear, Notion, Vercel)</li>
                <li>Pro-only channels — founder-only, offers + comp, design crits, AI lab</li>
                <li>All workshops included (live + recorded) — paid for everyone else</li>
                <li>Cohort access — 4–6 week project cycles</li>
                <li>In-person events at member pricing + Pro-only nights</li>
                <li>Pitch night access</li>
                <li>Priority Demo Day participation</li>
                <li>Accountability pods + weekly check-ins</li>
                <li>Live Q&amp;As with senior engineers + founders</li>
                <li>Full resource library — 200+ guides, templates, roadmaps</li>
                <li>Early access to events + sponsor drops</li>
                <li>Member-to-member referrals + job leads</li>
              </ul>
              <a
                className="btn btn-on-dark tier-cta"
                href={JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Coming Soon · Fall 2026 <span className="arrow">→</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="sec-head">
            <div>
              <div className="sec-head-meta">
                <span>§ FAQ</span>
                <span>Quick answers</span>
              </div>
              <h2 className="h-section" style={{ marginTop: 16 }}>
                Common <em>questions.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                Anything else? Send a note from the contact page — we read
                every one.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <article className="about-card">
              <h3>Can I start free and upgrade later?</h3>
              <p>
                Yes. Start with the free community, then upgrade to Pro
                whenever you&apos;re ready.
              </p>
            </article>
            <article className="about-card">
              <h3>Can I cancel Pro at any time?</h3>
              <p>
                Of course. Pro is monthly, no commitment. Cancel anytime and
                keep your free access.
              </p>
            </article>
            <article className="about-card">
              <h3>Are cohorts included with Pro?</h3>
              <p>
                Most cohorts are included or discounted for Pro members.
                Premium cycles may have a small surcharge — always announced
                up front.
              </p>
            </article>
            <article className="about-card">
              <h3>When can I sign up?</h3>
              <p>
                SoulHause is launching Fall 2026. Use any &ldquo;Coming
                Soon&rdquo; button to join the waitlist — you&apos;ll be the
                first to hear when the doors open.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-strip">
            <Stamp variant="sand">
              ★<br />Fall<br />2026
            </Stamp>
            <h2>
              SoulHause is launching <em>Fall 2026.</em>
            </h2>
            <p>
              The platform isn&apos;t fully built yet. Join the waitlist and
              we&apos;ll let you know the moment the doors open.
            </p>
            <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <a
                className="btn btn-on-dark"
                href={JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Coming Soon · Fall 2026 <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
