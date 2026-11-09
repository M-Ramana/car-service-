export interface ServiceItem {
  id: string;
  title: string;
  category: "all" | "maintenance" | "detailing" | "diagnostics" | "bodywork";
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  badge?: string;
  benefits: string[];
}

export const SERVICES_CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "maintenance", label: "Periodic Maintenance" },
  { id: "detailing", label: "Detailing & Ceramic" },
  { id: "diagnostics", label: "Diagnostics & Electrical" },
  { id: "bodywork", label: "Paint & Body Craft" },
] as const;

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "periodic-maintenance",
    title: "Periodic General Service & Inspection",
    category: "maintenance",
    categoryLabel: "Maintenance",
    badge: "Essential Care",
    shortDescription:
      "Comprehensive multi-point vehicle inspection, engine oil flush, synthetic fluid replacements, and preventive mechanical tuning.",
    fullDescription:
      "Our periodic maintenance goes beyond standard oil changes. We perform an exhaustive 60-point checkup encompassing brake pads, filters, spark plugs, suspension components, fluid levels, and cooling systems using OEM-approved oils and parts.",
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=900&auto=format&fit=crop",
    benefits: [
      "OEM-Grade Synthetic Oil & Filter Replacements",
      "60-Point Comprehensive Mechanical Inspection",
      "Brake System Clean, Adjust & Pad Measurement",
      "Engine Bay Degreasing & Underbody Check",
    ],
  },
  {
    id: "ceramic-coating-detailing",
    title: "Ceramic Coating & Paint Correction",
    category: "detailing",
    categoryLabel: "Detailing",
    badge: "Signature Protection",
    shortDescription:
      "Multi-stage high-gloss paint correction and 9H nano-ceramic coating shielding your car from scratches, UV rays, and road grime.",
    fullDescription:
      "Achieve an unmatched mirror-like gloss and hydrophobic shield. Our certified detailers eliminate swirl marks, oxidation, and scratches through multi-stage rotary polishing before bonding premium 9H/10H ceramic coating matrices.",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=900&auto=format&fit=crop",
    benefits: [
      "Multi-Stage Swirl & Scratch Elimination",
      "Super Hydrophobic Water-Beading Effect",
      "Long-Lasting 9H/10H High-Gloss Armor",
      "Protection Against UV Fading & Chemical Fallout",
    ],
  },
  {
    id: "computerized-diagnostics",
    title: "Computerized Diagnostics & ECU Scanning",
    category: "diagnostics",
    categoryLabel: "Diagnostics",
    badge: "High-Tech Precision",
    shortDescription:
      "Advanced OEM-level electronic diagnostics for engine check lights, sensor faults, ECU errors, and performance anomalies.",
    fullDescription:
      "Modern luxury and performance vehicles demand pinpoint electronic diagnostics. We utilize factory-level scanning interfaces to read live sensor data, diagnose complex electrical failures, calibrate ABS/airbags, and clear stored fault codes.",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=900&auto=format&fit=crop",
    benefits: [
      "OEM-Grade Diagnostic Scanners & Live Telemetry",
      "Check Engine & Warning Light Pinpointing",
      "Electrical Wiring & Sensor Calibration",
      "ABS, Airbag & Transmission Diagnostics",
    ],
  },
  {
    id: "interior-deep-cleaning",
    title: "Interior Spa & Deep Upholstery Care",
    category: "detailing",
    categoryLabel: "Detailing",
    badge: "Hygiene & Luxury",
    shortDescription:
      "Antibacterial steam sanitization, leather conditioning, stain removal, and thorough air duct purification.",
    fullDescription:
      "Restore your vehicle interior to showroom condition. We thoroughly steam extract fabric seats, deep condition fine leather upholstery, eliminate odors from AC vents, and disinfect high-contact cabin surfaces.",
    image:
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=900&auto=format&fit=crop",
    benefits: [
      "High-Temperature Germ & Allergen Steam Cleaning",
      "Premium Leather Treatment & Matte Conditioning",
      "Headliner, Carpet & Boot Deep Foam Extraction",
      "Ozone Odor Neutralization & AC Vent Disinfection",
    ],
  },
  {
    id: "brake-suspension-overhaul",
    title: "Brake & Suspension System Overhaul",
    category: "maintenance",
    categoryLabel: "Maintenance",
    badge: "Safety First",
    shortDescription:
      "Precision disc skimming, caliper refurbishment, shock absorber replacements, and steering alignment for razor-sharp handling.",
    fullDescription:
      "Ensure maximum stopping power and ride comfort. Our technicians inspect and overhaul braking systems, control arms, tie rods, bushings, and dampers to eliminate rattles and ensure uncompromising road grip.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=900&auto=format&fit=crop",
    benefits: [
      "Precision Disc Brake Rotor Skimming & Upgrades",
      "Shock Absorber, Strut & Link Rod Replacement",
      "Brake Fluid Pressure Bleed & Caliper Servicing",
      "Vibration, Squeal & Clunk Elimination",
    ],
  },
  {
    id: "denting-painting",
    title: "Denting & Precision Booth Painting",
    category: "bodywork",
    categoryLabel: "Bodywork",
    badge: "Factory Finish",
    shortDescription:
      "Flawless computerized paint color matching, precision panel beat repairs, and dust-free heated booth paint baking.",
    fullDescription:
      "Whether repairing a minor parking scuff or accidental panel damage, our bodycraft craftsmen restore factory body lines. We use spectrophotometer color formulation and premium clear coats baked in a pressurized spray booth.",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=900&auto=format&fit=crop",
    benefits: [
      "Computerized Paint Hue & Tone Color Matching",
      "Dust-Free Climate-Controlled Spray Booth",
      "Precision Paintless & Hydraulic Dent Removal",
      "High-Solid Scratch-Resistant Clear Coats",
    ],
  },
  {
    id: "air-conditioning-service",
    title: "Car Air Conditioning Service & Gas Refill",
    category: "maintenance",
    categoryLabel: "Maintenance",
    badge: "Climate Comfort",
    shortDescription:
      "Refrigerant recovery and top-up, compressor leak testing, condenser flushing, and cabin cooling optimization.",
    fullDescription:
      "Beat the tropical heat with ice-cold cabin cooling. We test HVAC pressures, detect micro-leaks using nitrogen and UV dye, vacuum refrigerant lines, and replace cooling coils or cabin filters when needed.",
    image:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=900&auto=format&fit=crop",
    benefits: [
      "Automated Refrigerant Vacuum & Gas Top-Up",
      "Cooling Coil & Condenser Chemical Flush",
      "Compressor Oil Replenishment & Pressure Test",
      "Rapid Cabin Temperature Drop Assurance",
    ],
  },
  {
    id: "performance-tuning-tat",
    title: "Performance Tuning & Track Upgrades",
    category: "diagnostics",
    categoryLabel: "Diagnostics",
    badge: "Track Automotive Tuning",
    shortDescription:
      "Engine remapping, custom exhaust fitment, throttle response optimization, and high-performance automotive upgrades.",
    fullDescription:
      "Unleash the hidden potential of your machine. Through Track Automotive Tuning (TAT), we offer safe custom ECU maps, performance air intake systems, downpipe upgrades, and suspension dampening setups built for motorsport enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=900&auto=format&fit=crop",
    benefits: [
      "Stage 1 & Stage 2 ECU / TCU Software Remaps",
      "Substantial Horsepower & Torque Gains",
      "Cold Air Intakes & Sports Exhaust Upgrades",
      "Sharpened Throttle Response & Linear Delivery",
    ],
  },
];

