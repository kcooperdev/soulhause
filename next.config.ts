import type { NextConfig } from "next";

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
        destination: "https://soulbuilders.io",
        permanent: true,
      },
      {
        source: "/soul-builders",
        destination: "https://soulbuilders.io",
        permanent: true,
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
