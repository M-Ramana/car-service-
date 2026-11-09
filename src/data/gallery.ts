export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "detailing" | "mechanical" | "paint" | "performance";
  categoryLabel: string;
  vehicle: string;
  description: string;
  image: string;
  tag: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  subtitle: string;
  vehicle: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "detailing", label: "Detailing & Ceramic" },
  { id: "mechanical", label: "Engine & Diagnostics" },
  { id: "paint", label: "Paint & Restoration" },
  { id: "performance", label: "Performance Tuning" },
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "BMW M3 Competition 9H Ceramic Shield",
    category: "detailing",
    categoryLabel: "Ceramic & Detailing",
    vehicle: "BMW M3 Competition",
    description: "Multi-stage gloss paint correction followed by 3 layers of 9H ceramic coating and glass protection.",
    image: "https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1200&auto=format&fit=crop",
    tag: "Ceramic Coating",
  },
  {
    id: "gal-2",
    title: "Mercedes-AMG C63 Twin-Turbo Diagnostic & Tuning",
    category: "performance",
    categoryLabel: "Performance Tuning",
    vehicle: "Mercedes-AMG C63",
    description: "TAT Stage 1 ECU recalibration, dyno run telemetry, and high-flow sports intake installation.",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    tag: "Stage 1 Remap",
  },
  {
    id: "gal-3",
    title: "Porsche 911 GT3 Full Body Paint Correction",
    category: "paint",
    categoryLabel: "Paint Restoration",
    vehicle: "Porsche 911 GT3",
    description: "Micro-swirl removal and mirror gloss finishing in our dust-controlled specialized detailing bay.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    tag: "Paint Correction",
  },
  {
    id: "gal-4",
    title: "Audi RS6 Avant Engine Bay & Fluid Overhaul",
    category: "mechanical",
    categoryLabel: "Mechanical Care",
    vehicle: "Audi RS6 Avant",
    description: "Complete synthetic fluid overhaul, timing chain tensioner inspection, and cooling flush.",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop",
    tag: "Major Service",
  },
  {
    id: "gal-5",
    title: "Range Rover Sport Air Suspension & Brake Skimming",
    category: "mechanical",
    categoryLabel: "Mechanical Care",
    vehicle: "Range Rover Sport",
    description: "Replacement of active air suspension compressor valve block and high-precision disc rotor skimming.",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1200&auto=format&fit=crop",
    tag: "Suspension & Brakes",
  },
  {
    id: "gal-6",
    title: "Ford Mustang GT Deep Leather Spa & AC Sanitization",
    category: "detailing",
    categoryLabel: "Interior Spa",
    vehicle: "Ford Mustang GT",
    description: "Steaming, pH-neutral deep leather rejuvenation, and medical-grade ozone cabin disinfection.",
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1200&auto=format&fit=crop",
    tag: "Interior Spa",
  },
  {
    id: "gal-7",
    title: "Jaguar F-Pace Precision Quarter Panel Dent & Respray",
    category: "paint",
    categoryLabel: "Paint & Body",
    vehicle: "Jaguar F-Pace",
    description: "Flawless color-matched metallic pearl respray inside our pressurized heated paint booth.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    tag: "Booth Painting",
  },
  {
    id: "gal-8",
    title: "Volkswagen Golf GTI Downpipe & Intercooler Fitment",
    category: "performance",
    categoryLabel: "Performance Tuning",
    vehicle: "VW Golf GTI",
    description: "Stainless steel downpipe installation, upgraded front-mount intercooler, and Track ECU map.",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
    tag: "TAT Performance",
  },
];

export const BEFORE_AFTER_SHOWCASE: BeforeAfterItem = {
  id: "ba-detailing-1",
  title: "Multi-Stage Paint Correction & 9H Ceramic Coating",
  subtitle: "Drag the slider to see how severe oxidation, swirl marks, and scratches were transformed into a liquid mirror reflection.",
  vehicle: "Porsche 911 Carrera (Jet Black Metallic)",
  // Swirled, oxidized scratched black car paint
  beforeImage: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop",
  // Showroom mirror gloss ceramic coated black car
  afterImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  beforeLabel: "BEFORE: Swirls & Dull Oxidation",
  afterLabel: "AFTER: 9H Mirror Ceramic Finish",
  description: "Eliminated 95%+ of surface marring and micro-scratches using dual-action micro-abrasive compounding, capped with Track Automotive's hydrophobic nano-coating.",
};

