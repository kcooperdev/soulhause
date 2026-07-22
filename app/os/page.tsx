import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { BrandSpotlight, BrandText } from "../components/BrandSpotlight";
import {
  EXPLORE_EVENTS_CTA,
  NOTIFY_ME_CTA,
  OS_ACCESS,
  OS_PRODUCT,
} from "../components/constants";

export const metadata: Metadata = {
  title: "SoulHause OS | Coming soon",
  description: OS_PRODUCT.lede,
};

export default function OsPage() {
  return (
    <>
      <Nav />
      <PageHero
        eyebrow={OS_PRODUCT.eyebrow}
        title={
          <>
            <BrandText text="SoulHause OS" />
          </>
        }
        lede={<BrandText text={OS_PRODUCT.lede} />}
      >
        <div className="page-hero-actions">
          <a href={OS_PRODUCT.notifyHref} className="btn btn-primary">
            {NOTIFY_ME_CTA} <span className="arrow">→</span>
          </a>
          <Link href="/events" className="page-hero-secondary">
            {EXPLORE_EVENTS_CTA} <span className="arrow">→</span>
          </Link>
        </div>
      </PageHero>

      <section className="sec sec-os-body">
        <div className="wrap os-layout" data-reveal>
          <h2 className="h-section os-promise">
            <BrandText text={OS_PRODUCT.promise} />
          </h2>
          <p className="lede os-body">
            <BrandText text={OS_PRODUCT.body} />
          </p>
          <div className="os-links">
            <Link href="/events" className="os-link">
              <BrandText text="SoulHause Events" />{" "}
              <span className="arrow">→</span>
            </Link>
            <Link href="/about" className="os-link">
              About the company <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="sec sec-pillars-open" aria-labelledby="os-access-title">
        <div className="wrap" data-reveal>
          <h2 id="os-access-title" className="h-section">
            What members get
          </h2>
          <p className="lede os-body">
            Concrete access for people building in Baltimore social tech, not
            another feed to scroll.
          </p>
          <div className="pillar-rail">
            {OS_ACCESS.map((item) => (
              <div key={item.title} className="pillar-row">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-close">
        <div className="wrap close-inner" data-reveal>
          <BrandSpotlight as="p" className="close-brand" aria-label="SoulHause" quiet>
            <span className="brand-soul brand-sunflow brand-sunflow--quiet">Soul</span>
            <span className="brand-hause brand-sunflow brand-sunflow--quiet">Hause</span>
          </BrandSpotlight>
          <h2 className="close-title">
            Be first when the <em>door</em> opens
          </h2>
          <p className="close-sub">
            <BrandText text={OS_PRODUCT.closeSub} />
          </p>
          <a href={OS_PRODUCT.notifyHref} className="btn btn-primary">
            {NOTIFY_ME_CTA} <span className="arrow">→</span>
          </a>
          <Link href="/events" className="close-secondary">
            <BrandText text="SoulHause Events" /> <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
