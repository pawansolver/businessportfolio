import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSEO, siteConfig } from "@/data/site";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildPortfolioSchema,
} from "@/lib/schema";
import { projects } from "@/data/projects";

// ─────────────────────────────────────────────────────────────────────────────
// Projects Page Metadata
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.projects.title,
  description: pageSEO.projects.description,
  keywords: pageSEO.projects.keywords,
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    type: "website",
    title: pageSEO.projects.title,
    description: pageSEO.projects.description,
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Portfolio Projects — Pawan Kumar Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: pageSEO.projects.title,
    description: pageSEO.projects.description,
    images: [siteConfig.ogImage],
  },
};

export default function ProjectsPage() {
  const webPage = buildWebPageSchema({
    type: "CollectionPage",
    url: `${siteConfig.url}/projects`,
    name: pageSEO.projects.title,
    description: pageSEO.projects.description,
    speakableCssSelectors: ["h1", ".projects-intro", ".project-card-title"],
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Projects", url: `${siteConfig.url}/projects` },
    ],
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Projects", url: `${siteConfig.url}/projects` },
  ]);

  // Portfolio collection schema with CreativeWork items
  const portfolio = buildPortfolioSchema(
    projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      techStack: p.techStack,
      image: Array.isArray(p.images) && p.images.length > 0
        ? (p.images.find((img) => img.endsWith(".png") || img.endsWith(".jpg")) ?? p.image)
        : p.image,
      url: p.link ?? "#",
    }))
  );

  void webPage;
  void breadcrumb;
  void portfolio;

  redirect("/#projects");
}
