import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * robots.ts — Next.js App Router robots.txt generator
 *
 * Rules:
 *  • Allow all pages by default for all crawlers
 *  • Specifically optimize for Googlebot, Bingbot, and social media crawlers
 *  • Block access to API routes, admin paths, and private assets
 *  • Points to the auto-generated sitemap.xml
 *
 * Output: GET /robots.txt (served automatically by Next.js)
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
      // ── Google — full access with large image previews ────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // ── Bing — full access ────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // ── Social media crawlers (rich preview cards) ────────────────────
      {
        userAgent: ["Twitterbot", "facebookexternalhit", "LinkedInBot"],
        allow: "/",
      },
      // ── All other bots — allow everything except private routes ───────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // Next.js API routes (server-only)
          "/_next/",      // Next.js internals
          "/admin/",      // Admin panel if it exists
          "/*.json$",     // Prevent indexing of raw JSON
        ],
        crawlDelay: 2,    // Polite crawl delay for generic bots
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
