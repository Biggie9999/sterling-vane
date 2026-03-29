"use client"

import { ShieldCheck, ArrowRight, Globe, Award, Clock } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 text-[#0F172A] selection:bg-[#2563EB]/20 animate-sovereign-in overflow-x-hidden">
      
      {/* ── HERO: Compact & clean on mobile ── */}
      <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EFF6FF] to-[#F8FAFC]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-5 max-w-5xl relative z-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#2563EB] mb-4">Asset Philosophy</p>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif font-bold text-[#0F172A] mb-6 sm:mb-10 tracking-tight leading-[1.05] sm:leading-[0.9]">
            The Sovereign <br />
            <span className="italic text-[#2563EB]">Ethos.</span>
          </h1>
          <div className="mx-auto max-w-2xl border-t border-slate-200 pt-8">
            <p className="text-base sm:text-xl text-slate-500 font-serif italic leading-relaxed">
              "We do not wait for appreciation. We manufacture equity through operational alpha."
            </p>
          </div>
        </div>
      </section>

      {/* ── INTRO: Clean single column on mobile ── */}
      <section className="py-12 sm:py-28">
        <div className="container mx-auto px-5 max-w-6xl">
          
          {/* Mobile: just text. Desktop: split with image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image — hidden on mobile */}
            <div className="hidden lg:block relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
               <img 
                 src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                 alt="Luxury Interior" 
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent">
                  <p className="text-white text-2xl font-serif italic mb-1">"Alpha is built, not found."</p>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em]">Proprietary Execution</p>
               </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                 <p className="text-[10px] font-bold text-[#0F172A] uppercase tracking-[0.4em]">Operational Edge</p>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F172A] leading-tight tracking-tight">
                Redefining the timeline of <span className="text-[#2563EB] italic">wealth.</span>
              </h3>
              <div className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed space-y-4">
                <p>Sterling Vane was founded on a singular premise: the traditional real estate hold cycle is fundamentally inefficient.</p>
                <div className="p-5 sm:p-8 bg-white border border-slate-100 rounded-2xl sm:rounded-3xl shadow-sm">
                   <p className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight leading-relaxed">By targeting distressed luxury assets in primary locations, we eliminate speculative risk. Our vertically integrated team steps in immediately upon acquisition.</p>
                </div>
                <p>What takes a standard developer three years, we compress into ninety days.</p>
              </div>
              
              <div className="pt-6 flex items-center gap-10 border-t border-slate-100">
                 <div>
                    <p className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] mb-1">90 Days</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#2563EB]">Stabilization</p>
                 </div>
                 <div className="w-[1px] h-10 bg-slate-200" />
                 <div>
                    <p className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] mb-1">30%+</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#2563EB]">Target Yield</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACK RECORD: Clean vertical timeline on mobile ── */}
      <section className="bg-white py-16 sm:py-32 border-y border-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-5 max-w-5xl">
          <div className="mb-12 sm:mb-20">
            <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.5em] mb-3">The Manifest</p>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0F172A] tracking-tight leading-tight">
              Execution Integrity.
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
              Tracking our progression from single-asset acquisition to a global hospitality ecosystem.
            </p>
          </div>
          
          {/* Simplified vertical timeline — clean on mobile */}
          <div className="space-y-6 sm:space-y-10">
            {[
              { year: "2019", icon: Award, title: "Initial Acquisition", desc: "First distressed asset acquired in the Hollywood Hills. Stabilized in 45 days, achieving a 42% cash-on-cash return." },
              { year: "2021", icon: Globe, title: "Vertical Integration", desc: "Brought design, construction, and management in-house — compressing timelines by 60% vs. industry averages." },
              { year: "2023", icon: ShieldCheck, title: "Collection Launch", desc: "Formal fund structure launched to accommodate $50M in committed capital from private offices." },
              { year: "Now", icon: Clock, title: "Global Scaling", desc: "Managing an active $120M pipeline across four tier-one coastal markets in North America." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 sm:gap-8 group">
                {/* Left: year marker */}
                <div className="flex flex-col items-center shrink-0 w-16 sm:w-20">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0F172A] flex items-center justify-center shadow-lg group-hover:bg-[#2563EB] transition-colors duration-500 mb-2">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.year}</p>
                  {i < 3 && <div className="w-[1px] h-8 sm:h-12 bg-slate-200 mt-2" />}
                </div>

                {/* Right: content */}
                <div className="flex-1 pb-8 sm:pb-10">
                  <h4 className="text-lg sm:text-2xl font-serif font-bold text-[#0F172A] mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-50/20 blur-[130px] rounded-full" />
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-5 max-w-3xl text-center">
           <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0F172A] mb-6 tracking-tight">
             Claim your position in the <span className="italic text-[#2563EB]">Sovereign legacy.</span>
           </h2>
           <Link href="/marketplace" className="inline-flex items-center gap-3 px-8 py-4 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#2563EB] transition-all shadow-xl group">
             Browse The Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  )
}
