"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value?: number;
  suffix?: string;
  display?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  display,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || display || value === undefined) return;

    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration, display]);

  if (display) {
    return (
      <span ref={ref} className="font-display text-4xl font-bold text-accent sm:text-5xl">
        {display}
      </span>
    );
  }

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-accent sm:text-5xl">
      {count}
      {suffix}
    </span>
  );
}
