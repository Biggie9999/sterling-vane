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
    pricePerShare: 15000,
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
      "https://images.unsplash.com/photo-1600607687931-570d510fffc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c1566903?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1613490908592-fd5e16283b0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
    ],
    description: "An architectural masterpiece set against the stunning Miami skyline. Features sweeping infinity pools, floor-to-ceiling glass, and a private dock. Built to out-perform the market, this asset follows our standard accelerated return structure targeting returns of 30% by month 2, 60% by month 4, and reaching 90% by month 6 through aggressive high-end short-term rentals to UHNW travelers.",
    status: "Funding Stage"
  },
  {
    id: "prop_la_02",
    name: "The Montecito Modern",
    location: "Montecito, CA",
    market: "Los Angeles, CA",
    type: "Principal",
    pricePerShare: 25000,
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
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600607688126-af44163ad6dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    ],
    description: "An ultra-luxury compound nestled in the hills of Montecito. This asset is fully stabilized, delivering exceptional short-term rent premiums from A-list clientele. Featuring breathtaking ocean views and private terraced gardens. Capital appreciation is locked in via exclusive zoning rights. We strictly manage this asset to deliver our flagship return schedule: 30% at month 2, 60% at month 4, and 90% at month 6.",
    status: "Funding Stage"
  },
  {
    id: "prop_nyc_03",
    name: "The Velvet Suite Penthouse",
    location: "New York, NY",
    market: "New York, NY",
    type: "Seed",
    pricePerShare: 10000,
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
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c1566903?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
    ],
    description: "Sitting high above the Manhattan skyline, this penthouse was acquired off-market and is currently undergoing a bespoke repositioning to attract exclusive corporate and diplomatic short-term leases. By investing now, owners are primed to secure our tier-1 milestone projection: 30% yield in 60 days, 60% in 120 days, and a massive 90% return profile by 180 days.",
    status: "Coming Soon"
  },
  {
    id: "prop_tokyo_04",
    name: "Aman Residences Skytower",
    location: "Tokyo, Japan",
    market: "Tokyo, Japan",
    type: "Principal",
    pricePerShare: 35000,
    totalShares: 300,
    availableShares: 85,
    propertyValue: 31000000,
    capRate: 9.1,
    targetYield: 18.0,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 6100,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
    ],
    description: "Our flagship international expansion asset. The Aman Residences Skytower combines Japanese minimalist zen aesthetics with world-class smart home technology. Located right in the heart of Minato City. Returns on this property are aggressive and fully underwritten to match our signature performance benchmark (30% by month 2, 60% by month 4, 90% by month 6).",
    status: "Fully Funded"
  },
  {
    id: "prop_tulum_05",
    name: "Casa de Piedra",
    location: "Tulum, Mexico",
    market: "Tulum, Mexico",
    type: "Growth",
    pricePerShare: 5000,
    totalShares: 1000,
    availableShares: 450,
    propertyValue: 6500000,
    capRate: 11.2,
    targetYield: 16.5,
    bedrooms: 7,
    bathrooms: 8,
    sqft: 9800,
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1531835551805-16d8e09e0a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
    ],
    description: "An unbelievable eco-resort compound buried in the Tulum jungle. Complete with cenotes, open-air living spaces, and a private chef's kitchen. It is one of our highest-yield producing assets in the hemisphere. Upon successful funding, investors jump immediately onto the institutional track: targeting 30% yield in exactly 2 months, jumping to 60% by month 4, and closing out at 90% ROI by month 6.",
    status: "Funding Stage"
  }
];
