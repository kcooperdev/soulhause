"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLink } from "./BrandLink";
import { BrandText } from "./BrandSpotlight";
import {
  FLAGSHIP_PRODUCT,
  EXPLORE_TECH_WEEK_CTA,
  RSVP_INFO_SESSION_CTA,
  HAUSE_OF_SOUL_LUMA_URL,
  NOTIFY_ME_CTA,
  OS_NOTIFY_HREF,
  PRIMARY_CTA,
} from "./constants";

const NAV_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/tech-week", label: "Tech Week" },
  { href: "/os", label: "SoulHause OS" },
  { href: "/about", label: "About" },
] as const;

type NavCta = {
  href: string;
  label: string;
  joinGate?: boolean;
  external?: boolean;
  secondary?: {
    href: string;
    label: string;
    external?: boolean;
  };
};

function navCtaForPath(pathname: string | null): NavCta {
  const path = pathname ?? "/";

  if (path === "/tech-week" || path.startsWith("/tech-week/")) {
    return {
      href: FLAGSHIP_PRODUCT.lumaHref,
      label: RSVP_INFO_SESSION_CTA,
      external: true,
      secondary: {
        href: FLAGSHIP_PRODUCT.href,
        label: EXPLORE_TECH_WEEK_CTA,
        external: true,
      },
    };
  }

  if (path === "/os" || path.startsWith("/os/")) {
    return {
      href: OS_NOTIFY_HREF,
      label: NOTIFY_ME_CTA,
      secondary: {
        href: "/events",
        label: "Events",
      },
    };
  }

  return {
    href: HAUSE_OF_SOUL_LUMA_URL,
    label: PRIMARY_CTA,
    joinGate: true,
    external: true,
  };
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const cta = navCtaForPath(pathname);

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

  const primaryAnchorProps = {
    href: cta.href,
    className: "nav-cta",
    ...(cta.joinGate ? { "data-join-gate": true } : {}),
    ...(cta.external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}),
  } as const;

  const mobilePrimaryProps = {
    href: cta.href,
    className: "btn btn-primary",
    style: { width: "100%", justifyContent: "center" } as const,
    onClick: () => setMobileOpen(false),
    ...(cta.joinGate ? { "data-join-gate": true } : {}),
    ...(cta.external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}),
  } as const;

  return (
    <nav className="nav">
      <div className="nav-inner">
        <BrandLink />

        <div className="nav-links">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-top-link${active ? " is-active" : ""}`}
              >
                {link.label === "SoulHause OS" ? (
                  <BrandText text="SoulHause OS" />
                ) : (
                  link.label
                )}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          <a {...primaryAnchorProps}>{cta.label}</a>
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
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            const isOs = link.href === "/os";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-mobile-link${active ? " is-active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label === "SoulHause OS" ? (
                  <BrandText text="SoulHause OS" />
                ) : (
                  link.label
                )}
                {isOs ? <span className="nav-mobile-soon">Soon</span> : null}
              </Link>
            );
          })}
        </div>
        <div className="nav-mobile-cta">
          <a {...mobilePrimaryProps}>
            {cta.label} →
          </a>
          {cta.secondary ? (
            cta.secondary.external ? (
              <a
                href={cta.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-mobile-secondary"
                onClick={() => setMobileOpen(false)}
              >
                {cta.secondary.label} →
              </a>
            ) : (
              <Link
                href={cta.secondary.href}
                className="nav-mobile-secondary"
                onClick={() => setMobileOpen(false)}
              >
                {cta.secondary.label} →
              </Link>
            )
          ) : null}
        </div>
      </div>
    </nav>
  );
}
