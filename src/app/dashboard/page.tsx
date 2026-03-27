"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ArrowRight, Download, Calendar, TrendingUp, DollarSign, BarChart3, Clock, AlertCircle, Loader2 } from "lucide-react"

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
      <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#006AFF] rounded-full transition-all duration-1000" style={{ width: `${value}%` }} />
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
          <stop offset="0%" stopColor="#006AFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#006AFF" stopOpacity="0" />
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
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontFamily="monospace">{fmt(v)}</text>
          </g>
        )
      })}

      {/* Area */}
      <path d={areaPath} fill="url(#aGrad)" clipPath="url(#cClip)"
        style={{ opacity: animated ? 1 : 0, transition: "opacity 0.8s ease" }} />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#006AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        clipPath="url(#cClip)"
        style={{
          strokeDasharray: 800,
          strokeDashoffset: animated ? 0 : 800,
          transition: "stroke-dashoffset 1.6s ease"
        }} />

      {/* Milestone glow rings */}
      {MILESTONE_IDX.map(i => (
        <circle key={i} cx={xS(i)} cy={yS(data[i].value)} r="8"
          fill="#006AFF" opacity={animated ? 0.15 : 0}
          style={{ transition: "opacity 1.4s ease" }} />
      ))}

      {/* Points + hit areas */}
      {data.map((d, i) => (
        <g key={i}>
          <rect x={xS(i) - 22} y={PAD.top} width={44} height={cH} fill="transparent"
            onMouseEnter={() => setHovered(i)} style={{ cursor: "crosshair" }} />
          <circle cx={xS(i)} cy={yS(d.value)}
            r={hovered === i ? 6 : MILESTONE_IDX.includes(i) ? 5 : 3.5}
            fill={MILESTONE_IDX.includes(i) ? "#006AFF" : "#fff"}
            stroke={MILESTONE_IDX.includes(i) ? "#006AFF" : "#cbd5e1"}
            strokeWidth="2"
            style={{ opacity: animated ? 1 : 0, transition: "opacity 0.8s ease, r 0.1s" }} />
          {d.milestone && (
            <text x={xS(i)} y={yS(d.value) - 13} textAnchor="middle" fontSize="9" fill="#006AFF" fontWeight="bold" fontFamily="monospace">
              {d.milestone}
            </text>
          )}
          <text x={xS(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="monospace">{d.month}</text>
        </g>
      ))}

      {/* Hover tooltip */}
      {hovered !== null && (() => {
        const d = data[hovered]
        const tx = xS(hovered)
        const ty = yS(d.value)
        const bx = Math.min(Math.max(tx - 40, PAD.left), W - PAD.right - 82)
        return (
          <g>
            <line x1={tx} y1={PAD.top} x2={tx} y2={PAD.top + cH} stroke="#006AFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <rect x={bx} y={ty - 40} width={82} height={30} rx="7" fill="#0A2540" />
            <text x={bx + 41} y={ty - 26} textAnchor="middle" fontSize="10" fill="#60a5fa" fontWeight="bold" fontFamily="monospace">{d.month} 2026</text>
            <text x={bx + 41} y={ty - 13} textAnchor="middle" fontSize="13" fill="white" fontWeight="bold" fontFamily="monospace">{fmt(d.value)}</text>
          </g>
        )
      })()}
    </svg>
  )
}

export default function DashboardOverviewPage() {
  const { data: session } = useSession()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    }
  }, [session])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#006AFF] animate-spin" />
      </div>
    )
  }

  const firstName = dashboardData?.firstName || (session?.user?.name || session?.user?.email || "Investor").split(" ")[0].split("@")[0]
  
  const hasInvestments = dashboardData?.hasInvestments || false
  const stats = dashboardData?.stats || {
    totalInvested: "$0",
    currentValue: "$0",
    returnsToDate: "$0",
    nextDistribution: "None scheduled",
    growthPercent: "0%"
  }

  const kpis = [
    { label: "Total Invested", value: stats.totalInvested, change: "Accredited Position", icon: DollarSign, up: true },
    { label: "Current Value", value: stats.currentValue, change: `${stats.growthPercent} since entry`, icon: TrendingUp, up: true },
    { label: "Returns to Date", value: stats.returnsToDate, change: "Realised + accrued", icon: BarChart3, up: true },
    { label: "Next Distribution", value: stats.nextDistribution, change: "Estimate", icon: Clock, up: null },
  ]

  const portfolio = dashboardData?.investments || []

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#006AFF] mb-2">Investor Portal</p>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2 font-bold">Welcome back, {firstName}.</h1>
          <p className="text-slate-500 text-sm font-medium">Your portfolio is tracking target yields: 30% at Month 2 · 60% at Month 4 · 90% at Month 6.</p>
        </div>
        <Link href="/marketplace" className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-[#006AFF] hover:bg-[#0050CC] transition-colors py-3 px-6 rounded-xl shrink-0">
          Browse Assets <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Alert */}
      <div className="bg-[#006AFF]/5 border border-[#006AFF]/20 rounded-2xl p-5 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-[#006AFF] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-bold text-[#006AFF] text-sm mb-1">Phase 1 — 12 Allocation Slots Remaining</p>
          <p className="text-slate-600 text-sm leading-relaxed">Phase 1 is 88% subscribed. Minimum investment $10,000. Once closed, Phase 2 pricing increases. Priority extended to existing investors for 48 hours.</p>
        </div>
        <Link href="/apply" className="shrink-0 text-xs bg-white text-[#006AFF] border border-[#006AFF]/20 font-bold px-4 py-2 rounded-lg hover:bg-[#006AFF]/10 transition-colors uppercase tracking-widest hidden sm:block">
          Invest More
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{kpi.label}</p>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <kpi.icon className="w-4 h-4 text-[#006AFF]" />
              </div>
            </div>
            <p className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-2">{kpi.value}</p>
            <p className={`text-xs font-bold ${kpi.up === true ? "text-emerald-500" : kpi.up === false ? "text-red-500" : "text-slate-400"}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Portfolio Growth</h3>
              <p className="text-slate-400 text-xs font-medium mt-0.5">Hover over data points to see values</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006AFF]" /> 2026 Trajectory
            </div>
          </div>
          {hasInvestments ? (
             <PortfolioChart />
          ) : (
            <div className="h-[200px] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-slate-200 mb-2" />
              <p className="text-slate-400 text-sm font-medium">Growth data will appear after first investment</p>
            </div>
          )}

          {/* ROI Progress Bars */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
            <ROIBar label="Month 2 Target" value={30} />
            <ROIBar label="Month 4 Target" value={60} />
            <ROIBar label="Month 6 Target" value={90} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Quick Actions</p>
            <div className="space-y-2">
              {[
                { href: "/marketplace", icon: TrendingUp, label: "Browse & Invest in Assets" },
                { href: "/dashboard/bookings", icon: Calendar, label: "Book Priority Stay" },
                { href: "/dashboard/documents", icon: Download, label: "Download Documents" },
              ].map(({ href, icon: Icon, label }) => (
                <Link key={label} href={href}
                  className="flex items-center gap-3 px-4 py-3.5 border border-slate-200 bg-slate-50 rounded-xl text-slate-700 font-semibold hover:text-[#006AFF] hover:border-[#006AFF]/30 transition-all text-sm group">
                  <Icon className="w-4 h-4 group-hover:text-[#006AFF] transition-colors text-slate-400" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Positions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Your Positions</p>
            {portfolio.length > 0 ? (
              <div className="space-y-4">
                {portfolio.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 text-sm font-bold truncate mb-0.5">{p.name}</p>
                      <p className="text-slate-500 text-xs font-medium">{p.location}</p>
                    </div>
                    <div className="text-right shrink-0 border-l border-slate-100 pl-4">
                      <p className="text-slate-900 text-sm font-bold">{p.yield}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${p.status === "Operating" ? "text-emerald-500" : "text-amber-500"}`}>{p.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="text-center py-6">
                   <p className="text-slate-400 text-xs">No active positions yet.</p>
                   <Link href="/marketplace" className="text-[#006AFF] text-xs font-bold mt-2 inline-block">Start Investing →</Link>
                </div>
            )}
            <Link href="/dashboard/portfolio" className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center text-xs text-slate-500 hover:text-[#006AFF] transition-colors font-bold uppercase tracking-widest">
              View Full Portfolio <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
