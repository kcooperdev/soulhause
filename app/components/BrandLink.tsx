"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { BrandSpotlight } from "./BrandSpotlight";

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
        <BrandSpotlight className="footer-wordmark" quiet>
          <span className="nav-logo-soul brand-sunflow brand-sunflow--quiet">
            Soul
          </span>
          <span className="nav-logo-hause brand-sunflow brand-sunflow--quiet">
            Hause
          </span>
        </BrandSpotlight>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="nav-logo nav-logo--mark"
      onClick={goHome}
      aria-label="SoulHause home"
    >
      {/* Intrinsic 64; CSS sizes display (compensates asset padding) */}
      <Logo size={64} />
    </Link>
  );
}
