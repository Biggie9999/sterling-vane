"use client"

import { useState, useEffect } from "react"
import { 
  Users, DollarSign, Home, CheckCircle2, 
  Activity, Download, X, Banknote, Loader2, 
  ShieldCheck, AlertTriangle, TrendingUp, ArrowUpRight, Landmark, Layers
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
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-10" />
        <p className="text-[#0A0A0A] font-serif text-3xl font-bold italic opacity-40 animate-pulse">Synchronizing Ledger...</p>
      </div>
    )
  }

  const targetRaise = 2000000 
  const totalRaised = stats?.totalAUM || 0

  return (
    <div className="space-y-16 animate-sovereign-in max-w-7xl mx-auto py-12">
      
      {/* Admin Operations Header */}
      <div className="relative overflow-hidden p-12 bg-white border border-[#0A0A0A]/5 rounded-[3rem] shadow-sm group">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
               <p className="text-[#C9A84C] font-bold text-[10px] uppercase tracking-[0.4em]">The Sovereign Ledger</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0A0A0A] tracking-tighter leading-tight">Administrator <br /><span className="italic text-[#C9A84C]">Command.</span></h1>
            <p className="text-[#8A8A8A] text-base font-serif italic max-w-xl mt-6 leading-relaxed">
              "Manage liquidity cycles, partner onboarding, and global fund distributions with institutional precision."
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4.5 bg-[#FAF9F6] border border-[#0A0A0A]/5 text-[#0A0A0A] font-bold rounded-2xl transition-all text-[10px] uppercase tracking-[0.2em] shadow-sm hover:bg-[#FAF9F6]">
               Live Audit Log
            </button>
            <button className="px-10 py-5 bg-[#0A0A0A] text-white font-bold rounded-2xl transition-all text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-[#C9A84C] hover:text-[#0A0A0A] flex items-center gap-3">
              Deploy Asset <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-full bg-[#C9A84C]/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
      </div>

      {/* Tabs Navigation (Internal to Admin) */}
      <div className="flex gap-6 border-b border-[#0A0A0A]/5 px-2">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "wires", label: `Capital Queue (${pendingWires.filter(w => wireStatuses[w.id] === "pending").length})`, icon: Landmark },
          { id: "investors", label: `Partner Manifest`, icon: Users },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={cn(
              "flex items-center gap-3 pb-6 relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500",
              tab === t.id ? "text-[#0A0A0A]" : "text-[#8A8A8A] hover:text-[#0A0A0A] opacity-60 hover:opacity-100"
            )}
          >
            <t.icon className={cn("w-4 h-4", tab === t.id ? "text-[#C9A84C]" : "text-current")} />
            {t.label}
            {tab === t.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C9A84C] rounded-full animate-sovereign-in" />}
          </button>
        ))}
      </div>

      {/* OVERVIEW CONTENT */}
      {tab === "overview" && (
        <div className="space-y-16">
          {/* KPI Dashboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Equity Under Control", value: `$${(totalRaised/1000000).toFixed(2)}M`, sub: `Portfolio Valuation`, icon: DollarSign, trend: "+8.2%" },
              { label: "Verified Partners", value: stats?.totalInvestors || 0, sub: `Active Allocators`, icon: Users, trend: "+12.4%" },
              { label: "Active Collection", value: stats?.activeProperties || 0, sub: `Stabilized Assets`, icon: Home, trend: "Stable" },
              { label: "Sovereign Yield", value: "32.4%", sub: "Net Monthly Target", icon: TrendingUp, trend: "+0.6%" },
            ].map((k) => (
              <div key={k.label} className="bg-white border border-[#0A0A0A]/5 rounded-[2.5rem] p-10 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF9F6] border border-[#0A0A0A]/5 flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-all duration-500">
                    <k.icon className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <span className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-widest bg-[#FAF9F6] py-2 px-4 rounded-full border border-[#0A0A0A]/5">{k.trend}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A8A8A] mb-3">{k.label}</p>
                <p className="font-serif text-4xl text-[#0A0A0A] font-bold tracking-tighter mb-2">{k.value}</p>
                <p className="text-[#8A8A8A] text-xs font-serif italic">{k.sub}</p>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#FAF9F6] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Fund Allocation Progress */}
          <div className="bg-white border border-[#0A0A0A]/5 rounded-[3.5rem] p-12 shadow-sm relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12 mb-12">
                <div>
                   <div className="flex items-center gap-3 mb-4">
                      <Layers className="w-4 h-4 text-[#C9A84C]" />
                      <h2 className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-[0.3em] opacity-40">Portfolio Capitalization</h2>
                   </div>
                   <h2 className="text-3xl font-serif font-bold text-[#0A0A0A] tracking-tighter">Phase 1 Target Allocation</h2>
                </div>
                <div className="flex gap-10">
                   <div className="text-right">
                      <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1 opacity-40">Cap Progress</p>
                      <p className="text-3xl font-serif font-bold text-[#C9A84C]">34.2%</p>
                   </div>
                   <div className="text-right pl-10 border-l border-[#0A0A0A]/10">
                      <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1 opacity-40">Operational Status</p>
                      <p className="text-3xl font-serif font-bold text-[#0A0A0A] italic">Scaling</p>
                   </div>
                </div>
             </div>
             <div className="h-4 w-full bg-[#FAF9F6] border border-[#0A0A0A]/5 rounded-full overflow-hidden mb-8 relative">
                <div className="h-full bg-[#C9A84C] rounded-full transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1)" style={{ width: `34.2%` }} />
             </div>
             <div className="flex justify-between text-[10px] font-bold text-[#8A8A8A] uppercase tracking-[0.4em] opacity-40">
                <span>$0 Initiation</span>
                <span>$2,000,000 Phase 1 Manifest</span>
             </div>
             <div className="absolute top-0 right-0 w-80 h-full bg-[#C9A84C]/5 blur-[100px] rounded-full translate-x-1/2 pointer-events-none opacity-40" />
          </div>
        </div>
      )}

      {/* PENDING WIRES CONTENT */}
      {tab === "wires" && (
        <div className="space-y-10 max-w-5xl">
          <div className="flex items-center gap-5 p-8 bg-[#FAF9F6] border border-[#C9A84C]/10 rounded-[2rem] shadow-sm">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#0A0A0A]/5 shrink-0">
               <AlertTriangle className="w-5 h-5 text-[#C9A84C]" />
             </div>
             <p className="text-xs text-[#0A0A0A] leading-relaxed font-bold uppercase tracking-widest">
                Manifest Note: Capital settlements must be verified manually against banking records before authorizing asset allocation in the Partner Portal.
             </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {pendingWires.length > 0 ? (
              pendingWires.map((wire) => {
                const status = wireStatuses[wire.id]
                return (
                  <div key={wire.id} className={cn(
                    "bg-white border rounded-[3rem] p-10 shadow-sm transition-all duration-700 group",
                    status === "confirmed" ? "border-emerald-500/20 bg-emerald-50/10 opacity-60 scale-[0.98]" :
                    status === "rejected" ? "border-rose-500/10 opacity-40" :
                    "border-[#0A0A0A]/5 hover:border-[#C9A84C]/20 hover:shadow-2xl"
                  )}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                      <div className="flex items-center gap-8">
                         <div className="w-20 h-20 rounded-[1.5rem] bg-[#FAF9F6] flex items-center justify-center font-serif text-3xl font-bold text-[#0A0A0A] border border-[#0A0A0A]/5 group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors duration-500">
                            {(wire.user.name || "U")[0]}
                         </div>
                         <div>
                            <div className="flex items-center gap-4 mb-2 font-serif">
                              <p className="text-[#0A0A0A] text-2xl font-bold tracking-tight">{wire.user.name || wire.user.email}</p>
                              {status === "confirmed" && <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-4 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">Settled</span>}
                              {status === "rejected" && <span className="bg-rose-500/10 text-rose-500 text-[10px] font-bold px-4 py-1.5 rounded-full border border-rose-500/20 uppercase tracking-widest">Revoked</span>}
                              {status === "pending" && <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest animate-pulse">Verification Required</span>}
                            </div>
                            <p className="text-[#8A8A8A] text-[11px] font-bold uppercase tracking-[0.3em] opacity-40">{wire.user.email}</p>
                         </div>
                      </div>
                      <div className="md:text-right border-t md:border-t-0 md:border-l border-[#0A0A0A]/5 pt-8 md:pt-0 md:pl-10">
                        <p className="text-[#0A0A0A] font-bold text-5xl tracking-tighter mb-2">${wire.amount.toLocaleString()}</p>
                        <p className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-[0.3em]">Allocation: {wire.property.name}</p>
                      </div>
                    </div>

                    {status === "pending" && (
                      <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-10 border-t border-[#0A0A0A]/5">
                        <button
                          onClick={() => confirmWire(wire.id)}
                          className="flex-1 flex items-center justify-center gap-4 px-10 py-6 bg-[#0A0A0A] text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 shadow-xl"
                        >
                          <CheckCircle2 className="w-5 h-5" /> Confirm Settlement
                        </button>
                        <button
                          onClick={() => rejectWire(wire.id)}
                          className="px-10 py-6 bg-white border border-[#0A0A0A]/10 text-rose-500 rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-sm"
                        >
                          <X className="w-5 h-5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-40 bg-white shadow-sm rounded-[4rem] border border-[#0A0A0A]/5">
                <div className="w-20 h-20 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#0A0A0A]/5">
                   <Activity className="w-8 h-8 text-[#C9A84C] opacity-40" />
                </div>
                <p className="text-[#0A0A0A] font-serif text-3xl font-bold tracking-tighter mb-4 italic opacity-40">Financial queue is clear.</p>
                <p className="text-[#8A8A8A] text-[11px] font-bold uppercase tracking-widest opacity-60">All positions have been successfully settled.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INVESTORS TABLE CONTENT */}
      {tab === "investors" && (
        <div className="bg-white border border-[#0A0A0A]/5 rounded-[3.5rem] overflow-hidden shadow-xl animate-sovereign-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#0A0A0A]/5">
                  {["Partner Identification", "Portfolio Tier", "Onboarding", "Access Status"].map(h => (
                    <th key={h} className="text-left px-10 py-8 text-[11px] font-bold uppercase tracking-[0.4em] text-[#0A0A0A] opacity-40 leading-none">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0A0A0A]/5">
                {recentUsers.map((u, i) => (
                  <tr key={i} className="group hover:bg-[#FAF9F6]/30 transition-all duration-300">
                    <td className="px-10 py-10">
                      <p className="text-[#0A0A0A] font-bold text-xl tracking-tighter mb-1 group-hover:text-[#C9A84C] transition-colors">{u.name || "Sovereign Partner"}</p>
                      <p className="text-[#8A8A8A] text-[11px] font-bold uppercase tracking-[0.2em]">{u.email}</p>
                    </td>
                    <td className="px-10 py-10">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                        <span className="text-[#0A0A0A] text-[12px] font-bold uppercase tracking-[0.2em]">{u.investorProfile?.tier || "Seed"}</span>
                      </div>
                    </td>
                    <td className="px-10 py-10 text-[#8A8A8A] text-[11px] font-bold uppercase tracking-widest leading-none">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-10 py-10">
                      <span className={cn(
                        "text-[10px] font-bold px-5 py-2.5 rounded-full border uppercase tracking-widest transition-all duration-500",
                        u.investorProfile 
                          ? "bg-white text-[#0A0A0A] border-[#0A0A0A]/10 group-hover:bg-[#0A0A0A] group-hover:text-white" 
                          : "bg-[#FAF9F6] text-[#8A8A8A] border-transparent"
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
