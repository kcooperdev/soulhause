import type { Metadata, Viewport } from "next";
import { TechAfterDarkPage } from "@/components/TechAfterDarkPage";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.name} · ${brand.line}`,
  description: brand.position,
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function Home() {
  return <TechAfterDarkPage />;
}
