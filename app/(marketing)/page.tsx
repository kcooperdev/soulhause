import type { Metadata } from "next";
import Link from "next/link";
import { EmailSignup } from "@/components/EmailSignup";
import { NextNight } from "@/components/NextNight";
import { core, nextNight } from "@/lib/content";
import { homeDescription, homeTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BMore Tech Nights",
    title: homeTitle,
    description: homeDescription,
    url: "/",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "BMore Tech Nights logo" }],
  },
  twitter: {
    card: "summary",
    title: homeTitle,
    description: homeDescription,
    images: ["/icon-512.png"],
  },
};

const start = [
  {
    href: nextNight.registrationUrl,
    external: true,
    tone: "#ff4d3a",
    title: "Subscribe",
    copy: "The Offer is November 4 at 6pm.",
  },
  {
    href: "/jobs",
    external: false,
    tone: "#17a85a",
    title: "Jobs",
    copy: "Roles from the Baltimore tech community.",
  },
  {
    href: "/resources",
    external: false,
    tone: "#2f6bff",
    title: "Resources",
    copy: "Local tech help, and the organizations that provide it.",
  },
];

const takePart = [
  {
    href: "/partner",
    tone: "#ffe14a",
    title: "Community Partner",
    copy: "Free for groups that already bring people together.",
  },
  {
    href: "/vend",
    tone: "#ff4d3a",
    title: "Vend",
    copy: "Sign up yourself. $50 per event.",
  },
  {
    href: "/sponsor",
    tone: "#17a85a",
    title: "Sponsor",
    copy: "Sign a package yourself. From $300.",
  },
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <p className="kicker">BMore Tech Nights</p>
        <h1>Meet people. Experience tech. Make connections.</h1>
        <p className="lede">
          Connect with professionals across tech, business, and creative fields in a social setting shaped by hands-on activities and immersive experiences.
        </p>
        <div className="pills">
          <span>Based in Baltimore</span>
          <span>Founded in 2026</span>
          <span>1200+ professionals</span>
        </div>
      </section>

      <NextNight />

      <section className="grid-3" aria-label="Start here">
        {start.map((item) =>
          item.external ? (
            <a className="card quiet path" href={item.href} key={item.title} style={{ ["--tone" as string]: item.tone }}>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </a>
          ) : (
            <Link className="card quiet path" href={item.href} key={item.title} style={{ ["--tone" as string]: item.tone }}>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </Link>
          ),
        )}
      </section>

      <section className="grid-3" aria-label="Taking part">
        {takePart.map((item) => (
          <Link className="card quiet path" href={item.href} key={item.title} style={{ ["--tone" as string]: item.tone }}>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </Link>
        ))}
      </section>

      <EmailSignup />

      <footer className="foot">
        <span>{core}</span>
        <Link href="/conduct">Code of conduct</Link>
        <Link href="/privacy">Privacy</Link>
      </footer>
    </div>
  );
}
