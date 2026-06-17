import Link from "next/link";
import { Logo } from "./Logo";
import { JOIN_URL, CONTACT_EMAIL } from "./constants";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Logo size={32} />
              <span>SoulHause</span>
            </div>
            <p className="footer-tagline">
              A small house with the lights on. A members-first community for
              builders — events, cohorts, and a real resource library.
            </p>
          </div>

          <div className="footer-col">
            <h4>The Hause</h4>
            <ul>
              <li><Link href="/what-we-offer">What We Offer</Link></li>
              <li><Link href="/membership">Membership</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Join</h4>
            <ul>
              <li>
                <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                  Free Community
                </a>
              </li>
              <li>
                <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                  SoulHause Pro
                </a>
              </li>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>Email us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Social</h4>
            <ul>
              <li><a href="#" aria-label="Instagram">Instagram</a></li>
              <li><a href="#" aria-label="YouTube">YouTube</a></li>
              <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
              <li><a href="#" aria-label="X">X / Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SoulHause · Est · MMXXVI</span>
          <span>{CONTACT_EMAIL}</span>
        </div>
      </div>
    </footer>
  );
}
