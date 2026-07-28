import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { PathwayHashScroll } from "../components/PathwayNav";
import { EventsFormats } from "../components/EventsFormats";
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
  title: "Soul Events by SoulHause | Sessions, Workshops, Hause of Soul",
  description: EVENTS_ARM.summary,
};

const FORMATS = PATHWAY_PICKER.map((pathway, index) => ({
  id: pathway.id,
  label: pathway.shortLabel,
  format: pathway.format,
  metal: pathway.metal,
  body: PATHWAY_OFFERS[index].body,
  index: index + 1,
  stub: pathway.stub,
}));

export default function EventsPage() {
  return (
    <>
      <Nav />
      <PathwayHashScroll />
      <PageHero
        eyebrow="Events by SoulHause"
        title={
          <>
            Soul <em>Events</em>
          </>
        }
        lede={<BrandText text={EVENTS_ARM.summary} />}
      >
        <div className="page-hero-actions">
          <a
            href={NEXT_EVENT.rsvpUrl}
            data-join-gate
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {PRIMARY_CTA} <span className="arrow">→</span>
          </a>
          <p className="page-hero-next">
            Next: {NEXT_EVENT.shortTitle} · {NEXT_EVENT.shortDate}
          </p>
        </div>
      </PageHero>

      <section className="sec sec-events-lineup" id="formats">
        <div className="wrap">
          <EventsFormats formats={FORMATS} />
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
            {NEXT_EVENT.date}. Tech happy hour. {MEMBER_COUNT} on Luma.
          </>
        }
        primaryHref={HAUSE_OF_SOUL_LUMA_URL}
        primaryLabel={PRIMARY_CTA}
      />

      <Footer />
    </>
  );
}
