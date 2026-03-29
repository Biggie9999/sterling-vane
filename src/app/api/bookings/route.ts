import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { propertyId, checkIn, checkOut, amount } = await request.json()

    if (!propertyId || !checkIn || !checkOut || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Parse dates
    const parsedCheckIn = new Date(checkIn)
    const parsedCheckOut = new Date(checkOut)

    if (isNaN(parsedCheckIn.getTime()) || isNaN(parsedCheckOut.getTime())) {
      return NextResponse.json({ error: "Invalid dates provided" }, { status: 400 })
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        propertyId,
        checkIn: parsedCheckIn,
        checkOut: parsedCheckOut,
        totalPrice: parseFloat(amount),
        guests: 2, // Default for demo platform
        status: "PENDING"
      }
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
