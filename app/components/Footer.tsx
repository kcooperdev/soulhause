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
              A community-powered developer platform for civic tech,
              small businesses, and local builders.
            </p>
          </div>

          <div className="footer-col">
            <h4>Events</h4>
            <ul>
              <li><a href="#">Grassroots Tech Events</a></li>
              <li><a href="#">Workshops</a></li>
              <li><a href="#">Tech After Dark</a></li>
              <li><a href="#">Civic Tech Sprints</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><a href="#">Developer Tools</a></li>
              <li><a href="#">Small Business Tools</a></li>
              <li><a href="#">Civic Tech Tools</a></li>
              <li><a href="#">AI Assistants</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Community</h4>
            <ul>
              <li><a href="#">Builder Profiles</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Resources</a></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SoulHause · Launching September 2026</span>
          <span>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "inherit" }}>{CONTACT_EMAIL}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
