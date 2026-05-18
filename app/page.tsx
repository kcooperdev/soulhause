const LUMA_URL = "https://luma.com/soulhause";

function Logo({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="1.5" />
      <path d="M9 22 L16 9 L23 22 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="16" cy="18" r="2" fill={color} />
    </svg>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          <span className="mark"><Logo size={22} /></span> SoulHause
        </a>
        <div className="nav-links">
          <a href="#model">The Model</a>
          <a href="#events">The Launch</a>
          <a href="#fund">Workshop Fund</a>
          <a href="#story">Our Story</a>
          <a href="#gallery">Community</a>
        </div>
        <a href={LUMA_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
          Follow on Luma <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg-grid" />
      <div className="hero-noise" />
      <div className="hero-orb a" />
      <div className="hero-orb b" />

      <div className="wrap hero-content">
        <div>
          <span className="eyebrow" style={{ color: "rgba(245,239,229,.7)" }}>
            Inaugural · Est. 2026 · Launching August
          </span>
          <h1>
            Building Tech<br />
            That Builds <em>People.</em>
          </h1>
          <p className="hero-sub">
            SoulHause launches this August with Block Party Vol. I — and every ticket sold
            funds a free tech workshop. One night to kick off a movement, wherever you are.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-on-dark" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
              Follow on Luma <span className="arrow">→</span>
            </a>
            <a className="btn btn-on-dark-ghost" href="#events">See the launch</a>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-num">01</span>
              <span className="hero-meta-lbl">Inaugural event</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-num">Aug ’26</span>
              <span className="hero-meta-lbl">Save the month</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-num">100%</span>
              <span className="hero-meta-lbl">Tickets → workshops</span>
            </div>
          </div>
        </div>

        <div className="hero-collage">
          <div className="hc-tag t1">
            <span className="dot" /> Launching · Aug 2026
          </div>
          <div className="hc-tag t2">
            <span className="dot" /> Date drops on Luma
          </div>

          <div className="hc-card hc-1">
            <div className="hc-placeholder">The venue</div>
          </div>
          <div className="hc-card hc-2">
            <div className="hc-placeholder">Soundcheck / setup</div>
          </div>
          <div className="hc-card hc-3">
            <div className="hc-placeholder">Founder portrait</div>
          </div>
        </div>
      </div>
    </header>
  );
}

type ModelCardProps = {
  idx: 1 | 2 | 3;
  badge: string;
  title: string;
  body: string;
  link: string;
  glyph: React.ReactNode;
};

function ModelCard({ idx, badge, title, body, link, glyph }: ModelCardProps) {
  return (
    <article className={`model-card b${idx}`}>
      <div className="badge"><b>0{idx}</b> <span>{badge}</span></div>
      <div className="glyph">{glyph}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="more">
        <span className="num">→ approach.{idx}</span>
        <a className="lnk" href="#events">{link} <span className="arrow">→</span></a>
      </div>
    </article>
  );
}

function Model() {
  return (
    <section className="model sec-pad" id="model">
      <div className="wrap">
        <div className="model-head">
          <div>
            <span className="eyebrow">The Model</span>
            <h2 className="h-display sec-title">
              Three loops, <span className="serif-italic">one&nbsp;movement.</span>
            </h2>
          </div>
          <p className="sec-lede">
            SoulHause runs on a simple flywheel: people come for the events, fund the
            workshops, and the workshops produce the next generation of builders.
          </p>
        </div>

        <div className="model-grid">
          <ModelCard
            idx={1}
            badge="Events"
            link="See the launch"
            title="Community-powered tech events."
            body="Block parties, hack nights, hardware shows. The energy of a festival, the substance of a maker space. We host where people already are."
            glyph={
              <svg viewBox="0 0 200 150" className="gl-svg" fill="none">
                <circle cx="40" cy="75" r="22" stroke="#0F0E0C" strokeWidth="2" />
                <circle cx="100" cy="75" r="32" stroke="#0F0E0C" strokeWidth="2" />
                <circle cx="160" cy="75" r="22" stroke="#0F0E0C" strokeWidth="2" />
                <circle cx="100" cy="75" r="6" fill="#0F0E0C" />
              </svg>
            }
          />
          <ModelCard
            idx={2}
            badge="Impact"
            link="Read transparency report"
            title="Every ticket funds a workshop."
            body="A clear, public split: a portion of every event ticket goes straight into the Workshop Fund. No overhead games. Receipts on the homepage."
            glyph={
              <svg viewBox="0 0 200 150" className="gl-svg" fill="none">
                <rect x="20" y="40" width="160" height="70" rx="12" stroke="#F5EFE5" strokeWidth="2" />
                <line x1="20" y1="68" x2="180" y2="68" stroke="#F5EFE5" strokeWidth="2" />
                <circle cx="42" cy="86" r="6" fill="#F5EFE5" />
                <rect x="60" y="80" width="100" height="12" rx="2" fill="#F5EFE5" />
                <path d="M100 18 L100 134" stroke="#F5EFE5" strokeWidth="1" strokeDasharray="3 4" />
              </svg>
            }
          />
          <ModelCard
            idx={3}
            badge="Future Products"
            link="Peek the workshop"
            title="Hardware &amp; tools for real life."
            body="Mini-startups born inside the community. Built by Hausers, for Hausers — then released into the wild. The first three drop in 2027."
            glyph={
              <svg viewBox="0 0 200 150" className="gl-svg" fill="none">
                <rect x="40" y="30" width="120" height="80" rx="10" stroke="#F5EFE5" strokeWidth="2" />
                <circle cx="100" cy="70" r="20" stroke="#F5EFE5" strokeWidth="2" />
                <circle cx="100" cy="70" r="6" fill="#F5EFE5" />
                <line x1="40" y1="125" x2="160" y2="125" stroke="#F5EFE5" strokeWidth="2" />
                <rect x="90" y="118" width="20" height="14" rx="2" fill="#F5EFE5" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="events sec-pad" id="events">
      <div className="wrap">
        <div className="events-head">
          <div>
            <span className="eyebrow" style={{ color: "rgba(245,239,229,.6)" }}>
              The Inaugural · August 2026
            </span>
            <h2 className="h-display sec-title">
              One night to start a&nbsp;movement.
            </h2>
          </div>
          <a className="btn btn-on-dark" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
            Follow on Luma <span className="arrow">→</span>
          </a>
        </div>

        <article className="event-feature">
          <div className="ev-poster" />
          <div className="ev-poster-dots" aria-hidden="true" />

          <div className="ev-top">
            <span className="pill">● Inaugural · Vol. I</span>
            <span className="pill accent">★ Launch Edition</span>
          </div>

          <div>
            <h3 className="ev-title">
              Block Party <em>Vol.&nbsp;I</em>
            </h3>
            <p className="ev-desc" style={{ marginTop: 20 }}>
              Our launch night. Food, music, a soldering demo bench, a mentorship corner,
              and a public reveal of the Workshop Fund&apos;s first month. Date and venue
              drop on Luma — follow there to be the first to know.
            </p>
          </div>

          <div className="ev-meta-grid">
            <div className="ev-meta-item">
              <span className="k">When</span>
              <span className="v"><b>August 2026</b><br />Date TBA</span>
            </div>
            <div className="ev-meta-item">
              <span className="k">Where</span>
              <span className="v"><b>Venue TBA</b><br />Announced on Luma</span>
            </div>
            <div className="ev-meta-item">
              <span className="k">Tickets</span>
              <span className="v"><b>On sale soon</b><br />Follow on Luma</span>
            </div>
            <div className="ev-meta-item">
              <span className="k">Funds</span>
              <span className="v"><b>A portion of every ticket</b><br />→ Workshop Fund</span>
            </div>
          </div>

          <div className="ev-bottom">
            <p className="ev-fine">
              Lineup, address, parking & accessibility notes drop on Luma the week of the event.
            </p>
            <div className="ev-ctas">
              <a className="ev-cta" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                Follow on Luma <span className="arrow">→</span>
              </a>
              <a className="ev-cta ghost" href="#cta">Volunteer</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Fund() {
  const target = 5000;
  const raised = 0;
  const pct = Math.round((raised / target) * 100);
  return (
    <section className="fund sec-pad" id="fund">
      <div className="wrap">
        <div className="fund-grid">
          <div>
            <span className="eyebrow">The Workshop Fund · Public ledger</span>
            <h2 className="h-display sec-title">
              Your ticket creates <span className="serif-italic">opportunity.</span>
            </h2>
            <p className="sec-lede">
              Every event contributes to the SoulHause Workshop Fund — a public pool that
              pays for free tech classes, materials, and mentor stipends.
            </p>

            <div className="fund-stat">
              <div className="fund-stat-top">
                <div>
                  <div className="fund-amt">
                    $<em>{raised.toLocaleString()}</em>
                  </div>
                  <div className="fund-goal">
                    goal for launch · ${target.toLocaleString()}
                  </div>
                </div>
                <a className="btn btn-ghost" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                  Follow on Luma <span className="arrow">→</span>
                </a>
              </div>
              <div className="fund-bar">
                <div className="fund-bar-fill" style={{ width: `${Math.max(pct, 1)}%` }} />
              </div>
              <div className="fund-legend">
                <span><b>2</b> workshops planned</span>
                <span><b>38</b> seats targeted</span>
                <span><b>{pct}%</b> to goal</span>
              </div>
            </div>
          </div>

          <div className="fund-collage">
            <div className="sticker">Workshop <b>#01</b> · Soldering 101</div>
            <div className="fc-card fc-1">Workshop in session</div>
            <div className="fc-card fc-2">Mentor + student</div>
            <div className="fc-card fc-3">Finished project</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story sec-pad" id="story">
      <div className="wrap">
        <div className="story-grid">
          <div className="story-portrait">
            <div className="frame" />
            <span className="corner">Founder · Est. 2026</span>
            Warm portrait of founder
          </div>
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="h-display sec-title">
              We&apos;re building a <em>tech family.</em>
            </h2>
            <p>
              SoulHause exists to help everyday people become creators. We believe tech
              should empower, not exclude — and that the most interesting tools come from
              the most overlooked corners of every city.
            </p>
            <p>
              We&apos;re launching this August, and building outward from the block — not
              down from a tower. Wherever you are, the door is open.
            </p>
            <div className="story-quote">
              &ldquo;We&apos;re not waiting for permission. We&apos;re building it ourselves,
              with our own people, in our own places.&rdquo;
            </div>
            <div className="story-sig">
              <div className="avatar" />
              <div>
                <div style={{ color: "var(--ink)", fontWeight: 500 }}>The SoulHause team</div>
                <div>Founders · Est. 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items: { id: string; cs: number; rs: number; cap: string }[] = [
    { id: "g1", cs: 2, rs: 2, cap: "Build day" },
    { id: "g2", cs: 1, rs: 2, cap: "Soundcheck" },
    { id: "g3", cs: 1, rs: 1, cap: "Soldering kit prep" },
    { id: "g4", cs: 1, rs: 1, cap: "Mentor lineup" },
    { id: "g5", cs: 1, rs: 2, cap: "Workshop sketch" },
    { id: "g6", cs: 2, rs: 1, cap: "Volunteer brief" },
    { id: "g7", cs: 1, rs: 1, cap: "Poster draft" },
    { id: "g8", cs: 1, rs: 1, cap: "Lighting test" },
    { id: "g9", cs: 2, rs: 1, cap: "Day-of run-of-show" },
  ];
  return (
    <section className="gallery sec-pad" id="gallery">
      <div className="wrap">
        <div className="gallery-head">
          <div>
            <span className="eyebrow">Community · Behind the build</span>
            <h2 className="h-display sec-title">Faces of the&nbsp;Hause.</h2>
          </div>
          <a className="btn btn-ghost" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
            Follow on Luma <span className="arrow">→</span>
          </a>
        </div>
        <div className="gallery-grid">
          {items.map((it) => (
            <div
              key={it.id}
              className="gal"
              style={{ gridColumn: `span ${it.cs}`, gridRow: `span ${it.rs}` }}
            >
              {it.cap}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta" id="cta">
      <div className="cta-shapes">
        <div className="cta-shape a" />
        <div className="cta-shape b" />
        <div className="cta-shape c" />
      </div>
      <div className="wrap cta-inner">
        <span className="eyebrow">Three doors. Pick one.</span>
        <h2 className="h-display">
          Be part of <em>something</em> bigger.
        </h2>
        <p className="cta-sub">
          Whether you&apos;ve got an hour, a skill, or a budget — SoulHause is built out of
          small commitments stacked on each other.
        </p>
        <div className="cta-btns">
          <a className="btn btn-primary" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
            Follow on Luma <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="mailto:hello@soulhause.com?subject=Volunteer">Volunteer</a>
          <a className="btn btn-ghost" href="mailto:hello@soulhause.com?subject=Partner">Partner With Us</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-row">
              <Logo size={28} color="var(--cream)" />
              <div className="footer-brand">SoulHause</div>
            </div>
            <p>Building tech that builds people. An open community of builders. Launching August 2026.</p>
          </div>
          <div className="footer-col">
            <h4>Show up</h4>
            <ul>
              <li><a href={LUMA_URL} target="_blank" rel="noopener noreferrer">Upcoming events</a></li>
              <li><a href={LUMA_URL} target="_blank" rel="noopener noreferrer">Workshop calendar</a></li>
              <li><a href="#cta">Volunteer</a></li>
              <li><a href="#cta">Partner</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Receipts</h4>
            <ul>
              <li><a href="#fund">Workshop Fund</a></li>
              <li><a href="#fund">Public ledger</a></li>
              <li><a href="#story">Our story</a></li>
              <li><a href="#cta">Press kit</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p className="footer-newsletter-note">
              One short email a month. Events, fund updates, photos.
            </p>
            <form className="footer-signup" action={LUMA_URL}>
              <input type="email" placeholder="you@somewhere.com" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SoulHause · Est. 2026</span>
          <div className="socials">
            <a href="#">Instagram</a>
            <a href={LUMA_URL} target="_blank" rel="noopener noreferrer">Luma</a>
            <a href="#">YouTube</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Model />
      <Events />
      <Fund />
      <Story />
      <Gallery />
      <CTA />
      <Footer />
    </>
  );
}
