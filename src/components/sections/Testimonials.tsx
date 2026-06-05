"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Client Feedback" />
        </FadeIn>

        <div className="mt-10 sm:mt-16 grid gap-5 sm:gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass h-full rounded-2xl p-6 sm:p-8 transition-shadow hover:shadow-[0_0_30px_rgba(212,255,0,0.08)]"
              >
                <div className="mb-4 text-accent">★★★★★</div>
                <p className="text-text-secondary leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-display text-sm font-semibold text-text-primary">
                    {t.author}
                  </p>
                  <p className="text-xs text-text-secondary">{t.role}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
