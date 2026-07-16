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
        destination: "https://bmoretechweek.com",
        permanent: true,
      },
      {
        source: "/soul-labs",
        destination: "/#pathway-2",
        permanent: true,
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
