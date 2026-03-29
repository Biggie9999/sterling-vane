"use client"

import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SovereignStory() {
  return (
    <section className="bg-[#F8FAFC] py-24 sm:py-32 border-t border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── THE THESIS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <div className="relative">
             <p className="text-[#006AFF] font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Investment Thesis</p>
             <h2 className="text-5xl sm:text-7xl font-serif text-[#1a1a1a] mb-10 leading-[0.9] tracking-tighter">
               Beyond standard <br />
               <span className="italic text-[#006AFF]">real estate.</span>
             </h2>
             <div className="prose prose-xl text-slate-600 leading-relaxed font-medium">
               <p className="text-[#1a1a1a] text-2xl mb-6 font-bold leading-tight">Sterling Vane moves beyond passive appreciation.</p>
               <p>We acquire ultra-luxury residential assets and operate them as high-frequency hospitality engines. This strategy captures the premium between residential cap rates and luxury short-term rental yields.</p>
             </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border border-white/20">
             <img 
               src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
               alt="Luxury Estate" 
               className="absolute inset-0 w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
             <div className="absolute bottom-10 left-10 right-10 p-8 glass-dark rounded-[2.5rem] border border-white/10">
                <p className="text-white font-serif text-2xl font-bold mb-2">High-Frequency Yield</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Global Asset Optimization</p>
             </div>
          </div>
        </div>

        {/* ── YIELD MILESTONES (Clean Grid) ── */}
        <div className="bg-[#0F172A] rounded-[4rem] p-10 sm:p-20 text-white relative overflow-hidden mb-32 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2563EB]/10 blur-[120px] rounded-full" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 relative z-10">
            <div className="max-w-md">
              <h3 className="text-3xl sm:text-4xl font-serif font-bold mb-6">The 6-Month <br />Performance Cycle.</h3>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">
                Our structured milestones deliver yield acceleration by standardizing the stabilization of luxury assets.
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {[
                { m: "Month 2", y: "30%", desc: "Early Stabilization", border: "border-blue-500/30" },
                { m: "Month 4", y: "60%", desc: "Velocity Ramp", border: "border-white/10" },
                { m: "Month 6", y: "90%", desc: "Peak Yield", border: "border-emerald-500/30", highlight: true },
              ].map((item, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] bg-white/5 border ${item.border} backdrop-blur-sm relative overflow-hidden group hover:bg-white/10 transition-colors`}>
                  {item.highlight && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">{item.m}</p>
                  <p className={`text-5xl font-bold mb-2 ${item.highlight ? "text-emerald-400" : "text-white"}`}>{item.y}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#2563EB]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── THE FOUNDER (Editorial) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-[#2563EB]/5 rounded-[4rem] scale-95 group-hover:scale-100 transition-transform duration-700 -z-10" />
            <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-xl border border-slate-100">
               <img 
                 src="/founder.jpg" 
                 alt="Sterling Vane — Founder" 
                 className="absolute inset-0 w-full h-full object-cover object-top"
                 onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }}
               />
               <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <p className="text-white font-serif text-3xl font-bold mb-1">Sterling Vane</p>
                  <p className="text-[#60A5FA] text-[10px] font-bold uppercase tracking-[0.4em]">Founder & CEO</p>
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[#006AFF] font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Institutional Track Record</p>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#1a1a1a] mb-10 leading-tight">
              A legacy of <br /><span className="italic">precision.</span>
            </h2>
            <div className="space-y-8 text-slate-600 font-medium text-lg leading-relaxed">
              <p>Our execution is underwritten by decades of experience in private equity and luxury hospitality management across global primary hubs.</p>
              <p>We do not rely on market speculation. Our returns are manufactured through operational alpha—turning luxury real estate into a standalone high-performance enterprise.</p>
              <div className="pt-8 border-t border-slate-200">
                 <Link href="/login" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F172A] hover:text-[#2563EB] transition-colors">
                   View Portfolio Track Record <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
