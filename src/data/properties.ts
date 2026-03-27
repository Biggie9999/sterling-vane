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
    id: "prop_miami_01",
    name: "The Biscayne Vista",
    location: "Miami, FL",
    market: "Miami, FL",
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
    images: ["/properties/mansion1_ext.png", "/properties/mansion1_int.png"],
    description: "An architectural masterpiece set against the stunning Miami skyline. Features sweeping infinity pools, floor-to-ceiling glass, and a private dock. Currently stabilizing with a projected 14.5% IRR through aggressive high-end short-term rentals to UHNW travelers.",
    status: "Funding Stage"
  },
  {
    id: "prop_aspen_02",
    name: "The Maroon Bells Estate",
    location: "Aspen, CO",
    market: "Aspen, CO",
    type: "Principal",
    pricePerShare: 100000,
    totalShares: 150,
    availableShares: 12,
    propertyValue: 18000000,
    capRate: 6.8,
    targetYield: 12.0,
    bedrooms: 8,
    bathrooms: 9,
    sqft: 12000,
    images: ["/properties/mansion2_ext.png", "/properties/mansion2_int.png"],
    description: "A ski-in ski-out ultra-luxury cabin in the heart of Aspen. Delivering exceptional winter rent premiums with long-term capital appreciation locked in through exclusive zoning rights.",
    status: "Funding Stage"
  },
  {
    id: "prop_nyc_03",
    name: "The Velvet Suite Penthouse",
    location: "New York, NY",
    market: "New York, NY",
    type: "Seed",
    pricePerShare: 20000,
    totalShares: 400,
    availableShares: 220,
    propertyValue: 8000000,
    capRate: 5.5,
    targetYield: 11.2,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 4500,
    images: ["/properties/penthouse_ext.png", "/properties/penthouse_int.png"],
    description: "An ultra-luxury moody penthouse sitting high above the Manhattan skyline. Acquired off-market, this asset is being repositioned for exclusive corporate and diplomatic short-term leases.",
    status: "Coming Soon"
  }
];
