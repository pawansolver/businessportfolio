/**
 * schema.ts — Centralized Schema.org JSON-LD generator
 *
 * Generates Google-rich-result-eligible structured data for:
 *  • Person
 *  • ProfessionalService
 *  • WebSite (with SearchAction sitelinks)
 *  • BreadcrumbList (per-page)
 *  • FAQPage (per-page, optional)
 *  • LocalBusiness (alias for ProfessionalService, enhances Maps appearance)
 *
 * All nodes link via @id so Google can build a full Knowledge Graph entity.
 */

import { siteConfig } from "@/data/site";

const BASE = siteConfig.url;

// ─────────────────────────────────────────────────────────────────────────────
// Helper — strip undefined values for cleaner JSON output
// ─────────────────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function clean<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== "#")
  ) as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSON schema
// ─────────────────────────────────────────────────────────────────────────────
export function buildPersonSchema() {
  return clean({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/#person`,
    name: siteConfig.authorName,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: BASE,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.whatsapp,
    image: {
      "@type": "ImageObject",
      url: `${BASE}${siteConfig.ogImage}`,
      width: 1200,
      height: 630,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MERN Stack",
      "Supabase",
      "JavaScript",
      "TypeScript",
      "Web Development",
      "Mobile App Development",
      "API Development",
      "Full Stack Development",
    ],
    sameAs: [
      siteConfig.linkedin,
      siteConfig.whatsappUrl,
    ].filter((u) => u && u !== "#"),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSIONAL SERVICE schema
// ─────────────────────────────────────────────────────────────────────────────
export function buildServiceSchema() {
  const offerServices = [
    { name: "Website Development", description: "High-performance, SEO-friendly websites for businesses, hospitals, and institutions." },
    { name: "Web Application Development", description: "Scalable web apps using React, Next.js, and Node.js." },
    { name: "Mobile App Development", description: "Android and cross-platform mobile apps." },
    { name: "MERN Stack Development", description: "Full-stack solutions using MongoDB, Express, React, and Node.js." },
    { name: "React Development", description: "Interactive UIs and SPAs built with React.js." },
    { name: "Node.js Development", description: "Robust backend APIs and server-side logic with Node.js." },
    { name: "API Development", description: "RESTful and GraphQL API design, development, and integration." },
    { name: "Dashboard Development", description: "Custom admin dashboards with real-time data visualization." },
    { name: "Admin Panel Development", description: "Secure, feature-rich admin panels for managing web applications." },
    { name: "SEO-Friendly Website Development", description: "Websites optimized from the ground up for Google search rankings." },
    { name: "Custom Software Development", description: "Tailored software solutions for unique business requirements." },
    { name: "UI/UX Development", description: "Modern, responsive, and accessible user interfaces and user experiences." },
  ];

  return clean({
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${BASE}/#service`,
    name: `${siteConfig.authorName} — ${siteConfig.jobTitle}`,
    alternateName: siteConfig.name,
    image: `${BASE}${siteConfig.ogImage}`,
    url: BASE,
    description: siteConfig.description,
    priceRange: "$$",
    currenciesAccepted: "INR, USD",
    paymentAccepted: "Bank Transfer, UPI, PayPal",
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    email: siteConfig.email,
    telephone: siteConfig.whatsapp,
    founder: { "@id": `${BASE}/#person` },
    employee: { "@id": `${BASE}/#person` },
    sameAs: [siteConfig.linkedin].filter((u) => u && u !== "#"),
    makesOffer: offerServices.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: { "@id": `${BASE}/#person` },
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: offerServices.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Service", name: s.name },
      })),
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// WEBSITE schema — enables Google Sitelinks Search Box
// ─────────────────────────────────────────────────────────────────────────────
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: `${siteConfig.authorName} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    publisher: { "@id": `${BASE}/#person` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BREADCRUMB schema — per page
// ─────────────────────────────────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ schema — for rich results
// ─────────────────────────────────────────────────────────────────────────────
interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT JSON-LD graph — for layout.tsx (global, all pages)
// ─────────────────────────────────────────────────────────────────────────────
export function buildRootSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonSchema(),
      buildServiceSchema(),
      buildWebSiteSchema(),
    ],
  };
}
