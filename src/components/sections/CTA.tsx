"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="gradient-orb left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-accent/10 animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-bg-card p-12 text-center sm:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />

            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
                Let&apos;s Build Something Amazing Together
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">
                Ready to transform your idea into a premium digital product? Let&apos;s
                discuss your project.
              </p>
              <div className="mt-8">
                <Button href="/#contact" size="lg">
                  Start Your Project
                </Button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
