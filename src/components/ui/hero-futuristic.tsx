"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import type { Mesh } from "three";

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from "three/tsl";

const DEFAULT_TEXTURE =
  "/tech-bg.png";
const DEFAULT_DEPTH = "/images/hero/depth.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

interface PostProcessingProps {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: PostProcessingProps) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef<{ value: number }>({ value: 0 });

  const render = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;

    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

interface SceneProps {
  textureSrc: string;
  depthSrc: string;
}

const Scene = ({ textureSrc, depthSrc }: SceneProps) => {
  const [rawMap, depthMap] = useTexture([textureSrc, depthSrc]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) {
      setVisible(true);
    }
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength = 0.01;

    const tDepthMap = texture(depthMap);
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap.r;
    // TSL node arithmetic — runtime-valid, types not fully expressed in three/tsl
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress) as never)));
    const mask = dot.mul(flow).mul(vec3(10, 0, 0));
    const final = blendScreen(tMap, mask);

    const nodeMaterial = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return {
      material: nodeMaterial,
      uniforms: { uPointer, uProgress },
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;

    if (meshRef.current?.material) {
      const mat = meshRef.current.material as THREE.MeshBasicNodeMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  const scaleFactor = 0.4;

  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

export interface HeroFuturisticProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  textureSrc?: string;
  depthSrc?: string;
  scrollTarget?: string;
}

export function HeroFuturistic({
  title = "Building Modern Websites Apps & Digital Solutions",
  subtitle = "Independent Full Stack Developer helping businesses build modern digital experiences.",
  badge = "Full Stack Developer",
  textureSrc = DEFAULT_TEXTURE,
  depthSrc = DEFAULT_DEPTH,
  scrollTarget = "#services",
}: HeroFuturisticProps) {
  const titleWords = useMemo(() => title.split(" "), [title]);
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setSubtitleVisible(true), 800);
    return () => clearTimeout(timeout);
  }, [visibleWords, titleWords.length]);

  const handleScroll = useCallback(() => {
    const target = document.querySelector(scrollTarget);
    target?.scrollIntoView({ behavior: "smooth" });
  }, [scrollTarget]);

  return (
    <div className="relative h-svh w-full bg-bg-primary">
      <div className="pointer-events-none absolute z-[60] flex h-svh w-full flex-col items-center justify-center px-6 uppercase sm:px-10">
        <span className="hero-badge mb-6 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[10px] font-medium normal-case tracking-wider text-accent sm:text-xs">
          {badge}
        </span>

        <div className="text-center text-2xl font-extrabold sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 overflow-hidden text-white lg:gap-x-4">
            {titleWords.map((word, index) => (
              <div
                key={`${word}-${index}`}
                className={index < visibleWords ? "hero-fade-in" : ""}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 max-w-3xl overflow-hidden text-center text-xs font-bold normal-case text-text-secondary sm:text-base md:text-lg xl:text-xl 2xl:text-2xl">
          <div
            className={subtitleVisible ? "hero-fade-in-subtitle" : ""}
            style={{
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-4 normal-case">
          <Link
            href="#projects"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg-primary transition-all hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-accent/50 hover:text-accent"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={handleScroll}
        className="hero-explore-btn"
        style={{ animationDelay: "2.2s" }}
        aria-label="Scroll to explore"
      >
        Scroll to explore
        <span className="hero-explore-arrow">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-arrow-svg"
            aria-hidden="true"
          >
            <path d="M11 5V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12L11 17L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div className="pointer-events-none absolute bottom-24 left-0 right-0 z-[60] px-6 sm:px-10">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8 border-t border-white/10 pt-6 normal-case">
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "Full Stack", label: "Developer" },
            { value: "Fast", label: "Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-lg font-bold text-accent sm:text-xl">{stat.value}</p>
              <p className="mt-1 text-xs text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Canvas
        flat
        className="absolute inset-0"
        gl={async (props) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const renderer = new THREE.WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
      >
        <PostProcessing fullScreenEffect />
        <Scene textureSrc={textureSrc} depthSrc={depthSrc} />
      </Canvas>
    </div>
  );
}

export default HeroFuturistic;
