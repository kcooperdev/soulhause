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
  title: "SoulHause — A home for tech, creativity & community.",
  description:
    "A modern, members-first community for builders. Events, cohorts, and a resource library — designed for creators and technologists.",
  openGraph: {
    title: "SoulHause — A home for tech, creativity & community.",
    description:
      "A members-first community for builders. Events, cohorts, and a resource library.",
    url: "https://soulhause.com",
    siteName: "SoulHause",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulHause — A home for tech, creativity & community.",
    description:
      "A members-first community for builders. Events, cohorts, and a resource library.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
