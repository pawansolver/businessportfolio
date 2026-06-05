'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Sliders,
  ChevronRight,
  Zap,
  Globe,
  Smartphone,
  TrendingUp,
  Code2,
  BarChart3,
  Search,
  Layers,
  Shield,
  Clock,
  LucideIcon,
} from 'lucide-react';
import type { Service } from '@/types';

// =========================================
// TYPES
// =========================================

export interface ServiceFeatureMetric {
  label: string;
  value: number; // 0–100 for the progress bar
  icon: LucideIcon;
}

export interface ServiceShowcaseItem {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string;
    glowHex: string;      // raw hex for radial bg
    glow: string;         // Tailwind bg class for dot
    barColor: string;     // Tailwind class for progress bar
  };
  badge: string;
  features: ServiceFeatureMetric[];
  bullets: string[];
}

// =========================================
// DATA MAPPING  — services → showcase items
// =========================================

const PALETTE = [
  {
    gradient: 'from-[#D4FF00]/30 to-[#a8cc00]/5',
    glowHex: 'rgba(212,255,0,0.12)',
    glow: 'bg-[#D4FF00]',
    barColor: 'bg-[#D4FF00]',
  },
  {
    gradient: 'from-indigo-600/30 to-indigo-900/5',
    glowHex: 'rgba(99,102,241,0.15)',
    glow: 'bg-indigo-400',
    barColor: 'bg-indigo-400',
  },
  {
    gradient: 'from-rose-600/30 to-rose-900/5',
    glowHex: 'rgba(244,63,94,0.12)',
    glow: 'bg-rose-400',
    barColor: 'bg-rose-400',
  },
];

// Per-service image & metrics — Unsplash images that reliably work
const SERVICE_EXTRAS: Record<string, {
  image: string;
  badge: string;
  metrics: { label: string; value: number; icon: LucideIcon }[];
}> = {
  website: {
    image: '/web-dev.png',
    badge: 'Web',
    metrics: [
      { label: 'Performance', value: 97, icon: Zap },
      { label: 'SEO Score', value: 92, icon: Search },
      { label: 'Uptime', value: 99, icon: Shield },
    ],
  },
  app: {
    image: '/mobile-app.png',
    badge: 'Mobile',
    metrics: [
      { label: 'API Speed', value: 94, icon: Zap },
      { label: 'Code Quality', value: 91, icon: Code2 },
      { label: 'Scalability', value: 88, icon: Layers },
    ],
  },
  marketing: {
    image: '/digital-marketing.png',
    badge: 'Growth',
    metrics: [
      { label: 'Reach Growth', value: 85, icon: TrendingUp },
      { label: 'Ad ROI', value: 78, icon: BarChart3 },
      { label: 'Lead Rate', value: 82, icon: Globe },
    ],
  },
};

// Icon map for service badge icons
const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  website: Globe,
  app: Smartphone,
  marketing: TrendingUp,
};

export function buildShowcaseItems(services: Service[]): ServiceShowcaseItem[] {
  return services.map((svc, i) => {
    const palette = PALETTE[i % PALETTE.length];
    const extras = SERVICE_EXTRAS[svc.id] ?? SERVICE_EXTRAS['website'];
    return {
      id: svc.id,
      label: svc.title,
      title: svc.title,
      description: svc.description,
      image: extras.image,
      badge: extras.badge,
      colors: {
        gradient: palette.gradient,
        glowHex: palette.glowHex,
        glow: palette.glow,
        barColor: palette.barColor,
      },
      features: extras.metrics,
      bullets: svc.features,
    };
  });
}

// =========================================
// ANIMATION VARIANTS
// =========================================

const VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  } as Variants,
  item: {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 120, damping: 22 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  } as Variants,
  image: (fromLeft: boolean): Variants => ({
    initial: {
      opacity: 0, scale: 1.4, filter: 'blur(18px)',
      rotate: fromLeft ? -20 : 20,
      x: fromLeft ? -60 : 60,
    },
    animate: {
      opacity: 1, scale: 1, filter: 'blur(0px)', rotate: 0, x: 0,
      transition: { type: 'spring', stiffness: 240, damping: 22 },
    },
    exit: {
      opacity: 0, scale: 0.65, filter: 'blur(20px)',
      transition: { duration: 0.22 },
    },
  }),
};

// =========================================
// SUB-COMPONENTS
// =========================================

function BackgroundOrb({ hex }: { hex: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ background: `radial-gradient(circle at 30% 50%, ${hex}, transparent 60%)` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      />
    </div>
  );
}

function ServiceVisual({ item, fromLeft }: { item: ServiceShowcaseItem; fromLeft: boolean }) {
  const IconComp = SERVICE_ICON_MAP[item.id] ?? Globe;
  return (
    <motion.div layout="position" className="relative shrink-0">
      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-14%] rounded-full border border-dashed border-white/10"
      />
      {/* Glow blob */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.colors.gradient} blur-2xl opacity-40`}
      />

      {/* Image circle */}
      <div className="relative h-60 w-60 md:h-[280px] md:w-[280px] rounded-full border border-white/[0.06] shadow-2xl flex items-center justify-center overflow-hidden bg-black/30 backdrop-blur-sm">
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="w-full h-full flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={item.id}
              src={item.image}
              alt={item.title}
              variants={VARIANTS.image(fromLeft)}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full object-cover rounded-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>

        {/* Center icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="rounded-full bg-black/40 backdrop-blur-sm p-3 border border-white/10">
            <IconComp size={24} className="text-white/80" />
          </div>
        </div>
      </div>

      {/* Status badge */}
      <motion.div layout="position" className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 bg-zinc-950/90 px-3 py-1 rounded-full border border-white/[0.06] backdrop-blur">
          <span className={`h-1.5 w-1.5 rounded-full ${item.colors.glow} animate-pulse`} />
          {item.badge} Service
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceDetails({ item, fromLeft }: { item: ServiceShowcaseItem; fromLeft: boolean }) {
  const align = fromLeft ? 'items-start text-left' : 'items-end text-right';
  const rowDir = fromLeft ? 'flex-row' : 'flex-row-reverse';

  return (
    <motion.div
      key={item.id}
      variants={VARIANTS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${align} w-full`}
    >
      {/* Label */}
      <motion.p variants={VARIANTS.item} className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500 mb-2">
        {item.badge} · Service
      </motion.p>

      {/* Title */}
      <motion.h2 variants={VARIANTS.item} className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 leading-tight">
        {item.title}
      </motion.h2>

      {/* Description */}
      <motion.p variants={VARIANTS.item} className={`text-zinc-400 text-xs md:text-sm leading-relaxed mb-4 max-w-sm ${fromLeft ? 'mr-auto' : 'ml-auto'}`}>
        {item.description}
      </motion.p>

      {/* Bullets */}
      <motion.ul variants={VARIANTS.item} className={`mb-4 space-y-1.5 ${fromLeft ? 'mr-auto' : 'ml-auto'}`}>
        {item.bullets.map((b) => (
          <li key={b} className={`flex items-center gap-2 text-xs text-zinc-300 ${fromLeft ? '' : 'flex-row-reverse'}`}>
            <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${item.colors.glow}`} />
            {b}
          </li>
        ))}
      </motion.ul>

      {/* Metrics card */}
      <motion.div variants={VARIANTS.item} className="w-full space-y-3.5 bg-zinc-900/50 p-4 rounded-xl border border-white/[0.06] backdrop-blur-sm">
        {item.features.map((feat, idx) => (
          <div key={feat.label}>
            <div className={`flex items-center justify-between mb-1.5 text-xs ${rowDir}`}>
              <div className="flex items-center gap-1.5 text-zinc-200">
                <feat.icon size={13} />
                <span>{feat.label}</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">{feat.value}%</span>
            </div>
            <div className="relative h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feat.value}%` }}
                transition={{ duration: 1.1, delay: 0.35 + idx * 0.12, ease: 'easeOut' }}
                className={`absolute top-0 bottom-0 ${item.colors.barColor} opacity-90 rounded-full`}
                style={{ [fromLeft ? 'left' : 'right']: 0 }}
              />
            </div>
          </div>
        ))}

        <div className={`pt-2 flex ${fromLeft ? 'justify-start' : 'justify-end'}`}>
          <button
            type="button"
            className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors group"
          >
            <Sliders size={12} />
            View Details
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Delivery note */}
      <motion.div variants={VARIANTS.item} className={`mt-3.5 flex items-center gap-1.5 text-zinc-500 ${rowDir}`}>
        <Clock size={12} />
        <span className="text-[10px] font-medium">Fast Turnaround · Fixed Price</span>
      </motion.div>
    </motion.div>
  );
}

// =========================================
// SWITCHER  — works with N items
// =========================================

function ServiceSwitcher({
  items,
  activeIndex,
  onSelect,
}: {
  items: ServiceShowcaseItem[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="absolute bottom-5 inset-x-0 flex justify-center z-30 pointer-events-none">
      <motion.div
        layout
        className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-zinc-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.05]"
      >
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => onSelect(i)}
            whileTap={{ scale: 0.94 }}
            className="relative px-4 h-9 rounded-full flex items-center justify-center text-xs font-medium focus:outline-none"
          >
            {activeIndex === i && (
              <motion.div
                layoutId="svc-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-white/[0.04]"
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-250 text-xs ${activeIndex === i ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              {item.label}
            </span>
            {activeIndex === i && (
              <motion.span
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                className="absolute -bottom-1 h-[2px] w-4 rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

// =========================================
// MAIN EXPORT
// =========================================

interface SpatialServiceShowcaseProps {
  services: Service[];
}

export default function SpatialServiceShowcase({ services }: SpatialServiceShowcaseProps) {
  const items = buildShowcaseItems(services);
  const [activeIndex, setActiveIndex] = useState(0);

  const current = items[activeIndex];
  // Alternate layout direction per item for visual variety
  const fromLeft = activeIndex % 2 === 0;

  return (
    <div className="relative w-full min-h-[500px] bg-[#000000] text-zinc-100 overflow-hidden flex flex-col items-center justify-center rounded-2xl border border-white/[0.05]">
      {/* Dynamic ambient orb */}
      <BackgroundOrb hex={current.colors.glowHex} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <main className="relative z-10 w-full px-4 md:px-8 py-10 pb-20 max-w-5xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.85 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 w-full ${fromLeft ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
        >
          {/* Visual column */}
          <ServiceVisual item={current} fromLeft={fromLeft} />

          {/* Content column */}
          <motion.div layout="position" className="w-full max-w-sm">
            <AnimatePresence mode="wait">
              <ServiceDetails key={current.id} item={current} fromLeft={fromLeft} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      {/* Bottom switcher */}
      <ServiceSwitcher items={items} activeIndex={activeIndex} onSelect={setActiveIndex} />
    </div>
  );
}
