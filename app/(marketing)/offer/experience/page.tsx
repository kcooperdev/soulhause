import type { Metadata, Viewport } from "next";
import { OfferPath } from "@/components/OfferPath";
import { brand } from "@/lib/brand";
import "@/app/offer.css";

export const metadata: Metadata = {
  title: `Experience · The Offer · ${brand.name}`,
  description:
    "Step inside the system. The Experience ticket is $20 on November 4, 2026 at Nola Seafood.",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function Experience() {
  return <OfferPath side="experience" />;
}
