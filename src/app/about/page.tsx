import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSEO, siteConfig, eeatSignals } from "@/data/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// About Page — EEAT-optimized metadata
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.about.title,
  description: pageSEO.about.description,
  keywords: pageSEO.about.keywords,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    type: "profile",
    title: pageSEO.about.title,
    description: pageSEO.about.description,
    url: `${siteConfig.url}/about`,
    firstName: "Pawan",
    lastName: "Kumar",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `About Pawan Kumar — Full Stack Developer with ${eeatSignals.yearsOfExperience}+ years experience`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: pageSEO.about.title,
    description: pageSEO.about.description,
    images: [siteConfig.ogImage],
  },
};

export default function AboutPage() {
  const webPage = buildWebPageSchema({
    type: "AboutPage",
    url: `${siteConfig.url}/about`,
    name: pageSEO.about.title,
    description: pageSEO.about.description,
    speakableCssSelectors: ["h1", ".about-summary", ".expertise-section"],
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "About", url: `${siteConfig.url}/about` },
    ],
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ]);

  // schemas built server-side; redirect is Next.js navigation
  void webPage;
  void breadcrumb;

  redirect("/#about");
}
