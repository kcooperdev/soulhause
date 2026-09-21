import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Barlow_Condensed, DM_Sans, Public_Sans, Syne } from "next/font/google";
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

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${brand.name} · ${brand.line}`,
  description: brand.position,
  applicationName: brand.name,
  appleWebApp: {
    capable: true,
    title: brand.name,
    statusBarStyle: "default",
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
      className={`${publicSans.variable} ${barlow.variable} ${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <Script src="/folx-reveal.js?v=scrub1" strategy="beforeInteractive" />
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
