import type { Metadata, Viewport } from "next";
import { SprintPage } from "@/components/SprintPage";
import { theSprint } from "@/lib/offerings";

export const metadata: Metadata = {
  title: `${theSprint.name} · TechFolx`,
  description: theSprint.what,
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function Page() {
  return <SprintPage />;
}
