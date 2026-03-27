"use client"

import { useRef } from "react"
import Link from "next/link"
import { MapPin, ArrowRight, TrendingUp, Star } from "lucide-react"

import { DEMO_PROPERTIES } from "@/data/properties"

function PropertyCard({ p }: { p: typeof DEMO_PROPERTIES[0] }) {
  return (
    <div className="group relative flex-shrink-0 w-[85vw] sm:w-[340px] md:w-auto rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-[#E5E5E5] bg-white">
      {/* Image */}
      <div className="relative h-[480px] md:h-[520px] overflow-hidden">
        <img
          src={p.images[0]}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`} />

        {/* Top badges */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <span className="bg-white/95 backdrop-blur-md text-[#1a1a1a] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-md">
            {p.type} Asset
          </span>
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/10">
            <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Funding Stage" ? "bg-emerald-400" : "bg-[#C9A84C]"}`}></span>
            {p.status}
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-2 text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3 h-3" />
            {p.location}
          </div>
          <h3 className="text-white font-serif text-3xl mb-2 leading-tight">{p.name}</h3>
          <p className="text-white/80 text-sm mb-6 leading-relaxed hidden sm:block line-clamp-2">{p.description}</p>

          <div className="flex items-center justify-between border-t border-white/20 pt-5 mt-2">
            <div>
              <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1.5 font-bold">Share Price</p>
              <p className="text-white font-serif text-xl">${p.pricePerShare.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1.5 font-bold">Target Yield</p>
              <p className="text-[#C9A84C] font-semibold text-xl">{p.targetYield}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeaturedCollection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="bg-[#FAF9F6] py-24 overflow-hidden border-t border-[#E5E5E5]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[#C9A84C] font-sans text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
              Phase 1 Offerings
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] leading-tight">
              The Sovereign<br className="hidden sm:block" /> Collection
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-4">
            <p className="text-[#666] text-sm max-w-sm sm:text-right leading-relaxed">
              Our inaugural portfolio features ultra-luxury assets rigorously underwritten to capture outsized short-term rental premiums. Minimum participation starts at $10,000.
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1a1a1a] hover:text-[#C9A84C] transition-colors uppercase tracking-widest"
            >
              Access Data Room <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {DEMO_PROPERTIES.map((p) => (
            <div key={p.id} className="snap-center flex-shrink-0 w-[85vw]">
              <PropertyCard p={p} />
            </div>
          ))}
        </div>
        {/* Scroll hint */}
        <div className="flex justify-center gap-2 mt-4 px-4">
          {DEMO_PROPERTIES.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/20" />
          ))}
        </div>
      </div>

      {/* Desktop: editorial grid */}
      <div className="hidden md:block max-w-7xl mx-auto px-6">
        {/* Row 1: 1 large + 2 medium (or adjust based on 3 items) */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-8">
            <PropertyCard p={DEMO_PROPERTIES[0]} />
          </div>
          <div className="col-span-4 flex flex-col gap-6">
            <div className="flex-1 rounded-3xl bg-[#1a1a1a] p-10 flex flex-col justify-between shadow-xl">
              <div>
                 <p className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#C9A84C] mb-4">Investment Summary</p>
                 <h3 className="font-serif text-3xl text-white mb-4 leading-snug">Structural Alpha in Residential Real Estate</h3>
                 <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                   By circumventing the inefficiencies of traditional long-term leasing, we deliver institutional-grade yield via hospitality management of premium single-family assets.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: "Target IRR", value: "18.5%" },
                  { label: "Target Yield", value: "14.8%" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <p className="text-2xl font-bold text-white mb-2">{s.value}</p>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/marketplace"
                className="mt-8 inline-flex items-center justify-center gap-2 bg-white text-[#1a1a1a] font-bold py-4 px-8 rounded-xl hover:bg-slate-100 transition-colors shadow-md text-sm"
              >
                Explore Offerings <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <PropertyCard p={DEMO_PROPERTIES[1]} />
          </div>
          <div className="col-span-6">
            <PropertyCard p={DEMO_PROPERTIES[2]} />
          </div>
        </div>
      </div>
    </section>
  )
}
