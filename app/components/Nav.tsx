"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandLink } from "./BrandLink";
import { HAUSE_OF_SOUL_LUMA_URL, PRIMARY_CTA } from "./constants";
import { navigateToPathway } from "./pathway-nav";

function OsComingSoon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`nav-os ${className}`.trim()}
      role="button"
      tabIndex={0}
      aria-disabled="true"
      aria-label="SoulHause OS, coming soon"
      title="SoulHause OS, coming soon"
    >
      <span className="nav-os-name">
        <span className="nav-os-full">SoulHause OS</span>
      </span>
      <span className="nav-os-soon" aria-hidden="true">
        Soon
      </span>
    </span>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isAbout = pathname === "/about";

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const goHomeSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    if (pathname === "/") {
      navigateToPathway(hash, pathname, () => router.push(`/#${hash}`));
    } else {
      router.push(`/#${hash}`);
    }
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <BrandLink />

        <div className="nav-links">
          <Link
            href="/#pathways"
            className="nav-top-link"
            onClick={(e) => goHomeSection(e, "pathways")}
          >
            Events
          </Link>
          <Link
            href="/#flagship"
            className="nav-top-link"
            onClick={(e) => goHomeSection(e, "flagship")}
          >
            Tech Week
          </Link>
          <Link
            href="/about"
            className={`nav-top-link${isAbout ? " is-active" : ""}`}
          >
            About
          </Link>
          <OsComingSoon />
        </div>

        <div className="nav-actions">
          <a
            href={HAUSE_OF_SOUL_LUMA_URL}
            data-join-gate
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            {PRIMARY_CTA}
          </a>
          <button
            type="button"
            className={`nav-hamburger${mobileOpen ? " is-open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
          </button>
        </div>
      </div>

      <div className={`nav-mobile-panel${mobileOpen ? " open" : ""}`}>
        <div className="nav-mobile-section">
          <Link
            href="/#pathways"
            className="nav-mobile-link"
            onClick={(e) => goHomeSection(e, "pathways")}
          >
            Events
          </Link>
          <Link
            href="/#flagship"
            className="nav-mobile-link"
            onClick={(e) => goHomeSection(e, "flagship")}
          >
            Tech Week
          </Link>
          <Link
            href="/about"
            className={`nav-mobile-link${isAbout ? " is-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <div className="nav-mobile-os">
            <OsComingSoon />
          </div>
        </div>
        <div className="nav-mobile-cta">
          <a
            href={HAUSE_OF_SOUL_LUMA_URL}
            data-join-gate
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => setMobileOpen(false)}
          >
            {PRIMARY_CTA} →
          </a>
        </div>
      </div>
    </nav>
  );
}
