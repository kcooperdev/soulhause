import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { PageHero } from "../components/PageHero";
import { PageCta } from "../components/PageCta";
import { MEMBER_COUNT } from "../components/constants";

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
            <h2 className="h-section path-signature-head about-intro-head">
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

      <section className="sec sec-alt">
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
