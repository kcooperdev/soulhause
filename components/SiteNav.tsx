"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { MenuClose } from "@/components/MenuClose";
import { brand } from "@/lib/brand";
import { siteLinks, techAfterDark } from "@/lib/offerings";
import { readRsvp, writeRsvp } from "@/lib/prefs";
import { events } from "@/lib/events";

export function SiteNav() {
  const path = usePathname();
  const night = events[0];
  const onNight = path === "/tech-after-dark";
  const onHome = path === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function rsvp() {
    if (!night) return;
    const already = readRsvp();
    if (!already.includes(night.id)) writeRsvp([...already, night.id]);
  }

  const links = (
    <>
      {siteLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={path === item.href ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={onNight ? "landing-nav landing-nav--bare" : "landing-nav"}
      data-open={open ? "true" : "false"}
    >
      <Link className="landing-nav-brand" href="/" aria-label={brand.name}>
        <Logo size={72} />
        {onHome ? null : (
          <span className="landing-nav-wordmark">
            <b>{brand.name}</b>
            <i>{brand.line}</i>
          </span>
        )}
      </Link>

      <nav className="landing-nav-links" aria-label={brand.name}>
        {links}
      </nav>

      <a
        className="landing-nav-rsvp"
        href={techAfterDark.rsvp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={rsvp}
      >
        RSVP
      </a>

      <button
        type="button"
        className={open ? "landing-nav-toggle menu-close" : "landing-nav-toggle"}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((next) => !next)}
      >
        {open ? <MenuClose /> : "Menu"}
      </button>

      <div
        id="site-menu"
        className="landing-nav-sheet"
        data-open={open ? "true" : "false"}
      >
        <nav aria-label="Site">
          {links}
          <a
            className="landing-nav-sheet-rsvp"
            href={techAfterDark.rsvp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              rsvp();
              setOpen(false);
            }}
          >
            RSVP
          </a>
        </nav>
      </div>
    </header>
  );
}
