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
