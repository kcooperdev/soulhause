import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { JOIN_URL, MEMBERSHIP_LAUNCH } from "../components/constants";
import {
  EventsIcon,
  CohortIcon,
  ResourcesIcon,
  CommunityIcon,
} from "../components/Icons";
import { Stamp } from "../components/Motifs";

type FeatureProps = {
  cat: string;
  title: React.ReactNode;
  body: string;
  bullets: string[];
  icon: React.ReactNode;
  reverse?: boolean;
  stamp?: string;
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
  stamp,
  ctaHref = JOIN_URL,
  ctaLabel = "Join waitlist",
}: FeatureProps) {
  const isExternal = ctaHref.startsWith("http");

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
          {...(isExternal
            ? {
                "data-join-gate": true,
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
        {stamp ? (
          <Stamp variant="sand">
            ★<br />
            {stamp.split("\n").map((line, i) => (
              <span key={line}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </Stamp>
        ) : null}
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
            Events today. <em>Platform tomorrow.</em>
          </>
        }
        lede={`Soul Sessions, Soul Labs, and Soul Tech are live now. Developer tools, cohorts, and the full resource library launch with membership in ${MEMBERSHIP_LAUNCH}.`}
      />

      <section className="sec">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <Feature
            cat="Live now"
            title={<>Soul Sessions, Labs, and Tech</>}
            body="Talks, workshops, and mixers for builders who want to learn, ship, and connect. This is the heart of SoulHause today."
            bullets={[
              "Soul Sessions: stories from people doing the work",
              "Soul Labs: hands-on workshops with real output",
              "Soul Tech: mixers where collaborations start",
              "RSVP on Luma and show up in person or online",
            ]}
            icon={<EventsIcon />}
            stamp={"Live\nnow"}
            ctaHref="/#pathways"
            ctaLabel="See events"
          />

          <Feature
            cat="Coming soon"
            title={<>Developer platform</>}
            body="SDKs, APIs, hosting, and automation for developers shipping real products. Civic and business tools for scheduling, payments, and CRM."
            reverse
            bullets={[
              "SDKs, APIs, and serverless hosting",
              "Scheduling, payments, and lightweight CRM",
              "Builder profiles and skill-based matching",
              "Members get first access at launch",
            ]}
            icon={<CohortIcon />}
            stamp={"Dec\n2026"}
          />

          <Feature
            cat="Coming soon"
            title={<>Cohorts and resource library</>}
            body="Guided 4–6 week project cycles, templates, guides, and roadmaps curated for SoulHause members and updated continuously."
            bullets={[
              "Small groups with weekly check-ins",
              "Build real, shippable projects",
              "Demo day at the end of every cycle",
              "200+ guides, templates, and roadmaps",
            ]}
            icon={<ResourcesIcon />}
            stamp={"Members\nfirst"}
          />

          <Feature
            cat="Growing now"
            title={<>A community that shows up</>}
            body="Channels organized by interest, accountability pods, and a supportive environment where progress is celebrated and questions are welcome."
            reverse
            bullets={[
              "Channels by topic, skill, and project",
              "Accountability groups to keep you moving",
              "Supportive, low-noise environment",
              "Direct access to other members",
            ]}
            icon={<CommunityIcon />}
            stamp={"1,100+\nmembers"}
          />
        </div>
      </section>

      <PageCta
        title="Want in before launch?"
        sub="Join the waitlist for membership, or RSVP to an event and show up today."
        primaryLabel="Join waitlist"
        secondaryHref="/#pathways"
        secondaryLabel="See events"
      />

      <Footer />
    </>
  );
}
