import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { BrandSpotlight, BrandText } from "../components/BrandSpotlight";
import {
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

      <section className="sec sec-os-access" aria-labelledby="os-access-title">
        <div className="wrap os-access" data-reveal>
          <div className="os-access-intro">
            <p className="eyebrow eyebrow--spaced">Member access</p>
            <h2 id="os-access-title" className="os-access-title">
              What members get
            </h2>
            <p className="lede os-access-lede">
              VIP nights, city perks, member rooms. Built for Baltimore social
              tech, not another feed.
            </p>
            <ul className="os-access-chips" aria-label="Member perks at a glance">
              {OS_ACCESS.map((item) => (
                <li key={item.chip}>{item.chip}</li>
              ))}
            </ul>
          </div>
          <ol className="os-access-list">
            {OS_ACCESS.map((item, index) => (
              <li key={item.title} className="os-access-item">
                <span className="os-access-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="os-access-copy">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec-close">
        <div className="wrap close-inner" data-reveal>
          <BrandSpotlight as="p" className="close-brand" aria-label="SoulHause" quiet>
            <span className="brand-soul brand-sunflow brand-sunflow--quiet">Soul</span>
            <span className="brand-hause brand-sunflow brand-sunflow--quiet">Hause</span>
          </BrandSpotlight>
          <h2 className="close-title">
            Be first when <em>OS</em> launches
          </h2>
          <p className="close-sub">
            <BrandText text={OS_PRODUCT.closeSub} />
          </p>
          <a href={OS_PRODUCT.notifyHref} className="btn btn-primary">
            {NOTIFY_ME_CTA} <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
