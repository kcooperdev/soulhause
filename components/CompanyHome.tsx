"use client";

import { BrandLine } from "@/components/BrandLine";
import { BrandSpotlight } from "@/components/BrandSpotlight";
import { HeroInviteBar } from "@/components/HeroInviteBar";
import { brand } from "@/lib/brand";

export function CompanyHome() {
  return (
    <>
      <section className="landing-hero-stage" id="porch">
        <BrandSpotlight
          as="h1"
          id="landing-hero-title"
          className="landing-hero-brand"
          aria-label={brand.name}
          tabIndex={0}
        >
          <span className="brand-soul brand-sunflow">Soul</span>
          <span className="brand-hause brand-sunflow">Hause</span>
        </BrandSpotlight>
        <BrandLine />
      </section>
      <HeroInviteBar />
    </>
  );
}
