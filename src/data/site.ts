import type { NavLink, SocialLink } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — Single source of truth for SEO, schema, metadata, EEAT
// Update NEXT_PUBLIC_SITE_URL in .env.local / deployment environment vars
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Pawan.dev",
  authorName: "Pawan Kumar",
  jobTitle: "Full Stack Developer",
  tagline: "Independent Full Stack Developer",
  subtitle: "Helping businesses build modern, high-performance digital experiences.",
  location: "India",
  foundingYear: "2022",

  // ── Contact ───────────────────────────────────────────────────────────────
  email: "pawankkr138@gmail.com",
  whatsapp: "+91 8709879987",
  whatsappUrl: "https://wa.me/918709879987",
  linkedin: "https://www.linkedin.com/in/pawan-kumar-7488pa",
  github: "#",
  twitterHandle: "@pawandev",
  bookCallUrl: "/#contact",

  // ── SEO Core ──────────────────────────────────────────────────────────────
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.pawandev.com",
  ogImage: "/tech-bg.png",
  themeColor: "#d4ff00",

  // ── Meta Description (155–160 chars) ──────────────────────────────────────
  description:
    "Pawan Kumar — Full Stack Developer in India specializing in React, Node.js, MERN Stack, Web & Mobile App Development, API Integration, and SEO-Friendly Websites. Available for freelance projects.",

  // ── Keywords — high-value, zero stuffing ──────────────────────────────────
  keywords: [
    "Pawan Kumar Developer",
    "Pawan.dev",
    "Full Stack Developer India",
    "Freelance Full Stack Developer",
    "Website Development",
    "Web Application Development",
    "Business Website Development",
    "SEO Friendly Website Development",
    "Custom Website Development",
    "React Developer",
    "React.js Developer India",
    "Next.js Developer",
    "UI UX Development",
    "Frontend Developer",
    "Node.js Developer",
    "Express.js Developer",
    "MERN Stack Developer",
    "MERN Stack Development India",
    "API Development",
    "REST API Developer",
    "Mobile App Development",
    "Android App Developer India",
    "Supabase Developer",
    "PostgreSQL Developer",
    "Custom Software Development",
    "Dashboard Development",
    "Admin Panel Development",
    "Full Stack Development Services",
    "Freelance Developer India",
    "Hire Full Stack Developer India",
    "Web Developer India",
    "React Developer India",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EEAT SIGNALS — Experience, Expertise, Authoritativeness, Trustworthiness
// Used in Person schema, About page, and AI-search optimization
// ─────────────────────────────────────────────────────────────────────────────
export const eeatSignals = {
  // Experience
  yearsOfExperience: 3,
  projectsCompleted: 50,
  clientsServed: 30,
  countriesServed: ["India", "US", "UK", "Australia", "Canada"],

  // Expertise areas (maps to knowsAbout in Person schema)
  expertise: [
    { area: "React & Next.js Development", level: "Expert", years: 3 },
    { area: "Node.js & Express.js", level: "Expert", years: 3 },
    { area: "MERN Stack", level: "Expert", years: 2 },
    { area: "Supabase & PostgreSQL", level: "Advanced", years: 2 },
    { area: "TypeScript", level: "Advanced", years: 2 },
    { area: "Mobile App Development", level: "Intermediate", years: 1 },
    { area: "SEO & Technical SEO", level: "Advanced", years: 2 },
    { area: "UI/UX Design Systems", level: "Advanced", years: 3 },
  ],

  // Trust signals
  trustSignals: [
    "3+ years of production experience",
    "50+ projects delivered",
    "100% client satisfaction",
    "Fast turnaround (2–4 weeks average)",
    "Clean, documented, maintainable code",
    "India-based, globally available",
    "WhatsApp & email support",
    "Post-delivery support included",
  ],

  // Social profiles (for sameAs + authority)
  socialProfiles: {
    linkedin: "https://www.linkedin.com/in/pawan-kumar-7488pa",
    github: "#",
    whatsapp: "https://wa.me/918709879987",
  },

  // Credentials / certifications (for schema and About page)
  credentials: [
    {
      name: "Full Stack Web Development",
      issuer: "Self-Taught + Project Experience",
      year: "2022",
      description: "3+ years building production React/Node.js applications",
    },
    {
      name: "MERN Stack Development",
      issuer: "Production Experience",
      year: "2023",
      description: "Enterprise-grade MERN applications for hospitals, institutes, and businesses",
    },
    {
      name: "Technical SEO Implementation",
      issuer: "Industry Practice",
      year: "2024",
      description: "Schema.org, Core Web Vitals, Next.js SEO, and Google Search Console",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE-LEVEL SEO — optimized titles, descriptions, keywords per route
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
      "Learn about Pawan Kumar, an experienced Full Stack Developer with expertise in React, Node.js, Express, Supabase, and MERN Stack. 50+ projects delivered. Building scalable digital products globally.",
    keywords: [
      "About Pawan Kumar",
      "Full Stack Developer Biography",
      "MERN Stack Expert India",
      "React Node.js Developer Profile",
      "Freelance Developer Experience",
      "Pawan Kumar Portfolio",
    ],
  },
  services: {
    title: "Web & App Development Services — Pawan Kumar | Full Stack Developer",
    description:
      "Explore professional web development, mobile app development, MERN Stack, React, Node.js, API development, admin panel, and SEO-friendly website services by Pawan Kumar. Available for freelance.",
    keywords: [
      "Web Development Services India",
      "Mobile App Development Services",
      "MERN Stack Development Services",
      "React Development Services",
      "Node.js Development Services",
      "API Development Services",
      "Admin Panel Development",
      "Custom Software Development India",
      "Hire Web Developer India",
    ],
  },
  projects: {
    title: "Projects & Portfolio — Pawan Kumar | Full Stack Developer",
    description:
      "Browse 50+ real-world projects by Pawan Kumar: web apps, mobile apps, hospital websites, admin panels, business dashboards, and MERN Stack applications.",
    keywords: [
      "Full Stack Developer Portfolio",
      "React Projects Portfolio",
      "Node.js Projects",
      "MERN Stack Portfolio India",
      "Web Developer Portfolio",
      "Hospital Website Project",
      "Admin Dashboard Project",
    ],
  },
  contact: {
    title: "Hire Pawan Kumar — Full Stack Developer in India | Get a Free Quote",
    description:
      "Start your project with Pawan Kumar. Get a free consultation for web development, mobile apps, or MERN Stack projects. Fast response via WhatsApp or email. India-based, globally available.",
    keywords: [
      "Hire Full Stack Developer India",
      "Contact Web Developer India",
      "Freelance Developer for Hire",
      "Get Web Development Quote",
      "MERN Stack Developer Contact",
      "React Developer Freelance India",
      "Free Consultation Web Development",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HEADINGS — H1/H2/H3 (use in section components for on-page SEO)
// ─────────────────────────────────────────────────────────────────────────────
export const headings = {
  home: {
    h1: "Full Stack Developer — React, Node.js & MERN Stack",
    h2s: [
      "Services I Offer",
      "Featured Projects & Case Studies",
      "My Development Process",
      "Tech Stack & Tools I Use",
      "What Clients Say",
      "Ready to Build Something Great?",
    ],
  },
  about: {
    h1: "About Me — Pawan Kumar, Full Stack Developer in India",
    h2s: [
      "My Skills & Technical Expertise",
      "My Development Philosophy",
      "Certifications & Experience",
      "Why Choose Me",
    ],
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
      "SEO-Friendly Website Development",
      "Custom Software Solutions",
    ],
    h3s: [
      "Business Website Development",
      "E-Commerce Website Development",
      "Admin Panel & Dashboard Development",
      "REST API & Backend Development",
      "Full Stack React + Node.js Applications",
      "Supabase & PostgreSQL Integration",
    ],
  },
  projects: {
    h1: "My Portfolio — Real-World Projects & Case Studies",
    h2s: [
      "Web Applications",
      "Mobile Apps",
      "Business Websites",
      "Admin Dashboards",
    ],
  },
  contact: {
    h1: "Let's Work Together — Hire a Full Stack Developer",
    h2s: [
      "Send Me a Message",
      "Schedule a Free Consultation",
      "Contact Details & Availability",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// AI SEARCH OPTIMIZATION
// Content structured for Google AI Overviews, Bing Copilot, Perplexity, ChatGPT
// ─────────────────────────────────────────────────────────────────────────────
export const aiSearchContent = {
  // Who is Pawan Kumar? (AI-digestible entity description)
  entityDescription:
    "Pawan Kumar is an India-based Full Stack Developer with 3+ years of experience building web applications, mobile apps, and MERN Stack solutions. He specializes in React, Next.js, Node.js, Express.js, Supabase, and TypeScript. Available for freelance projects worldwide.",

  // Key facts for AI overview cards
  keyFacts: [
    { label: "Role", value: "Full Stack Developer" },
    { label: "Location", value: "India (Remote Worldwide)" },
    { label: "Experience", value: "3+ Years" },
    { label: "Projects", value: "50+" },
    { label: "Tech Stack", value: "React, Next.js, Node.js, MERN, Supabase" },
    { label: "Specialization", value: "Web Apps, Mobile Apps, SEO Websites" },
    { label: "Available For", value: "Freelance & Long-term Collaboration" },
    { label: "Contact", value: "WhatsApp, Email, LinkedIn" },
  ],

  // Topical authority clusters (for AI content understanding)
  topicClusters: {
    primary: "Full Stack Web Development",
    secondary: [
      "React Development",
      "Node.js Development",
      "MERN Stack Development",
      "Web Application Development",
      "Mobile App Development",
    ],
    tertiary: [
      "SEO-Friendly Website Development",
      "API Development",
      "Admin Panel Development",
      "Dashboard Development",
      "Supabase Integration",
      "Custom Software Development",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSION SEO — CTAs, lead gen optimization
// ─────────────────────────────────────────────────────────────────────────────
export const conversionSEO = {
  primaryCTA: {
    text: "Hire Me — Get a Free Quote",
    subtext: "Reply within 2 hours on WhatsApp",
    href: siteConfig.whatsappUrl,
    urgency: "Available for new projects",
  },
  secondaryCTA: {
    text: "View My Work",
    href: "/#projects",
  },
  contactCTAs: [
    {
      channel: "WhatsApp",
      text: "Chat on WhatsApp",
      href: siteConfig.whatsappUrl,
      responseTime: "~2 hours",
    },
    {
      channel: "Email",
      text: "Send an Email",
      href: `mailto:${siteConfig.email}`,
      responseTime: "~24 hours",
    },
    {
      channel: "LinkedIn",
      text: "Connect on LinkedIn",
      href: siteConfig.linkedin,
      responseTime: "~24 hours",
    },
  ],
  freeOffers: [
    "Free 30-minute consultation call",
    "Free project estimate",
    "Free SEO audit of your existing website",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL SEO — India geo-targeting and service areas
// ─────────────────────────────────────────────────────────────────────────────
export const localSEO = {
  primaryCountry: "India",
  coordinates: { lat: 20.5937, lng: 78.9629 },
  serviceAreas: [
    "India (Remote)",
    "United States",
    "United Kingdom",
    "Australia",
    "Canada",
    "Singapore",
    "UAE",
    "Worldwide Remote",
  ],
  localKeywords: [
    "Full Stack Developer India",
    "Web Developer India Remote",
    "React Developer India Freelance",
    "Node.js Developer India",
    "MERN Stack Developer India",
    "Hire Indian Web Developer",
    "Affordable Full Stack Developer India",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL LINKING STRATEGY
// Home → Services → Projects → Contact
// ─────────────────────────────────────────────────────────────────────────────
export const internalLinks = {
  fromHome: [
    { anchor: "My Services", href: "/#services", purpose: "service discovery" },
    { anchor: "View Projects", href: "/#projects", purpose: "social proof" },
    { anchor: "Hire Me", href: "/#contact", purpose: "conversion" },
    { anchor: "About Me", href: "/#about", purpose: "EEAT trust" },
  ],
  fromServices: [
    { anchor: "See My Projects", href: "/#projects", purpose: "proof of work" },
    { anchor: "Get a Free Quote", href: "/#contact", purpose: "conversion" },
    { anchor: "About Pawan Kumar", href: "/#about", purpose: "EEAT" },
  ],
  fromProjects: [
    { anchor: "Start Your Project", href: "/#contact", purpose: "conversion" },
    { anchor: "Explore Services", href: "/#services", purpose: "service upsell" },
  ],
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
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks: SocialLink[] = [
  { platform: "email", url: "mailto:pawankkr138@gmail.com", label: "Email" },
  { platform: "whatsapp", url: "https://wa.me/918709879987", label: "WhatsApp" },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/pawan-kumar-7488pa",
    label: "LinkedIn",
  },
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
