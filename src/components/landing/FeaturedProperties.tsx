"use client"

import Image from "next/image"
import { ArrowRight, MapPin, TrendingUp, ShieldCheck } from "lucide-react"
import { DEMO_PROPERTIES } from "@/data/properties"
import { useRef } from "react"
import Link from "next/link"

export function FeaturedProperties() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F1F5F9] rounded-full -mr-96 -mt-96 -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 sm:mb-24">
          <div className="max-w-2xl">
            <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Prime Collection</p>
            <h2 className="font-serif text-5xl sm:text-7xl text-[#0F172A] leading-[0.9] tracking-tighter">
              Bespoke <br />Asset Access.
            </h2>
          </div>
          <Link 
            href="/marketplace" 
            className="hidden md:inline-flex items-center gap-3 px-10 py-5 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#2563EB] shadow-2xl transition-all group"
          >
            Browse Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── MOBILE: Horizontal Swipe ── */}
        <div
          ref={scrollRef}
          className="md:hidden flex flex-row flex-nowrap gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {DEMO_PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              className="snap-start shrink-0 w-[85vw] max-w-[340px] group relative bg-white border border-slate-100 overflow-hidden rounded-[2.5rem] shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20 font-bold uppercase tracking-[0.3em] text-[9px] px-4 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-lg text-[#0F172A] flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${prop.status === "Funding Stage" ? "bg-emerald-500" : "bg-blue-500"}`}></span>
                  {prop.status}
                </div>
                <img src={prop.images[0]} alt={prop.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <p className="font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 opacity-80 mb-1">
                    <MapPin className="w-3 h-3" /> {prop.location}
                  </p>
                  <h3 className="font-serif text-xl font-bold">{prop.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Milestone Target</p>
                    <p className="text-lg font-bold text-[#0F172A]">{prop.yieldMilestone2}% Yield</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Status</p>
                    <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest pt-1">Stabilizing</p>
                  </div>
                </div>
                <Link href={`/apply?propertyId=${prop.id}`} className="w-full flex items-center justify-center py-4 bg-[#F8FAFC] border border-slate-200 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-[#0F172A] hover:text-white transition-all">
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP: Grid ── */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
          {DEMO_PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              className="group relative bg-[#F8FAFC] border border-slate-100 overflow-hidden hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[3rem]"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
                <div className="absolute top-6 left-6 z-20 font-bold uppercase tracking-[0.3em] text-[10px] px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-xl text-[#0F172A] flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${prop.status === "Funding Stage" ? "bg-emerald-500" : "bg-blue-500"}`}></span>
                  {prop.status}
                </div>
                <img
                  src={prop.images[0]}
                  alt={prop.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                   <p className="font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 opacity-80 mb-2">
                    <MapPin className="w-4 h-4 text-[#60A5FA]" /> {prop.location}
                  </p>
                  <h3 className="font-serif text-3xl font-bold tracking-tight">
                    {prop.name}
                  </h3>
                </div>
              </div>

              <div className="p-10 relative z-20">
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-2">
                  {prop.description}
                </p>

                <div className="flex justify-between items-center pt-8 border-t border-slate-200/60">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mb-1.5">Launch Yield</p>
                    <p className="text-2xl font-bold text-[#0F172A] tracking-tighter">{prop.yieldMilestone2}% / 60D</p>
                  </div>
                  <Link 
                    href={`/apply?propertyId=${prop.id}`}
                    className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-[#0F172A] hover:text-white transition-all group/btn shadow-sm hover:shadow-xl"
                  >
                    <ArrowRight className="w-5 h-5 group-hover/btn:rotate-[-45deg] transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View Marketplace CTA */}
        <div className="mt-12 md:hidden">
          <Link href="/marketplace" className="w-full flex items-center justify-center py-5 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl">
             Browse Entire Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
