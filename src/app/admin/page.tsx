"use client"

import { useState, useEffect } from "react"
import { 
  Users, DollarSign, Home, CheckCircle2, 
  Activity, Download, X, Banknote, Loader2, 
  ShieldCheck, AlertTriangle, TrendingUp, ArrowUpRight, Landmark, Layers
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null)
  const [pendingWires, setPendingWires] = useState<any[]>([])
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tab, setTab] = useState<"overview" | "investors" | "units" | "distributions" | "wires" | "media">("overview")
  const [wireStatuses, setWireStatuses] = useState<Record<string, "pending" | "confirmed" | "rejected">>({})
  const [founderFile, setFounderFile] = useState<File | null>(null)
  const [founderPreview, setFounderPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState<string | null>(null)

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
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-10" />
        <p className="text-[#0F172A] font-serif text-3xl font-bold italic opacity-40 animate-pulse">Synchronizing Ledger...</p>
      </div>
    )
  }

  const targetRaise = 2000000 
  const totalRaised = stats?.totalAUM || 0

  return (
    <div className="space-y-16 animate-sovereign-in max-w-7xl mx-auto py-12">
      
      {/* Admin Operations Header */}
      <div className="relative overflow-hidden p-8 sm:p-12 md:p-14 bg-white border border-[#0F172A]/5 rounded-[2.5rem] sm:rounded-[3rem] shadow-sm group">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
               <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
               <p className="text-[#2563EB] font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.4em]">The Sovereign Ledger</p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#0F172A] tracking-tighter leading-tight mt-2">Admin<br /><span className="italic text-[#2563EB]">Command.</span></h1>
            <p className="hidden sm:block text-[#64748B] text-sm sm:text-base font-serif italic max-w-xl mt-6 leading-relaxed">
              "Manage liquidity cycles, partner onboarding, and global fund distributions with institutional precision."
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link href="/admin/properties" className="w-full sm:w-auto px-8 py-4 bg-[#0F172A] text-white font-bold rounded-xl transition-all text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-[#2563EB] flex items-center justify-center gap-3">
              Deploy Asset <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-[#F8FAFC] border border-[#0F172A]/5 text-[#0F172A] font-bold rounded-xl transition-all text-[10px] uppercase tracking-[0.2em] shadow-sm hover:bg-slate-100 flex items-center justify-center">
               Live Audit Log
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-full bg-[#2563EB]/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-6 border-b border-[#0F172A]/5 px-2 overflow-x-auto">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "wires", label: `Capital Queue (${pendingWires.filter(w => wireStatuses[w.id] === "pending").length})`, icon: Landmark },
          { id: "investors", label: `Partner Manifest`, icon: Users },
          { id: "media", label: `Site Media`, icon: ShieldCheck },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={cn(
              "flex items-center gap-3 pb-6 relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500",
              tab === t.id ? "text-[#0F172A]" : "text-[#64748B] hover:text-[#0F172A] opacity-60 hover:opacity-100"
            )}
          >
            <t.icon className={cn("w-4 h-4", tab === t.id ? "text-[#2563EB]" : "text-current")} />
            {t.label}
            {tab === t.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2563EB] rounded-full animate-sovereign-in" />}
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
              { label: "Peak Yield Target", value: "90%", sub: "Achieved at Month 6", icon: TrendingUp, trend: "Month 6" },
            ].map((k) => (
              <div key={k.label} className="bg-white border border-[#0F172A]/5 rounded-[2.5rem] p-10 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#0F172A]/5 flex items-center justify-center group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-500">
                    <k.icon className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <span className="text-[9px] font-bold text-[#2563EB] uppercase tracking-widest bg-[#F8FAFC] py-2 px-4 rounded-full border border-[#0F172A]/5">{k.trend}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#64748B] mb-3">{k.label}</p>
                <p className="font-serif text-4xl text-[#0F172A] font-bold tracking-tighter mb-2">{k.value}</p>
                <p className="text-[#64748B] text-xs font-serif italic">{k.sub}</p>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#F8FAFC] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Fund Allocation Progress */}
          <div className="bg-white border border-[#0F172A]/5 rounded-[3.5rem] p-12 shadow-sm relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12 mb-12">
                <div>
                   <div className="flex items-center gap-3 mb-4">
                      <Layers className="w-4 h-4 text-[#2563EB]" />
                      <h2 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.3em] opacity-40">Portfolio Capitalization</h2>
                   </div>
                   <h2 className="text-3xl font-serif font-bold text-[#0F172A] tracking-tighter">Phase 1 Target Allocation</h2>
                </div>
                <div className="flex gap-10">
                   <div className="text-right">
                      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1 opacity-40">Cap Progress</p>
                      <p className="text-3xl font-serif font-bold text-[#2563EB]">34.2%</p>
                   </div>
                   <div className="text-right pl-10 border-l border-[#0F172A]/10">
                      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1 opacity-40">Operational Status</p>
                      <p className="text-3xl font-serif font-bold text-[#0F172A] italic">Scaling</p>
                   </div>
                </div>
             </div>
             <div className="h-4 w-full bg-[#F8FAFC] border border-[#0F172A]/5 rounded-full overflow-hidden mb-8 relative">
                <div className="h-full bg-[#2563EB] rounded-full transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1)" style={{ width: `34.2%` }} />
             </div>
             <div className="flex justify-between text-[10px] font-bold text-[#64748B] uppercase tracking-[0.4em] opacity-40">
                <span>$0 Initiation</span>
                <span>$2,000,000 Phase 1 Manifest</span>
             </div>
             <div className="absolute top-0 right-0 w-80 h-full bg-[#2563EB]/5 blur-[100px] rounded-full translate-x-1/2 pointer-events-none opacity-40" />
          </div>
        </div>
      )}

      {/* PENDING WIRES CONTENT */}
      {tab === "wires" && (
        <div className="space-y-10 max-w-5xl">
          <div className="flex items-center gap-5 p-8 bg-[#F8FAFC] border border-[#2563EB]/10 rounded-[2rem] shadow-sm">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#0F172A]/5 shrink-0">
               <AlertTriangle className="w-5 h-5 text-[#2563EB]" />
             </div>
             <p className="text-xs text-[#0F172A] leading-relaxed font-bold uppercase tracking-widest">
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
                    "border-[#0F172A]/5 hover:border-[#2563EB]/20 hover:shadow-2xl"
                  )}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                      <div className="flex items-center gap-8">
                         <div className="w-20 h-20 rounded-[1.5rem] bg-[#F8FAFC] flex items-center justify-center font-serif text-3xl font-bold text-[#0F172A] border border-[#0F172A]/5 group-hover:bg-[#0F172A] group-hover:text-white transition-colors duration-500">
                            {(wire.user.name || "U")[0]}
                         </div>
                         <div>
                            <div className="flex items-center gap-4 mb-2 font-serif">
                              <p className="text-[#0F172A] text-2xl font-bold tracking-tight">{wire.user.name || wire.user.email}</p>
                              {status === "confirmed" && <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-4 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">Settled</span>}
                              {status === "rejected" && <span className="bg-rose-500/10 text-rose-500 text-[10px] font-bold px-4 py-1.5 rounded-full border border-rose-500/20 uppercase tracking-widest">Revoked</span>}
                              {status === "pending" && <span className="text-[#2563EB] text-[10px] font-bold uppercase tracking-widest animate-pulse">Verification Required</span>}
                            </div>
                            <p className="text-[#64748B] text-[11px] font-bold uppercase tracking-[0.3em] opacity-40">{wire.user.email}</p>
                         </div>
                      </div>
                      <div className="md:text-right border-t md:border-t-0 md:border-l border-[#0F172A]/5 pt-8 md:pt-0 md:pl-10">
                        <p className="text-[#0F172A] font-bold text-5xl tracking-tighter mb-2">${wire.amount.toLocaleString()}</p>
                        <p className="text-[#2563EB] text-[11px] font-bold uppercase tracking-[0.3em]">Allocation: {wire.property.name}</p>
                      </div>
                    </div>

                    {status === "pending" && (
                      <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-10 border-t border-[#0F172A]/5">
                        <button
                          onClick={() => confirmWire(wire.id)}
                          className="flex-1 flex items-center justify-center gap-4 px-10 py-6 bg-[#0F172A] text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#2563EB] hover:text-[#0F172A] transition-all duration-500 shadow-xl"
                        >
                          <CheckCircle2 className="w-5 h-5" /> Confirm Settlement
                        </button>
                        <button
                          onClick={() => rejectWire(wire.id)}
                          className="px-10 py-6 bg-white border border-[#0F172A]/10 text-rose-500 rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-sm"
                        >
                          <X className="w-5 h-5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-40 bg-white shadow-sm rounded-[4rem] border border-[#0F172A]/5">
                <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#0F172A]/5">
                   <Activity className="w-8 h-8 text-[#2563EB] opacity-40" />
                </div>
                <p className="text-[#0F172A] font-serif text-3xl font-bold tracking-tighter mb-4 italic opacity-40">Financial queue is clear.</p>
                <p className="text-[#64748B] text-[11px] font-bold uppercase tracking-widest opacity-60">All positions have been successfully settled.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INVESTORS TABLE CONTENT */}
      {tab === "investors" && (
        <div className="bg-white border border-[#0F172A]/5 rounded-[3.5rem] overflow-hidden shadow-xl animate-sovereign-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#0F172A]/5">
                  {["Partner Identification", "Portfolio Tier", "Onboarding", "Access Status"].map(h => (
                    <th key={h} className="text-left px-10 py-8 text-[11px] font-bold uppercase tracking-[0.4em] text-[#0F172A] opacity-40 leading-none">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F172A]/5">
                {recentUsers.map((u, i) => (
                  <tr key={i} className="group hover:bg-[#F8FAFC]/30 transition-all duration-300">
                    <td className="px-10 py-10">
                      <p className="text-[#0F172A] font-bold text-xl tracking-tighter mb-1 group-hover:text-[#2563EB] transition-colors">{u.name || "Sovereign Partner"}</p>
                      <p className="text-[#64748B] text-[11px] font-bold uppercase tracking-[0.2em]">{u.email}</p>
                    </td>
                    <td className="px-10 py-10">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                        <span className="text-[#0F172A] text-[12px] font-bold uppercase tracking-[0.2em]">{u.investorProfile?.tier || "Seed"}</span>
                      </div>
                    </td>
                    <td className="px-10 py-10 text-[#64748B] text-[11px] font-bold uppercase tracking-widest leading-none">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-10 py-10">
                      <span className={cn(
                        "text-[10px] font-bold px-5 py-2.5 rounded-full border uppercase tracking-widest transition-all duration-500",
                        u.investorProfile 
                          ? "bg-white text-[#0F172A] border-[#0F172A]/10 group-hover:bg-[#0F172A] group-hover:text-white" 
                          : "bg-[#F8FAFC] text-[#64748B] border-transparent"
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
      {/* MEDIA MANAGEMENT */}
      {tab === "media" && (
        <div className="space-y-10 max-w-2xl">
          <div className="bg-white border border-[#0F172A]/5 rounded-[3rem] p-12 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
              <h2 className="text-lg font-serif font-bold text-[#0F172A] tracking-tight">Founder Image</h2>
            </div>
            <p className="text-[#64748B] text-sm mb-8 leading-relaxed">
              Upload the founder photo displayed on the homepage. Appears in the "Execution &amp; Track Record" section.
            </p>

            {/* Current / Preview */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#0F172A]/5 mb-8">
              <img
                src={founderPreview || "/founder.jpg"}
                alt="Founder preview"
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" }}
              />
              <div className="absolute top-3 left-3 bg-[#0F172A]/70 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {founderPreview ? "New Preview" : "Current Image"}
              </div>
            </div>

            <label className="block mb-6">
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#64748B] mb-3">Select New Image</span>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-[#64748B] file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-[#006AFF] file:text-white hover:file:bg-blue-700 cursor-pointer"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null
                  setFounderFile(f)
                  if (f) setFounderPreview(URL.createObjectURL(f))
                }}
              />
            </label>

            <button
              disabled={!founderFile || uploading}
              onClick={async () => {
                if (!founderFile) return
                setUploading(true)
                setUploadMsg(null)
                const fd = new FormData()
                fd.append("file", founderFile)
                const res = await fetch("/api/admin/upload-founder", { method: "POST", body: fd })
                const json = await res.json()
                setUploading(false)
                setUploadMsg(json.success ? "Image updated successfully!" : "Upload failed. Try again.")
                if (json.success) setFounderFile(null)
              }}
              className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-[#2563EB] transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : "Save Founder Image"}
            </button>

            {uploadMsg && (
              <p className={`mt-4 text-sm font-bold text-center ${uploadMsg.includes("successfully") ? "text-emerald-500" : "text-red-400"}`}>{uploadMsg}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
