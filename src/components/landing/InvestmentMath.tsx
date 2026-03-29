"use client"

import { PieChart, Landmark, ArrowRight, ShieldCheck, Divide } from "lucide-react"

export function InvestmentMath() {
  return (
    <section className="bg-[#0F172A] py-24 sm:py-32 overflow-hidden relative">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2563EB]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.4em] mb-4">The Sovereign Structure</p>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Institutional math, <br />
            <span className="italic">simplified.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
            We don't deal in complex percentages or hidden fees. Every asset in the Sovereign Collection follows one strictly enforced mathematical model—ensuring perfect transparency from acquisition to yield.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          
          {/* Fixed Unit Price */}
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-[2.5rem] p-10 hover:bg-white/[0.05] transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <span className="font-serif text-8xl font-bold text-white tracking-tighter">1</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/20 flex items-center justify-center mb-8 border border-[#2563EB]/30 group-hover:bg-[#2563EB] group-hover:text-[#0F172A] transition-all text-[#2563EB]">
               <Landmark className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Universal Entry</p>
            <h3 className="text-3xl font-serif font-bold text-white mb-4">1 Unit = $10,000</h3>
            <p className="text-slate-500 font-medium leading-relaxed text-sm">
              The entry price never changes. Every single property on the platform, regardless of market valuation, operates on a strict $10,000 per share fixed cost basis.
            </p>
          </div>

          {/* Dynamic Scarcity */}
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-[2.5rem] p-10 hover:bg-white/[0.05] transition-colors group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <span className="font-serif text-8xl font-bold text-white tracking-tighter">X</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/20 flex items-center justify-center mb-8 border border-[#2563EB]/30 group-hover:bg-[#2563EB] group-hover:text-[#0F172A] transition-all text-[#2563EB]">
               <Divide className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Dynamic Scarcity</p>
            <h3 className="text-3xl font-serif font-bold text-white mb-4">Total supply = Valuation / 10k</h3>
            <p className="text-slate-500 font-medium leading-relaxed text-sm">
              Shares are hard-capped by the exact asset valuation. An $8.5M estate is divided into precisely 850 units. A $12M estate equals 1,200 units. Absolute mathematical scarcity.
            </p>
          </div>

          {/* Capital Distribution */}
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-[2.5rem] p-10 hover:bg-white/[0.05] transition-colors group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <span className="font-serif text-8xl font-bold text-white tracking-tighter">%</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/20 flex items-center justify-center mb-8 border border-[#2563EB]/30 group-hover:bg-[#2563EB] group-hover:text-[#0F172A] transition-all text-[#2563EB]">
               <PieChart className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Pro-Rata Yield</p>
            <h3 className="text-3xl font-serif font-bold text-white mb-4">Direct Revenue Flow</h3>
            <p className="text-slate-500 font-medium leading-relaxed text-sm">
              Own 5 units of an 850-unit estate? You own 0.58% of the asset. You receive exactly 0.58% of the net operating income from our high-frequency hospitality bookings every quarter.
            </p>
          </div>

        </div>

        {/* Visual Example */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-14 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="md:w-1/3 text-center md:text-left">
                <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.4em] mb-2">Formula Example</p>
                <h4 className="text-2xl font-serif font-bold text-white mb-3">Miami Waterfront Estate</h4>
                <p className="text-slate-400 font-medium text-sm">If the fully capitalized value of the asset is exactly $8,500,000.</p>
             </div>
             
             <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                <div className="bg-black/40 rounded-2xl p-6 text-center border border-white/5">
                   <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Step 1: Valuation</p>
                   <p className="text-2xl font-serif font-bold text-white tracking-tight">$8.5M</p>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 text-center border border-white/5">
                   <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Step 2: Divide by $10k</p>
                   <p className="text-2xl font-serif font-bold text-[#2563EB] tracking-tight">÷ $10,000</p>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 text-center border border-[#2563EB]/30 relative">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[1px] bg-[#2563EB] shadow-[0_0_10px_#2563EB]" />
                   <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#60A5FA] mb-2">Step 3: Total Supply</p>
                   <p className="text-2xl font-serif font-bold text-white tracking-tight">850 Units</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  )
}
