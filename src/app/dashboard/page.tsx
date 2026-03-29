"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ArrowRight, Download, Calendar, TrendingUp, DollarSign, BarChart3, Clock, AlertCircle, Loader2, Globe, ShieldCheck, ChevronRight } from "lucide-react"

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
    <div>
      <div className="flex justify-between text-[10px] text-[#64748B] mb-2 font-bold uppercase tracking-[0.2em]">
        <span>{label}</span>
        <span className="text-[#0F172A]">{value}% Target Yield</span>
      </div>
      <div className="h-1 bg-white/50 rounded-full overflow-hidden border border-[#0F172A]/5">
        <div className="h-full bg-[#2563EB] rounded-full transition-all duration-[1500ms]" style={{ width: `${value}%` }} />
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
  const PAD = { top: 24, right: 24, bottom: 32, left: 52 }
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
      className="w-full"
      style={{ overflow: "visible" }}
      onMouseLeave={() => setHovered(null)}
    >
      <defs>
        <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
        <clipPath id="cClip">
          <rect x={PAD.left} y={PAD.top} width={cW} height={cH} />
        </clipPath>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = PAD.top + t * cH
        const v = maxV - t * (maxV - minV)
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#0F172A" strokeOpacity="0.05" strokeWidth="1" />
            <text x={PAD.left - 8} y={y + 3} textAnchor="end" fontSize="8" fill="#64748B]" fontFamily="montserrat" fontWeight="bold">{fmt(v)}</text>
          </g>
        )
      })}

      {/* Area */}
      <path d={areaPath} fill="url(#aGrad)" clipPath="url(#cClip)"
        style={{ opacity: animated ? 1 : 0, transition: "opacity 1.2s ease" }} />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        clipPath="url(#cClip)"
        style={{
          strokeDasharray: 800,
          strokeDashoffset: animated ? 0 : 800,
          transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)"
        }} />

      {/* Milestone glow rings */}
      {MILESTONE_IDX.map(i => (
        <circle key={i} cx={xS(i)} cy={yS(data[i].value)} r="6"
          fill="#2563EB" opacity={animated ? 0.2 : 0}
          style={{ transition: "opacity 1.4s ease" }} />
      ))}

      {/* Points */}
      {data.map((d, i) => (
        <g key={i}>
          <rect x={xS(i) - 20} y={PAD.top} width={40} height={cH} fill="transparent"
            onMouseEnter={() => setHovered(i)} style={{ cursor: "crosshair" }} />
          <circle cx={xS(i)} cy={yS(d.value)}
            r={hovered === i ? 5 : MILESTONE_IDX.includes(i) ? 4 : 2}
            fill={MILESTONE_IDX.includes(i) ? "#2563EB" : "#fff"}
            stroke={MILESTONE_IDX.includes(i) ? "#2563EB" : "#0F172A"}
            strokeOpacity={MILESTONE_IDX.includes(i) ? 1 : 0.1}
            strokeWidth="1.5"
            style={{ opacity: animated ? 1 : 0, transition: "opacity 1s ease, r 0.2s" }} />
          {d.milestone && (
            <text x={xS(i)} y={yS(d.value) - 12} textAnchor="middle" fontSize="8" fill="#2563EB" fontWeight="bold" fontFamily="montserrat">
              {d.milestone}
            </text>
          )}
          <text x={xS(i)} y={H - 6} textAnchor="middle" fontSize="8" fill="#64748B" fontWeight="bold" fontFamily="montserrat">{d.month.toUpperCase()}</text>
        </g>
      ))}

      {/* Hover tooltip */}
      {hovered !== null && (() => {
        const d = data[hovered]
        const tx = xS(hovered)
        const ty = yS(d.value)
        const bx = Math.min(Math.max(tx - 41, PAD.left), W - PAD.right - 82)
        return (
          <g>
            <line x1={tx} y1={PAD.top} x2={tx} y2={PAD.top + cH} stroke="#2563EB" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <rect x={bx} y={ty - 45} width={82} height={35} rx="8" fill="#0F172A" />
            <text x={bx + 41} y={ty - 32} textAnchor="middle" fontSize="8" fill="#64748B" fontWeight="bold" fontFamily="montserrat">{d.month} • 2026</text>
            <text x={bx + 41} y={ty - 18} textAnchor="middle" fontSize="11" fill="white" fontWeight="bold" fontFamily="montserrat">{fmt(d.value)}</text>
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
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center">
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
    { label: "Market Growth", value: stats.currentValue, change: `${stats.growthPercent} Increase`, icon: TrendingUp, up: true },
    { label: "Sovereign Yield", value: stats.returnsToDate, change: "Accrued Returns", icon: BarChart3, up: true },
    { label: "Next Distribution", value: stats.nextDistribution, change: "Review Target", icon: Clock, up: null },
  ]

  const portfolio = dashboardData?.investments || []

  return (
    <div className="space-y-8 lg:space-y-12 pb-24 md:pb-0">
      {/* Header Narrative */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#0F172A]/5">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#64748B]">Private Management Layer</p>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#0F172A] mb-3 font-bold tracking-tight">Welcome, {firstName}.</h1>
          <p className="text-[#64748B] text-sm sm:text-lg font-medium italic font-serif leading-relaxed max-w-2xl">
            "Your portfolio is positioned for consistent performance across high-frequency hospitality assets."
          </p>
        </div>
        <Link href="/marketplace" className="inline-flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-[#0F172A] hover:bg-[#2563EB] hover:text-[#0F172A] transition-all duration-500 py-4 px-10 rounded-2xl shrink-0 shadow-2xl group">
          Invest Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* KPI Architecture */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-[#0F172A]/5 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex items-center justify-between mb-4 sm:mb-8">
              <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#64748B]">{kpi.label}</p>
              <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center border border-[#0F172A]/5 group-hover:bg-[#2563EB] transition-colors duration-500">
                <kpi.icon className="w-4 h-4 text-[#0F172A]" />
              </div>
            </div>
            <p className="font-serif text-3xl font-bold text-[#0F172A] mb-3 tracking-tighter">{kpi.value}</p>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${kpi.up === true ? "text-emerald-500" : "text-[#64748B]"}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Performance Visualization */}
        <div className="lg:col-span-2 bg-white border border-[#0F172A]/5 rounded-2xl sm:rounded-[3rem] p-5 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-[#2563EB]/5 blur-[80px] rounded-full -z-10" />
          
          <div className="flex justify-between items-center mb-5 sm:mb-10">
            <div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#0F172A] tracking-tight">Portfolio Performance</h3>
              <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">Projected trajectory based on active collection yields</p>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold text-[#0F172A] uppercase tracking-[0.2em]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Real Performance
            </div>
          </div>
          
          <div className="pr-4">
            {hasInvestments ? (
               <PortfolioChart />
            ) : (
              <div className="h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-[#F1F5F9] rounded-[2rem] bg-[#F1F5F9]/30">
                <TrendingUp className="w-12 h-12 text-[#2563EB]/30 mb-6" />
                <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-widest max-w-[200px] text-center opacity-60">Growth telemetry will initiate post-allocation.</p>
              </div>
            )}
          </div>

          {/* Performance Targets */}
          <div className="mt-12 pt-10 border-t border-[#0F172A]/5 space-y-8">
            <ROIBar label="Allocation Milestone 1" value={30} />
            <ROIBar label="Allocation Milestone 2" value={60} />
            <ROIBar label="Allocation Milestone 3" value={90} />
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="space-y-8">
          {/* Direct Access */}
          <div className="bg-[#F8FAFC] border border-[#0F172A]/5 rounded-2xl sm:rounded-[3rem] p-5 sm:p-10 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#64748B] mb-5 sm:mb-10">Quick Actions</p>
            <div className="space-y-4">
              {[
                { href: "/marketplace", icon: TrendingUp, label: "Acquire Global Assets" },
                { href: "/marketplace?tab=book", icon: Calendar, label: "Reserve Boutique Suite" },
                { href: "/dashboard/documents", icon: Download, label: "Capital Documents" },
              ].map(({ href, icon: Icon, label }) => (
                <Link key={label} href={href}
                  className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-5 border border-[#0F172A]/5 bg-white rounded-2xl text-[#0F172A] font-bold uppercase tracking-widest text-[10px] hover:border-[#2563EB]/30 hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-4">
                    <Icon className="w-4 h-4 text-[#2563EB]" />
                    {label}
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-20 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Asset Positions */}
          <div className="bg-white border border-[#0F172A]/5 rounded-2xl sm:rounded-[3rem] p-5 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#2563EB]/5 blur-3xl rounded-full -z-10" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#64748B] mb-5 sm:mb-10">My Assets</p>
            
            {portfolio.length > 0 ? (
              <div className="space-y-8">
                {portfolio.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between gap-4 group">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0F172A] text-sm font-bold truncate mb-1 group-hover:text-[#2563EB] transition-colors">{p.name}</p>
                      <p className="text-[#64748B] text-[9px] font-bold uppercase tracking-widest">{p.location}</p>
                    </div>
                    <div className="text-right shrink-0 border-l border-[#0F172A]/5 pl-6">
                      <p className="text-[#0F172A] text-sm font-bold">{p.yield}%</p>
                      <p className={`text-[8px] font-bold uppercase tracking-widest ${p.status === "Operating" ? "text-emerald-500" : "text-[#2563EB]"}`}>{p.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="text-center py-10">
                   <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-widest opacity-40">No active positions.</p>
                   <Link href="/marketplace" className="text-[#2563EB] text-[10px] font-bold uppercase tracking-widest mt-4 inline-block hover:underline">Browse Marketplace →</Link>
                </div>
            )}
            
            <Link href="/dashboard/portfolio" className="mt-10 pt-8 border-t border-[#0F172A]/5 flex items-center justify-center text-[9px] text-[#64748B] hover:text-[#0F172A] transition-colors font-bold uppercase tracking-[0.3em]">
              Detailed Manifest <Globe className="w-3.5 h-3.5 ml-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
