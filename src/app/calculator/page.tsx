"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator as CalcIcon, TrendingUp, Info, ShieldCheck, ArrowRight } from "lucide-react"

export default function CalculatorPage() {
  const [investment, setInvestment] = useState<number>(100000)

  // Yield approximations based on $100k
  const targetYield = 0.32 // 32% Sovereign
  const sp500Yield = 0.10  // 10% S&P
  const realEstateYield = 0.08 // 8% Trad RE

  const svTotal = investment + (investment * targetYield)
  const sp500Total = investment + (investment * sp500Yield)
  const reTotal = investment + (investment * realEstateYield)

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-40 pb-32 selection:bg-[#C9A84C]/20">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl border border-[#0A0A0A]/5 mb-10 text-[#C9A84C]">
            <CalcIcon className="w-8 h-8" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#C9A84C] mb-6">Yield Projections</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#0A0A0A] mb-8 tracking-tighter leading-tight">
            The Performance <br /><span className="italic text-[#C9A84C]">Manifest.</span>
          </h1>
          <p className="text-xl text-[#8A8A8A] font-serif italic leading-relaxed">
            "Visualize your capital allocation against traditional benchmarks. The Sovereign Collection targets a 30%+ net annualized return through distressed asset stabilization."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left - Calculator Inputs */}
          <div className="bg-white rounded-[3rem] p-10 sm:p-14 border border-[#0A0A0A]/5 shadow-sm group">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4 pl-1">
                 <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                 <label className="block text-[10px] font-bold text-[#0A0A0A] uppercase tracking-[0.3em]">Capital Allocation</label>
              </div>
              <div className="relative group/input">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl font-serif font-bold text-[#C9A84C]">$</span>
                <input 
                  type="number" 
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full pl-16 pr-8 py-8 bg-[#FAF9F6] border border-[#0A0A0A]/5 rounded-3xl outline-none font-serif font-bold text-4xl text-[#0A0A0A] focus:border-[#C9A84C]/40 transition-all shadow-inner"
                />
              </div>
              <p className="text-[10px] text-[#8A8A8A] mt-4 flex items-center gap-2 font-bold uppercase tracking-widest pl-1">
                <Info className="w-3.5 h-3.5 text-[#C9A84C]" /> Minimum entry: $50,000
              </p>
            </div>

            <div className="space-y-6">
               <div className="bg-[#FAF9F6] border border-[#0A0A0A]/5 p-8 rounded-[2.5rem] flex justify-between items-center group/card hover:border-[#C9A84C]/20 transition-all duration-500 relative overflow-hidden shadow-sm">
                 <div>
                   <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1 opacity-60">Target Yield</p>
                   <p className="text-3xl font-serif font-bold text-[#C9A84C]">32%</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1 opacity-60">Year 1 Dividend</p>
                   <p className="text-3xl font-serif font-bold text-[#0A0A0A]">${(investment * targetYield).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                 </div>
               </div>
            </div>

            <div className="mt-12 pt-10 border-t border-[#0A0A0A]/5">
              <Link href={`/apply?amount=${investment}`} className="w-full flex justify-center items-center py-6 bg-[#0A0A0A] text-white font-bold rounded-2xl hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-700 shadow-2xl text-[11px] uppercase tracking-[0.4em] group/btn">
                Secure This Allocation <ArrowRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Visualization */}
          <div className="bg-[#FAF9F6] rounded-[3rem] p-10 sm:p-14 border border-[#0A0A0A]/5 shadow-sm flex flex-col justify-center relative overflow-hidden">
            <h3 className="text-xl font-bold text-[#0A0A0A] mb-12 tracking-tight flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#C9A84C] rounded-full" />
              12-Month Performance Index
            </h3>

            <div className="space-y-12 flex-1 flex flex-col justify-center pb-8 relative z-10">
              
              {/* Sovereign Bar */}
              <div className="group/bar">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-[0.2em] flex items-center">
                    Sovereign Collection <span className="text-[#C9A84C] ml-2 font-serif italic lowercase tracking-normal">(Target)</span>
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#C9A84C]">${svTotal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden p-0.5 border border-[#0A0A0A]/5">
                  <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] rounded-full transition-all duration-1000" style={{ width: '100%' }}>
                  </div>
                </div>
              </div>

              {/* S&P 500 Bar */}
              <div className="group/bar">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-[0.2em] flex items-center">
                    S&P 500 Index
                  </span>
                  <span className="text-xl font-serif font-bold text-[#0A0A0A]">${sp500Total.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden p-0.5 border border-[#0A0A0A]/5">
                  <div className="h-full bg-[#8A8A8A]/20 rounded-full transition-all duration-[1200ms]" style={{ width: `${(sp500Total / svTotal) * 100}%` }}></div>
                </div>
              </div>

              {/* Trad RE Bar */}
              <div className="group/bar">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-[0.2em] flex items-center">
                    Traditional Real Estate
                  </span>
                  <span className="text-xl font-serif font-bold text-[#0A0A0A]">${reTotal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>
                <div className="h-3 bg-white rounded-full overflow-hidden p-0.5 border border-[#0A0A0A]/5">
                  <div className="h-full bg-[#8A8A8A]/20 rounded-full transition-all duration-[1500ms]" style={{ width: `${(reTotal / svTotal) * 100}%` }}></div>
                </div>
              </div>

            </div>
            
            <p className="text-[10px] text-[#8A8A8A]/60 text-center leading-relaxed font-medium mt-12">
              * Projections are based on stabilized asset performance within The Sovereign Collection phase 1 inventory. Returns reflect net distributions after management participation.
            </p>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C9A84C]/5 blur-[80px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
