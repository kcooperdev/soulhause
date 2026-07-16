import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import {
  JOIN_URL,
  FLAGSHIP_PRODUCT,
  MEMBER_COUNT,
  PATHWAY_PICKER,
  SOUL_BUILDERS_PRODUCT,
  PATHWAYS_SUMMARY,
  PRIMARY_CTA,
} from "../components/constants";
import { EventsIcon, CommunityIcon } from "../components/Icons";

export const metadata: Metadata = {
  title: "SoulHause Events | Talks, workshops, and happy hours",
  description: `Soul Sessions, Soul Workshops, Hause of Soul, Baltimore Tech Week, and the Soul Builders LinkedIn group. RSVP on Luma. Join ${MEMBER_COUNT} builders.`,
};

type FeatureProps = {
  cat: string;
  title: React.ReactNode;
  body: string;
  bullets: string[];
  icon: React.ReactNode;
  reverse?: boolean;
  badge?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

function Feature({
  cat,
  title,
  body,
  bullets,
  icon,
  reverse,
  badge,
  ctaHref = JOIN_URL,
  ctaLabel = PRIMARY_CTA,
}: FeatureProps) {
  const isExternal = ctaHref.startsWith("http");
  const isJoin = ctaHref === JOIN_URL;

  return (
    <article className={`feature${reverse ? " reverse" : ""}`}>
      <div>
        <span className="pillar-cat">{cat}</span>
        <h2 className="path-signature-head" style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>{title}</h2>
        <p>{body}</p>
        <ul>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <a
          className="btn btn-primary"
          href={ctaHref}
          {...(isJoin ? { "data-join-gate": true } : {})}
          {...(isExternal
            ? {
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {})}
        >
          {ctaLabel} <span className="arrow">→</span>
        </a>
      </div>
      <div className="feature-visual" style={{ color: "var(--house-green)" }}>
        <div className="feature-icon">{icon}</div>
        {badge ? <span className="feature-badge">{badge}</span> : null}
      </div>
    </article>
  );
}

export default function WhatWeOffer() {
  return (
    <>
      <Nav />

      <PageHero
        title={
          <>
            What&apos;s <em>live now.</em>
          </>
        }
        lede={PATHWAYS_SUMMARY}
      />

      <section className="sec">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <Feature
            cat="RSVP on Luma"
            title={<>Soul Sessions, Workshops, and Hause of Soul</>}
            body={PATHWAYS_SUMMARY}
            bullets={[
              "Soul Sessions: stories from people doing the work",
              "Soul Workshops: hands-on sessions with real output",
              `${PATHWAY_PICKER[2].label}: SoulHause's signature tech happy hour`,
              "RSVP on Luma. No membership required.",
            ]}
            icon={<EventsIcon />}
            badge="Live now"
            ctaHref={JOIN_URL}
            ctaLabel={PRIMARY_CTA}
          />

          <Feature
            cat="Built from SoulHause"
            title={<>{FLAGSHIP_PRODUCT.name}</>}
            reverse
            body={FLAGSHIP_PRODUCT.summary}
            bullets={[...FLAGSHIP_PRODUCT.highlights]}
            icon={<EventsIcon />}
            badge="SoulHause product"
            ctaHref={FLAGSHIP_PRODUCT.href}
            ctaLabel="Explore the week"
          />

          <Feature
            cat="Between events"
            title={<>{SOUL_BUILDERS_PRODUCT.name}</>}
            body={SOUL_BUILDERS_PRODUCT.description}
            bullets={[
              "Share resources, tools, and lessons with other builders",
              "Post wins and keep momentum between SoulHause events",
              "Build together in a LinkedIn group until the platform is ready",
              "Free to join. Part of the SoulHause community.",
            ]}
            icon={<CommunityIcon />}
            badge={SOUL_BUILDERS_PRODUCT.badge}
            ctaHref={SOUL_BUILDERS_PRODUCT.href}
            ctaLabel="Join on LinkedIn"
          />
        </div>
      </section>

      <PageCta
        title="Come through the door"
        sub={`Join ${MEMBER_COUNT} builders on Luma. RSVP to a pathway and show up in person.`}
        primaryLabel={PRIMARY_CTA}
        secondaryHref="/#pathways"
        secondaryLabel="See events"
      />

      <Footer />
    </>
  );
}
