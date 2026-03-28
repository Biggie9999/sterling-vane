import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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
      
      // Parse JSON for SQLite compatibility
      return NextResponse.json({
        ...property,
        images: JSON.parse(property.images),
        amenities: JSON.parse(property.amenities)
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

    // Parse JSON for SQLite compatibility across the vast collection
    const parsedProperties = properties.map(p => ({
      ...p,
      images: JSON.parse(p.images),
      amenities: JSON.parse(p.amenities)
    }))

    return NextResponse.json(parsedProperties)
  } catch (error) {
    console.error("Database selection error:", error)
    return NextResponse.json({ error: "Institutional data source currently unavailable" }, { status: 500 })
  }
}
