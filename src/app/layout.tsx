import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/ui/flickering-footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MouseGlow from "@/components/providers/MouseGlow";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/data/site";
import { buildRootSchema } from "@/lib/schema";
import "./globals.css";

// ─────────────────────────────────────────────────────────────────────────────
// Fonts — preloaded via next/font for zero layout shift
// ─────────────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────────────────
// Global Metadata — applied to every page unless overridden by page-level
// generateMetadata(). Next.js merges them with deep-merge (page wins).
// ─────────────────────────────────────────────────────────────────────────────
const defaultTitle = `Pawan Kumar — Full Stack Developer | React, Node.js & MERN Stack`;

export const metadata: Metadata = {
  // ── Core ────────────────────────────────────────────────────────────────
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | Pawan Kumar — Full Stack Developer`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,

  // ── Author / Publisher ──────────────────────────────────────────────────
  authors: [{ name: siteConfig.authorName, url: siteConfig.url }],
  creator: siteConfig.authorName,
  publisher: siteConfig.authorName,
  applicationName: siteConfig.name,
  category: "technology",

  // ── Canonical ───────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },

  // ── Robots ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Open Graph ──────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.authorName} — Full Stack Developer`,
    title: defaultTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.authorName} — Full Stack Developer | React, Node.js, MERN Stack`,
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: defaultTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.authorName} — Full Stack Developer`,
      },
    ],
  },

  // ── PWA Manifest ────────────────────────────────────────────────────────
  manifest: "/manifest.webmanifest",

  // ── Icons ───────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/icons/favicon.ico",
  },

  // ── Theme Color ─────────────────────────────────────────────────────────
  // Controls browser chrome color (Android Chrome, PWA)
  // The <meta name="theme-color"> equivalent for Next.js
  other: {
    "theme-color": siteConfig.themeColor,
    "color-scheme": "dark light",
    "msapplication-TileColor": "#000000",
  },

  // ── Google Search Console verification ──────────────────────────────────
  // 1. Go to https://search.google.com/search-console/
  // 2. Add property → choose "URL prefix" → enter your domain
  // 3. Choose "HTML tag" verification method
  // 4. Copy the content="..." value and paste below
  // verification: {
  //   google: "REPLACE_WITH_YOUR_GOOGLE_VERIFICATION_CODE",
  //   // Get from: https://www.bing.com/webmasters/
  //   other: { "msvalidate.01": "REPLACE_WITH_BING_VERIFICATION_CODE" },
  // },
};

// ─────────────────────────────────────────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootSchema = buildRootSchema();

  return (
    <html lang="en" className="dark">
      <head>
        {/* ── Schema.org JSON-LD — Person + ProfessionalService + WebSite ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />

        {/* ── Theme color meta (explicit, covers all browsers) ── */}
        <meta name="theme-color" content={siteConfig.themeColor} />

        {/* ── Geographic targeting ── */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="20.5937, 78.9629" />

        {/* ── Language & Content type ── */}
        <meta httpEquiv="content-language" content="en-us" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />

        {/* ── Additional author / contact info ── */}
        <meta name="author" content={siteConfig.authorName} />
        <meta name="reply-to" content={siteConfig.email} />
        <meta name="contact" content={siteConfig.email} />

        {/* ── Preconnect for performance (Google Fonts, Analytics, etc.) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Google Analytics 4 — replace GA_MEASUREMENT_ID ── */}
        {/* 
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: window.location.pathname,
                send_page_view: true,
              });
            `,
          }}
        />
        */}
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
