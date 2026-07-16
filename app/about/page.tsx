import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import {
  MEMBER_COUNT,
  PATHWAYS_VS_BUILDERS,
  PRIMARY_CTA,
  BRAND_STORY,
  BRAND_PILLARS,
} from "../components/constants";

export const metadata: Metadata = {
  title: "About SoulHause | A tech community that feels like home",
  description: `Soul is passion. Hause is home. SoulHause is a grassroots builder community with ${MEMBER_COUNT} members.`,
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
        lede={`${MEMBER_COUNT} builders at talks, workshops, and happy hours. ${BRAND_STORY.together}`}
      />

      <section className="sec">
        <div className="wrap">
          <div className="about-intro">
            <h2 className="h-section path-signature-head about-intro-head">
              Soul + Hause = <em>home for builders.</em>
            </h2>
            <p className="about-copy">{BRAND_STORY.soul}</p>
            <p className="about-copy">{BRAND_STORY.hause}</p>
            <p className="about-copy">
              We run our own events: Soul Sessions, Soul Workshops, and Hause of Soul.
              Baltimore Tech Week and the Soul Builders LinkedIn group grow from the same house when the
              community is ready for more. {PATHWAYS_VS_BUILDERS}
            </p>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow eyebrow--spaced">Grassroots pillars</p>
              <h2 className="h-section path-signature-head">
                What we&apos;re <em>building.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                A grassroots ecosystem. Not a platform pitch. A place people actually want to show up.
              </p>
            </div>
          </div>

          <div className="values">
            {BRAND_PILLARS.map((v) => (
              <article key={v.title} className="about-card">
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title="Come through the door"
        sub={`Join ${MEMBER_COUNT} builders on Luma. RSVP to a talk, workshop, or happy hour.`}
        primaryLabel={PRIMARY_CTA}
        secondaryHref="/#pathways"
        secondaryLabel="See events"
      />

      <Footer />
    </>
  );
}
