import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSEO, siteConfig } from "@/data/site";
import { buildBreadcrumbSchema } from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// About Page — Google-indexed with dedicated metadata
// The page redirects to /#about on the SPA but remains crawlable
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.about.title,
  description: pageSEO.about.description,
  keywords: pageSEO.about.keywords,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: pageSEO.about.title,
    description: pageSEO.about.description,
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "About Pawan Kumar — Full Stack Developer in India",
      },
    ],
  },
  twitter: {
    title: pageSEO.about.title,
    description: pageSEO.about.description,
  },
};

export default function AboutPage() {
  // Breadcrumb structured data is embedded before redirect for crawlers
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ]);

  void breadcrumb; // consumed by metadata pipeline; redirect below for UX
  redirect("/#about");
}
