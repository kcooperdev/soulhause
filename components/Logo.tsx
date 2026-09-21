import Image from "next/image";
import { brand } from "@/lib/brand";

export function Logo({
  size = 40,
  decorative = false,
  round = false,
  src = brand.logo,
}: {
  size?: number;
  decorative?: boolean;
  round?: boolean;
  src?: string;
}) {
  return (
    <Image
      src={src}
      alt={decorative ? "" : brand.name}
      width={size}
      height={size}
      className={round ? "rounded-full" : undefined}
      priority
    />
  );
}
