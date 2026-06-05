"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

export const SmoothScrollHero = () => {
  return (
    <ReactLenis root>
      <div className="bg-bg-primary">
        <Nav />
        <Hero />
        <Schedule />
      </div>
    </ReactLenis>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white pointer-events-none">
      <Rocket className="w-8 h-8 mix-blend-difference pointer-events-auto" />
      <button
        onClick={() => {
          document.getElementById("services-list")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary pointer-events-auto"
      >
        MY SERVICES <ArrowRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-bg-primary/0 to-bg-primary" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [0, 25]);
  const clip2 = useTransform(scrollY, [0, 1500], [100, 75]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["100%", "120%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );
  const textOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const textScale = useTransform(scrollY, [0, 800], [1, 0.8]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(/tech-bg.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-bg-primary/70 mix-blend-multiply" />
      
      {/* Animated glowing grid */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #D4FF00 1px, transparent 1px), linear-gradient(to bottom, #D4FF00 1px, transparent 1px)`, 
          backgroundSize: '4rem 4rem' 
        }} 
      />
      
      {/* Ambient glow in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <motion.div 
        style={{ opacity: textOpacity, scale: textScale }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-tight"
        >
          Build <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-white">Faster</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-6 text-base sm:text-xl md:text-2xl text-text-secondary font-medium tracking-wide max-w-2xl"
        >
          High-performance digital experiences crafted with precision.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/web-dev.png"
        alt="Code on screen"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="/mobile-app.png"
        alt="Laptop on desk"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="/cloud-server.png"
        alt="Tech workspace"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="/digital-marketing.png"
        alt="Matrix code"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      id="services-list"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-text-primary"
      >
        My Services
      </motion.h1>
      
      <ScheduleItem title="Full-Stack Web Development" date="Frontend & Backend" location="React, Next.js, Node" />
      <ScheduleItem title="Mobile App Development" date="iOS & Android" location="React Native" />
      <ScheduleItem title="Database Architecture" date="SQL & NoSQL" location="PostgreSQL, MongoDB" />
      <ScheduleItem title="Digital Marketing & SEO" date="Social Media Growth" location="Global" />
      
      {showMore && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <ScheduleItem title="API Design & Integration" date="REST & GraphQL" location="Next.js API Routes" />
          <ScheduleItem title="UI/UX Design & Prototyping" date="Figma & Adobe XD" location="Web & Mobile" />
          <ScheduleItem title="Cloud & DevOps" date="AWS, Docker & CI/CD" location="Deployment" />
          <ScheduleItem title="E-Commerce Solutions" date="Shopify & Custom" location="Secure Payments" />
          <ScheduleItem title="Web3 & Blockchain" date="Smart Contracts & DApps" location="Ethereum & Solana" />
          <ScheduleItem title="Custom SaaS Development" date="Scalable & Secure" location="B2B & B2C" />
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5, delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <button
          onClick={() => setShowMore(!showMore)}
          className="rounded-full border border-border px-8 py-3 text-sm font-semibold uppercase tracking-widest text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary"
        >
          {showMore ? "View Less" : "View More"}
        </button>
      </motion.div>
    </section>
  );
};

interface ScheduleItemProps {
  title: string;
  date: string;
  location: string;
}

const ScheduleItem = ({ title, date, location }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-border px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-text-primary">{title}</p>
        <p className="text-sm uppercase text-text-secondary">{date}</p>
      </div>
      <div className="text-end text-sm uppercase text-text-secondary">
        <p>{location}</p>
      </div>
    </motion.div>
  );
};
