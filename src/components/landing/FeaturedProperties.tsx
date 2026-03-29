"use client"

import Image from "next/image"
import { GhostButton } from "@/components/shared/GhostButton"
import { ArrowRight, MapPin } from "lucide-react"
import { DEMO_PROPERTIES } from "@/data/properties"
import { useRef } from "react"

export function FeaturedProperties() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-24 bg-[#F1F5F9]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] max-w-2xl">
            The Collection.
          </h2>
          <GhostButton href="/marketplace" className="hidden md:inline-flex mt-6 md:mt-0 text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#1a1a1a] hover:text-white" light={false}>
            View Marketplace <ArrowRight className="w-4 h-4 ml-2" />
          </GhostButton>
        </div>

        {/* MOBILE: Swipeable horizontal carousel */}
        <div
          ref={scrollRef}
          className="md:hidden flex flex-row flex-nowrap gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DEMO_PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              className="snap-start shrink-0 w-[80vw] max-w-[320px] group relative bg-white border border-[#E5E5E5] overflow-hidden rounded-2xl shadow-sm"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                <div className="absolute top-3 left-3 z-20 font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full shadow-md text-[#1a1a1a]">
                  <span className={`w-1.5 h-1.5 rounded-full ${prop.status === "Funding Stage" ? "bg-emerald-500" : prop.status === "Coming Soon" ? "bg-[#006AFF]" : "bg-slate-400"}`}></span>
                  {prop.status}
                </div>
                <Image src={prop.images[0]} alt={prop.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#006AFF] uppercase mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{prop.location}
                </p>
                <h3 className="font-serif text-lg text-[#1a1a1a] mb-4 leading-snug">{prop.name}</h3>
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div>
                    <p className="font-sans text-[10px] text-[#888] font-bold uppercase tracking-widest mb-1">Share Price</p>
                    <p className="font-serif text-[#1a1a1a] text-base font-medium">${prop.pricePerShare.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-[10px] text-[#888] font-bold uppercase tracking-widest mb-1">Peak Yield</p>
                    <p className="font-sans text-[#006AFF] text-base font-semibold">{prop.yieldMilestone6}% / 6mo</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe indicator dots — mobile only */}
        <div className="md:hidden flex justify-center gap-1.5 mt-4 mb-8">
          {DEMO_PROPERTIES.map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-[#006AFF]" : "bg-slate-300"}`} />
          ))}
        </div>

        {/* DESKTOP: 3-column grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {DEMO_PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              className="group relative bg-white border border-[#E5E5E5] overflow-hidden hover:-translate-y-2 transition-all duration-500 rounded-2xl shadow-sm"
            >
              <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20 font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full shadow-md text-[#1a1a1a]">
                  <span className={`w-1.5 h-1.5 rounded-full ${prop.status === "Funding Stage" ? "bg-emerald-500" : prop.status === "Coming Soon" ? "bg-[#006AFF]" : "bg-slate-400"}`}></span>
                  {prop.status}
                </div>
                <Image
                  src={prop.images[0]}
                  alt={prop.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-8 relative z-20">
                <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#006AFF] uppercase mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{prop.location}
                </p>
                <p className="font-sans text-[9px] text-slate-400 mb-3 tracking-wide">{prop.neighborhood}</p>
                <h3 className="font-serif text-2xl text-[#1a1a1a] mb-6 min-h-[64px]">
                  {prop.name}
                </h3>

                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <div>
                    <p className="font-sans text-xs text-[#888] font-bold uppercase tracking-widest mb-1.5">Share Price</p>
                    <p className="font-serif text-[#1a1a1a] text-xl font-medium">${prop.pricePerShare.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-xs text-[#888] font-bold uppercase tracking-widest mb-1.5">Peak Yield</p>
                    <p className="font-sans text-[#006AFF] text-xl font-semibold">{prop.yieldMilestone6}% / 6mo</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#006AFF]/20 pointer-events-none transition-colors duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>

        <div className="text-center md:hidden mt-2">
          <GhostButton href="/marketplace" className="w-full justify-center text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#1a1a1a] hover:text-white" light={false}>
            View Marketplace <ArrowRight className="w-4 h-4 ml-2" />
          </GhostButton>
        </div>
      </div>
    </section>
  )
}
