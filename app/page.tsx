import { Nav } from "./components/Nav";
import { BrandSpotlight } from "./components/BrandSpotlight";
import { Logo } from "./components/Logo";
import {
  HOME_BRAND_LINE,
  NEXT_EVENT,
  PRIMARY_CTA,
} from "./components/constants";

function Hero() {
  return (
    <header className="hero-forge hero-forge--solo">
      <div className="hero-forge-canvas" aria-hidden="true" />

      <div className="hero-forge-inner">
        <div className="hero-forge-emblem" aria-hidden="true">
          <Logo size={96} />
        </div>

        <BrandSpotlight
          as="h1"
          className="hero-forge-brand"
          aria-label="SoulHause"
          tabIndex={0}
        >
          <span className="brand-soul brand-sunflow">Soul</span>
          <span className="brand-hause brand-sunflow">Hause</span>
        </BrandSpotlight>

        <p className="hero-forge-brand-line">{HOME_BRAND_LINE}</p>

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
