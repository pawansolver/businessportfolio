import type { Metadata } from "next";
import { pageSEO, siteConfig } from "@/data/site";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildHowToSchema,
  buildFAQSchema,
} from "@/lib/schema";
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
// Page Metadata — overrides root layout defaults
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.home.title,
  description: pageSEO.home.description,
  keywords: pageSEO.home.keywords,
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },
  openGraph: {
    type: "profile",
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    url: siteConfig.url,
    firstName: "Pawan",
    lastName: "Kumar",
    username: "pawandev",
    gender: "male",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Pawan Kumar — Full Stack Developer | React, Node.js & MERN Stack",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    images: [siteConfig.ogImage],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Home Page — with WebPage + BreadcrumbList + HowTo + FAQ schema
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const breadcrumb = buildBreadcrumbSchema([{ name: "Home", url: siteConfig.url }]);

  const webPage = buildWebPageSchema({
    type: "WebPage",
    url: siteConfig.url,
    name: pageSEO.home.title,
    description: pageSEO.home.description,
    speakableCssSelectors: ["h1", ".hero-description", ".services-intro"],
    breadcrumbs: [{ name: "Home", url: siteConfig.url }],
  });

  // Home page FAQ for rich results
  const homeFAQ = buildFAQSchema([
    {
      question: "Who is Pawan Kumar?",
      answer:
        "Pawan Kumar is a Full Stack Developer in India with 3+ years of experience building React, Node.js, and MERN Stack web applications. He specializes in website development, mobile app development, API integration, and SEO-friendly websites.",
    },
    {
      question: "What services does Pawan Kumar offer?",
      answer:
        "Pawan Kumar offers Website Development, Web Application Development, Mobile App Development, MERN Stack Development, React Development, Node.js Development, API Development, Admin Panel Development, Dashboard Development, SEO-Friendly Website Development, and Custom Software Development.",
    },
    {
      question: "Is Pawan Kumar available for hire?",
      answer:
        "Yes, Pawan Kumar is available for freelance projects and long-term collaboration. You can contact him via WhatsApp at +91 8709879987, email at pawankkr138@gmail.com, or through the contact form on his website.",
    },
    {
      question: "What is Pawan Kumar's tech stack?",
      answer:
        "Pawan Kumar works with React, Next.js, Node.js, Express.js, Supabase, PostgreSQL, MongoDB, TypeScript, Tailwind CSS, and Framer Motion.",
    },
  ]);

  const howTo = buildHowToSchema();

  return (
    <>
      {/* ── Schema: WebPage — AI-search + Google indexing ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      {/* ── Schema: BreadcrumbList ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* ── Schema: FAQ Rich Results ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFAQ) }}
      />
      {/* ── Schema: HowTo — Development Process ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
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
