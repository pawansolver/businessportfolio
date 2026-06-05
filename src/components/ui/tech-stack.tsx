"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techStack } from "@/data/techStack";

export const TechStack = () => {
  const [showMore, setShowMore] = useState(false);
  const displayTech = showMore ? techStack : techStack.slice(0, 12);
  return (
    <section className="bg-bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-heading"
          >
            Core Technologies
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subheading"
          >
            Building robust, scalable applications with modern, enterprise-grade tools.
          </motion.p>
        </div>
        
        <div className="mx-auto mt-16 max-w-6xl grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-6">
          <AnimatePresence>
            {displayTech.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: (index % 10) * 0.03 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-border bg-bg-card p-6 shadow-sm backdrop-blur-sm transition-all hover:border-accent hover:bg-bg-card/80 hover:-translate-y-1"
              >
                <img
                  src={tech.icon}
                  alt={`${tech.name} logo`}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                  style={{
                    filter: tech.color === "#ffffff" ? "invert(1)" : "none",
                  }}
                />
                <span className="mt-3 text-xs sm:text-sm font-medium text-text-primary text-center leading-tight">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {techStack.length > 12 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="mt-14 flex justify-center"
          >
            <button
              onClick={() => setShowMore(!showMore)}
              className="rounded-full border border-border px-8 py-3 text-sm font-semibold uppercase tracking-widest text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary hover:border-accent/50"
            >
              {showMore ? "View Less" : "View More"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
