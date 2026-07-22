import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { PathwayHashScroll } from "../components/PathwayNav";
import { PathwayTabs } from "../components/PathwayTabs";
import { BrandText } from "../components/BrandSpotlight";
import {
  EVENTS_ARM,
  HAUSE_OF_SOUL_LUMA_URL,
  MEMBER_COUNT,
  NEXT_EVENT,
  PATHWAY_OFFERS,
  PATHWAY_PICKER,
  PRIMARY_CTA,
} from "../components/constants";

export const metadata: Metadata = {
  title: "SoulHause Events | Sessions, Workshops, Hause of Soul",
  description: EVENTS_ARM.summary,
};

const PATHWAYS = PATHWAY_PICKER.map((pathway, index) => ({
  id: pathway.id,
  label: pathway.shortLabel,
  format: pathway.format,
  metal: pathway.metal,
  body: PATHWAY_OFFERS[index].body,
  index: index + 1,
}));

export default function EventsPage() {
  return (
    <>
      <Nav />
      <PathwayHashScroll />
      <PageHero
        eyebrow="Events"
        title={
          <>
            <BrandText text="SoulHause" /> <em>Events</em>
          </>
        }
        lede={<BrandText text={EVENTS_ARM.summary} />}
      >
        <p className="page-hero-next">
          Next up: {NEXT_EVENT.shortTitle} · {NEXT_EVENT.shortDate} ·{" "}
          <a
            href={NEXT_EVENT.rsvpUrl}
            data-join-gate
            target="_blank"
            rel="noopener noreferrer"
            className="page-hero-next-link"
          >
            RSVP <span className="arrow">→</span>
          </a>
        </p>
      </PageHero>

      <section className="sec sec-pathways" id="formats">
        <div className="wrap">
          <div className="pathways-head" data-reveal>
            <h2 className="h-section">
              Three formats. <em>One house.</em>
            </h2>
            <p className="lede">{EVENTS_ARM.together}</p>
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            <PathwayTabs pathways={PATHWAYS} />
          </div>
        </div>
      </section>

      <PageCta
        title={
          <>
            Next up: <em>{NEXT_EVENT.shortTitle}</em>
          </>
        }
        sub={
          <>
            {NEXT_EVENT.date}. Our signature tech happy hour. Join{" "}
            {MEMBER_COUNT} on Luma.
          </>
        }
        primaryHref={HAUSE_OF_SOUL_LUMA_URL}
        primaryLabel={PRIMARY_CTA}
      />

      <Footer />
    </>
  );
}
