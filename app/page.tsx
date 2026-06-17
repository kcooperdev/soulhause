import type { CSSProperties } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SunMark } from "./components/SunMark";
import { JOIN_URL } from "./components/constants";

/* ─── Hero ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="hero-dark dot-grid-dark">
      {/* Parallax watermarks — positioned within viewport, overflow: visible on .hero-dark lets them render */}
      <span data-parallax="-0.15" className="hero-sun hero-sun-1">
        <SunMark size={580} opacity={0.11} color="#4F9080" />
      </span>
      <span data-parallax="0.1" className="hero-sun hero-sun-2">
        <SunMark size={400} opacity={0.08} color="#F5C432" />
      </span>

      <div className="hero-dark-inner">
        <p className="hero-eyebrow" data-reveal style={{ "--reveal-delay": "0ms" } as CSSProperties}>
          Washington D.C. · Maryland · Virginia
        </p>
        <h1 data-reveal style={{ "--reveal-delay": "60ms" } as CSSProperties}>
          Where the DMV&apos;s<br />
          builders come to<br />
          <em>connect &amp; grow.</em>
        </h1>
        <p className="hero-dark-sub" data-reveal style={{ "--reveal-delay": "140ms" } as CSSProperties}>
          SoulHause is a community of 1,100+ members across DC, Maryland, and
          Virginia — events, tools, and real relationships for those doing the work.
        </p>
        <div className="hero-dark-ctas" data-reveal style={{ "--reveal-delay": "220ms" } as CSSProperties}>
          <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Join the Community <span className="arrow">→</span>
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
const PILLARS = [
  {
    num: "01",
    cat: "Developer Platform",
    heading: "Build faster with the right tools.",
    desc: "SDKs, APIs, hosting, and automation built for modern developers shipping real products.",
    features: ["SDKs & APIs", "Serverless hosting", "Automation pipelines", "Dev-first CLI tools"],
  },
  {
    num: "02",
    cat: "Civic & Business Tools",
    heading: "Built for people, not corporations.",
    desc: "Scheduling, payments, CRM, and event management for small businesses and community organizations.",
    features: ["Scheduling & bookings", "Payments & invoicing", "Lightweight CRM", "Event management"],
  },
  {
    num: "03",
    cat: "Community Network",
    heading: "Real community — not just a Slack group.",
    desc: "Profiles, projects, skill matching, and shared resources. A complete community infrastructure.",
    features: ["Builder profiles", "Public projects", "Skill-based matching", "Community resources"],
  },
];

function WhatWeBuild() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <p className="sec-overline">§ 01 — What we build</p>
            <h2 className="h-section" style={{ marginTop: 12 }}>
              One platform.<br /><em>Three pillars.</em>
            </h2>
          </div>
          <div>
            <p className="lede">
              SoulHause gives builders a complete ecosystem — developer tools,
              business infrastructure, and a real community — in one place.
            </p>
          </div>
        </div>

        <div className="pillars-editorial">
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              className="pillar-row"
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            >
              <span className="pillar-row-num">{p.num}</span>
              <div className="pillar-row-body">
                <span className="pillar-row-cat">{p.cat}</span>
                <h3 className="pillar-row-heading">{p.heading}</h3>
                <p className="pillar-row-desc">{p.desc}</p>
              </div>
              <ul className="pillar-row-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
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
    type: "Talks",
    body: "Live conversations where founders, creators, and technologists share the real journey — mistakes, pivots, breakthroughs. One guest, one mic, one story.",
    bullets: ["One guest · one mic", "Vulnerability over performance", "Lessons you can apply immediately", "Intimate, cinematic atmosphere"],
    accent: "#4F9080",
  },
  {
    emoji: "🧪",
    tag: "Soul Labs",
    type: "Workshops",
    body: "Hands-on sessions where people come to build, not just listen. AI, software, branding, analytics — every session you walk out with a new capability.",
    bullets: ["Real tools, real output", "Beginner-friendly, high-value", "Led by engineers & practitioners", "Built for the DMV ecosystem"],
    accent: "#F5C432",
  },
  {
    emoji: "🔗",
    tag: "Hause Link",
    type: "Mixers",
    body: "Tech-forward mixers where DMV builders, creatives, founders, and technologists meet each other. Curated energy designed for collaboration — not small talk.",
    bullets: ["Tech-leaning, future-focused", "Curated conversations", "Creatives, engineers & founders", "Your entry point into SoulHause"],
    accent: "#E8703A",
  },
];

function Events() {
  return (
    <section className="sec events-dark" id="events">
      <span data-parallax="-0.08" className="events-sun">
        <SunMark size={500} opacity={0.07} color="#4F9080" />
      </span>
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="sec-head" data-reveal>
          <div>
            <p className="sec-overline" style={{ color: "rgba(245,240,230,0.45)" }}>§ 02 — The event ecosystem</p>
            <h2 className="h-section" style={{ color: "var(--sand)", marginTop: 12 }}>
              Three formats.<br /><em>One community.</em>
            </h2>
          </div>
          <div>
            <p className="lede" style={{ color: "rgba(245,240,230,0.65)" }}>
              Every SoulHause event is intentional. Whether you&apos;re here to learn,
              build, or connect — there&apos;s a format designed for you.
            </p>
          </div>
        </div>

        <div className="event-rows">
          {EVENT_FORMATS.map((fmt, i) => (
            <div
              key={fmt.tag}
              className="event-row"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms`, "--accent": fmt.accent } as CSSProperties}
            >
              <div className="event-row-left">
                <span className="event-row-emoji">{fmt.emoji}</span>
                <div>
                  <span className="event-row-name">{fmt.tag}</span>
                  <span className="event-row-type"> · {fmt.type}</span>
                </div>
              </div>
              <p className="event-row-body">{fmt.body}</p>
              <div className="event-row-bullets">
                {fmt.bullets.map((b) => (
                  <span key={b} className="event-row-bullet">{b}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="event-next" data-reveal style={{ "--reveal-delay": "60ms" } as CSSProperties}>
          <div className="event-next-left">
            <span className="event-next-label">Next Event · Hause Link Mixer</span>
            <h3 className="event-next-title">Hause of Soul</h3>
            <div className="event-next-meta">
              <span>📍 Baltimore, MD</span>
              <span>📅 September 22, 2026</span>
              <span>🍹 Happy Hour</span>
            </div>
          </div>
          <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
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
    <section className="sec" id="community">
      <div className="wrap">
        <div className="sec-head-meta" style={{ marginBottom: 48 }}>
          <span>§ 03</span>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {[
                "In-person events across Baltimore, DC, and the DMV",
                "Online community for members between events",
                "Workshops, mixers, and happy hours",
                "A space for builders at every stage",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--oxblood)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>—</span>
                  <span style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.5 }}>{item}</span>
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
    <section className="sec cta-dark">
      <div className="wrap">
        <div className="cta-v2" data-reveal>
          <span data-parallax="-0.1" style={{ position: "absolute", left: -60, bottom: -60, pointerEvents: "none" }}>
            <SunMark size={320} opacity={0.1} color="#F5C432" />
          </span>
          <span data-parallax="0.08" style={{ position: "absolute", right: -40, top: -40, pointerEvents: "none" }}>
            <SunMark size={200} opacity={0.08} color="#E8703A" />
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
