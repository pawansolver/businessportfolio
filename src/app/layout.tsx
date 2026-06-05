import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/ui/flickering-footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MouseGlow from "@/components/providers/MouseGlow";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const defaultTitle = `${siteConfig.authorName} — ${siteConfig.jobTitle} | Web, App & Digital Marketing`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.authorName, url: siteConfig.url }],
  creator: siteConfig.authorName,
  publisher: siteConfig.authorName,
  applicationName: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.authorName} — ${siteConfig.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  manifest: "/manifest.webmanifest",
  // Google Search Console verify karne ke baad apna code yahan daalo
  // verification: { google: "your-google-site-verification-code" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.authorName,
      jobTitle: siteConfig.jobTitle,
      url: siteConfig.url,
      email: `mailto:${siteConfig.email}`,
      telephone: siteConfig.whatsapp,
      sameAs: [siteConfig.linkedin, siteConfig.whatsappUrl].filter(
        (u) => u && u !== "#"
      ),
      address: {
        "@type": "PostalAddress",
        addressCountry: siteConfig.location,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#service`,
      name: siteConfig.name,
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      url: siteConfig.url,
      description: siteConfig.description,
      founder: { "@id": `${siteConfig.url}/#person` },
      areaServed: { "@type": "Country", name: siteConfig.location },
      priceRange: "$$",
      email: siteConfig.email,
      telephone: siteConfig.whatsapp,
      sameAs: [siteConfig.linkedin].filter((u) => u && u !== "#"),
      makesOffer: [
        "Website Development",
        "Mobile App Development",
        "E-commerce Development",
        "Admin Panel Development",
        "Digital Marketing & SEO",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <SmoothScroll>
          <MouseGlow />
          <div className="relative z-10">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
