"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Clock, TrendingUp, DollarSign, Loader2, ArrowUpRight, Calendar, AlertCircle, ShieldCheck, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DistributionsPage() {
  const [distributions, setDistributions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDistributions() {
      try {
        const res = await fetch("/api/user/portfolio")
        const investments = await res.json()
        if (Array.isArray(investments)) {
          const allDist = investments.flatMap(inv => 
            inv.distributions?.map((d: any) => ({
              ...d,
              propertyName: inv.property.name
            })) || []
          )
          setDistributions(allDist)
        }
      } catch (err) {
        console.error("Failed to fetch distributions:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDistributions()
  }, [])

  const paidDist = distributions.filter(d => d.status === "PAID")
  const upcomingDist = distributions.filter(d => d.status === "UPCOMING" || d.status === "PENDING")
  const totalPaid = paidDist.reduce((s, d) => s + d.amount, 0)
  const totalUpcoming = upcomingDist.reduce((s, d) => s + d.amount, 0)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8A8A8A] font-bold">Calculating Performance...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="relative overflow-hidden p-10 sm:p-16 bg-white border border-[#0A0A0A]/5 rounded-[3.5rem] shadow-sm group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]">Dividend Performance</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0A0A0A] mb-6 tracking-tight">Income Distributions</h1>
          <p className="text-[#8A8A8A] text-lg leading-relaxed font-serif italic max-w-2xl">
            "Your capital is optimized for consistent quarterly yield. Realized returns are settled directly to your primary account."
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-[#C9A84C]/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
      </div>

      {/* Summary Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Aggregate Paid", value: `$${totalPaid.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" },
          { label: "Active Projected", value: `$${totalUpcoming.toLocaleString()}`, icon: DollarSign, color: "text-[#0A0A0A]" },
          { label: "Frequency", value: "Quarterly", icon: Clock, color: "text-[#8A8A8A]" },
          { label: "Next Est. Payout", value: upcomingDist.length > 0 ? new Date(upcomingDist[0].date).toLocaleDateString() : "—", icon: Calendar, color: "text-[#C9A84C]" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#0A0A0A]/5 p-8 rounded-[2rem] shadow-sm group hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F5F0E8] border border-[#0A0A0A]/5 flex items-center justify-center group-hover:bg-[#C9A84C] group-hover:text-black transition-all">
                <s.icon className={cn("w-4 h-4", s.color)} />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8A8A8A]">{s.label}</p>
            </div>
            <p className="text-2xl font-serif font-bold text-[#0A0A0A] tracking-tighter">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Ledger Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div>
             <h2 className="text-3xl font-serif font-bold text-[#0A0A0A] tracking-tight mb-8 flex items-center gap-4">
               Upcoming Settlements <span className="text-[11px] font-bold bg-[#F5F0E8] px-3 py-1 rounded-full text-[#C9A84C]">{upcomingDist.length}</span>
             </h2>
             <div className="bg-white border border-[#0A0A0A]/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#0A0A0A]/5 bg-[#FAF9F6]">
                        {["Asset Source", "Est. Date", "Amount", "Status"].map(h => (
                          <th key={h} className="text-left px-10 py-6 font-bold text-[10px] uppercase tracking-widest text-[#8A8A8A]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0A0A0A]/5">
                      {upcomingDist.length > 0 ? (
                        upcomingDist.map((d, i) => (
                          <tr key={i} className="hover:bg-[#FAF9F6] transition-colors group">
                            <td className="px-10 py-8">
                               <p className="text-[#0A0A0A] font-bold text-sm mb-1 group-hover:text-[#C9A84C] transition-colors">{d.propertyName}</p>
                               <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest">{d.type}</p>
                            </td>
                            <td className="px-10 py-8 text-[#8A8A8A] font-bold text-[11px] uppercase tracking-widest">{new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                            <td className="px-10 py-8">
                               <span className="text-[#0A0A0A] font-bold text-lg tracking-tighter">${d.amount.toLocaleString()}</span>
                            </td>
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-2 px-3 py-1 bg-[#F5F0E8] rounded-full w-fit">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                                  <span className="text-[9px] font-bold text-[#0A0A0A] uppercase tracking-widest pt-0.5">In Queue</span>
                               </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-10 py-24 text-center text-[#8A8A8A] italic font-serif text-lg">Your settlement queue is currently empty.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
             </div>
          </div>

          {/* Past History */}
          {paidDist.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0A0A0A] tracking-tight mb-8">Settled History</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paidDist.map((d, i) => (
                  <div key={i} className="bg-[#FAF9F6] border border-[#0A0A0A]/5 p-8 rounded-[2rem] flex items-center justify-between hover:bg-white hover:shadow-xl transition-all duration-500 group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#0A0A0A]/5 flex items-center justify-center text-emerald-500 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[#0A0A0A] font-bold text-sm leading-tight mb-1">{d.propertyName}</p>
                        <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest">{new Date(d.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-emerald-500 font-bold text-lg tracking-tighter">+${d.amount.toLocaleString()}</p>
                       <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest">Settled</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Context */}
        <div className="space-y-8">
          <div className="bg-[#0A0A0A] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A84C]/20 blur-[80px] opacity-20" />
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8 text-[#C9A84C]">
                   <AlertCircle className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Compliance Protocol</span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-6 tracking-tight">Performance Hold</h3>
                <p className="text-white/40 text-[13px] leading-relaxed font-medium mb-10">
                  All distributions are verified against active flagship performance and secondary reserves. Quarterly settlement is finalized 5 business days post-audit.
                </p>
                <button className="w-full py-5 bg-white/5 hover:bg-[#C9A84C] hover:text-[#0A0A0A] border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all">
                  Underwriting Manifest
                </button>
             </div>
          </div>

          <div className="p-10 bg-[#FAF9F6] border border-[#0A0A0A]/5 rounded-[3rem] text-center shadow-sm">
             <div className="w-16 h-16 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center mx-auto mb-8 border border-[#0A0A0A]/5">
                <Globe className="w-7 h-7 text-[#C9A84C]" />
             </div>
             <p className="text-[#0A0A0A] font-bold text-sm mb-2">Settlement Destination</p>
             <p className="text-[10px] text-[#8A8A8A] font-bold uppercase tracking-widest">Chase Private Client •••• 9012</p>
          </div>
        </div>
      </div>
    </div>
  )
}
