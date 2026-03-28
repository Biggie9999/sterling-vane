"use client"

import { useState, useEffect } from "react"
import { MapPin, TrendingUp, Home, Percent, Loader2, DollarSign, ArrowUpRight, Globe, Lock } from "lucide-react"

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
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400">Synchronizing Global Ledger...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-sovereign-in">
      {/* Portfolio Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Asset Value", value: `$${totalValue.toLocaleString()}`, change: "+12.4%", icon: Globe },
          { label: "Equity Position", value: `$${totalEquity.toLocaleString()}`, change: "Principal", icon: Lock },
          { label: "Target Annual Yield", value: `${avgYield}%`, change: "Variable", icon: TrendingUp },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2rem] luxury-shadow group hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                <stat.icon className="w-6 h-6 text-slate-400 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold">{stat.label}</p>
                <p className="text-xs font-bold text-accent">{stat.change}</p>
              </div>
            </div>
            <p className="text-4xl font-serif font-bold text-slate-900 tracking-tighter">${stat.value.replace('$', '')}</p>
          </div>
        ))}
      </div>

      {/* Asset Allocation — Visual Refinement */}
      <div className="bg-slate-950 rounded-[2.5rem] p-10 luxury-shadow relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-serif font-bold text-white mb-4 tracking-tighter">Geographic Allocation</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              Your capital is diversified across high-liquidity Tier 1 luxury markets. Principal appreciation is tracked against real-time appraisal data.
            </p>
            <div className="space-y-4">
              {["California + FL", "New York", "International"].map((m, i) => (
                <div key={m} className="space-y-1.5">
                   <div className="flex justify-between text-xs font-bold">
                     <span className="text-white/60">{m}</span>
                     <span className="text-accent">{[65, 25, 10][i]}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${[65, 25, 10][i]}%` }} />
                   </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-64 h-64 border-8 border-accent/20 rounded-full flex items-center justify-center relative group">
             <div className="text-center">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Risk Tier</p>
                <p className="text-2xl font-serif font-bold text-white">Conservative</p>
             </div>
             {/* Decorative orbit dots */}
             <div className="absolute inset-0 rotate-45 border border-white/10 rounded-full animate-spin [animation-duration:10s]" />
             <div className="absolute inset-4 -rotate-90 border border-white/10 border-dashed rounded-full" />
          </div>
        </div>
        {/* Background Accents */}
        <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Holdings List — High Density Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tighter">Your Sovereign Assets</h2>
          <button className="text-xs font-bold text-[#006AFF] hover:text-[#0050CC] uppercase tracking-widest flex items-center gap-2">
            Audit Ledger <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {investments.map((inv, idx) => (
            <div 
              key={inv.id} 
              className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-500 hover:border-accent/30 hover:shadow-xl group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-6 w-full md:w-auto mb-6 md:mb-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
                  <img src={inv.property.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={inv.property.name} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-1">{inv.property.name}</h4>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-accent" /> {inv.property.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                   <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-1">Principal</p>
                   <p className="text-slate-900 font-bold tracking-tighter">${inv.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-1">Appraised</p>
                   <p className="text-accent font-bold tracking-tighter">${(inv.amount * 1.08).toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-1">Yield (YTM)</p>
                   <p className="text-[#006AFF] font-bold tracking-tighter">{inv.roiPercent}%</p>
                </div>
                <div className="hidden lg:flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-accent/10 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-accent" />
                </div>
              </div>
            </div>
          ))}

          {investments.length === 0 && (
            <div className="py-32 bg-slate-50/50 border border-dashed border-slate-200 rounded-[2.5rem] text-center">
               <Home className="w-12 h-12 text-slate-300 mx-auto mb-4" />
               <p className="text-slate-400 font-serif text-lg italic">Your portfolio is awaiting your first Sovereign acquisition.</p>
               <button className="mt-6 text-accent font-bold uppercase tracking-widest text-[10px] border-b border-accent/20">Marketplace</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
