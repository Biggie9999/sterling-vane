export interface PropertyAsset {
  id: string;
  name: string;
  location: string;
  market: string;
  type: "Seed" | "Growth" | "Principal";
  pricePerShare: number;
  totalShares: number;
  availableShares: number;
  propertyValue: number;
  capRate: number;
  targetYield: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  description: string;
  status: "Coming Soon" | "Funding Stage" | "Stabilized" | "Fully Funded";
}

export const DEMO_PROPERTIES: PropertyAsset[] = [
  {
    id: "prop_pacific_01",
    name: "The Pacific Glass House",
    location: "Malibu, California",
    market: "California",
    type: "Growth",
    pricePerShare: 50000,
    totalShares: 200,
    availableShares: 45,
    propertyValue: 12500000,
    capRate: 8.2,
    targetYield: 14.5,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 8500,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600607687931-570d510fffc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
    ],
    description: "Contemporary coastal elegance. Expansive light-filled interiors. Targets the design-forward luxury traveller. Part of the Sovereign Collection fund, this asset follows our signature return structure: 30% projected ROI by month 3, 90%+ by month 12.",
    status: "Funding Stage"
  },
  {
    id: "prop_palm_02",
    name: "The Palm Royale Retreat",
    location: "Palm Beach, Florida",
    market: "Florida",
    type: "Principal",
    pricePerShare: 75000,
    totalShares: 150,
    availableShares: 12,
    propertyValue: 24000000,
    capRate: 6.8,
    targetYield: 12.0,
    bedrooms: 8,
    bathrooms: 9,
    sqft: 12000,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
    ],
    description: "Resort-inspired design blending comfort with tropical sophistication. High-occupancy leisure destination. This asset is a cornerstone of the Sovereign fund, delivering consistent operational cash flow and high nightly yields.",
    status: "Funding Stage"
  },
  {
    id: "prop_manhattan_03",
    name: "The Manhattan Velvet Suite",
    location: "New York, NY",
    market: "New York",
    type: "Seed",
    pricePerShare: 50000,
    totalShares: 400,
    availableShares: 220,
    propertyValue: 8000000,
    capRate: 5.5,
    targetYield: 11.2,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 4500,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
    ],
    description: "Refined urban living with premium finishes and curated textures. Targets executive and international travellers. A Phase 1 flagship unit designed for maximum occupancy in the heart of the world's financial capital.",
    status: "Coming Soon"
  }
];
