"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { JOIN_URL } from "./constants";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/what-we-offer", label: "What We Offer" },
  { href: "/membership", label: "Membership" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <Logo size={28} />
          <span>
            Soul<em>Hause</em>
          </span>
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <a
          href={JOIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          Join <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}
