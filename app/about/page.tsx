import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { BrandText } from "../components/BrandSpotlight";
import {
  ABOUT_STORY,
  BRAND_STORY,
  OS_PRODUCT,
} from "../components/constants";

export const metadata: Metadata = {
  title: "About SoulHause | tech for the soul",
  description:
    "SoulHause runs tech nights in Maryland and builds tools so builders can find each other and keep going.",
};

export default function About() {
  return (
    <div className="page-flow">
      <Nav />

      <PageHero
        title={ABOUT_STORY.title}
        lede={<BrandText text={ABOUT_STORY.lede} />}
      />

      <section className="sec sec-story">
        <div className="wrap story-grid">
          <article className="story-cell" data-reveal>
            <p className="eyebrow eyebrow--spaced">Soul</p>
            <h2 className="story-heading">Who it's for</h2>
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
            What we run
          </h2>
          <p className="lede together-lede">
            <BrandText text={BRAND_STORY.together} /> See it in{" "}
            <Link href="/sessions" className="inline-route">
              Sessions
            </Link>
            ,{" "}
            <Link href="/workshops" className="inline-route">
              Workshops
            </Link>
            ,{" "}
            <Link href="/hause-of-soul" className="inline-route">
              Hause of Soul
            </Link>
            , and soon inside{" "}
            <Link href="/os" className="inline-route">
              <BrandText text={OS_PRODUCT.name} />
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
