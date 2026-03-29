import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const idOrSlug = searchParams.get("id")

  try {
    if (idOrSlug) {
      const property = await prisma.property.findFirst({
        where: {
          OR: [
            { id: idOrSlug },
            { slug: idOrSlug }
          ]
        },
        include: {
          investments: true
        }
      })
      
      if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 })
      
      // Parse JSON safely for both SQLite and Postgres compatibility
      return NextResponse.json({
        ...property,
        images: typeof property.images === 'string' ? JSON.parse(property.images) : property.images,
        amenities: typeof property.amenities === 'string' ? JSON.parse(property.amenities) : property.amenities
      })
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
      return NextResponse.json([])
    }

    // Parse JSON safely for both SQLite and Postgres compatibility
    const parsedProperties = properties.map(p => ({
      ...p,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
      amenities: typeof p.amenities === 'string' ? JSON.parse(p.amenities) : p.amenities
    }))

    return NextResponse.json(parsedProperties)
  } catch (error) {
    console.error("Database selection error:", error)
    return NextResponse.json({ error: "Institutional data source currently unavailable" }, { status: 500 })
  }
}
