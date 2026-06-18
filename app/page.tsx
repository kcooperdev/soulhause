import type { CSSProperties } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SunMark } from "./components/SunMark";
import { JOIN_URL } from "./components/constants";

/* ─── Hero ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="hero-dark dot-grid-dark">
      <span data-parallax="-0.22" style={{ position: "absolute", top: -60, right: -80, pointerEvents: "none" }}>
        <SunMark size={480} opacity={0.06} color="#5A9A88" />
      </span>
      <span data-parallax="0.12" style={{ position: "absolute", bottom: -100, left: -60, pointerEvents: "none" }}>
        <SunMark size={320} opacity={0.05} color="#E2B93B" />
      </span>
      <div className="hero-dark-inner">
        <h1 data-reveal style={{ "--reveal-delay": "40ms" } as CSSProperties}>
          Build tools.<br />
          Build community.<br />
          Build <em>for good.</em>
        </h1>
        <p className="hero-dark-sub" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          SoulHause is an ecosystem — events, a builder community, and tools
          built for civic tech, small businesses, and local creators across the DMV.
        </p>
        <div className="hero-dark-ctas" data-reveal style={{ "--reveal-delay": "200ms" } as CSSProperties}>
          <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Join Community <span className="arrow">→</span>
          </a>
          <a href="#events" className="btn btn-dark-ghost">
            Our Events
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─── What We Build ─────────────────────────────────────────────────── */
function WhatWeBuild() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <div className="sec-head-meta">
              <span>§ 01</span>
              <span>What we build</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              One platform.<br /><em>Three pillars.</em>
            </h2>
          </div>
          <div>
            <p className="lede">
              SoulHause gives builders a complete ecosystem — developer tools,
              community infrastructure, and business tools — all in one place.
            </p>
          </div>
        </div>

        <div className="pillars-grid">
          <div className="pillar" data-reveal style={{ "--reveal-delay": "0ms" } as CSSProperties}>
            <span className="pillar-icon">🛠️</span>
            <span className="pillar-cat">§ 01 · Developer Platform</span>
            <h3>Build faster with the right tools.</h3>
            <p>
              SDKs, APIs, hosting, and automation built for modern
              developers shipping real products.
            </p>
            <ul>
              <li>SDKs &amp; APIs</li>
              <li>Serverless hosting</li>
              <li>Automation pipelines</li>
              <li>Dev-first CLI tools</li>
            </ul>
          </div>

          <div className="pillar" data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
            <span className="pillar-icon">🏙️</span>
            <span className="pillar-cat">§ 02 · Civic &amp; Business Tools</span>
            <h3>Tools built for people, not corporations.</h3>
            <p>
              Scheduling, payments, CRM, and event management designed
              for small businesses and community organizations.
            </p>
            <ul>
              <li>Scheduling &amp; bookings</li>
              <li>Payments &amp; invoicing</li>
              <li>Lightweight CRM</li>
              <li>Event management</li>
            </ul>
          </div>

          <div className="pillar" data-reveal style={{ "--reveal-delay": "200ms" } as CSSProperties}>
            <span className="pillar-icon">🤝</span>
            <span className="pillar-cat">§ 03 · Builders Network</span>
            <h3>Connect with builders doing the work.</h3>
            <p>
              A real community — not just a Slack group. Profiles,
              projects, matching, and shared resources.
            </p>
            <ul>
              <li>Builder profiles</li>
              <li>Public projects</li>
              <li>Skill-based matching</li>
              <li>Community resources</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Events ─────────────────────────────────────────────────────────── */
const EVENT_FORMATS = [
  {
    emoji: "🎤",
    tag: "Soul Sessions",
    tagline: "Talks",
    heading: "Stories that teach.",
    body: "Live conversations where founders, creators, and technologists share the real journey — the mistakes, pivots, breakthroughs, and mindset behind the work. One guest, one mic, one story.",
    bullets: ["One guest · one mic · one story", "Vulnerability over performance", "Lessons people can apply immediately", "Intimate, cinematic atmosphere"],
    delay: "0ms",
  },
  {
    emoji: "🧪",
    tag: "Soul Labs",
    tagline: "Workshops",
    heading: "Skills that create opportunity.",
    body: "Hands-on workshops where people come to build, not just listen. AI, software, branding, analytics, product development — every session is designed so you walk out with a new capability.",
    bullets: ["Real tools, real demos, real output", "Beginner-friendly but high-value", "Led by engineers and practitioners", "Built for the DMV's tech ecosystem"],
    delay: "100ms",
  },
  {
    emoji: "🔗",
    tag: "Hause Link",
    tagline: "Mixers",
    heading: "Connections that become collaborations.",
    body: "Tech-forward mixers where the DMV's builders, creatives, founders, and technologists meet each other. Curated energy designed for collaboration — not small talk.",
    bullets: ["Tech-leaning, future-focused energy", "Curated conversations, not chaos", "Creatives, engineers & founders", "The entry point into SoulHause"],
    delay: "200ms",
  },
];

function Events() {
  return (
    <section className="sec sec-alt" style={{ paddingTop: 0 }} id="events">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <div className="sec-head-meta">
              <span>§ 02</span>
              <span>The event ecosystem</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              Three ways<br />to <em>show up.</em>
            </h2>
          </div>
          <div>
            <p className="lede">
              Every SoulHause event is intentional. Whether you&apos;re here to learn,
              build, or connect — there&apos;s a format designed for you.
            </p>
          </div>
        </div>

        <div className="event-formats-grid">
          {EVENT_FORMATS.map((fmt) => (
            <div
              key={fmt.tag}
              className="event-format-card"
              data-reveal
              style={{ "--reveal-delay": fmt.delay } as CSSProperties}
            >
              <div className="event-format-top">
                <span className="event-format-emoji">{fmt.emoji}</span>
                <div>
                  <span className="event-format-tag">{fmt.tag}</span>
                  <span className="event-format-tagline"> · {fmt.tagline}</span>
                </div>
              </div>
              <h3 className="event-format-heading">{fmt.heading}</h3>
              <p className="event-format-body">{fmt.body}</p>
              <ul className="event-format-list">
                {fmt.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="event-next" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
          <div className="event-next-left">
            <span className="event-next-label">Next Event</span>
            <h3 className="event-next-title">Hause of Soul</h3>
            <div className="event-next-meta">
              <span>📍 Baltimore, MD</span>
              <span>📅 September 22, 2026</span>
              <span>🍹 Happy Hour</span>
            </div>
          </div>
          <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            RSVP Now <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Community ──────────────────────────────────────────────────────── */
function Community() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head-meta" style={{ marginBottom: 48 }}>
          <span>§ 04</span>
          <span>The community</span>
        </div>
        <div className="community-split">
          <div data-reveal>
            <h2 className="h-section" style={{ marginBottom: 20 }}>
              1,100+ members<br />across <em>the DMV.</em>
            </h2>
            <p className="lede" style={{ marginBottom: 28 }}>
              SoulHause has been building community across DC, Maryland, and Virginia
              since day one — tech professionals, creatives, entrepreneurs, and local
              builders who show up and stay connected.
            </p>
            <div className="feature-list">
              {[
                "In-person events across Baltimore, DC, and the DMV",
                "Online community for members between events",
                "Workshops, mixers, and happy hours",
                "A space for builders at every stage",
              ].map((item) => (
                <div key={item} className="feature-list-item">
                  <span className="feature-list-dash">—</span>
                  <span className="feature-list-text">{item}</span>
                </div>
              ))}
            </div>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Join SoulHause <span className="arrow">→</span>
            </a>
          </div>

          <div className="community-stats" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
            {[
              { num: "1,100+", lbl: "Members" },
              { num: "3", lbl: "States — DC, MD, VA" },
              { num: "20+", lbl: "Events Hosted" },
              { num: "2024", lbl: "Founded" },
            ].map((s) => (
              <div key={s.lbl} className="community-stat">
                <div className="community-stat-num">{s.num}</div>
                <div className="community-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta-v2" data-reveal>
          <span data-parallax="-0.1" style={{ position: "absolute", left: -60, bottom: -60, pointerEvents: "none" }}>
            <SunMark size={300} opacity={0.07} color="#F5C432" />
          </span>
          <span data-parallax="0.08" style={{ position: "absolute", right: -40, top: -40, pointerEvents: "none" }}>
            <SunMark size={180} opacity={0.05} color="#E8703A" />
          </span>
          <h2>
            Build with SoulHause.<br />
            Build for <em>your community.</em>
          </h2>
          <p>
            1,100+ members across DC, Maryland, and Virginia. Join the community
            and be part of what we&apos;re building next.
          </p>
          <div className="cta-v2-btns">
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              Join the Community <span className="arrow">→</span>
            </a>
            <a href="#events" className="btn btn-dark-ghost">
              See Our Events
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <WhatWeBuild />
      <Events />
      <Community />
      <CTA />
      <Footer />
    </>
  );
}
