"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { JOIN_URL } from "./constants";

const NAV_MENUS = [
  {
    label: "Events",
    items: [
      { label: "Soul Sessions", desc: "Live storytelling from founders & creators", href: "#events" },
      { label: "Soul Labs", desc: "Hands-on workshops for builders", href: "#events" },
      { label: "Hause Link", desc: "Tech-forward mixers across the DMV", href: "#events" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Mission", desc: "Why we're building SoulHause", href: "/about" },
    ],
  },
];

function DropdownGroup({ menu }: { menu: (typeof NAV_MENUS)[0] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="nav-menu-group"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        className="nav-menu-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {menu.label}
        <span className={`nav-chevron${open ? " open" : ""}`}>▾</span>
      </button>
      <div className={`nav-dropdown-panel${open ? " open" : ""}`} role="menu">
        <div className="nav-dropdown-inner">
          <div className="nav-dropdown-header">{menu.label}</div>
          {menu.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-dropdown-item"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span className="nav-dropdown-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="nav" style={{ position: "relative" }}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <Logo size={44} />
          <span className="nav-logo-text">
            <span className="nav-logo-soul">Soul</span>
            <span className="nav-logo-hause">Hause</span>
          </span>
        </Link>

        <div className="nav-links" style={{ gap: 4 }}>
          {NAV_MENUS.map((menu) => (
            <DropdownGroup key={menu.label} menu={menu} />
          ))}
          <a
            href="https://soulhausebuilders.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-menu-trigger"
          >
            Builders
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Join Community
          </a>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
          </button>
        </div>
      </div>

      <div className={`nav-mobile-panel${mobileOpen ? " open" : ""}`}>
        {NAV_MENUS.map((menu) => (
          <div key={menu.label} className="nav-mobile-section">
            <div className="nav-mobile-label">{menu.label}</div>
            {menu.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="nav-mobile-section">
          <div className="nav-mobile-label">Builders</div>
          <a
            href="https://soulhausebuilders.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            SoulHause Builders →
          </a>
        </div>
        <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-dark)" }}>
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Join Community →
          </a>
        </div>
      </div>
    </nav>
  );
}
