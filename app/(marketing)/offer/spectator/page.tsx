import type { Metadata, Viewport } from "next";
import { OfferPath } from "@/components/OfferPath";
import { brand } from "@/lib/brand";
import "@/app/offer.css";

export const metadata: Metadata = {
  title: `Spectator · The Offer · ${brand.name}`,
  description:
    "Watch the system come alive. The Spectator ticket is free on November 4, 2026 at Nola Seafood.",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function Spectator() {
  return <OfferPath side="spectator" />;
}
