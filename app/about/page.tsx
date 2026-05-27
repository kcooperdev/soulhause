import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Stamp } from "../components/Motifs";
import { JOIN_URL } from "../components/constants";

const VALUES = [
  {
    title: "Build, don't just talk.",
    body: "Cohorts, workshops, and pitch nights push members to make something real — not stay in chat forever.",
  },
  {
    title: "Show up for each other.",
    body: "Community is a verb. We celebrate wins, give feedback, and answer questions — actually.",
  },
  {
    title: "Quality over noise.",
    body: "Curated resources, focused channels, and conversations that actually move you forward.",
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

      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">§ Index · About</span>
          <h1>
            A small house. <em>Lights on.</em>
          </h1>
          <p className="lede">
            SoulHause is a modern, creative, tech-forward community where
            people learn, build, and grow through events, cohorts, and shared
            resources.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="about-grid">
            <div>
              <div className="sec-head-meta" style={{ marginBottom: 18 }}>
                <span>§ 01</span>
                <span>Our Mission</span>
              </div>
              <h2 className="h-section" style={{ marginBottom: 18 }}>
                Make tech and creativity <em>feel like home.</em>
              </h2>
              <p className="text-muted" style={{ fontSize: 17 }}>
                Most tech communities feel either too transactional or too
                quiet. SoulHause is built to feel like a warm, modern space —
                one where you can ask the dumb question, meet the right
                people, and ship the thing you&apos;ve been putting off.
              </p>
              <p className="text-muted" style={{ fontSize: 17, marginTop: 14 }}>
                We bring together events, cohorts, and a real resource library
                so that whether you&apos;re curious for the first time or ten
                years deep, there&apos;s always a next step for you.
              </p>
            </div>

            <div>
              <div className="sec-head-meta" style={{ marginBottom: 18 }}>
                <span>§ 02</span>
                <span>Our Story</span>
              </div>
              <h2 className="h-section" style={{ marginBottom: 18 }}>
                Started by builders, <em>for builders.</em>
              </h2>
              <p className="text-muted" style={{ fontSize: 17 }}>
                SoulHause started from a simple observation: people learn
                faster, build better, and stay more consistent when they&apos;re
                in a real community — not just another Slack or Discord.
              </p>
              <p className="text-muted" style={{ fontSize: 17, marginTop: 14 }}>
                We wanted to combine the energy of a great IRL meetup with the
                support of a well-run online community and the structure of a
                guided program. SoulHause is that home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="sec-head-meta">
                <span>§ 03</span>
                <span>What we stand for</span>
              </div>
              <h2 className="h-section" style={{ marginTop: 16 }}>
                Values that <em>shape this place.</em>
              </h2>
            </div>
            <div>
              <p className="lede">
                Four ideas guide everything from how we run events to how
                channels feel inside.
              </p>
            </div>
          </div>

          <div className="values">
            {VALUES.map((v, i) => (
              <article key={v.title} className="about-card">
                <div className="sec-head-meta" style={{ marginBottom: 14 }}>
                  <span>§ {String(i + 1).padStart(2, "0")}</span>
                  <span>Value</span>
                </div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-strip">
            <Stamp variant="sand">
              ★<br />Come<br />build
            </Stamp>
            <h2>Come <em>build with us.</em></h2>
            <p>Join the SoulHause community — the door is open.</p>
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
