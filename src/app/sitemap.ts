import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * sitemap.ts — Next.js App Router XML sitemap generator
 *
 * Priorities follow Google's recommended conventions:
 *  1.0  — Home page (highest crawl priority)
 *  0.9  — Primary service/feature sections
 *  0.8  — Contact (high commercial intent)
 *  0.7  — Secondary informational pages
 *  0.6  — Archive / supplemental
 *
 * changeFrequency:
 *  "always"  — real-time content (e.g. live news)
 *  "hourly"  — near real-time
 *  "daily"   — frequently updated
 *  "weekly"  — blog / project updates
 *  "monthly" — stable service/feature pages
 *  "yearly"  — static reference pages
 *  "never"   — archived
 *
 * Output: GET /sitemap.xml (served automatically by Next.js)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  return [
    // ── Root ─────────────────────────────────────────────────────────────
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Primary anchor sections (same SPA, separate Google entries) ──────
    {
      url: `${base}/#services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/#projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/#about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/#contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },

    // ── Canonical sub-pages (for Google to index dedicated metadata) ─────
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
