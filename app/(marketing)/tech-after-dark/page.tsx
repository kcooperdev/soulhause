import type { Metadata, Viewport } from "next";
import { TechAfterDarkPage } from "@/components/TechAfterDarkPage";
import { techAfterDark } from "@/lib/offerings";

export const metadata: Metadata = {
  title: `${techAfterDark.name} · SoulHause`,
  description: techAfterDark.what,
};

export const viewport: Viewport = {
  themeColor: "#05040A",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function Page() {
  return <TechAfterDarkPage />;
}
