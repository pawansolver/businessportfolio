import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSEO, siteConfig } from "@/data/site";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildServicesListSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// Services Page Metadata
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.services.title,
  description: pageSEO.services.description,
  keywords: pageSEO.services.keywords,
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    type: "website",
    title: pageSEO.services.title,
    description: pageSEO.services.description,
    url: `${siteConfig.url}/services`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Web & App Development Services by Pawan Kumar — Full Stack Developer India",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: pageSEO.services.title,
    description: pageSEO.services.description,
    images: [siteConfig.ogImage],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Services page schemas (server-side)
// ─────────────────────────────────────────────────────────────────────────────
const webPage = buildWebPageSchema({
  type: "WebPage",
  url: `${siteConfig.url}/services`,
  name: pageSEO.services.title,
  description: pageSEO.services.description,
  speakableCssSelectors: ["h1", ".services-intro", ".service-card-title"],
  breadcrumbs: [
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
  ],
});

const servicesList = buildServicesListSchema();

const breadcrumb = buildBreadcrumbSchema([
  { name: "Home", url: siteConfig.url },
  { name: "Services", url: `${siteConfig.url}/services` },
]);

// ─────────────────────────────────────────────────────────────────────────────
// Services FAQ — Google FAQ rich results eligible (10 questions for coverage)
// ─────────────────────────────────────────────────────────────────────────────
const servicesFAQ = buildFAQSchema([
  {
    question: "What web development services does Pawan Kumar offer?",
    answer:
      "Pawan Kumar offers: Website Development, Web Application Development, Mobile App Development, React Development, Node.js Development, MERN Stack Development, API Development, Dashboard Development, Admin Panel Development, SEO-Friendly Website Development, UI/UX Development, and Custom Software Development.",
  },
  {
    question: "How much does it cost to hire Pawan Kumar for web development?",
    answer:
      "Pricing depends on project scope and complexity. Contact Pawan Kumar via WhatsApp or email for a free project estimate. He offers competitive rates for freelance projects with transparent, fixed-price agreements.",
  },
  {
    question: "What tech stack does Pawan Kumar use for web development?",
    answer:
      "Pawan Kumar works with React, Next.js, Node.js, Express.js, Supabase, PostgreSQL, MongoDB, TypeScript, Tailwind CSS, and Framer Motion. He specializes in MERN Stack and modern JAMstack architectures.",
  },
  {
    question: "Does Pawan Kumar build SEO-friendly websites?",
    answer:
      "Yes. Pawan Kumar builds SEO-friendly websites with technical SEO built-in: Schema.org structured data, Core Web Vitals optimization, Next.js metadata API, sitemap.xml, robots.txt, canonical URLs, and Google Search Console integration.",
  },
  {
    question: "Can Pawan Kumar build a hospital or healthcare website?",
    answer:
      "Yes. Pawan Kumar has experience building healthcare websites with appointment booking systems, doctor profiles, patient portals, and admin dashboards using Next.js and Node.js.",
  },
  {
    question: "Does Pawan Kumar offer admin panel development?",
    answer:
      "Yes. Pawan Kumar builds enterprise-grade admin panels with role-based access control, analytics dashboards, CMS functionality, user management, and real-time data features.",
  },
  {
    question: "Can Pawan Kumar develop mobile apps?",
    answer:
      "Yes. Pawan Kumar provides Android and cross-platform mobile app development with REST API backends, real-time features, and Supabase or Node.js integration.",
  },
  {
    question: "How long does it take to build a website with Pawan Kumar?",
    answer:
      "A typical business website takes 1–3 weeks. Web applications and MERN Stack projects typically take 3–8 weeks depending on complexity. Pawan Kumar provides clear timelines upfront.",
  },
  {
    question: "Is Pawan Kumar available for international clients?",
    answer:
      "Yes. Pawan Kumar works with clients worldwide — India, USA, UK, Australia, Canada, UAE, and more. He is available for remote freelance projects with flexible working hours.",
  },
  {
    question: "What is MERN Stack development?",
    answer:
      "MERN Stack is a full-stack JavaScript framework using MongoDB (database), Express.js (backend), React (frontend), and Node.js (runtime). Pawan Kumar specializes in building scalable MERN Stack applications for startups and enterprises.",
  },
]);

export default function ServicesPage() {
  void webPage;
  void servicesList;
  void breadcrumb;
  void servicesFAQ;
  redirect("/#services");
}
