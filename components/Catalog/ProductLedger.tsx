'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Flame,
  Droplets,
  Sprout,
  Globe,
  Wind,
  Menu,
  X,
  LayoutGrid,
  StretchHorizontal
} from 'lucide-react';

// --- 1. THE INSTITUTIONAL ARCHIVE (DATASET) ---
const PRODUCTS = [
  {
    id: "cakes",
    code: "G-BIO-01",
    name: "Sun-Dried Cow-Dung Cakes",
    category: "Solid Fuel / Ritual",
    concept: "The Flagship Energy Unit",
    desc: "The foundational caloric unit of the Griva ecosystem. Hand-formed and solar-cured to achieve optimal thermal density. Sourced exclusively from indigenous bovine lineages to ensure enzymatic purity and consistent combustion profiles.",
    origin: "Gir Somnath, Gujarat",
    formationMethod: "Hand-formed, Solar Cured (48hrs)",
    functionalUse: "Sacred combustion, thermal energy generation, atmospheric purification.",
    exportNotes: "Store in low humidity. Vacuum sealed for export compliance.",
    metadata: {
      batch: "B-2025-Q1",
      form: "Circular Disc",
      classification: "Bio-Solid A+"
    },
    images: [
      "/images/products/sun-dried-cow-dung-cakes/main.jpg",
      "/images/products/sun-dried-cow-dung-cakes/texture.jpg",
      "/images/products/sun-dried-cow-dung-cakes/packaging.jpg"
    ],
    specs: [
      { label: "Diameter", value: "20cm ± 5mm" },
      { label: "Moisture", value: "< 8% (Export Grade)" },
      { label: "Caloric Value", value: "3800 kcal/kg" },
      { label: "Combustion", value: "Clean / Low Smoke" }
    ],
    image: "/images/products/premium-cake.webp", // Keep for index thumbnail if needed
    icon: Flame,
    color: "#B08D55", // Antique Gold
    bg: "#E8E4D9"     // Warm Bone
  },
  {
    id: "tea",
    code: "G-LIQ-02",
    name: "Cow-Dung Liquid Bio-Tea",
    category: "Microbial Input",
    concept: "Microbial Soil Catalyst",
    desc: "A concentrated liquid fermentation designed to accelerate sub-soil microbial colonization. Engineered for drip-irrigation systems, this catalyst restores nitrogen-fixing bacteria to exhausted soil matrices.",
    origin: "Kutch, Gujarat",
    formationMethod: "Anaerobic Fermentation (21 Days)",
    functionalUse: "Soil revitalization, microbial inoculation, root zone activation.",
    exportNotes: "Temperature controlled shipping required. Vented cap for pressure eq.",
    metadata: {
      batch: "L-2025-JAN",
      form: "Liquid Concentrate",
      classification: "Live Culture"
    },
    images: [
      "/images/products/cow-dung-liquid-bio-tea/main.jpg",
      "/images/products/cow-dung-liquid-bio-tea/texture.jpg",
      "/images/products/cow-dung-liquid-bio-tea/packaging.jpg"
    ],
    specs: [
      { label: "Density", value: "1.05 g/cm³" },
      { label: "PH Balance", value: "6.8 - 7.2" },
      { label: "Active Culture", value: "> 10^9 CFU/ml" },
      { label: "Application", value: "Foliar / Drip" }
    ],
    image: "/images/products/bio-tea.webp",
    icon: Droplets,
    color: "#78866B", // Muted Moss
    bg: "#E3E6E0"     // Light Moss Mist
  },
  {
    id: "pots",
    code: "G-STR-03",
    name: "Cow-Dung Pots",
    category: "Nursery Infrastructure",
    concept: "Root-Integration Vessels",
    desc: "Zero-waste nursery vessels formed from compressed biomass. The pot structure degrades post-planting, becoming a primary nutrient source for the expanding root system, eliminating transplant shock.",
    origin: "Rajkot Rural, India",
    formationMethod: "Hydraulic Compression",
    functionalUse: "Sapling nurture, zero-shock transplantation.",
    exportNotes: "Fragile. Stack with dividers. Moisture sensitive.",
    metadata: {
      batch: "P-2024-Q4",
      form: "Molded Vessel",
      classification: "Biodegradable"
    },
    images: [
      "/images/products/cow-pots.webp",
      "/images/products/cow-pots.webp", // Placeholder
      "/images/products/cow-pots.webp"  // Placeholder
    ],
    specs: [
      { label: "Degradation", value: "45-60 Days" },
      { label: "Wall Thickness", value: "4mm Uniform" },
      { label: "Load Capacity", value: "2.5kg Wet Soil" },
      { label: "Binder", value: "Natural Gum" }
    ],
    image: "/images/products/cow-pots.webp",
    icon: Sprout,
    color: "#A67B5B", // Raw Clay
    bg: "#EBE5DF"     // Clay White
  },
  {
    id: "powder",
    code: "G-AMN-04",
    name: "Cow-Dung Powder",
    category: "Soil Amendment",
    concept: "Homogenized Matrix",
    desc: "Pulverized and screened organic matter for uniform field application. Ensures rapid integration into topsoil, improving water retention and aeration without the bulk of raw manure.",
    origin: "Amreli, Gujarat",
    formationMethod: "Sun Drying, Pulverizing, Screening",
    functionalUse: "Soil conditioning, potting mix base.",
    exportNotes: "Double-bagged. 25kg standard export sacks.",
    metadata: {
      batch: "PWD-25A",
      form: "Fine Granule",
      classification: "Soil Input"
    },
    images: [
      "/images/products/dung-powder.webp",
      "/images/products/Cow Dung Dry Powder.png",
      "/images/products/dung-powder.webp"
    ],
    specs: [
      { label: "Mesh Size", value: "40-60 Standard" },
      { label: "Organic Carbon", value: "> 18%" },
      { label: "N-P-K", value: "2.5 : 1.5 : 1.0" },
      { label: "Purity", value: "99.9% Weed Free" }
    ],
    image: "/images/products/dung-powder.webp",
    icon: Globe,
    color: "#8C6A5D", // Terracotta
    bg: "#EBE2DE"     // Warm Dust
  },
  {
    id: "sticks",
    code: "G-AIR-05",
    name: "Herbal Cow-Dung Dhoop Sticks",
    category: "Atmospheric Agent",
    concept: "Air Purification",
    desc: "A fusion of bovine biomass and ayurvedic botanicals. Designed for controlled smoldering to sanitize indoor air quality and neutralize pathogens through traditional fumigation.",
    origin: "Varanasi, India",
    formationMethod: "Extrusion & Shade Drying",
    functionalUse: "Atmospheric purification, ritual combustion.",
    exportNotes: "Aroma-sealed packaging. Keep dry.",
    metadata: {
      batch: "D-2025-02",
      form: "Cylindrical Stick",
      classification: "Aromatic"
    },
    images: [
      "/images/products/herbal-cow-dung-dhoop-sticks/main.jpg",
      "/images/products/herbal-cow-dung-dhoop-sticks/main.jpg", // Placeholder
      "/images/products/herbal-cow-dung-dhoop-sticks/main.jpg"  // Placeholder
    ],
    specs: [
      { label: "Burn Time", value: "45 Minutes" },
      { label: "Length", value: "150mm" },
      { label: "Core", value: "Bamboo-Free" },
      { label: "Binder", value: "Ghee & Resin" }
    ],
    image: "/images/products/herbal-cow-dung-dhoop-sticks/main.jpg",
    icon: Wind,
    color: "#C69C6D", // Sandalwood
    bg: "#ECE6DF"     // Sand
  },
  {
    id: "manure",
    code: "G-FER-06",
    name: "Organic Cow-Dung Manure",
    category: "Bulk Fertilizer",
    concept: "High-Yield Input",
    desc: "Aged and composted bulk organic fertilizer. Stabilized to prevent root burn and enriched with vermicompost for maximum nutrient bioavailability in commercial farming operations.",
    origin: "Gujarat Dairy Co-ops",
    formationMethod: "Aerobic Composting (180 Days)",
    functionalUse: "Broadacre fertilization, soil structure improvement.",
    exportNotes: "Bulk bags (1 Tonne) or retail packs.",
    metadata: {
      batch: "M-2024-DEC",
      form: "Coarse Granule",
      classification: "Fertilizer"
    },
    images: [
      "/images/products/Cow dung Manure.png",
      "/images/products/Cow dung Manure.png",
      "/images/products/Cow dung Manure.png"
    ],
    specs: [
      { label: "Ageing", value: "180 Days" },
      { label: "C:N Ratio", value: "20:1" },
      { label: "Moisture", value: "25-30%" },
      { label: "Format", value: "Granular" }
    ],
    image: "/images/products/Cow dung Manure.png",
    icon: Sprout,
    color: "#5F6F54", // Deep Olive
    bg: "#DFE3DD"     // Mist
  },
  {
    id: "ash",
    code: "G-RES-07",
    name: "Purified Cow-Dung Ash",
    category: "Mineral Residue",
    concept: "Alkaline Agent",
    desc: "The calcined mineral remains of pure indigenous cow dung. Highly alkaline and rich in trace minerals, used for specialized agricultural pH balancing and traditional applications.",
    origin: "Resource Recovery Unit, Surat",
    formationMethod: "High-Temp Calcination",
    functionalUse: "PH balancing, traditional abrasive, mineral supplement.",
    exportNotes: "Fine powder. Dust control required.",
    metadata: {
      batch: "A-2025-01",
      form: "Fine Powder",
      classification: "Mineral"
    },
    images: [
      "/images/products/purified-ash.webp",
      "/images/products/purified-ash.webp",
      "/images/products/purified-ash.webp"
    ],
    specs: [
      { label: "Temp", value: "800°C Calcination" },
      { label: "Texture", value: "Talc-Fine" },
      { label: "Color", value: "Silver Grey" },
      { label: "Packaging", value: "Vacuum Sealed" }
    ],
    image: "/images/products/purified-ash.webp",
    icon: Flame,
    color: "#8E9196", // Stone Grey
    bg: "#E6E7E8"     // Cool Grey
  },
];

// --- 2. MOTION PRIMITIVES ---
const PHYSICS_SPRING = { type: "spring", stiffness: 120, damping: 25, mass: 1.0 };

const CinematicImageSequencer = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Very slow, deliberate cycle. 6 seconds per image.
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length, index]);

  const handleManualChange = (newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F5F2EB]/50 group">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt="Product Detail Sequence"
          className="absolute inset-0 w-full h-full object-contain p-12 mix-blend-multiply cursor-pointer"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onClick={() => handleManualChange((index + 1) % images.length)}
          title="Click to view next view"
        />
      </AnimatePresence>

      {/* Subtle Grain Overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.svg')] mix-blend-overlay" />

      {/* Manual Indicators */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              handleManualChange(i);
            }}
            className={`
              h-1 transition-all duration-500 rounded-full
              ${i === index ? 'w-8 bg-[#3A3830]' : 'w-2 bg-[#3A3830]/20 hover:bg-[#3A3830]/40'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

// --- 3. COMPONENTS: VISUAL & LOGIC ---

// 3.1 CANVAS BACKGROUND (High Performance Fluid)
const CeremonialCanvasBackground = ({ activeColor }: { activeColor: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.002;
      ctx.clearRect(0, 0, width, height);

      // Create a gentle, shifting gradient mesh
      // We will draw 3 large radial gradients that move slowly

      // Base wash
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#FFFFFF'); // Top light
      gradient.addColorStop(1, '#F0EFE9'); // Bottom grounding
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Active Color Orb (Breathing)
      const cx1 = width * 0.5 + Math.sin(time) * 100;
      const cy1 = height * 0.4 + Math.cos(time * 0.8) * 50;
      const r1 = height * 0.6;

      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
      g1.addColorStop(0, `${activeColor}20`); // 20 = very low opacity hex
      g1.addColorStop(1, `${activeColor}00`);

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Secondary Orb (Contrast)
      const cx2 = width * 0.2 + Math.cos(time * 0.5) * 150;
      const cy2 = height * 0.8 + Math.sin(time * 0.7) * 80;
      const r2 = height * 0.5;

      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
      g2.addColorStop(0, '#B08D5515'); // Gold tint always present
      g2.addColorStop(1, '#B08D5500');

      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Noise Overlay simulation (using slight random rects or just leave to CSS)
      // Leaving to CSS for performance, canvas focuses on color shift

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
    />
  );
};

// 3.2 INDEX MENU (Top Navigation)
const IndexMenu = ({
  activeIndex,
  onSelect,
  viewMode,
  onToggleView
}: {
  activeIndex: number,
  onSelect: (index: number) => void,
  viewMode: 'SLIDE' | 'GRID',
  onToggleView: (m: 'SLIDE' | 'GRID') => void
}) => {
  return (
    <div className="absolute top-0 left-0 w-full z-30 px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mix-blend-multiply pointer-events-none">
      {/* Brand */}
      <div>
        <h1 className="text-2xl md:text-5xl font-serif text-[#355E3B]">The Griva Archive</h1>
      </div>

      {/* Horizontal Ticker */}
      <div className="flex-1 flex justify-center overflow-hidden px-4 md:px-12 pointer-events-auto">
        <div className="flex gap-8 overflow-x-auto no-scrollbar mask-gradient px-4">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onSelect(i)}
              className={`flex flex-col items-center gap-1 group transition-all duration-300 min-w-[max-content] ${i === activeIndex && viewMode === 'SLIDE' ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
            >
              <span className="font-mono text-[9px] uppercase tracking-wider">{p.code}</span>
              <span className={`h-[1px] bg-[#3A3830] transition-all duration-300 ${i === activeIndex && viewMode === 'SLIDE' ? 'w-full' : 'w-0 group-hover:w-1/2'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* View Toggle */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => onToggleView(viewMode === 'SLIDE' ? 'GRID' : 'SLIDE')}
          className="p-2 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2"
          title="Toggle View"
        >
          {viewMode === 'SLIDE' ? (
            <LayoutGrid size={20} strokeWidth={1} />
          ) : (
            <StretchHorizontal size={20} strokeWidth={1} />
          )}
        </button>
      </div>
    </div>
  );
}

// 3.3 PRODUCT CARD (Ceremonial Glass Plate)
const ProductCard = ({
  product,
  isActive,
  onSelect,
  className = ""
}: {
  product: any,
  isActive: boolean,
  onSelect: () => void,
  className?: string
}) => {
  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      initial={false}
      // Only apply scaling in SLIDE mode relative to active state. In GRID, we hover scale.
      animate={className ? {} : {
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.6,
        y: isActive ? 0 : 20,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* The Monolith Container */}
      <div
        className={`
            relative w-full h-[480px] md:h-[540px]
            bg-white/40 backdrop-blur-xl
            border transition-all duration-500
            flex flex-col items-center justify-between p-6 md:p-8
            overflow-hidden shadow-2xl
         `}
        // Default width handled by parent or className
        style={{
          borderColor: isActive ? 'rgba(58, 56, 48, 0.1)' : 'rgba(255, 255, 255, 0.2)',
          boxShadow: isActive
            ? '0 20px 60px -10px rgba(58, 56, 48, 0.1), 0 0 0 1px rgba(255,255,255,0.5) inset'
            : '0 10px 30px -10px rgba(0,0,0,0.05)'
        }}
      >
        {/* Internal Shine/Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-white/20 opacity-50 pointer-events-none" />

        {/* Top Label */}
        <div className="w-full flex justify-between items-start opacity-60 z-20 flex-none">
          <span className="font-mono text-[9px] uppercase tracking-widest border border-[#3A3830]/10 px-2 py-1 rounded-sm">
            {product.code}
          </span>
          <span className="font-serif text-xs italic text-[#3A3830]/70">Plate 0{PRODUCTS.indexOf(product) + 1}</span>
        </div>

        {/* Main Visual - Constraint Logic: min-h-0 allows flex child to shrink below content size if needed */}
        <div className="flex-1 w-full flex items-center justify-center relative z-10 py-6 min-h-0">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-xl"
            layoutId={`image-${product.id}`}
            draggable={false}
          />
        </div>

        {/* Bottom Info - Ensure it stays visible */}
        <div className="w-full text-center z-20 space-y-2 flex-none bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/40 shadow-sm">
          <h3 className="font-serif text-xl md:text-2xl text-[#3A3830] leading-none line-clamp-2">{product.name}</h3>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#3A3830]/60">{product.category}</p>
        </div>

        {/* Active Indicator Line */}
        {isActive && (
          <motion.div
            layoutId="active-line"
            className="absolute bottom-0 left-0 w-full h-1 bg-[#B08D55]"
          />
        )}
      </div>

      {/* Hover Glow */}
      <div
        className="absolute inset-0 -z-10 bg-[#B08D55] blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"
      />
    </motion.div>
  );
};

// --- 4. VIEW: INDEX (Main Slider) ---
const IndexView = ({ onSelect }: { onSelect: (p: any) => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'SLIDE' | 'GRID'>('SLIDE');
  const containerRef = useRef<HTMLDivElement>(null);

  const ITEM_WIDTH = 400; // Wider for cards
  const GAP = 20;
  const TOTAL_ITEM_WIDTH = ITEM_WIDTH + GAP;

  const x = useMotionValue(0);
  const springX = useSpring(x, PHYSICS_SPRING);

  // Center logic
  useEffect(() => {
    // wait for mount
    if (typeof window !== 'undefined') {
      const center = (window.innerWidth / 2) - (ITEM_WIDTH / 2);
      x.set(center);
      springX.set(center);
    }
  }, []);

  const snapTo = (index: number) => {
    // Clamp
    const i = Math.max(0, Math.min(index, PRODUCTS.length - 1));
    setActiveIndex(i);

    const center = window.innerWidth / 2;
    const offset = center - (ITEM_WIDTH / 2);
    const target = offset - (i * TOTAL_ITEM_WIDTH);

    springX.set(target);
    x.set(target);
  };

  const handleDragEnd = (event: any, info: any) => {
    const { velocity, offset } = info;
    const currentX = x.get();
    const predictedX = currentX + velocity.x * 0.2;

    const center = window.innerWidth / 2;
    const offsetStart = center - (ITEM_WIDTH / 2); // X position where index 0 is centered

    // index = (start - current) / total_width
    const rawIndex = (offsetStart - predictedX) / TOTAL_ITEM_WIDTH;
    const snappedIndex = Math.round(rawIndex);

    snapTo(snappedIndex);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[#F5F2EB] flex flex-col">

      {/* 4.0 CANVAS BG */}
      <CeremonialCanvasBackground activeColor={PRODUCTS[activeIndex].color} />

      {/* 4.1 TOP MENU */}
      <IndexMenu
        activeIndex={activeIndex}
        onSelect={snapTo}
        viewMode={viewMode}
        onToggleView={setViewMode}
      />

      {/* 4.2 CONTENT AREA */}
      <AnimatePresence mode="wait">
        {viewMode === 'SLIDE' ? (
          <motion.div
            key="slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex items-center relative z-10 touch-pan-y"
            ref={containerRef}
          >
            <motion.div
              className="flex items-center absolute left-0 pl-[0px] cursor-grab active:cursor-grabbing"
              style={{ x: springX, gap: GAP }}
              drag="x"
              dragConstraints={{
                left: -((PRODUCTS.length - 1) * TOTAL_ITEM_WIDTH),
                right: 100
              }}
              onDragEnd={handleDragEnd}
              whileTap={{ cursor: "grabbing" }}
            >
              {PRODUCTS.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isActive={i === activeIndex}
                  onSelect={() => {
                    if (i === activeIndex) onSelect(product);
                    else snapTo(i);
                  }}
                  className="w-[340px] md:w-[380px]"
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full overflow-y-auto z-10 p-4 md:p-12 custom-scrollbar active:cursor-default"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto pb-32 pt-16">
              {PRODUCTS.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isActive={false} // No active state in grid (all equal)
                  onSelect={() => onSelect(product)}
                  className="w-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4.3 BOTTOM CONTROLS (Only visible in SLIDE mode) */}
      {viewMode === 'SLIDE' && (
        <div className="flex-none h-24 flex items-center justify-between px-12 z-20 pointer-events-none md:pointer-events-auto mix-blend-multiply">
          <div className="text-[10px] font-mono tracking-widest opacity-40">
            FIG. {activeIndex + 1} &mdash; {PRODUCTS.length}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => snapTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="p-4 border border-[#3A3830]/10 rounded-full hover:bg-[#3A3830] hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-inherit active:scale-95 bg-white/40 backdrop-blur-md"
            >
              <ChevronLeft size={20} fontWeight={100} />
            </button>
            <button
              onClick={() => snapTo(activeIndex + 1)}
              disabled={activeIndex === PRODUCTS.length - 1}
              className="p-4 border border-[#3A3830]/10 rounded-full hover:bg-[#3A3830] hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-inherit active:scale-95 bg-white/40 backdrop-blur-md"
            >
              <ChevronRight size={20} fontWeight={100} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};


// --- 5. VIEW: DETAIL LAYERS (THE INSTITUTIONAL DOSSIER) ---
const DetailView = ({ product, onBack }: { product: any, onBack: () => void }) => {
  // Entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.1 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#F5F2EB] flex flex-col lg:flex-row overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 5.1 LEFT: CINEMATIC VISUALS (The Specimen) */}
      <motion.div
        className="flex-1 lg:h-full h-[40vh] relative bg-[#EBE8E0] border-b lg:border-b-0 lg:border-r border-[#3A3830]/10"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      >
        <CinematicImageSequencer images={product.images} />

        {/* Back Button - Absolute on desktop to keep it distinct */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-20 flex items-center gap-3 group mix-blend-multiply"
        >
          <div className="w-10 h-10 border border-[#3A3830]/20 rounded-full flex items-center justify-center group-hover:bg-[#3A3830] group-hover:text-white transition-all duration-300 backdrop-blur-sm">
            <ArrowLeft size={16} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
            Return to Ledger
          </span>
        </button>

        {/* Captions */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end mix-blend-multiply opacity-50 pointer-events-none">
          <div className="font-mono text-[9px] uppercase tracking-widest">
            {product.code}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest">
            Fig. 1.0 — 3.0
          </div>
        </div>
      </motion.div>

      {/* 5.2 RIGHT: THE DOSSIER (Structured Data) */}
      <div className="flex-1 lg:h-full h-[60vh] relative overflow-y-auto custom-scrollbar bg-[#F5F2EB]">
        <div className="min-h-full flex flex-col">

          {/* Header Section */}
          <div className="sticky top-0 z-10 bg-[#F5F2EB]/95 backdrop-blur-sm border-b border-[#3A3830]/10 px-8 py-6 md:px-16 md:py-8 flex justify-between items-start">
            <div>
              <motion.div variants={itemVariants} className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">
                Asset Record
              </motion.div>
              <motion.h1 variants={itemVariants} className="font-serif text-3xl md:text-4xl text-[#3A3830]">
                {product.name}
              </motion.h1>
            </div>
            <motion.div variants={itemVariants} className="hidden md:block font-mono text-[10px] text-right opacity-40">
              {product.metadata.classification}<br />
              {product.metadata.batch}
            </motion.div>
          </div>

          {/* Dossier Content */}
          <div className="flex-1 px-8 py-12 md:px-16 md:py-16 space-y-16">

            {/* 01. OVERVIEW & ORIGIN */}
            <motion.section variants={itemVariants} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-4">
                  <span className="section-label">01 // Concept</span>
                  <p className="font-serif text-lg leading-relaxed text-[#3A3830]">{product.concept}</p>
                  <p className="text-sm leading-loose opacity-70 max-w-lg">{product.desc}</p>
                </div>
                <div className="space-y-4 pt-1">
                  <span className="section-label">Origin & Method</span>
                  <div className="data-row">
                    <span className="data-label">Origin</span>
                    <span className="data-value">{product.origin}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Formation</span>
                    <span className="data-value">{product.formationMethod}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Form</span>
                    <span className="data-value">{product.metadata.form}</span>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="w-full h-[1px] bg-[#3A3830]/5" />

            {/* 02. TECHNICAL SPECIFICATIONS */}
            <motion.section variants={itemVariants} className="space-y-6">
              <span className="section-label">02 // Technical Specifications</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                {product.specs.map((s: any, i: number) => (
                  <div key={i} className="flex flex-col gap-1 border-l border-[#3A3830]/10 pl-4">
                    <span className="font-mono text-[9px] uppercase opacity-40">{s.label}</span>
                    <span className="font-serif text-base text-[#3A3830]">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <div className="w-full h-[1px] bg-[#3A3830]/5" />

            {/* 03. FUNCTION & HANDLING */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <span className="section-label">03 // Functional Use</span>
                  <p className="text-sm leading-loose opacity-70">{product.functionalUse}</p>
                </div>
                <div className="space-y-4">
                  <span className="section-label">04 // Export & Handling</span>
                  <p className="text-sm leading-loose opacity-70">{product.exportNotes}</p>
                </div>
              </div>
            </motion.section>

          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 mt-auto bg-[#F5F2EB]/95 backdrop-blur-md border-t border-[#3A3830]/10 px-8 py-6 md:px-16 flex flex-col md:flex-row gap-4 items-center">
            <motion.button
              variants={itemVariants}
              className="w-full md:w-auto flex-1 bg-[#3A3830] text-[#F5F2EB] py-4 px-8 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#504E46] transition-colors flex items-center justify-center gap-3"
            >
              Inquire for Export
            </motion.button>
            <motion.button
              variants={itemVariants}
              className="w-full md:w-auto h-full border border-[#3A3830]/20 py-4 px-6 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#3A3830] hover:text-[#F5F2EB] transition-colors flex items-center justify-center gap-2"
            >
              <Download size={14} />
              <span>Spec Sheet ({product.code})</span>
            </motion.button>
          </div>

        </div>
      </div>

      <style jsx>{`
        .section-label {
          display: block;
          font-family: monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #3A3830;
          opacity: 0.4;
          margin-bottom: 0.5rem;
        }
        .data-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }
        .data-label {
           font-family: monospace;
           font-size: 9px;
           text-transform: uppercase;
           opacity: 0.4;
        }
        .data-value {
           font-family: serif;
           font-size: 14px;
        }
      `}</style>
    </motion.div>
  );
}



// --- 6. ROOT CONTROLLER ---

// Preload Helper
import { useAssetLoader } from '@/lib/hooks/useAssetLoader';

export default function ProductLedger() {
  const [activeProduct, setActiveProduct] = useState<any | null>(null);

  // Preload all product images
  const assetUrls = useMemo(() => PRODUCTS.map(p => p.image), []);
  const { loaded, progress } = useAssetLoader(assetUrls);

  if (!loaded) {
    return (
      <div className="h-screen w-full bg-[#F5F2EB] flex items-center justify-center flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#3A3830]/50 animate-pulse">
          Initializing Archive...
        </span>
        <div className="w-32 h-[1px] bg-[#3A3830]/10 overflow-hidden">
          <motion.div
            className="h-full bg-[#3A3830]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <main className={`bg-[#F5F2EB] text-[#3A3830] min-h-screen relative overflow-hidden`}>
      <AnimatePresence mode="wait">
        {activeProduct ? (
          <DetailView
            key="detail"
            product={activeProduct}
            onBack={() => setActiveProduct(null)}
          />
        ) : (
          <motion.div
            key="overview"
            className="flex flex-col h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <IndexView onSelect={setActiveProduct} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}