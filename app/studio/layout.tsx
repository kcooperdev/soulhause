import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#E4E8ED",
};

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
