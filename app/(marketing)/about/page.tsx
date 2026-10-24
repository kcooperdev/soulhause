import Link from "next/link";
import { brand } from "@/lib/brand";
import { core, faqs } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "BMore Tech Nights is a Baltimore tech mixer founded in 2026 for 1200+ professionals. General admission is free.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">About</p>
        <h1>A mixer first.</h1>
        <p className="lede">{core}</p>
      </header>
      <section className="panel prose">
        <h2>Who it’s for</h2>
        <p>
          We welcome people across technology, business, creative work, and tech-adjacent fields. You don’t need a certain title to belong in the room.
        </p>
        <h2>Why connection comes first</h2>
        <p>
          The reason to come is other people. Experiential learning, immersive technology, and experience design are how we make that social time feel different. They are not a class, a conference, a career fair, or a workshop series.
        </p>
        <h2>The year</h2>
        <p>
          We are based in Baltimore. BMore Tech Nights was founded in 2026, and 1200+ professionals are part of this community. We plan six events a year. General admission is always free. Dates are on the calendar.
        </p>
        <div className="actions">
          <Link className="btn green" href="/partner">
            Community Partner
          </Link>
          <Link className="btn white" href="/sponsor">
            Sponsor
          </Link>
          <Link className="btn coral" href="/vend">
            Vend
          </Link>
          <a className="btn" href={brand.calendar}>
            See the Calendar
          </a>
        </div>
        <p>
          <Link href="/conduct">Code of conduct</Link>
          {" · "}
          <Link href="/privacy">Privacy Policy</Link>
        </p>
      </section>
      <section className="panel" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions</h2>
        {faqs.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
