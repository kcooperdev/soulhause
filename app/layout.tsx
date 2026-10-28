import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import { PwaRegister } from "@/components/PwaRegister";
import { brand } from "@/lib/brand";
import { homeDescription, homeTitle, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.site),
  title: {
    default: homeTitle,
    template: `%s | ${brand.name}`,
  },
  description: homeDescription,
  applicationName: brand.name,
  keywords: [
    "BMore Tech Scene",
    "tech events",
    "tech jobs",
    "tech resources",
  ],
  authors: [{ name: brand.name, url: brand.site }],
  creator: brand.name,
  category: "community",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: brand.name,
    title: homeTitle,
    description: homeDescription,
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "BMore Tech Scene logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: homeTitle,
    description: homeDescription,
    images: ["/icon-512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "BMore Tech Scene",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "light",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} ${dmSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
