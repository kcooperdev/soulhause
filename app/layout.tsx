import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Public_Sans, Syne } from "next/font/google";
import { ThemeSync } from "@/components/ThemeSync";
import { brand } from "@/lib/brand";
import { THEME_BOOT, THEME_LIGHT } from "@/lib/theme";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${brand.name} · ${brand.line}`,
  description:
    "SoulHause is a tech company. Tech for the soul, the people, and the future.",
  applicationName: brand.name,
  appleWebApp: {
    capable: true,
    title: brand.name,
    statusBarStyle: "default",
  },
  icons: {
    icon: brand.logo,
    apple: brand.logo,
  },
};

export const viewport: Viewport = {
  themeColor: THEME_LIGHT,
  colorScheme: "light dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${publicSans.variable} ${barlow.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body
        className="h-full min-h-full bg-paper font-sans text-ink"
        suppressHydrationWarning
      >
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
