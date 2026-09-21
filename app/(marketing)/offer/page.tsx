import type { Metadata, Viewport } from "next";
import { OfferPage } from "@/components/OfferPage";
import { brand } from "@/lib/brand";
import "@/app/offer.css";

export const metadata: Metadata = {
  title: `The Offer · ${brand.name}`,
  description: "Choose how deep you want to go.",
};

export const viewport: Viewport = {
  themeColor: "#020403",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function Offer() {
  return <OfferPage />;
}
