"use client"

import { CheckCircle2, Clock, TrendingUp, DollarSign } from "lucide-react"

const DISTRIBUTIONS = [
  { period: "Q1 2026", date: "Mar 31, 2026", amount: "$4,350", yield: "8.7%", status: "Projected", note: "Subject to operating cash flow" },
  { period: "Q2 2026", date: "Jun 30, 2026", amount: "$5,800", yield: "11.6%", status: "Projected", note: "Includes Palm Royale full cycle" },
  { period: "Q3 2026", date: "Sep 30, 2026", amount: "$7,200", yield: "14.4%", status: "Projected", note: "Peak season lift — all 3 markets" },
  { period: "Q4 2026", date: "Dec 31, 2026", amount: "$9,100", yield: "18.2%", status: "Projected", note: "Holiday premium pricing applied" },
]

const HISTORY = [
  { period: "Inception Bonus", date: "Jan 15, 2026", amount: "$500", yield: "1.0%", status: "Paid" },
]

export default function DistributionsPage() {
  const totalProjected = DISTRIBUTIONS.reduce((s, d) => s + parseFloat(d.amount.replace("$", "").replace(",", "")), 0)

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#006AFF] mb-2">Cash Velocity</p>
        <h1 className="font-serif text-3xl text-white mb-1">Distributions</h1>
        <p className="text-warmGrey text-sm">Projected quarterly distributions based on PPM target returns. Subject to operational performance.</p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Projected (2026)", value: `$${totalProjected.toLocaleString()}`, icon: DollarSign },
          { label: "Projected Annual Yield", value: "52.9%", icon: TrendingUp },
          { label: "Distribution Frequency", value: "Quarterly", icon: Clock },
          { label: "Next Payment", value: "Mar 31, 2026", icon: CheckCircle2 },
        ].map((s) => (
          <div key={s.label} className="bg-[#111] border border-[#222] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <s.icon className="w-4 h-4 text-[#006AFF]" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey">{s.label}</p>
            </div>
            <p className="font-serif text-xl text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-400 leading-relaxed">
        <strong>Disclosure:</strong> Distribution projections are based on internal underwriting assumptions as stated in the Private Placement Memorandum. Past performance does not guarantee future results. Distributions are subject to operating cash flow, reserves, and capital needs. For verified targets, refer to Section 7 of the PPM.
      </div>

      {/* Upcoming */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey mb-3">Upcoming Distributions</p>
        <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222]">
                {["Period", "Pay Date", "Amount", "Yield", "Status", "Note"].map((h) => (
                  <th key={h} className="text-left px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-warmGrey/60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DISTRIBUTIONS.map((d, i) => (
                <tr key={i} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 text-white font-medium">{d.period}</td>
                  <td className="px-5 py-4 text-warmGrey">{d.date}</td>
                  <td className="px-5 py-4 text-[#006AFF] font-bold">{d.amount}</td>
                  <td className="px-5 py-4 text-emerald-400">{d.yield}</td>
                  <td className="px-5 py-4">
                    <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border border-amber-500/20">{d.status}</span>
                  </td>
                  <td className="px-5 py-4 text-warmGrey/60 text-xs hidden lg:table-cell">{d.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      {HISTORY.length > 0 && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey mb-3">Payment History</p>
          <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {HISTORY.map((d, i) => (
                  <tr key={i} className="border-b border-[#1a1a1a]">
                    <td className="px-5 py-4 text-white font-medium">{d.period}</td>
                    <td className="px-5 py-4 text-warmGrey">{d.date}</td>
                    <td className="px-5 py-4 text-[#006AFF] font-bold">{d.amount}</td>
                    <td className="px-5 py-4 text-emerald-400">{d.yield}</td>
                    <td className="px-5 py-4">
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border border-emerald-500/20">{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
