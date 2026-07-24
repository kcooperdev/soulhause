import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { BrandSpotlight, BrandText } from "../components/BrandSpotlight";
import { StudioShelf } from "../components/StudioShelf";
import { NOTIFY_ME_CTA, STUDIO_PRODUCT } from "../components/constants";

export const metadata: Metadata = {
  title: "SoulHause Studio | Apps & tools",
  description: STUDIO_PRODUCT.lede,
};

export default function StudioPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow={STUDIO_PRODUCT.eyebrow}
        title={
          <>
            <BrandText text="SoulHause" /> Studio
          </>
        }
        lede={<BrandText text={STUDIO_PRODUCT.lede} />}
      />

      <StudioShelf />

      <section className="sec-close">
        <div className="wrap close-inner" data-reveal>
          <BrandSpotlight as="p" className="close-brand" aria-label="SoulHause" quiet>
            <span className="brand-soul brand-sunflow brand-sunflow--quiet">Soul</span>
            <span className="brand-hause brand-sunflow brand-sunflow--quiet">Hause</span>
          </BrandSpotlight>
          <h2 className="close-title">{STUDIO_PRODUCT.closeTitle}</h2>
          <p className="close-sub">
            <BrandText text={STUDIO_PRODUCT.closeSub} />
          </p>
          <a href={STUDIO_PRODUCT.notifyHref} className="studio-close-link">
            {NOTIFY_ME_CTA} <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
