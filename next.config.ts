import type { NextConfig } from "next";

/**
 * next.config.ts — Production-ready Next.js configuration
 *
 * SEO-relevant settings:
 *  • Compression       — reduces TTFB (Core Web Vitals)
 *  • poweredByHeader   — removes X-Powered-By (minor security + cleaner headers)
 *  • Security headers  — improves Google trust signals
 *  • Image optimization — improves LCP scores
 */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  connect-src 'self' https://www.google-analytics.com https://*.supabase.co wss://*.supabase.co;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`;

const securityHeaders = [
  // ── Prevents clickjacking ──────────────────────────────────────────────
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // ── Prevents MIME-type sniffing ────────────────────────────────────────
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // ── Referrer policy for privacy + analytics accuracy ──────────────────
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // ── HSTS — forces HTTPS for 2 years ───────────────────────────────────
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // ── Permissions policy (disable unused browser APIs) ──────────────────
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // ── Content Security Policy ────────────────────────────────────────────
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  // ── XSS Protection (legacy browsers) ─────────────────────────────────
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig: NextConfig = {
  // ── Core ────────────────────────────────────────────────────────────────
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  // ── Package transpilation ────────────────────────────────────────────────
  transpilePackages: ["three"],

  // ── Experimental optimizations ──────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // ── Image optimization (Core Web Vitals — LCP) ──────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
  },

  // ── Security headers — improves Google trust score ──────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // ── Cache static assets aggressively for performance ─────────────
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*\\.png|.*\\.jpg|.*\\.webp|.*\\.avif|.*\\.svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  // ── Redirects — clean URL strategy ──────────────────────────────────────
  async redirects() {
    return [
      // Normalize trailing slashes to canonical (no-slash) form
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
