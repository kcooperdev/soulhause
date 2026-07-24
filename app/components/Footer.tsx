import Link from "next/link";
import { BrandLink } from "./BrandLink";
import { BrandText } from "./BrandSpotlight";
import { CONTACT_EMAIL, SITE_TAGLINE } from "./constants";

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
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/tech-week">Tech Week</Link>
              </li>
              <li>
                <Link href="/studio">Studio</Link>
              </li>
              <li>
                <Link href="/os">OS</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <BrandText text="SoulHause" />
          </p>
        </div>
      </div>
    </footer>
  );
}
