"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Wrench, FolderKanban, User, Phone, CalendarCheck } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import BookCallModal from "@/components/ui/BookCallModal";
import { cn } from "@/lib/utils";

const NAV_ICONS: Record<string, React.ReactNode> = {
  "/#hero": <Home size={16} />,
  "/#services": <Wrench size={16} />,
  "/#projects": <FolderKanban size={16} />,
  "/#about": <User size={16} />,
  "/#contact": <Phone size={16} />,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu when modal opens */
  const openModal = () => {
    setMobileOpen(false);
    setModalOpen(true);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "glass-strong border-b border-border" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/#hero" className="font-display text-lg font-bold text-text-primary">
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop — Book Call opens modal */}
          <div className="hidden md:block">
            <button
              onClick={openModal}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg-primary transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,255,178,0.4)] active:scale-95"
            >
              {/* shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 hover:translate-x-full group-hover:translate-x-full" />
              <CalendarCheck size={15} />
              Book Call
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block h-0.5 w-6 bg-text-primary transition-transform duration-300",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-text-primary transition-opacity duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-text-primary transition-transform duration-300",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong overflow-hidden border-b border-border md:hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-accent"
                  >
                    <span className="text-accent opacity-70">{NAV_ICONS[link.href]}</span>
                    {link.label}
                  </Link>
                ))}

                {/* Book Call in mobile menu */}
                <button
                  onClick={openModal}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-bg-primary transition-all hover:shadow-[0_0_20px_rgba(0,255,178,0.3)]"
                >
                  <CalendarCheck size={15} />
                  Book a Free Call
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Book Call Modal — rendered outside header to avoid z-index conflicts */}
      <BookCallModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
