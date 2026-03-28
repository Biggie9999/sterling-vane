import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const MARKETS = [
  { city: "London", country: "UK", yieldBase: 4.5, type: "PENTHOUSE", currency: "GBP" },
  { city: "Dubai", country: "UAE", yieldBase: 7.2, type: "VILLA", currency: "AED" },
  { city: "Malibu", country: "USA", yieldBase: 12.4, type: "VILLA", currency: "USD" },
  { city: "Tokyo", country: "Japan", yieldBase: 3.8, type: "APARTMENT", currency: "JPY" },
  { city: "Paris", country: "France", yieldBase: 5.1, type: "PENTHOUSE", currency: "EUR" },
  { city: "Saint-Tropez", country: "France", yieldBase: 9.8, type: "VILLA", currency: "EUR" },
  { city: "Aspen", country: "USA", yieldBase: 6.5, type: "VILLA", currency: "USD" },
  { city: "Zurich", country: "Switzerland", yieldBase: 4.2, type: "APARTMENT", currency: "CHF" },
  { city: "Miami", country: "USA", yieldBase: 8.5, type: "VILLA", currency: "USD" },
  { city: "Kyoto", country: "Japan", yieldBase: 4.1, type: "VILLA", currency: "JPY" },
  { city: "Singapore", country: "Singapore", yieldBase: 3.9, type: "PENTHOUSE", currency: "SGD" },
  { city: "Portofino", country: "Italy", yieldBase: 10.2, type: "VILLA", currency: "EUR" },
]

const ADJECTIVES = ["Sovereign", "Institutional", "Elite", "Flagship", "Legacy", "Principal", "Ascendant", "Signature", "Prime", "Luxe"]
const NOUNS = ["Enclave", "Penthouse", "Estate", "Manor", "Collection", "Terrace", "Suites", "Residence", "Pavilion", "Aerie"]

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
  "https://images.unsplash.com/photo-1449156003053-c306a0482905?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600585154526-990dcea42e49?auto=format&fit=crop&q=80&w=1200",
]

async function main() {
  console.log('Initiating Global Sovereign Collection Seeding Protocol [SQLite Mode]...')
  
  // Clear existing registry
  await prisma.property.deleteMany()
  console.log('Registry purged for fresh deployment.')

  const totalAssets = 64
  
  for (let i = 0; i < totalAssets; i++) {
    const market = MARKETS[i % MARKETS.length]
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
    
    const name = `${adj} ${market.city} ${noun} ${String.fromCharCode(65 + (i % 26))}`
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${i}`
    
    // Financial modeling (Realistic Luxury Metrics)
    const priceBase = 4500000 + Math.random() * 25000000
    const yieldEstimate = market.yieldBase + (Math.random() * 3 - 1.5)
    const capRate = yieldEstimate * 0.65
    const nightlyRate = (priceBase * 0.0003) + Math.random() * 1000

    // Asset Status distribution
    let status = "ACTIVE"
    if (i % 7 === 0) status = "FULLY_SUBSCRIBED"
    if (i % 11 === 0) status = "COMING_SOON"

    await prisma.property.create({
      data: {
        name,
        slug,
        description: `This ${adj.toLowerCase()} ${market.type.toLowerCase()} asset, situated in the heart of ${market.city}, represents the pinnacle of Sterling Vane's ${market.country} portfolio. Optimized for institutional-grade yields through high-frequency short-term stays and premium corporate retreats. Features custom architectural finishes and a private wellness wing.`,
        location: `${market.city}, ${market.country}`,
        city: market.city,
        country: market.country,
        type: market.type,
        askingPrice: priceBase,
        nightlyRate: Math.round(nightlyRate),
        yieldEstimate: parseFloat(yieldEstimate.toFixed(1)),
        capRate: parseFloat(capRate.toFixed(1)),
        bedrooms: 2 + Math.floor(Math.random() * 6),
        bathrooms: 2 + Math.floor(Math.random() * 5),
        sqft: 2500 + Math.floor(Math.random() * 8000),
        pricePerShare: Math.round(priceBase / (200 + Math.floor(Math.random() * 200))),
        status,
        images: JSON.stringify([
          IMAGES[i % IMAGES.length],
          IMAGES[(i + 1) % IMAGES.length],
          IMAGES[(i + 2) % IMAGES.length],
        ]),
        amenities: JSON.stringify([
          "24/7 Concierge", 
          "Private Wellness Wing", 
          "Secure Biometric Entry", 
          "Climate-Controlled Wine Room",
          "Tesla Charging Suite",
          "Chef's Kitchen"
        ])
      }
    })

    if ((i + 1) % 10 === 0) console.log(`✓ Synchronized ${i + 1} assets...`)
  }

  console.log(`Successfully completed deployment of ${totalAssets} Sovereign Collection assets.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
