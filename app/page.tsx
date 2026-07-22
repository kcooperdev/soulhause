import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { PathwayHashScroll } from "./components/PathwayNav";
import { PathwayTabs } from "./components/PathwayTabs";
import {
  FLAGSHIP_PRODUCT,
  NEXT_EVENT,
  PATHWAY_PICKER,
  PATHWAY_OFFERS,
  PATHWAYS_SUMMARY,
  PRIMARY_CTA,
  SITE_TAGLINE,
  MEMBER_COUNT,
  EVENTS_HOSTED,
} from "./components/constants";

function Hero() {
  return (
    <header className="hero-forge">
      <div className="hero-forge-wash" aria-hidden="true" />
      <div className="wrap hero-forge-inner">
        <h1 className="hero-forge-brand" aria-label="SoulHause">
          <span className="brand-soul">Soul</span>
          <span className="brand-hause">Hause</span>
        </h1>
        <p className="hero-forge-lede">{SITE_TAGLINE}</p>
        <div className="hero-forge-cta">
          <a
            href={NEXT_EVENT.rsvpUrl}
            data-join-gate
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {PRIMARY_CTA} <span className="arrow">→</span>
          </a>
          <p className="hero-forge-meta">
            {NEXT_EVENT.shortTitle} · {NEXT_EVENT.date}
          </p>
        </div>
      </div>
    </header>
  );
}

/** Quiet trust strip: city + community + cadence. Not a dashboard. */
function Proof() {
  return (
    <section className="sec-proof" aria-label="SoulHause at a glance">
      <div className="wrap proof-bar" data-reveal>
        <p className="proof-line">
          <span>{MEMBER_COUNT} in the ecosystem</span>
          <span className="proof-sep" aria-hidden="true">
            ·
          </span>
          <span>Baltimore</span>
          <span className="proof-sep" aria-hidden="true">
            ·
          </span>
          <span>
            {EVENTS_HOSTED} events hosted
          </span>
        </p>
      </div>
    </section>
  );
}

const PATHWAYS = PATHWAY_PICKER.map((pathway, index) => ({
  id: pathway.id,
  label: pathway.shortLabel,
  format: pathway.format,
  metal: pathway.metal,
  body: PATHWAY_OFFERS[index].body,
  index: index + 1,
}));

function Pathways() {
  return (
    <section className="sec sec-pathways" id="pathways">
      <div className="wrap">
        <div className="pathways-head" data-reveal>
          <h2 className="h-section">
            SoulHause <em>Events</em>
          </h2>
          <p className="lede">{PATHWAYS_SUMMARY}</p>
        </div>

        <div data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
          <PathwayTabs pathways={PATHWAYS} />
        </div>
      </div>
    </section>
  );
}

function Flagship() {
  return (
    <section className="sec-flagship" id="flagship" aria-labelledby="flagship-title">
      <div className="flagship-stage">
        <div className="flagship-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/atmosphere/btw-hero-mural.jpg"
            alt=""
            className="flagship-mural"
            width={1024}
            height={1024}
            decoding="async"
            loading="lazy"
          />
          <div className="flagship-scrim" />
        </div>

        <div className="flagship-band">
          <div className="wrap flagship-band-inner">
            <p className="flagship-band-meta">{FLAGSHIP_PRODUCT.meta}</p>
            <div className="flagship-band-row">
              <h2 id="flagship-title" className="flagship-band-title">
                {FLAGSHIP_PRODUCT.name}
              </h2>
              <a
                href={FLAGSHIP_PRODUCT.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flagship-band-link"
              >
                bmoretechweek.com <span className="arrow">→</span>
              </a>
            </div>
            <p className="flagship-band-lede">{FLAGSHIP_PRODUCT.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="sec-close" id="next-event">
      <div className="wrap close-inner" data-reveal>
        <p className="close-brand" aria-label="SoulHause">
          <span className="brand-soul">Soul</span>
          <span className="brand-hause">Hause</span>
        </p>
        <h2 className="close-title">
          Come through the <em>door</em>
        </h2>
        <p className="close-sub">
          {NEXT_EVENT.shortTitle} · {NEXT_EVENT.date}. One night in SoulHause
          Events. {MEMBER_COUNT} already in motion.
        </p>
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
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <PathwayHashScroll />
      <Hero />
      <Proof />
      <Pathways />
      <Flagship />
      <Close />
      <Footer />
    </>
  );
}
