import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#17171A",
};

export default function TechWeekLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
