import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  return [
    { url: base,                  lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/#services`,   lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#projects`,   lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#about`,      lastModified, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${base}/#contact`,    lastModified, changeFrequency: "yearly",  priority: 0.8 },
  ];
}
