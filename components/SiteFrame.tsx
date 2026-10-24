"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/brand";
import { nextNight } from "@/lib/content";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const lastPath = useRef(path);

  useEffect(() => {
    if (lastPath.current === path) return;
    lastPath.current = path;
    setOpen(false);
  }, [path]);

  return (
    <div className="shell">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="frame">
        <aside className={open ? "side" : "side is-closed"}>
          <div className="side-head">
            <Link className="brand" href="/">
              <strong>BMore Tech Nights</strong>
              <span>Tech mixer</span>
            </Link>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="site-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
          <nav id="site-nav" aria-label="Primary">
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
