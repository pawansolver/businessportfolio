"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle, Clock, CheckCircle } from "lucide-react";

const PHONE_NUMBER = "+91 8709879987";
const PHONE_TEL = "tel:+918709879987";
const WA_URL =
  "https://wa.me/918709879987?text=Hi%20Pawan%2C%20I%27d%20like%20to%20book%20a%20free%20call.";

const AVAILABILITY = [
  { day: "Mon – Fri", time: "9:00 AM – 8:00 PM IST" },
  { day: "Saturday", time: "10:00 AM – 5:00 PM IST" },
];

const WHAT_TO_EXPECT = [
  "Free 30-min discovery call",
  "Project scope & timeline discussion",
  "No-obligation quote",
  "Direct answers to your questions",
];

interface BookCallModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookCallModal({ open, onClose }: BookCallModalProps) {
  /* Lock body scroll when open */
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Book a free call"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_0_60px_rgba(0,255,178,0.12)]">

              {/* Top accent bar */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6 pb-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                    </span>
                    <span className="text-xs font-medium text-accent uppercase tracking-widest">
                      Available Now
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                    Book a Free Call
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    Let&apos;s discuss your project — no pressure, no commitment.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-secondary transition-all hover:border-accent/40 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 pt-6 pb-6 space-y-5">

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Call Now */}
                  <a
                    href={PHONE_TEL}
                    className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-5 text-center transition-all duration-300 hover:border-accent/50 hover:bg-accent/8 hover:shadow-[0_0_20px_rgba(0,255,178,0.12)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 transition-all group-hover:bg-accent/20 group-hover:ring-accent/50">
                      <Phone size={22} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">Call Now</p>
                      <p className="mt-0.5 text-xs text-text-secondary">{PHONE_NUMBER}</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-5 text-center transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[#25D366]/8 hover:shadow-[0_0_20px_rgba(37,211,102,0.15)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] ring-1 ring-[#25D366]/20 transition-all group-hover:bg-[#25D366]/20 group-hover:ring-[#25D366]/50">
                      <MessageCircle size={22} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">WhatsApp</p>
                      <p className="mt-0.5 text-xs text-text-secondary">Quick response</p>
                    </div>
                  </a>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/8" />
                  <span className="text-xs text-text-secondary">What to expect</span>
                  <div className="h-px flex-1 bg-white/8" />
                </div>

                {/* Expect list */}
                <ul className="grid grid-cols-2 gap-2">
                  {WHAT_TO_EXPECT.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                      <CheckCircle size={13} className="mt-0.5 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Availability */}
                <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={13} className="text-accent" />
                    <span className="text-xs font-medium text-white">Availability</span>
                  </div>
                  {AVAILABILITY.map((a) => (
                    <div key={a.day} className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary">{a.day}</span>
                      <span className="font-medium text-white">{a.time}</span>
                    </div>
                  ))}
                </div>

                {/* Phone display */}
                <a
                  href={PHONE_TEL}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent/5 border border-accent/15 px-4 py-3 hover:bg-accent/10 transition-colors"
                >
                  <Phone size={14} className="text-accent" />
                  <span className="font-display text-base font-bold tracking-wider text-accent">
                    {PHONE_NUMBER}
                  </span>
                </a>
              </div>

              {/* Bottom accent bar */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
