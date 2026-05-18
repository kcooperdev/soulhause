import Interactive from "./interactive";

const LUMA_URL = "https://luma.com/soulhause";

function EqBars() {
  return (
    <div className="eq" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="eq-bar"
          style={{
            animationDelay: `${(i * 0.13) % 1.1}s`,
            animationDuration: `${0.9 + (i % 4) * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

function VinylDisc() {
  return (
    <div className="vinyl" aria-hidden="true">
      <div className="vinyl-disc">
        <span className="vinyl-ring r1" />
        <span className="vinyl-ring r2" />
        <span className="vinyl-ring r3" />
        <span className="vinyl-ring r4" />
        <div className="vinyl-label">
          <span className="vinyl-label-top">Hause of Soul</span>
          <span className="vinyl-label-mid">★</span>
          <span className="vinyl-label-bot">33⅓ · Aug ’26</span>
        </div>
        <span className="vinyl-hole" />
      </div>
    </div>
  );
}

function TicketStub() {
  return (
    <div className="ticket" aria-hidden="true">
      <span className="ticket-perf" />
      <div className="ticket-body">
        <span className="ticket-lbl">★ Admit One</span>
        <span className="ticket-num">01</span>
        <span className="ticket-foot">Inaugural · Est. 2026</span>
      </div>
    </div>
  );
}

function CircuitArt() {
  return (
    <div className="circuit" aria-hidden="true">
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="circuit-svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(245,239,229,.25)" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#dots)" />
        <path d="M16 30 H80 V70 H120 V44 H184" stroke="rgba(245,239,229,.55)" strokeWidth="1.5" fill="none" />
        <path d="M16 120 H50 V160 H110" stroke="rgba(255,122,58,.75)" strokeWidth="1.5" fill="none" />
        <path d="M180 100 H140 V140 H100" stroke="rgba(245,239,229,.4)" strokeWidth="1.5" fill="none" />
        <circle cx="80" cy="70" r="3.5" fill="var(--orange)" />
        <circle cx="120" cy="44" r="3.5" fill="var(--cream)" />
        <circle cx="50" cy="160" r="3.5" fill="var(--cream)" />
        <circle cx="140" cy="140" r="3.5" fill="var(--orange)" />
      </svg>
      <span className="circuit-badge">★ Workshop #01</span>
    </div>
  );
}

function ReceiptCard() {
  return (
    <div className="receipt" aria-hidden="true">
      <div className="receipt-head">
        <span>★ Workshop Fund</span>
        <span>#01</span>
      </div>
      <div className="receipt-row"><span>1 × Workshop seat</span><span>FREE</span></div>
      <div className="receipt-row"><span>1 × Soldering kit</span><span>FREE</span></div>
      <div className="receipt-row"><span>1 × Mentor hour</span><span>FREE</span></div>
      <div className="receipt-rule" />
      <div className="receipt-row total"><span>TOTAL</span><span>$0.00</span></div>
      <div className="receipt-foot">★ Paid by ticket holders</div>
    </div>
  );
}

function OpenStamp() {
  return (
    <div className="stamp-art" aria-hidden="true">
      <div className="stamp-art-mark">
        <span className="stamp-art-star">★</span>
        <span className="stamp-art-word">OPEN</span>
        <span className="stamp-art-star">★</span>
      </div>
      <span className="stamp-art-sub">No gate. No code.</span>
    </div>
  );
}

function StoryCover() {
  return (
    <div className="cover" aria-hidden="true">
      <div className="cover-top">
        <span>SoulHause Press</span>
        <span>Vol. I · 2026</span>
      </div>
      <div className="cover-mark">
        Soul<em>·</em><br />Hause<span className="cover-period">.</span>
      </div>
      <div className="cover-rule" />
      <div className="cover-foot">
        <span>★ The Inaugural</span>
        <span>Issue No. 01</span>
      </div>
      <span className="cover-bars">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} />
        ))}
      </span>
    </div>
  );
}

function Logo({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* vinyl disc */}
      <circle cx="13" cy="19" r="10.5" stroke={color} strokeWidth="1.5" />
      {/* spindle */}
      <circle cx="13" cy="19" r="1.2" fill={color} />
      {/* tonearm pivot */}
      <circle cx="27" cy="5" r="2.2" stroke={color} strokeWidth="1" />
      {/* tonearm */}
      <line x1="25.5" y1="6.5" x2="18.5" y2="13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* orange needle — soul touching the groove */}
      <circle cx="18" cy="14" r="2.8" fill="#FF7A3A" />
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
            SoulHause launches this August with Hause of Soul — and every ticket sold
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

          <div className="hc-card hc-1 hc-art hc-art-blue">
            <EqBars />
            <span className="hc-art-corner">★ Live · Aug 2026</span>
          </div>
          <div className="hc-card hc-2 hc-art hc-art-cream">
            <VinylDisc />
          </div>
          <div className="hc-card hc-3 hc-art hc-art-sun">
            <TicketStub />
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
              Hause of <em>Soul.</em>
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
            <div className="fc-card fc-1 fc-art fc-art-blue">
              <CircuitArt />
            </div>
            <div className="fc-card fc-2 fc-art fc-art-cream">
              <ReceiptCard />
            </div>
            <div className="fc-card fc-3 fc-art fc-art-ink">
              <OpenStamp />
            </div>
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
          <div className="story-portrait story-cover">
            <div className="frame" />
            <span className="corner">Founded</span>
            <StoryCover />
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
          </div>
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
      <CTA />
      <Footer />
      <Interactive />
    </>
  );
}
