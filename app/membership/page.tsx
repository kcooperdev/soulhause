import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { JOIN_URL, MEMBERSHIP_LAUNCH, NEXT_EVENT } from "../components/constants";

export default function Membership() {
  return (
    <>
      <Nav />

      <PageHero
        title={
          <>
            Two ways in. <em>Both opening soon.</em>
          </>
        }
        lede={`Hause of Soul is September 2026. Full membership opens ${MEMBERSHIP_LAUNCH} with Pro perks, cohorts, and the complete platform.`}
      />

      <section className="sec">
        <div className="wrap">
          <div className="grid-2">
            <article className="tier">
              <div className="tier-head">
                <span>Free Community</span>
              </div>
              <h3>Free</h3>
              <p className="tier-blurb">
                A free way in. Browse public channels, RSVP to free online events,
                and sample the resource library. Workshops, cohorts, and in-person
                events live in Pro.
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
                data-join-gate
                target="_blank"
                rel="noopener noreferrer"
              >
                Join waitlist <span className="arrow">→</span>
              </a>
            </article>

            <article className="tier pro">
              <div className="tier-head">
                <span>SoulHause Pro</span>
              </div>
              <h3>Pro</h3>
              <p className="tier-blurb">
                The full house. Workshops, cohorts, tech perks, in-person events,
                and Pro-only rooms for $25 a month.
              </p>
              <div className="tier-price">
                $25<small>/month</small>
              </div>
              <ul className="tier-features">
                <li>Tech perks: pooled AI credits and software discounts</li>
                <li>Pro-only channels for founders, design, and AI lab work</li>
                <li>All workshops included (live + recorded)</li>
                <li>Cohort access with 4–6 week project cycles</li>
                <li>In-person events at member pricing + Pro-only nights</li>
                <li>Pitch night access</li>
                <li>Priority Demo Day participation</li>
                <li>Accountability pods + weekly check-ins</li>
                <li>Live Q&amp;As with senior engineers and founders</li>
                <li>Full resource library with 200+ guides and templates</li>
                <li>Early access to events and sponsor drops</li>
                <li>Member-to-member referrals and job leads</li>
              </ul>
              <a
                className="btn btn-on-dark tier-cta"
                href={JOIN_URL}
                data-join-gate
                target="_blank"
                rel="noopener noreferrer"
              >
                Join waitlist <span className="arrow">→</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="sec-head">
            <div>
              <h2 className="h-section path-signature-head">
                Common <em>questions.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                Anything else? Send a note from the contact page. We read every one.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <article className="about-card">
              <h3>Can I start free and upgrade later?</h3>
              <p>
                Yes. Start with the free community, then upgrade to Pro whenever
                you&apos;re ready.
              </p>
            </article>
            <article className="about-card">
              <h3>Can I cancel Pro at any time?</h3>
              <p>
                Of course. Pro is monthly with no commitment. Cancel anytime and
                keep your free access.
              </p>
            </article>
            <article className="about-card">
              <h3>Are cohorts included with Pro?</h3>
              <p>
                Most cohorts are included or discounted for Pro members. Premium
                cycles may have a small surcharge, always announced up front.
              </p>
            </article>
            <article className="about-card">
              <h3>When can I sign up?</h3>
              <p>
                Full membership launches {MEMBERSHIP_LAUNCH}. Join the waitlist and
                you&apos;ll be first to hear when the doors open.
              </p>
            </article>
          </div>
        </div>
      </section>

      <PageCta
        title={`Membership opens ${MEMBERSHIP_LAUNCH}`}
        sub="The platform is still growing. Join the waitlist and we'll let you know the moment membership opens."
        primaryLabel="Join waitlist"
        secondaryHref="/#pathways"
        secondaryLabel="See events"
      />

      <Footer />
    </>
  );
}
