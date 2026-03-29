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

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { investmentId, action } = body

    if (!investmentId || !["confirm", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 })
    }

    // Check if investment exists
    const investment = await prisma.investment.findUnique({
      where: { id: investmentId }
    })

    if (!investment) {
      return NextResponse.json({ error: "Investment not found" }, { status: 404 })
    }

    if (action === "confirm") {
      await prisma.investment.update({
        where: { id: investmentId },
        data: { status: "ACTIVE" }
      })
    } else if (action === "reject") {
      await prisma.investment.update({
        where: { id: investmentId },
        data: { status: "REJECTED" }
      })
    }

    return NextResponse.json({ success: true, message: `Investment ${action}ed successfully` })
  } catch (error) {
    console.error("Wire settlement error:", error)
    return NextResponse.json({ error: "Failed to process wire settlement" }, { status: 500 })
  }
}
