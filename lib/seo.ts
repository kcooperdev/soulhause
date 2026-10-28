import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const homeTitle = "BMore Tech Scene | Events, Jobs, Resources";

export const homeDescription =
  "One stop for the tech community: events to attend, and resources to learn AI, cybersecurity, and more.";

const shareImage = {
  url: "/icon-512.png",
  width: 512,
  height: 512,
  alt: "BMore Tech Scene logo",
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
    sameAs: [brand.calendar],
  };
}
