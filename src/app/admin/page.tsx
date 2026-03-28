"use client"

import { useState, useEffect } from "react"
import { 
  Users, DollarSign, Home, CheckCircle2, 
  Activity, Download, X, Banknote, Loader2, 
  ShieldCheck, AlertTriangle, TrendingUp, ArrowUpRight
} from "lucide-react"
import { cn } from "@/lib/utils"

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
        <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Initializing Secure Environment...</p>
      </div>
    )
  }

  const targetRaise = 2000000 
  const totalRaised = stats?.totalAUM || 0

  return (
    <div className="space-y-12 animate-sovereign-in">
      
      {/* Admin Operations Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-accent" />
             </div>
             <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Authorized Operations</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tighter">Command Center</h1>
          <p className="text-white/40 text-sm mt-4 font-medium max-w-xl leading-relaxed">
            Real estate liquidity management, investor onboarding, and global fund distributions. Managed ledger status: <span className="text-emerald-400 font-bold">Synchronized</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 rounded-2xl transition-all text-xs uppercase tracking-widest flex items-center gap-3 glass-dark">
            <Download className="w-4 h-4" /> Global Audit Log
          </button>
          <button className="px-6 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl transition-all text-xs uppercase tracking-widest luxury-shadow">
            New Asset Allocation
          </button>
        </div>
      </div>

      {/* Tabs Navigation (Internal to Admin) */}
      <div className="flex gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/5 w-fit overflow-x-auto no-scrollbar glass-dark">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "wires", label: `Pending Wires (${pendingWires.filter(w => wireStatuses[w.id] === "pending").length})`, icon: Banknote },
          { id: "investors", label: `Investor List`, icon: Users },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={cn(
              "flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold transition-all shrink-0 uppercase tracking-widest",
              tab === t.id ? "bg-accent text-white shadow-xl" : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW CONTENT */}
      {tab === "overview" && (
        <div className="space-y-12">
          {/* KPI Dashboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Assets Under Management", value: `$${(totalRaised/1000000).toFixed(2)}M`, sub: `Global Valuation`, icon: DollarSign, trend: "+8.2%" },
              { label: "Onboarded Investors", value: stats?.totalInvestors || 0, sub: `Active LPs`, icon: Users, trend: "+12.4%" },
              { label: "Live Portfolio", value: stats?.activeProperties || 0, sub: `Yield-Generating Assets`, icon: Home, trend: "Stable" },
              { label: "Average ROI", value: "11.4%", sub: "Audited Distributions", icon: TrendingUp, trend: "+0.6%" },
            ].map((k) => (
              <div key={k.label} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 glass-dark group transition-all duration-500 hover:border-accent/40 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <k.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-[10px] font-bold text-accent font-mono uppercase tracking-widest bg-accent/10 py-1 px-3 rounded-full border border-accent/20">{k.trend}</span>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold mb-3">{k.label}</p>
                <p className="font-serif text-3xl text-white font-bold tracking-tighter mb-2">{k.value}</p>
                <p className="text-white/40 text-[10px] font-medium">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Fund Allocation Progress */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 glass-dark">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                <div>
                   <h2 className="text-2xl font-serif font-bold text-white tracking-tighter mb-2">Portfolio Capitalization</h2>
                   <p className="text-white/40 text-sm font-medium">Phase 1 Target Allocation Track</p>
                </div>
                <div className="flex gap-4">
                   <div className="text-right">
                      <p className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-1">Cap Allocation</p>
                      <p className="text-xl font-bold text-accent">34.2%</p>
                   </div>
                   <div className="text-right pl-4 border-l border-white/10">
                      <p className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-1">Status</p>
                      <p className="text-xl font-bold text-emerald-400">Scaling</p>
                   </div>
                </div>
             </div>
             <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mb-6 luxury-shadow">
                <div className="h-full bg-accent rounded-full luxury-shadow transition-all duration-1000" style={{ width: `34.2%` }} />
             </div>
             <div className="flex justify-between text-[11px] font-mono font-bold text-white/20 uppercase tracking-[0.3em]">
                <span>$0 Seed Stage</span>
                <span>$2,000,000 Phase 1 Goal</span>
             </div>
          </div>
        </div>
      )}

      {/* PENDING WIRES CONTENT */}
      {tab === "wires" && (
        <div className="space-y-8 max-w-4xl">
          <div className="flex items-center gap-4 p-6 bg-info/10 border border-info/20 rounded-3xl mb-8">
             <AlertTriangle className="w-5 h-5 text-accent" />
             <p className="text-xs text-white/60 leading-relaxed font-medium">
                Incoming distributions for wire settlement must be verified manually against banking records before authorizing asset allocation on-chain.
             </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {pendingWires.length > 0 ? (
              pendingWires.map((wire) => {
                const status = wireStatuses[wire.id]
                return (
                  <div key={wire.id} className={cn(
                    "bg-white/5 border rounded-[2rem] p-8 glass-dark transition-all duration-500",
                    status === "confirmed" ? "border-emerald-500/30 opacity-60 scale-[0.98]" :
                    status === "rejected" ? "border-rose-500/20 opacity-40 grayscale" :
                    "border-white/10 hover:border-white/20"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                      <div className="flex items-center gap-5">
                         <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center font-serif text-2xl font-bold shadow-xl border border-white/10">
                            {(wire.user.name || "U")[0]}
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-2 font-serif">
                              <p className="text-white text-xl font-bold tracking-tighter">{wire.user.name || wire.user.email}</p>
                              {status === "confirmed" && <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-mono px-3 py-1 rounded-full border border-emerald-500/30 font-bold uppercase tracking-widest">Authorized</span>}
                              {status === "rejected" && <span className="bg-rose-500/20 text-rose-400 text-[9px] font-mono px-3 py-1 rounded-full border border-rose-500/30 font-bold uppercase tracking-widest">Revoked</span>}
                              {status === "pending" && <span className="bg-accent/20 text-accent text-[9px] font-mono px-3 py-1 rounded-full border border-accent/30 font-bold uppercase tracking-widest animate-pulse">Verification Required</span>}
                            </div>
                            <p className="text-white/40 text-xs font-bold font-mono tracking-widest uppercase">{wire.user.email}</p>
                         </div>
                      </div>
                      <div className="text-right">
                        <p className="text-accent font-bold text-4xl tracking-tighter mb-1">${wire.amount.toLocaleString()}</p>
                        <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest font-bold">Allocation: {wire.property.name}</p>
                      </div>
                    </div>

                    {status === "pending" && (
                      <div className="flex gap-4 pt-8 border-t border-white/5">
                        <button
                          onClick={() => confirmWire(wire.id)}
                          className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-accent/20 text-accent border border-accent/40 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-accent/30 transition-all shadow-xl"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Authorize & Settle Position
                        </button>
                        <button
                          onClick={() => rejectWire(wire.id)}
                          className="px-8 py-5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-rose-500/20 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-24 bg-white/2 shadow-inner rounded-[3rem] border border-white/5 border-dashed">
                <Activity className="w-16 h-16 text-white/5 mx-auto mb-6" />
                <p className="text-white/40 font-serif text-lg italic tracking-tight">Financial verification queue is currently empty.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INVESTORS TABLE CONTENT */}
      {tab === "investors" && (
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden glass-dark">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {["Investor Identification", "Account Tier", "Onboarding Date", "Status"].map(h => (
                    <th key={h} className="text-left px-8 py-6 font-mono text-[10px] uppercase tracking-widest text-white/30 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-all">
                    <td className="px-8 py-6">
                      <p className="text-white font-bold text-base tracking-tighter">{u.name || "Anonymous User"}</p>
                      <p className="text-white/40 text-xs font-mono tracking-widest uppercase">{u.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-accent text-[11px] font-mono uppercase font-bold tracking-[0.2em]">{u.investorProfile?.tier || "Seed"}</span>
                    </td>
                    <td className="px-8 py-6 text-white/40 text-sm font-medium">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-8 py-6 text-right lg:text-left">
                      <span className={cn(
                        "text-[9px] font-mono px-3 py-1.5 rounded-full border font-bold uppercase tracking-widest",
                        u.investorProfile 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      )}>
                        {u.investorProfile ? "Active LP" : "Candidate"}
                      </span>
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
