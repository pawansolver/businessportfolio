import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSEO, siteConfig } from "@/data/site";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// Services Page Metadata
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.services.title,
  description: pageSEO.services.description,
  keywords: pageSEO.services.keywords,
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: pageSEO.services.title,
    description: pageSEO.services.description,
    url: `${siteConfig.url}/services`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Web & App Development Services by Pawan Kumar",
      },
    ],
  },
  twitter: {
    title: pageSEO.services.title,
    description: pageSEO.services.description,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Services FAQ — eligible for Google FAQ rich results
// ─────────────────────────────────────────────────────────────────────────────
const servicesFAQ = buildFAQSchema([
  {
    question: "What web development services does Pawan Kumar offer?",
    answer:
      "Pawan Kumar offers a full range of web development services including Website Development, Web Application Development, Mobile App Development, React Development, Node.js Development, MERN Stack Development, API Development, Dashboard Development, Admin Panel Development, SEO-Friendly Website Development, and Custom Software Development.",
  },
  {
    question: "What tech stack does Pawan Kumar use?",
    answer:
      "Pawan Kumar works with React, Next.js, Node.js, Express.js, Supabase, JavaScript, TypeScript, and Tailwind CSS. He is experienced in full-stack MERN Stack development and PostgreSQL/Supabase database management.",
  },
  {
    question: "Is Pawan Kumar available for freelance projects?",
    answer:
      "Yes, Pawan Kumar is available for freelance projects across web development, mobile app development, and custom software development. You can contact him via the website or WhatsApp.",
  },
  {
    question: "Does Pawan Kumar build SEO-friendly websites?",
    answer:
      "Yes. Pawan Kumar specializes in building SEO-friendly websites from the ground up using Next.js with optimized metadata, Schema.org structured data, fast load times, and technical SEO best practices.",
  },
  {
    question: "Can Pawan Kumar build mobile apps?",
    answer:
      "Yes. Pawan Kumar provides mobile app development services including Android apps and cross-platform mobile applications integrated with REST APIs and cloud backends.",
  },
]);

export default function ServicesPage() {
  void servicesFAQ;
  redirect("/#services");
}
