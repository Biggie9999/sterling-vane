import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const MOCK_PROPERTIES = [
  {
    id: "pacific-glass-house",
    name: "The Pacific Glass House",
    slug: "pacific-glass-house",
    description: "A triumph of architectural minimalism hanging over the Malibu coastline. Features 270-degree ocean views and a private saltwater infinity pool. Calibrated for 12.4% yield.",
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
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"],
    amenities: ["Private Heliport", "Infinity Pool"],
    investments: [],
    createdAt: new Date().toISOString()
  },
  {
    id: "palm-royale-retreat",
    name: "The Palm Royale Retreat",
    slug: "palm-royale-retreat",
    description: "An ultra-modern oasis in the heart of Palm Springs. Engineered for consistent 8.8% growth.",
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
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"],
    amenities: ["Sunken Lounge", "Desert Garden"],
    investments: [],
    createdAt: new Date().toISOString()
  },
  {
    id: "manhattan-velvet-suite",
    name: "Manhattan Velvet Suite",
    slug: "manhattan-velvet-suite",
    description: "The pinnacle of urban sophisticated living. A double-height penthouse overlooking Central Park.",
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
    images: ["https://images.unsplash.com/photo-1600607687940-4720026955c9?auto=format&fit=crop&q=80&w=1200"],
    amenities: ["Central Park Views", "Private Elevator"],
    investments: [],
    createdAt: new Date().toISOString()
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  try {
    if (id) {
       // Check mock first for individual detail consistency in demo
       const mock = MOCK_PROPERTIES.find(p => p.id === id || p.slug === id)
       if (mock) return NextResponse.json(mock)

      const property = await prisma.property.findUnique({
        where: { id },
        include: {
          investments: true
        }
      })
      if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 })
      return NextResponse.json(property)
    }

    const properties = await prisma.property.findMany({
      include: {
        investments: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    if (!properties || properties.length === 0) {
      return NextResponse.json(MOCK_PROPERTIES)
    }

    return NextResponse.json(properties)
  } catch (error) {
    console.warn("DB connection failed, falling back to mock assets for Sovereign Collection display.")
    return NextResponse.json(MOCK_PROPERTIES)
  }
}
