import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSEO, siteConfig } from "@/data/site";

// ─────────────────────────────────────────────────────────────────────────────
// Projects Page Metadata
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.projects.title,
  description: pageSEO.projects.description,
  keywords: pageSEO.projects.keywords,
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: pageSEO.projects.title,
    description: pageSEO.projects.description,
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Projects Portfolio — Pawan Kumar, Full Stack Developer",
      },
    ],
  },
  twitter: {
    title: pageSEO.projects.title,
    description: pageSEO.projects.description,
  },
};

export default function ProjectsPage() {
  redirect("/#projects");
}
