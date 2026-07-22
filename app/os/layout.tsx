import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0B0D0F",
  colorScheme: "dark",
};

export default function OsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
