"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, nav } from "@/lib/brand";
import { nextNight } from "@/lib/content";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const links = (
    <ul className="nav-list">
      {nav.map((item) => {
        const current = item.href === "/" ? path === "/" : path.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link href={item.href} aria-current={current ? "page" : undefined}>
              <span className="swatch" style={{ ["--tone" as string]: item.tone }} />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="shell">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="topbar">
        <Link className="brand" href="/" aria-label={brand.name}>
          <strong>{brand.short}</strong>
        </Link>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <a className="find" href={nextNight.registrationUrl}>
          Subscribe
        </a>
      </header>
      <div className="frame">
        <aside className={open ? "side open" : "side"}>
          <Link className="brand" href="/">
            <strong>BMore Tech Nights</strong>
            <span>Tech mixer</span>
          </Link>
          <nav id="site-nav" aria-label="Primary">
            {links}
          </nav>
          <a className="find" href={nextNight.registrationUrl}>
            Subscribe
          </a>
        </aside>
        <div className="stage" id="content">
          {children}
        </div>
      </div>
    </div>
  );
}
