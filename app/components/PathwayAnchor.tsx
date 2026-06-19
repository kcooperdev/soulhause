"use client";

import { usePathname, useRouter } from "next/navigation";
import { navigateToPathway } from "./pathway-nav";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

export function PathwayAnchor({ id, className, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <a
      href={`/#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigateToPathway(id, pathname, (href) => router.push(href));
      }}
    >
      {children}
    </a>
  );
}
