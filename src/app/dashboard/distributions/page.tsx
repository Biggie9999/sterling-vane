"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Clock, TrendingUp, DollarSign, Loader2 } from "lucide-react"

export default function DistributionsPage() {
  const [distributions, setDistributions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDistributions() {
      try {
        const res = await fetch("/api/user/portfolio")
        const investments = await res.json()
        if (Array.isArray(investments)) {
          // Flatten all distributions from all investments
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
        <Loader2 className="w-10 h-10 text-[#006AFF] animate-spin mb-4" />
        <p className="text-warmGrey font-medium">Aggregating payout data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-2">Cash Velocity</p>
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-1">Distributions</h1>
        <p className="text-slate-500 text-sm font-medium">Projected quarterly distributions based on PPM target returns. Subject to operational performance.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Projected", value: `$${totalUpcoming.toLocaleString()}`, icon: DollarSign },
          { label: "Total Paid", value: `$${totalPaid.toLocaleString()}`, icon: TrendingUp },
          { label: "Distribution Frequency", value: "Quarterly", icon: Clock },
          { label: "Next Est. Payout", value: upcomingDist.length > 0 ? new Date(upcomingDist[0].date).toLocaleDateString() : "—", icon: CheckCircle2 },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <s.icon className="w-4 h-4 text-[#006AFF]" />
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
            </div>
            <p className="font-serif text-2xl font-bold text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming table */}
      <div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">Upcoming Distributions</p>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Asset", "Date", "Amount", "Type", "Status"].map(h => (
                    <th key={h} className="text-left px-5 py-4 font-bold text-[10px] uppercase tracking-widest text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {upcomingDist.length > 0 ? (
                  upcomingDist.map((d, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 text-slate-900 font-semibold">{d.propertyName}</td>
                      <td className="px-5 py-4 text-slate-600">{new Date(d.date).toLocaleDateString()}</td>
                      <td className="px-5 py-4 text-[#006AFF] font-bold">${d.amount.toLocaleString()}</td>
                      <td className="px-5 py-4 text-slate-500 text-xs uppercase tracking-tighter">{d.type}</td>
                      <td className="px-5 py-4">
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{d.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-slate-400 italic">No upcoming distributions scheduled.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 leading-relaxed">
        <strong>Disclosure:</strong> Distribution projections are based on internal underwriting assumptions as stated in the Private Placement Memorandum. Past performance does not guarantee future results. Distributions are subject to operating cash flow, reserves, and capital needs.
      </div>

      {/* Payment History */}
      {paidDist.length > 0 ? (
        <div>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">Payment History</p>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <tbody>
                {paidDist.map((d, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-slate-900 font-semibold">{d.propertyName}</td>
                    <td className="px-5 py-4 text-slate-600">{new Date(d.date).toLocaleDateString()}</td>
                    <td className="px-5 py-4 text-[#006AFF] font-bold">${d.amount.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400 text-sm">No payment history available yet.</p>
        </div>
      )}
    </div>
  )
}
