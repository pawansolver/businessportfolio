import Link from "next/link";
import { footerLinks, siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/#hero" className="font-display text-lg font-bold text-text-primary">
            {siteConfig.name}
          </Link>

          <nav className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-text-secondary">
          © 2026 Pawan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
