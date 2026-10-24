import type { Metadata } from "next";
import Link from "next/link";
import { EmailSignup } from "@/components/EmailSignup";
import { core } from "@/lib/content";
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

      <EmailSignup />

      <footer className="foot">
        <span>{core}</span>
        <Link href="/conduct">Code of conduct</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </footer>
    </div>
  );
}
