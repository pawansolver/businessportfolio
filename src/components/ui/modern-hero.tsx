"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const SmoothScrollHero = () => {
  return (
    <ReactLenis root>
      <div className="bg-bg-primary">
        <Hero />
        <Schedule />
      </div>
    </ReactLenis>
  );
};

/** Mobile gets a shorter parallax section so hero finishes within a couple swipes */
const useSectionHeight = () => {
  const [h, setH] = useState(1500);
  useEffect(() => {
    const update = () => setH(window.innerWidth < 768 ? 900 : 1500);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return h;
};

const Hero = () => {
  const sectionHeight = useSectionHeight();
  return (
    <div
      style={{ height: `calc(${sectionHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage sectionHeight={sectionHeight} />
      <ParallaxImages sectionHeight={sectionHeight} />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-bg-primary/0 to-bg-primary" />
    </div>
  );
};

const CenterImage = ({ sectionHeight }: { sectionHeight: number }) => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, sectionHeight], [0, 25]);
  const clip2 = useTransform(scrollY, [0, sectionHeight], [100, 75]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, sectionHeight + 500],
    ["100%", "120%"]
  );
  const opacity = useTransform(
    scrollY,
    [sectionHeight, sectionHeight + 500],
    [1, 0]
  );
  const textFade = Math.min(800, sectionHeight * 0.55);
  const textOpacity = useTransform(scrollY, [0, textFade], [1, 0]);
  const textScale = useTransform(scrollY, [0, textFade], [1, 0.8]);

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
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6"
      >
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[1.05]"
        >
          Build <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-white">Faster</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl lg:text-2xl text-text-secondary font-medium tracking-wide max-w-md sm:max-w-2xl px-2"
        >
          High-performance digital experiences crafted with precision.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const ParallaxImages = ({ sectionHeight }: { sectionHeight: number }) => {
  // Scale parallax movement based on section height (smaller on mobile)
  const k = sectionHeight / 1500;
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[120px] sm:pt-[200px] space-y-8 sm:space-y-0">
      <ParallaxImg
        src="/web-dev.png"
        alt="Code on screen"
        start={-200 * k}
        end={200 * k}
        className="w-2/3 sm:w-1/3 rounded-xl"
      />
      <ParallaxImg
        src="/mobile-app.png"
        alt="Laptop on desk"
        start={200 * k}
        end={-250 * k}
        className="mx-auto w-4/5 sm:w-2/3 rounded-xl"
      />
      <ParallaxImg
        src="/cloud-server.png"
        alt="Tech workspace"
        start={-200 * k}
        end={200 * k}
        className="ml-auto w-2/3 sm:w-1/3 rounded-xl"
      />
      <ParallaxImg
        src="/digital-marketing.png"
        alt="Matrix code"
        start={0}
        end={-500 * k}
        className="ml-4 sm:ml-24 w-3/4 sm:w-5/12 rounded-xl"
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
      className="mx-auto max-w-5xl px-4 sm:px-6 py-24 sm:py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-10 sm:mb-20 text-3xl sm:text-4xl font-black uppercase text-text-primary"
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
      className="mb-6 sm:mb-9 flex flex-col gap-2 border-b border-border px-1 sm:px-3 pb-6 sm:pb-9 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <div className="min-w-0 flex-1">
        <p className="mb-1.5 text-base sm:text-xl text-text-primary leading-snug">{title}</p>
        <p className="text-xs sm:text-sm uppercase text-text-secondary">{date}</p>
      </div>
      <div className="text-xs sm:text-sm uppercase text-text-secondary sm:text-end shrink-0">
        <p>{location}</p>
      </div>
    </motion.div>
  );
};
