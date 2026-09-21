import Link from "next/link";
import { MarketingShell } from "@/components/MarketingShell";

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="landing-room landing-room--page">
        <p className="kicker">Lost</p>
        <h1 className="landing-room-title">This room isn’t here.</h1>
        <p className="landing-room-copy">The page you want is gone, or it never was.</p>
        <Link className="landing-hero-next" href="/">
          Back to TechFolx
        </Link>
      </section>
    </MarketingShell>
  );
}
