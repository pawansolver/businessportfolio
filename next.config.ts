import type { NextConfig } from "next";

/**
 * next.config.ts — Production-grade Next.js configuration
 *
 * Core Web Vitals optimizations:
 *  LCP  — image optimization (AVIF/WebP), aggressive caching, font preload
 *  INP  — package import optimization, code splitting
 *  CLS  — font display:swap, image size hints, layout stability
 *
 * Security headers that also improve Google trust score:
 *  HSTS, CSP (scoped to Supabase + GA4), X-Frame-Options, Permissions-Policy
 */

// ─────────────────────────────────────────────────────────────────────────────
// Content Security Policy — scoped to real domains used
// ─────────────────────────────────────────────────────────────────────────────
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline'
    https://www.googletagmanager.com
    https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline'
    https://fonts.googleapis.com;
  font-src 'self'
    https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  connect-src 'self'
    https://www.google-analytics.com
    https://*.supabase.co
    wss://*.supabase.co
    https://wa.me;
  media-src 'self' blob:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self' https://wa.me;
`;

// ─────────────────────────────────────────────────────────────────────────────
// Security + Performance headers
// ─────────────────────────────────────────────────────────────────────────────
const securityHeaders = [
  // Prevents clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Prevents MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer — preserves analytics accuracy
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HSTS — forces HTTPS for 2 years
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Disable unused browser APIs (privacy + security)
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // CSP
  { key: "Content-Security-Policy", value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim() },
  // Legacy XSS protection
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Cross-origin policy (improves performance isolation)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
];

const nextConfig: NextConfig = {
  // ── Core ────────────────────────────────────────────────────────────────
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  // ── Package transpilation ──────────────────────────────────────────────
  transpilePackages: ["three"],

  // ── Experimental optimizations (INP improvement) ──────────────────────
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-slot",
    ],
    // Turbopack for faster dev builds
    // turbo: {},
  },

  // ── Image optimization (LCP critical path) ────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year immutable cache
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── Security + Cache headers ──────────────────────────────────────────
  async headers() {
    return [
      // ── Global security headers ────────────────────────────────────
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // ── Immutable cache for icon assets ───────────────────────────
      // /icons/* — fingerprinted filenames, safe to cache forever
      {
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // ── Long-lived cache for known public image folders ────────────
      // NOTE: Next.js <Image> responses are already cached via
      // images.minimumCacheTTL (1 year). These rules cover raw public/ files.
      // Next.js source patterns use path-to-regexp — NO capturing groups allowed.
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/tech/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      // ── Video assets (Next.js supports simple path params) ─────────
      {
        source: "/hosptital/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/it/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/organization/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800" },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      // ── Sitemap + robots — short cache (updates frequently) ───────
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },

  // ── Redirects — canonical URL enforcement ─────────────────────────────
  async redirects() {
    return [
      // Normalize /home → / (permanent 301)
      { source: "/home", destination: "/", permanent: true },
      // Non-www → www (if using www as canonical — enable after DNS setup)
      // { source: "/:path*", destination: "https://www.pawandev.com/:path*", permanent: true, has: [{ type: "host", value: "pawandev.com" }] },
    ];
  },
};

export default nextConfig;
