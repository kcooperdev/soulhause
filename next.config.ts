import type { NextConfig } from "next";

const SOUL_BUILDERS_LINKEDIN = "https://www.linkedin.com/groups/30920002/";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/builders",
        destination: SOUL_BUILDERS_LINKEDIN,
        permanent: false,
      },
      {
        source: "/soul-builders",
        destination: SOUL_BUILDERS_LINKEDIN,
        permanent: false,
      },
      {
        source: "/baltimore-tech-week",
        destination: "/",
        permanent: false,
      },
      {
        source: "/tech-week",
        destination: "/",
        permanent: false,
      },
      {
        source: "/soulhause-os",
        destination: "/os",
        permanent: true,
      },
      {
        source: "/soul-labs",
        destination: "/events#pathway-2",
        permanent: true,
      },
      {
        source: "/what-we-offer",
        destination: "/events",
        permanent: false,
      },
      {
        source: "/membership",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
