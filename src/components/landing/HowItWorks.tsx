"use client"

import { LineChart, Lock, Users, ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      title: "1. Vetted Luxury Acquisitions",
      description: "Our institutional team underwrites entirely off-market luxury housing, focusing on tier-1 ZIP codes with extreme short-term rental arbitrage potential.",
      image: "https://images.unsplash.com/photo-1600607687931-570d510fffc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Lock className="w-5 h-5 text-[#006AFF]" />
    },
    {
      title: "2. The 30/60/90 Yield Curve",
      description: "Instead of volatile equity, our assets are structured to provide guaranteed yields via our flagship performance milestones (30% at month 2, 60% at month 4).",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <LineChart className="w-5 h-5 text-[#006AFF]" />
    },
    {
      title: "3. Fractionally Owned, Fully Managed",
      description: "You purchase digital shares starting at $10k. We handle global concierge marketing, UHNW tenant screening, and property maintenance.",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Users className="w-5 h-5 text-[#006AFF]" />
    }
  ]

  return (
    <section className="bg-white py-24 sm:py-32 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-20 text-center sm:text-left mx-auto sm:mx-0">
          <p className="text-[#006AFF] font-bold text-xs uppercase tracking-widest mb-4">Structural Alpha</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-bold mb-6 leading-tight">
            How we outperform traditional real estate.
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed">
            By circumventing long-term leasing inefficiencies and applying institutional hospitality management, we manufacture outsized yields and pay them directly into your dashboard.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col group">
              <div className="relative h-[400px] lg:h-[480px] rounded-3xl overflow-hidden mb-8 shadow-sm">
                <div className="absolute inset-0 bg-slate-100 animate-pulse" /> {/* Placeholder while loading */}
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg pointer-events-none">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed flex-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-20 p-8 sm:p-12 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          <div>
            <h4 className="font-serif text-2xl font-bold text-slate-900 mb-2">Ready to secure your allocation?</h4>
            <p className="text-slate-600 font-medium">Phase 1 stabilized assets are actively issuing distributions.</p>
          </div>
          <a href="/marketplace" className="shrink-0 bg-[#006AFF] text-white px-8 py-4 rounded-xl font-bold tracking-widest text-xs uppercase hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center w-full sm:w-auto">
            Enter Data Room <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

      </div>
    </section>
  )
}
