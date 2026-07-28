"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLink } from "./BrandLink";
import {
  HAUSE_OF_SOUL_LUMA_URL,
  NOTIFY_ME_CTA,
  OS_NOTIFY_HREF,
  PRIMARY_CTA,
  STUDIO_NOTIFY_HREF,
} from "./constants";

const NAV_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/studio", label: "Studio" },
  { href: "/os", label: "OS" },
  { href: "/about", label: "About" },
] as const;

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type NavCta = {
  href: string;
  label: string;
  joinGate?: boolean;
  external?: boolean;
};

function navCtaForPath(pathname: string | null): NavCta {
  const path = pathname ?? "/";

  if (path === "/os" || path.startsWith("/os/")) {
    return {
      href: OS_NOTIFY_HREF,
      label: NOTIFY_ME_CTA,
    };
  }

  if (path === "/studio" || path.startsWith("/studio/")) {
    return {
      href: STUDIO_NOTIFY_HREF,
      label: NOTIFY_ME_CTA,
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
  const drawerId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const drawer = drawerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      drawer
        ? Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
          )
        : [];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !drawer.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !drawer.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    // Move focus into the drawer after open paint
    const t = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      previouslyFocused?.focus?.();
      if (!previouslyFocused || !document.contains(previouslyFocused)) {
        triggerRef.current?.focus();
      }
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
    <nav className="nav" aria-label="Primary">
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
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          <a {...primaryAnchorProps}>{cta.label}</a>
          <button
            ref={triggerRef}
            type="button"
            className={`nav-hamburger${mobileOpen ? " is-open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={drawerId}
          >
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
          </button>
        </div>
      </div>

      <div
        className={`nav-mobile-backdrop${mobileOpen ? " open" : ""}`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      <div
        ref={drawerRef}
        id={drawerId}
        className={`nav-mobile-panel${mobileOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!mobileOpen ? true : undefined}
      >
        <div className="nav-mobile-header">
          <p className="nav-mobile-title">Menu</p>
          <button
            ref={closeRef}
            type="button"
            className="nav-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

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
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {isOs ? <span className="nav-mobile-soon">Soon</span> : null}
              </Link>
            );
          })}
        </div>
        <div className="nav-mobile-cta">
          <a {...mobilePrimaryProps}>
            {cta.label} →
          </a>
        </div>
      </div>
    </nav>
  );
}
