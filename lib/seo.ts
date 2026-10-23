import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { nextNight } from "@/lib/content";

export const homeTitle = "BMore Tech Nights | Baltimore Tech Mixer";

export const homeDescription =
  "Baltimore tech mixer founded in 2026. Meet professionals, try technology together, and join The Offer on November 4, 2026 at 6pm.";

const shareImage = {
  url: "/icon-512.png",
  width: 512,
  height: 512,
  alt: "BMore Tech Nights logo",
} as const;

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const full = `${title} | ${brand.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: brand.name,
      title: full,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary",
      title: full,
      description,
      images: [shareImage.url],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.site,
    logo: `${brand.site}/icon-512.png`,
    foundingDate: "2026",
    description: brand.position,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baltimore",
      addressRegion: "MD",
      addressCountry: "US",
    },
    sameAs: [brand.calendar],
  };
}

export function eventJsonLd() {
  if (!nextNight.published) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: nextNight.name,
    description: nextNight.description,
    startDate: "2026-11-04T18:00:00-05:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: `${brand.site}/events`,
    image: `${brand.site}/icon-512.png`,
    location: {
      "@type": "Place",
      name: nextNight.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: "36 E Cross St",
        addressLocality: "Baltimore",
        addressRegion: "MD",
        postalCode: "21230",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: brand.name,
      url: brand.site,
    },
  };
}
