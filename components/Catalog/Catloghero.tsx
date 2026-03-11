"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function GrivaInstitutionalHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 30,
    mass: 1.2,
  });

  /* Mouse Parallax */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const moveX_Layer1 = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const moveY_Layer1 = useTransform(smoothMouseY, [0, 1], [-20, 20]);

  const moveX_Layer2 = useTransform(smoothMouseX, [0, 1], [30, -30]);
  const moveY_Layer2 = useTransform(smoothMouseY, [0, 1], [30, -30]);

  /* Text Animation */
  const textOpacity = useTransform(smoothProgress, [0.01, 0.20], [0, 5]);
  const textY = useTransform(smoothProgress, [0, 0.4], [50, 0]);

  /* Grain texture */
  const GRAIN_URL =
    "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E";

  return (
    <div
      ref={containerRef}
      className="relative h-[150vh] bg-[#F4F1E8] selection:bg-[#9c8f6a]/30"
    >
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">



        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{ backgroundImage: `url("${GRAIN_URL}")` }}
        />
      </div>

      {/* HERO CONTENT */}
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center text-center px-6">

        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <h2 className="font-serif text-4xl md:text-7xl text-[#4B2A3A] leading-[1.1]">
            <span className="block">Sustaining Earth.</span>
            <span className="block italic text-[#9c8f6a] mt-2">
              Supplying Growth.
            </span>
          </h2>

          <div className="mt-12 flex flex-col items-center gap-4 opacity-70">
            <div className="h-12 w-[1px] bg-[#355E3B]" />
            <p className="text-[10px] tracking-[0.3em] uppercase max-w-xs leading-relaxed font-medium text-[#355E3B]">
              Global Export Standard // Verified Logic
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}