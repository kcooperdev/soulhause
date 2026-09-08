import Image from "next/image";
import { brand } from "@/lib/brand";

export function Logo({
  size = 40,
  decorative = false,
  round = false,
}: {
  size?: number;
  decorative?: boolean;
  round?: boolean;
}) {
  return (
    <Image
      src={brand.logo}
      alt={decorative ? "" : brand.name}
      width={size}
      height={size}
      className={round ? "rounded-full" : undefined}
      priority
    />
  );
}
