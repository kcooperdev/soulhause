import Link from "next/link";
import { FolxMark } from "@/components/FolxMark";
import { brand } from "@/lib/brand";
import { techAfterDark, techWeek } from "@/lib/offerings";

export function HouseNav({ children }: { children?: React.ReactNode }) {
  return (
    <header className="house-nav">
      <Link className="house-nav-mark" href="/" aria-label={brand.name}>
        <FolxMark className="gold-mark" />
      </Link>
      <nav className="house-nav-links" aria-label={brand.name}>
        <a href={techAfterDark.live} target="_blank" rel="noopener noreferrer">
          {techAfterDark.name}
        </a>
        <a href={techWeek.href} target="_blank" rel="noopener noreferrer">
          {techWeek.name}
        </a>
      </nav>
      {children}
    </header>
  );
}
