import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        investorProfile: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Split name into first and last
    const nameParts = (user.name || "").split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    return NextResponse.json({
      firstName,
      lastName,
      email: user.email,
      phone: user.phone || "",
      bankName: user.investorProfile?.bankName || "",
      bankRouting: user.investorProfile?.bankRouting || "",
      bankAccount: user.investorProfile?.bankAccount || "",
      notifications: user.investorProfile?.notifications || {
        distributions: true,
        insights: true,
        offerings: true,
        stays: false
      }
    })
  } catch (error) {
    console.error("Settings GET error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, phone, bankName, bankRouting, bankAccount, notifications } = body

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { investorProfile: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update User
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: `${firstName} ${lastName}`.trim(),
        phone: phone
      }
    })

    // Update InvestorProfile
    if (user.investorProfile) {
      await prisma.investorProfile.update({
        where: { id: user.investorProfile.id },
        data: {
          bankName,
          bankRouting,
          bankAccount,
          notifications
        }
      })
    } else {
      // Create if it doesn't exist
      await prisma.investorProfile.create({
        data: {
          userId: user.id,
          tier: "ENTRY",
          totalInvested: 0,
          applicationStatus: "PENDING",
          bankName,
          bankRouting,
          bankAccount,
          notifications
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Settings POST error:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
