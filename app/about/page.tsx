import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { BrandText } from "../components/BrandSpotlight";
import {
  ABOUT_STORY,
  BRAND_STORY,
  FLAGSHIP_PRODUCT,
  HAUSE_OF_SOUL_LUMA_URL,
  MEMBER_COUNT,
  OS_PRODUCT,
  PRIMARY_CTA,
} from "../components/constants";

export const metadata: Metadata = {
  title: "About SoulHause | tech for the soul",
  description:
    "SoulHause builds digital tools and citywide programs for organizers, creators, and local businesses.",
};

export default function About() {
  return (
    <>
      <Nav />

      <PageHero
        title={ABOUT_STORY.title}
        lede={<BrandText text={ABOUT_STORY.lede} />}
      />

      <section className="sec sec-story">
        <div className="wrap story-grid">
          <article className="story-cell" data-reveal>
            <p className="eyebrow eyebrow--spaced">Soul</p>
            <h2 className="story-heading">Why we build</h2>
            <p className="story-body">{BRAND_STORY.soul}</p>
          </article>
          <article
            className="story-cell story-cell--offset"
            data-reveal
            style={{ ["--reveal-delay" as string]: "60ms" }}
          >
            <p className="eyebrow eyebrow--spaced">Hause</p>
            <h2 className="story-heading">What Hause means</h2>
            <p className="story-body">{BRAND_STORY.hause}</p>
          </article>
        </div>
      </section>

      <section className="sec sec-together">
        <div className="wrap together-block" data-reveal>
          <h2 className="h-section">
            The work, <em>year-round</em>
          </h2>
          <p className="lede together-lede">
            <BrandText text={BRAND_STORY.together} /> See it in{" "}
            <Link href="/events" className="inline-route">
              <BrandText text="SoulHause Events" />
            </Link>
            , across{" "}
            <Link href="/tech-week" className="inline-route">
              {FLAGSHIP_PRODUCT.name}
            </Link>
            , and soon inside{" "}
            <Link href="/os" className="inline-route">
              <BrandText text={OS_PRODUCT.name} />
            </Link>
            .
          </p>
        </div>
      </section>

      <PageCta
        title={
          <>
            RSVP for <em>Hause of Soul</em>
          </>
        }
        sub={
          <BrandText
            text={`Tech happy hour · Sep 17. Join ${MEMBER_COUNT} on Luma.`}
          />
        }
        primaryHref={HAUSE_OF_SOUL_LUMA_URL}
        primaryLabel={PRIMARY_CTA}
      />

      <Footer />
    </>
  );
}
