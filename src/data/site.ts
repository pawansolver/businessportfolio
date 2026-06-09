import type { NavLink, SocialLink } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — single source of truth for all SEO, schema, and metadata
// Update NEXT_PUBLIC_SITE_URL in your .env.local / deployment environment vars
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Pawan.dev",
  authorName: "Pawan Kumar",
  jobTitle: "Full Stack Developer",
  tagline: "Independent Full Stack Developer",
  subtitle: "Helping businesses build modern, high-performance digital experiences.",
  location: "India",

  // ── Contact ───────────────────────────────────────────────────────────────
  email: "pawankkr138@gmail.com",
  whatsapp: "+91 8709879987",
  whatsappUrl: "https://wa.me/918709879987",
  linkedin: "https://www.linkedin.com/in/pawan-kumar-7488pa",
  github: "#",
  twitterHandle: "@pawandev",
  bookCallUrl: "/#contact",

  // ── SEO core ──────────────────────────────────────────────────────────────
  // Set NEXT_PUBLIC_SITE_URL in .env.local once your domain is live
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.pawandev.com",
  ogImage: "/tech-bg.png",       // 1200×630 recommended
  themeColor: "#d4ff00",

  // ── Primary meta description (155–160 chars for Google) ───────────────────
  description:
    "Pawan Kumar — Full Stack Developer in India specializing in React, Node.js, MERN Stack, Web & Mobile App Development, API Integration, and SEO-Friendly Websites. Available for freelance projects.",

  // ── Keywords — high-value, zero-stuffing ──────────────────────────────────
  keywords: [
    // Core identity
    "Pawan Kumar Developer",
    "Pawan.dev",
    "Full Stack Developer India",
    "Freelance Full Stack Developer",

    // Web development
    "Website Development",
    "Web Application Development",
    "Business Website Development",
    "SEO Friendly Website Development",
    "Custom Website Development",

    // Frontend
    "React Developer",
    "React.js Developer India",
    "Next.js Developer",
    "UI UX Development",
    "Frontend Developer",

    // Backend
    "Node.js Developer",
    "Express.js Developer",
    "MERN Stack Developer",
    "MERN Stack Development India",
    "API Development",
    "REST API Developer",

    // Mobile
    "Mobile App Development",
    "Android App Developer India",

    // Database
    "Supabase Developer",
    "PostgreSQL Developer",

    // Software
    "Custom Software Development",
    "Dashboard Development",
    "Admin Panel Development",
    "Full Stack Development Services",

    // Geo-targeted
    "Freelance Developer India",
    "Hire Full Stack Developer India",
    "Web Developer India",
    "React Developer India",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE-LEVEL SEO — titles & descriptions for every route
// Used by generateMetadata() in each page
// ─────────────────────────────────────────────────────────────────────────────
export const pageSEO = {
  home: {
    title: "Pawan Kumar — Full Stack Developer | React, Node.js & MERN Stack",
    description:
      "Hire Pawan Kumar, an expert Full Stack Developer in India. I build high-performance React apps, Node.js backends, MERN Stack solutions, mobile apps, and SEO-friendly business websites.",
    keywords: [
      "Full Stack Developer India",
      "MERN Stack Developer",
      "React Developer India",
      "Node.js Developer",
      "Hire Full Stack Developer",
      "Web Application Developer India",
    ],
  },
  about: {
    title: "About Pawan Kumar — Full Stack & MERN Stack Developer in India",
    description:
      "Learn about Pawan Kumar, an experienced Full Stack Developer with expertise in React, Node.js, Express, Supabase, and MERN Stack. Building scalable digital products for businesses worldwide.",
    keywords: [
      "About Pawan Kumar",
      "Full Stack Developer Biography",
      "MERN Stack Expert",
      "React Node.js Developer",
      "Freelance Developer Profile",
    ],
  },
  services: {
    title: "Web & App Development Services — Pawan Kumar | Full Stack Developer",
    description:
      "Explore professional web development, mobile app development, MERN Stack, React, Node.js, API development, admin panel, and SEO-friendly website services by Pawan Kumar.",
    keywords: [
      "Web Development Services India",
      "Mobile App Development Services",
      "MERN Stack Development",
      "React Development Services",
      "API Development Services",
      "Admin Panel Development",
      "Custom Software Development",
    ],
  },
  projects: {
    title: "Projects & Portfolio — Pawan Kumar | Full Stack Developer",
    description:
      "Browse Pawan Kumar's portfolio of real-world projects: web apps, mobile apps, admin panels, business websites, dashboards, and MERN Stack applications.",
    keywords: [
      "Full Stack Developer Portfolio",
      "React Projects",
      "Node.js Projects",
      "MERN Stack Portfolio",
      "Web Developer Portfolio India",
      "App Development Portfolio",
    ],
  },
  contact: {
    title: "Contact Pawan Kumar — Hire a Full Stack Developer in India",
    description:
      "Get in touch with Pawan Kumar to discuss your web development, mobile app, or MERN Stack project. Available for freelance and long-term collaboration.",
    keywords: [
      "Hire Full Stack Developer India",
      "Contact Web Developer India",
      "Freelance Developer for Hire",
      "MERN Stack Developer Contact",
      "Web Development Quote India",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// OPTIMIZED HEADINGS — H1, H2, H3 for each page section
// ─────────────────────────────────────────────────────────────────────────────
export const headings = {
  home: {
    h1: "Full Stack Developer — React, Node.js & MERN Stack",
    h2s: [
      "Services I Offer",
      "Featured Projects",
      "My Development Process",
      "Tech Stack & Tools",
      "What Clients Say",
      "Let's Build Something Great",
    ],
  },
  about: {
    h1: "About Me — Pawan Kumar, Full Stack Developer in India",
    h2s: ["My Skills & Expertise", "My Development Philosophy", "Certifications & Experience"],
  },
  services: {
    h1: "Professional Web & App Development Services",
    h2s: [
      "Website Development",
      "Web Application Development",
      "Mobile App Development",
      "MERN Stack Development",
      "React & Node.js Development",
      "API & Dashboard Development",
      "SEO-Friendly Development",
      "Custom Software Solutions",
    ],
    h3s: [
      "Business Website Development",
      "E-Commerce Website Development",
      "Admin Panel & Dashboard Development",
      "REST API & Backend Development",
      "Full Stack React + Node.js Apps",
      "Supabase & PostgreSQL Integration",
    ],
  },
  projects: {
    h1: "My Portfolio — Real-World Projects & Case Studies",
    h2s: ["Web Applications", "Mobile Apps", "Business Websites", "Admin Dashboards"],
  },
  contact: {
    h1: "Let's Work Together — Hire a Full Stack Developer",
    h2s: ["Send Me a Message", "Schedule a Free Consultation", "Contact Details"],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "/#hero" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const footerLinks: NavLink[] = [
  { label: "Home", href: "/#hero" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks: SocialLink[] = [
  { platform: "email", url: "mailto:pawankkr138@gmail.com", label: "Email" },
  { platform: "whatsapp", url: "https://wa.me/918709879987", label: "WhatsApp" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/pawan-kumar-7488pa", label: "LinkedIn" },
  { platform: "github", url: "#", label: "GitHub" },
];

export const trustLogos = [
  "MediCare+",
  "EduInstitute",
  "StartupHub",
  "LocalBiz",
  "TechNova",
  "HealthFirst",
];
