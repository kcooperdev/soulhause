"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandLink } from "./BrandLink";
import { JOIN_URL, PATHWAY_PICKER } from "./constants";
import { navigateToPathway, pathwayHref } from "./pathway-nav";

const NAV_MENUS = [
  {
    label: "Pathways",
    items: [
      ...PATHWAY_PICKER.map((pathway) => ({
        label: pathway.shortLabel,
        href: pathwayHref(pathway.id),
      })),
      { label: "All events", href: "/#pathways" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Mission", href: "/about" },
      { label: "Membership", href: "/membership" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    const match = href.match(/^\/#(.+)$/);
    if (!match) return;

    e.preventDefault();
    const id = match[1];
    if (id === "pathways") {
      if (pathname === "/") {
        navigateToPathway("pathways", pathname, () => router.push(href));
      } else {
        router.push(href);
      }
      return;
    }

    navigateToPathway(id, pathname, (target) => router.push(target));
  };

  return (
    <Link href={href} className="nav-dropdown-item" role="menuitem" onClick={handleClick}>
      <span className="nav-dropdown-label">{label}</span>
    </Link>
  );
}

function DropdownGroup({
  menu,
  onNavigate,
}: {
  menu: (typeof NAV_MENUS)[0];
  onNavigate?: () => void;
}) {
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
        className={`nav-menu-trigger${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {menu.label}
      </button>
      <div className={`nav-dropdown-panel${open ? " open" : ""}`} role="menu">
        <div className="nav-dropdown-inner">
          <div className="nav-dropdown-header">{menu.label}</div>
          {menu.items.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
              onNavigate={() => {
                setOpen(false);
                onNavigate?.();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleMobilePath = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const match = href.match(/^\/#(.+)$/);
    if (!match) return;
    e.preventDefault();
    setMobileOpen(false);
    navigateToPathway(match[1], pathname, (target) => router.push(target));
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <BrandLink />

        <div className="nav-links">
          {NAV_MENUS.map((menu) => (
            <DropdownGroup key={menu.label} menu={menu} />
          ))}
          <Link href="/what-we-offer" className="nav-menu-trigger">
            Platform
          </Link>
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
            data-join-gate
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
                onClick={(e) => {
                  if (item.href.startsWith("/#")) {
                    handleMobilePath(e, item.href);
                  } else {
                    setMobileOpen(false);
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="nav-mobile-section">
          <Link href="/what-we-offer" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
            Platform
          </Link>
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
        <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <a
            href={JOIN_URL}
            data-join-gate
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
