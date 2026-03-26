import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Sterling Vane operates with a level of precision rarely seen in private syndications. The 90-day liquidity option completely changed how I allocate my cash reserves.",
    name: "James T.",
    location: "New York, USA",
    tier: "Growth Tier"
  },
  {
    quote: "I was skeptical of short-term rental funds, but receiving my first 32% annualized distribution on schedule erased all doubts. Unmatched execution.",
    name: "Elena M.",
    location: "Dubai, UAE",
    tier: "Private Tier"
  },
  {
    quote: "The transparency is what sold me. I log into my portal, I see exactly how the Miami asset is performing this week, and I know exactly when my wire arrives.",
    name: "Marcus L.",
    location: "London, UK",
    tier: "Growth Tier"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-black luxury-grain border-y border-border-dark">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-white text-center mb-16">
          The standard is proven.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-[#0f0f0f] border border-border-dark p-8 relative flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-sans text-warmGrey italic leading-relaxed mb-8">
                  "{test.quote}"
                </p>
              </div>
              
              <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                <div>
                  <p className="font-serif text-white text-lg">{test.name}</p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-warmGrey mt-1">{test.location}</p>
                </div>
                <div className="px-3 py-1 bg-gold/10 border border-gold/30 rounded-sm">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-gold">{test.tier}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
