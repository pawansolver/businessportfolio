/**
 * seo-utils.ts — Advanced SEO Utility Functions
 *
 * Utilities for:
 *  • AI-search readiness (Google AI Overview, Bing Copilot, Perplexity)
 *  • Dynamic metadata generation for programmatic pages
 *  • Rich snippet helpers
 *  • Performance optimization utilities
 *  • Internal linking helpers
 */

import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

// ─────────────────────────────────────────────────────────────────────────────
// 1. generatePageMetadata — builds complete Metadata for any page
// ─────────────────────────────────────────────────────────────────────────────
interface PageMetadataInput {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string; // e.g. "/services" or "/projects/hospital"
  ogImagePath?: string;  // defaults to siteConfig.ogImage
  type?: "website" | "article" | "profile";
  noIndex?: boolean;     // set true for admin/private pages
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  canonicalPath,
  ogImagePath,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullUrl = `${siteConfig.url}${canonicalPath}`;
  const image = ogImagePath ?? siteConfig.ogImage;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: fullUrl,
      languages: { "en-US": fullUrl, "en-IN": fullUrl },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      title,
      description,
      url: fullUrl,
      siteName: `${siteConfig.authorName} — Full Stack Developer`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. AI Search Optimization — Topical Authority Content Blocks
//    These text blocks are designed for AI-digestible fact extraction.
//    Render them as visible content on the page for maximum AI-search coverage.
// ─────────────────────────────────────────────────────────────────────────────
export const aiSearchBlocks = {
  /**
   * Who is Pawan Kumar?
   * Structured for Google AI Overview entity card generation.
   * Include in About section or hero.
   */
  entityBio: `Pawan Kumar is a Full Stack Developer based in India with over 3 years of professional experience building web applications, mobile apps, and MERN Stack solutions. He specializes in React, Next.js, Node.js, Express.js, Supabase, TypeScript, and Tailwind CSS. Pawan Kumar has delivered 50+ projects for clients across India, USA, UK, and Australia, including hospital websites, educational portals, admin dashboards, e-commerce platforms, and custom SaaS applications.`,

  /**
   * What does Pawan Kumar do?
   * Structured for Bing Copilot + Perplexity fact extraction.
   */
  serviceSummary: `Pawan Kumar offers the following web development services: Website Development, Web Application Development, Mobile App Development, MERN Stack Development, React Development, Node.js Development, API Development & Integration, Admin Panel Development, Dashboard Development, SEO-Friendly Website Development, UI/UX Development, and Custom Software Development. He is available for freelance projects and long-term collaboration.`,

  /**
   * Contact information block.
   * Structured for ChatGPT Search and AI assistants.
   */
  contactBlock: `To hire Pawan Kumar or get a project quote: Email: ${siteConfig.email} | WhatsApp: ${siteConfig.whatsapp} | LinkedIn: ${siteConfig.linkedin} | Website: ${siteConfig.url}`,

  /**
   * Technical expertise summary.
   * Used by AI to understand developer's skill depth.
   */
  techExpertise: `Pawan Kumar's primary tech stack includes: Frontend — React 18, Next.js 15, TypeScript, Tailwind CSS, Framer Motion. Backend — Node.js, Express.js, REST API, GraphQL. Database — Supabase, PostgreSQL, MongoDB. Tools — Git, Vercel, GitHub Actions, Figma. He specializes in building SEO-optimized, high-performance web applications with modern UI/UX.`,
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. EEAT Content Signals — render in visible HTML for Google trust
// ─────────────────────────────────────────────────────────────────────────────
export const eeatContentSignals = {
  /**
   * Author bio for blog posts, case studies, and about sections.
   * Google uses this for EEAT author entity attribution.
   */
  authorBio: {
    name: "Pawan Kumar",
    jobTitle: "Full Stack Developer",
    description:
      "Pawan Kumar is an independent Full Stack Developer in India specializing in React, Node.js, and MERN Stack development. With 3+ years of experience and 50+ projects delivered, he builds high-performance, SEO-friendly web and mobile applications for businesses worldwide.",
    expertise: ["React", "Next.js", "Node.js", "MERN Stack", "Supabase", "TypeScript"],
    profileUrl: siteConfig.url,
    linkedIn: siteConfig.linkedin,
    email: siteConfig.email,
  },

  /**
   * Trust indicators — render prominently on the page.
   */
  trustIndicators: [
    { icon: "✅", text: "3+ Years Experience" },
    { icon: "📦", text: "50+ Projects Delivered" },
    { icon: "⭐", text: "4.9/5 Client Rating" },
    { icon: "🌍", text: "Clients in 10+ Countries" },
    { icon: "💬", text: "WhatsApp Response in 2hrs" },
    { icon: "🔒", text: "Clean, Documented Code" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Local SEO — Service area + location data for local ranking
// ─────────────────────────────────────────────────────────────────────────────
export const localBusinessData = {
  // Google Business Profile data (fill in after creating one)
  googleBusinessProfile: {
    name: "Pawan Kumar — Full Stack Developer",
    // gbpUrl: "https://g.page/YOUR_HANDLE", // add after creating GBP
    category: "Software Developer",
    serviceArea: "India and Worldwide (Remote)",
  },

  // Location-specific landing page keyword suggestions
  locationKeywords: [
    "Full Stack Developer India Remote",
    "MERN Stack Developer India",
    "React Developer Freelance India",
    "Hire Web Developer India",
    "Next.js Developer India",
    "Node.js Developer India Freelance",
    "Web Application Developer India",
    "Affordable Web Developer India",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Rich Snippet Checklist — use to validate before publishing
// ─────────────────────────────────────────────────────────────────────────────
export const richSnippetChecklist = {
  // Test your structured data at these URLs
  validationUrls: {
    schemaValidator: "https://validator.schema.org/",
    richResultsTest: "https://search.google.com/test/rich-results",
    ogDebugger: "https://developers.facebook.com/tools/debug/",
    twitterCardValidator: "https://cards-dev.twitter.com/validator",
    linkedinInspector: "https://www.linkedin.com/post-inspector/",
    pageSpeedInsights: "https://pagespeed.web.dev/",
  },

  // Schemas deployed on this site
  deployedSchemas: {
    global: ["Person", "Organization", "LocalBusiness", "WebSite", "HowTo"],
    home: ["WebPage", "BreadcrumbList", "FAQPage"],
    services: ["WebPage", "ItemList", "FAQPage", "BreadcrumbList"],
    projects: ["CollectionPage", "CreativeWork", "BreadcrumbList"],
    about: ["AboutPage", "BreadcrumbList"],
    contact: ["ContactPage", "FAQPage", "BreadcrumbList"],
  },

  // Rich results eligible
  richResultsEligible: [
    "FAQ rich results (Services + Home + Contact pages)",
    "Breadcrumb navigation",
    "Site name in SERPs",
    "Sitelinks Search Box (via SearchAction)",
    "Business reviews + star ratings",
    "Knowledge Panel (via Person + Organization @id)",
    "HowTo rich results (development process)",
    "Service rich results",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Internal Linking Helper — generates SEO anchor text
// ─────────────────────────────────────────────────────────────────────────────
interface InternalLink {
  anchor: string;
  href: string;
  title: string;
}

export function getContextualInternalLinks(currentPage: string): InternalLink[] {
  const allLinks: Record<string, InternalLink[]> = {
    home: [
      { anchor: "View My Services", href: "/#services", title: "Full Stack Development Services by Pawan Kumar" },
      { anchor: "See My Portfolio", href: "/#projects", title: "Web & App Development Portfolio" },
      { anchor: "Contact Me", href: "/#contact", title: "Hire Pawan Kumar — Full Stack Developer" },
    ],
    services: [
      { anchor: "View My Projects", href: "/#projects", title: "Portfolio — Real-world development projects" },
      { anchor: "Get a Free Quote", href: "/#contact", title: "Contact Pawan Kumar for a project estimate" },
      { anchor: "About Pawan Kumar", href: "/#about", title: "About — Full Stack Developer profile" },
    ],
    projects: [
      { anchor: "Hire Me for Your Project", href: "/#contact", title: "Contact Pawan Kumar — Hire a Full Stack Developer" },
      { anchor: "Explore My Services", href: "/#services", title: "Web Development Services India" },
    ],
    about: [
      { anchor: "My Services", href: "/#services", title: "Professional Web Development Services" },
      { anchor: "My Projects", href: "/#projects", title: "Full Stack Developer Portfolio" },
      { anchor: "Get in Touch", href: "/#contact", title: "Hire Pawan Kumar" },
    ],
    contact: [
      { anchor: "View My Work", href: "/#projects", title: "Portfolio — Full Stack Development Projects" },
      { anchor: "My Services", href: "/#services", title: "Web & App Development Services" },
    ],
  };

  return allLinks[currentPage] ?? [];
}
