import Link from "next/link";
import { BrandLink } from "./BrandLink";
import { JOIN_URL, CONTACT_EMAIL, MEMBERSHIP_LAUNCH, NEXT_EVENT } from "./constants";
import { pathwayHref } from "./pathway-nav";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-main">
          <BrandLink variant="footer" />
          <p className="footer-tagline">
            An ecosystem of events, community, and tools for builders everywhere.
          </p>
          <nav className="footer-links" aria-label="Footer">
            <Link href={pathwayHref("pathways")}>Pathways</Link>
            <Link href="/what-we-offer">Platform</Link>
            <Link href="/about">About</Link>
            <Link href="/membership">Membership</Link>
            <Link href="/contact">Contact</Link>
            <a href={JOIN_URL} data-join-gate target="_blank" rel="noopener noreferrer">Join</a>
          </nav>
          <p className="footer-email">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} SoulHause. {NEXT_EVENT.title} · {NEXT_EVENT.date}. Membership · {MEMBERSHIP_LAUNCH}.
          </span>
        </div>
      </div>
    </footer>
  );
}
