"use client"

import { useState } from "react"
import { Users, DollarSign, Home, CheckCircle2, Clock, AlertCircle, BarChart3, Download, Plus, X, Banknote } from "lucide-react"

const INVESTORS = [
  { name: "James Holden", email: "james@example.com", amount: 50000, status: "Active", accredited: true, joined: "Jan 15, 2026", market: "CA + FL" },
  { name: "Amara Chen", email: "amara@sovereign.io", amount: 100000, status: "Active", accredited: true, joined: "Jan 22, 2026", market: "NY + FL" },
  { name: "Marcus Webb", email: "marcus@webbcap.com", amount: 25000, status: "Active", accredited: true, joined: "Feb 3, 2026", market: "CA" },
  { name: "Priya Mathur", email: "priya@mathurvc.com", amount: 200000, status: "Active", accredited: true, joined: "Feb 10, 2026", market: "All Markets" },
  { name: "Derek Osei", email: "derek@oseigroup.com", amount: 75000, status: "Active", accredited: true, joined: "Feb 18, 2026", market: "FL + NY" },
  { name: "Sophie Laurent", email: "sophie@laurentie.fr", amount: 150000, status: "Pending KYC", accredited: false, joined: "Mar 5, 2026", market: "CA + NY" },
  { name: "Raj Kapoor", email: "raj@kventuresinc.com", amount: 10000, status: "Active", accredited: true, joined: "Mar 12, 2026", market: "FL" },
  { name: "Elena Vasquez", email: "elena@vasquezfam.com", amount: 500000, status: "Active", accredited: true, joined: "Mar 20, 2026", market: "All Markets" },
]

const UNITS = [
  { name: "Pacific Glass House", market: "CA", status: "Operating", occupancy: 87, phase: 1 },
  { name: "Palm Royale Retreat", market: "FL", status: "Operating", occupancy: 92, phase: 1 },
  { name: "Manhattan Velvet Suite", market: "NY", status: "Stabilizing", occupancy: 74, phase: 1 },
  { name: "Laguna Crest Villa", market: "CA", status: "Designing", occupancy: 0, phase: 1 },
  { name: "South Beach Penthouse", market: "FL", status: "Designing", occupancy: 0, phase: 1 },
  { name: "Tribeca Loft", market: "NY", status: "Acquisition", occupancy: 0, phase: 1 },
  { name: "Napa Valley Estate", market: "CA", status: "Acquired", occupancy: 0, phase: 2 },
  { name: "Key West Oasis", market: "FL", status: "Acquisition", occupancy: 0, phase: 2 },
  { name: "Hamptons House", market: "NY", status: "Pipeline", occupancy: 0, phase: 2 },
]

const STATUS_COLORS: Record<string, string> = {
  "Operating": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Stabilizing": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Designing": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Acquired": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Acquisition": "bg-slate-500/20 text-slate-400 border-slate-500/30",
  "Pipeline": "bg-slate-500/10 text-slate-500 border-slate-500/10",
}

const totalRaised = INVESTORS.filter(i => i.status === "Active").reduce((s, i) => s + i.amount, 0)
const targetRaise = 2000000 // $2M target for Phase 1

// Pending wire transfers waiting for admin confirmation
const PENDING_WIRES = [
  { name: "Sophie Laurent", email: "sophie@laurentie.fr", amount: 150000, ref: "SVDG-LAUR-829104", submitted: "Mar 5, 2026", bank: "BNP Paribas", market: "CA + NY", tier: "Principal" },
  { name: "Kwame Asante", email: "kwame@asante.co.uk", amount: 50000, ref: "SVDG-ASAN-774091", submitted: "Mar 22, 2026", bank: "HSBC UK", market: "FL", tier: "Growth" },
  { name: "Leila Nasser", email: "leila@nasserfam.ae", amount: 10000, ref: "SVDG-NASS-901244", submitted: "Mar 24, 2026", bank: "Emirates NBD", market: "NY", tier: "Seed" },
]

export default function AdminPage() {
  const [tab, setTab] = useState<"overview" | "investors" | "units" | "distributions" | "wires">("overview")
  const [wireStatuses, setWireStatuses] = useState<Record<string, "pending" | "confirmed" | "rejected">>(
    Object.fromEntries(PENDING_WIRES.map(w => [w.ref, "pending"]))
  )

  const confirmWire = (ref: string) => setWireStatuses(s => ({ ...s, [ref]: "confirmed" }))
  const rejectWire = (ref: string) => setWireStatuses(s => ({ ...s, [ref]: "rejected" }))

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "wires", label: `Pending Wires (${PENDING_WIRES.filter(w => wireStatuses[w.ref] === "pending").length})` },
    { id: "investors", label: `Investors (${INVESTORS.length})` },
    { id: "units", label: "Unit Board" },
    { id: "distributions", label: "Distributions" },
  ] as const

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Admin Header */}
      <div className="bg-[#111] border-b border-[#222] px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-red-400 mb-1">Admin Panel — Restricted Access</p>
            <h1 className="font-serif text-2xl text-white">Sterling Vane Operations</h1>
          </div>
          <button className="flex items-center gap-2 text-xs bg-[#C9A84C] text-black font-bold px-4 py-2.5 rounded-lg hover:bg-[#E8C96A] transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#111] border border-[#222] rounded-xl p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-white text-[#0A0A0A] shadow-sm" : "text-warmGrey hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Capital Raised", value: `$${(totalRaised/1000).toFixed(0)}K`, sub: `of $2M target`, icon: DollarSign },
                { label: "Active Investors", value: INVESTORS.filter(i=>i.status==="Active").length, sub: `${INVESTORS.filter(i=>i.status!=="Active").length} pending`, icon: Users },
                { label: "Units Operating", value: UNITS.filter(u=>u.status==="Operating").length, sub: `of ${UNITS.length} total`, icon: Home },
                { label: "Avg Occupancy", value: "84%", sub: "Operating units", icon: BarChart3 },
              ].map((k) => (
                <div key={k.label} className="bg-[#111] border border-[#222] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <k.icon className="w-4 h-4 text-[#C9A84C]" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey">{k.label}</p>
                  </div>
                  <p className="font-serif text-3xl text-white mb-1">{k.value}</p>
                  <p className="text-warmGrey text-xs">{k.sub}</p>
                </div>
              ))}
            </div>

            {/* Capital Raise Progress */}
            <div className="bg-[#111] border border-[#222] rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-mono text-xs uppercase tracking-widest text-warmGrey">Phase 1 Capital Raise Progress</p>
                <p className="text-[#C9A84C] font-bold text-sm">{((totalRaised / targetRaise) * 100).toFixed(0)}%</p>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] rounded-full transition-all"
                  style={{ width: `${(totalRaised / targetRaise) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-warmGrey">
                <span>${totalRaised.toLocaleString()} raised</span>
                <span>${targetRaise.toLocaleString()} target</span>
              </div>
            </div>

            {/* Unit Status Grid */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-warmGrey mb-4">Unit Status Board</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {UNITS.map((u) => (
                  <div key={u.name} className="bg-[#111] border border-[#222] rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{u.name}</p>
                      <p className="text-warmGrey text-xs">{u.market} · Phase {u.phase}</p>
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border ${STATUS_COLORS[u.status]}`}>
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pending Wires Tab */}
        {tab === "wires" && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-semibold mb-1">Pending Wire Transfers</p>
                <p className="text-warmGrey text-sm">Review and confirm incoming investor wire payments to activate portal access.</p>
              </div>
            </div>

            <div className="space-y-4">
              {PENDING_WIRES.map((wire) => {
                const status = wireStatuses[wire.ref]
                return (
                  <div key={wire.ref} className={`bg-[#111] border rounded-2xl p-6 transition-all ${
                    status === "confirmed" ? "border-emerald-500/30" :
                    status === "rejected" ? "border-red-500/20 opacity-50" :
                    "border-[#222] hover:border-[#333]"
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-white font-semibold">{wire.name}</p>
                          {status === "confirmed" && <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-1 rounded-full border border-emerald-500/20">CONFIRMED</span>}
                          {status === "rejected" && <span className="bg-red-500/10 text-red-400 text-[10px] font-mono px-2 py-1 rounded-full border border-red-500/20">REJECTED</span>}
                          {status === "pending" && <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-2 py-1 rounded-full border border-amber-500/20 animate-pulse">PENDING REVIEW</span>}
                        </div>
                        <p className="text-warmGrey text-sm">{wire.email}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[#C9A84C] font-bold text-2xl">${wire.amount.toLocaleString()}</p>
                        <p className="text-warmGrey text-xs">{wire.tier} Position</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                      {[
                        { label: "Wire Reference", value: wire.ref },
                        { label: "Submitted", value: wire.submitted },
                        { label: "Origin Bank", value: wire.bank },
                        { label: "Target Markets", value: wire.market },
                      ].map((d) => (
                        <div key={d.label}>
                          <p className="text-warmGrey text-[10px] uppercase tracking-widest font-mono mb-1">{d.label}</p>
                          <p className="text-white text-sm">{d.value}</p>
                        </div>
                      ))}
                    </div>

                    {status === "pending" && (
                      <div className="flex gap-3 pt-4 border-t border-[#222]">
                        <button
                          onClick={() => confirmWire(wire.ref)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-sm font-semibold hover:bg-emerald-500/30 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Confirm & Activate Portal
                        </button>
                        <button
                          onClick={() => rejectWire(wire.ref)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    )}

                    {status === "confirmed" && (
                      <div className="flex items-center gap-2 pt-4 border-t border-[#222] text-emerald-400 text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Portal access activated — investor can now log in and view their positions.
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Investors Tab */}
        {tab === "investors" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-warmGrey text-sm">{INVESTORS.length} investors · ${totalRaised.toLocaleString()} committed capital</p>
              <button className="flex items-center gap-2 text-xs border border-[#333] text-warmGrey px-4 py-2 rounded-lg hover:text-white hover:border-[#C9A84C]/40 transition-all">
                <Plus className="w-3 h-3" /> Add Investor
              </button>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#222]">
                      {["Investor", "Investment", "Markets", "Status", "Accredited", "Joined"].map(h => (
                        <th key={h} className="text-left px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-warmGrey/60">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {INVESTORS.map((inv, i) => (
                      <tr key={i} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <p className="text-white font-medium">{inv.name}</p>
                          <p className="text-warmGrey text-xs">{inv.email}</p>
                        </td>
                        <td className="px-5 py-4 text-[#C9A84C] font-bold">${inv.amount.toLocaleString()}</td>
                        <td className="px-5 py-4 text-warmGrey text-xs">{inv.market}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${inv.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {inv.accredited
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            : <AlertCircle className="w-4 h-4 text-amber-400" />}
                        </td>
                        <td className="px-5 py-4 text-warmGrey text-xs">{inv.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Unit Board Tab */}
        {tab === "units" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {UNITS.map((u) => (
              <div key={u.name} className="bg-[#111] border border-[#222] rounded-xl p-5 hover:border-[#333] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white font-medium">{u.name}</p>
                    <p className="text-warmGrey text-xs mt-0.5">Market: {u.market} · Phase {u.phase}</p>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded-full border shrink-0 ml-2 ${STATUS_COLORS[u.status]}`}>
                    {u.status}
                  </span>
                </div>
                {u.occupancy > 0 && (
                  <div>
                    <div className="flex justify-between text-xs text-warmGrey mb-1.5">
                      <span>Occupancy</span>
                      <span className="text-[#C9A84C] font-bold">{u.occupancy}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: `${u.occupancy}%` }} />
                    </div>
                  </div>
                )}
                {u.occupancy === 0 && (
                  <p className="text-warmGrey/50 text-xs italic">Not yet operational</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Distributions Tab */}
        {tab === "distributions" && (
          <div className="space-y-6">
            <div className="bg-[#111] border border-[#222] rounded-xl p-6">
              <h3 className="font-serif text-xl text-white mb-6">Distribution Controls</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Q1 2026 Pool", value: "$34,800", status: "Pending" },
                  { label: "Total Distributed (YTD)", value: "$4,000", status: "Paid" },
                  { label: "Next Calculation", value: "Mar 31, 2026", status: "Scheduled" },
                ].map((d) => (
                  <div key={d.label} className="bg-[#1a1a1a] border border-[#222] rounded-xl p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey mb-2">{d.label}</p>
                    <p className="text-white font-bold text-xl mb-1">{d.value}</p>
                    <span className="text-[10px] text-amber-400 font-mono">{d.status}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-[#C9A84C] text-black font-bold rounded-lg text-sm hover:bg-[#E8C96A] transition-colors">
                  Initiate Q1 Distribution
                </button>
                <button className="px-6 py-3 border border-[#333] text-warmGrey rounded-lg text-sm hover:text-white hover:border-[#555] transition-colors">
                  Generate Investor Statements
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
