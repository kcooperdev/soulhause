import Link from "next/link";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { MemberCard, Ticket, Stamp } from "./components/Motifs";
import { JOIN_URL } from "./components/constants";

function Hero() {
  return (
    <header className="hero">
      <div className="hero-inner">
        <div>
          <span className="eyebrow">★ The door is open</span>
          <h1 className="h-display">
            A home for tech,<br />
            creativity <em>&amp;</em><br />
            community.
          </h1>
          <p className="hero-sub">
            Learn, build, and grow through events, cohorts, and resources
            designed for modern creators and technologists. Free to join.
            Pro when you&apos;re ready.
          </p>
          <div className="hero-ctas">
            <a
              className="btn btn-primary"
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join SoulHause <span className="arrow">→</span>
            </a>
            <Link className="btn btn-ghost" href="/what-we-offer">
              See what&apos;s inside
            </Link>
          </div>
        </div>

        <div className="hero-collage">
          <MemberCard name="A. Builder" no="001" />
          <Ticket />
        </div>
      </div>
    </header>
  );
}

function WhatItIs() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="sec-head-meta">
              <span>§ 01</span>
              <span>What it is</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              A place to learn, <em>build,</em> and grow — together.
            </h2>
          </div>
          <div>
            <p className="lede">
              SoulHause is a modern community where people come together to
              learn new skills, build real projects, and grow through shared
              experiences. Whether you&apos;re exploring tech for the first time
              or leveling up your creative craft, SoulHause gives you the
              structure, support, and tools to stay consistent.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

type HighlightProps = {
  num: string;
  cat: string;
  title: string;
  body: string;
  href: string;
};

function Highlight({ num, cat, title, body, href }: HighlightProps) {
  return (
    <article className="numbered">
      <div className="numbered-head">
        <span className="numbered-num">§ {num}</span>
        <span className="numbered-cat">{cat}</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <Link href={href} className="numbered-cta">
        Learn more <span className="arrow">→</span>
      </Link>
    </article>
  );
}

function Highlights() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="sec-head-meta">
              <span>§ 02</span>
              <span>Three ways inside</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              Events. Cohorts. <em>Resources.</em>
            </h2>
          </div>
          <div>
            <p className="lede">
              Three things every member gets access to from day one. Light on
              hype, heavy on substance.
            </p>
          </div>
        </div>

        <div className="grid-3">
          <Highlight
            num="01"
            cat="Events"
            title="Mixers, workshops, and virtual sessions."
            body="Meet builders and learn from people doing the work. From low-key meetups to demo days, the calendar runs year-round."
            href="/what-we-offer"
          />
          <Highlight
            num="02"
            cat="Cohorts"
            title="4–6 week guided project cycles."
            body="Build something real with a small group. Weekly check-ins, a clear scope, and a demo at the end of every cycle."
            href="/what-we-offer"
          />
          <Highlight
            num="03"
            cat="Resources"
            title="A library you&rsquo;ll actually use."
            body="Templates, guides, AI tools, and project roadmaps — curated for SoulHause members and updated continuously."
            href="/what-we-offer"
          />
        </div>
      </div>
    </section>
  );
}

function MembershipPreview() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="sec-head-meta">
              <span>§ 03</span>
              <span>Membership</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 16 }}>
              Start free. <em>Go Pro</em> when you&apos;re ready.
            </h2>
          </div>
          <div>
            <p className="lede">
              Two simple tiers. Join the community at no cost, or unlock the
              full SoulHause experience with Pro — workshops, cohorts, pitch
              nights, and founder-only channels.
            </p>
          </div>
        </div>

        <div className="grid-2">
          <article className="tier">
            <div className="tier-head">
              <span>★ Tier · 01</span>
              <span>Free Community</span>
            </div>
            <h3>Free</h3>
            <p className="tier-blurb">
              A free way in. Browse public channels, RSVP to free online
              events, and sample the resource library.
            </p>
            <div className="tier-price">
              $0<small>/forever</small>
            </div>
            <ul className="tier-features">
              <li>Public community channels</li>
              <li>Free online events (RSVP)</li>
              <li>Monthly newsletter + member spotlights</li>
              <li>Preview of the resource library</li>
            </ul>
            <a
              className="btn btn-ghost tier-cta"
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Free <span className="arrow">→</span>
            </a>
          </article>

          <article className="tier pro">
            <div className="tier-head">
              <span>★ Tier · 02</span>
              <span>SoulHause Pro</span>
            </div>
            <h3>Pro</h3>
            <p className="tier-blurb">
              The full house. Workshops, cohorts, tech perks, in-person events,
              and Pro-only rooms — $25 a month.
            </p>
            <div className="tier-price">
              $25<small>/month</small>
            </div>
            <ul className="tier-features">
              <li>Tech perks — pooled AI credits + software discounts (Anthropic, Cursor, Linear, Notion, Vercel)</li>
              <li>Pro-only channels (founder-only, offers + comp, design crits, AI lab)</li>
              <li>All workshops included (live + recorded)</li>
              <li>Cohort access — 4–6 week project cycles</li>
              <li>In-person events at member pricing + Pro-only nights</li>
              <li>Pitch night + priority Demo Day slot</li>
              <li>Live Q&amp;As with senior engineers + founders</li>
              <li>Full resource library — 200+ guides, templates, roadmaps</li>
            </ul>
            <a
              className="btn btn-on-dark tier-cta"
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Pro <span className="arrow">→</span>
            </a>
          </article>
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link href="/membership" className="btn btn-ghost">
            View Membership details <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta-strip">
          <Stamp variant="sand">
            ★<br />Open
            <br />2026
          </Stamp>
          <h2>
            Ready to <em>walk in?</em>
          </h2>
          <p>
            Free to join. Upgrade to Pro any time. The door is open.
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
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <WhatItIs />
      <Highlights />
      <MembershipPreview />
      <CTA />
      <Footer />
    </>
  );
}
