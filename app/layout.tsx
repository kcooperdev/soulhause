import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Interactive from "./interactive";
import { JoinGate } from "./components/JoinGate";
import { MEMBER_COUNT } from "./components/constants";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SoulHause | Hause of Soul · Sept 17 · Builder events",
  description:
    `RSVP to Hause of Soul: Tech Happy Hour · Sept 17. Join ${MEMBER_COUNT} builders at Soul Sessions, Soul Workshops, and happy hours.`,
  metadataBase: new URL("https://soulhause.com"),
  openGraph: {
    title: "SoulHause | Hause of Soul · Sept 17 · Builder events",
    description:
      `RSVP to Hause of Soul · Sept 17. ${MEMBER_COUNT} builders on Luma. Talks, workshops, and tech happy hours.`,
    url: "https://soulhause.com",
    siteName: "SoulHause",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulHause | Hause of Soul · Sept 17 · Builder events",
    description:
      `RSVP to Hause of Soul · Sept 17. ${MEMBER_COUNT} builders on Luma. Talks, workshops, and tech happy hours.`,
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
        <div className="site-shell">
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KCKRKCGM"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {children}
        </div>
        <JoinGate />
        <Interactive />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KCKRKCGM');`,
          }}
        />
      </body>
    </html>
  );
}
