"use client"

import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const COMPARISON = [
  { feature: "Primary Focus", sterling: "High-Yield Hospitality", airbnb: "Short-Term Rentals", zillow: "Marketplace Listings" },
  { feature: "Ownership Structure", sterling: "Direct Equity SPV", airbnb: "Platform Participant", zillow: "Self-Managed Equity" },
  { feature: "30% Return (Month 2)", sterling: true, airbnb: false, zillow: false },
  { feature: "90% Return (Month 6)", sterling: true, airbnb: false, zillow: false },
  { feature: "Off-Market Asset Access", sterling: true, airbnb: false, zillow: false },
  { feature: "Concierge Management", sterling: true, airbnb: false, zillow: false },
  { feature: "Quarterly Distributions", sterling: true, airbnb: false, zillow: false },
  { feature: "Institutional SEC Reg D", sterling: true, airbnb: false, zillow: false },
]

const X_ICON = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
)

export function HowItWorks() {
  const steps = [
    {
      title: "1. Asset Activation",
      description: "We identify and acquire off-market luxury assets in primary ZIP codes. These are not standard listings; they are curated high-yield opportunities.",
      image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phase: "Phase 1",
    },
    {
      title: "2. Performance Ramp",
      description: "Within 60 days, we stabilize the asset for global hospitality, delivering our first payout milestone of 30% target yield.",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phase: "Phase 2",
    },
    {
      title: "3. Optimized Yield",
      description: "By Month 6, the asset is fully operational, reaching its 90% peak yield target with quarterly cash distributions automated to your dashboard.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phase: "Phase 3",
    },
  ]

  return (
    <section className="bg-white py-24 sm:py-32 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-4">Market Execution</p>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Built for performance, not just presence.
          </h2>
          <p className="text-slate-600 text-base sm:text-xl font-medium leading-relaxed">
            While others list properties, we engineer them for yield. Our vertical ecosystem handles everything from acquisition to management.
          </p>
        </div>

        {/* ── MOBILE: Horizontal scroll row ── */}
        <div
          className="sm:hidden flex flex-row flex-nowrap gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth mb-14 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step, index) => (
            <div key={index} className="snap-start shrink-0 w-[75vw] max-w-[260px] flex flex-col">
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                <img src={step.image} alt={step.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 text-[#1a1a1a] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{step.phase}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* ── DESKTOP: 3-column grid ── */}
        <div className="hidden sm:grid grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="relative h-[380px] lg:h-[480px] rounded-[3rem] overflow-hidden mb-8 shadow-sm border border-slate-100">
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                   <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70 mb-1">{step.phase}</p>
                   <h3 className="font-serif text-2xl font-bold">{step.title}</h3>
                </div>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* ─── Comparison Table (Revamped) ─── */}
        <div className="max-w-5xl mx-auto mb-16 pt-24 border-t border-slate-100">
          <div className="text-center mb-12">
            <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Institutional Utility</p>
            <h3 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">The Sterling Vane Advantage.</h3>
            <p className="text-slate-600 font-medium max-w-xl mx-auto text-lg">We outperform standard rental and listing models through professional equity positioning.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200">
              <div className="p-4 sm:p-8 col-span-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.4e] text-slate-400">Core Metric</p>
              </div>
              <div className="p-4 sm:p-8 bg-[#0A2540] text-center border-x border-white/5">
                <p className="text-white font-bold text-sm sm:text-lg tracking-tight">Sterling Vane</p>
                <p className="text-[#60a5fa] text-[9px] font-bold uppercase tracking-[0.3em] mt-1">Prime Pick</p>
              </div>
              <div className="p-4 sm:p-8 text-center border-l border-slate-200">
                <p className="text-slate-700 font-bold text-sm sm:text-lg">Airbnb</p>
              </div>
              <div className="p-4 sm:p-8 text-center border-l border-slate-200">
                <p className="text-slate-700 font-bold text-sm sm:text-lg">Zillow</p>
              </div>
            </div>

            {COMPARISON.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                <div className="p-4 sm:p-6 flex items-center">
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">{row.feature}</p>
                </div>
                <div className="p-4 sm:p-6 bg-[#0A2540]/5 border-x border-[#0A2540]/5 flex items-center justify-center">
                  {typeof row.sterling === "boolean" ? (
                    row.sterling ? <Check className="w-6 h-6 text-emerald-500" /> : <X_ICON />
                  ) : (
                    <span className="text-xs sm:text-sm font-bold text-[#006AFF] text-center uppercase tracking-widest">{row.sterling}</span>
                  )}
                </div>
                <div className="p-4 sm:p-6 border-l border-slate-100 flex items-center justify-center">
                  {typeof row.airbnb === "boolean" ? (
                    row.airbnb ? <Check className="w-5 h-5 text-emerald-400" /> : <X_ICON />
                  ) : (
                    <span className="text-xs sm:text-sm text-slate-500 text-center font-medium">{row.airbnb}</span>
                  )}
                </div>
                <div className="p-4 sm:p-6 border-l border-slate-100 flex items-center justify-center">
                  {typeof row.zillow === "boolean" ? (
                    row.zillow ? <Check className="w-5 h-5 text-emerald-400" /> : <X_ICON />
                  ) : (
                    <span className="text-xs sm:text-sm text-slate-500 text-center font-medium">{row.zillow}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-[0.2em]">Comparison reflects structural alpha targets vs retail platform averages.</p>
        </div>

        {/* CTA Footer */}
        <div className="p-10 sm:p-16 bg-[#0F172A] text-white rounded-[4rem] flex flex-col sm:flex-row items-center justify-between gap-10 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <h4 className="font-serif text-3xl sm:text-4xl font-bold mb-4 drop-shadow-sm">Ready to get started?</h4>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-md">Phase 1 collection is now open. Claim your position in primary hospitality yields today.</p>
          </div>
          <Link href="/marketplace" className="shrink-0 group relative inline-flex items-center justify-center px-10 py-6 bg-[#2563EB] text-white rounded-2xl font-bold tracking-[0.2em] text-[11px] uppercase hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-blue-500/20 w-full sm:w-auto overflow-hidden">
             <span className="relative z-10 flex items-center gap-3">Get Started Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
        </div>

      </div>
    </section>
  )
}
