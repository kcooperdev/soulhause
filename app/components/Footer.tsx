import Link from "next/link";
import { BrandLink } from "./BrandLink";
import {
  CONTACT_EMAIL,
  SITE_TAGLINE,
} from "./constants";
import { pathwayHref } from "./pathway-nav";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <BrandLink variant="footer" />
            <p className="footer-tagline">{SITE_TAGLINE}</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-label">Explore</p>
            <ul>
              <li>
                <Link href={pathwayHref("pathways")}>Events</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/#flagship">Tech Week</Link>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© {new Date().getFullYear()} SoulHause</p>
        </div>
      </div>
    </footer>
  );
}
