'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle3D {
  id: number;
  x: number;
  y: number;
  z: number;
  // Physics properties
  vx: number;
  vy: number;
  vz: number;
  originX: number;
  originY: number;
  targetX: number | null;
  targetY: number | null;
  // Appearance
  size: number;
  color: string;
  alpha: number;
  // Simulation factors
  responseRate: number; // Speed of movement (lighter = faster)
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
}

export default function CeremonialEntry({ onComplete, progress = 0 }: { onComplete: () => void, progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showbrand, setShowBrand] = useState(false);
  const [isDispersing, setIsDispersing] = useState(false); // New state for text explosion
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = document.documentElement.clientWidth || window.innerWidth;
    let height = document.documentElement.clientHeight || window.innerHeight;
    // High-DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // --- CONFIG ---
    const PARTICLE_COUNT = 550; // High Density (User requested "more")
    const FORMATION_TIME = 50;  // Immediate responsive start
    const HOLD_TIME = 2800;     // Adjusted to match faster start
    const EXIT_TIME = 4200;     // Adjusted
    const FOCAL_LENGTH = 400;

    // --- STATE ---
    let particles: Particle3D[] = [];
    let startTime = Date.now();
    let phase: 'STATIC' | 'ORGANIZE' | 'DISSOLVE' = 'STATIC';
    let animationFrameId: number;

    // Re-adding Noise Function for "Live" Air Currents
    const noise = (x: number, y: number, z: number) => {
      return Math.sin(x * 0.0015 + z * 0.001) + Math.cos(y * 0.0015) * 0.5;
    };

    // Initialize 3D PETALS with MASS/SIZE VARIATION
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 1. Determine Size Bucket & Physics Modifiers
      const r = Math.random();
      let size, responseBase, rotSpeedBase;

      if (r < 0.6) {
        // SMALL (60%): Fast, Light
        size = Math.random() * 2.5 + 1.5; // 1.5 - 4.0
        responseBase = 0.045; // Snappy
        rotSpeedBase = 0.008;
      } else if (r < 0.9) {
        // MEDIUM (30%): Balanced
        size = Math.random() * 3 + 4.5; // 4.5 - 7.5
        responseBase = 0.025;
        rotSpeedBase = 0.005;
      } else {
        // LARGE (10%): Slow, Heavy
        size = Math.random() * 5 + 8; // 8 - 13
        responseBase = 0.012; // Heavy
        rotSpeedBase = 0.002;
      }

      particles.push({
        id: i,
        x: (Math.random() - 0.5) * width * 1.5, // Wider initial spread
        y: (Math.random() - 0.5) * height * 1.5,
        z: (Math.random() - 0.5) * 600, // Deeper field for higher count
        vx: 0,
        vy: 0,
        vz: 0,
        originX: (Math.random() - 0.5) * width,
        originY: (Math.random() - 0.5) * height,
        targetX: null,
        targetY: null,
        size: size,
        color: Math.random() > 0.4 ? '#C5A059' : '#E5D3B3',
        alpha: 0,

        // Physics linked to Size
        responseRate: responseBase * (Math.random() * 0.4 + 0.8), // Variance

        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * rotSpeedBase,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * rotSpeedBase * 2
      });
    }

    const drawPetal3D = (ctx: CanvasRenderingContext2D, p: Particle3D, scale: number, x2d: number, y2d: number) => {
      if (scale <= 0) return;

      ctx.save();
      ctx.translate(x2d, y2d);
      ctx.scale(scale, scale);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.sin(p.flip));

      ctx.globalAlpha = p.alpha;

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.5, p.size * 0.8, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.8, -p.size * 0.8, -p.size * 0.6, 0, -p.size);

      if (p.color === '#C5A059') {
        const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        grad.addColorStop(0, '#C5A059');
        grad.addColorStop(0.5, '#EAC988');
        grad.addColorStop(1, '#96783A');
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = p.color;
      }
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = p.alpha * 0.3;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      // Phase Switching
      if (elapsed > FORMATION_TIME && phase === 'STATIC') {
        phase = 'ORGANIZE';
        setShowBrand(true);
      }
      if (elapsed > HOLD_TIME && phase === 'ORGANIZE') {
        phase = 'DISSOLVE';
        setIsDispersing(true); // Trigger Text Explosion
      }
      if (elapsed > EXIT_TIME && !complete) {
        setComplete(true);
        setTimeout(onComplete, 1200);
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      // Viewport-safe calculation to guarantee a perfect circle on all ratios
      const RADIUS = width < 768 ? Math.min(width, height) * 0.42 : Math.min(width, height) * 0.32;

      // Sort Z for occlusion
      particles.sort((a, b) => a.z - b.z);

      particles.forEach((p, i) => {
        // Immediate fade so they are visible right away
        if (elapsed < 150) p.alpha = Math.min(1, elapsed / 150);

        if (phase === 'STATIC') {
          // 1. LIVE ATMOSPHERE (Drifting Flow)
          // Use noise to create invisible air currents
          const n = noise(p.x * 0.001, p.y * 0.001, elapsed * 0.0002);
          const angle = n * Math.PI * 2;

          // Move particles along currents (Weighted by lightness)
          // Lighter particles drift faster
          const flowSpeed = p.responseRate * 25;

          p.x += Math.cos(angle) * flowSpeed;
          p.y += Math.sin(angle) * flowSpeed;

          // Gentle Tumble
          p.rotation += p.rotationSpeed;
          p.flip += p.flipSpeed;

          // Wrap Edges (Infinite Field)
          if (p.x > width / 2 + 200) p.x = -width / 2 - 200;
          if (p.x < -width / 2 - 200) p.x = width / 2 + 200;
          if (p.y > height / 2 + 200) p.y = -height / 2 - 200;
          if (p.y < -height / 2 - 200) p.y = height / 2 + 200;

        } else if (phase === 'ORGANIZE') {
          // 2. Slow Converge (Mass-Weighted Lerp)
          // Dynamically compute target every frame for viewport-safe center/radius
          const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
          const rOffset = ((p.id * 13.7) % 15) - 7.5; // Deterministic stable variance
          const currentTargetX = Math.cos(angle) * (RADIUS + rOffset);
          const currentTargetY = Math.sin(angle) * (RADIUS + rOffset);

          const dx = currentTargetX - p.x;
          const dy = currentTargetY - p.y;

          // Snappy/Heavy differentiation
          p.x += dx * p.responseRate;
          p.y += dy * p.responseRate;
          p.z += (0 - p.z) * p.responseRate;

          p.rotation += p.rotationSpeed;
          p.flip += p.flipSpeed;

        } else if (phase === 'DISSOLVE') {
          // 3. Gentle Dissolve (Unified with Background Fade)
          const dx = p.x;
          const dy = p.y;

          // Controlled drift outwards
          const exitSpeed = p.responseRate * 0.25;
          p.x += dx * exitSpeed;
          p.y += dy * exitSpeed;

          // Very slow fade - keep them visible as background dissolves
          p.alpha -= 0.002;
        }

        // 3D Projection
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + p.z);
        const x2d = cx + p.x * scale;
        const y2d = cy + p.y * scale;

        drawPetal3D(ctx, p, scale, x2d, y2d);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = document.documentElement.clientWidth || window.innerWidth;
      height = document.documentElement.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#F5F2EB] flex items-center justify-center"
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Brand */}
      <AnimatePresence>
        {showbrand && !complete && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-6 md:gap-8"
          >
            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={isDispersing
                ? { opacity: 0, filter: 'blur(4px)', y: -20 }
                : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={isDispersing
                ? { delay: 0, duration: 1.0, ease: "easeInOut" }
                : { delay: 0, duration: 1.2, ease: "easeOut" }
              }
              className="font-serif text-lg md:text-2xl text-[#96783A] tracking-wider opacity-90"
            >
              Welcome to
            </motion.div>

            {/* Brand */}
            <div className="flex gap-1 md:gap-3 overflow-visible">
              {['G', 'R', 'I', 'V', 'A'].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={isDispersing
                    ? {
                      opacity: 0,
                      filter: 'blur(4px)',
                      y: -20,
                      x: 0,
                      scale: 1,
                      rotate: 0
                    }
                    : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, rotate: 0 }
                  }
                  transition={isDispersing
                    ? { delay: 0.2 + i * 0.15, duration: 1.0, ease: "easeInOut" }
                    : { delay: 0.2 + i * 0.15, duration: 1.2, ease: "easeOut" }
                  }
                  className="font-serif text-[10vw] md:text-[6vw] text-[#355E3B] tracking-tighter leading-none opacity-90 block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={isDispersing
                ? { opacity: 0, filter: 'blur(4px)', y: -20 }
                : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={isDispersing
                ? { delay: 0.4 + 5 * 0.15, duration: 1.0, ease: "easeInOut" }
                : { delay: 0.4 + 5 * 0.15, duration: 1.2, ease: "easeOut" }
              }
              className="flex flex-col items-center text-center font-serif text-[#96783A] opacity-90"
            >
              <span className="text-sm md:text-xl tracking-wide">Your Trusted Export Partner in</span>
              <span className="text-sm md:text-xl tracking-wide mt-1">Premium Organic Goods</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
