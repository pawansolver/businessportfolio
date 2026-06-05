"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

function MiniChart() {
  const bars = [40, 65, 45, 80, 55, 90, 70];
  return (
    <div className="flex h-16 items-end gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-sm bg-accent/60"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
        />
      ))}
    </div>
  );
}

export default function HeroDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative perspective-[1000px]">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="animate-float relative"
      >
        <div className="absolute -inset-4 rounded-2xl bg-accent/10 blur-2xl animate-pulse-glow" />

        <div className="glass relative overflow-hidden rounded-2xl p-4 glow-accent sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-text-secondary">Dashboard Overview</p>
              <p className="font-display text-lg font-bold text-text-primary">Analytics Panel</p>
            </div>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Users", value: "2.4K" },
              { label: "Revenue", value: "$12K" },
              { label: "Growth", value: "+24%" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-lg p-3">
                <p className="text-[10px] text-text-secondary">{stat.label}</p>
                <p className="font-display text-sm font-bold text-accent">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 glass rounded-lg p-3">
            <p className="mb-2 text-xs text-text-secondary">Weekly Performance</p>
            <MiniChart />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="glass rounded-lg p-3">
              <p className="text-[10px] text-text-secondary">Active Projects</p>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-bg-primary">
                <div className="h-full w-3/4 rounded-full bg-accent" />
              </div>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-[10px] text-text-secondary">Tasks Done</p>
              <p className="font-display text-sm font-bold text-text-primary">18/24</p>
            </div>
          </div>
        </div>

        <motion.div
          className="glass absolute -right-4 -top-4 rounded-lg px-3 py-2 sm:-right-8"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[10px] text-text-secondary">Live</p>
          <p className="text-xs font-semibold text-accent">● Online</p>
        </motion.div>

        <motion.div
          className="glass absolute -bottom-3 -left-4 rounded-lg px-3 py-2 sm:-left-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <p className="text-[10px] text-text-secondary">Deploy</p>
          <p className="text-xs font-semibold text-text-primary">Success ✓</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
