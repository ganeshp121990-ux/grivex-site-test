"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useTime } from "framer-motion";
import { Sprout } from "lucide-react";

export default function GrivaConnectorPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const time = useTime();

  const colors = { parchment: "#E6E4E0", gold: "#C2A14D", forest: "#1A2F1A" };

  // WOW EFFECT: Letter Stagger & Tracking Expansion
  const headerWords = "GRIVA WORLD".split("");
  const tracking = useTransform(smoothProgress, [0, 0.5], ["0.5em", "1.2em"]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // CONTENT REVEALS
  const sloganXLeft = useTransform(smoothProgress, [0.2, 0.5], [-60, 0]);
  const sloganXRight = useTransform(smoothProgress, [0.2, 0.5], [60, 0]);
  const sloganOpacity = useTransform(smoothProgress, [0.2, 0.45], [0, 1]);
  const sloganBlur = useTransform(smoothProgress, [0.2, 0.45], ["blur(10px)", "blur(0px)"]);

  // SEAL PHYSICS
  const sealRotation = useTransform(smoothProgress, [0, 1], [-45, 45]);
  const floatY = useTransform(time, (t) => Math.sin(t / 1500) * 6);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[55vh] w-full flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: colors.parchment }}
    >
      {/* 1. KINETIC HEADING - WOW MOMENT */}
     <div className="absolute top-12 left-0 w-full flex justify-center z-20 pointer-events-none">
  <div className="flex flex-col items-center leading-none">
  <motion.span
    style={{ y: useTransform(smoothProgress, [0, 0.4], [20, 0]), opacity: sloganOpacity }}
    className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-[#C2A14D]"
  >
    Enter To
  </motion.span>
  <motion.span
    style={{ y: useTransform(smoothProgress, [0, 0.4], [-20, 0]), opacity: sloganOpacity }}
    className="text-xl md:text-3xl font-serif font-bold tracking-[0.3em] text-[#355E3B]"
  >
    The Griva's World
  </motion.span>
</div>

</div>

      {/* 2. ATMOSPHERIC TEXTURE */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com')] z-0" />

      {/* 3. CENTER CONTENT CORE */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-12 mt-16">
        
        <motion.div 
          style={{ x: sloganXLeft, opacity: sloganOpacity }}
          className="hidden md:flex flex-col items-end text-right flex-1"
        >
          <span className="text-[15px] font-mono tracking-[0.5em] text-[#C2A14D] uppercase mb-2">Since 2025</span>
          {/* WOW Moment: Individual words sliding up through a mask */}
          <div className="overflow-hidden flex gap-3 h-12">
            {["Sustaining", "Earth"].map((word, i) => (
              <motion.h3
                key={i}
                style={{ 
                  y: useTransform(smoothProgress, [0.2 + (i * 0.1), 0.5], ["100%", "0%"]),
                  filter: sloganBlur 
                }}
                className={`text-4xl font-serif text-[#355E3B] leading-tight ${i === 1 ? 'italic font-light' : ''}`}
              >
                {word}
              </motion.h3>
            ))}
          </div>
        </motion.div>

        {/* The Rolling Seal */}
        <motion.div
          style={{ rotate: sealRotation, y: floatY }}
          className="relative mx-16 w-44 h-44 md:w-56 md:h-56 rounded-full border border-[#C2A14D]/20 flex items-center justify-center bg-white/40 backdrop-blur-md shadow-2xl"
        >
          <div className="absolute inset-3 border border-dashed border-[#C2A14D]/30 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="flex flex-col items-center">
            <Sprout size={40} className="text-[#C2A14D] mb-2" />
            <span className="text-2xl font-mono font-bold tracking-[0.3em] text-[#C2A14D] uppercase">Griva</span>
          </div>
        </motion.div>

       <motion.div 
          style={{ x: sloganXRight, opacity: sloganOpacity }}
          className="hidden md:flex flex-col items-start text-left flex-1"
        >
          <span className="text-[15px] font-mono tracking-[0.5em] text-[#C2A14D] uppercase mb-2">Premium Export</span>
          {/* WOW Moment: Individual words sliding up through a mask */}
          <div className="overflow-hidden flex gap-3 h-12">
            {["Supplying", "Growth"].map((word, i) => (
              <motion.h3
                key={i}
                style={{ 
                  y: useTransform(smoothProgress, [0.2 + (i * 0.1), 0.5], ["100%", "0%"]),
                  filter: sloganBlur 
                }}
                className={`text-4xl font-serif text-[#355E3B] leading-tight ${i === 1 ? 'italic font-light' : ''}`}
              >
                {word}
              </motion.h3>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile Experience */}
      <motion.div style={{ opacity: sloganOpacity }} className="md:hidden absolute bottom-10 text-center w-full px-6">
        <p className="text-[#1A2F1A] font-serif italic text-xl tracking-tight">Sustaining Earth &bull; Supplying Growth</p>
      </motion.div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-2 flex items-center z-30 pointer-events-none">
  <motion.div
    className="w-full h-[2px] rounded bg-gradient-to-r from-[#C2A14D]/50 via-[#F5F3EE]/20 to-[#C2A14D]/50"
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  />
</div>

    </section>
  );
}
