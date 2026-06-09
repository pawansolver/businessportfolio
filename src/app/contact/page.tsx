import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSEO, siteConfig } from "@/data/site";

// ─────────────────────────────────────────────────────────────────────────────
// Contact Page Metadata
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageSEO.contact.title,
  description: pageSEO.contact.description,
  keywords: pageSEO.contact.keywords,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: pageSEO.contact.title,
    description: pageSEO.contact.description,
    url: `${siteConfig.url}/contact`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Contact Pawan Kumar — Hire a Full Stack Developer in India",
      },
    ],
  },
  twitter: {
    title: pageSEO.contact.title,
    description: pageSEO.contact.description,
  },
};

export default function ContactPage() {
  redirect("/#contact");
}
