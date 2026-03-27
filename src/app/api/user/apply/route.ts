import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { propertyId, amount, accreditation } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create a new investment with status PENDING
    // Since our schema doesn't have PENDING in InvestmentStatus enum, 
    // we'll just create it as ACTIVE for now or I can update the schema if needed.
    // Looking at schema.prisma: enum InvestmentStatus { ACTIVE, MATURED, WITHDRAWN }
    // We'll use ACTIVE for now but we can track the 'applicationStatus' in InvestorProfile
    
    const investment = await prisma.investment.create({
      data: {
        userId: user.id,
        propertyId: propertyId,
        amount: parseFloat(amount),
        roiPercent: 12.4, // Initial mock ROI
        status: "ACTIVE"
      }
    })

    // Update investor profile
    await prisma.investorProfile.update({
      where: { userId: user.id },
      data: {
        totalInvested: { increment: parseFloat(amount) },
        applicationStatus: "PENDING" // This marks the whole account as pending verification
      }
    })

    return NextResponse.json({ success: true, investmentId: investment.id })
  } catch (error) {
    console.error("Investment submission error:", error)
    return NextResponse.json({ error: "Failed to submit investment" }, { status: 500 })
  }
}
