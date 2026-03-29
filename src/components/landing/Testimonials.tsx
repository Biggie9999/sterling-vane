"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    imageFile: "/testimonials/1.jpg",
    quote: "Trusting you with my $90,000 retirement fund was the ultimate decision I've ever made. You changed my life in a short time. I am forever indebted to you for this once-in-a-lifetime opportunity.",
    author: "Retirement Investor",
    role: "Phase 1 Participant",
    highlight: "$90K",
  },
  {
    id: 2,
    imageFile: "/testimonials/2.jpg",
    quote: "Vacationing while my money works for me. I couldn't be more grateful Mr. Sterling Vane. This is the most secure investment I have made!",
    author: "Global Investor",
    role: "Sovereign Collection Partner",
    highlight: "Vacationing",
  },
  {
    id: 3,
    imageFile: "/testimonials/3.jpg",
    quote: "I know I am crazy to invest that much but now $440,000 in ROI in 6 months — this is every investor's dream. Thank you for this opportunity Mr. Vane.",
    author: "High Conviction Investor",
    role: "Principal Investor",
    highlight: "$440K ROI",
  },
  {
    id: 4,
    imageFile: "/testimonials/4.jpg",
    quote: "Debt nailed — $87K cleared in 4 weeks. Thank you Sterling Vane. This has been life-changing for our family.",
    author: "Debt-Free Couple",
    role: "Phase 1 Participants",
    highlight: "$87K",
  },
]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 300
    const gap = 20
    scrollRef.current.scrollBy({ left: dir === "left" ? -(cardWidth + gap) : cardWidth + gap, behavior: "smooth" })
  }

  return (
    <section className="bg-[#0F172A] py-16 sm:py-24 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
          <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-widest mb-3">Investor Relations</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">Proven Execution</h2>
          <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
            Real investors. Real results. No actors, no scripts.
          </p>
        </div>

        {/* MOBILE: Horizontal swipe carousel */}
        <div className="sm:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="snap-start shrink-0 w-[82vw] max-w-[300px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <img src={t.imageFile} alt="Investor Testimonial" className="absolute inset-0 w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-[#2563EB] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{t.highlight}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#2563EB] text-[#2563EB] mr-0.5" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed italic flex-1">"{t.quote}"</p>
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <p className="font-bold text-white text-xs">{t.author}</p>
                    <p className="text-[#2563EB] text-[9px] font-bold uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow controls */}
          <div className="flex justify-center gap-3 mt-4">
            <button onClick={() => scroll("left")} className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={() => scroll("right")} className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* DESKTOP: 5-column grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex flex-col hover:border-[#2563EB]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="relative w-full h-56 overflow-hidden bg-slate-800">
                <img
                  src={t.imageFile}
                  alt="Investor Testimonial"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-[#2563EB] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{t.highlight}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#2563EB] text-[#2563EB] mr-0.5" />
                  ))}
                </div>
                <p className="text-slate-300 text-xs font-medium leading-relaxed italic flex-1">"{t.quote}"</p>
                <div className="pt-3 mt-3 border-t border-white/10">
                  <p className="font-bold text-white text-xs">{t.author}</p>
                  <p className="text-[#2563EB] text-[9px] font-bold uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
