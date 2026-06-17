"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { JOIN_URL } from "./constants";

const NAV_MENUS = [
  {
    label: "Events",
    items: [
      { label: "Grassroots Tech Events", desc: "Local community-driven meetups", href: "#" },
      { label: "Workshops", desc: "Hands-on skill-building sessions", href: "#" },
      { label: "Tech After Dark", desc: "Evening networking for builders", href: "#" },
      { label: "Civic Tech Sprints", desc: "Hackathons for community impact", href: "#" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Builder Profiles", desc: "Meet the people building the future", href: "#" },
      { label: "Projects", desc: "See what's being built right now", href: "#" },
      { label: "Resources", desc: "Guides, templates, and tools", href: "#" },
      { label: "Discussions", desc: "Talk shop with other builders", href: "#" },
    ],
  },
  {
    label: "Platform",
    items: [
      { label: "Developer Tools", desc: "SDKs, APIs, and automation", href: "#" },
      { label: "Small Business Tools", desc: "Scheduling, payments, and CRM", href: "#" },
      { label: "Civic Tech Tools", desc: "Infrastructure for community impact", href: "#" },
      { label: "AI Assistants", desc: "Intelligent automation for builders", href: "#" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Mission", desc: "Why we're building SoulHause", href: "/about" },
      { label: "Story", desc: "How it started and where we're going", href: "/about" },
      { label: "Contact", desc: "Get in touch with the team", href: "/contact" },
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
          <Logo size={32} />
          <span className="nav-logo-text">
            <span className="nav-logo-soul">Soul</span>
            <span className="nav-logo-hause">Hause</span>
          </span>
        </Link>

        <div className="nav-links" style={{ gap: 6 }}>
          {NAV_MENUS.map((menu) => (
            <DropdownGroup key={menu.label} menu={menu} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Get Started
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
        <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Get Started →
          </a>
        </div>
      </div>
    </nav>
  );
}
