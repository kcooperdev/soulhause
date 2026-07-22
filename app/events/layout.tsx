import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#F0E8DC",
};

export default function EventsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
