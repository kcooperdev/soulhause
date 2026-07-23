import type { Metadata, Viewport } from "next";
import { Figtree, IBM_Plex_Mono, Newsreader, Syne } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import Interactive from "./interactive";
import { JoinGate } from "./components/JoinGate";
import { ThemeBoot } from "./components/ThemeBoot";
import { MEMBER_COUNT } from "./components/constants";
import { PAGE_THEMES, type PageTheme } from "./components/theme";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E9EBE7",
};

export const metadata: Metadata = {
  title: "SoulHause | tech for the soul",
  description: `Tech for culture, community, and local growth. Next up: Hause of Soul · Sept 17. ${MEMBER_COUNT} people on Luma.`,
  metadataBase: new URL("https://soulhause.com"),
  openGraph: {
    title: "SoulHause | tech for the soul",
    description: `Tech for culture, community, and local growth. Next up: Hause of Soul · Sept 17.`,
    url: "https://soulhause.com",
    siteName: "SoulHause",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulHause | tech for the soul",
    description: `Tech for culture, community, and local growth. Next up: Hause of Soul · Sept 17.`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isProd = process.env.NODE_ENV === "production";
  const headerStore = await headers();
  const rawTheme = headerStore.get("x-soul-theme") ?? "home";
  const theme: PageTheme = (PAGE_THEMES as readonly string[]).includes(rawTheme)
    ? (rawTheme as PageTheme)
    : "home";

  return (
    <html
      lang="en"
      data-theme={theme}
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      {/* Extensions (e.g. ColorZilla) inject body attrs like cz-shortcut-listen before hydrate */}
      <body suppressHydrationWarning>
        <ThemeBoot />
        <div className="os-atmosphere" aria-hidden />
        <div className="site-shell">
          {isProd ? (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-KCKRKCGM"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          ) : null}
          {children}
        </div>
        <JoinGate />
        <Interactive />
        {isProd ? (
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
        ) : null}
      </body>
    </html>
  );
}
