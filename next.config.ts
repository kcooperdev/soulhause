import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.MTC_DIST || ".next",
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "techafterdark.live" }],
        destination: "https://soulhause.com/tech-after-dark",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.techafterdark.live" }],
        destination: "https://soulhause.com/tech-after-dark",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
