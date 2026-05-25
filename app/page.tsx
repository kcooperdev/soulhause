import Interactive from "./interactive";

const JOIN_URL = "https://luma.com/soulhause";
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
          <span className="vinyl-label-top">SoulHause</span>
          <span className="vinyl-label-mid">★</span>
          <span className="vinyl-label-bot">Est · MMXXVI</span>
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
        <span className="ticket-lbl">★ Member · No. 001</span>
        <span className="ticket-num">25</span>
        <span className="ticket-foot">/mo · Locked for life</span>
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
      <span className="circuit-badge">★ Give-Back Ledger</span>
    </div>
  );
}

function ReceiptCard() {
  return (
    <div className="receipt" aria-hidden="true">
      <div className="receipt-head">
        <span>★ Monthly split</span>
        <span>$25.00</span>
      </div>
      <div className="receipt-row"><span>Platform &amp; courses</span><span>$18.00</span></div>
      <div className="receipt-row"><span>Tech nonprofits</span><span>$5.00</span></div>
      <div className="receipt-row"><span>Member ops</span><span>$2.00</span></div>
      <div className="receipt-rule" />
      <div className="receipt-row total"><span>TOTAL</span><span>$25.00</span></div>
      <div className="receipt-foot">★ Reported quarterly</div>
    </div>
  );
}

function OpenStamp() {
  return (
    <div className="stamp-art" aria-hidden="true">
      <div className="stamp-art-mark">
        <span className="stamp-art-star">★</span>
        <span className="stamp-art-word">PAID</span>
        <span className="stamp-art-star">★</span>
      </div>
      <span className="stamp-art-sub">Forward · By every member</span>
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
        <span>★ A small house</span>
        <span>with the lights on</span>
      </div>
      <span className="cover-bars">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} />
        ))}
      </span>
    </div>
  );
}

function Logo({ size = 22, ring = "#0F0E0C", house = "#F5EFE5" }: { size?: number; ring?: string; house?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={ring} />
      <path d="M16 8.4 L8.6 14.2 L8.6 22.6 L23.4 22.6 L23.4 14.2 Z" fill={house} />
      <rect x="14.4" y="17.6" width="3.2" height="5" rx="0.4" fill="#FF7A3A" />
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
          <a href="#model">The Hause</a>
          <a href="#inside">Inside</a>
          <a href="#nonprofits">5% Give-Back</a>
        </div>
        <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
          Join SoulHause <span className="arrow">→</span>
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
            Private community · Members only · Est. 2026
          </span>
          <h1>
            A home for tech.<br />
            A house for <em>careers.</em>
          </h1>
          <p className="hero-sub">
            A private community for builders. Find tech events near you, take
            workshops and courses, share resources, and use your SoulHause card
            for perks at the tools you already use. 5% of every membership goes
            to tech nonprofits each month.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-on-dark" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              Join SoulHause <span className="arrow">→</span>
            </a>
            <a className="btn btn-on-dark-ghost" href="#inside">See what&apos;s inside</a>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-num">1,284</span>
              <span className="hero-meta-lbl">Builders inside</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-num">$25<small style={{ fontSize: 14, opacity: 0.7 }}>/mo</small></span>
              <span className="hero-meta-lbl">Locked for life</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-num">5%</span>
              <span className="hero-meta-lbl">→ tech nonprofits / mo</span>
            </div>
          </div>
        </div>

        <div className="hero-collage">
          <div className="hc-tag t1">
            <span className="dot" /> Doors open · 2026
          </div>
          <div className="hc-tag t2">
            <span className="dot" /> Where careers compound
          </div>

          <div className="hc-card hc-1 hc-art hc-art-blue">
            <EqBars />
            <span className="hc-art-corner">★ Live circles · weekly</span>
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
        <span className="num">→ pillar.{idx}</span>
        <a className="lnk" href="#inside">{link} <span className="arrow">→</span></a>
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
            <span className="eyebrow">The Three Pillars</span>
            <h2 className="h-display sec-title">
              A small house <span className="serif-italic">with the lights on.</span>
            </h2>
          </div>
          <p className="sec-lede">
            SoulHause is built on three things: a home where builders show up
            for each other, career growth with the unwritten rules written
            down, and a give-back that funds the next wave of builders.
          </p>
        </div>

        <div className="model-grid">
          <ModelCard
            idx={1}
            badge="Home"
            link="Meet the rooms"
            title="A place where people remember your name."
            body="Channels organized by the work itself — ic-to-staff, design-engineering, founders-circle, offers-and-comp, small-wins. Small enough to know. Warm enough to come back to."
            glyph={
              <svg viewBox="0 0 200 150" className="gl-svg" fill="none">
                <path d="M40 90 L100 40 L160 90 L160 130 L40 130 Z" stroke="#0F0E0C" strokeWidth="2" fill="none" />
                <rect x="88" y="100" width="24" height="30" stroke="#0F0E0C" strokeWidth="2" fill="none" />
                <circle cx="100" cy="115" r="2" fill="#0F0E0C" />
                <path d="M100 40 L100 28" stroke="#FF7A3A" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="100" cy="24" r="4" fill="#FF7A3A" />
              </svg>
            }
          />
          <ModelCard
            idx={2}
            badge="Career growth"
            link="Open the curriculum"
            title="The unwritten rules, written down."
            body="From IC to Staff by a Stripe staff eng. Negotiating Senior Offers by an Anthropic principal. Quitting Well by a PM-turned-founder. Live circles every week. A vault you can search."
            glyph={
              <svg viewBox="0 0 200 150" className="gl-svg" fill="none">
                <path d="M30 110 L70 70 L110 90 L170 40" stroke="#F5EFE5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="30" cy="110" r="4" fill="#F5EFE5" />
                <circle cx="70" cy="70" r="4" fill="#F5EFE5" />
                <circle cx="110" cy="90" r="4" fill="#F5EFE5" />
                <circle cx="170" cy="40" r="5" fill="#FF7A3A" />
                <line x1="20" y1="130" x2="180" y2="130" stroke="#F5EFE5" strokeWidth="1" opacity="0.5" />
              </svg>
            }
          />
          <ModelCard
            idx={3}
            badge="Give back"
            link="See the nonprofits"
            title="The career you grow grows someone else&apos;s."
            body="5% of every membership funds tech nonprofits each month — 2 or 3 orgs at a time, picked publicly. Investing back into the communities that invest in us."
            glyph={
              <svg viewBox="0 0 200 150" className="gl-svg" fill="none">
                <circle cx="70" cy="75" r="22" stroke="#F5EFE5" strokeWidth="2" />
                <circle cx="130" cy="75" r="22" stroke="#F5EFE5" strokeWidth="2" />
                <path d="M90 75 L110 75" stroke="#FF7A3A" strokeWidth="2.5" />
                <path d="M104 69 L110 75 L104 81" stroke="#FF7A3A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="70" cy="75" r="6" fill="#F5EFE5" />
                <circle cx="130" cy="75" r="6" fill="#FF7A3A" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

type InsideCardProps = {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  bullets: string[];
};

function InsideCard({ eyebrow, title, body, bullets }: InsideCardProps) {
  return (
    <article className="inside-card">
      <span className="ic-eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      <ul>
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

function Inside() {
  return (
    <section className="inside sec-pad" id="inside">
      <div className="wrap">
        <div className="events-head">
          <div>
            <span className="eyebrow" style={{ color: "rgba(245,239,229,.6)" }}>
              Inside the Membership
            </span>
            <h2 className="h-display sec-title">
              What you get for $25 a month.
            </h2>
          </div>
          <a className="btn btn-on-dark" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
            Join SoulHause <span className="arrow">→</span>
          </a>
        </div>

        <div className="inside-grid">
          <InsideCard
            eyebrow="● Events Map"
            title="Tech events near you."
            body="A map of meetups, workshops, hackathons, and conferences across cities. Online and in person. Search by stack, by role, by what you&apos;re building this month."
            bullets={[
              "Map view, by city",
              "Filter by stack or role",
              "Online + in-person",
              "Member-priced sponsor events",
            ]}
          />
          <InsideCard
            eyebrow="● Workshops"
            title="Hands-on, member-led."
            body="Soldering benches, AI agent build-alongs, RFC writing circles, design crits. Workshops members run for each other every month — recorded if you can&apos;t make it."
            bullets={[
              "Weekly, member-led",
              "Online + IRL formats",
              "Recorded to the library",
              "Materials shipped for IRL",
            ]}
          />
          <InsideCard
            eyebrow="● Courses & Resources"
            title="Free tech resources + paid deep-dives."
            body="A growing library of guides, templates, and prompts — free, even for non-members. Paid courses by people who actually did the thing live inside the membership."
            bullets={[
              "Free guides + templates",
              "Promo packets that worked",
              "Negotiating senior offers",
              "Going from PM to founder",
            ]}
          />
          <InsideCard
            eyebrow="● The SoulHause Card"
            title="One card, every tech perk."
            body="Pooled member credits at the tools you already use — Anthropic, Cursor, Linear, Notion, Vercel, and friends. Sponsor-funded, never advertised at you."
            bullets={[
              "AI + cloud credits, monthly",
              "Design + dev tool seats",
              "Conference ticket lottery",
              "Member-only sponsor drops",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

const FOCUS_AREAS = [
  "STEM education",
  "Digital literacy",
  "Tech access & equity",
  "Open-source development",
];

type MonthOrgProps = {
  num: string;
  name: string;
  area: string;
};

function MonthOrg({ num, name, area }: MonthOrgProps) {
  return (
    <article className="np-card">
      <div className="np-head">
        <span className="np-num">{num}</span>
        <span className="np-raised">May 2026</span>
      </div>
      <h4 className="np-name">{name}</h4>
      <p className="np-mission">{area}</p>
    </article>
  );
}

function Nonprofits() {
  return (
    <section className="fund sec-pad" id="nonprofits">
      <div className="wrap">
        <div className="fund-grid">
          <div>
            <span className="eyebrow">5% Give-Back Program · Public Ledger</span>
            <h2 className="h-display sec-title">
              5% of every membership →{" "}
              <span className="serif-italic">tech nonprofits.</span>
            </h2>
            <p className="sec-lede">
              Each month we pick 2 or 3 tech nonprofits and forward 5% of that
              month&apos;s revenue. We post the total and the orgs we picked on
              the first of the following month. This isn&apos;t a marketing
              slogan — it&apos;s how we operate.
            </p>

            <div className="fund-focus">
              <span className="fund-focus-lbl">Focus areas</span>
              <div className="fund-focus-tags">
                {FOCUS_AREAS.map((a) => (
                  <span key={a} className="fa-tag">{a}</span>
                ))}
              </div>
            </div>

            <div className="fund-stat">
              <div className="fund-stat-top">
                <div>
                  <div className="fund-amt">
                    $<em>1,284</em>
                  </div>
                  <div className="fund-goal">
                    forwarded · April 2026
                  </div>
                </div>
                <a className="btn btn-ghost" href="mailto:hello@soulhause.com?subject=Nonprofit application" rel="noopener noreferrer">
                  Apply to be featured <span className="arrow">→</span>
                </a>
              </div>
              <div className="fund-legend">
                <span><b>5%</b> of monthly revenue</span>
                <span><b>2–3</b> orgs picked / mo</span>
                <span><b>Public</b> ledger, monthly</span>
              </div>
            </div>
          </div>

          <div className="np-list">
            <span className="np-list-lbl">This month&apos;s recipients</span>
            <MonthOrg
              num="01"
              name="CodeBridge Collective"
              area="Tech access & equity"
            />
            <MonthOrg
              num="02"
              name="Open Lantern Project"
              area="Digital literacy"
            />
            <MonthOrg
              num="03"
              name="Future Stack Foundation"
              area="STEM education"
            />
            <a
              href="mailto:hello@soulhause.com?subject=Nonprofit application"
              className="np-apply"
            >
              <div>
                <span className="np-apply-lbl">Run a tech nonprofit?</span>
                <span className="np-apply-cta">Apply to be featured <span className="arrow">→</span></span>
              </div>
            </a>
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
        <span className="eyebrow">The door is open.</span>
        <h2 className="h-display">
          Join <em>SoulHause.</em>
        </h2>
        <p className="cta-sub">
          $25/mo. Events, courses, resources, perks. 5% of every membership goes
          to tech nonprofits each month.
        </p>
        <div className="cta-btns">
          <a className="btn btn-primary" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
            Join SoulHause <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#nonprofits">See the ledger</a>
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
              <Logo size={28} ring="#F5EFE5" house="#0F0E0C" />
              <div className="footer-brand">SoulHause</div>
            </div>
            <p>A private community for builders. 5% of every membership goes to tech nonprofits each month.</p>
          </div>
          <div className="footer-col">
            <h4>The Hause</h4>
            <ul>
              <li><a href="#inside">Events map</a></li>
              <li><a href="#inside">Workshops</a></li>
              <li><a href="#inside">Courses & resources</a></li>
              <li><a href="#inside">SoulHause card</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>5% Give-Back</h4>
            <ul>
              <li><a href="#nonprofits">How it works</a></li>
              <li><a href="#nonprofits">Public ledger</a></li>
              <li><a href="mailto:hello@soulhause.com?subject=Nonprofit application">Apply (nonprofits)</a></li>
              <li><a href="mailto:hello@soulhause.com">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p className="footer-newsletter-note">
              One short email a month. New courses, fund updates, members joining.
            </p>
            <form className="footer-signup" action={JOIN_URL}>
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
      <Inside />
      <Nonprofits />
      <CTA />
      <Footer />
      <Interactive />
    </>
  );
}
