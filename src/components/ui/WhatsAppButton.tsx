"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
const PHONE_DISPLAY = "+91 8709879987";
const WA_URL = "https://wa.me/918709879987?text=Hi%20Pawan%2C%20I%20am%20interested%20in%20your%20services.";

function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.52.666 4.883 1.83 6.924L2 30l7.294-1.806A13.938 13.938 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm0 25.6a11.57 11.57 0 0 1-5.896-1.61l-.422-.252-4.328 1.072 1.1-4.214-.276-.434A11.554 11.554 0 0 1 4.4 16C4.4 9.594 9.594 4.4 16 4.4c6.406 0 11.6 5.194 11.6 11.6 0 6.406-5.194 11.6-11.6 11.6Zm6.354-8.686c-.346-.174-2.048-1.01-2.366-1.126-.318-.116-.55-.174-.78.174-.23.348-.896 1.126-1.098 1.358-.202.232-.404.26-.75.086-.347-.174-1.463-.54-2.787-1.72-1.03-.918-1.725-2.052-1.927-2.4-.202-.346-.022-.534.152-.706.156-.155.347-.404.52-.606.174-.202.231-.346.347-.578.116-.232.058-.434-.029-.606-.086-.174-.78-1.878-1.07-2.572-.28-.674-.566-.582-.78-.594l-.664-.012c-.23 0-.606.087-.924.434-.318.347-1.214 1.186-1.214 2.892 0 1.706 1.242 3.354 1.416 3.586.174.232 2.444 3.73 5.92 5.23.828.358 1.474.572 1.977.732.83.264 1.586.226 2.184.138.666-.1 2.048-.836 2.338-1.644.29-.808.29-1.5.202-1.644-.087-.145-.318-.232-.664-.406Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed bottom-28 right-5 z-[9999] flex h-14 w-14 items-center justify-center"
      style={{ isolation: "isolate" }}
    >
      {/* Ping rings — layered for richer blink */}
      <span className="wa-ring wa-ring-1" />
      <span className="wa-ring wa-ring-2" />
      <span className="wa-ring wa-ring-3" />

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="wa-tooltip"
          >
            <span className="wa-tooltip-dot" />
            <div>
              <p className="wa-tooltip-title">Chat on WhatsApp</p>
              <p className="wa-tooltip-phone">{PHONE_DISPLAY}</p>
            </div>
            {/* Arrow */}
            <span className="wa-tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => { setHovered(true); setTooltip(true); }}
        onHoverEnd={() => { setHovered(false); setTooltip(false); }}
        className="wa-button"
      >
        <WhatsAppIcon size={28} />
      </motion.a>

      {/* Small label pill that slides in on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="wa-label"
          >
            Online now
          </motion.span>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}
