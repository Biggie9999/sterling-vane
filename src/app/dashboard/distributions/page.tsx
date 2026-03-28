"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Clock, TrendingUp, DollarSign, Loader2, ArrowUpRight, Calendar, AlertCircle } from "lucide-react"

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
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400">Calculating Dividend Yields...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-sovereign-in">
      {/* Page Header */}
      <div className="relative overflow-hidden p-10 bg-slate-950 text-white rounded-[2.5rem] luxury-shadow">
        <div className="relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4 font-bold">Capital Velocity</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tighter">Yield Distributions</h1>
          <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-2xl">
            Projected and realized payouts from your luxury holdings. Net distributions are settled quarterly to your registered primary account.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-full bg-accent/10 blur-[80px] rounded-full translate-x-1/2 pointer-events-none" />
      </div>

      {/* Summary Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Aggregate Paid", value: `$${totalPaid.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" },
          { label: "Active Projected", value: `$${totalUpcoming.toLocaleString()}`, icon: DollarSign, color: "text-[#006AFF]" },
          { label: "Settlement Frequency", value: "Quarterly", icon: Clock, color: "text-slate-400" },
          { label: "Next Est. Payout", value: upcomingDist.length > 0 ? new Date(upcomingDist[0].date).toLocaleDateString() : "—", icon: Calendar, color: "text-accent" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl luxury-shadow group hover:border-accent/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                <s.icon className={cn("w-4 h-4", s.color)} />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-bold">{s.label}</p>
            </div>
            <p className="text-2xl font-serif font-bold text-slate-900 tracking-tighter">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Ledger Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
             <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tighter mb-6 flex items-center gap-3">
               Upcoming Settlements <span className="bg-accent/10 text-accent text-[9px] font-mono px-2 py-0.5 rounded-full border border-accent/20 uppercase tracking-widest">{upcomingDist.length}</span>
             </h2>
             <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden luxury-shadow">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                   <thead>
                     <tr className="border-b border-slate-50 bg-[#F8FAFC]">
                       {["Asset Source", "Est. Date", "Amount", "Status"].map(h => (
                         <th key={h} className="text-left px-8 py-5 font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">{h}</th>
                       ))}
                     </tr>
                   </thead>
                   <tbody>
                     {upcomingDist.length > 0 ? (
                       upcomingDist.map((d, i) => (
                         <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-6">
                              <p className="text-slate-900 font-bold tracking-tight">{d.propertyName}</p>
                              <p className="text-[10px] font-mono text-slate-400 font-bold uppercase">{d.type}</p>
                           </td>
                           <td className="px-8 py-6 text-slate-500 font-medium">{new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                           <td className="px-8 py-6">
                              <span className="text-accent font-bold text-lg tracking-tighter">${d.amount.toLocaleString()}</span>
                           </td>
                           <td className="px-8 py-6">
                             <span className="bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/10">In Queue</span>
                           </td>
                         </tr>
                       ))
                     ) : (
                       <tr>
                         <td colSpan={4} className="px-8 py-20 text-center text-slate-400 italic font-serif">Financial queue is currently clear.</td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>

          {/* Past History — Refined */}
          {paidDist.length > 0 && (
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900 tracking-tighter mb-6">Realized History</h2>
              <div className="space-y-4">
                {paidDist.map((d, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl flex items-center justify-between hover:border-emerald-500/20 transition-all duration-300 group shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-5 h-5 shadow-inner" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold leading-tight">{d.propertyName}</p>
                        <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-tighter">{new Date(d.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                       <div>
                          <p className="text-emerald-600 font-bold text-lg tracking-tighter">+${d.amount.toLocaleString()}</p>
                          <p className="text-[9px] font-mono text-slate-400 uppercase font-bold">Settled</p>
                       </div>
                       <ArrowUpRight className="w-4 h-4 text-slate-200 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Context */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] luxury-shadow relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-accent">
                   <AlertCircle className="w-4 h-4" />
                   <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Risk Management</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 tracking-tighter">Performance Escrow</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium mb-8">
                  Distributions are verified against operating cash flow, reserves, and capital maintenance needs. Projections in the Sovereign Collection are based on audited underwriting targets.
                </p>
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">
                  Review Underwriting Memo
                </button>
             </div>
             <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="p-8 border-2 border-slate-50 rounded-[2rem] text-center bg-[#F8FAFC]/50">
             <div className="w-12 h-12 bg-white rounded-2xl luxury-shadow flex items-center justify-center mx-auto mb-6">
                <Globe className="w-6 h-6 text-accent" />
             </div>
             <p className="text-slate-900 font-bold mb-2">Primary Settlement Account</p>
             <p className="text-xs text-slate-400 font-medium">Chase Private Client •••• 9012</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20" />
      <path d="M12 2a14.5 14.5 0 0 1 0 20" />
      <path d="M2 12h20" />
    </svg>
  )
}
