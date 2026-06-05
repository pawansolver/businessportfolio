import type { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Pawan.dev",
  tagline: "Independent Full Stack Developer",
  subtitle: "Helping businesses build modern digital experiences.",
  email: "pawankkr138@gmail.com",
  whatsapp: "+91 8709879987",
  whatsappUrl: "https://wa.me/918709879987",
  linkedin: "https://www.linkedin.com/in/pawan-kumar-7488pa",
  github: "#",
  bookCallUrl: "/#contact",

  // ── SEO ──
  // IMPORTANT: deploy ke baad apna real domain yahan daalo (ya .env mein NEXT_PUBLIC_SITE_URL set karo)
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.pawandev.com",
  authorName: "Pawan Kumar",
  jobTitle: "Full Stack Developer",
  location: "India",
  ogImage: "/tech-bg.png",
  twitterHandle: "@pawandev",
  description:
    "Pawan Kumar — Independent Full Stack Developer in India. I build high-performance, SEO-friendly websites, web & mobile apps, hospital and institute websites, admin panels, and run data-driven digital marketing to grow your business online.",
  keywords: [
    "Full Stack Developer",
    "Full Stack Developer India",
    "Freelance Web Developer",
    "Website Development",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Hospital Website Development",
    "Institute Website Development",
    "Business Website Development",
    "E-commerce Development",
    "Mobile App Development",
    "Android App Developer",
    "Admin Panel Development",
    "API Integration",
    "Digital Marketing",
    "SEO Services",
    "Google Ads",
    "Lead Generation",
    "Pawan Kumar Developer",
    "Pawan.dev",
  ],
};

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
