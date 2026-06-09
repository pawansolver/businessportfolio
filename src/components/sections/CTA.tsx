"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import BookCallModal from "@/components/ui/BookCallModal";

export default function CTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="gradient-orb left-1/2 top-1/2 h-72 w-72 sm:h-96 sm:w-96 -translate-x-1/2 -translate-y-1/2 bg-accent/10 animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-bg-card p-6 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />

            <div className="relative">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                Let&apos;s Build Something Amazing Together
              </h2>
              <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-text-secondary px-2">
                Ready to transform your idea into a premium digital product? Let&apos;s
                discuss your project.
              </p>
              <div className="mt-6 sm:mt-8">
                <Button onClick={() => setModalOpen(true)} size="lg">
                  Start Your Project
                </Button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>

      <BookCallModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
