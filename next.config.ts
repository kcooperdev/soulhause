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
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/what-we-offer",
        destination: "/hause-of-soul",
        permanent: false,
      },
      {
        source: "/events",
        destination: "/hause-of-soul",
        permanent: false,
      },
      {
        source: "/events/:path*",
        destination: "/hause-of-soul",
        permanent: false,
      },
      {
        source: "/membership",
        destination: "/os",
        permanent: false,
      },
      {
        source: "/studio",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
