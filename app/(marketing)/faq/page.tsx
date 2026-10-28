import Link from "next/link";
import { faqs } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FAQ",
  description: "Answers about BMore Tech Scene: events, jobs, resources, and how listings work.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">FAQ</p>
        <h1>Questions.</h1>
        <p className="lede">Short answers about how this site works.</p>
      </header>
      <section className="panel" aria-labelledby="faq-title">
        <h2 id="faq-title" className="sr-only">
          Frequently asked questions
        </h2>
        {faqs.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
        <p>
          <Link href="/conduct">Code of conduct</Link>
          {" · "}
          <Link href="/privacy">Privacy Policy</Link>
        </p>
      </section>
    </div>
  );
}
