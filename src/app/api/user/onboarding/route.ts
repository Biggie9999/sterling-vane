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
    const { onboardingComplete, intent, accreditation } = await request.json()

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        onboardingComplete: Boolean(onboardingComplete),
        intent: intent,
        accreditation: accreditation
      } as any
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Onboarding API error:", error)
    return NextResponse.json({ error: "Failed to update onboarding status" }, { status: 500 })
  }
}
