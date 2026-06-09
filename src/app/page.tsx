import type { Metadata } from "next";
import { pageSEO, siteConfig } from "@/data/site";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SmoothScrollHero } from "@/components/ui/modern-hero";
import { TechStack } from "@/components/ui/tech-stack";
import TrustBar from "@/components/sections/TrustBar";
import dynamic from "next/dynamic";

// ── Below-fold lazy loaded ────────────────────────────────────────────────────
const Services = dynamic(() => import("@/components/sections/Services"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const StatsCounter = dynamic(() => import("@/components/sections/StatsCounter"));
const About = dynamic(() => import("@/components/ui/parallax-scroll-feature-section"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

// ─────────────────────────────────────────────────────────────────────────────
// Page Metadata — overrides layout.tsx defaults for the home page
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.home.title,
  description: pageSEO.home.description,
  keywords: pageSEO.home.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Pawan Kumar — Full Stack Developer | React, Node.js & MERN Stack",
      },
    ],
  },
  twitter: {
    title: pageSEO.home.title,
    description: pageSEO.home.description,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
  ]);

  return (
    <>
      {/* Page-level breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <SmoothScrollHero />
      <TrustBar />
      <About />
      <Projects />
      <Process />
      <TechStack />
      <Testimonials />
      <StatsCounter />
      <CTA />
      <Contact />
    </>
  );
}
