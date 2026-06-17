import type { CSSProperties } from "react";
import Link from "next/link";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SunMark } from "./components/SunMark";
import { JOIN_URL } from "./components/constants";

/* ─── Hero ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="hero-dark dot-grid-dark">
      <span data-parallax="-0.22" style={{ position: "absolute", top: -60, right: -80, pointerEvents: "none" }}>
        <SunMark size={480} opacity={0.04} color="#4F9080" />
      </span>
      <span data-parallax="0.12" style={{ position: "absolute", bottom: -100, left: -60, pointerEvents: "none" }}>
        <SunMark size={320} opacity={0.03} color="#F5C432" />
      </span>
      <div className="hero-dark-inner">
        <h1 data-reveal style={{ "--reveal-delay": "40ms" } as CSSProperties}>
          Build tools.<br />
          Build community.<br />
          Build <em>for good.</em>
        </h1>
        <p className="hero-dark-sub" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          SoulHause is a developer platform bringing together tools, infrastructure,
          and AI systems for civic tech, small businesses, and local builders.
        </p>
        <div className="hero-dark-ctas" data-reveal style={{ "--reveal-delay": "200ms" } as CSSProperties}>
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

          <div className="pillar">
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
        <div className="sec-head" data-reveal>
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
          {products.map((p, i) => (
            <div key={p.title} className="product-card" data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}>
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
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <div className="sec-head-meta">
              <span>§ 03</span>
              <span>Next event</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              Show up.<br /><em>Build together.</em>
            </h2>
          </div>
          <div>
            <p className="lede">
              SoulHause events bring the DMV community together — good
              people, good vibes, and real conversations about building.
            </p>
          </div>
        </div>

        <div className="event-feature" data-reveal style={{ "--reveal-delay": "100ms" } as CSSProperties}>
          <div className="event-feature-date">
            <div className="event-date-badge" style={{ width: "fit-content" }}>
              <span className="event-date-month">Sep</span>
              <span className="event-date-day">22</span>
            </div>
            <span className="event-type" style={{ marginTop: 10, display: "block" }}>Happy Hour</span>
          </div>
          <div className="event-feature-body">
            <h3 className="event-feature-title">Hause of Soul</h3>
            <p className="event-feature-sub">
              An evening for the DMV community to link up, unwind, and connect
              with other builders, creatives, and tech folks in the area.
              No agenda — just good energy and real conversation.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 16, marginBottom: 24 }}>
              <span className="event-meta">📍 Baltimore, MD</span>
              <span className="event-meta">📅 September 22, 2026</span>
              <span className="event-meta">🍹 Happy Hour</span>
            </div>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              RSVP Now <span className="arrow">→</span>
            </a>
          </div>
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
      <Community />
      <CTA />
      <Footer />
    </>
  );
}
