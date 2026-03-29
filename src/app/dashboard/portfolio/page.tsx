"use client"

import { useState, useEffect } from "react"
import { MapPin, TrendingUp, Home, Percent, Loader2, DollarSign, ArrowUpRight, Globe, ShieldCheck } from "lucide-react"
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
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#64748B] font-bold">Portfolio Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Portfolio Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Market Valuation", value: `$${totalValue.toLocaleString()}`, change: "+12.4%", icon: Globe },
          { label: "Capital Allocation", value: `$${totalEquity.toLocaleString()}`, change: "Principal", icon: ShieldCheck },
          { label: "Target Yield", value: `${avgYield}%`, change: "Variable", icon: TrendingUp },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-[#0F172A]/5 p-8 rounded-[3rem] shadow-sm group hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] border border-[#0F172A]/5 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-black transition-all">
                <stat.icon className="w-6 h-6 text-[#2563EB] group-hover:text-black" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#64748B] leading-none mb-1.5">{stat.label}</p>
                <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest">{stat.change}</p>
              </div>
            </div>
            <p className="text-4xl font-serif font-bold text-[#0F172A] tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Market Distribution */}
      <div className="bg-white border border-[#0F172A]/5 rounded-[3.5rem] p-10 sm:p-16 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/5 blur-[120px] rounded-full -z-10" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-md">
            <h2 className="text-4xl font-serif font-bold text-[#0F172A] mb-4 tracking-tight">Market Concentration</h2>
            <p className="text-[#64748B] text-base leading-relaxed mb-10 font-medium">
              Your Capital is diversified across high-liquidity global hospitality hubs. Returns are optimized via direct asset performance.
            </p>
            <div className="space-y-6">
              {[
                { label: "North America", value: 65 },
                { label: "Europe", value: 25 },
                { label: "Asia Pacific", value: 10 }
              ].map((m) => (
                <div key={m.label} className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                     <span className="text-[#0F172A]">{m.label}</span>
                     <span className="text-[#2563EB]">{m.value}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-[#0F172A]/5 rounded-full overflow-hidden">
                     <div className="h-full bg-[#2563EB] rounded-full transition-all duration-1000" style={{ width: `${m.value}%` }} />
                   </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-72 h-72 bg-[#F1F5F9] rounded-full flex items-center justify-center relative shadow-inner ring-1 ring-[#0F172A]/5 transition-transform duration-1000 group-hover:rotate-12">
             <div className="text-center relative z-10 px-6">
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] mb-2 leading-none pt-0.5">Profile</p>
                <p className="text-3xl font-serif font-bold text-[#0F172A] leading-tight mb-2">Preservation Focus</p>
                <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest">Risk Adjusted</p>
             </div>
             <div className="absolute inset-0 border-[1.5px] border-dashed border-[#2563EB]/30 rounded-full animate-spin [animation-duration:30s]" />
             <div className="absolute inset-8 border border-[#0F172A]/5 rounded-full" />
          </div>
        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-3xl font-serif font-bold text-[#0F172A] tracking-tight">Active Collection</h2>
          <button className="text-[10px] font-bold text-[#64748B] hover:text-[#0F172A] uppercase tracking-[0.3em] flex items-center gap-3 transition-colors">
            Performance Manifest <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {investments.map((inv, idx) => (
            <div 
              key={inv.id} 
              className="bg-white border border-[#0F172A]/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-8 w-full md:w-auto mb-8 md:mb-0">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 border border-[#0F172A]/5 shadow-sm">
                  <img src={inv.property.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={inv.property.name} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#0F172A] mb-2">{inv.property.name}</h4>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#F1F5F9] rounded-full w-fit">
                    <MapPin className="w-3 h-3 text-[#2563EB]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#0F172A] pt-0.5">{inv.property.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12 sm:gap-16 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-[#0F172A]/5 pt-8 md:pt-0 md:pl-16">
                <div className="text-right">
                   <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1.5 opacity-60">Principal</p>
                   <p className="text-[#0F172A] text-base font-bold tracking-tight">${inv.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1.5 opacity-60">Value</p>
                   <p className="text-[#2563EB] text-base font-bold tracking-tight">${(inv.amount * 1.08).toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1.5 opacity-60">Yield</p>
                   <p className="text-[#0F172A] text-base font-bold tracking-tight">{inv.roiPercent}%</p>
                </div>
                <Link href={`/properties/${inv.property.id}`} className="hidden lg:flex flex-col items-center justify-center h-12 w-12 rounded-2xl bg-[#0F172A] text-white hover:bg-[#2563EB] hover:text-[#0F172A] transition-all shadow-xl group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {investments.length === 0 && (
            <div className="py-32 bg-[#F8FAFC] border border-dashed border-[#0F172A]/10 rounded-[3.5rem] text-center">
               <Home className="w-12 h-12 text-[#2563EB]/30 mx-auto mb-6" />
               <p className="text-[#64748B] font-serif text-2xl italic mb-8 max-w-md mx-auto leading-relaxed">Your portfolio is awaiting your first Sovereign acquisition.</p>
               <Link href="/marketplace" className="inline-flex px-12 py-5 bg-[#0F172A] text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#2563EB] hover:text-[#0F172A] transition-all shadow-2xl">
                 Browse Marketplace
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
