"use client";

import dynamic from "next/dynamic";

const HeroRobot = dynamic(() => import("@/components/ui/hero-robot"), {
  ssr: false,
  loading: () => (
    <div className="flex h-svh w-full items-center justify-center bg-[#000000]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4FF00] border-t-transparent" />
        <span className="text-[#D4FF00] text-xs tracking-widest uppercase opacity-60">Loading</span>
      </div>
    </div>
  ),
});

export default function Hero() {
  return (
    <section id="hero" className="relative">
      <HeroRobot
        title="Building Modern Websites Apps & Digital Solutions"
        subtitle="I help startups, hospitals and businesses grow online through high-performance websites, scalable applications and digital experiences."
        badge="Full Stack Developer"
        scrollTarget="#services"
      />
    </section>
  );
}
