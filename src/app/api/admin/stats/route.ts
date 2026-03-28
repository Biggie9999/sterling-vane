import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if admin
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const totalAUM = await prisma.investment.aggregate({
      where: { status: "ACTIVE" },
      _sum: { amount: true }
    })

    const totalInvestors = await prisma.user.count({
      where: { role: "INVESTOR" }
    })

    const activeProperties = await prisma.property.count({
      where: { status: "ACTIVE" }
    })

    const pendingWires = await prisma.investment.findMany({
      where: { status: "PENDING_WIRE" },
      include: {
        user: true,
        property: true
      },
      orderBy: {
        startDate: "desc"
      }
    })

    const recentUsers = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        investorProfile: true
      }
    })

    return NextResponse.json({
      stats: {
        totalAUM: totalAUM._sum.amount || 0,
        totalInvestors,
        activeProperties,
        pendingWiresCount: pendingWires.length
      },
      pendingWires,
      recentUsers
    })
  } catch (error) {
    console.error("Admin stats fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 })
  }
}
