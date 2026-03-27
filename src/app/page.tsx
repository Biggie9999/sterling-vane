import { Hero } from "@/components/landing/Hero"
import { PropertyMapGrid } from "@/components/landing/PropertyMapGrid"
import { SovereignStory } from "@/components/landing/SovereignStory"
import { Testimonials } from "@/components/landing/Testimonials"

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen font-sans w-full">
      <Hero />
      <PropertyMapGrid />
      <SovereignStory />
      <Testimonials />
    </div>
  )
}
