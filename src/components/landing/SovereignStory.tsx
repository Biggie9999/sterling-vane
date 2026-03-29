"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function SovereignStory() {
  return (
    <section className="bg-[#F8FAFC] py-16 sm:py-28 border-t border-slate-100 overflow-hidden">
      <div className="container mx-auto px-5 max-w-6xl">

        {/* ── THE THESIS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 sm:mb-28">
          <div className="relative">
             <p className="text-[#006AFF] font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Investment Thesis</p>
             <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-6 leading-tight tracking-tight">
               Beyond standard{" "}
               <span className="italic text-[#006AFF]">real estate.</span>
             </h2>
             <div className="text-slate-600 font-medium space-y-3">
               <p className="text-[#1a1a1a] text-base sm:text-lg font-bold leading-snug">Sterling Vane moves beyond passive appreciation.</p>
               <p className="text-sm sm:text-base leading-relaxed">We acquire ultra-luxury residential assets and operate them as high-frequency hospitality engines — capturing the premium between cap rates and luxury short-term yields.</p>
             </div>
          </div>
          {/* Image — hidden on mobile to save space */}
          <div className="hidden lg:block relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20">
             <img 
               src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
               alt="Luxury Estate" 
               className="absolute inset-0 w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
             <div className="absolute bottom-10 left-10 right-10 p-6 glass-dark rounded-[2rem] border border-white/10">
                <p className="text-white font-serif text-xl font-bold mb-1">High-Frequency Yield</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Global Asset Optimization</p>
             </div>
          </div>
        </div>

        {/* ── YIELD MILESTONES — Compact horizontal on mobile ── */}
        <div className="bg-[#0F172A] rounded-2xl sm:rounded-[3rem] p-6 sm:p-14 text-white relative overflow-hidden mb-16 sm:mb-28 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2563EB]/10 blur-[120px] rounded-full" />
          
          <div className="relative z-10">
            {/* Header row */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-3xl font-serif font-bold mb-2">The 6-Month Performance Cycle</h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
                Structured milestones that deliver yield acceleration from entry to peak.
              </p>
            </div>
            
            {/* Milestone cards — always in a row, 3 columns */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {[
                { m: "Month 2", y: "30%", desc: "Stabilization", border: "border-blue-500/20" },
                { m: "Month 4", y: "60%", desc: "Velocity", border: "border-white/10" },
                { m: "Month 6", y: "90%", desc: "Peak Yield", border: "border-emerald-500/30", highlight: true },
              ].map((item, i) => (
                <div key={i} className={`p-4 sm:p-8 rounded-xl sm:rounded-[2rem] bg-white/[0.04] border ${item.border} relative overflow-hidden group hover:bg-white/[0.08] transition-colors`}>
                  {item.highlight && <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 sm:mb-4">{item.m}</p>
                  <p className={`text-2xl sm:text-5xl font-bold mb-1 sm:mb-2 ${item.highlight ? "text-emerald-400" : "text-white"}`}>{item.y}</p>
                  <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[#2563EB]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── THE FOUNDER ── */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-10 sm:gap-16 lg:gap-32 items-center">
          {/* On mobile: text first, image below */}
          <div className="order-1 sm:order-2">
            <p className="text-[#006AFF] font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Institutional Track Record</p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#1a1a1a] mb-6 leading-tight">
              A legacy of <span className="italic">precision.</span>
            </h2>
            <div className="space-y-4 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              <p>Our execution is underwritten by decades of experience in private equity and luxury hospitality management.</p>
              <p>Returns are manufactured through operational alpha — not market speculation.</p>
              <div className="pt-6 border-t border-slate-200">
                 <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F172A] hover:text-[#2563EB] transition-colors">
                   View Track Record <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </div>
          </div>
          <div className="order-2 sm:order-1 relative w-full">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 max-h-[340px] sm:max-h-none">
               <img 
                 src="/founder.jpg" 
                 alt="Sterling Vane — Founder" 
                 className="absolute inset-0 w-full h-full object-cover object-top"
                 onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }}
               />
               <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <p className="text-white font-serif text-xl sm:text-3xl font-bold mb-1">Sterling Vane</p>
                  <p className="text-[#60A5FA] text-[9px] font-bold uppercase tracking-[0.4em]">Founder & CEO</p>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
