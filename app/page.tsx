import type { CSSProperties } from "react";
import Link from "next/link";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SeeEventsButton } from "./components/ExplorePathwaysButton";
import { PathwayPicker, PathwayStickyNav, PathwayHashScroll } from "./components/PathwayNav";
import { PathwayTabs } from "./components/PathwayTabs";
import {
  JOIN_URL,
  MEMBER_COUNT,
  EVENTS_HOSTED,
  FOUNDED_YEAR,
  NEXT_EVENT,
  STACK_LAYERS,
} from "./components/constants";

/* ─── Hero ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="hero-cool path-signature-block">
      <div className="hero-cool-bg" aria-hidden="true">
        <div className="hero-cool-grid" />
        <span className="hero-watermark" data-parallax="-0.05">
          SoulHause
        </span>
        <svg className="hero-pathways path-signature-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" data-parallax="0.07">
          <path className="hero-path hero-path--1" d="M 40 120 C 180 80, 320 200, 400 420" />
          <path className="hero-path hero-path--2" d="M 760 100 C 620 140, 480 220, 400 420" />
          <path className="hero-path hero-path--3" d="M 400 40 C 400 180, 400 280, 400 420" />
          <circle className="hero-node hero-node--1" cx="40" cy="120" r="6" />
          <circle className="hero-node hero-node--2" cx="760" cy="100" r="6" />
          <circle className="hero-node hero-node--3" cx="400" cy="40" r="6" />
          <circle className="hero-node hero-node--hub" cx="400" cy="420" r="10" />
        </svg>
        <span className="hero-orb hero-orb--1" data-parallax="0.18" />
        <span className="hero-orb hero-orb--2" data-parallax="-0.12" />
        <span className="hero-orb hero-orb--3" data-parallax="0.1" />
      </div>

      <div className="hero-cool-inner wrap">
        <div className="hero-cool-main">
          <h1 className="hero-cool-title" data-reveal style={{ "--reveal-delay": "40ms" } as CSSProperties}>
            <span className="hero-cool-line">Builder community</span>
            <span className="hero-cool-line hero-cool-line--ghost">built around</span>
            <span className="hero-cool-line hero-cool-line--accent">
              the work<span className="path-signature-dot">.</span>
            </span>
          </h1>

          <p className="hero-cool-sub" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
            A builder community for talks, workshops, and mixers.{" "}
            {MEMBER_COUNT} members learning, shipping, and showing up together.
          </p>

          <p className="hero-cool-next" data-reveal style={{ "--reveal-delay": "160ms" } as CSSProperties}>
            Next up:{" "}
            <a href="#next-event" className="hero-cool-next-link">
              {NEXT_EVENT.title}
            </a>
            <span className="hero-cool-next-meta"> · {NEXT_EVENT.date}</span>
          </p>

          <div className="hero-cool-ctas" data-reveal style={{ "--reveal-delay": "200ms" } as CSSProperties}>
            <a href={JOIN_URL} data-join-gate target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Join Community <span className="arrow">→</span>
            </a>
            <SeeEventsButton />
          </div>
        </div>

        <aside className="hero-cool-stack" aria-label="Community highlights">
          {[
            { num: MEMBER_COUNT, lbl: "Members", delay: "160ms" },
            { num: EVENTS_HOSTED, lbl: "Events", delay: "220ms" },
            { num: FOUNDED_YEAR, lbl: "Founded", delay: "280ms" },
          ].map((stat) => (
            <div
              key={stat.lbl}
              className="hero-stat-card"
              data-reveal
              style={{ "--reveal-delay": stat.delay } as CSSProperties}
            >
              <span className="hero-stat-num">{stat.num}</span>
              <span className="hero-stat-lbl">{stat.lbl}</span>
            </div>
          ))}
        </aside>
      </div>
    </header>
  );
}

/* ─── Events / Pathways ─────────────────────────────────────────────── */
const EVENT_FORMATS = [
  {
    tag: "Soul Sessions",
    format: "Talks",
    heading: "Stories that teach.",
    body: "Founders and technologists share the real journey: mistakes, pivots, and breakthroughs.",
    bullets: ["One guest, one story", "Vulnerability over performance", "Lessons you can use right away"],
    delay: "0ms",
  },
  {
    tag: "Soul Labs",
    format: "Workshops",
    heading: "Skills that stick.",
    body: "Hands-on sessions where you build, not just listen. AI, software, branding, and more.",
    bullets: ["Real tools and real output", "Beginner-friendly, high-value", "Led by practitioners"],
    delay: "120ms",
  },
  {
    tag: "Soul Tech",
    format: "Mixers",
    heading: "Connections that become collaborations.",
    body: "Tech-forward mixers for builders, creatives, and founders. Curated energy, not small talk.",
    bullets: ["Future-focused crowd", "Curated conversations", "Your entry point to SoulHause"],
    delay: "240ms",
  },
];

function NextEvent() {
  return (
    <div id="next-event" className="event-next" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
      <div className="event-next-left">
        <span className="event-next-label">Next Event</span>
        <h3 className="event-next-title">{NEXT_EVENT.title}</h3>
        <div className="event-next-meta">
          <span>{NEXT_EVENT.date}</span>
          <span>{NEXT_EVENT.format}</span>
          <span>{NEXT_EVENT.location}</span>
        </div>
      </div>
      <a
        href={NEXT_EVENT.rsvpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        RSVP Now <span className="arrow">→</span>
      </a>
    </div>
  );
}

function Events() {
  return (
    <section className="sec sec-events path-signature-block" id="pathways">
      <div className="events-parallax" aria-hidden="true">
        <span className="events-parallax-block events-parallax-block--1" data-parallax="0.16" />
        <span className="events-parallax-block events-parallax-block--2" data-parallax="-0.12" />
      </div>

      <div className="wrap events-showcase">
        <div className="sec-head-center" data-reveal>
          <h2 className="h-section path-signature-head">
            Three ways to <em>show up</em>
          </h2>
          <p className="lede lede-center">
            Soul Sessions, Soul Labs, and Soul Tech. Talks, workshops, and
            mixers for builders who want to learn, ship, and connect.
          </p>
        </div>

        <PathwayTabs
          tabs={EVENT_FORMATS.map((fmt, i) => ({
            id: `pathway-${i + 1}`,
            label: fmt.tag,
            tone: i + 1,
          }))}
        />

        <div className="events-showcase-list">
          {EVENT_FORMATS.map((fmt, i) => (
            <article
              key={fmt.tag}
              id={`pathway-${i + 1}`}
              className={`event-showcase event-showcase--${i + 1}`}
              data-reveal
              style={{ "--reveal-delay": fmt.delay } as CSSProperties}
            >
              <div className="event-showcase-lead">
                <span className="event-showcase-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="event-showcase-tags">
                  <span className="event-showcase-type">{fmt.format}</span>
                  <span className="event-showcase-name">{fmt.tag}</span>
                </div>
              </div>

              <div className="event-showcase-body">
                <h3 className="event-showcase-heading">{fmt.heading}</h3>
                <p className="event-showcase-desc">{fmt.body}</p>
                <ul className="event-showcase-points">
                  {fmt.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <NextEvent />
      </div>
    </section>
  );
}

/* ─── How it works ──────────────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section className="sec sec-stack">
      <div className="wrap stack-layout">
        <div className="stack-copy" data-reveal>
          <h2 className="h-section path-signature-head">
            How SoulHause <em>works</em>
          </h2>
          <p className="lede">
            Show up to events. Meet builders. Use shared tools as we grow.
          </p>
          <p className="how-body">
            Talks, workshops, and mixers in one community, not another Slack.
            Platform tools for developers and small businesses are on the way.
            Members get first access.
          </p>
          <Link href="/what-we-offer" className="btn btn-ghost">
            What we&apos;re building
          </Link>
        </div>

        <div className="stack-visual" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <div className="stack-diagram" data-parallax="0.08">
            {STACK_LAYERS.map((layer, i) => (
              <Link
                key={layer.label}
                href={layer.href}
                className={`stack-layer stack-layer--link stack-layer--${layer.tone}`}
                style={{ "--stack-index": i } as CSSProperties}
              >
                <span className="stack-layer-label">{layer.label}</span>
                <span className="stack-layer-sub">{layer.sub}</span>
                <span className="stack-layer-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="sec sec-cta-dark">
      <div className="wrap">
        <div className="cta-dark" data-reveal>
          <h2 className="cta-dark-title path-signature-head">
            Ready to show up?
          </h2>
          <p className="cta-dark-sub">
            Join {MEMBER_COUNT} builders at talks, workshops, and mixers.
          </p>
          <div className="cta-dark-btns">
            <a href={JOIN_URL} data-join-gate target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Join the Community <span className="arrow">→</span>
            </a>
            <a href="#next-event" className="btn btn-on-dark-ghost">
              RSVP for {NEXT_EVENT.title}
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
      <PathwayHashScroll />
      <PathwayStickyNav />
      <Hero />
      <Events />
      <HowItWorks />
      <CTA />
      <Footer />
      <PathwayPicker />
    </>
  );
}
