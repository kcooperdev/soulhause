import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Stamp } from "../components/Motifs";
import { JOIN_URL } from "../components/constants";
import {
  EventsIcon,
  CohortIcon,
  ResourcesIcon,
  CommunityIcon,
} from "../components/Icons";

type FeatureProps = {
  num: string;
  cat: string;
  title: React.ReactNode;
  body: string;
  bullets: string[];
  icon: React.ReactNode;
  reverse?: boolean;
  stamp?: string;
};

function Feature({ num, cat, title, body, bullets, icon, reverse, stamp }: FeatureProps) {
  return (
    <article className={`feature${reverse ? " reverse" : ""}`}>
      <div>
        <div className="feature-meta">
          <span><strong>§ {num}</strong></span>
          <span>{cat}</span>
        </div>
        <h2>{title}</h2>
        <p>{body}</p>
        <ul>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <a
          className="btn btn-primary"
          href={JOIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join SoulHause <span className="arrow">→</span>
        </a>
      </div>
      <div className="feature-visual" style={{ color: "var(--oxblood)" }}>
        <div style={{ transform: "scale(3.4)" }}>{icon}</div>
        {stamp && (
          <Stamp>
            ★<br />{stamp}
          </Stamp>
        )}
      </div>
    </article>
  );
}

export default function WhatWeOffer() {
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">§ Index · What We Offer</span>
          <h1>
            Everything you need to learn, <em>build,</em> and ship.
          </h1>
          <p className="lede">
            Four pillars: events to meet people, cohorts to build with them, a
            resource library you can pull from, and a community that has your
            back.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <Feature
            num="01"
            cat="Events"
            title={<>Events that <em>bring builders</em> together.</>}
            body="From casual mixers to hands-on workshops and virtual sessions, our events are designed to spark connections and skill-building moments."
            bullets={[
              "Mixers — meet creators and technologists in person",
              "Workshops — learn a skill, walk out with something built",
              "Virtual sessions — join from anywhere, replay anytime",
              "Demo Days — share what you've built with the community",
            ]}
            icon={<EventsIcon />}
            stamp={"Year\nround"}
          />

          <Feature
            num="02"
            cat="Cohorts"
            title={<>Guided cycles, <em>built with people.</em></>}
            body="Cohorts are 4–6 week structured cycles where you build a real project alongside a small group. End the cycle by demoing what you made."
            reverse
            bullets={[
              "4–6 week guided project cycles",
              "Build real, shippable projects",
              "Small groups, weekly check-ins",
              "Demo day at the end of every cycle",
            ]}
            icon={<CohortIcon />}
            stamp={"Demo\nday"}
          />

          <Feature
            num="03"
            cat="Resource Library"
            title={<>A growing library of <em>practical</em> resources.</>}
            body="Templates, guides, AI tools, and project roadmaps — curated for SoulHause members and updated continuously."
            bullets={[
              "Templates for projects and pitches",
              "Step-by-step guides on tools and workflows",
              "Curated AI tools and prompts",
              "Project roadmaps you can copy and adapt",
            ]}
            icon={<ResourcesIcon />}
            stamp={"Always\nopen"}
          />

          <Feature
            num="04"
            cat="Community"
            title={<>A community that <em>actually shows up.</em></>}
            body="Channels organized by interest, accountability pods, and a supportive environment where progress is celebrated and questions are welcome."
            reverse
            bullets={[
              "Channels by topic, skill, and project",
              "Accountability groups to keep you moving",
              "Supportive, low-noise environment",
              "Direct access to other members",
            ]}
            icon={<CommunityIcon />}
            stamp={"Members\nfirst"}
          />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-strip">
            <Stamp variant="sand">
              ★<br />Open
              <br />2026
            </Stamp>
            <h2>Want to see it <em>from the inside?</em></h2>
            <p>
              Join the free community or go straight to Pro — whichever fits
              you today.
            </p>
            <a
              className="btn btn-on-dark"
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join SoulHause <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
