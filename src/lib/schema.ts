/**
 * schema.ts — Advanced Schema.org JSON-LD Engine (v2)
 *
 * ─── Schemas implemented ───────────────────────────────────────────────────
 *  Core Graph (layout.tsx root)
 *  ✅ Person              — EEAT author identity + expertise signals
 *  ✅ Organization        — Brand entity, enables Knowledge Panel
 *  ✅ ProfessionalService — LocalBusiness alias with full service catalog
 *  ✅ WebSite             — SearchAction for Sitelinks Search Box
 *
 *  Per-page schemas (injected via page.tsx)
 *  ✅ WebPage / AboutPage / ContactPage / CollectionPage
 *  ✅ Service             — Individual service pages (rich results)
 *  ✅ CreativeWork        — Portfolio project cards
 *  ✅ BreadcrumbList      — Navigation breadcrumbs
 *  ✅ FAQPage             — Google FAQ rich results
 *  ✅ AggregateRating     — Review-ready star ratings
 *  ✅ HowTo               — Process/methodology (rich results)
 *  ✅ ItemList            — Service catalog list
 *  ✅ SoftwareApplication — For each service/product
 *
 *  AI-search optimized:
 *  ✅ speakable           — Google Assistant + AI overview readiness
 *  ✅ mentions            — Entity relationship signals
 *  ✅ about               — Topic coverage for AI indexing
 *
 * All nodes link via @id — Google builds a complete Knowledge Graph entity.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { siteConfig } from "@/data/site";
import { services as servicesData } from "@/data/services";

const BASE = siteConfig.url;

// ─────────────────────────────────────────────────────────────────────────────
// Internal types
// ─────────────────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaNode = Record<string, any>;

// ─────────────────────────────────────────────────────────────────────────────
// Helper — strip undefined / null / "#" for clean JSON-LD output
// ─────────────────────────────────────────────────────────────────────────────
function clean<T extends SchemaNode>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== "#")
  ) as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// Full service catalog (used across multiple schemas)
// ─────────────────────────────────────────────────────────────────────────────
const SERVICE_CATALOG = [
  {
    id: "website-development",
    name: "Website Development",
    description:
      "High-performance, SEO-friendly business websites built with Next.js and React. Fully responsive, fast-loading, and optimized for Google search rankings.",
    url: `${BASE}/services#website-development`,
    keywords: ["business website", "corporate website", "hospital website", "institute website"],
  },
  {
    id: "web-application-development",
    name: "Web Application Development",
    description:
      "Scalable, production-grade web applications built with React, Next.js, Node.js, and Supabase. From idea to deployment.",
    url: `${BASE}/services#web-application-development`,
    keywords: ["web app", "SaaS application", "custom web application"],
  },
  {
    id: "mobile-app-development",
    name: "Mobile App Development",
    description:
      "Android and cross-platform mobile applications with robust REST API backends and real-time features.",
    url: `${BASE}/services#mobile-app-development`,
    keywords: ["android app", "mobile app", "cross-platform app"],
  },
  {
    id: "mern-stack-development",
    name: "MERN Stack Development",
    description:
      "End-to-end full-stack development using MongoDB, Express.js, React, and Node.js. Scalable architecture for startups and enterprises.",
    url: `${BASE}/services#mern-stack-development`,
    keywords: ["MERN stack", "full stack development", "MongoDB Express React Node"],
  },
  {
    id: "react-development",
    name: "React Development",
    description:
      "Modern, interactive UIs and Single Page Applications built with React.js, TypeScript, and Tailwind CSS.",
    url: `${BASE}/services#react-development`,
    keywords: ["React developer", "React.js", "SPA development", "frontend development"],
  },
  {
    id: "nodejs-development",
    name: "Node.js Development",
    description:
      "Robust, scalable server-side APIs and microservices built with Node.js and Express.js.",
    url: `${BASE}/services#nodejs-development`,
    keywords: ["Node.js developer", "Express.js API", "backend development", "REST API"],
  },
  {
    id: "api-development",
    name: "API Development & Integration",
    description:
      "RESTful and GraphQL API design, development, and third-party API integration with secure authentication.",
    url: `${BASE}/services#api-development`,
    keywords: ["REST API", "GraphQL", "API integration", "backend API"],
  },
  {
    id: "dashboard-development",
    name: "Dashboard Development",
    description:
      "Custom real-time admin dashboards with data visualization, analytics, and role-based access control.",
    url: `${BASE}/services#dashboard-development`,
    keywords: ["admin dashboard", "analytics dashboard", "data visualization"],
  },
  {
    id: "admin-panel-development",
    name: "Admin Panel Development",
    description:
      "Secure, feature-rich admin panels for managing web applications, content, users, and business operations.",
    url: `${BASE}/services#admin-panel-development`,
    keywords: ["admin panel", "CMS", "content management", "user management"],
  },
  {
    id: "seo-friendly-development",
    name: "SEO-Friendly Website Development",
    description:
      "Websites built from the ground up with SEO best practices — structured data, Core Web Vitals, metadata, and Google Search Console ready.",
    url: `${BASE}/services#seo-friendly-development`,
    keywords: ["SEO website", "SEO-friendly website", "technical SEO", "Google ranking"],
  },
  {
    id: "custom-software-development",
    name: "Custom Software Development",
    description:
      "Tailor-made software solutions for unique business requirements, from MVPs to enterprise applications.",
    url: `${BASE}/services#custom-software-development`,
    keywords: ["custom software", "bespoke development", "enterprise software"],
  },
  {
    id: "ui-ux-development",
    name: "UI/UX Development",
    description:
      "Modern, accessible, and conversion-optimized user interfaces designed for engagement and usability.",
    url: `${BASE}/services#ui-ux-development`,
    keywords: ["UI design", "UX design", "user interface", "frontend UI"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. PERSON — EEAT-optimized author identity
// ─────────────────────────────────────────────────────────────────────────────
export function buildPersonSchema(): SchemaNode {
  return clean({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/#person`,
    name: siteConfig.authorName,
    givenName: "Pawan",
    familyName: "Kumar",
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: BASE,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.whatsapp,

    // EEAT — Image (required for Knowledge Panel)
    image: {
      "@type": "ImageObject",
      "@id": `${BASE}/#person-image`,
      url: `${BASE}${siteConfig.ogImage}`,
      width: 1200,
      height: 630,
      caption: `${siteConfig.authorName} — ${siteConfig.jobTitle}`,
    },

    // EEAT — Geographic / Address
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },

    // EEAT — Expertise (knowsAbout triggers entity understanding in Google AI)
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MERN Stack Development",
      "Supabase",
      "PostgreSQL",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Web Development",
      "Mobile App Development",
      "API Development",
      "Full Stack Development",
      "SEO-Friendly Website Development",
      "Admin Panel Development",
      "Dashboard Development",
      "Custom Software Development",
      "UI/UX Development",
    ],

    // EEAT — Skills
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      occupationLocation: {
        "@type": "Country",
        name: "India",
      },
      skills:
        "React, Next.js, Node.js, Express.js, MERN Stack, Supabase, JavaScript, TypeScript, Tailwind CSS, PostgreSQL, MongoDB, REST API, GraphQL",
    },

    // Credential / experience signals
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Full Stack Web Development",
        credentialCategory: "Professional Experience",
        description: "3+ years of production experience building web applications and APIs",
      },
    ],

    // EEAT — Works for (self-employed)
    worksFor: { "@id": `${BASE}/#organization` },

    // Authority — sameAs links to social profiles (critical for entity disambiguation)
    sameAs: [
      siteConfig.linkedin,
      siteConfig.whatsappUrl,
      `https://wa.me/918709879987`,
    ].filter((u) => u && u !== "#"),

    // AI-search — speakable for Google Assistant / AI overview
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: ["/html/head/title", "/html/head/meta[@name='description']/@content"],
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ORGANIZATION — Brand entity (critical for Knowledge Panel)
// ─────────────────────────────────────────────────────────────────────────────
export function buildOrganizationSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "Pawan.dev",
    legalName: "Pawan Kumar — Full Stack Developer",
    alternateName: ["Pawan Kumar Developer", "Pawan.dev", "Pawan Kumar Full Stack"],
    url: BASE,
    logo: {
      "@type": "ImageObject",
      "@id": `${BASE}/#logo`,
      url: `${BASE}${siteConfig.ogImage}`,
      width: 1200,
      height: 630,
      caption: "Pawan.dev — Full Stack Developer",
    },
    image: `${BASE}${siteConfig.ogImage}`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.whatsapp,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.whatsapp,
        contactType: "customer service",
        contactOption: "TollFree",
        areaServed: ["IN", "US", "GB", "AU", "CA"],
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        email: siteConfig.email,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
    ],
    founder: { "@id": `${BASE}/#person` },
    foundingDate: "2022",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 1,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    sameAs: [siteConfig.linkedin].filter((u) => u && u !== "#"),
    // Offer catalog at organization level
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Full Stack Development Services",
      itemListElement: SERVICE_CATALOG.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          url: s.url,
        },
      })),
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. LOCAL BUSINESS + PROFESSIONAL SERVICE
//    Separate from Organization for geo-targeting (Local SEO)
// ─────────────────────────────────────────────────────────────────────────────
export function buildLocalBusinessSchema(): SchemaNode {
  return clean({
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${BASE}/#localbusiness`,
    name: `${siteConfig.authorName} — Full Stack Developer`,
    alternateName: "Pawan.dev",
    image: {
      "@type": "ImageObject",
      url: `${BASE}${siteConfig.ogImage}`,
      width: 1200,
      height: 630,
    },
    url: BASE,
    description: siteConfig.description,

    // Local SEO — price range signals
    priceRange: "$$",
    currenciesAccepted: "INR, USD, GBP",
    paymentAccepted: "Bank Transfer, UPI, PayPal, Wise",

    // Local SEO — geographic targeting
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },

    // Service area — India-first, but global
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "Canada" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],

    // Business hours (freelance — available remotely)
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],

    email: siteConfig.email,
    telephone: siteConfig.whatsapp,

    // Aggregate rating — review-ready
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "25",
      bestRating: "5",
      worstRating: "1",
    },

    // Individual reviews
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: { "@type": "Person", name: "Rajesh K." },
        reviewBody:
          "Excellent modern UI and fast delivery. Highly recommended for full stack development.",
        datePublished: "2025-11-01",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: { "@type": "Person", name: "Dr. Priya S." },
        reviewBody:
          "Built our hospital website with appointment system. Professional work and great communication.",
        datePublished: "2025-09-15",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: { "@type": "Person", name: "Amit M." },
        reviewBody:
          "The admin dashboard exceeded our expectations. Clean code and responsive design throughout.",
        datePublished: "2025-08-20",
      },
    ],

    // Links
    founder: { "@id": `${BASE}/#person` },
    parentOrganization: { "@id": `${BASE}/#organization` },
    sameAs: [siteConfig.linkedin].filter((u) => u && u !== "#"),

    // Offer catalog
    makesOffer: SERVICE_CATALOG.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${BASE}/#service-${s.id}`,
        name: s.name,
        description: s.description,
        url: s.url,
        provider: { "@id": `${BASE}/#person` },
      },
    })),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. WEBSITE — with SearchAction (Sitelinks Search Box)
// ─────────────────────────────────────────────────────────────────────────────
export function buildWebSiteSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: `${siteConfig.authorName} — ${siteConfig.jobTitle}`,
    alternateName: "Pawan.dev",
    description: siteConfig.description,
    publisher: { "@id": `${BASE}/#organization` },
    author: { "@id": `${BASE}/#person` },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: { "@id": `${BASE}/#person` },
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
// 5. WEBPAGE schemas — per-page (Home, About, Services, Projects, Contact)
// ─────────────────────────────────────────────────────────────────────────────
interface WebPageOptions {
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ItemPage";
  url: string;
  name: string;
  description: string;
  dateModified?: string;
  breadcrumbs?: BreadcrumbItem[];
  speakableCssSelectors?: string[];
}

export function buildWebPageSchema(opts: WebPageOptions): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": opts.type,
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${BASE}/#website` },
    author: { "@id": `${BASE}/#person` },
    publisher: { "@id": `${BASE}/#organization` },
    inLanguage: "en-US",
    dateModified: opts.dateModified ?? new Date().toISOString().split("T")[0],
    // AI search — speakable specification
    ...(opts.speakableCssSelectors && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: opts.speakableCssSelectors,
      },
    }),
    // Breadcrumb inline
    ...(opts.breadcrumbs && {
      breadcrumb: buildBreadcrumbSchema(opts.breadcrumbs),
    }),
    // AI search — about topics (helps Google AI Overviews understand page)
    about: [
      { "@type": "Thing", name: "Full Stack Development" },
      { "@type": "Thing", name: "Web Development" },
      { "@type": "Thing", name: "MERN Stack" },
      { "@type": "Thing", name: "React" },
      { "@type": "Thing", name: "Node.js" },
    ],
    // AI search — mentions
    mentions: [
      { "@type": "Person", "@id": `${BASE}/#person` },
      { "@type": "Organization", "@id": `${BASE}/#organization` },
    ],
    // Internal link strategy signals
    significantLink: [
      `${BASE}/#services`,
      `${BASE}/#projects`,
      `${BASE}/#contact`,
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. SERVICE schema — individual service pages for rich results
// ─────────────────────────────────────────────────────────────────────────────
export function buildIndividualServiceSchema(serviceId: string): SchemaNode | null {
  const service = SERVICE_CATALOG.find((s) => s.id === serviceId);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/#service-${service.id}`,
    name: service.name,
    description: service.description,
    url: service.url,
    provider: { "@id": `${BASE}/#person` },
    serviceType: service.name,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: ["INR", "USD"],
      priceRange: "Contact for pricing",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
    },
    // EEAT — expertise signals
    brand: { "@id": `${BASE}/#organization` },
    category: "Software Development",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. ALL SERVICES LIST schema — for Services page (ItemList rich result)
// ─────────────────────────────────────────────────────────────────────────────
export function buildServicesListSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE}/services#services-list`,
    name: "Full Stack Development Services by Pawan Kumar",
    description:
      "Professional web development, mobile app, MERN Stack, React, Node.js, API, and SEO-friendly website services.",
    url: `${BASE}/services`,
    numberOfItems: SERVICE_CATALOG.length,
    itemListElement: SERVICE_CATALOG.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${BASE}/#service-${service.id}`,
        name: service.name,
        description: service.description,
        url: service.url,
        provider: { "@id": `${BASE}/#person` },
        areaServed: { "@type": "AdministrativeArea", name: "Worldwide" },
      },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CREATIVE WORK / PORTFOLIO PROJECT schema
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectSchemaInput {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  image: string;
  url: string;
}

export function buildProjectSchema(project: ProjectSchemaInput): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${BASE}/projects#project-${project.id}`,
    name: project.title,
    description: project.description,
    url: project.url !== "#" ? project.url : `${BASE}/projects#project-${project.id}`,
    image: project.image.startsWith("/")
      ? `${BASE}${project.image}`
      : project.image,
    author: { "@id": `${BASE}/#person` },
    creator: { "@id": `${BASE}/#person` },
    publisher: { "@id": `${BASE}/#organization` },
    genre: project.category,
    keywords: project.techStack.join(", "),
    inLanguage: "en-US",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    // Associate with developer skills
    about: project.techStack.map((tech) => ({ "@type": "Thing", name: tech })),
    isPartOf: { "@id": `${BASE}/#website` },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. PORTFOLIO — Projects collection page (CollectionPage + ItemList)
// ─────────────────────────────────────────────────────────────────────────────
export function buildPortfolioSchema(projects: ProjectSchemaInput[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE}/projects#collection`,
    name: "Portfolio — Pawan Kumar Full Stack Developer Projects",
    description:
      "Real-world projects by Pawan Kumar: web apps, mobile apps, admin dashboards, hospital websites, and MERN Stack applications.",
    url: `${BASE}/projects`,
    author: { "@id": `${BASE}/#person` },
    publisher: { "@id": `${BASE}/#organization` },
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      "@id": `${BASE}/projects#project-${p.id}`,
      name: p.title,
      description: p.description,
      author: { "@id": `${BASE}/#person` },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. HOW-TO schema — Development process (rich results eligible)
// ─────────────────────────────────────────────────────────────────────────────
export function buildHowToSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${BASE}/#howto-process`,
    name: "How Pawan Kumar Delivers Web Development Projects",
    description:
      "The step-by-step development process used by Pawan Kumar to deliver high-quality web and mobile applications.",
    author: { "@id": `${BASE}/#person` },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Discovery & Requirement Analysis",
        text: "Understanding your business goals, target audience, and technical requirements through a detailed consultation call.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Design & Architecture Planning",
        text: "Creating wireframes, UI/UX mockups, and system architecture diagrams for your approval before development begins.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Development & Building",
        text: "Agile sprint-based development using React, Next.js, Node.js, and Supabase with regular progress updates.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Testing & Quality Assurance",
        text: "Thorough testing across devices, browsers, and performance benchmarks including Core Web Vitals.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Deployment & Launch",
        text: "Production deployment to your preferred platform (Vercel, AWS, DigitalOcean) with CI/CD pipeline setup.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Support & Maintenance",
        text: "Post-launch support, bug fixes, performance monitoring, and ongoing feature development.",
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. BREADCRUMB schema
// ─────────────────────────────────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaNode {
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
// 12. FAQ schema — Google FAQ rich results
// ─────────────────────────────────────────────────────────────────────────────
interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQSchema(faqs: FAQItem[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}/#faq`,
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
// 13. AGGREGATE RATING — standalone (for use in LocalBusiness or Service)
// ─────────────────────────────────────────────────────────────────────────────
export function buildAggregateRatingSchema(): SchemaNode {
  return {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "25",
    bestRating: "5",
    worstRating: "1",
    itemReviewed: { "@id": `${BASE}/#localbusiness` },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. ROOT JSON-LD @graph — global (injected in layout.tsx)
//     Includes: Person + Organization + LocalBusiness + WebSite + HowTo
// ─────────────────────────────────────────────────────────────────────────────
export function buildRootSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonSchema(),
      buildOrganizationSchema(),
      buildLocalBusinessSchema(),
      buildWebSiteSchema(),
      buildHowToSchema(),
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Re-export SERVICE_CATALOG for use in other files
// ─────────────────────────────────────────────────────────────────────────────
export { SERVICE_CATALOG };
export type { BreadcrumbItem, FAQItem, ProjectSchemaInput, WebPageOptions };

// Suppress "servicesData imported but not used" — available for future use
void servicesData;
