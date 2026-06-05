"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="My Development Process" />
        </FadeIn>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative text-center"
                >
                  <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-accent/10 transition-all group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_rgba(212,255,0,0.2)]" />
                    <span className="relative font-display text-lg font-bold text-accent">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">{step.description}</p>

                  {i < processSteps.length - 1 && (
                    <div className="mx-auto mt-6 h-px w-16 bg-border lg:hidden" />
                  )}
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
