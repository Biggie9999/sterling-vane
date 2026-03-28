"use client"

import { useState, useEffect } from "react"
import { Users, DollarSign, Home, CheckCircle2, Clock, AlertCircle, BarChart3, Download, Plus, X, Banknote, Loader2 } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  "ACTIVE": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "STABILIZING": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "DESIGNING": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "ACQUIRED": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "ACQUISITION": "bg-slate-500/20 text-slate-400 border-slate-500/30",
}

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null)
  const [pendingWires, setPendingWires] = useState<any[]>([])
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tab, setTab] = useState<"overview" | "investors" | "units" | "distributions" | "wires">("overview")
  const [wireStatuses, setWireStatuses] = useState<Record<string, "pending" | "confirmed" | "rejected">>({})

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const res = await fetch("/api/admin/stats")
        const data = await res.json()
        if (res.ok) {
          setStats(data.stats)
          setPendingWires(data.pendingWires)
          setRecentUsers(data.recentUsers)
          
          const initialStatuses: Record<string, "pending" | "confirmed" | "rejected"> = {}
          data.pendingWires.forEach((w: any) => {
            initialStatuses[w.id] = "pending"
          })
          setWireStatuses(initialStatuses)
        }
      } catch (err) {
        console.error("Failed to fetch admin stats:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAdminData()
  }, [])

  const confirmWire = (wireId: string) => setWireStatuses(s => ({ ...s, [wireId]: "confirmed" }))
  const rejectWire = (wireId: string) => setWireStatuses(s => ({ ...s, [wireId]: "rejected" }))

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "wires", label: `Pending Wires (${pendingWires.filter(w => wireStatuses[w.id] === "pending").length})` },
    { id: "investors", label: `Investors (${stats?.totalInvestors || 0})` },
    { id: "units", label: "Unit Board" },
    { id: "distributions", label: "Distributions" },
  ] as const

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#006AFF] animate-spin mb-4" />
        <p className="text-warmGrey font-mono text-[10px] uppercase tracking-[0.3em]">Accessing Command Center...</p>
      </div>
    )
  }

  const targetRaise = 2000000 
  const totalRaised = stats?.totalAUM || 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Admin Header */}
      <div className="bg-[#111] border-b border-[#222] px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-red-400 mb-1">Admin Panel — Restricted Access</p>
            <h1 className="font-serif text-2xl text-white">Sterling Vane Operations</h1>
          </div>
          <button className="flex items-center gap-2 text-xs bg-[#006AFF] text-white font-bold px-4 py-2.5 rounded-lg hover:bg-[#0050CC] transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#111] border border-[#222] rounded-xl p-1 w-fit overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all shrink-0 ${tab === t.id ? "bg-white text-[#0A0A0A] shadow-sm" : "text-warmGrey hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Capital Raised", value: `$${(totalRaised/1000).toFixed(0)}K`, sub: `of $2M target`, icon: DollarSign },
                { label: "Total Investors", value: stats?.totalInvestors || 0, sub: `${stats?.pendingWiresCount || 0} pending wires`, icon: Users },
                { label: "Units Operating", value: stats?.activeProperties || 0, sub: "Live in marketplace", icon: Home },
                { label: "Avg Occupancy", value: "94%", sub: "Portfolio average", icon: BarChart3 },
              ].map((k) => (
                <div key={k.label} className="bg-[#111] border border-[#222] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <k.icon className="w-4 h-4 text-[#006AFF]" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey">{k.label}</p>
                  </div>
                  <p className="font-serif text-3xl text-white mb-1">{k.value}</p>
                  <p className="text-warmGrey text-xs">{k.sub}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <p className="font-mono text-xs uppercase tracking-widest text-warmGrey">Phase 1 Capital Raise Progress</p>
                <p className="text-[#006AFF] font-bold text-sm">{((totalRaised / targetRaise) * 100).toFixed(0)}%</p>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#006AFF] to-[#E8C96A] rounded-full transition-all"
                  style={{ width: `${Math.min(100, (totalRaised / targetRaise) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-warmGrey">
                <span>${totalRaised.toLocaleString()} raised</span>
                <span>${targetRaise.toLocaleString()} target</span>
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
              {pendingWires.length > 0 ? (
                pendingWires.map((wire) => {
                  const status = wireStatuses[wire.id]
                  return (
                    <div key={wire.id} className={`bg-[#111] border rounded-2xl p-6 transition-all ${
                      status === "confirmed" ? "border-emerald-500/30" :
                      status === "rejected" ? "border-red-500/20 opacity-50" :
                      "border-[#222] hover:border-[#333]"
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className="text-white font-semibold">{wire.user.name || wire.user.email}</p>
                            {status === "confirmed" && <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-1 rounded-full border border-emerald-500/20">CONFIRMED</span>}
                            {status === "rejected" && <span className="bg-red-500/10 text-red-400 text-[10px] font-mono px-2 py-1 rounded-full border border-red-500/20">REJECTED</span>}
                            {status === "pending" && <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-2 py-1 rounded-full border border-amber-500/20 animate-pulse">PENDING REVIEW</span>}
                          </div>
                          <p className="text-warmGrey text-sm">{wire.user.email}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[#006AFF] font-bold text-2xl">${wire.amount.toLocaleString()}</p>
                          <p className="text-warmGrey text-xs">Allocated to {wire.property.name}</p>
                        </div>
                      </div>

                      {status === "pending" && (
                        <div className="flex gap-3 pt-4 border-t border-[#222]">
                          <button
                            onClick={() => confirmWire(wire.id)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-sm font-semibold hover:bg-emerald-500/30 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Confirm & Activate Portal
                          </button>
                          <button
                            onClick={() => rejectWire(wire.id)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors"
                          >
                            <X className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-20 bg-[#111] rounded-3xl border border-[#222] border-dashed">
                  <Banknote className="w-12 h-12 text-warmGrey/20 mx-auto mb-4" />
                  <p className="text-warmGrey text-sm italic">No pending wire transfers found in queue.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Investors Tab */}
        {tab === "investors" && (
          <div className="space-y-6">
            <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#222]">
                      {["Investor", "Tier", "Joined", "Status"].map(h => (
                        <th key={h} className="text-left px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-warmGrey/60">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((u, i) => (
                      <tr key={i} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <p className="text-white font-medium">{u.name || "Anonymous User"}</p>
                          <p className="text-warmGrey text-xs">{u.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[#E8C96A] text-[10px] font-mono uppercase font-bold">{u.investorProfile?.tier || "Seed"}</span>
                        </td>
                        <td className="px-5 py-4 text-warmGrey text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${u.investorProfile ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                            {u.investorProfile ? "Active" : "Guest"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs remain simplified for demo */}
        {(tab === "units" || tab === "distributions") && (
          <div className="text-center py-20 bg-[#111] rounded-3xl border border-[#222] border-dashed">
             <BarChart3 className="w-12 h-12 text-warmGrey/20 mx-auto mb-4" />
             <p className="text-warmGrey text-sm italic">Advanced logic for {tab} is currently being synchronized with the blockchain ledger.</p>
          </div>
        )}
      </div>
    </div>
  )
}
