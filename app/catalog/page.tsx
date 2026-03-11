"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProductLedger from "@/components/Catalog/ProductLedger";
import TrustLedger from "@/components/Catalog/TrustLedger";

import Footer from "@/components/Catalog/Footer";
import Catloghero from "@/components/Catalog/Catloghero";
import CeremonialEntry from "@/components/Catalog/CeremonialEntry";
import { useAssetLoader } from "@/lib/hooks/useAssetLoader";

// External assets to preload
const ASSETS_TO_PRELOAD = [
  'https://grainy-gradients.vercel.app/noise.svg',
  '/images/splash-bg.jpg',
  '/images/logo.svg',
  '/images/products/premium-cake.webp',
  '/images/products/bio-tea.webp',
  '/images/products/cow-pots.webp',
  '/images/products/dung-powder.webp',
  '/images/products/purified-ash.webp'
];

export default function CatalogPage() {
  const { progress, loaded } = useAssetLoader(ASSETS_TO_PRELOAD);
  const [gateComplete, setGateComplete] = useState(false);

  // Show Gate until transition complete
  const showGate = !gateComplete;

  return (
    <main className="bg-[#F4F1E8] min-h-screen selection:bg-[#C2A676] selection:text-black">
      <AnimatePresence mode="wait">
        {showGate && (
          <CeremonialEntry
            key="intro"
            progress={progress}
            onComplete={() => setGateComplete(true)}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Catloghero />
        <ProductLedger />
        <TrustLedger />
        <Footer />
      </div>
    </main>
  );
}