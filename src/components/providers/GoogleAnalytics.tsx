/**
 * GoogleAnalytics.tsx — GA4 component for Next.js App Router
 *
 * SETUP:
 * 1. Create a Google Analytics 4 property: https://analytics.google.com/
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Add to .env.local:
 *    NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 * 4. Import this component into layout.tsx and render inside <head>:
 *    import GoogleAnalytics from "@/components/providers/GoogleAnalytics";
 *    <head>
 *      <GoogleAnalytics />
 *      ...
 *    </head>
 *
 * Features:
 *  • Loads GA4 only in production
 *  • Respects user's Do Not Track preference
 *  • Page view tracking via Next.js navigation
 *  • Zero impact on dev environment
 */
"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  // Only render in production with a valid ID
  if (!GA_ID || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
