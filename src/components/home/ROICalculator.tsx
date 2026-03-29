"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, ArrowRight, Info } from "lucide-react"
import Link from "next/link"

export function ROICalculator() {
  const [amount, setAmount] = useState(10000)
  const [months, setMonths] = useState(12)

  // Calibrated to the new 12.4% target yield mentioned in the hero
  const projectedROI = (0.124 / 12) * months
  const returns = amount * projectedROI
  const total = amount + returns

  return (
    <div className="bg-white border border-[#0F172A]/5 rounded-[3rem] p-8 sm:p-16 shadow-2xl shadow-[#2563EB]/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/5 blur-[120px] pointer-events-none group-hover:bg-[#2563EB]/10 transition-colors duration-1000" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-8">
            <TrendingUp className="w-4 h-4 text-[#2563EB]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">Performance Projection</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#0F172A] mb-8 leading-[1.05]">
            Invest in <br />
            <span className="text-[#2563EB]">Excellence.</span>
          </h2>
          
          <p className="text-[#64748B] font-sans text-base font-medium leading-relaxed mb-12 max-w-sm">
            Predict your returns across our global portfolio of high-performing residential assets. Benchmarked against a decade of elite hospitality execution.
          </p>

          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-end mb-6">
                <p className="text-[11px] font-bold text-[#0F172A] uppercase tracking-widest">Capital Allocation</p>
                <p className="text-4xl font-serif font-bold text-[#0F172A]">${amount.toLocaleString()}</p>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#0F172A]/5 rounded-full appearance-none cursor-pointer accent-[#2563EB] hover:accent-[#0F172A] transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-6">
                <p className="text-[11px] font-bold text-[#0F172A] uppercase tracking-widest">Time Horizon</p>
                <p className="text-4xl font-serif font-bold text-[#0F172A]">{months} Months</p>
              </div>
              <input
                type="range"
                min="6"
                max="60"
                step="6"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#0F172A]/5 rounded-full appearance-none cursor-pointer accent-[#2563EB] hover:accent-[#0F172A] transition-all"
              />
            </div>
          </div>
        </div>

        <div className="lg:w-[460px]">
          <div className="bg-[#0F172A] text-white rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group/card transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/30 blur-[80px] opacity-20" />
            
            <div className="relative z-10 space-y-10">
              <div>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Target Return Profile</p>
                <div className="flex items-baseline gap-2">
                   <p className="text-[#2563EB] text-7xl font-serif font-bold tracking-tight">{(projectedROI * 100).toFixed(1)}%</p>
                   <p className="text-white/20 text-xl font-serif uppercase tracking-widest italic">Est.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Projected Gains</p>
                  <p className="text-2xl font-serif font-bold text-white">${returns.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Maturity Value</p>
                  <p className="text-2xl font-serif font-bold text-white">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
              </div>

              <Link 
                href="/apply"
                className="w-full py-6 bg-[#2563EB] text-[#0F172A] rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all flex items-center justify-center gap-3 mt-6 shadow-xl"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-start gap-4 mt-6 pt-6 border-t border-white/5">
                <Info className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-widest font-medium">
                  Returns calculated at 12.4% annual target. <br />
                  Past execution is indicative of target only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
