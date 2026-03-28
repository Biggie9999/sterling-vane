"use client"

import { useState, useEffect } from "react"
import { MapPin, TrendingUp, Home, Percent, Loader2 } from "lucide-react"

export default function PortfolioPage() {
  const [investments, setInvestments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch("/api/user/portfolio")
        const data = await res.json()
        if (Array.isArray(data)) {
          setInvestments(data)
        }
      } catch (err) {
        console.error("Failed to fetch portfolio:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  const totalInvested = investments.reduce((s, inv) => s + inv.amount, 0)
  
  // Calculate value with 10% annual growth
  const totalValue = investments.reduce((s, inv) => {
    const daysHeld = Math.max(0, Math.floor((new Date().getTime() - new Date(inv.startDate).getTime()) / (1000 * 60 * 60 * 24)))
    const appreciation = inv.amount * ((0.10 / 365) * daysHeld)
    return s + inv.amount + appreciation
  }, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#006AFF] mb-2">Active Positions</p>
        <h1 className="font-serif text-3xl text-white mb-1">Your Portfolio</h1>
        <p className="text-warmGrey text-sm">3 units across the Sovereign Collection — Phase 1</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Invested", value: `$${totalInvested.toLocaleString()}` },
          { label: "Current Value", value: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: "Unrealised Gain", value: `+$${(totalValue - totalInvested).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: "Portfolio IRR", value: "24.8%" },
        ].map((s) => (
          <div key={s.label} className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey mb-3">{s.label}</p>
            <p className="font-serif text-2xl text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Unit Cards */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#111] rounded-3xl border border-[#222]">
            <Loader2 className="w-10 h-10 text-[#006AFF] animate-spin mb-4" />
            <p className="text-warmGrey font-medium">Fetching your active positions...</p>
          </div>
        ) : investments.length > 0 ? (
          investments.map((inv) => {
            const daysHeld = Math.max(0, Math.floor((new Date().getTime() - new Date(inv.startDate).getTime()) / (1000 * 60 * 60 * 24)))
            const currentVal = inv.amount + (inv.amount * ((0.10 / 365) * daysHeld))
            
            return (
              <div key={inv.id} className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden hover:border-[#006AFF]/20 transition-colors">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-72 lg:w-80 h-48 md:h-auto relative overflow-hidden shrink-0">
                    <img src={inv.property.images[0]} alt={inv.property.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/60" />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                      inv.property.status === "ACTIVE" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}>
                      {inv.property.status === "ACTIVE" ? "Operating" : "Stabilizing"}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#006AFF] mb-1">{inv.property.type} · {inv.property.city}</p>
                        <h3 className="font-serif text-xl text-white">{inv.property.name}</h3>
                        <p className="text-warmGrey text-xs flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {inv.property.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-warmGrey text-xs mb-0.5">Current Value</p>
                        <p className="text-white font-bold text-xl">${currentVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-emerald-400 text-xs">↑ ${(currentVal - inv.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} gain</p>
                      </div>
                    </div>

                    <p className="text-warmGrey text-xs leading-relaxed mb-5 line-clamp-2">{inv.property.description}</p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                      {[
                        { label: "Occupancy", value: "94%" }, // Mock for now
                        { label: "Nightly Rate", value: `$${inv.property.nightlyRate}` },
                        { label: "Your ROI", value: `${inv.roiPercent}%` },
                        { label: "Invested", value: `$${inv.amount.toLocaleString()}` },
                      ].map((m) => (
                        <div key={m.label}>
                          <p className="text-warmGrey text-[10px] uppercase tracking-widest mb-0.5">{m.label}</p>
                          <p className="text-white font-semibold text-sm">{m.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Yield Bar */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-warmGrey mb-1.5">
                        <span>Current Yield: <span className="text-[#006AFF]">{inv.property.yieldEstimate}%</span></span>
                        <span>Target: 18%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#006AFF] to-[#E8C96A] rounded-full"
                          style={{ width: `${(inv.property.yieldEstimate / 18) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-20 bg-[#111] rounded-3xl border border-[#222]">
            <Home className="w-12 h-12 mx-auto mb-6 text-warmGrey opacity-20" />
            <p className="font-serif text-2xl text-white mb-2">No active positions yet</p>
            <p className="text-warmGrey mb-8 max-w-sm mx-auto">Your institutional-grade property portfolio will appear here once your allocations are confirmed.</p>
            <a href="/marketplace" className="inline-block px-8 py-3 bg-[#006AFF] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#0050CC] transition-colors">
              Browse Marketplace
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
