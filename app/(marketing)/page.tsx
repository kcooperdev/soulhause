import type { Metadata } from "next";
import Link from "next/link";
import { core } from "@/lib/content";
import { homeDescription, homeTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BMore Tech Scene",
    title: homeTitle,
    description: homeDescription,
    url: "/",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "BMore Tech Scene logo" }],
  },
  twitter: {
    card: "summary",
    title: homeTitle,
    description: homeDescription,
    images: ["/icon-512.png"],
  },
};

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <p className="kicker">BMore Tech Scene</p>
        <h1>Events. Jobs. Resources.</h1>
        <p className="lede">
          One stop for the tech community: events to attend, and resources to learn AI, cybersecurity, and more.
        </p>
        <div className="pills">
          <span>Events</span>
          <span>Jobs</span>
          <span>Resources</span>
        </div>
        <div className="actions">
          <Link className="btn blue" href="/events">
            See events
          </Link>
          <Link className="btn green" href="/jobs">
            Browse jobs
          </Link>
          <Link className="btn coral" href="/resources">
            Find resources
          </Link>
          <Link className="btn white" href="/events/submit">
            Submit an event
          </Link>
        </div>
      </section>

      <footer className="foot">
        <span>{core}</span>
        <Link href="/conduct">Code of conduct</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </footer>
    </div>
  );
}
