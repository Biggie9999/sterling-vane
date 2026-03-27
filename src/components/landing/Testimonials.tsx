"use client"

import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      imageFile: "/testimonials/1.jpg",
      quote: "Trusting you with my $90,000 retirement fund is the ultimate retirement fund. You changed my life in a short time. I am forever indebted to you for this once in a lifetime opportunity.",
      author: "Retirement Investor",
      role: "Phase 1 Participant"
    },
    {
      id: 2,
      imageFile: "/testimonials/2.jpg",
      quote: "DEBT NAILED $87K IN 4 WEEKS THANK YOU STERLING VANE",
      author: "Debt-Free Couple",
      role: "Phase 1 Participants"
    },
    {
      id: 3,
      imageFile: "/testimonials/3.jpg",
      quote: "I get to live the jetset lifestyle while my money works, thanks for this opportunity Vane, you're a blessing.",
      author: "Jetset Investor",
      role: "Sovereign Collection Partner"
    },
    {
      id: 4,
      imageFile: "/testimonials/4.jpg",
      quote: "I know I am crazy to invest that much but now $440,000 in ROI in 6 months, this is all Investors dream. Thank you for this Opportunity Mr. Vane",
      author: "High Conviction Investor",
      role: "Principal Investor"
    }
  ]

  return (
    <section className="bg-white py-24 border-t border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Investor Relations</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6">Proven Execution</h2>
          <p className="text-lg text-[#666] leading-relaxed">
            The Sovereign Collection attracts institutional and accredited capital globally, drawn by disciplined underwriting and consistent yield.
          </p>
        </div>

        {/* Mobile Swipe / Desktop Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory pb-10 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-[85vw] sm:min-w-0 shrink-0 snap-center relative group rounded-2xl overflow-hidden shadow-md border border-[#E5E5E5] bg-white flex flex-col">
              <div className="relative w-full aspect-square overflow-hidden bg-[#FAF9F6]">
                <img src={t.imageFile} alt="Investor Testimonial" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex text-[#C9A84C] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current mr-0.5" />
                    ))}
                  </div>
                  <p className="text-[#333] font-serif leading-relaxed text-sm mb-6">&quot;{t.quote}&quot;</p>
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a] text-xs uppercase tracking-wider">{t.author}</p>
                  <p className="text-[#888] text-[10px] uppercase tracking-[0.2em] mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
