import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * manifest.ts — PWA Web App Manifest
 * Enables "Add to Home Screen" on Android and promotes PWA install prompts.
 * Output: GET /manifest.webmanifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.authorName} — ${siteConfig.jobTitle}`,
    short_name: "Pawan.dev",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#000000",
    theme_color: siteConfig.themeColor,
    lang: "en-US",
    categories: ["business", "productivity", "technology"],
    icons: [
      {
        src: "/icons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        // Maskable icon — fills the entire shape on Android (no padding)
        src: "/web-dev.png",
        sizes: "512x512",
        type: "image/png",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — "purpose" with maskable is valid but not in TS types
        purpose: "any maskable",
      },
    ],
    screenshots: [
      {
        src: "/tech-bg.png",
        sizes: "1200x630",
        type: "image/png",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — form_factor not in TS types yet but valid manifest field
        form_factor: "wide",
        label: "Pawan Kumar Full Stack Developer Portfolio",
      },
    ],
    shortcuts: [
      {
        name: "View Services",
        short_name: "Services",
        description: "Browse development services",
        url: "/#services",
        icons: [{ src: "/web-dev.png", sizes: "512x512" }],
      },
      {
        name: "Contact Me",
        short_name: "Contact",
        description: "Get in touch for a project",
        url: "/#contact",
        icons: [{ src: "/web-dev.png", sizes: "512x512" }],
      },
    ],
  };
}
