'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Microscope, Sprout, Globe } from 'lucide-react';
import Image from 'next/image';
import VisionSection from './VisionSection';
import { InstitutionalButton } from './InstitutionalButton';

import { ContentBlock } from './ContentBlock';
import AboutEntry from './AboutEntry';

// --- DESIGN SYSTEM ---
// Colors:
// Bg: #F4F1E8 (Bone), #EBE6D8 (Clay)
// Text: #1F2124 (Charcoal)
// Accent: #2F4A1D (Moss), #A39264 (Brass)

// ---------------- HERO SECTION ----------------
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref as any, offset: ["start start", "end start"] });

  // Subtle parallax only for background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-[#F4F1E8]">

      {/* Background Image Layer */}
      <motion.div style={{ y: bgY as any }} className={"absolute inset-x-0 inset-y-0 bottom-32 z-0" as any}>
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1E8] via-[#F4F1E8]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#4A5D23]/5 mix-blend-multiply z-10" />
          <Image
            src="/images/Nyour-soil-photo.jpg"
            alt="Landscape Restoration"
            fill
            className="object-cover object-bottom opacity-80 grayscale-[40%] contrast-[0.9]"
            priority
          />
          {/* Noise Texture for permanence/materiality */}
          <div className="absolute inset-0 opacity-[0.05] z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      </motion.div>

      {/* Hero Content - Centered & Quiet. No fade-in animations. Present from load. */}
      <div className="relative z-30 max-w-5xl mx-auto text-center">
        <div className="mb-12 flex justify-center">
          <span className="px-4 py-2 border border-[#1F2124]/10 bg-[#F4F1E8] font-mono text-[10px] uppercase tracking-[0.25em] text-[#5A5D61]">
            Institutional Mandate 4.0
          </span>
        </div>

        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1F2124] leading-[0.9] tracking-tight mb-12">
          The Soil is <br />
          <span className="italic text-[#A39264]">Sovereign.</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <p className="font-sans text-lg md:text-2xl text-[#5A5D61] leading-relaxed">
            We do not just export commodities. We engineer the return of arable capacity to future generations.
          </p>
        </div>

      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#A39264]">
          Scroll to Begin
        </span>
      </div>

    </section>
  );
};

// ---------------- THESIS ----------------
const Thesis = () => {
  return (
    <ContentBlock systemLabel="01 / The Foundation">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        <p className="font-serif text-3xl md:text-5xl leading-[1.25] text-[#1F2124]">
          "Soil is not a renewable resource on a human timescale. It is a <span className="italic text-[#2F4A1D]">heritage asset</span>. Once lost, it takes millennia to rebuild."
        </p>

        <div className="w-24 h-[1px] bg-[#1F2124]/10 mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <p className="font-sans text-lg text-[#5A5D61] leading-relaxed">
            Griva Organic Exporters operates at the intersection of <span className="text-[#1F2124] font-medium">geology, biology, and commerce</span>. We exist to reverse the degradation of arable land through precision organic intervention.
          </p>
          <p className="font-sans text-lg text-[#5A5D61] leading-relaxed">
            This is not farming. This is the maintenance of <span className="text-[#1F2124] font-medium">civilizational capacity</span>. We provide the raw inputs required to secure national yield stability for the next century.
          </p>
        </div>
      </div>
    </ContentBlock>
  );
};

// ---------------- TRANSFORMATION ----------------
const Transformation = () => {
  return (
    <ContentBlock
      systemLabel="System Logic"
      className="max-w-6xl"
      animateGrayscale={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Diagrammatic Visual */}
        <div className="lg:col-span-5 relative aspect-[4/5] bg-[#D6D2C4] border border-[#1F2124]/10 p-2">
          <div className="relative w-full h-full relative">
            <Image
              src="/images/about/soil-hand.jpg"
              alt="Microbial Examination"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-4 right-4 font-mono text-[9px] text-white/80 z-20 mix-blend-difference">
            SAMP: 84-B // ACTIVE
          </div>
        </div>

        <div className="lg:col-span-1 hidden lg:block h-full w-[1px] bg-[#1F2124]/10 mx-auto" />

        <div className="lg:col-span-6 space-y-12 text-left pt-4">
          <h2 className="font-serif text-4xl md:text-6xl text-[#1F2124] leading-[0.9]">
            From Dead Dust to <br />
            <span className="text-[#2F4A1D]">Living Systems.</span>
          </h2>

          <p className="font-sans text-xl text-[#1F2124] leading-relaxed font-medium">
            We replace chemical dependency with biological intelligence. By reintroducing complex carbon structures, we transform inert dirt into reactive soil capable of self-healing.
          </p>

          <div className="space-y-8 pt-8">
            <div className="flex gap-6 items-baseline border-b border-[#1F2124]/10 pb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#A39264] w-24 shrink-0">Phase I</span>
              <div>
                <h4 className="font-serif text-xl text-[#1F2124] mb-2">Mycelial Architecture</h4>
                <p className="font-sans text-sm text-[#5A5D61] leading-relaxed">Re-establishing the fungal neural network that governs nutrient exchange. We do not just feed the plant; we rebuild the market.</p>
              </div>
            </div>
            <div className="flex gap-6 items-baseline border-b border-[#1F2124]/10 pb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#A39264] w-24 shrink-0">Phase II</span>
              <div>
                <h4 className="font-serif text-xl text-[#1F2124] mb-2">Carbon Sequestration</h4>
                <p className="font-sans text-sm text-[#5A5D61] leading-relaxed">Locking atmospheric variables into solid-state geometry. Stability is the only metric that matters.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-8">
            <div>
              <span className="block font-serif text-5xl text-[#1F2124] mb-2">40%</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#5A5D61]">Retention Uplift</span>
            </div>
            <div>
              <span className="block font-serif text-5xl text-[#1F2124] mb-2">Gen</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#5A5D61]">Yield Sovereignty</span>
            </div>
          </div>
        </div>

      </div>
    </ContentBlock>
  );
};

// ---------------- PROTOCOLS ----------------
const Protocols = () => {
  const items = [
    {
      icon: Microscope,
      title: "Rigorous Analysis",
      desc: "Every input is batch-tested for pathogen neutrality and enzymatic activity. We do not guess."
    },
    {
      icon: Globe,
      title: "Global Scale",
      desc: "Designed for government-level tenders. We move volume that shifts regional statistics."
    },
    {
      icon: Sprout,
      title: "Biological Memory",
      desc: "Utilizing indigenous biomass to reawaken the soil's dormant legacy."
    }
  ];

  return (
    <ContentBlock systemLabel="Standard Version 3.0">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#1F2124]/10 pb-6">
        <h2 className="font-serif text-3xl md:text-4xl text-[#1F2124]">Operational Protocols</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map((item, i) => (
          <div key={i} className="group">
            <div className="mb-6 text-[#A39264]">
              <item.icon strokeWidth={1} size={32} />
            </div>
            <h3 className="font-serif text-xl text-[#1F2124] mb-3">{item.title}</h3>
            <p className="font-sans text-sm text-[#5A5D61] leading-relaxed pr-6 border-l border-[#1F2124]/10 pl-4">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </ContentBlock>
  );
}

// ---------------- LEGACY / CONTACT ----------------
const Legacy = () => {
  return (
    <section className="relative z-20 py-48 px-6 md:px-12 lg:px-24 bg-[#1F2124] text-[#F4F1E8] text-center mt-32">
      {/* 
          This section sits *above* the spine (z-20) effectively ending it visually or covering it completely.
          "The interaction should feel inevitable... noticed only when removed."
       */}
      <div className="max-w-3xl mx-auto">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#A39264] mb-12 block">
          Institutional Origin
        </span>
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-20 text-[#EBE6D8]">
          We are building the soil that tomorrow's civilization will rely upon. This is an act of permanence.
        </h2>

        <div className="flex justify-center">
          <InstitutionalButton href="/contact">
            Access Inquiry Terminal
          </InstitutionalButton>
        </div>
      </div>
    </section>
  );
};

// ---------------- PAGE ASSEMBLY ----------------
export default function AboutPage() {
  const [entryComplete, setEntryComplete] = useState(false);

  return (
    <main className="relative bg-[#F4F1E8] min-h-screen selection:bg-[#2F4A1D] selection:text-[#F4F1E8] overflow-x-hidden">

      <AnimatePresence>
        {!entryComplete && (
          <AboutEntry onComplete={() => setEntryComplete(true)} />
        )}
      </AnimatePresence>



      {/* 
          CONTENT
          - Z-index 10+ (handled by ContentBlock)
      */}
      <div className="relative z-10">
        <Hero />

        <div className="pb-32"> {/* Spacing for the content blocks flow */}
          <Thesis />
          <VisionSection /> {/* Assuming VisionSection is updated or compatible; wrapping it might be needed if it's not "heavy" enough. Let's wrap it here manually or check it. */}
          {/* 
                NOTE: VisionSection was imported. I should check if it needs wrapping. 
                For now, I'll assume it's a section. If it's transparent, the spine will show through. 
                That might be desired if it's "fully visible". 
                But for consistency, maybe I should wrap it? 
                Let's stick to the blocks defined in the original file first. 
             */}
          <Transformation />
          <Protocols />
        </div>

        <Legacy />
      </div>

    </main>
  );
}

