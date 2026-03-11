export type ProductPhase = 'Solid' | 'Liquid' | 'Aerosol';
export type SpectrumCategory = 'Soil Structure' | 'Microbial Activation' | 'Atmospheric' | 'Sustainable Utility';

export interface ProductEntity {
  id: string;
  slug: string;
  name: string;
  phase: ProductPhase;
  sku: string;
  tagline: string;
  description: string;
  hsnCode: string;
  moistureContent: number;
  npkRatio: [number, number, number];
  sustainabilityScore: {
    carbonOffset: number;
    chemicalDisplacement: number;
  };
  spectrumCategory: SpectrumCategory;
  isFlagship?: boolean;
}

export const PRODUCTS: ProductEntity[] = [
  {
    id: "01",
    slug: "sun-dried-cow-dung-cakes",
    name: "Sun-Dried Bovine Cake",
    phase: "Solid",
    sku: "GRV-SDC-001",
    tagline: "Solar-Cured Soil Architecture",
    description: "The primordial battery of agriculture. Cured by the Indian sun for 72 hours to lock in microbial latency.",
    hsnCode: "31010099",
    moistureContent: 12,
    npkRatio: [1.8, 0.4, 1.2],
    sustainabilityScore: { carbonOffset: 450, chemicalDisplacement: 200 },
    spectrumCategory: "Soil Structure",
    isFlagship: true
  },
  {
    id: "02",
    slug: "liquid-bio-tea",
    name: "Concentrated Bio-Tea",
    phase: "Liquid",
    sku: "GRV-LBT-002",
    tagline: "Microbial Awakening Fluid",
    description: "A fermented microbial inoculant that accelerates nutrient absorption. Acts as an enzyme trigger.",
    hsnCode: "31010091",
    moistureContent: 98,
    npkRatio: [0.8, 0.1, 0.9],
    sustainabilityScore: { carbonOffset: 120, chemicalDisplacement: 850 },
    spectrumCategory: "Microbial Activation"
  },
  {
    id: "03",
    slug: "cow-dung-powder",
    name: "Pulverized Bio-Solid",
    phase: "Solid",
    sku: "GRV-PWD-003",
    tagline: "High-Density Carbon Input",
    description: "Fine-mesh organic input for rapid soil integration. Increases water retention and porosity.",
    hsnCode: "31010099",
    moistureContent: 8,
    npkRatio: [2.1, 1.1, 1.4],
    sustainabilityScore: { carbonOffset: 300, chemicalDisplacement: 400 },
    spectrumCategory: "Soil Structure"
  },
  {
    id: "04",
    slug: "organic-manure",
    name: "Composted Enriched Manure",
    phase: "Solid",
    sku: "GRV-MNR-004",
    tagline: "Slow-Release Nitrogen Matrix",
    description: "Aged and decomposed naturally to prevent root burn. Provides consistent nutrient delivery.",
    hsnCode: "31059090",
    moistureContent: 18,
    npkRatio: [3.0, 1.5, 2.0],
    sustainabilityScore: { carbonOffset: 500, chemicalDisplacement: 600 },
    spectrumCategory: "Soil Structure"
  },
  {
    id: "05",
    slug: "cow-dung-pots",
    name: "Biodegradable Nursery Pots",
    phase: "Solid",
    sku: "GRV-POT-005",
    tagline: "Zero-Waste Root Vessels",
    description: "Plant directly into the ground. The pot decomposes to become food for the roots.",
    hsnCode: "69149000",
    moistureContent: 5,
    npkRatio: [1.2, 0.5, 0.8],
    sustainabilityScore: { carbonOffset: 50, chemicalDisplacement: 0 },
    spectrumCategory: "Sustainable Utility"
  },
  {
    id: "06",
    slug: "purified-ash",
    name: "Calcined Bovine Ash",
    phase: "Solid",
    sku: "GRV-ASH-006",
    tagline: "Mineralized Residue",
    description: "Pure, pathogen-free mineral content. Used for pH balancing and as a natural pesticide carrier.",
    hsnCode: "26219000",
    moistureContent: 2,
    npkRatio: [0.1, 0.2, 2.5],
    sustainabilityScore: { carbonOffset: 100, chemicalDisplacement: 150 },
    spectrumCategory: "Atmospheric"
  },
  {
    id: "07",
    slug: "herbal-dhoop",
    name: "Herbal Bio-Dhoop",
    phase: "Aerosol",
    sku: "GRV-DHP-007",
    tagline: "Atmospheric Sanitization",
    description: "Combustible bio-sticks infused with neem and camphor. Cleanses the air naturally.",
    hsnCode: "33074100",
    moistureContent: 6,
    npkRatio: [0, 0, 0],
    sustainabilityScore: { carbonOffset: 10, chemicalDisplacement: 50 },
    spectrumCategory: "Atmospheric"
  }
];