import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "website",
    title: "Website Development",
    description: "High-performance, SEO-friendly websites tailored for your business.",
    icon: "🌐",
    features: [
      "Business Websites",
      "Hospital Websites",
      "Institute Websites",
      "Admin Panels",
      "SEO Friendly",
    ],
  },
  {
    id: "app",
    title: "App Development",
    description: "Scalable mobile and web applications with robust backend systems.",
    icon: "📱",
    features: [
      "Android Apps",
      "Management Systems",
      "Booking Systems",
      "API Integration",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence and leads.",
    icon: "📈",
    features: ["SEO", "Google Ads", "Social Media", "Lead Generation"],
  },
];
