import { HomeHero } from "@/components/home/HomeHero"
import { FeaturedProperties } from "@/components/landing/FeaturedProperties"
import { SovereignStory } from "@/components/landing/SovereignStory"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { CoreCompetencies } from "@/components/landing/CoreCompetencies"
import { Testimonials } from "@/components/landing/Testimonials"
import { FinalCTA } from "@/components/landing/FinalCTA"

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-[#F8FAFC]">
      <HomeHero />

      {/* Narrative & Yield Thesis */}
      <SovereignStory />
      
      {/* Structural Alpha & Comparison */}
      <HowItWorks />
      
      {/* The Collection: Swipeable Carousel */}
      <FeaturedProperties />
      
      {/* Foundation & Pillars */}
      <CoreCompetencies />
      
      {/* Testimonials: Investor Results */}
      <Testimonials />
      
      {/* Final Inquiry */}
      <FinalCTA />
    </main>
  )
}
