"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface SplashSeedProps {
    onComplete: () => void;
}

// --- PARTICLES COMPONENT (Client-Side Only) ---
const Particles = () => {
    const [items, setItems] = useState<{ x: number; y: number; scale: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        // Generate particles only on client to avoid hydration mismatch
        const newItems = Array.from({ length: 8 }).map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            duration: 4 + Math.random(),
            delay: Math.random()
        }));
        setItems(newItems);
    }, []);

    return (
        <>
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/20"
                    initial={{
                        x: item.x,
                        y: item.y,
                        scale: item.scale,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        opacity: [0.1, 0.4, 0.1]
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay
                    }}
                    style={{ width: "3px", height: "3px" }}
                />
            ))}
        </>
    );
};

export default function SplashSeed({ onComplete }: SplashSeedProps) {
    const [isExiting, setIsExiting] = useState(false);

    // Mouse Parallax for subtle depth
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const contentX = useTransform(mouseX, [-1, 1], [15, -15]);
    const contentY = useTransform(mouseY, [-1, 1], [15, -15]);

    useEffect(() => {
        // TIMELINE (Total ~3.0s for readability)
        const exitTimer = setTimeout(() => setIsExiting(true), 2500);
        const completeTimer = setTimeout(() => onComplete(), 3000);

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) * 2 - 1);
            mouseY.set((e.clientY / innerHeight) * 2 - 1);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [onComplete, mouseX, mouseY]);

    // --- ANIMATION VARIANTS ---
    const containerVariants = {
        visible: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }
    };

    const contentVariants = {
        visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: {
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 0.6, ease: "easeInOut" }
        }
    };

    const textEntryVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            // Forced Deep Forest background to ensure white text is visible & premium
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[hsl(150,15%,12%)] text-white overflow-hidden cursor-wait"
            variants={containerVariants}
            animate={isExiting ? "exit" : "visible"}
        >
            {/* 1. ATMOSPHERE (Floating Dust/Pollen) */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-gradient-radial from-[hsl(35,30%,50%)]/10 to-transparent opacity-60" />
                <Particles />
            </div>

            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 3.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <img
                    src="/images/splash-bg.jpg"  // ← your image
                    alt=""
                    className="w-full h-full object-cover opacity-30"
                />
            </motion.div>

            {/* 2. CENTER CONTENT */}
            <motion.div
                style={{ x: contentX, y: contentY }}
                variants={contentVariants}
                initial="visible"
                animate={isExiting ? "exit" : "visible"}
                className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl"
            >
                <motion.div
                    variants={textEntryVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative flex flex-col items-center"
                >
                    {/* Headline Part 1: "Welcome to" */}
                    <motion.span
                        className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        Welcome to
                    </motion.span>

                    {/* Headline Part 2: "Griva Organic" (The Hero Text) */}
                    <div className="relative overflow-hidden px-4 py-2">
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
                            {/* UNIQUE COLOR COMBO: Gradient Text */}
                            <span className="bg-gradient-to-br from-white via-white to-[hsl(35,40%,70%)] bg-clip-text text-transparent">
                                Griva Organic
                            </span>
                        </h1>

                        {/* Cinematic Light Sweep (Gold Tinted) */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(35,50%,60%)]/40 to-transparent skew-x-12 z-20 pointer-events-none mix-blend-overlay"
                            initial={{ x: "-150%" }}
                            animate={{ x: "150%" }}
                            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                        />
                    </div>

                    {/* Subheadline */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mt-6 flex flex-col items-center gap-4"
                    >
                        {/* Decorative Divider */}
                        <div className="w-12 h-[1px] bg-white/30" />

                        <p className="text-white/90 text-xs md:text-sm font-light tracking-wide max-w-md leading-relaxed">
                            Your Trusted Export Partner in <br className="hidden md:block" />
                            <span className="font-normal text-[hsl(35,40%,75%)]">Premium Organic Goods</span>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* 3. PROGRESS BAR (Gold Accent) */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                <motion.div
                    className="h-full bg-[hsl(35,30%,50%)]" // Muted Clay/Gold color
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.0, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
}