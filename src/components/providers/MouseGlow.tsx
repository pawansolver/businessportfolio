"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.body.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[500px] w-[500px] rounded-full opacity-30"
      style={{
        background: "radial-gradient(circle, rgba(212,255,0,0.15) 0%, transparent 70%)",
        left: position.x - 250,
        top: position.y - 250,
      }}
      animate={{ opacity: visible ? 0.3 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}
