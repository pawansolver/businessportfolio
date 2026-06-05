'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  // Still checking
  if (webglSupported === null) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-900 text-white ${className}`}>
        <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
        </svg>
      </div>
    );
  }

  // WebGL not supported — show fallback instead of crashing
  if (!webglSupported) {
    return (
      <div className={`w-full h-full relative overflow-hidden flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0a0a] to-[#000000]" />
        <div className="absolute w-72 h-72 rounded-full bg-[#D4FF00] opacity-[0.05] blur-[100px]" />
        <div className="absolute w-48 h-48 rounded-full bg-[#6366f1] opacity-[0.06] blur-[80px] translate-x-12 -translate-y-8" />
        <div className="relative text-center">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-[#D4FF00]/60 text-xs tracking-widest uppercase">3D Robot</p>
        </div>
      </div>
    );
  }

  // WebGL available — render Spline
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-gray-900 text-white ${className}`}>
          <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
          </svg>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}
