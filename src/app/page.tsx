import { CoreCompetencies } from "@/components/landing/CoreCompetencies"
import { FeaturedCollection } from "@/components/landing/FeaturedCollection"
import { StatsStrip } from "@/components/landing/StatsStrip"
import { Hero } from "@/components/landing/Hero"
import { SovereignStory } from "@/components/landing/SovereignStory"
import { Testimonials } from "@/components/landing/Testimonials"
import { HowItWorks } from "@/components/landing/HowItWorks"

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen font-sans w-full">
      <Hero />
      <CoreCompetencies />
      <StatsStrip />
      <FeaturedCollection />
      <HowItWorks />
      <SovereignStory />
      <Testimonials />
    </div>
  )
}
