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

    // Real calculations from database
    const totalInvested = user.investments.reduce((acc, inv) => acc + inv.amount, 0)
    
    const returnsToDate = user.investments.reduce((acc, inv) => {
      const distributionsSum = inv.distributions.reduce((sum, dist) => sum + dist.amount, 0)
      return acc + distributionsSum
    }, 0)
    
    // Calculate current value based on time held: principal + estimated 10% annual growth
    const currentValue = user.investments.reduce((acc, inv) => {
      const daysHeld = Math.max(0, Math.floor((new Date().getTime() - new Date(inv.startDate).getTime()) / (1000 * 60 * 60 * 24)))
      const dailyGrowthRate = 0.10 / 365
      const appreciation = inv.amount * (dailyGrowthRate * daysHeld)
      return acc + inv.amount + appreciation
    }, 0)

    const growthPercent = totalInvested > 0 
      ? `+${(((currentValue / totalInvested) - 1) * 100).toFixed(1)}%` 
      : "0%"

    const fullName = user.name || session.user.name || ""
    const firstName = fullName ? fullName.split(" ")[0] : (session.user.email || "Investor").split("@")[0]

    const dashboardData = {
      firstName,
      stats: {
        totalInvested: `$${totalInvested.toLocaleString()}`,
        currentValue: `$${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        returnsToDate: `$${returnsToDate.toLocaleString()}`,
        nextDistribution: user.investments.length > 0 ? "Q2 2026" : "None scheduled",
        growthPercent: growthPercent
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
