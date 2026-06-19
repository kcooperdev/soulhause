"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

type Props = {
  variant?: "nav" | "footer";
};

export function BrandLink({ variant = "nav" }: Props) {
  const pathname = usePathname();

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    e.preventDefault();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top: 0, behavior });
    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
  };

  if (variant === "footer") {
    return (
      <Link
        href="/"
        className="footer-brand"
        onClick={goHome}
        aria-label="SoulHause home"
      >
        <Logo size={48} />
        <span className="footer-wordmark">
          <span className="nav-logo-soul">Soul</span>
          <span className="nav-logo-hause">Hause</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="nav-logo"
      onClick={goHome}
      aria-label="SoulHause home"
    >
      <Logo size={60} />
      <span className="nav-logo-text">
        <span className="nav-logo-soul">Soul</span>
        <span className="nav-logo-hause">Hause</span>
      </span>
    </Link>
  );
}
