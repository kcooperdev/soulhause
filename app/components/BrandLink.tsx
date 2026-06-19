"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";

type Props = {
  variant?: "nav" | "footer";
};

export function BrandLink({ variant = "nav" }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      return;
    }
    router.push("/");
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
