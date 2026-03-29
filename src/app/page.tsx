import { HomeHero } from "@/components/home/HomeHero"
import { FeaturedProperties } from "@/components/landing/FeaturedProperties"
import { SovereignStory } from "@/components/landing/SovereignStory"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { InvestmentMath } from "@/components/landing/InvestmentMath"
import { CoreCompetencies } from "@/components/landing/CoreCompetencies"
import { Testimonials } from "@/components/landing/Testimonials"
import { FinalCTA } from "@/components/landing/FinalCTA"

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-[#F8FAFC]">
      <HomeHero />

      {/* ── IMMEDIATE VALUE: The Collection (Moved Up) ── */}
      <div id="collection" className="scroll-mt-20">
        <FeaturedProperties />
      </div>

      {/* ── THE THESIS: Narrative & Yield ── */}
      <SovereignStory />
      
      {/* ── THE DIFFERENTIATOR: Comparison (Airbnb/Zillow) ── */}
      <HowItWorks />
      
      {/* ── THE MATH: Strict $10k Model ── */}
      <InvestmentMath />
      
      {/* ── THE FOUNDATION: Pillars ── */}
      <CoreCompetencies />
      
      {/* ── THE PROOF: Testimonials ── */}
      <Testimonials />
      
      {/* ── FINAL CTAs: Simplified Wording ── */}
      <FinalCTA />
    </main>
  )
}
