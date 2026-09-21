import type { Metadata, Viewport } from "next";
import { AboutPage } from "@/components/AboutPage";
import { about } from "@/lib/offerings";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${about.name} · ${brand.name}`,
  description: about.what,
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function Page() {
  return <AboutPage />;
}
