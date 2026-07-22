import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import {
  MEMBER_COUNT,
  PRIMARY_CTA,
  BRAND_STORY,
  EVENTS_ARM,
  HAUSE_OF_SOUL_LUMA_URL,
  FLAGSHIP_PRODUCT,
} from "../components/constants";

export const metadata: Metadata = {
  title: "About SoulHause | Cultural infrastructure for local impact",
  description:
    "SoulHause is a community and economic development technology company. We create year-round systems that help organizers, creators, and local businesses activate culture and grow their impact.",
};

export default function About() {
  return (
    <>
      <Nav />

      <PageHero
        title={
          <>
            A small house. <em>Lights on.</em>
          </>
        }
        lede={`SoulHause builds digital tools, cultural infrastructure, and ecosystem platforms for local communities and small businesses. ${MEMBER_COUNT} people strong.`}
      />

      <section className="sec sec-story">
        <div className="wrap story-grid">
          <article className="story-cell" data-reveal>
            <p className="eyebrow eyebrow--spaced">Soul</p>
            <h2 className="story-heading">The passion behind the work</h2>
            <p className="story-body">{BRAND_STORY.soul}</p>
          </article>
          <article
            className="story-cell story-cell--offset"
            data-reveal
            style={{ ["--reveal-delay" as string]: "60ms" }}
          >
            <p className="eyebrow eyebrow--spaced">Hause</p>
            <h2 className="story-heading">A place where people belong</h2>
            <p className="story-body">{BRAND_STORY.hause}</p>
          </article>
        </div>
      </section>

      <section className="sec sec-together">
        <div className="wrap together-block" data-reveal>
          <h2 className="h-section">
            Year-round <em>systems.</em>
          </h2>
          <p className="lede together-lede">{BRAND_STORY.together}</p>
          <p className="together-note">
            {FLAGSHIP_PRODUCT.name} is our five-day citywide flagship. SoulHause
            OS is coming soon.
          </p>
        </div>
      </section>

      <section className="sec sec-events-about" id="events">
        <div className="wrap together-block" data-reveal>
          <h2 className="h-section">
            SoulHause <em>Events</em>
          </h2>
          <p className="lede together-lede">
            {EVENTS_ARM.summary} Three formats: Soul Sessions, Soul Workshops,
            and Hause of Soul.
          </p>
        </div>
      </section>

      <PageCta
        title={
          <>
            Come through the <em>door</em>
          </>
        }
        sub={`Hause of Soul · one night in SoulHause Events. Join ${MEMBER_COUNT} on Luma.`}
        primaryHref={HAUSE_OF_SOUL_LUMA_URL}
        primaryLabel={PRIMARY_CTA}
      />

      <Footer />
    </>
  );
}
