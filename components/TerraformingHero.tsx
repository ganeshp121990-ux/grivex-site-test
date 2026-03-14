"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";

// --- ASSET CONFIGURATION ---
const VIDEO_SOURCE = "/images/Test.mp4";

const BRAND_CONTENT = {
  headline: "GRIVA",
  subhead: "PREMIUM ORGANIC EXPORTER",
  slogan: "Sustaining Earth, Supplying Growth.", 
  paragraph: "We are a globally trusted exporter of certified organic fertilisers, dedicated to promoting sustainable and compliant agricultural practices. Our products are manufactured using approved natural inputs and adhere to recognised international quality, safety, and environmental standards. By enhancing soil vitality, improving crop performance, and reducing ecological impact, we help farmers and agri-businesses achieve long-term productivity while meeting regulatory and sustainability requirements worldwide.",
};

const TRUST_METRICS = [
  "USDA Certified", "•", "ISO 9001:2015", "•", "12,000+ MT Exported", "•", "Traceability: #2026-XG", "•", "EU Approved", "•",
];

// --- QUANTUM DECRYPT COMPONENT (2050 Style) ---
const QuantumLetter = ({ char, index }: { char: string; index: number }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const glyphs = "X#¥§$01%&@";

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setDisplayChar(glyphs[Math.floor(Math.random() * glyphs.length)]);
      count++;
      if (count > 10 + index * 5) {
        setDisplayChar(char);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [char, index]);

  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      {displayChar}
    </motion.span>
  );
};

export default function GrivaFutureHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring for "Magnetic" Feel
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  
  // Brand displacement based on mouse movement
  const brandX = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);
  const brandY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#020202] text-[#E8E2D6] font-sans selection:bg-[#C2A676]"
      onMouseMove={handleMouseMove}
    >
      {/* 1. CINEMATIC BACKGROUND */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacit-30 brightness-85 contrast-110">
          <source src={VIDEO_SOURCE} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/30 to-[#020202] z-[1]" />
      </motion.div>

      {/* 2. ATMOSPHERIC OVERLAYS */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.08] mix-blend-overlay bg-[url('/noise.svg')]" />

      {/* 3. HERO CONTENT */}
      <motion.div style={{ y: contentY }} className="relative z-10 h-full w-full flex flex-col justify-center px-6 md:px-24 max-w-[1800px] mx-auto">
        <div className="max-w-5xl">
          
          {/* Subhead / Label */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-6 mb-8 text-[#C2A14D] font-mono text-[10px] tracking-[0.5em]"
          >
            <div className="w-10 h-[2px] bg-[#C2A14D]" />
            <span>{BRAND_CONTENT.subhead} // EST. 2026</span>
          </motion.div>

          {/* HEADLINE: LIQUID-GLASS MATERIALIZATION */}
          <motion.div 
            style={{ x: brandX, y: brandY }}
            className="relative mb-10 flex cursor-default select-none"
          >
            <h1 className="font-serif text-[18vw] md:text-[13rem] leading-[0.8] tracking-tighter mix-blend-lighten">
              {BRAND_CONTENT.headline.split("").map((char, i) => (
                <QuantumLetter key={i} char={char} index={i} />
              ))}
            </h1>
            
            {/* Holographic Reflection Layer */}
            <motion.div 
              className="absolute top-0 left-0 text-[18vw] md:text-[13rem] font-serif leading-[0.8] tracking-tighter text-[#C2A676] opacity-[0.04] blur-2xl pointer-events-none"
              animate={{ x: [0, 15, -15, 0], opacity: [0.04, 0.1, 0.04] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {BRAND_CONTENT.headline}
            </motion.div>
          </motion.div>

          {/* SLOGAN */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="text-lg md:text-2xl font-sans font-extralight tracking-widest text-[#C2A676] italic mb-10"
          >
            {BRAND_CONTENT.slogan}
          </motion.p>

          {/* PARAGRAPH: HUD-GLASS CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="max-w-2xl bg-white/[0.01] backdrop-blur-md border-l-[1px] border-[#C2A676]/20 p-6 md:p-8 relative overflow-hidden"
          >
            {/* Decorative Corner Trace */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C2A676]/40" />
            <p className="text-sm md:text-base font-light leading-relaxed text-[#E8E2D6]/80 text-justify">
              {BRAND_CONTENT.paragraph}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* 4. INFINITE DATA TICKER */}
      <div className="absolute bottom-0 left-0 w-full z-20 border-t border-[#C2A676]/10 py-5 bg-black/40 backdrop-blur-3xl">
        <motion.div 
          className="flex gap-28 whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        >
          {[...TRUST_METRICS, ...TRUST_METRICS, ...TRUST_METRICS].map((item, i) => (
            <span key={i} className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#C2A676]/40 flex items-center gap-3">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
