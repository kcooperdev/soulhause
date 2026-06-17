import Link from "next/link";
import { Logo } from "./Logo";
import { JOIN_URL, CONTACT_EMAIL } from "./constants";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, paddingBottom: 32, borderBottom: "1px solid rgba(245, 240, 230, 0.18)" }}>
          <div className="footer-brand" style={{ justifyContent: "center" }}>
            <Logo size={32} />
            <span>SoulHause</span>
          </div>
          <p className="footer-tagline" style={{ maxWidth: 400, margin: "0 auto" }}>
            A community-powered developer platform for civic tech, small businesses, and local builders across the DMV.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/about" style={{ color: "rgba(245,240,230,0.7)", fontSize: 14 }}>About</Link>
            <Link href="/contact" style={{ color: "rgba(245,240,230,0.7)", fontSize: 14 }}>Contact</Link>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(245,240,230,0.7)", fontSize: 14 }}>Join</a>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "rgba(245,240,230,0.7)", fontSize: 14 }}>{CONTACT_EMAIL}</a>
          </div>
        </div>
        <div className="footer-bottom" style={{ justifyContent: "center" }}>
          <span>© {new Date().getFullYear()} SoulHause · Launching September 2026</span>
        </div>
      </div>
    </footer>
  );
}
