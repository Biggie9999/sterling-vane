"use client"

import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const COMPARISON = [
  { feature: "Minimum Investment", sterling: "$5,000", fundrise: "$10+", realty: "$5,000" },
  { feature: "Guaranteed Yield Milestones", sterling: true, fundrise: false, realty: false },
  { feature: "30% Return at Month 2", sterling: true, fundrise: false, realty: false },
  { feature: "90% Return at Month 6", sterling: true, fundrise: false, realty: false },
  { feature: "Luxury Off-Market Properties", sterling: true, fundrise: false, realty: false },
  { feature: "Quarterly Cash Distributions", sterling: true, fundrise: true, realty: true },
  { feature: "UHNW Short-Term Rental Model", sterling: true, fundrise: false, realty: false },
  { feature: "Dedicated IR & Agent Support", sterling: true, fundrise: false, realty: false },
  { feature: "SEC Reg D Compliant", sterling: true, fundrise: true, realty: true },
]

const X_ICON = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
)

export function HowItWorks() {
  const steps = [
    {
      title: "Acquisition",
      description: "Our institutional team underwrites entirely off-market luxury housing, focusing on tier-1 ZIP codes with extreme short-term rental arbitrage potential.",
      image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phase: "Phase 1",
    },
    {
      title: "Stabilization",
      description: "Targeted capital improvements, concierge-level hospitality onboarding, and global marketing ramp-up — delivering 30% yield by Month 2.",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phase: "Phase 2",
    },
    {
      title: "Distribution",
      description: "Fully operational hospitality yield engine. Investors receive structured distributions aligned to the 30/60/90 milestone schedule.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      phase: "Phase 3",
    },
  ]

  return (
    <section className="bg-white py-20 sm:py-28 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-4">Structural Alpha</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            How we outperform traditional real estate.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            By circumventing long-term leasing inefficiencies and applying institutional hospitality management, we manufacture outsized yields paid directly to your dashboard.
          </p>
        </div>

        {/* ── MOBILE: Horizontal scroll row ── */}
        <div
          className="sm:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth mb-14"
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
              <div className="relative h-[380px] lg:h-[440px] rounded-3xl overflow-hidden mb-6 shadow-sm">
                <div className="absolute inset-0 bg-slate-100" />
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1a1a1a] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{step.phase}</div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#006AFF] text-white text-[10px] font-bold flex items-center justify-center">{index + 1}</span>
                <h3 className="font-serif text-xl font-bold text-slate-900">{step.title}</h3>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* ─── Comparison Table ─── */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Platform Comparison</p>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why investors choose Sterling Vane.</h3>
            <p className="text-slate-600 font-medium max-w-xl mx-auto">Measured head-to-head against market leaders. The numbers speak for themselves.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200">
              <div className="p-4 sm:p-5 col-span-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Feature</p>
              </div>
              <div className="p-4 sm:p-5 bg-[#0A2540] text-center">
                <p className="text-white font-bold text-xs sm:text-sm leading-tight">Sterling Vane</p>
                <p className="text-[#60a5fa] text-[9px] font-bold uppercase tracking-widest mt-1 hidden sm:block">Recommended</p>
              </div>
              <div className="p-4 sm:p-5 text-center border-l border-slate-200">
                <p className="text-slate-700 font-semibold text-xs sm:text-sm">Fundrise</p>
              </div>
              <div className="p-4 sm:p-5 text-center border-l border-slate-200">
                <p className="text-slate-700 font-semibold text-xs sm:text-sm">RealtyMogul</p>
              </div>
            </div>

            {COMPARISON.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                <div className="p-3 sm:p-4 flex items-center">
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">{row.feature}</p>
                </div>
                <div className="p-3 sm:p-4 bg-[#0A2540]/3 border-l-2 border-[#006AFF] flex items-center justify-center">
                  {typeof row.sterling === "boolean" ? (
                    row.sterling ? <Check className="w-5 h-5 text-emerald-500" /> : <X_ICON />
                  ) : (
                    <span className="text-xs sm:text-sm font-bold text-[#006AFF] text-center">{row.sterling}</span>
                  )}
                </div>
                <div className="p-3 sm:p-4 border-l border-slate-100 flex items-center justify-center">
                  {typeof row.fundrise === "boolean" ? (
                    row.fundrise ? <Check className="w-4 h-4 text-emerald-400" /> : <X_ICON />
                  ) : (
                    <span className="text-xs sm:text-sm text-slate-600 text-center">{row.fundrise}</span>
                  )}
                </div>
                <div className="p-3 sm:p-4 border-l border-slate-100 flex items-center justify-center">
                  {typeof row.realty === "boolean" ? (
                    row.realty ? <Check className="w-4 h-4 text-emerald-400" /> : <X_ICON />
                  ) : (
                    <span className="text-xs sm:text-sm text-slate-600 text-center">{row.realty}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-4 font-medium">*Comparison based on publicly available platform data as of Q1 2026.</p>
        </div>

        {/* CTA Footer */}
        <div className="p-8 sm:p-12 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">Ready to secure your allocation?</h4>
            <p className="text-slate-600 font-medium text-sm">Phase 1 assets are actively issuing distributions. Minimum $5,000.</p>
          </div>
          <a href="/marketplace" className="shrink-0 bg-[#006AFF] text-white px-8 py-4 rounded-xl font-bold tracking-widest text-xs uppercase hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 w-full sm:w-auto">
            Enter Data Room <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  )
}
