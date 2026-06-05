import dynamic from "next/dynamic";
import { SmoothScrollHero } from "@/components/ui/modern-hero";
import { TechStack } from "@/components/ui/tech-stack";
import TrustBar from "@/components/sections/TrustBar";

// ── Everything below-fold loads lazily ─────────────────────────────────────
const Services = dynamic(() => import("@/components/sections/Services"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const StatsCounter = dynamic(() => import("@/components/sections/StatsCounter"));
const About = dynamic(() => import("@/components/ui/parallax-scroll-feature-section"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <>
      <SmoothScrollHero />
      <TrustBar />
      <About />
      <Projects />
      <Process />
      <TechStack />
      <Testimonials />
      <StatsCounter />
      <CTA />
      <Contact />
    </>
  );
}
