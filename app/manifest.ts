import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: brand.name,
    short_name: brand.name,
    description: brand.position,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#e9ebe7",
    theme_color: "#e9ebe7",
    icons: [],
  };
}
