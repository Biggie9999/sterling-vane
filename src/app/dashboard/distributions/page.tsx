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
        <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-2">Cash Velocity</p>
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-1">Distributions</h1>
        <p className="text-slate-500 text-sm font-medium">Projected quarterly distributions based on PPM target returns. Subject to operational performance.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Projected (2026)", value: `$${totalProjected.toLocaleString()}`, icon: DollarSign },
          { label: "Projected Annual Yield", value: "52.9%", icon: TrendingUp },
          { label: "Distribution Frequency", value: "Quarterly", icon: Clock },
          { label: "Next Payment", value: "Mar 31, 2026", icon: CheckCircle2 },
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
                  {["Period", "Pay Date", "Amount", "Yield", "Status", "Note"].map(h => (
                    <th key={h} className="text-left px-5 py-4 font-bold text-[10px] uppercase tracking-widest text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DISTRIBUTIONS.map((d, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-slate-900 font-semibold">{d.period}</td>
                    <td className="px-5 py-4 text-slate-600">{d.date}</td>
                    <td className="px-5 py-4 text-[#006AFF] font-bold">{d.amount}</td>
                    <td className="px-5 py-4 text-emerald-600 font-bold">{d.yield}</td>
                    <td className="px-5 py-4">
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{d.status}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs hidden lg:table-cell">{d.note}</td>
                  </tr>
                ))}
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
      {HISTORY.length > 0 && (
        <div>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">Payment History</p>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <tbody>
                {HISTORY.map((d, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="px-5 py-4 text-slate-900 font-semibold">{d.period}</td>
                    <td className="px-5 py-4 text-slate-600">{d.date}</td>
                    <td className="px-5 py-4 text-[#006AFF] font-bold">{d.amount}</td>
                    <td className="px-5 py-4 text-emerald-600 font-bold">{d.yield}</td>
                    <td className="px-5 py-4">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{d.status}</span>
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
