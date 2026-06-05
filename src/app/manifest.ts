import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.authorName} — ${siteConfig.jobTitle}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#d4ff00",
    icons: [
      {
        src: "/web-dev.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
