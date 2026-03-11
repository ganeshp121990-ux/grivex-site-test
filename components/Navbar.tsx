"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Building2,
  Mail,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation"; 
import Link from "next/link";


// --- CONFIGURATION ---
const LOGO_SOURCE = "/images/logo.svg";

const NAV_ITEMS = [
  { label: "About Company", icon: Building2, href: "/about" },
  { label: "Products", icon: Leaf, href: "/catalog" },
  { label: "Contact", icon: Mail, href: "/contact" },
];

const EASE_OS = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // New State for Theme Detection
  const [isDarkPage, setIsDarkPage] = useState(false);

  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  // --- THEME LOGIC: Detects page context ---
  useEffect(() => {
    // Add slugs here that should have a Dark Navbar (e.g., Home, Products)
    const darkRoutes = ["/", "/products"]; 
    setIsDarkPage(darkRoutes.includes(pathname));
  }, [pathname]);

  // --- SCROLL LOGIC (UNCHANGED) ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = latest - previous;

    if (idleTimer.current) clearTimeout(idleTimer.current);

    if (latest < 50) {
      setIsVisible(true);
    } else if (diff > 0 && isVisible) {
      setIsVisible(false);
      setIsExpanded(false);
    } else if (diff < 0 && !isVisible) {
      setIsVisible(true);
    }

    idleTimer.current = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
  });

  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : "-150%", opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: EASE_OS }}
      className="fixed left-0 right-0 z-[100] flex justify-center pointer-events-none bottom-6 md:top-6 md:bottom-auto"
    >
      <motion.div
        layout
        className={cn(
          "pointer-events-auto relative transition-colors duration-500",
          "backdrop-blur-xl border shadow-2xl",
          // CARD COLOR LOGIC
          isDarkPage 
            ? "bg-black/40 border-white/10 shadow-black/40" 
            : "bg-[#EDE8DE]/60 border-black/5 shadow-black/10",
          isExpanded ? "rounded-[32px]" : "rounded-full"
        )}
        animate={{
          height: isExpanded ? "auto" : "72px",
          padding: isExpanded ? "28px" : "12px",
          width: isExpanded ? "320px" : "auto"
        }}
        transition={{ duration: 0.6, ease: EASE_OS }}
      >
        {/* TOP ROW */}
        <div className="relative flex items-center w-full h-[52px]">
          {/* LOGO */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center pl-2 pr-4 transition-transform active:scale-95"
            aria-label="Go to home"
          >
            <img
              src={LOGO_SOURCE}
              alt="Griva"
              /* Adjusted size: w-28 is a premium width for high-density navbars */
              className={cn(
                "h-auto w-28 md:w-32 object-contain transition-all duration-500",
                /* THEME COLOR LOGIC */
                isDarkPage 
                  ? "brightness-0 invert-[.8] sepia-[.4] saturate-[400%] hue-rotate-[10deg]" // Forces Gold-ish White
                  : "brightness-0 opacity-90" // Forces Deep Charcoal/Black
              )}
            />
          </button>

          {/* MENU TOGGLE */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "hidden md:flex items-center gap-3 px-4 h-10 rounded-full transition-colors",
              isDarkPage ? "hover:bg-white/10" : "hover:bg-black/10"
            )}
            aria-label="Open menu"
          >
            <div className={cn("h-8 w-[1px]", isDarkPage ? "bg-white/10" : "bg-black/10")} />
            <span className={cn(
              "text-sm font-mono tracking-widest uppercase",
              isDarkPage ? "text-white" : "text-[#1F1F1F]"
            )}>
              Menu
            </span>
            <Menu size={18} className={isDarkPage ? "text-white" : "text-black"} />
          </button>

          {/* PUSH RIGHT */}
          <div className="flex-1" />

          {/* ENQUIRY (STAYS GOLD FOR BRANDING) */}
         <Link
  href="/contact"
  className="
    hidden md:flex items-center px-4 h-10 rounded-full
    text-[#C2A676]
    border border-[#C2A676]/40
    hover:bg-[#C2A676]/10
    transition-colors
  "
>
  Enquiry
</Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "ml-2 md:hidden w-11 h-11 flex items-center justify-center rounded-full border transition-colors",
              isDarkPage ? "bg-white/10 border-white/20 text-white" : "bg-black/5 border-black/10 text-black"
            )}
          >
            <AnimatePresence mode="wait">
              {isExpanded ? <X size={20} /> : <Menu size={20} />}
            </AnimatePresence>
          </button>
        </div>

        {/* EXPANDED MENU */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className={cn("mt-4 pt-4 border-t", isDarkPage ? "border-white/10" : "border-black/10")}
            >
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.href)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl transition-colors",
                      isDarkPage ? "hover:bg-white/5 text-white/80" : "hover:bg-black/5 text-[#5F5F5F]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={isDarkPage ? "text-[#C2A676]" : ""} />
                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                    <ArrowRight size={14} className="opacity-30" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
