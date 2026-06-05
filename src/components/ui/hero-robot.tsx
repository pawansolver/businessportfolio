'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { InteractiveRobotSpline } from '@/components/blocks/interactive-3d-robot';

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

interface HeroRobotProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  scrollTarget?: string;
}

export function HeroRobot({
  title = "Building Modern Websites Apps & Digital Solutions",
  subtitle = "I help startups, hospitals and businesses grow online through high-performance websites, scalable applications and digital experiences.",
  badge = "Full Stack Developer",
  scrollTarget = "#services",
}: HeroRobotProps) {
  const titleWords = useMemo(() => title.split(" "), [title]);
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords((v) => v + 1), 110);
      return () => clearTimeout(timeout);
    }
    const t1 = setTimeout(() => setSubtitleVisible(true), 300);
    const t2 = setTimeout(() => setButtonsVisible(true), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visibleWords, titleWords.length]);

  const handleScroll = useCallback(() => {
    const target = document.querySelector(scrollTarget);
    target?.scrollIntoView({ behavior: "smooth" });
  }, [scrollTarget]);

  return (
    <div className="relative w-screen h-svh overflow-hidden bg-[#000000]">

      {/* ── 3D Robot Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Ambient gradient orbs */}
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-[#D4FF0008] via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D4FF00] opacity-[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-[#6366f1] opacity-[0.06] blur-[100px] pointer-events-none" />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,255,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,255,0,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Spline 3D Robot via InteractiveRobotSpline ─────────────────
             Flow: InteractiveRobotSpline → Suspense (loading spinner) → Spline
             Right 60% on lg screens, full on mobile ──────────────────── */}
        <div className="absolute inset-0 lg:left-[38%]">
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="w-full h-full"
          />

          {/* Left fade gradient so robot blends with text side */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000000] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── Text Content (left panel) ───────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 max-w-4xl pointer-events-none">

        {/* Badge */}
        <span
          className="inline-flex items-center gap-2 mb-8 self-start rounded-full border border-[#D4FF0033] bg-[#D4FF000d] px-4 py-1.5 text-[10px] sm:text-xs font-medium tracking-wider text-[#D4FF00] uppercase"
          style={{
            opacity: visibleWords > 0 ? 1 : 0,
            transform: visibleWords > 0 ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
          {badge}
        </span>

        {/* Title — word by word reveal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight text-white mb-6">
          {titleWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block mr-[0.25em]"
              style={{
                opacity: i < visibleWords ? 1 : 0,
                transform: i < visibleWords ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                transitionDelay: `${i * 0.04}s`,
                color:
                  ["Modern", "Websites", "Apps", "Digital", "Solutions"].includes(word)
                    ? "#D4FF00"
                    : "white",
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="max-w-xl text-sm sm:text-base md:text-lg text-white/50 leading-relaxed mb-10"
          style={{
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4 pointer-events-auto"
          style={{
            opacity: buttonsVisible ? 1 : 0,
            transform: buttonsVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <Link
            href="#projects"
            id="hero-cta-projects"
            className="relative rounded-lg bg-[#D4FF00] px-7 py-3.5 text-sm font-semibold text-[#000000] transition-all hover:shadow-[0_0_30px_rgba(212,255,0,0.4)] hover:scale-[1.03] active:scale-[0.98]"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            id="hero-cta-contact"
            className="rounded-lg border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#D4FF0066] hover:text-[#D4FF00] hover:shadow-[0_0_20px_rgba(212,255,0,0.1)] hover:scale-[1.03] active:scale-[0.98]"
          >
            Contact Me
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="mt-12 flex flex-wrap gap-8 border-t border-white/[0.06] pt-8"
          style={{
            opacity: buttonsVisible ? 1 : 0,
            transition: "opacity 1s ease 0.4s",
          }}
        >
          {[
            { value: "20+", label: "Projects Delivered" },
            { value: "Full Stack", label: "Developer" },
            { value: "Fast", label: "Turnaround" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-lg sm:text-xl font-bold text-[#D4FF00]">{stat.value}</p>
              <p className="mt-0.5 text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll button ───────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleScroll}
        id="hero-scroll-btn"
        aria-label="Scroll to explore"
        className="hero-explore-btn"
        style={{ animationDelay: "2.4s" }}
      >
        Scroll to explore
        <span className="hero-explore-arrow">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M11 5V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12L11 17L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* ── Scan-line decoration ──────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{ background: "linear-gradient(90deg, transparent, #D4FF0040, transparent)" }}
      />
    </div>
  );
}

export default HeroRobot;
