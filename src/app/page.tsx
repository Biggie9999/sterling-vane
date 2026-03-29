import { Navbar } from "@/components/layout/Navbar"
import { HomeHero } from "@/components/home/HomeHero"
import { NarrativeSections } from "@/components/home/NarrativeSections"
import { FeaturedPortfolio } from "@/components/home/FeaturedPortfolio"
import { ROICalculator } from "@/components/home/ROICalculator"
import { AboutSterlingVane } from "@/components/home/AboutSterlingVane"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/layout/Footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-[#F8FAFC]">
      <Navbar />
      <HomeHero />
      
      {/* Starting the Presentation: Discovery Layer */}


      {/* Narrative: The Thesis */}
      <NarrativeSections />
      
      {/* Performance Manifest: ROI Projections */}
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-48">
        <ROICalculator />
      </div>
      
      {/* The Actual Assets: Live Collection */}
      <FeaturedPortfolio />
      
      {/* Background/Ethos */}
      <AboutSterlingVane />
      
      {/* Final Inquiry */}
      <FinalCTA />

      <Footer />
    </main>
  )
}
