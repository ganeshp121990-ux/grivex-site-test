'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring
} from 'framer-motion';
import Image from 'next/image';
import { ContentBlock } from './ContentBlock';

/* ─────────────────────────────────────────────
   VISUAL AUTHORITY — SINGLE SOURCE OF TRUTH
   ───────────────────────────────────────────── */

const VISUAL_AUTHORITY = {
  BASE_YEAR: 2020,
  CURRENT_YEAR: new Date().getFullYear(),

  CLIMATE_PROFILE: 'semi-arid' as 'arid' | 'semi-arid' | 'temperate',

  MOTION: {
    ULTRA_SLOW_RANGE: [0.2, 0.85],
    CARD_OFFSET_STEP: 0.08,
    GLOBAL_AUTHORITY_RANGE: [0.75, 0.92]
  },

  COLOR: {
    BASE_SATURATION: 0.85,
    YEAR_GAIN: 0.05,
    MAX_GAIN: 0.35,
    HUE_SHIFT: {
      arid: '-4deg',
      'semi-arid': '-6deg',
      temperate: '-8deg'
    }
  }
} as const;

const YEAR_FACTOR = Math.min(
  (VISUAL_AUTHORITY.CURRENT_YEAR - VISUAL_AUTHORITY.BASE_YEAR) *
  VISUAL_AUTHORITY.COLOR.YEAR_GAIN,
  VISUAL_AUTHORITY.COLOR.MAX_GAIN
);

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const cards = [
  {
    id: '01',
    title: 'Barren Desert',
    subtitle: 'Condition Zero',
    image: '/images/about/vision-desert.jpg',
    desc: 'Compacted land stripped of biological memory.'
  },
  {
    id: '02',
    title: 'Biological Intervention',
    subtitle: 'Inoculation Phase',
    image: '/images/about/vision-intervention.jpg',
    desc: 'Carbon structures reintroduced. The awakening.'
  },
  {
    id: '03',
    title: 'Living Soil',
    subtitle: 'Structuring',
    image: '/images/about/vision-soil.jpg',
    desc: 'Fungal networks re-establish.'
  },
  {
    id: '04',
    title: 'Productive Farms',
    subtitle: 'Sovereign Yield',
    image: '/images/about/vision-farm.jpg',
    desc: 'A system that compounds value over decades.'
  }
];

/* ─────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────── */

export default function VisionSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef as any,
    offset: ['start center', 'end end']
  });

  const globalAuthority = useTransform(
    scrollYProgress,
    VISUAL_AUTHORITY.MOTION.GLOBAL_AUTHORITY_RANGE as any,
    [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-24" // Reduced padding as ContentBlocks handle their own spacing
    >
      {/* 
         Removed internal NeuralSpine. 
         The global StructuralSpine (in parent) will run through this section.
         We wrap content in ContentBlocks to "cover" the spine where appropriate.
      */}

      <div className="relative z-10">
        {cards.map((card, i) => (
          <ContentBlock key={card.id} systemLabel={`Phase ${card.id}`}>
            <VisionCard
              card={card}
              index={i}
              globalAuthority={globalAuthority}
            />
          </ContentBlock>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CARD
   ───────────────────────────────────────────── */

function VisionCard({
  card,
  index,
  globalAuthority
}: {
  card: any;
  index: number;
  globalAuthority: any;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref as any,
    offset: ['start end', 'center center']
  });

  const grayscale = useTransform(
    scrollYProgress,
    [
      VISUAL_AUTHORITY.MOTION.ULTRA_SLOW_RANGE[0] +
      index * VISUAL_AUTHORITY.MOTION.CARD_OFFSET_STEP,
      VISUAL_AUTHORITY.MOTION.ULTRA_SLOW_RANGE[1] +
      index * VISUAL_AUTHORITY.MOTION.CARD_OFFSET_STEP
    ],
    [1, 0]
  );

  const saturation = useTransform(
    scrollYProgress,
    [0.4, 0.9],
    [
      VISUAL_AUTHORITY.COLOR.BASE_SATURATION,
      VISUAL_AUTHORITY.COLOR.BASE_SATURATION + YEAR_FACTOR
    ]
  );

  const hue = useTransform(
    scrollYProgress,
    [0.5, 1],
    [
      VISUAL_AUTHORITY.COLOR.HUE_SHIFT[
      VISUAL_AUTHORITY.CLIMATE_PROFILE
      ],
      '0deg'
    ]
  );

  const finalGrayscale = useTransform(
    [grayscale, globalAuthority],
    ([g, global]) => (global === 1 ? 0 : g)
  );

  const filter = useMotionTemplate`
    grayscale(${finalGrayscale})
    saturate(${saturation})
    hue-rotate(${hue})
  `;

  return (
    <div ref={ref} className="relative">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 === 1
            ? 'md:[&>*:first-child]:order-2'
            : ''
          }`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#D6D2C4]">
          <motion.div className="absolute inset-0" style={{ filter }}>
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <div>
          <h3 className="font-serif text-3xl md:text-4xl text-[#1F2124]">
            {card.title}
          </h3>
          <p className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-[#A39264] mt-2">
            {card.subtitle}
          </p>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-[#5A5D61] max-w-md">
            {card.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
