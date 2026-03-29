import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { propertyId, amount, shares, accreditation } = await request.json()

    if (!propertyId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    })
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    // Create a new investment with status PENDING_WIRE
    const investment = await prisma.investment.create({
      data: {
        userId: user.id,
        propertyId,
        amount: parseFloat(amount),
        roiPercent: property.yieldEstimate, 
        status: "PENDING_WIRE",
      }
    })

    return NextResponse.json(investment)
  } catch (error) {
    console.error("Investment application error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
