import { PrismaClient, PropertyStatus, PropertyType } from '@prisma/client'

const prisma = new PrismaClient()

const FLAGSHIPS = [
  {
    name: "The Pacific Glass House",
    slug: "pacific-glass-house",
    description: "A triumph of architectural minimalism hanging over the Malibu coastline. Features 270-degree ocean views, a private saltwater infinity pool, and integrated smart-glass technology that adjusts transparency based on solar intensity. Calibrated for 12.4% annual yield through high-frequency seasonal arbitrage.",
    location: "Malibu, California",
    city: "Malibu",
    country: "USA",
    type: "VILLA",
    askingPrice: 15500000,
    nightlyRate: 4500,
    yieldEstimate: 12.4,
    capRate: 8.2,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6500,
    pricePerShare: 75000,
    status: "ACTIVE",
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"],
    amenities: ["Private Heliport", "Infinity Pool", "Smart Glass", "Wine Cellar"]
  },
  {
    name: "The Palm Royale Retreat",
    slug: "palm-royale-retreat",
    description: "An ultra-modern oasis in the heart of Palm Springs. This 'Mid-Century Modern' evolution features a sunken fire-pit lounge, artisanal concrete finishes, and a 2,000 SQFT master wing. Engineered for consistent 8.8% growth through elite destination bookings.",
    location: "Palm Springs, California",
    city: "Palm Springs",
    country: "USA",
    type: "VILLA",
    askingPrice: 8200000,
    nightlyRate: 2800,
    yieldEstimate: 8.8,
    capRate: 7.1,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4800,
    pricePerShare: 42000,
    status: "ACTIVE",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"],
    amenities: ["Sunken Lounge", "Artisanal Concrete", "Desert Garden", "Outdoor Cinema"]
  },
  {
    name: "Manhattan Velvet Suite",
    slug: "manhattan-velvet-suite",
    description: "The pinnacle of urban sophisticated living. A double-height penthouse overlooking Central Park, featuring rare Italian marble, a private elevator, and a 360-degree observation deck. Optimized for high-net-worth executive corporate stays.",
    location: "Upper West Side, NY",
    city: "New York",
    country: "USA",
    type: "PENTHOUSE",
    askingPrice: 22000000,
    nightlyRate: 6500,
    yieldEstimate: 15.2,
    capRate: 9.4,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3800,
    pricePerShare: 110000,
    status: "FULLY_SUBSCRIBED",
    images: ["https://images.unsplash.com/photo-1600607687940-4720026955c9?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200"],
    amenities: ["Central Park Views", "Private Elevator", "Observation Deck", "Italian Marble"]
  }
]

const MARKETS = [
  { city: "Saint-Tropez", country: "France", yield: 9.0, type: "VILLA" },
  { city: "Dubai", country: "UAE", yield: 6.0, type: "PENTHOUSE" },
  { city: "Aspen", country: "USA", yield: 6.0, type: "VILLA" },
  { city: "Tokyo", country: "Japan", yield: 3.0, type: "APARTMENT" },
  { city: "London", country: "UK", yield: 3.0, type: "PENTHOUSE" },
]

const IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1449156003053-c306a0482905?auto=format&fit=crop&q=80&w=1200"
]

async function main() {
  console.log('Initiating Sovereign Collection Seeding Protocol...')
  
  await prisma.property.deleteMany()
  console.log('Cleared existing asset registry.')

  // 1. Create Flagships
  for (const f of FLAGSHIPS) {
    await prisma.property.create({
      data: {
        ...f,
        type: f.type as PropertyType,
        status: f.status as PropertyStatus
      }
    })
  }
  console.log('Deployed Phase 1 Flagship Assets.')

  // 2. Generate Randomized Registry (27 more)
  for (let i = 0; i < 27; i++) {
    const market = MARKETS[i % MARKETS.length]
    const name = `${market.city} Institutional ${String.fromCharCode(65 + i)}`
    const slug = `institutional-${market.city.toLowerCase()}-${i}`
    const priceBase = 4000000 + Math.random() * 10000000
    
    await prisma.property.create({
      data: {
        name,
        slug,
        description: `Institutional-grade ${market.type.toLowerCase()} asset in ${market.city}. Curated for Sovereign Collection portfolio diversification.`,
        location: `${market.city}, ${market.country}`,
        city: market.city,
        country: market.country,
        type: market.type as PropertyType,
        askingPrice: priceBase,
        nightlyRate: 1200 + Math.random() * 2000,
        yieldEstimate: market.yield + (Math.random() * 2),
        capRate: 5 + Math.random() * 3,
        bedrooms: 2 + Math.floor(Math.random() * 4),
        bathrooms: 2 + Math.floor(Math.random() * 3),
        sqft: 2000 + Math.floor(Math.random() * 3000),
        pricePerShare: priceBase / (100 + Math.floor(Math.random() * 400)),
        status: "ACTIVE",
        images: [IMAGES[i % IMAGES.length]],
        amenities: ["24/7 Concierge", "Secure Gated", "Smart Climate"]
      }
    })
  }

  console.log('Successfully completed Sovereign Collection asset deployment.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
