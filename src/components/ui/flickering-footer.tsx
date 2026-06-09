"use client";

import { ChevronRight, Mail, MessageCircle, Link2, Code2, Phone } from "lucide-react";
import { ClassValue, clsx } from "clsx";
import * as Color from "color-bits";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/data/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Color helpers ──────────────────────────────────────────────────────────────
export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback = "rgba(180, 180, 180)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;
  try {
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const el = document.createElement("div");
      el.style.color = cssColor;
      document.body.appendChild(el);
      const computed = window.getComputedStyle(el).color;
      document.body.removeChild(el);
      return Color.formatRGBA(Color.parse(computed));
    }
    return Color.formatRGBA(Color.parse(cssColor));
  } catch {
    return fallback;
  }
};

export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

// ── FlickeringGrid ─────────────────────────────────────────────────────────────
interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#B4B4B4",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => getRGBA(color), [color]);

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, w, h);

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = w;
      maskCanvas.height = h;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;

      if (text) {
        maskCtx.save();
        maskCtx.scale(dpr, dpr);
        maskCtx.fillStyle = "white";
        maskCtx.font = `${fontWeight} ${fontSize}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
        maskCtx.textAlign = "center";
        maskCtx.textBaseline = "middle";
        maskCtx.fillText(text, w / (2 * dpr), h / (2 * dpr));
        maskCtx.restore();
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const sw = squareSize * dpr;
          const sh = squareSize * dpr;
          const maskData = maskCtx.getImageData(x, y, sw, sh).data;
          const hasText = maskData.some(
            (v, idx) => idx % 4 === 0 && v > 0,
          );
          const opacity = squares[i * rows + j];
          const finalOpacity = hasText
            ? Math.min(1, opacity * 3 + 0.4)
            : opacity;
          ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
          ctx.fillRect(x, y, sw, sh);
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const cols = Math.ceil(w / (squareSize + gridGap));
      const rows = Math.ceil(h / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateSize = () => {
      const nw = width || container.clientWidth;
      const nh = height || container.clientHeight;
      setCanvasSize({ width: nw, height: nh });
      gridParams = setupCanvas(canvas, nw, nh);
    };

    updateSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);
      animationFrameId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(updateSize);
    ro.observe(container);

    const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    if (isInView) animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      io.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} {...props}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </div>
  );
};

// ── useMediaQuery ──────────────────────────────────────────────────────────────
export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const check = () => setValue(window.matchMedia(query).matches);
    check();
    window.addEventListener("resize", check);
    window.matchMedia(query).addEventListener("change", check);
    return () => {
      window.removeEventListener("resize", check);
      window.matchMedia(query).removeEventListener("change", check);
    };
  }, [query]);
  return value;
}

// ── Footer nav data — aapke actual navLinks + socialLinks ─────────────────────
const footerColumns = [
  {
    title: "Navigation",
    links: [
      { title: "Home",     href: "/#hero" },
      { title: "Services", href: "/#services" },
      { title: "Projects", href: "/#projects" },
      { title: "About",    href: "/#about" },
      { title: "Contact",  href: "/#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { title: "Website Development",  href: "/#services" },
      { title: "App Development",      href: "/#services" },
      { title: "Digital Marketing",    href: "/#services" },
      { title: "E-commerce",           href: "/#services" },
      { title: "UI/UX Design",         href: "/#services" },
    ],
  },
  {
    title: "Connect",
    links: [
      { title: "Email",     href: `mailto:${siteConfig.email}` },
      { title: "WhatsApp",  href: siteConfig.whatsappUrl },
      { title: "LinkedIn",  href: siteConfig.linkedin },
      { title: "GitHub",    href: siteConfig.github === "#" ? "#" : siteConfig.github },
    ],
  },
];

const socialIcons = [
  { icon: Mail,          href: `mailto:${siteConfig.email}`,    label: "Email" },
  { icon: Phone,         href: siteConfig.whatsappUrl,          label: "WhatsApp" },
  { icon: Link2,         href: siteConfig.linkedin,             label: "LinkedIn" },
  { icon: Code2,         href: siteConfig.github,               label: "GitHub" },
  { icon: MessageCircle, href: siteConfig.whatsappUrl,          label: "Chat" },
];

// ── Main FlickeringFooter component ───────────────────────────────────────────
export function FlickeringFooter() {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer id="footer" className="w-full border-t border-border bg-bg-primary pb-0">
      {/* Top section */}
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-start md:justify-between gap-10 px-8 pt-14 pb-10">
        {/* Brand */}
        <div className="flex flex-col gap-5 max-w-xs">
          <Link href="/#hero" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
              <span className="text-accent font-black text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-text-primary">Pawan.dev</span>
          </Link>
          <p className="text-sm leading-relaxed text-text-secondary">
            {siteConfig.subtitle} Building high-performance websites, apps &amp; digital products from concept to deployment.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-2 flex-wrap">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-card text-text-secondary transition-all hover:border-accent hover:text-accent hover:bg-accent/10"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-primary">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent"
                    >
                      {link.title}
                      <ChevronRight className="h-3 w-3 translate-x-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-8">
        <div className="border-t border-border" />
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 px-8 py-5 text-xs text-text-secondary">
        <span>© {new Date().getFullYear()} Pawan Kumar. All rights reserved.</span>
      </div>

      {/* Flickering grid banner */}
      <div className="relative h-44 md:h-60 w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-bg-primary z-10 from-40%" />
        <div className="absolute inset-0 mx-4">
          <FlickeringGrid
            text={tablet ? "Pawan.dev" : "Build. Launch. Grow."}
            fontSize={tablet ? 60 : 80}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#d4ff00"
            maxOpacity={0.2}
            flickerChance={0.08}
          />
        </div>
      </div>
    </footer>
  );
}

export default FlickeringFooter;
