import { PrismaClient, PropertyType, PropertyStatus } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const properties: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    location: string;
    city: string;
    country: string;
    type: PropertyType;
    askingPrice: number;
    nightlyRate: number;
    yieldEstimate: number;
    capRate: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    pricePerShare: number;
    status: PropertyStatus;
    images: string[];
    amenities: string[];
  }> = [
    {
      id: "prop_miami_01",
      name: "The Biscayne Vista",
      slug: "the-biscayne-vista",
      description: "An architectural masterpiece set against the stunning Miami skyline. Features sweeping infinity pools, floor-to-ceiling glass, and a private dock. Built to out-perform the market — this asset follows our accelerated return structure targeting 30% by month 2, 60% by month 4, and 90% by month 6 through aggressive high-end short-term rentals to UHNW travelers.",
      location: "Miami, FL",
      city: "Miami",
      country: "USA",
      type: PropertyType.APARTMENT,
      askingPrice: 12500000,
      nightlyRate: 2500,
      yieldEstimate: 14.5,
      capRate: 8.2,
      bedrooms: 6,
      bathrooms: 7,
      sqft: 8500,
      pricePerShare: 50000,
      status: PropertyStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
        "https://images.unsplash.com/photo-1600607687931-570d510fffc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c1566903?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      ],
      amenities: ["Infinity Pool", "Private Dock", "Home Cinema", "Smart Home"]
    },
    {
      id: "prop_la_02",
      name: "The Montecito Modern",
      slug: "the-montecito-modern",
      description: "An ultra-luxury compound nestled in the hills of Montecito. Fully stabilized, delivering exceptional short-term rent premiums from A-list clientele. Capital appreciation locked in via exclusive zoning rights. We strictly manage this asset to deliver our flagship return schedule: 30% at month 2, 60% at month 4, and 90% by month 6.",
      location: "Montecito, CA",
      city: "Montecito",
      country: "USA",
      type: PropertyType.VILLA,
      askingPrice: 24000000,
      nightlyRate: 4500,
      yieldEstimate: 12.0,
      capRate: 6.8,
      bedrooms: 8,
      bathrooms: 9,
      sqft: 12000,
      pricePerShare: 75000,
      status: PropertyStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      ],
      amenities: ["Spa", "Vineyard", "Guest House", "Security System"]
    },
    {
      id: "prop_nyc_03",
      name: "The Velvet Suite Penthouse",
      slug: "the-velvet-suite-penthouse",
      description: "Sitting high above the Manhattan skyline, this penthouse was acquired off-market and is undergoing bespoke repositioning for exclusive corporate and diplomatic short-term leases. Investors are primed to capture 30% yield in 60 days, 60% in 120 days, and 90% return profile by 180 days.",
      location: "New York, NY",
      city: "New York",
      country: "USA",
      type: PropertyType.PENTHOUSE,
      askingPrice: 8000000,
      nightlyRate: 1800,
      yieldEstimate: 11.2,
      capRate: 5.5,
      bedrooms: 3,
      bathrooms: 4,
      sqft: 4500,
      pricePerShare: 50000,
      status: PropertyStatus.COMING_SOON,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      ],
      amenities: ["Sky Deck", "Library", "Chef's Kitchen", "Gym"]
    },
    {
      id: "prop_tokyo_04",
      name: "Aman Residences Skytower",
      slug: "aman-residences-skytower",
      description: "Our flagship international expansion asset. The Aman Residences Skytower combines Japanese minimalist zen aesthetics with world-class smart home technology, located in the heart of Minato City. Aggressively underwritten to match our signature performance benchmark: 30% by month 2, 60% by month 4, 90% by month 6.",
      location: "Tokyo, Japan",
      city: "Tokyo",
      country: "Japan",
      type: PropertyType.PENTHOUSE,
      askingPrice: 31000000,
      nightlyRate: 5500,
      yieldEstimate: 18.0,
      capRate: 9.1,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 6100,
      pricePerShare: 100000,
      status: PropertyStatus.FULLY_SUBSCRIBED,
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      ],
      amenities: ["Zen Garden", "Tea Room", "Floor-to-Ceiling Windows", "24/7 Concierge"]
    },
    {
      id: "prop_tulum_05",
      name: "Casa de Piedra",
      slug: "casa-de-piedra",
      description: "An unbelievable eco-resort compound in the Tulum jungle — with cenotes, open-air living spaces, and a private chef's kitchen. One of our highest-yield producing assets in the hemisphere. Investors jump onto our institutional track: 30% yield in 2 months, 60% at month 4, and 90% ROI by month 6.",
      location: "Tulum, Mexico",
      city: "Tulum",
      country: "Mexico",
      type: PropertyType.VILLA,
      askingPrice: 6500000,
      nightlyRate: 1500,
      yieldEstimate: 16.5,
      capRate: 11.2,
      bedrooms: 7,
      bathrooms: 8,
      sqft: 9800,
      pricePerShare: 50000,
      status: PropertyStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
      ],
      amenities: ["Jungle Views", "Out-Door Living", "Private Cenote", "Eco-friendly Design"]
    }
  ]

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: property,
      create: property,
    })
  }

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
