"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator as CalcIcon, TrendingUp, Info } from "lucide-react"

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
    <div className="bg-brand-light min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm border border-slate-200 mb-6 text-brand-blue">
            <CalcIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Yield Accelerator Model
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Configure your capital commitment to visualize projected 12-month returns against traditional benchmarks. The Sovereign Collection targets a 30%+ net annualized return.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left - Calculator Inputs */}
          <div className="bg-white rounded-2xl p-8 shadow-smooth border border-slate-200">
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-900 mb-3">Capital Commitment</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-accent transition-shadow">
                <span className="px-6 py-4 text-slate-400 font-bold bg-white border-r border-slate-100">$</span>
                <input 
                  type="number" 
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-transparent outline-none font-bold text-xl text-slate-900"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center">
                <Info className="w-3 h-3 mr-1" /> Minimum entry is $50,000 for standard tier.
              </p>
            </div>

            <div className="space-y-6">
               <div className="bg-brand-light border border-slate-200 p-6 rounded-xl flex justify-between items-center group hover:border-brand-blue transition-colors relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent"></div>
                 <div>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Target IRR</p>
                   <p className="text-2xl font-bold text-brand-blue">32%</p>
                 </div>
                 <div className="text-right">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Projected Return</p>
                   <p className="text-2xl font-bold text-slate-900">${(investment * targetYield).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                 </div>
               </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <Link href={`/apply?amount=${investment}`} className="w-full inline-flex justify-center items-center py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                Apply with this Allocation <TrendingUp className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Right - Visualization */}
          <div className="bg-white rounded-2xl p-8 shadow-smooth border border-slate-200 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
              12-Month Performance Comparison
            </h3>

            <div className="space-y-8 flex-1 flex flex-col justify-center pb-8">
              
              {/* Sovereign Bar */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-900 flex items-center">
                    <span className="w-3 h-3 rounded-full bg-brand-accent mr-2"></span>
                    Sovereign Collection (Target)
                  </span>
                  <span className="font-bold text-brand-blue">${svTotal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent rounded-full transition-all duration-1000 relative" style={{ width: '100%' }}>
                  </div>
                </div>
              </div>

              {/* S&P 500 Bar */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-medium text-slate-600 flex items-center">
                    <span className="w-3 h-3 rounded-full bg-slate-300 mr-2"></span>
                    S&P 500 Benchmark
                  </span>
                  <span className="font-medium text-slate-700">${sp500Total.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full transition-all duration-1000" style={{ width: `${(sp500Total / svTotal) * 100}%` }}></div>
                </div>
              </div>

              {/* Trad RE Bar */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-medium text-slate-600 flex items-center">
                    <span className="w-3 h-3 rounded-full bg-slate-200 mr-2"></span>
                    Traditional Real Estate
                  </span>
                  <span className="font-medium text-slate-700">${reTotal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-200 rounded-full transition-all duration-1000" style={{ width: `${(reTotal / svTotal) * 100}%` }}></div>
                </div>
              </div>

            </div>
            
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              * The projections generated by this tool are estimates based on historical performance of similar distressed asset acquisitions and stabilization timelines. Actual returns may vary depending on market conditions, property-specific variables, and holding periods.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
