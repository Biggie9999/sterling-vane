import { PrismaClient, PropertyStatus, PropertyType } from '@prisma/client'

const prisma = new PrismaClient()

const MARKETS = [
  { city: "Saint-Tropez", country: "France", yield: 90, type: "VILLA" },
  { city: "Dubai", country: "UAE", yield: 60, type: "PENTHOUSE" },
  { city: "Aspen", country: "USA", yield: 60, type: "VILLA" },
  { city: "Miami", country: "USA", yield: 90, type: "VILLA" },
  { city: "Tokyo", country: "Japan", yield: 30, type: "APARTMENT" },
  { city: "London", country: "UK", yield: 30, type: "PENTHOUSE" },
]

const PROPERTY_NAME_TEMPLATES = [
  "Azure Vista", "Onyx Heights", "The Verdant Lodge", "Ivory Enclave", "Sapphire Sands",
  "The Velvet Loft", "Aurelian Manor", "Crimson Spire", "Obsidian Point", "Emerald Grove"
]

const IMAGES = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600607687940-4720026955c9?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1449156003053-c306a0482905?auto=format&fit=crop&q=80&w=1200"
]

async function main() {
  console.log('Initiating Sovereign-30 Seeding Protocol...')
  
  // Clear existing properties for clean slate
  await prisma.property.deleteMany()
  console.log('Cleared existing assets.')

  const properties = []

  for (let i = 0; i < 30; i++) {
    const market = MARKETS[i % MARKETS.length]
    const template = PROPERTY_NAME_TEMPLATES[Math.floor(Math.random() * PROPERTY_NAME_TEMPLATES.length)]
    const name = `${market.city} ${template} ${String.fromCharCode(65 + Math.floor(i / 6))}`
    const slug = name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000)
    
    const priceBase = 5000000 + Math.random() * 20000000 // $5M to $25M
    const totalShares = 5000 + Math.floor(Math.random() * 45000) // 5,000 to 50,000 shares
    
    // Distribute statuses: 25% are fully subscribed, 15% are coming soon
    const randStatus = Math.random()
    const status: PropertyStatus = randStatus < 0.25 
      ? PropertyStatus.FULLY_SUBSCRIBED 
      : randStatus < 0.40 
        ? PropertyStatus.COMING_SOON 
        : PropertyStatus.ACTIVE

    properties.push({
      name,
      slug,
      description: `A state-of-the-art ${market.type.toLowerCase()} in the heart of ${market.city}. Part of the Sovereign Phase 1 Collection, offering unprecedented ${market.yield}% target yields through strategic short-term lease operations and capital appreciation.`,
      location: `${market.city}, ${market.country}`,
      city: market.city,
      country: market.country,
      type: market.type as PropertyType,
      askingPrice: priceBase,
      nightlyRate: 1500 + Math.random() * 5000,
      yieldEstimate: market.yield,
      capRate: 6 + Math.random() * 4,
      bedrooms: 3 + Math.floor(Math.random() * 6),
      bathrooms: 3 + Math.floor(Math.random() * 4),
      sqft: 2500 + Math.floor(Math.random() * 8000),
      pricePerShare: priceBase / totalShares,
      status,
      images: [IMAGES[i % IMAGES.length], IMAGES[(i + 1) % IMAGES.length]],
      amenities: ["Private Heliport", "Infinity Pool", "Concierge 24/7", "Smart Automation", "Cinema Room"],
    })
  }

  // Batch insert
  await prisma.property.createMany({
    data: properties
  })

  console.log(`Successfully deployed ${properties.length} luxury assets to the ledger.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
