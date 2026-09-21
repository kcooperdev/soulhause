"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuClose } from "@/components/MenuClose";
import { brand } from "@/lib/brand";
import { contact, siteLinks } from "@/lib/offerings";

export function SiteNav() {
  const path = usePathname();
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

  const rsvp = (
    <a
      className="landing-nav-rsvp"
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => setOpen(false)}
    >
      {contact.name}
    </a>
  );

  return (
    <header
      className="landing-nav"
      data-open={open ? "true" : "false"}
    >
      <Link className="landing-nav-brand" href="/" aria-label={brand.name}>
        <span className="landing-nav-wordmark">
          <b>{brand.name}</b>
          <i>{brand.line}</i>
        </span>
      </Link>

      <nav className="landing-nav-links" aria-label={brand.name}>
        {links}
      </nav>

      {rsvp}

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
          <button
            type="button"
            className="menu-close landing-nav-sheet-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <MenuClose />
          </button>
          {links}
          <a
            className="landing-nav-sheet-rsvp"
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            {contact.name}
          </a>
        </nav>
      </div>
    </header>
  );
}
