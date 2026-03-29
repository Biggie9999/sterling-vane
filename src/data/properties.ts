export interface PropertyAsset {
  id: string;
  name: string;
  location: string;
  address: string;
  neighborhood: string;
  market: string;
  type: "Seed" | "Growth" | "Principal";
  pricePerShare: number;
  totalShares: number;
  availableShares: number;
  propertyValue: number;
  capRate: number;
  yieldMilestone2: number;
  yieldMilestone4: number;
  yieldMilestone6: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  description: string;
  status: "Coming Soon" | "Funding Stage" | "Stabilized" | "Fully Funded";
  amenities: string[];
}

export const DEMO_PROPERTIES: PropertyAsset[] = [
  {
    id: "prop_pacific_01",
    name: "The Pacific Glass House",
    location: "Malibu, California",
    address: "27400 Pacific Coast Hwy, Malibu, CA 90265",
    neighborhood: "Carbon Beach — 'Billionaires' Beach'",
    market: "California",
    type: "Growth",
    pricePerShare: 10000,
    totalShares: 1250,
    availableShares: 245,
    propertyValue: 12500000,
    capRate: 8.2,
    yieldMilestone2: 30,
    yieldMilestone4: 60,
    yieldMilestone6: 90,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 8500,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c349803?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    ],
    description:
      "Positioned on the world-renowned Carbon Beach — 'Billionaires' Beach' — this contemporary glass mansion commands unobstructed Pacific Ocean views from every room. Floor-to-ceiling glazing floods the interiors with natural light, while the open-plan kitchen and entertainment deck make it the definitive luxury short-term rental destination on the California coast. Targets the design-forward UHNW traveler seeking privacy and premium experiences.",
    status: "Funding Stage",
    amenities: [
      "Infinity Pool",
      "Private Beach Access",
      "Cinema Room",
      "Smart Home Automation",
      "Wine Cellar",
      "6-Car Garage",
      "Chef's Kitchen",
      "Rooftop Terrace",
    ],
  },
  {
    id: "prop_palm_02",
    name: "The Palm Royale Retreat",
    location: "Palm Beach, Florida",
    address: "1 N County Rd, Palm Beach, FL 33480",
    neighborhood: "Estate Section — North End Palm Beach",
    market: "Florida",
    type: "Principal",
    pricePerShare: 10000,
    totalShares: 2400,
    availableShares: 412,
    propertyValue: 24000000,
    capRate: 6.8,
    yieldMilestone2: 30,
    yieldMilestone4: 60,
    yieldMilestone6: 90,
    bedrooms: 8,
    bathrooms: 9,
    sqft: 12000,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    ],
    description:
      "A landmark estate in Palm Beach's prestigious Estate Section, steps from the Intracoastal Waterway. This resort-inspired compound blends Mediterranean grandeur with tropical sophistication — featuring spectacular loggia entertaining areas, a resort-sized pool, and private dock access. A high-occupancy leisure destination catering to the global leisure and corporate retreat market. Consistently booked 10+ months of the year with nightly rates exceeding $15,000.",
    status: "Funding Stage",
    amenities: [
      "Resort Pool & Spa",
      "Private Dock",
      "Tennis Court",
      "Summer Kitchen",
      "7-Car Motor Court",
      "Full Smart Security",
      "Staff Quarters",
      "Outdoor Cinema",
    ],
  },
  {
    id: "prop_manhattan_03",
    name: "The Manhattan Velvet Suite",
    location: "New York, NY",
    address: "432 Park Ave, New York, NY 10022",
    neighborhood: "Billionaires' Row — Midtown Manhattan",
    market: "New York",
    type: "Seed",
    pricePerShare: 10000,
    totalShares: 800,
    availableShares: 520,
    propertyValue: 8000000,
    capRate: 5.5,
    yieldMilestone2: 30,
    yieldMilestone4: 60,
    yieldMilestone6: 90,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 4500,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
    ],
    description:
      "Situated on Billionaires' Row, the most coveted address in all of New York City, The Manhattan Velvet Suite offers sky-high panoramic views of Central Park and the Manhattan skyline. Refined urban living with premium finishes — custom Italian millwork, Calacatta marble throughout, and a chef's kitchen by Boffi. Targets executive, diplomatic, and international travellers. A Phase 1 flagship unit designed for maximum occupancy at premium nightly rates in the world's financial capital.",
    status: "Coming Soon",
    amenities: [
      "Central Park Views",
      "Concierge Service",
      "Private Elevator",
      "Chef's Kitchen",
      "Home Office Suite",
      "On-site Fitness Center",
      "Valet Parking",
      "24/7 Security",
    ],
  },
];
