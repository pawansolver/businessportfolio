import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSEO, siteConfig, conversionSEO } from "@/data/site";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// Contact Page — Conversion-optimized metadata with hire-intent keywords
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.contact.title,
  description: pageSEO.contact.description,
  keywords: pageSEO.contact.keywords,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    type: "website",
    title: pageSEO.contact.title,
    description: pageSEO.contact.description,
    url: `${siteConfig.url}/contact`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Hire Pawan Kumar — Full Stack Developer | Free Consultation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: pageSEO.contact.title,
    description: pageSEO.contact.description,
    images: [siteConfig.ogImage],
  },
};

export default function ContactPage() {
  const webPage = buildWebPageSchema({
    type: "ContactPage",
    url: `${siteConfig.url}/contact`,
    name: pageSEO.contact.title,
    description: pageSEO.contact.description,
    speakableCssSelectors: ["h1", ".contact-intro", ".contact-cta"],
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Contact", url: `${siteConfig.url}/contact` },
    ],
  });

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Contact", url: `${siteConfig.url}/contact` },
  ]);

  // Hire-intent FAQ for rich results on contact page
  const contactFAQ = buildFAQSchema([
    {
      question: "How can I hire Pawan Kumar for a web development project?",
      answer:
        `You can hire Pawan Kumar by contacting him via: WhatsApp at ${siteConfig.whatsapp}, email at ${siteConfig.email}, or LinkedIn at his profile. He responds within 2 hours on WhatsApp and within 24 hours via email.`,
    },
    {
      question: "Does Pawan Kumar offer a free consultation?",
      answer:
        "Yes. Pawan Kumar offers a free 30-minute consultation call to discuss your project requirements, timeline, and budget. You can book this via WhatsApp or email.",
    },
    {
      question: "What information should I provide when contacting Pawan Kumar?",
      answer:
        "Please share: (1) what you need built, (2) your timeline, (3) your approximate budget, and (4) any design references or existing systems. This helps Pawan Kumar provide an accurate estimate quickly.",
    },
    {
      question: "Does Pawan Kumar work with international clients?",
      answer:
        "Yes. Pawan Kumar works with clients in India, USA, UK, Australia, Canada, UAE, and worldwide. All communication is in English. Payments are accepted via UPI, Bank Transfer, PayPal, and Wise.",
    },
    {
      question: "How quickly does Pawan Kumar respond to project inquiries?",
      answer:
        "Pawan Kumar typically responds within 2 hours on WhatsApp and within 24 hours via email during business days (Monday–Saturday, 9 AM to 8 PM IST).",
    },
  ]);

  // Use conversion data (demonstrates it's available)
  void conversionSEO;
  void webPage;
  void breadcrumb;
  void contactFAQ;

  redirect("/#contact");
}
