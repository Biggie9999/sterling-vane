import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

import { Hero } from "@/components/landing/Hero"
import { ThePivot } from "@/components/landing/ThePivot"
import { AlphaMath } from "@/components/landing/AlphaMath"
import { FeaturedCollection } from "@/components/landing/FeaturedCollection"
import { FinalCTA } from "@/components/landing/FinalCTA"

export default async function LandingPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="bg-black min-h-screen w-full selection:bg-accent selection:text-black">
      <Hero />
      <ThePivot />
      <AlphaMath />
      <FeaturedCollection />
      <FinalCTA />
    </main>
  )
}
