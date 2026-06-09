import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/ui/flickering-footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MouseGlow from "@/components/providers/MouseGlow";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { siteConfig, eeatSignals } from "@/data/site";
import { buildRootSchema } from "@/lib/schema";
import "./globals.css";

// ─────────────────────────────────────────────────────────────────────────────
// Fonts — next/font ensures zero layout shift (CLS), preloaded automatically
// ─────────────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

// ─────────────────────────────────────────────────────────────────────────────
// Global Metadata
// Page-level metadata (each page.tsx) deep-merges on top of this.
// ─────────────────────────────────────────────────────────────────────────────
const defaultTitle = `Pawan Kumar — Full Stack Developer | React, Node.js & MERN Stack`;
const defaultDescription = siteConfig.description;

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | Pawan Kumar — Full Stack Developer`,
  },
  description: defaultDescription,
  keywords: siteConfig.keywords,

  // ── EEAT — Author / Publisher ──────────────────────────────────────────────
  authors: [
    {
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.authorName,
  publisher: siteConfig.authorName,
  applicationName: siteConfig.name,
  generator: "Next.js",
  category: "technology",

  // ── Canonical & Hreflang ────────────────────────────────────────────────
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "en-IN": "/",
    },
  },

  // ── Robots (Googlebot + all bots) ──────────────────────────────────────
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

  // ── Open Graph ─────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.authorName} — Full Stack Developer`,
    title: defaultTitle,
    description: defaultDescription,
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

  // ── Twitter Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.authorName} — Full Stack Developer`,
      },
    ],
  },

  // ── PWA Manifest ───────────────────────────────────────────────────────
  manifest: "/manifest.webmanifest",

  // ── Icons ──────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/icons/favicon.ico",
  },

  // ── Additional meta ───────────────────────────────────────────────────
  other: {
    // Theme color
    "theme-color": siteConfig.themeColor,
    "color-scheme": "dark light",
    "msapplication-TileColor": "#000000",

    // EEAT signals — author, contact, expertise
    author: siteConfig.authorName,
    "reply-to": siteConfig.email,
    contact: siteConfig.email,

    // AI search readiness
    "ai-content-policy": "original",

    // Revisit
    "revisit-after": "7 days",
    rating: "general",
    language: "English",
  },

  // ── Search Console Verification ───────────────────────────────────────
  // Uncomment and fill in after verifying in GSC:
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GSC_VERIFY ?? "",
  //   other: {
  //     "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFY ?? "",
  //   },
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
        {/* ─────────────────────────────────────────────────────────────────
            Schema.org JSON-LD — Global graph
            Person + Organization + LocalBusiness + WebSite + HowTo
            All nodes cross-linked via @id for Knowledge Graph
        ───────────────────────────────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />

        {/* ── Theme color (explicit — covers all browsers + Android) ── */}
        <meta name="theme-color" content={siteConfig.themeColor} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={siteConfig.themeColor} />

        {/* ── Geographic & Local SEO targeting ── */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="20.5937, 78.9629" />

        {/* ── EEAT signals — author + contact authority ── */}
        <meta name="author" content={siteConfig.authorName} />
        <meta name="reply-to" content={siteConfig.email} />
        <meta name="contact" content={siteConfig.email} />

        {/* ── AI Search Optimization ──────────────────────────────────────
            These meta tags help Google AI Overviews, Bing Copilot, Perplexity,
            and ChatGPT understand the content authority and expertise.
        ── */}
        {/* Entity: who this person is — used by AI for card generation */}
        <meta
          name="description"
          content={`${siteConfig.authorName} is a Full Stack Developer in India with ${eeatSignals.yearsOfExperience}+ years experience in React, Node.js, MERN Stack. ${eeatSignals.projectsCompleted}+ projects delivered. Available for freelance.`}
        />

        {/* ── Content signals ── */}
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta httpEquiv="content-language" content="en-us" />
        <meta name="language" content="English" />

        {/* ── Performance — preconnect to external origins ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect to Supabase for faster API responses */}
        <link rel="preconnect" href="https://supabase.co" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* ── Google Analytics 4 ──────────────────────────────────────────
            To activate:
            1. Create GA4 property at analytics.google.com
            2. Set NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX in .env.local
            3. Uncomment the scripts below
        ── */}
        {/*
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: true,
                allow_ad_personalization_signals: false,
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
            <main id="main-content" role="main">
              {children}
            </main>
            <Footer />
          </div>
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
