import type { Metadata } from "next";
import Link from "next/link";
import { EmailSignup } from "@/components/EmailSignup";
import { NextNight } from "@/components/NextNight";
import { brand } from "@/lib/brand";
import { core, nextNight } from "@/lib/content";

export const metadata: Metadata = {
  title: `${brand.name} · Tech mixer`,
  description: brand.position,
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
    copy: "A vendor spot is $50 per event.",
  },
  {
    href: "/sponsor",
    tone: "#17a85a",
    title: "Sponsor",
    copy: "Support one night, or three or six.",
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
          <span>12K+ professionals</span>
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
