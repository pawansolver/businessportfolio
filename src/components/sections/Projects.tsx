"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ExternalLink,
  Layers,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const CARD_GAP   = 16;    // px — gap between cards (sm: 24)
const SLIDE_INTERVAL = 1500; // ms — image auto-advance

/** Calculate card width based on viewport — keeps card visible on every screen */
const getCardWidth = () => {
  if (typeof window === "undefined") return 320;
  const w = window.innerWidth;
  if (w < 480) return Math.min(300, w - 48); // tight mobile
  if (w < 640) return 320;
  if (w < 1024) return 340;
  return 360;
};

const isVideoFile = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

// ─── Mini Media Thumb (used inside carousel card) ─────────────────────────────
function CardMediaSlider({
  images,
  title,
  active,
}: {
  images: string[];
  title: string;
  active: boolean; // only auto-advance when this card is focused
}) {
  const [current, setCurrent] = useState(0);
  const [inView, setInView]   = useState(false);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const isVideo   = isVideoFile(images[current]);

  // Intersection Observer
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance images (not videos)
  useEffect(() => {
    if (!active || !inView || isVideo || images.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [active, inView, isVideo, images.length, current]);

  // Video play/pause based on visibility + active state
  useEffect(() => {
    if (!videoRef.current) return;
    if (inView && active) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [inView, active, current]);

  return (
    <div ref={wrapRef} className="relative h-48 w-full overflow-hidden bg-bg-primary">
      {isVideo ? (
        <video
          ref={videoRef}
          key={current}
          src={images[current]}
          preload="none"
          muted
          playsInline
          onEnded={() => setCurrent((c) => (c + 1) % images.length)}
          className="h-full w-full object-cover"
        />
      ) : (
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} ${current + 1}`}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="h-full w-full object-cover"
          draggable={false}
        />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Slide dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-4 h-1 bg-accent"
                  : "w-1 h-1 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <span className="absolute top-2 right-2 text-[9px] font-mono bg-black/50 text-white/70 rounded-full px-1.5 py-0.5">
          {current + 1}/{images.length}
        </span>
      )}
    </div>
  );
}

// ─── Full-Screen Lightbox ─────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

function Lightbox({ images, index, title, onClose, onPrev, onNext, onSelectIndex }: LightboxProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onPrev, onNext]);

  const src = images[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/96 p-4 backdrop-blur-lg"
      >
        {/* Top bar */}
        <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-6 z-10 pointer-events-none">
          <span className="font-display text-sm font-semibold text-white/80 tracking-wide">
            {title}
          </span>
          <div className="flex items-center gap-3 pointer-events-auto">
            <span className="font-mono text-xs text-white/50">{index + 1}/{images.length}</span>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Media */}
        <div
          className="relative max-w-5xl w-full h-[76vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideoFile(src) ? (
            <video
              key={index}
              src={src}
              autoPlay
              controls
              playsInline
              preload="metadata"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          ) : (
            <motion.img
              key={index}
              src={src}
              alt={`${title} ${index + 1}`}
              loading="lazy"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28 }}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute -left-2 md:-left-14 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={onNext}
                className="absolute -right-2 md:-right-14 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* Thumb strip */}
        {images.length > 1 && (
          <div
            className="mt-5 flex gap-2 max-w-full overflow-x-auto px-4 pb-1 scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => onSelectIndex(i)}
                className={`relative h-11 w-18 flex-shrink-0 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
                  i === index
                    ? "ring-2 ring-accent opacity-100 scale-105"
                    : "opacity-40 hover:opacity-75"
                }`}
              >
                {isVideoFile(img) ? (
                  <>
                    <video src={img} muted playsInline preload="none" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <ChevronRight size={10} className="text-white fill-white" />
                    </div>
                  </>
                ) : (
                  <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Project Detail Panel (slides in from right) ──────────────────────────────
function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const imgs = project.images?.length ? project.images : [project.image];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-xl bg-bg-card border-l border-border overflow-y-auto overscroll-contain"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-bg-card/95 backdrop-blur-sm border-b border-border">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            {project.category}
          </span>
          <button
            onClick={onClose}
            className="rounded-full bg-bg-primary p-2 text-text-secondary hover:text-text-primary transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Media grid */}
        <div className="p-6">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            {project.title}
          </h2>

          {/* Main media */}
          <div
            className="relative aspect-video rounded-xl overflow-hidden bg-bg-primary cursor-zoom-in mb-3"
            onClick={() => setLbIndex(0)}
          >
            {isVideoFile(imgs[0]) ? (
              <video
                src={imgs[0]}
                autoPlay
                muted
                playsInline
                loop
                preload="none"
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={imgs[0]} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
            )}
            <div className="absolute top-3 right-3 rounded-full bg-black/50 p-1.5 text-white/70">
              <ZoomIn size={14} />
            </div>
          </div>

          {/* Thumb grid */}
          {imgs.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-6">
              {imgs.slice(1).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLbIndex(i + 1)}
                  className="relative aspect-video rounded-lg overflow-hidden bg-bg-primary cursor-zoom-in group"
                >
                  {isVideoFile(img) ? (
                    <>
                      <video src={img} muted playsInline preload="none" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition">
                        <ChevronRight size={14} className="text-white fill-white" />
                      </div>
                    </>
                  ) : (
                    <img src={img} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Features */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3 flex items-center gap-1.5">
              <Layers size={12} /> Key Features
            </h4>
            <ul className="flex flex-wrap gap-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-border bg-bg-primary px-3 py-1 text-xs text-text-secondary"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Button href={project.link ?? "#"} variant="outline" size="sm">
            <ExternalLink size={14} className="mr-1.5" /> Live Preview
          </Button>
        </div>
      </motion.div>

      {/* Lightbox from detail */}
      {lbIndex !== null && (
        <Lightbox
          images={imgs}
          index={lbIndex}
          title={project.title}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex((p) => ((p ?? 0) - 1 + imgs.length) % imgs.length)}
          onNext={() => setLbIndex((p) => ((p ?? 0) + 1) % imgs.length)}
          onSelectIndex={setLbIndex}
        />
      )}
    </>
  );
}

// ─── Carousel Project Card ────────────────────────────────────────────────────
function ProjectCard({
  project,
  isActive,
  onClick,
  cardWidth,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  cardWidth: number;
}) {
  const imgs = project.images?.length ? project.images : [project.image];

  return (
    <motion.article
      style={{ width: cardWidth }}
      className="flex-shrink-0 rounded-2xl border border-border bg-bg-card overflow-hidden cursor-pointer group"
      animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.65 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1.01 : 0.97 }}
    >
      {/* Media thumb */}
      <CardMediaSlider images={imgs} title={project.title} active={isActive} />

      {/* Info */}
      <div className="p-5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
          {project.category}
        </span>
        <h3 className="mt-1.5 font-display text-lg font-bold text-text-primary leading-snug">
          {project.title}
        </h3>
        <p className="mt-2 text-xs text-text-secondary line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded bg-accent/8 border border-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] text-text-secondary">
            {imgs.length} media file{imgs.length > 1 ? "s" : ""}
          </span>
          <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            View Details <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Projects Carousel Section ───────────────────────────────────────────
const DISPLAY_PROJECTS = [...projects, ...projects, ...projects];

export default function Projects() {
  const [activeIdx, setActiveIdx]       = useState(0);
  const [openProject, setOpenProject]   = useState<Project | null>(null);
  const [minX, setMinX]                 = useState(0);
  const [cardWidth, setCardWidth]       = useState(360);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const total = DISPLAY_PROJECTS.length;

  const updateMinX = useCallback(() => {
    if (!trackRef.current) return;
    const cw = getCardWidth();
    setCardWidth(cw);
    const containerW = trackRef.current.offsetWidth;
    const trackWidth = total * cw + (total - 1) * CARD_GAP;
    setMinX(Math.min(0, containerW - trackWidth));
  }, [total]);

  useEffect(() => {
    updateMinX();
    window.addEventListener("resize", updateMinX);
    return () => window.removeEventListener("resize", updateMinX);
  }, [updateMinX]);

  // Scroll the track to left-align the active card
  const scrollTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, total - 1));
      setActiveIdx(clamped);

      const offset = Math.max(minX, -(clamped * (cardWidth + CARD_GAP)));
      animate(x, offset, { type: "spring", stiffness: 280, damping: 30 });
    },
    [total, minX, x, cardWidth]
  );

  // Initial scroll
  useEffect(() => {
    scrollTo(0);
  }, [minX]); // eslint-disable-line react-hooks/exhaustive-deps

  // Drag end snap
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      const threshold = cardWidth / 3;
      if (info.offset.x < -threshold) {
        scrollTo(activeIdx + 1);
      } else if (info.offset.x > threshold) {
        scrollTo(activeIdx - 1);
      } else {
        scrollTo(activeIdx);
      }
    },
    [activeIdx, scrollTo, cardWidth]
  );

  const scrollToDot = useCallback(
    (dotIdx: number) => {
      const currentCycle = Math.floor(activeIdx / projects.length);
      const candidates = [
        (currentCycle - 1) * projects.length + dotIdx,
        currentCycle * projects.length + dotIdx,
        (currentCycle + 1) * projects.length + dotIdx,
      ];
      const validCandidates = candidates.filter(
        (c) => c >= 0 && c < total
      );
      if (validCandidates.length > 0) {
        const closest = validCandidates.reduce((prev, curr) =>
          Math.abs(curr - activeIdx) < Math.abs(prev - activeIdx) ? curr : prev
        );
        scrollTo(closest);
      } else {
        scrollTo(dotIdx);
      }
    },
    [activeIdx, total, scrollTo]
  );

  const isAtEnd = -(activeIdx * (cardWidth + CARD_GAP)) <= minX;

  return (
    <section id="projects" className="bg-bg-secondary py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Featured Projects" />
          <p className="mt-3 text-center text-xs sm:text-sm text-text-secondary px-2">
            Drag or use arrows to browse · Tap a card to see full details
          </p>
        </FadeIn>

        {/* ── Carousel track ── */}
        <div className="relative mt-8 sm:mt-12" ref={trackRef}>
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: minX,
              right: 0,
            }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            className="flex gap-4 sm:gap-6 cursor-grab active:cursor-grabbing select-none touch-pan-y"
          >
            {DISPLAY_PROJECTS.map((project, i) => (
              <ProjectCard
                key={`${project.id}-${i}`}
                project={project}
                isActive={i === activeIdx}
                cardWidth={cardWidth}
                onClick={() => setOpenProject(project)}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Navigation arrows ── */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            aria-label="Previous project"
            onClick={() => scrollTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="rounded-full border border-border bg-bg-card p-2.5 text-text-secondary transition hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => scrollToDot(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === (activeIdx % projects.length)
                    ? "w-6 h-2 bg-accent"
                    : "w-2 h-2 bg-border hover:bg-text-secondary"
                }`}
              />
            ))}
          </div>

          <button
            aria-label="Next project"
            onClick={() => scrollTo(activeIdx + 1)}
            disabled={isAtEnd}
            className="rounded-full border border-border bg-bg-card p-2.5 text-text-secondary transition hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Project counter */}
        <p className="mt-4 text-center text-xs text-text-secondary font-mono">
          {(activeIdx % projects.length) + 1} / {projects.length}
        </p>
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence>
        {openProject && (
          <ProjectDetail
            key={openProject.id}
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
