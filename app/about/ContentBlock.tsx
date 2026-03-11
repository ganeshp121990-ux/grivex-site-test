'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ContentBlockProps {
    children: React.ReactNode;
    className?: string;
    systemLabel?: string;
}

export const ContentBlock = ({ children, className = "", systemLabel }: ContentBlockProps) => {
    const ref = React.useRef(null);

    // Track the element's journey through the viewport
    // 0 = Entering from bottom
    // 0.5 = Dead Center
    // 1 = Exiting top
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // --- OPTICAL PHYSICS ENGINE ---

    // Blur: "Rack Focus" effect. Blurry at edges, sharp in center.
    const blur = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["12px", "0px", "0px", "12px"]);

    // Opacity: "Atmospheric Depth". Fades into the distance at edges.
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.1, 1, 1, 0.1]);

    // Scale: "Z-Axis Push". The active content gently pushes forward towards the user.
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

    // Grayscale: "Chromatic Authority". Only the active item is allowed color.
    const grayscale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["100%", "0%", "0%", "100%"]);

    return (
        <div ref={ref} className={`relative z-10 w-full max-w-4xl mx-auto my-64 ${className}`}>
            {/* my-64: Huge vertical spacing to ensure single-item focus */}

            <motion.div
                style={{
                    opacity,
                    scale, // Physical push
                    filter: useTransform([grayscale, blur], ([g, b]) => `grayscale(${g}) blur(${b})`)
                }}
                className="relative transition-all duration-0 will-change-transform"
            >
                {/* Visual Anchor - Floating, not attached to a box */}
                {systemLabel && (
                    <div className="absolute -top-12 left-0 flex items-center gap-3 opacity-60">
                        <div className="w-1.5 h-1.5 bg-[#2F4A1D] rounded-full" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5A5D61]">
                            {systemLabel}
                        </span>
                        <div className="h-[1px] w-24 bg-[#1F2124]/20" />
                    </div>
                )}

                {children}

            </motion.div>
        </div>
    );
};
