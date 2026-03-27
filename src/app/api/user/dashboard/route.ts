import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        investorProfile: true,
        investments: {
          include: {
            property: true,
            distributions: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Default stats if no profile yet
    const profile = user.investorProfile || {
      totalInvested: 0,
      tier: "ENTRY",
      applicationStatus: "PENDING"
    }

    // Calculate current value based on simple yield estimate for demo
    // In a real app, this would be more complex
    const totalInvested = profile.totalInvested
    const returnsToDate = user.investments.reduce((acc, inv) => {
      const distributionsSum = inv.distributions.reduce((sum, dist) => sum + dist.amount, 0)
      return acc + distributionsSum
    }, 0)
    
    // For demo: current value is invested + estimated growth
    const currentValue = totalInvested * 1.24 // Mocking 24% growth

    const dashboardData = {
      firstName: user.name.split(" ")[0],
      stats: {
        totalInvested: `$${totalInvested.toLocaleString()}`,
        currentValue: `$${currentValue.toLocaleString()}`,
        returnsToDate: `$${returnsToDate.toLocaleString()}`,
        nextDistribution: user.investments.length > 0 ? "Q2 2026" : "None scheduled",
        growthPercent: totalInvested > 0 ? "+24.8%" : "0%"
      },
      investments: user.investments.map(inv => ({
        id: inv.id,
        name: inv.property.name,
        location: `${inv.property.city}, ${inv.property.country}`,
        status: inv.property.status === "ACTIVE" ? "Operating" : "Stabilizing",
        yield: `$${(inv.amount * (inv.property.yieldEstimate / 100) / 4).toLocaleString()}`, // Estimated quarterly
        share: `${((inv.amount / (inv.property.askingPrice || 1000000)) * 100).toFixed(1)}%`
      })),
      hasInvestments: user.investments.length > 0,
      status: profile.applicationStatus
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Dashboard data fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
