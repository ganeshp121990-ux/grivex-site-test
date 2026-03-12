"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue 
} from "framer-motion";
import { 
  ShieldCheck, Package, Microscope, Sprout, 
  Database, RefreshCw, Users, Truck, Lock, Activity 
} from "lucide-react";
import { cn } from "@/lib/utils";

const THEME = {
  bg: "bg-[#E6E4E0]",
  textMain: "text-[#1F291F]",
  accent: "text-[#D4AF37]",
  cardGlass: "bg-[#F0EFEC]/80", // Increased opacity for density
};

// --- EXPANDED DATA (8 MODULES) ---
const FEATURES = [
  { icon: <Sprout size={20} />, title: "Bio-Organic Input", desc: "100% Grass-fed bovine origin.", hash: "ORG-01", id: "01" },
  { icon: <Microscope size={20} />, title: "Molecular Scan", desc: "Pathogen & NPK verification.", hash: "LAB-9X", id: "02" },
  { icon: <Database size={20} />, title: "Digital Trace", desc: "Blockchain immutable ledger.", hash: "BLK-CHAIN", id: "03" },
  { icon: <ShieldCheck size={20} />, title: "Global Compliance", desc: "USDA / EU / APEDA cleared.", hash: "REG-EU", id: "04" },
  { icon: <Package size={20} />, title: "Vacuum Seal", desc: "Moisture-locked fumigation.", hash: "PKG-VAC", id: "05" },
  { icon: <Truck size={20} />, title: "Rapid Logistics", desc: "Optimized export corridors.", hash: "LOG-FAST", id: "06" },
  { icon: <RefreshCw size={20} />, title: "Soil Regen", desc: "Carbon-negative cycle.", hash: "ECO-POS", id: "07" },
  { icon: <Users size={20} />, title: "Fair Trade", desc: "Direct farmer partnerships.", hash: "SOC-VAL", id: "08" },
];

export default function QualityPromises() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for rows (Odd rows move left, Even rows move right)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const xRow1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const xRow2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={containerRef}
      className={cn("relative w-full min-h-screen flex flex-col justify-center py-24 overflow-hidden", THEME.bg)}
    >
      
      {/* 1. DENSE BACKGROUND GRID (Fills the emptiness) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F291F_1px,transparent_1px),linear-gradient(to_bottom,#1F291F_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />
        
        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6">
        
        {/* HEADER (Compact) */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#1A1C16]/5 border border-[#1A1C16]/5 backdrop-blur-md"
          >
            <ShieldCheck size={14} className={THEME.accent} />
            <span className={cn("text-xs font-mono uppercase tracking-widest", THEME.textMain)}>
              Verified Operations Protocol
            </span>
          </motion.div>
          
          <h2 className={cn("text-5xl md:text-7xl font-serif mb-6", THEME.textMain)}>
            The Griva <span className={cn("italic", THEME.accent)}>Standard</span>
          </h2>
          
          <p className={cn("max-w-2xl mx-auto text-lg font-light leading-relaxed", THEME.textMain)}>
            We don't just export products; we engineer trust. Our quality control is a rigorous, multi-stage secure process combining nature with data.
          </p>
        </div>

        {/* 2. COMPACT GRID (4 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, index) => (
            <CompactModule key={index} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENT: COMPACT MODULE ---
function CompactModule({ feature, index }: { feature: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ margin: "-50px" }}
      className="group relative h-[220px] w-full perspective-1000"
    >
      <div className={cn(
        "absolute inset-0 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300",
        THEME.cardGlass, 
        "backdrop-blur-md border border-[#1F291F]/5",
        "hover:border-[#D4AF37]/50 hover:bg-white hover:shadow-xl hover:shadow-[#D4AF37]/10",
        "hover:-translate-y-1" // Subtle lift
      )}>
        
        {/* TOP ROW */}
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-[#1F291F]/5 flex items-center justify-center text-[#1F291F] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
             {feature.icon}
          </div>
          <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
             <span className="text-[9px] font-mono tracking-wider">{feature.hash}</span>
             <Lock size={10} />
          </div>
        </div>

        {/* CONTENT */}
        <div>
          <h3 className="text-lg font-serif text-[#1F291F] mb-2 group-hover:text-[#D4AF37] transition-colors">
            {feature.title}
          </h3>
          <p className="text-xs text-[#1F291F]/60 leading-relaxed font-medium">
            {feature.desc}
          </p>
        </div>

        {/* ACTIVE INDICATOR (The "Tech" Feel) */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1F291F]/5 overflow-hidden rounded-b-2xl">
           <div className="w-full h-full bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
        </div>

      </div>
    </motion.div>
  );
}