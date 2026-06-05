"use client";

import { ShadcnButton } from "@/components/ui/button-shadcn";
import Link from "next/link";
import { techStack } from "@/data/techStack";

export default function IntegrationsSection() {
  // Use first 36 tech items for a full 6x6 grid
  const displayTech = techStack.slice(0, 36);

  return (
    <section className="max-w-7xl mx-auto my-20 px-6 grid md:grid-cols-2 gap-10 items-center border border-border p-6 rounded-3xl">
      {/* Left Side */}
      <div>
        <p className="uppercase text-sm font-semibold text-text-secondary">
          Components
        </p>
        <h2 className="text-7xl font-bold mt-2 mb-4 text-text-primary">
          Supercharge your workflow
        </h2>
        <p className="text-text-secondary mb-6">
          Build sleek, responsive interfaces in record time with our carefully crafted React and Tailwind CSS components.
        </p>
        <div className="flex gap-4">
          <ShadcnButton asChild className="bg-accent text-bg-primary px-5 py-2 rounded-lg font-medium hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]">
            <Link href="https://ruixen.com/components" target="_blank">
              Browse Components
            </Link>
          </ShadcnButton>
          <ShadcnButton asChild variant="outline" className="border border-border bg-transparent text-text-primary px-5 py-2 rounded-lg font-medium hover:border-accent/50 hover:text-accent">
            <Link href="https://ruixen.com" target="_blank">
              View Documentation →
            </Link>
          </ShadcnButton>
        </div>
      </div>

      {/* Right Side — 6x6 Grid */}
      <div className="grid grid-cols-6 gap-4">
        {displayTech.map((tech, idx) => (
          <div
            key={idx}
            className="relative w-16 h-16 p-2 bg-bg-card shadow-sm border-2 border-border flex items-center justify-center"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              loading="lazy"
              className="w-8 h-8 object-contain"
              style={{
                filter: tech.color === "#ffffff" ? "invert(1)" : "none",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
