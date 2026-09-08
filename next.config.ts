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
};

export default nextConfig;
