import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description: "SoulHause events and a house directory. Tech for the soul.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f1ec",
    theme_color: "#f3f1ec",
    icons: [
      {
        src: brand.logo,
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
