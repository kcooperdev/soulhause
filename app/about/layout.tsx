import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#E6EBE6",
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
