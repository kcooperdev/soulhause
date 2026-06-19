import Image from "next/image";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import {
  EVENTS_HOSTED,
  FOUNDED_YEAR,
  FOUNDER,
  JOIN_URL,
  MEMBER_COUNT,
} from "../components/constants";

const VALUES = [
  {
    title: "Build, don't just talk.",
    body: "Workshops, cohorts, and pitch nights push members to make something real, not stay in chat forever.",
  },
  {
    title: "Show up for each other.",
    body: "Community is a verb. We celebrate wins, give feedback, and answer questions, actually.",
  },
  {
    title: "Quality over noise.",
    body: "Curated resources, focused channels, and conversations that move you forward.",
  },
  {
    title: "Open door, high standards.",
    body: "Anyone curious is welcome. We pair that openness with care for the experience inside.",
  },
];

const FOUNDER_STORY = FOUNDER.story.map((paragraph) =>
  paragraph.replace("{MEMBER_COUNT}", MEMBER_COUNT)
);

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
        lede={`SoulHause is a tech company and builder community for talks, workshops, and mixers. ${MEMBER_COUNT} members strong. Events are live today.`}
      />

      <section className="sec">
        <div className="wrap">
          <div className="about-intro">
            <h2 className="h-section path-signature-head" style={{ marginBottom: 18, fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              Make tech and creativity <em>feel like home.</em>
            </h2>
            <p className="about-copy">
              Most tech communities feel either too transactional or too quiet.
              SoulHause is built to feel like a warm, modern space where you can
              learn out loud, meet the right people, and ship the thing
              you&apos;ve been putting off.
            </p>
            <p className="about-copy">
              We bring together events, cohorts, and a growing resource library so
              that whether you&apos;re curious for the first time or ten years deep,
              there&apos;s always a next step for you.
            </p>
          </div>
        </div>
      </section>

      <section className="sec sec-alt" id="founder">
        <div className="wrap founder-block">
          <div className="founder-photo">
            <Image
              src="/founder.jpeg"
              alt={`${FOUNDER.name}, ${FOUNDER.role} of SoulHause`}
              width={480}
              height={480}
              className="founder-photo-img"
              priority
            />
            <ul className="founder-highlights">
              {FOUNDER.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="founder-copy">
            <p className="founder-eyebrow">Meet the founder</p>
            <h2 className="h-section path-signature-head founder-title">
              {FOUNDER.name}
            </h2>
            <p className="founder-role">
              {FOUNDER.role}, SoulHause · {FOUNDER.credentials}
            </p>

            <blockquote className="founder-quote">
              <p>{FOUNDER.pullQuote}</p>
            </blockquote>

            {FOUNDER_STORY.map((paragraph) => (
              <p key={paragraph.slice(0, 28)} className="about-copy">
                {paragraph}
              </p>
            ))}

            <div className="founder-proof">
              <div className="founder-proof-stat">
                <span className="founder-proof-num">{MEMBER_COUNT}</span>
                <span className="founder-proof-lbl">Members</span>
              </div>
              <div className="founder-proof-stat">
                <span className="founder-proof-num">{EVENTS_HOSTED}</span>
                <span className="founder-proof-lbl">Events</span>
              </div>
              <div className="founder-proof-stat">
                <span className="founder-proof-num">{FOUNDED_YEAR}</span>
                <span className="founder-proof-lbl">Founded</span>
              </div>
            </div>

            <div className="founder-ctas">
              <a
                href={JOIN_URL}
                data-join-gate
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Join the community <span className="arrow">→</span>
              </a>
              <Link href="/#pathways" className="btn btn-ghost">
                See events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 className="h-section path-signature-head">
                Values that <em>shape this place.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                Four ideas guide everything from how we run events to how channels
                feel inside.
              </p>
            </div>
          </div>

          <div className="values">
            {VALUES.map((v) => (
              <article key={v.title} className="about-card">
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title="Ready to show up?"
        sub={`Join ${MEMBER_COUNT} builders at talks, workshops, and mixers.`}
        secondaryHref="/#pathways"
        secondaryLabel="See events"
      />

      <Footer />
    </>
  );
}
