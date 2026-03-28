import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  try {
    if (id) {
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

    return NextResponse.json(properties)
  } catch (error) {
    console.error("Property fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}
