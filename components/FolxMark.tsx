import Link from "next/link";

import { brand } from "@/lib/brand";

export function FolxMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 64"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="0" y="2" width="56" height="10" />
      <rect x="14" y="2" width="10" height="60" />
      <rect x="14" y="30" width="42" height="10" />
    </svg>
  );
}

export function BrandLockup({
  as: Tag = "p",
}: {
  as?: "p" | "h1";
}) {
  return (
    <Tag className="gold-name">
      <Link href="/" aria-label={brand.name}>
        <FolxMark className="gold-mark" />
      </Link>
    </Tag>
  );
}
