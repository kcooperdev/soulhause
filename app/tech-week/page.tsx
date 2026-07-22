import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageCta } from "../components/PageCta";
import { BrandText } from "../components/BrandSpotlight";
import {
  EXPLORE_TECH_WEEK_CTA,
  FLAGSHIP_PRODUCT,
  RSVP_INFO_SESSION_CTA,
} from "../components/constants";

export const metadata: Metadata = {
  title: "Baltimore Tech Week | Powered by SoulHause",
  description: FLAGSHIP_PRODUCT.tagline,
};

export default function TechWeekPage() {
  return (
    <>
      <Nav />

      <div className="tw-mural" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/atmosphere/btw-hero-mural.jpg"
          alt=""
          className="tw-mural-img"
          width={1024}
          height={1024}
          decoding="async"
          loading="eager"
        />
      </div>

      <header className="tw-intro" aria-labelledby="tw-intro-title">
        <div className="wrap tw-intro-inner">
          <h1 id="tw-intro-title" className="tw-intro-title">
            Baltimore <em>Tech</em> Week
          </h1>
          <p className="tw-intro-meta mono">
            <BrandText text={FLAGSHIP_PRODUCT.meta} />
          </p>
          <p className="tw-intro-lede">
            {FLAGSHIP_PRODUCT.stageLede} Cultural infrastructure at the scale of
            the city, powered by <BrandText text="SoulHause" />. Full schedule
            and venues coming soon — RSVP for the info session to stay first in
            line.
          </p>
          <div className="tw-intro-actions">
            <a
              href={FLAGSHIP_PRODUCT.lumaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {RSVP_INFO_SESSION_CTA} <span className="arrow">→</span>
            </a>
            <a
              href={FLAGSHIP_PRODUCT.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-intro-secondary"
            >
              {EXPLORE_TECH_WEEK_CTA} <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </header>

      <PageCta
        title={
          <>
            RSVP for the <em>info session</em>
          </>
        }
        sub={FLAGSHIP_PRODUCT.closeSub}
        primaryHref={FLAGSHIP_PRODUCT.lumaHref}
        primaryLabel={RSVP_INFO_SESSION_CTA}
        primaryJoinGate={false}
        secondaryHref={FLAGSHIP_PRODUCT.href}
        secondaryLabel={EXPLORE_TECH_WEEK_CTA}
        secondaryExternal
      />

      <Footer />
    </>
  );
}
