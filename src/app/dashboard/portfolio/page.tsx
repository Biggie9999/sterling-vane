"use client"

import { useState, useEffect } from "react"
import { MapPin, TrendingUp, Home, Percent, Loader2, DollarSign, ArrowUpRight, Globe, ShieldCheck, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  const [investments, setInvestments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch("/api/user/portfolio")
        const data = await res.json()
        if (Array.isArray(data)) setInvestments(data)
      } catch (err) {
        console.error("Failed to fetch portfolio:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  const totalEquity = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalValue = investments.reduce((sum, inv) => sum + inv.amount * (1 + (inv.roiPercent / 100)), 0)
  const avgYield = investments.length > 0 ? (investments.reduce((sum, inv) => sum + inv.roiPercent, 0) / investments.length).toFixed(1) : "0.0"

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
        <div className="w-12 h-12 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Synchronizing Portfolio...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 pb-24 lg:pb-0 animate-sovereign-in">
      {/* Portfolio Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {[
          { label: "Market Valuation", value: `$${totalValue.toLocaleString()}`, change: "+12.4%", icon: Globe, up: true },
          { label: "Capital Allocation", value: `$${totalEquity.toLocaleString()}`, change: "Principal", icon: ShieldCheck, up: null },
          { label: "Portfolio Yield", value: `${avgYield}%`, change: "Targeted", icon: TrendingUp, up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[#2563EB] transition-all shrink-0">
                <stat.icon className="w-4 h-4 text-[#0F172A] group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1.5 truncate">{stat.label}</p>
                <p className={`text-[8px] font-bold uppercase tracking-widest leading-none ${stat.up === true ? "text-emerald-500" : "text-slate-400"}`}>{stat.change}</p>
              </div>
            </div>
            <p className="text-3xl font-mono font-bold text-[#0F172A] tracking-tight tabular-nums truncate">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Market Distribution */}
      <div className="bg-white border border-slate-100 rounded-[3.5rem] p-8 sm:p-16 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 blur-[130px] rounded-full -z-10 group-hover:bg-blue-100/30 transition-colors duration-1000" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          <div className="max-w-xl w-full">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-[1px] bg-[#2563EB]" />
               <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#2563EB]">Capital Distribution</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] mb-4 tracking-tighter leading-tight">Concentration.</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-12 font-medium">
              Your assets are strategically weighted across primary global hubs to capture diverse hospitality peak seasons.
            </p>
            <div className="space-y-8">
              {[
                { label: "North America (Luxury Resi)", value: 65 },
                { label: "European Coastal (Hospitality)", value: 25 },
                { label: "Asia Pacific (Urban Prime)", value: 10 }
              ].map((m) => (
                <div key={m.label} className="group/metric">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                     <span className="text-[#0F172A]">{m.label}</span>
                     <span className="text-[#2563EB] tabular-nums">{m.value}%</span>
                   </div>
                   <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-[#0F172A] group-hover/metric:bg-[#2563EB] rounded-full transition-all duration-[2000ms]" style={{ width: `${m.value}%` }} />
                   </div>
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 w-80 h-80 bg-slate-50 rounded-full flex items-center justify-center relative shadow-inner border border-slate-100 group-hover:scale-105 transition-transform duration-1000">
             <div className="text-center relative z-10 px-8">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3">Strategy</p>
                <p className="text-4xl font-serif font-bold text-[#0F172A] leading-[0.85] tracking-tighter mb-4">Capital <br />Shield</p>
                <div className="h-[2px] w-12 bg-[#2563EB] mx-auto mb-4" />
                <p className="text-[9px] font-bold text-[#2563EB] uppercase tracking-widest">Risk Standardized</p>
             </div>
             <div className="absolute inset-0 border border-dashed border-slate-200 rounded-full animate-spin [animation-duration:60s]" />
             <div className="absolute inset-8 border border-slate-100 rounded-full" />
          </div>
        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-10">
        <div className="flex items-center justify-between px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] tracking-tight">Active Holdings</h2>
          <button className="text-[10px] font-bold text-slate-400 hover:text-[#0F172A] uppercase tracking-[0.3em] flex items-center gap-3 transition-colors group">
            Download Manifest <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {investments.map((inv, idx) => (
            <div 
              key={inv.id} 
              className="bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] p-4 md:p-6 lg:p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 w-full xl:w-auto mb-6 xl:mb-0">
                <div className="w-full sm:w-24 sm:h-24 h-40 rounded-xl md:rounded-[1.5rem] overflow-hidden shrink-0 border border-slate-100 shadow-sm relative">
                  <img src={inv.property.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" alt={inv.property.name} />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl md:text-2xl font-serif font-bold text-[#0F172A] mb-2 tracking-tight line-clamp-2 sm:line-clamp-1">{inv.property.name}</h4>
                  <div className="flex items-center gap-2 opacity-60">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0F172A] truncate pt-0.5">{inv.property.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8 w-full xl:w-auto justify-between border-t xl:border-t-0 xl:border-l border-slate-100 pt-5 xl:pt-0 xl:pl-10">
                <div className="w-[45%] sm:w-auto text-left sm:text-right">
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 opacity-60">Principal</p>
                   <p className="text-[#0F172A] text-lg font-mono font-bold tracking-tighter tabular-nums">${inv.amount.toLocaleString()}</p>
                </div>
                <div className="w-[45%] sm:w-auto text-left sm:text-right">
                   <p className="text-[8px] font-bold text-[#2563EB] uppercase tracking-widest mb-1.5">Growth</p>
                   <p className="text-[#2563EB] text-lg font-mono font-bold tracking-tighter tabular-nums">+${(inv.amount * 0.08).toLocaleString()}</p>
                </div>
                <div className="w-[45%] sm:w-auto text-left sm:text-right">
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 opacity-60">Yield</p>
                   <p className="text-[#0F172A] text-lg font-mono font-bold tracking-tighter tabular-nums">{inv.roiPercent}%</p>
                </div>
                <Link href={`/properties/${inv.property.id}`} className="hidden sm:flex flex-col items-center justify-center h-12 w-12 shrink-0 rounded-xl bg-slate-50 text-slate-400 border border-slate-100 hover:bg-[#0F172A] hover:text-white transition-all shadow-sm group-hover:scale-110 ml-2">
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {investments.length === 0 && (
            <div className="py-40 bg-slate-50 border border-dashed border-slate-200 rounded-[4rem] text-center">
               <div className="w-20 h-20 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-center mx-auto mb-10 shadow-sm">
                  <Home className="w-8 h-8 text-slate-200" />
               </div>
               <p className="text-slate-400 font-serif text-3xl italic mb-10 max-w-lg mx-auto leading-relaxed">Your portfolio is awaiting <br />its first Sovereign acquisition.</p>
               <Link href="/marketplace" className="inline-flex px-14 py-6 bg-[#0F172A] text-white rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-[#2563EB] transition-all shadow-2xl">
                 Explore The Collection
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
