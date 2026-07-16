import Link from "next/link";
import { BrandLink } from "./BrandLink";
import {
  JOIN_URL,
  CONTACT_EMAIL,
  FLAGSHIP_PRODUCT,
  SOUL_BUILDERS_PRODUCT,
  NEXT_EVENT,
  SITE_TAGLINE,
  PRIMARY_CTA,
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
            <p className="footer-col-label">Events</p>
            <ul>
              <li>
                <Link href={pathwayHref("pathways")}>Pathways</Link>
              </li>
              <li>
                <a href={JOIN_URL} data-join-gate target="_blank" rel="noopener noreferrer">
                  {PRIMARY_CTA}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-label">Products</p>
            <ul>
              <li>
                <a href={FLAGSHIP_PRODUCT.href} target="_blank" rel="noopener noreferrer">
                  Baltimore Tech Week
                </a>
              </li>
              <li>
                <a href={SOUL_BUILDERS_PRODUCT.href} target="_blank" rel="noopener noreferrer">
                  Soul Builders
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col-label">Company</p>
            <ul>
              <li>
                <Link href="/what-we-offer">Explore</Link>
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
          <p className="footer-copyright">© {new Date().getFullYear()} SoulHause</p>
          <p className="footer-meta">
            {NEXT_EVENT.shortTitle} · {NEXT_EVENT.date}
          </p>
        </div>
      </div>
    </footer>
  );
}
