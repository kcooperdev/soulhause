import type { CSSProperties } from "react";
import Link from "next/link";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SeeEventsButton } from "./components/ExplorePathwaysButton";
import { PathwayPicker, PathwayStickyNav, PathwayHashScroll } from "./components/PathwayNav";
import { PathwayTabs } from "./components/PathwayTabs";
import {
  JOIN_URL,
  FLAGSHIP_PRODUCT,
  NEXT_EVENT,
  PATHWAY_PICKER,
  PATHWAY_OFFERS,
  STACK_LAYERS,
  PATHWAYS_VS_BUILDERS,
  PATHWAYS_SUMMARY,
  PRIMARY_CTA,
  NEXT_EVENT_OFFER,
  PROOF_STATS,
  FUNNEL_STEPS,
  SITE_TAGLINE,
} from "./components/constants";
function Hero() {
  const pathwayRail = PATHWAY_PICKER.map((pathway, index) => ({
    num: String(index + 1).padStart(2, "0"),
    label: pathway.shortLabel,
    tone: pathway.tone,
    href: `#${pathway.id}`,
  }));

  return (
    <header className="hero-cool path-signature-block">
      <div className="hero-cool-bg" aria-hidden="true">
        <div className="hero-cool-grid" />
        <span className="hero-watermark" data-parallax="-0.05">
          SoulHause
        </span>
        <span className="hero-orb hero-orb--1" />
        <span className="hero-orb hero-orb--2" />
        <span className="hero-orb hero-orb--3" />
        <svg className="hero-pathways path-signature-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" data-parallax="0.07">
          <path className="hero-path hero-path--1" d="M 40 120 C 180 80, 320 200, 400 420" />
          <path className="hero-path hero-path--2" d="M 760 100 C 620 140, 480 220, 400 420" />
          <path className="hero-path hero-path--3" d="M 400 40 C 400 180, 400 280, 400 420" />
          <circle className="hero-node hero-node--1" cx="40" cy="120" r="6" />
          <circle className="hero-node hero-node--2" cx="760" cy="100" r="6" />
          <circle className="hero-node hero-node--3" cx="400" cy="40" r="6" />
          <circle className="hero-node hero-node--hub" cx="400" cy="420" r="10" />
        </svg>
      </div>

      <div className="hero-cool-inner wrap">
        <div className="hero-cool-main">
          <span className="hero-cool-badge">
            <span className="hero-cool-badge-dot" />
            {NEXT_EVENT_OFFER.eyebrow}
          </span>

          <h1 className="hero-cool-title">
            <span className="hero-cool-line">{NEXT_EVENT.shortTitle}</span>
            <span className="hero-cool-line hero-cool-line--accent">{NEXT_EVENT.format}</span>
          </h1>

          <p className="hero-cool-sub">
            {NEXT_EVENT_OFFER.lede}
          </p>
          <p className="hero-cool-sub">
            {NEXT_EVENT_OFFER.detail}
          </p>
          <p className="hero-cool-next">
            {NEXT_EVENT.date}
          </p>
          <p className="hero-cool-brand">
            SoulHause. {SITE_TAGLINE}
          </p>

          <div className="hero-cool-ctas">
            <a href={NEXT_EVENT.rsvpUrl} data-join-gate target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {PRIMARY_CTA} <span className="arrow">→</span>
            </a>
            <SeeEventsButton />
          </div>

          <div className="hero-cool-rail">
            {pathwayRail.map((item) => (
              <a key={item.num} href={item.href} className={`hero-rail-item hero-rail-item--${item.tone}`}>
                <span className="hero-rail-num">{item.num}</span>
                <span className="hero-rail-label">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <aside className="hero-cool-stack" aria-label="Proof">
          {PROOF_STATS.map((stat) => (
            <div key={stat.label} className="hero-stat-card">
              <span className="hero-stat-num">{stat.value}</span>
              <span className="hero-stat-lbl">{stat.label}</span>
            </div>
          ))}
        </aside>
      </div>
    </header>
  );
}

/* ─── Flagship product ──────────────────────────────────────────────── */
function FlagshipProduct() {
  return (
    <section className="sec sec-alt" id="flagship">
      <div className="wrap flagship-block">
        <div className="flagship-copy">
          <p className="flagship-eyebrow">Citywide moment</p>
          <h2 className="h-section path-signature-head">
            {FLAGSHIP_PRODUCT.name}
          </h2>
          <p className="product-parent-line">A SoulHause product · {FLAGSHIP_PRODUCT.location}</p>
          <p className="lede">{FLAGSHIP_PRODUCT.summary}</p>
          <p className="how-body">
            {FLAGSHIP_PRODUCT.description} Start with pathways. BTW is where the community
            shows up at scale.
          </p>
          <div className="flagship-ctas">
            <SeeEventsButton />
            <a
              href={FLAGSHIP_PRODUCT.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Explore Baltimore Tech Week <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <div className="flagship-card">
          <span className="flagship-card-badge">{FLAGSHIP_PRODUCT.badge}</span>
          <h3 className="flagship-card-title">{FLAGSHIP_PRODUCT.name}</h3>
          <p className="flagship-card-tagline">{FLAGSHIP_PRODUCT.tagline}</p>
          <ul className="flagship-card-list">
            {FLAGSHIP_PRODUCT.highlights.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const EVENT_FORMATS = PATHWAY_PICKER.map((pathway, index) => ({
  id: pathway.id,
  tag: pathway.label,
  shortTag: pathway.shortLabel,
  format: pathway.format,
  heading: PATHWAY_OFFERS[index].heading,
  body: PATHWAY_OFFERS[index].body,
  bullets: PATHWAY_OFFERS[index].bullets,
}));

function NextEvent() {
  return (
    <div id="next-event" className="event-offer" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
      <div className="event-offer-main">
        <span className="event-next-label">Next up</span>
        <h3 className="event-next-title">{NEXT_EVENT.title}</h3>
        <p className="event-offer-who">{NEXT_EVENT_OFFER.lede}</p>
        <p className="event-offer-who">{NEXT_EVENT_OFFER.detail}</p>
        <div className="event-next-meta">
          <span>{NEXT_EVENT.date}</span>
          <span>{NEXT_EVENT.format}</span>
        </div>
      </div>
      <a
        href={NEXT_EVENT.rsvpUrl}
        data-join-gate
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        {PRIMARY_CTA} <span className="arrow">→</span>
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
          <p className="flagship-eyebrow" style={{ justifyContent: "center" }}>RSVP on Luma</p>
          <h2 className="h-section path-signature-head">
            Three ways to <em>show up</em>
          </h2>
          <p className="lede lede-center">
            {PATHWAYS_SUMMARY}
          </p>
        </div>

        <PathwayTabs
          tabs={EVENT_FORMATS.map((fmt, i) => ({
            id: fmt.id,
            label: fmt.shortTag,
            tone: i + 1,
          }))}
        />

        <div className="events-showcase-list">
          {EVENT_FORMATS.map((fmt, i) => (
            <article
              key={fmt.id}
              id={fmt.id}
              className={`event-showcase event-showcase--${i + 1}`}
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
            Three steps to <em>get in</em>
          </h2>
          <p className="lede">
            Pick an event on Luma, show up in person, come back for the next one.
          </p>
          <div className="funnel-steps">
            {FUNNEL_STEPS.map((item) => (
              <article key={item.step} className="funnel-step">
                <span className="funnel-step-num">{item.step}</span>
                <div>
                  <h3 className="funnel-step-title">{item.title}</h3>
                  <p className="funnel-step-body">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="how-body">
            {PATHWAYS_VS_BUILDERS}
          </p>
          <div className="flagship-ctas">
            <a href={JOIN_URL} data-join-gate target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {PRIMARY_CTA} <span className="arrow">→</span>
            </a>
            <a href="#next-event" className="btn btn-ghost">
              Next event
            </a>
          </div>
        </div>

        <div className="stack-visual" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <div className="stack-diagram" data-parallax="0.08">
            {STACK_LAYERS.map((layer, i) => {
              const className = `stack-layer stack-layer--link stack-layer--${layer.tone}`;
              const style = { "--stack-index": i } as CSSProperties;
              const content = (
                <>
                  <span className="stack-layer-label">{layer.label}</span>
                  <span className="stack-layer-sub">{layer.sub}</span>
                  <span className="stack-layer-arrow" aria-hidden="true">→</span>
                </>
              );

              if (layer.href.startsWith("http")) {
                return (
                  <a
                    key={layer.label}
                    href={layer.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    style={style}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link key={layer.label} href={layer.href} className={className} style={style}>
                  {content}
                </Link>
              );
            })}
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
            Come through the door
          </h2>
          <p className="cta-dark-sub">
            {NEXT_EVENT.shortTitle} · {NEXT_EVENT.date}. Pick your event and RSVP on Luma.
          </p>
          <div className="cta-dark-btns">
            <a href={NEXT_EVENT.rsvpUrl} data-join-gate target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {PRIMARY_CTA} <span className="arrow">→</span>
            </a>
            <a href="#pathways" className="btn btn-on-dark-ghost">
              See events
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
      <FlagshipProduct />
      <HowItWorks />
      <CTA />
      <Footer />
      <PathwayPicker />
    </>
  );
}
