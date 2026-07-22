import Link from "next/link";
import { Nav } from "./components/Nav";
import { BrandSpotlight } from "./components/BrandSpotlight";
import {
  EXPLORE_EVENTS_CTA,
  HOME_LEDE,
  NEXT_EVENT,
  PRIMARY_CTA,
} from "./components/constants";

function Hero() {
  return (
    <header className="hero-forge hero-forge--solo">
      <div className="hero-forge-canvas" aria-hidden="true" />

      <div className="wrap hero-forge-inner">
        <BrandSpotlight
          as="h1"
          className="hero-forge-brand"
          aria-label="SoulHause"
          tabIndex={0}
        >
          <span className="brand-soul brand-sunflow">Soul</span>
          <span className="brand-hause brand-sunflow">Hause</span>
        </BrandSpotlight>

        <p className="hero-forge-lede">{HOME_LEDE}</p>

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
            Next: {NEXT_EVENT.shortTitle} · {NEXT_EVENT.date}
          </p>
          <Link href="/events" className="hero-forge-secondary">
            {EXPLORE_EVENTS_CTA} <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="page-home">
      <Nav />
      <Hero />
    </div>
  );
}
