import Link from "next/link";
import { FolxMark } from "@/components/FolxMark";
import { brand } from "@/lib/brand";

export function HouseNav({ children }: { children?: React.ReactNode }) {
  return (
    <header className="house-nav">
      <Link className="house-nav-mark" href="/" aria-label={brand.name}>
        <FolxMark className="gold-mark" />
      </Link>
      {children}
    </header>
  );
}
