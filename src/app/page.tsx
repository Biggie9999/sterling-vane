import { FeaturedCollection } from "@/components/landing/FeaturedCollection"
import { StatsStrip } from "@/components/landing/StatsStrip"
import { Hero } from "@/components/landing/Hero"
import { SovereignStory } from "@/components/landing/SovereignStory"
import { Testimonials } from "@/components/landing/Testimonials"

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen font-sans w-full">
      <Hero />
      <StatsStrip />
      <FeaturedCollection />
      <SovereignStory />
      <Testimonials />
    </div>
  )
}
