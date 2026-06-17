import Link from "next/link";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SunMark } from "./components/SunMark";
import { JOIN_URL } from "./components/constants";

/* ─── Hero ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="hero-dark dot-grid-dark">
      <span style={{ position: "absolute", top: -60, right: -80, pointerEvents: "none" }}>
        <SunMark size={480} opacity={0.04} color="#4F9080" />
      </span>
      <span style={{ position: "absolute", bottom: -100, left: -60, pointerEvents: "none" }}>
        <SunMark size={320} opacity={0.03} color="#F5C432" />
      </span>
      <div className="hero-dark-inner">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Community-Powered Developer Platform · Launching September 2026
        </div>
        <h1>
          Build tools.<br />
          Build community.<br />
          Build <em>for good.</em>
        </h1>
        <p className="hero-dark-sub">
          SoulHause is a developer platform bringing together tools, infrastructure,
          and AI systems for civic tech, small businesses, and local builders.
        </p>
        <div className="hero-dark-ctas">
          <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Get Started <span className="arrow">→</span>
          </a>
          <Link href="#platform" className="btn btn-dark-ghost">
            Explore the Platform
          </Link>
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
        <div className="sec-head">
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
          <div className="pillar">
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

          <div className="pillar">
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

          <div className="pillar">
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

/* ─── Product Highlights ─────────────────────────────────────────────── */
function ProductHighlights() {
  const products = [
    {
      icon: "🤖",
      title: "AI Event Planner",
      desc: "Describe your event and get a complete plan — agendas, speaker briefs, venue specs, and promotion copy — in minutes.",
      cta: "Coming Soon",
    },
    {
      icon: "📊",
      title: "Sponsorship Deck Generator",
      desc: "Turn your event data and community metrics into a polished, conversion-ready sponsorship deck automatically.",
      cta: "Coming Soon",
    },
    {
      icon: "🏗️",
      title: "Micro-Event Architect",
      desc: "Plan, run, and recap small high-impact community events with zero overhead. Built for grassroots organizers.",
      cta: "Coming Soon",
    },
    {
      icon: "📈",
      title: "Community Dashboard",
      desc: "Track builder activity, event metrics, and community growth across all your SoulHause properties in one view.",
      cta: "Coming Soon",
    },
  ];

  return (
    <section className="sec" style={{ paddingTop: 0, background: "var(--sand)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="sec-head-meta">
              <span>§ 02</span>
              <span>Product highlights</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              AI-powered tools<br />for <em>community builders.</em>
            </h2>
          </div>
          <div>
            <p className="lede">
              Four flagship products launching with the platform.
              Built with AI at the core, designed for real workflows.
            </p>
          </div>
        </div>

        <div className="product-grid" id="platform">
          {products.map((p) => (
            <div key={p.title} className="product-card">
              <span className="product-icon">{p.icon}</span>
              <div className="product-title">{p.title}</div>
              <p className="product-desc">{p.desc}</p>
              <span className="product-cta">{p.cta} <span className="arrow">→</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Events ─────────────────────────────────────────────────────────── */
function Events() {
  const events = [
    {
      month: "Sep",
      day: "12",
      type: "Mixer",
      title: "Grassroots Tech Mixer Vol. 8",
      location: "Baltimore, MD",
      href: "#",
    },
    {
      month: "Sep",
      day: "19",
      type: "Workshop",
      title: "Build Your First AI Agent",
      location: "Virtual",
      href: "#",
    },
    {
      month: "Sep",
      day: "26",
      type: "Networking",
      title: "Tech After Dark Vol. 3",
      location: "Baltimore, MD",
      href: "#",
    },
    {
      month: "Oct",
      day: "04",
      type: "Sprint",
      title: "Civic Tech Sprint: Open Data",
      location: "Washington, DC",
      href: "#",
    },
  ];

  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="sec-head-meta">
              <span>§ 03</span>
              <span>Events</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              Show up.<br /><em>Build together.</em>
            </h2>
          </div>
          <div>
            <p className="lede">
              Mixers, workshops, civic sprints, and Tech After Dark — events
              designed for builders who want to learn, connect, and ship.
            </p>
          </div>
        </div>

        <div className="events-grid">
          {events.map((e) => (
            <div key={e.title} className="event-card">
              <div className="event-date-badge">
                <span className="event-date-month">{e.month}</span>
                <span className="event-date-day">{e.day}</span>
              </div>
              <span className="event-type">{e.type}</span>
              <h4>{e.title}</h4>
              <p className="event-meta">📍 {e.location}</p>
              <a href={e.href} className="event-rsvp">RSVP <span className="arrow">→</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Builders Community ─────────────────────────────────────────────── */
function BuildersCommunity() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head-meta" style={{ marginBottom: 48 }}>
          <span>§ 04</span>
          <span>Builders community</span>
        </div>
        <div className="community-split">
          <div>
            <h2 className="h-section" style={{ marginBottom: 20 }}>
              A network of<br />builders <em>doing the work.</em>
            </h2>
            <p className="lede" style={{ marginBottom: 28 }}>
              Not just a directory — a living community where builders
              post projects, share resources, and find collaborators.
              From solo devs to founding teams.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {[
                "Public builder profiles with skills &amp; projects",
                "Open-source and commercial project showcases",
                "Skill-based matching for collaborations",
                "Curated resource library — guides, templates, APIs",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--oxblood)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>—</span>
                  <span
                    style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.5 }}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </div>
              ))}
            </div>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Join the Community <span className="arrow">→</span>
            </a>
          </div>

          <div className="community-stats">
            {[
              { num: "200+", lbl: "Builders" },
              { num: "15+", lbl: "Events Hosted" },
              { num: "50+", lbl: "Projects Shipped" },
              { num: "12", lbl: "Cities" },
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
        <div className="cta-v2">
          <span style={{ position: "absolute", left: -60, bottom: -60, pointerEvents: "none" }}>
            <SunMark size={300} opacity={0.07} color="#F5C432" />
          </span>
          <span style={{ position: "absolute", right: -40, top: -40, pointerEvents: "none" }}>
            <SunMark size={180} opacity={0.05} color="#E8703A" />
          </span>
          <h2>
            Build with SoulHause.<br />
            Build for <em>your community.</em>
          </h2>
          <p>
            The platform launches September 2026. Get early access, join the
            builders community, and help shape what we build next.
          </p>
          <div className="cta-v2-btns">
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              Join the Community <span className="arrow">→</span>
            </a>
            <Link href="#platform" className="btn btn-dark-ghost">
              Explore the Platform
            </Link>
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
      <ProductHighlights />
      <Events />
      <BuildersCommunity />
      <CTA />
      <Footer />
    </>
  );
}
