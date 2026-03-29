"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ArrowRight, Download, Calendar, TrendingUp, DollarSign, BarChart3, Clock, AlertCircle, Globe, ShieldCheck, ChevronRight } from "lucide-react"

// Monthly portfolio data reflecting 30/60/90 milestone trajectory
const CHART_DATA = [
  { month: "Jan", value: 50000, milestone: "Entry" },
  { month: "Feb", value: 65000, milestone: "+30%" },
  { month: "Mar", value: 72000, milestone: null },
  { month: "Apr", value: 80000, milestone: "+60%" },
  { month: "May", value: 87000, milestone: null },
  { month: "Jun", value: 95000, milestone: "+90%" },
]
const MILESTONE_IDX = [1, 3, 5]

function ROIBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="group/bar">
      <div className="flex justify-between text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-[0.3em]">
        <span>{label}</span>
        <span className="text-[#0F172A] tabular-nums">{value}% Target Yield</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <div 
          className="h-full bg-[#2563EB] rounded-full transition-all duration-[2000ms] group-hover/bar:bg-[#0F172A]" 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  )
}

function PortfolioChart({ data = CHART_DATA }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(t)
  }, [])

  const W = 400, H = 200
  const PAD = { top: 30, right: 30, bottom: 40, left: 60 }
  const cW = W - PAD.left - PAD.right
  const cH = H - PAD.top - PAD.bottom

  const minV = Math.min(...data.map(d => d.value)) * 0.93
  const maxV = Math.max(...data.map(d => d.value)) * 1.04

  const xS = (i: number) => PAD.left + (i / (data.length - 1)) * cW
  const yS = (v: number) => PAD.top + cH - ((v - minV) / (maxV - minV)) * cH
  const fmt = (v: number) => `$${(v / 1000).toFixed(0)}K`

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xS(i).toFixed(1)},${yS(d.value).toFixed(1)}`).join(" ")
  const areaPath = `${linePath} L${xS(data.length - 1).toFixed(1)},${(PAD.top + cH).toFixed(1)} L${xS(0).toFixed(1)},${(PAD.top + cH).toFixed(1)} Z`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      style={{ overflow: "visible" }}
      onMouseLeave={() => setHovered(null)}
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = PAD.top + t * cH
        const v = maxV - t * (maxV - minV)
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#0F172A" strokeOpacity="0.05" strokeWidth="1" />
            <text x={PAD.left - 12} y={y + 4} textAnchor="end" fontSize="9" fill="#94A3B8" className="font-mono tabular-nums leading-none">{fmt(v)}</text>
          </g>
        )
      })}

      {/* Area */}
      <path d={areaPath} fill="url(#chartGrad)" 
        style={{ opacity: animated ? 1 : 0, transition: "opacity 1.5s ease" }} />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{
          strokeDasharray: 800,
          strokeDashoffset: animated ? 0 : 800,
          transition: "stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1)"
        }} />

      {/* Points */}
      {data.map((d, i) => (
        <g key={i}>
          <rect x={xS(i) - 20} y={PAD.top} width={40} height={cH} fill="transparent"
            onMouseEnter={() => setHovered(i)} style={{ cursor: "crosshair" }} />
          <circle cx={xS(i)} cy={yS(d.value)}
            r={hovered === i ? 6 : MILESTONE_IDX.includes(i) ? 4.5 : 3}
            fill={MILESTONE_IDX.includes(i) ? "#2563EB" : "#0F172A"}
            className="transition-all duration-300"
            style={{ opacity: animated ? 1 : 0 }} />
          {d.milestone && (
            <text x={xS(i)} y={yS(d.value) - 14} textAnchor="middle" fontSize="9" fill="#2563EB" className="font-bold uppercase tracking-widest leading-none">
              {d.milestone}
            </text>
          )}
          <text x={xS(i)} y={H - 10} textAnchor="middle" fontSize="9" fill="#94A3B8" className="font-bold uppercase tracking-[0.2em] leading-none">{d.month}</text>
        </g>
      ))}

      {/* Hover tooltip */}
      {hovered !== null && (() => {
        const d = data[hovered]
        const tx = xS(hovered)
        const ty = yS(d.value)
        return (
          <g>
            <line x1={tx} y1={PAD.top} x2={tx} y2={PAD.top + cH} stroke="#2563EB" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <rect x={tx - 45} y={ty - 50} width={90} height={40} rx="12" fill="#0F172A" className="shadow-2xl" />
            <text x={tx} y={ty - 35} textAnchor="middle" fontSize="8" fill="#94A3B8" className="font-bold uppercase tracking-widest">{d.month} Projection</text>
            <text x={tx} y={ty - 20} textAnchor="middle" fontSize="13" fill="white" className="font-mono font-bold tabular-nums">{fmt(d.value)}</text>
          </g>
        )
      })()}
    </svg>
  )
}

export default function DashboardOverviewPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      // @ts-ignore
      if (session?.user?.onboardingComplete === false) {
        router.push("/onboarding")
      }
    }
  }, [status, session, router])

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/user/dashboard")
        const data = await res.json()
        if (!data.error) {
          setDashboardData(data)
        }
      } catch (err) {
        console.error("Failed to fetch dashboard:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchDashboard()
    } else if (status === "unauthenticated") {
      setIsLoading(false)
    }
  }, [session, status])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const firstName = dashboardData?.firstName || (session?.user?.name || session?.user?.email || "Investor").split(" ")[0].split("@")[0]
  
  const hasInvestments = dashboardData?.hasInvestments || false
  const stats = dashboardData?.stats || {
    totalInvested: "$0",
    currentValue: "$0",
    returnsToDate: "$0",
    nextDistribution: "Pending",
    growthPercent: "0%"
  }

  const kpis = [
    { label: "Total Portfolio", value: stats.totalInvested, change: "Phase 1 Verified", icon: DollarSign, up: true },
    { label: "Market Growth", value: maxV_calc(stats.currentValue), change: `+${stats.growthPercent} Actual`, icon: TrendingUp, up: true },
    { label: "Sovereign Yield", value: stats.returnsToDate, change: "Accrued Returns", icon: BarChart3, up: true },
    { label: "Next Payout", value: stats.nextDistribution, change: "Scheduled", icon: Clock, up: null },
  ]

  function maxV_calc(val: string) {
     return val === "$0" ? "$0" : val
  }

  const portfolio = dashboardData?.investments || []

  return (
    <div className="space-y-12 pb-24 md:pb-12 animate-sovereign-in">
      {/* Header Narrative */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#2563EB]" />
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">Private Management Layer</p>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#0F172A] mb-3 font-bold tracking-tight leading-tight">
            Welcome, {firstName}.
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
            Your capital is positioned across primary hospitality hubs for maximum yield velocity.
          </p>
        </div>
        <Link href="/marketplace" className="self-start md:self-auto shrink-0 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-[#0F172A] hover:bg-[#2563EB] transition-all duration-500 py-3.5 px-7 rounded-xl shadow-lg group">
          Browse Collection <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* KPI Architecture */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <p className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-slate-400 leading-tight">{kpi.label}</p>
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#2563EB] transition-colors duration-500 shrink-0">
                <kpi.icon className="w-3.5 h-3.5 text-[#0F172A] group-hover:text-white transition-colors" />
              </div>
            </div>
            <p className="font-mono text-xl sm:text-2xl font-bold text-[#0F172A] mb-2 tabular-nums tracking-tight truncate">{kpi.value}</p>
            <p className={`text-[8px] font-bold uppercase tracking-wider truncate ${kpi.up === true ? "text-emerald-500" : "text-slate-400"}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Performance Visualization */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[3.5rem] p-6 sm:p-12 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 blur-[100px] rounded-full -z-10 group-hover:bg-blue-100/50 transition-colors duration-700" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0F172A] tracking-tight">Portfolio Performance</h3>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.3em] mt-2">Telemetry updated every 24 hours from asset operators</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-[#0F172A] uppercase tracking-[0.2em] bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" /> Live Yield Feed
            </div>
          </div>
          
          <div className="relative mb-12">
            {hasInvestments ? (
               <PortfolioChart />
            ) : (
              <div className="h-[280px] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
                <TrendingUp className="w-12 h-12 text-slate-200 mb-6" />
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] max-w-[240px] text-center leading-relaxed">Growth telemetry will initiate post-allocation verification.</p>
              </div>
            )}
          </div>

          {/* Performance Targets */}
          <div className="pt-12 border-t border-slate-100 space-y-10">
            <ROIBar label="Month 2 Milestone" value={30} />
            <ROIBar label="Month 4 Milestone" value={60} />
            <ROIBar label="Month 6 Peak Yield" value={90} />
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="space-y-6 lg:space-y-10">
          {/* Quick Hub */}
          <div className="bg-[#0F172A] rounded-[3.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/20 blur-3xl rounded-full" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 mb-10">Asset Hub</p>
            <div className="space-y-5">
              {[
                { href: "/marketplace", icon: TrendingUp, label: "Acquire Global Assets" },
                { href: "/marketplace?tab=book", icon: Calendar, label: "Reserve Boutique Suite" },
                { href: "/dashboard/documents", icon: Download, label: "Capital Documents" },
              ].map(({ href, icon: Icon, label }) => (
                <Link key={label} href={href}
                  className="flex items-center justify-between px-8 py-5 bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 rounded-2xl text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all group">
                  <div className="flex items-center gap-4">
                    <Icon className="w-4 h-4 text-[#2563EB]" />
                    {label}
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-30 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Asset Positions */}
          <div className="bg-white border border-slate-100 rounded-[3.5rem] p-8 sm:p-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-50 blur-3xl rounded-full -z-10" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 mb-10">Portfolio Alpha</p>
            
            {portfolio.length > 0 ? (
              <div className="space-y-10">
                {portfolio.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between gap-6 group/item">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0F172A] text-sm font-bold truncate mb-1 group-hover/item:text-[#2563EB] transition-colors">{p.name}</p>
                      <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{p.location}</p>
                    </div>
                    <div className="text-right shrink-0 border-l border-slate-100 pl-6">
                      <p className="text-[#0F172A] text-sm font-mono font-bold tabular-nums">{p.yield}%</p>
                      <p className={`text-[8px] font-bold uppercase tracking-widest ${p.status === "Operating" ? "text-emerald-500" : "text-[#2563EB]"}`}>{p.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="text-center py-12">
                   <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-40">Zero Active Positions</p>
                   <Link href="/marketplace" className="text-[#2563EB] text-[10px] font-bold uppercase tracking-widest mt-6 inline-block hover:underline underline-offset-8 decoration-2 shadow-blue-500/20">Explore Showcase →</Link>
                </div>
            )}
            
            <Link href="/dashboard/portfolio" className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-center text-[10px] text-slate-400 hover:text-[#0F172A] transition-colors font-bold uppercase tracking-[0.4em]">
              Detailed Manifest <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
