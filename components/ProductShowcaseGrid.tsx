"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Microscope, X } from "lucide-react";
import Link from "next/link";

const SHOWCASE_PRODUCTS = [
  {
    id: "01",
    name: "Premium Cow Dung Cake",
    tag: "Traditional Heritage",
    specs: "Sun-Dried | Hand-Crafted",
    proof: "Vedic Batch #V01 | High Energy",
    slug: "premium-cow-dung-cake",
    img: "/images/products/premium-cake.webp", // Ensure this file exists in /public/images/
    auraColor: 'rgba(118, 92, 72, 0.15)'
  },
  {
    id: "02",
    name: "Liquid Bio-Tea",
    tag: "Growth Catalyst",
    specs: "pH 7.2 | Aerobic Extraction",
    proof: "Lab Batch #A72F | ISO-Verified",
    slug: "liquid-bio-tea",
    img: "/images/products/bio-tea.webp",
    auraColor: 'rgba(31, 41, 31, 0.15)'
  },
  {
    id: "03",
    name: "Cow-Dung Powder",
    tag: "Soil Structure",
    specs: "Fine Mesh | Nutrient Dense",
    proof: "Batch #B45G | Origin Verified",
    slug: "cow-dung-powder",
    img: "/images/products/dung-powder.webp",
    auraColor: 'rgba(118, 92, 72, 0.15)'
  },
  {
    id: "04",
    name: "Purified Ash",
    tag: "Atmospheric Purity",
    specs: "Potash Source | Mineral Rich",
    proof: "QA #D11K | GOTS Compliant",
    slug: "purified-ash",
    img: "/images/products/purified-ash.webp",
    auraColor: 'rgba(212, 175, 55, 0.15)'
  },
  {
    id: "05",
    name: "Cow-Dung Pots",
    tag: "Biodegradable Luxury",
    specs: "Plastic-Free | Root Friendly",
    proof: "100% Compostable | Zero Waste",
    slug: "cow-dung-pots",
    img: "/images/products/cow-pots.webp",
    auraColor: 'rgba(31, 41, 31, 0.15)'
  },
];

const color_background = "#E6E4E0";
const color_griva_green = "#1F291F";
const color_griva_gold = "#D4AF37";
const color_card_bg = "#F9F7F2";

export default function EstateShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const [views, setViews] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // Maps vertical scroll to smooth horizontal transition
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  // Velocity for Card Scaling
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const cardScale = useTransform(scrollVelocity, [-500, 0, 500], [0.95, 1, 0.95]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = parseInt(localStorage.getItem('griva_views') || '0');
      localStorage.setItem('griva_views', (current + 1).toString());
      setViews(current + 1);

      if (localStorage.getItem('griva_hint')) setShowHint(false);
      else setTimeout(() => { setShowHint(false); localStorage.setItem('griva_hint', 'true'); }, 8000);
    }
  }, []);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#E6E4E0]">
      {/* Dynamic Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com')]" />
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.1), transparent 45%)` }} />
      </div>

      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-20 left-12 z-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <h2 className="text-[#C2A14D] text-[15px] font-bold uppercase tracking-[0.4em]">Griva: The Vault Collection</h2>
          </div>
          <h1 className="text-5xl font-serif text-[#355E3B]">The Portfolio Showcase</h1>
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-xl text-[12px] z-50">
              Scroll slowly to inspect →
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-6 md:px-12 lg:px-24">
          {SHOWCASE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} cardScale={cardScale} />
          ))}

          {/* CTA Card */}
          <div className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-[4/5] flex-shrink-0 flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-[#D4AF37]/30 bg-[#F9F7F2]/50">
            <div className="text-center px-12">
              <h3 className="text-2xl font-serif mb-4 text-[#1F291F]">Institutional <br /> Export Catalog</h3>
              <Link href="/catalog" className="inline-flex items-center gap-3 bg-[#1F291F] text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all shadow-xl">
                {views > 3 ? 'Download Compliance' : 'Enter Catalog'} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, cardScale }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isProof, setIsProof] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);
  const springX = useSpring(rotateX);
  const springY = useSpring(rotateY);

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div className="relative">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsProof(false); }}
        style={{ rotateX: springX, rotateY: springY, scale: cardScale, perspective: 1000 }}
        className="group relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-[4/5] flex-shrink-0 cursor-pointer"
      >
        <div className="absolute inset-0 rounded-[2rem] pointer-events-none" style={{ boxShadow: `inset 0 0 40px ${product.auraColor}` }} />

        <div className="w-full h-full rounded-[2rem] overflow-hidden border border-[#D4AF37]/20 bg-[#F9F7F2] flex flex-col shadow-lg">
          <div className="h-[55%] relative overflow-hidden bg-[#F2F0EA]">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover scale-90 group-hover:scale-100 transition-transform duration-700" />
            <div className="absolute top-6 right-6 p-2 bg-white/80 rounded-full border border-[#D4AF37]/20">
              <Microscope size={16} className="text-[#D4AF37]" />
            </div>
          </div>

          <div className="flex-1 p-8 bg-white flex flex-col justify-between">
            <div onMouseEnter={() => setIsProof(true)} onMouseLeave={() => setIsProof(false)}>
              <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1 block">{product.tag}</span>
              <h3 className="text-2xl font-serif text-[#1F291F] mb-3">{product.name}</h3>
              <p className="text-[11px] text-[#1F291F]/60 font-medium">
                {isProof ? product.proof : product.specs}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#F2F0EA]">
              <Link href="/catalog" className="flex items-center gap-2 text-[10px] font-bold text-[#1F291F] tracking-widest">
                SPECIFICATIONS
                <div className="w-6 h-6 rounded-full bg-[#1F291F] text-white flex items-center justify-center">
                  <ArrowUpRight size={12} />
                </div>
              </Link>
              <ShieldCheck size={20} className="text-[#D4AF37] cursor-help" onClick={() => setIsOpen(true)} />
            </div>
          </div>
        </div>
      </motion.div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={() => setIsOpen(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-2xl max-w-md w-full relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4"><X size={20} /></button>
            <h4 className="text-xl font-serif text-[#1F291F] mb-4">Trust Layer: {product.name}</h4>
            <div className="space-y-4 text-sm text-[#1F291F]/70">
              <p><strong>Origin:</strong> Ahmedabad Gujarat</p>
              <p><strong>Standards:</strong> ISO 9001:2026 Verified</p>
              <p><strong>Hash:</strong> 0x77GRV_{product.id}Z92</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
