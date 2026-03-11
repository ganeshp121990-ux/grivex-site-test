"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeWrapper from "@/components/ThemeWrapper";
import SplashSeed from "@/components/SplashSeed";
import TerraformingHero from "@/components/TerraformingHero";
import GlobalOperations from "@/components/GlobalOperations";
import SectionConnector from "@/components/SectionConnector";
import ProductShowcaseGrid from "@/components/ProductShowcaseGrid";
import Footer from "@/components/Catalog/Footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeWrapper theme="home">
      <main className="relative min-h-screen bg-black">

        <TerraformingHero />
        <SectionConnector />
        <ProductShowcaseGrid />
        <GlobalOperations />
        <Footer />

        <AnimatePresence mode="wait">
          {showSplash && (
            <SplashSeed onComplete={() => setShowSplash(false)} />
          )}
        </AnimatePresence>

      </main>
    </ThemeWrapper>
  );
}