import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Interactive from "./interactive";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SoulHause — A home for tech. A house for careers.",
  description:
    "A small, paid community for engineers, designers, and founders. Channels, courses, weekly circles, the vault — and a portion of every membership funds tech nonprofits building first careers.",
  openGraph: {
    title: "SoulHause — A home for tech. A house for careers.",
    description:
      "A private community for builders. A portion of every membership funds tech nonprofits.",
    url: "https://soulhause.com",
    siteName: "SoulHause",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulHause — A home for tech. A house for careers.",
    description:
      "A private community for builders. A portion of every membership funds tech nonprofits.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <Interactive />
      </body>
    </html>
  );
}
