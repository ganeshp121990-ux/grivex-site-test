'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    AnimatePresence,
} from 'framer-motion';
import {
    Sprout,
    Globe2,
    Dna,
    Layers,
    ArrowRight,
    Microscope,
    Leaf,
    Wind,
    Wheat,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
DESIGN TOKENS
───────────────────────────────────────────────────────────────────────────── */
const C = {
    bg: '#F5F1E8',
    surface1: '#EFE6D6',
    surface2: '#E6DAC5',
    gold: '#C6A96B',
    brown: '#8C6A3C',
    textPrimary: '#3F3526',
    textSecondary: '#6B5B45',
};

/* ─────────────────────────────────────────────────────────────────────────────
DATA
───────────────────────────────────────────────────────────────────────────── */
const stats = [
    { value: '12M+', label: 'Acres Assessed' },
    { value: '87%', label: 'Soil Health Uplift' },
    { value: '40+', label: 'Partner Farms' },
    { value: '2031', label: 'Carbon Neutral Goal' },
];

const pillars = [
    {
        icon: Sprout,
        num: '01',
        title: 'Soil Sovereignty',
        desc: 'Control over soil health restores ecological independence and long-term resilience.',
        insight:
            'Healthy soil is the ultimate form of sovereignty — it anchors food systems, water cycles, and biodiversity within a single living substrate.',
    },
    {
        icon: Globe2,
        num: '02',
        title: 'Civilizational Capacity',
        desc: 'Sustainable agriculture forms the backbone of strong societies.',
        insight:
            'Every great civilization rose and fell on the health of its land. We are rebuilding the foundation for the next epoch of human flourishing.',
    },
    {
        icon: Dna,
        num: '03',
        title: 'Biological Intelligence',
        desc: "Nature's complex biological systems guide regenerative design.",
        insight:
            "From mycorrhizal networks to microbial consortia, we decode nature's operating system and translate it into scalable agricultural practice.",
    },
    {
        icon: Layers,
        num: '04',
        title: 'Future Heritage Assets',
        desc: 'Healthy soil compounds value across generations.',
        insight:
            'Restored farmland is the most durable store of value humanity can create — it appreciates biologically, economically, and ecologically over time.',
    },
];

const phases = [
    {
        icon: Microscope,
        phase: '01',
        title: 'Condition Zero',
        tag: 'Diagnosis',
        desc: 'Understanding degraded ecosystems and soil collapse.',
        detail:
            'We begin with comprehensive soil profiling — mapping compaction layers, microbial deserts, and chemical saturation. Without precise diagnosis, intervention is guesswork.',
        color: '#C6A96B',
    },
    {
        icon: Leaf,
        phase: '02',
        title: 'Biological Intervention',
        tag: 'Catalysis',
        desc: 'Introducing microbial and fungal life to restart soil processes.',
        detail:
            'Targeted inoculants of bacteria, fungi, and protozoa are introduced to catalyse decomposition pathways and restart the nutrient cycle from the ground up.',
        color: '#8C6A3C',
    },
    {
        icon: Wind,
        phase: '03',
        title: 'Living Soil',
        tag: 'Emergence',
        desc: 'Building a complex self-sustaining soil ecosystem.',
        detail:
            'As biodiversity compounds, the soil begins to self-regulate — retaining moisture, cycling nutrients, and suppressing pathogens without external inputs.',
        color: '#6B8C3C',
    },
    {
        icon: Wheat,
        phase: '04',
        title: 'Productive Farms',
        tag: 'Abundance',
        desc: 'Transforming regenerated soil into resilient food systems.',
        detail:
            'With biology restored, farms achieve yields that rival conventional systems — without synthetic inputs — while sequestering carbon and building legacy land value.',
        color: '#3C6B8C',
    },
];

/* ─────────────────────────────────────────────────────────────────────────────
EASING
───────────────────────────────────────────────────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ─────────────────────────────────────────────────────────────────────────────
SOIL PARTICLE BACKGROUND
───────────────────────────────────────────────────────────────────────────── */
interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
    delay: number;
}

function SoilParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const p: Particle[] = Array.from({ length: 28 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1.5,
            opacity: Math.random() * 0.2 + 0.05,
            duration: Math.random() * 12 + 8,
            delay: Math.random() * 6,
        }));
        setParticles(p);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: C.brown,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -18, 0],
                        opacity: [p.opacity, p.opacity * 2.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
MYCELIUM NETWORK SVG
───────────────────────────────────────────────────────────────────────────── */
function MyceliumNetwork() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1200 700"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
            >
                <motion.path
                    d="M100,350 Q300,100 600,350 Q900,600 1100,350"
                    stroke={C.brown}
                    strokeWidth="1"
                    strokeOpacity="0.08"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 3.5, ease }}
                />
                <motion.path
                    d="M0,200 Q200,500 500,250 Q800,0 1200,400"
                    stroke={C.gold}
                    strokeWidth="0.8"
                    strokeOpacity="0.07"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 4, delay: 0.5, ease }}
                />
                <motion.path
                    d="M200,600 Q400,200 700,450 Q1000,700 1200,300"
                    stroke={C.brown}
                    strokeWidth="1.2"
                    strokeOpacity="0.06"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 4.5, delay: 1, ease }}
                />
                {/* branch nodes */}
                {[
                    { cx: 300, cy: 220 },
                    { cx: 600, cy: 350 },
                    { cx: 900, cy: 480 },
                    { cx: 450, cy: 500 },
                    { cx: 750, cy: 180 },
                ].map((node, i) => (
                    <motion.circle
                        key={i}
                        cx={node.cx}
                        cy={node.cy}
                        r="3"
                        fill={C.gold}
                        fillOpacity="0.12"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1.5 + i * 0.3 }}
                    />
                ))}
                {/* branch lines */}
                <motion.path
                    d="M300,220 L450,500 M600,350 L750,180 M900,480 L750,180"
                    stroke={C.brown}
                    strokeWidth="0.6"
                    strokeOpacity="0.07"
                    strokeDasharray="4 8"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 3, delay: 2 }}
                />
            </svg>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
PILLAR CARD (scroll-triggered individually)
───────────────────────────────────────────────────────────────────────────── */
function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const Icon = pillar.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.85, delay: index * 0.05, ease }}
            className="group relative p-8 md:p-10 rounded-[2rem] border cursor-default"
            style={{
                background: `linear-gradient(135deg, ${C.surface1} 0%, ${C.bg} 100%)`,
                borderColor: `${C.gold}22`,
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            }}
        >
            {/* hover glow */}
            <div
                className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(ellipse at top left, ${C.gold}10 0%, transparent 70%)`,
                }}
            />

            {/* left accent */}
            <div
                className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: C.gold }}
            />

            <div className="flex items-center gap-4 mb-5 relative z-10">
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-500"
                    style={{ background: `${C.gold}18` }}
                >
                    <Icon size={20} strokeWidth={1.5} style={{ color: C.gold }} />
                </div>
                <span
                    className="text-xs font-mono tracking-[0.25em] uppercase"
                    style={{ color: C.gold }}
                >
                    {pillar.num}
                </span>
            </div>

            <h3
                className="text-xl md:text-2xl font-serif mb-3 relative z-10"
                style={{ color: C.textPrimary }}
            >
                {pillar.title}
            </h3>
            <p
                className="text-sm md:text-base font-light leading-relaxed mb-4 relative z-10"
                style={{ color: C.textSecondary }}
            >
                {pillar.desc}
            </p>
            <p
                className="text-xs md:text-sm font-light leading-relaxed max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-in-out relative z-10"
                style={{ color: `${C.textSecondary}99` }}
            >
                {pillar.insight}
            </p>

            <div
                className="mt-5 flex items-center gap-2 text-xs font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-400 relative z-10"
                style={{ color: C.gold }}
            >
                <span>Learn more</span>
                <ArrowRight size={11} />
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
JOURNEY PHASE CARD
───────────────────────────────────────────────────────────────────────────── */
function PhaseCard({
    phase,
    isActive,
    onClick,
}: {
    phase: typeof phases[0];
    isActive: boolean;
    onClick: () => void;
}) {
    const Icon = phase.icon;
    return (
        <motion.button
            onClick={onClick}
            animate={{
                opacity: isActive ? 1 : 0.38,
                scale: isActive ? 1 : 0.97,
            }}
            transition={{ duration: 0.55, ease }}
            className="w-full text-left p-6 md:p-8 rounded-[1.5rem] border transition-all duration-500 focus-visible:outline-none"
            style={{
                background: isActive
                    ? `linear-gradient(135deg, ${C.surface1} 0%, ${C.bg} 100%)`
                    : C.bg,
                borderColor: isActive ? phase.color + '55' : `${C.gold}18`,
                boxShadow: isActive
                    ? `0 16px 40px rgba(0,0,0,0.08), 0 0 0 1px ${phase.color}22`
                    : '0 2px 8px rgba(0,0,0,0.03)',
            }}
        >
            <div className="flex items-start gap-4">
                <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-400"
                    style={{
                        background: isActive ? phase.color + '20' : `${C.gold}10`,
                    }}
                >
                    <Icon
                        size={18}
                        strokeWidth={1.5}
                        style={{ color: isActive ? phase.color : C.gold }}
                    />
                </div>
                <div>
                    <span
                        className="text-[10px] font-mono tracking-widest uppercase block mb-1"
                        style={{ color: phase.color }}
                    >
                        Phase {phase.phase} · {phase.tag}
                    </span>
                    <h3
                        className="text-base md:text-lg font-serif mb-1"
                        style={{ color: C.textPrimary }}
                    >
                        {phase.title}
                    </h3>
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.45, ease }}
                            >
                                <p
                                    className="text-sm font-light leading-relaxed mt-2"
                                    style={{ color: C.textSecondary }}
                                >
                                    {phase.desc}
                                </p>
                                <p
                                    className="text-xs font-light leading-relaxed mt-3 pt-3 border-t"
                                    style={{
                                        color: `${C.textSecondary}88`,
                                        borderColor: `${C.gold}20`,
                                    }}
                                >
                                    {phase.detail}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.button>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function MissionPage() {
    /* ── Shared scroll ref for the whole page ── */
    const pageRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });

    /* ── Hero scroll transforms ── */
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroTitleScale = useSpring(
        useTransform(heroProgress, [0, 1], [1, 0.82]),
        { stiffness: 80, damping: 20 }
    );
    const heroTitleY = useSpring(
        useTransform(heroProgress, [0, 1], [0, -60]),
        { stiffness: 80, damping: 20 }
    );
    const heroSubtitleOpacity = useTransform(heroProgress, [0, 0.25, 0.6], [0, 1, 0]);
    const heroParallaxY = useTransform(heroProgress, [0, 1], [0, 120]);
    const heroBgOpacity = useTransform(heroProgress, [0, 0.3], [0.06, 0.14]);

    /* ── Journey phase tracking via scroll ── */
    const journeyRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: journeyProgress } = useScroll({
        target: journeyRef,
        offset: ['start center', 'end center'],
    });
    const [activePhase, setActivePhase] = useState(0);

    useEffect(() => {
        return journeyProgress.on('change', (v) => {
            const idx = Math.min(phases.length - 1, Math.floor(v * phases.length));
            setActivePhase(idx < 0 ? 0 : idx);
        });
    }, [journeyProgress]);

    /* ── Scroll progress bar ── */
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    /* ── Final vision section ── */
    const visionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: visionProgress } = useScroll({
        target: visionRef,
        offset: ['start end', 'center center'],
    });
    const visionTextScale = useSpring(
        useTransform(visionProgress, [0, 1], [0.9, 1]),
        { stiffness: 80, damping: 20 }
    );
    const visionOpacity = useTransform(visionProgress, [0, 0.5], [0, 1]);
    const visionBg = useTransform(
        visionProgress,
        [0, 1],
        [`linear-gradient(160deg, ${C.surface1} 0%, ${C.bg} 100%)`,
        `linear-gradient(160deg, ${C.gold}40 0%, ${C.surface2} 100%)`]
    );

    /* ── Stats section ── */
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

    /* ── System logic section ── */
    const sysRef = useRef<HTMLDivElement>(null);
    const sysInView = useInView(sysRef, { once: true, margin: '-80px' });

    return (
        <div
            ref={pageRef}
            className="relative font-sans selection:bg-amber-200/60"
            style={{ background: C.bg, color: C.textPrimary }}
        >
            {/* ── Global scroll progress bar ── */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[999] origin-left"
                style={{ scaleX, background: `linear-gradient(90deg, ${C.gold}, ${C.brown})` }}
            />

            {/* ────────────────────────────────────────────────────────────────
                    SECTION 1 — HERO
                ──────────────────────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
                style={{ isolation: 'isolate' }}
            >
                {/* Soil texture background */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        y: heroParallaxY,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '240px 240px',
                        opacity: heroBgOpacity as unknown as number,
                    }}
                />

                {/* Radial warm glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at 50% 40%, ${C.gold}18 0%, transparent 68%)`,
                    }}
                />



                <div className="relative z-10 max-w-5xl w-full text-center">
                    {/* Label */}
                    <motion.span
                        initial={{ opacity: 0, y: -18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                        className="inline-block text-xs font-mono tracking-[0.35em] uppercase mb-10"
                        style={{ color: C.gold }}
                    >
                        Est. 2021 · Regenerative Systems
                    </motion.span>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.35, ease }}
                        className="text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7rem] font-serif font-light tracking-tight mb-8 leading-[1.05]"
                        style={{
                            scale: heroTitleScale,
                            y: heroTitleY,
                            color: C.textPrimary,
                            transformOrigin: 'center top',
                        }}
                    >
                        Mission &amp;
                        <br />
                        <span style={{ color: C.brown }}>Philosophy</span>
                    </motion.h1>

                    {/* Subtitle — fades in as you start scrolling */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.65 }}
                        className="max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed"
                        style={{
                            opacity: heroSubtitleOpacity,
                            color: C.textSecondary,
                        }}
                    >
                        Restoring soil is more than agriculture. It is the foundation of resilient
                        ecosystems, thriving civilizations, and generational prosperity.
                    </motion.p>

                    {/* Scroll cue */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{
                            opacity: { delay: 1.4, duration: 0.6 },
                            y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 1.6 },
                        }}
                        className="mt-20 mx-auto flex flex-col items-center gap-2"
                        style={{ color: `${C.textSecondary}55` }}
                        aria-hidden
                    >
                        <span className="text-[9px] tracking-[0.3em] uppercase font-mono">
                            Scroll to explore
                        </span>
                        <div
                            className="w-[1px] h-10 rounded-full"
                            style={{
                                background: `linear-gradient(to bottom, ${C.gold}60, transparent)`,
                            }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────
                    SECTION 2 — PHILOSOPHY PILLARS
                ──────────────────────────────────────────────────────────────── */}
            <section
                id="pillars"
                className="py-24 px-6 max-w-7xl mx-auto"
                aria-labelledby="pillars-heading"
            >
                {/* Section header */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease }}
                        className="text-xs font-mono tracking-[0.3em] uppercase mb-4"
                        style={{ color: C.gold }}
                    >
                        Core Doctrine
                    </motion.p>
                    <motion.h2
                        id="pillars-heading"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        className="text-3xl md:text-5xl font-serif mb-5"
                        style={{ color: C.textPrimary }}
                    >
                        Core Philosophical Pillars
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3, ease }}
                        className="w-20 h-[1px] mx-auto origin-left"
                        style={{ background: C.gold }}
                    />
                </div>

                {/* Pillar cards — each triggers independently */}
                <div className="grid md:grid-cols-2 gap-5 lg:gap-8">
                    {pillars.map((p, i) => (
                        <PillarCard key={p.title} pillar={p} index={i} />
                    ))}
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────
                    SECTION 3 — REGENERATIVE JOURNEY (sticky scroll)
                ──────────────────────────────────────────────────────────────── */}
            <section
                className="py-24 px-6"
                aria-labelledby="journey-heading"
                style={{ background: C.surface1 }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-20">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease }}
                            className="text-xs font-mono tracking-[0.3em] uppercase mb-4"
                            style={{ color: C.gold }}
                        >
                            The Transformation
                        </motion.p>
                        <motion.h2
                            id="journey-heading"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease }}
                            className="text-3xl md:text-5xl font-serif"
                            style={{ color: C.textPrimary }}
                        >
                            From Degraded Land
                            <br />
                            <span style={{ color: C.brown }}>to Living Ecosystems</span>
                        </motion.h2>
                    </div>

                    {/* Scroll-driven Journey */}
                    <div
                        ref={journeyRef}
                        className="relative"
                        style={{
                            minHeight: typeof window !== 'undefined' && window.innerWidth < 1024
                                ? 'auto'
                                : `${phases.length * 55}dvh`
                        }}
                    >
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:sticky lg:top-24">
                            {/* Left: Vertical progress + phase list */}
                            <div className="lg:w-[45%] flex flex-col gap-4 relative">
                                {/* Progress line */}
                                <div className="hidden lg:block absolute left-5 top-3 bottom-3 w-[1px]"
                                    style={{ background: `${C.gold}20` }}>
                                    <motion.div
                                        className="absolute top-0 left-0 right-0 origin-top"
                                        style={{
                                            scaleY: useTransform(
                                                journeyProgress,
                                                [0, 1],
                                                [0, 1]
                                            ),
                                            background: `linear-gradient(to bottom, ${C.gold}, ${C.brown})`,
                                        }}
                                    />
                                </div>

                                {phases.map((phase, i) => (
                                    <PhaseCard
                                        key={phase.title}
                                        phase={phase}
                                        isActive={activePhase === i}
                                        onClick={() => setActivePhase(i)}
                                    />
                                ))}
                            </div>

                            {/* Right: Large storytelling display */}
                            <div className="lg:w-[55%]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={phases[activePhase].title}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.55, ease }}
                                        className="relative rounded-[2rem] overflow-hidden p-10 md:p-14 min-h-[320px] flex flex-col justify-between"
                                        style={{
                                            background: `linear-gradient(145deg, ${C.bg} 0%, ${C.surface2} 100%)`,
                                            boxShadow: '0 24px 60px rgba(0,0,0,0.08)',
                                            border: `1px solid ${phases[activePhase].color}30`,
                                        }}
                                    >
                                        {/* Phase accent blob */}
                                        <div
                                            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                                            style={{
                                                background: `${phases[activePhase].color}12`,
                                                transform: 'translate(30%, -30%)',
                                            }}
                                        />

                                        <div className="relative z-10">
                                            <span
                                                className="text-[10px] font-mono tracking-[0.3em] uppercase"
                                                style={{ color: phases[activePhase].color }}
                                            >
                                                Phase {phases[activePhase].phase} ·{' '}
                                                {phases[activePhase].tag}
                                            </span>

                                            <h3
                                                className="text-3xl md:text-5xl font-serif mt-3 mb-5 leading-tight"
                                                style={{ color: C.textPrimary }}
                                            >
                                                {phases[activePhase].title}
                                            </h3>

                                            <p
                                                className="text-base md:text-lg font-light leading-relaxed mb-5"
                                                style={{ color: C.textSecondary }}
                                            >
                                                {phases[activePhase].desc}
                                            </p>

                                            <div
                                                className="w-10 h-[1px] mb-5"
                                                style={{ background: `${phases[activePhase].color}60` }}
                                            />

                                            <p
                                                className="text-sm font-light leading-relaxed"
                                                style={{ color: `${C.textSecondary}99` }}
                                            >
                                                {phases[activePhase].detail}
                                            </p>
                                        </div>

                                        {/* Step indicator dots */}
                                        <div className="flex gap-2 mt-10 relative z-10">
                                            {phases.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActivePhase(i)}
                                                    aria-label={`Go to phase ${i + 1}`}
                                                    className="transition-all duration-400 rounded-full focus-visible:outline-none"
                                                    style={{
                                                        width: activePhase === i ? 24 : 8,
                                                        height: 8,
                                                        background:
                                                            activePhase === i
                                                                ? phases[activePhase].color
                                                                : `${C.gold}30`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────
                    SECTION 4 — SYSTEM LOGIC (mycelium network bg)
                ──────────────────────────────────────────────────────────────── */}
            <section
                ref={sysRef}
                className="relative py-28 px-6 overflow-hidden"
                aria-label="System logic"
                style={{ background: C.bg }}
            >
                <MyceliumNetwork />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease }}
                            className="text-xs font-mono tracking-[0.3em] uppercase mb-4"
                            style={{ color: C.gold }}
                        >
                            The Architecture
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease }}
                            className="text-3xl md:text-5xl font-serif"
                            style={{ color: C.textPrimary }}
                        >
                            System Logic
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2, ease }}
                            className="max-w-xl mx-auto mt-5 text-base font-light leading-relaxed"
                            style={{ color: C.textSecondary }}
                        >
                            Regenerative systems mirror nature's intelligence. Mycelial networks,
                            microbial collaboration, and carbon cycles form the architecture of
                            resilient ecosystems.
                        </motion.p>
                    </div>

                    {/* Cards — staggered reveal */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: 'Mycelial Architecture',
                                icon: '⬡',
                                body: 'Designing infrastructure inspired by fungal communication networks and distributed intelligence — where every node informs the whole.',
                            },
                            {
                                title: 'Carbon Sequestration',
                                icon: '◎',
                                body: 'Transforming atmospheric carbon into stable soil structures that persist for generations, turning agriculture into a climate solution.',
                            },
                            {
                                title: 'Water Cycle Restoration',
                                icon: '〜',
                                body: 'Living soils act as natural reservoirs — absorbing rainfall, filtering pollutants, and releasing moisture slowly to prevent drought stress.',
                            },
                            {
                                title: 'Biodiversity Amplification',
                                icon: '✦',
                                body: 'Each intervention catalyses cascading effects across species — from microbe to insect to bird — restoring the web of ecological relationships.',
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 48 }}
                                animate={sysInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.75, delay: i * 0.12, ease }}
                                className="group p-8 md:p-10 rounded-[2rem] border transition-all duration-500"
                                style={{
                                    background: `linear-gradient(135deg, ${C.surface1} 0%, ${C.bg} 100%)`,
                                    borderColor: `${C.gold}20`,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                }}
                            >
                                <div
                                    className="text-2xl mb-5 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-400"
                                    style={{
                                        background: `${C.gold}14`,
                                        color: C.gold,
                                        fontFamily: 'monospace',
                                    }}
                                >
                                    {card.icon}
                                </div>
                                <h3
                                    className="text-xl md:text-2xl font-serif mb-3 group-hover:text-[#8C6A3C] transition-colors duration-400"
                                    style={{ color: C.textPrimary }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    className="text-sm md:text-base font-light leading-relaxed"
                                    style={{ color: C.textSecondary }}
                                >
                                    {card.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────
                    FINAL SECTION — FUTURE VISION
                ──────────────────────────────────────────────────────────────── */}
            <motion.section
                ref={visionRef}
                style={{ background: visionBg as unknown as string }}
                className="relative py-20 md:py-48 px-6 overflow-hidden"
                aria-label="Future vision"
            >
                {/* Decorative organic rings */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    aria-hidden
                >
                    {[1, 2, 3].map((r) => (
                        <div
                            key={r}
                            className="absolute rounded-full border"
                            style={{
                                width: `${r * 26}vw`,
                                height: `${r * 26}vw`,
                                borderColor: `${C.gold}${r === 1 ? '22' : r === 2 ? '12' : '08'}`,
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    style={{ opacity: visionOpacity, scale: visionTextScale }}
                    className="relative z-10 max-w-4xl mx-auto text-center"
                >
                    {/* Quote */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease }}
                        className="font-serif italic text-base md:text-lg mb-8"
                        style={{ color: C.brown }}
                    >
                        "The earth does not belong to us — we belong to the earth."
                    </motion.p>

                    <div
                        className="w-12 h-[1px] mx-auto mb-10"
                        style={{ background: `${C.gold}50` }}
                    />

                    {/* Manifesto statement */}
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease }}
                        className="text-4xl sm:text-6xl md:text-7xl font-serif font-light leading-[1.08] mb-8"
                        style={{ color: C.textPrimary }}
                    >
                        Restoring soil
                        <br />
                        <span style={{ color: C.brown }}>restores civilization.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease }}
                        className="max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-14"
                        style={{ color: C.textSecondary }}
                    >
                        By restoring soil biology we unlock resilient food systems, ecological
                        wealth, and a foundation for future generations to flourish upon.
                    </motion.p>


                </motion.div>
            </motion.section>
        </div>
    );
}