"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { ArrowRight, Download, Calendar, TrendingUp, DollarSign, BarChart3, Clock, AlertCircle } from "lucide-react"

const PORTFOLIO = [
  { name: "The Pacific Glass House", location: "Santa Monica, CA", status: "Operating", occupancy: 87, yield: "$18,400", share: "12.5%" },
  { name: "The Palm Royale Retreat", location: "Miami Beach, FL", status: "Operating", occupancy: 92, yield: "$21,200", share: "15%" },
  { name: "The Manhattan Velvet Suite", location: "Midtown, NY", status: "Stabilizing", occupancy: 74, yield: "$14,600", share: "10%" },
]

function ROIBar({ value, max = 100, label }: { value: number; max?: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-warmGrey mb-1.5">
        <span className="font-mono">{label}</span>
        <span className="text-gold font-bold">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] rounded-full transition-all duration-1000"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default function DashboardOverviewPage() {
  const { data: session } = useSession()
  const firstName = (session?.user?.name || session?.user?.email || "Investor").split(" ")[0].split("@")[0]

  const kpis = [
    { label: "Total Invested", value: "$50,000", change: "Accredited Position", icon: DollarSign, up: true },
    { label: "Current Value", value: "$62,400", change: "+24.8% since entry", icon: TrendingUp, up: true },
    { label: "Returns to Date", value: "$12,400", change: "Realised + accrued", icon: BarChart3, up: true },
    { label: "Next Distribution", value: "Q2 2026", change: "Est. $4,200", icon: Clock, up: null },
  ]

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C] mb-2">Investor Portal</p>
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-1">Welcome back, {firstName}.</h1>
          <p className="text-warmGrey text-sm">Your portfolio is active. Phase 1 units are stabilising ahead of schedule.</p>
        </div>
        <Link href="/apply" className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C] hover:text-white transition-colors">
          Increase Allocation <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Offering Alert */}
      <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-xl p-5 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-[#C9A84C] text-sm mb-0.5">Phase 1 — 12 Allocation Slots Remaining</p>
          <p className="text-warmGrey text-xs leading-relaxed">Phase 1 is 88% subscribed. The entry minimum is $10,000. Once closed, Phase 2 pricing increases. Priority extended to existing investors for 48 hours.</p>
        </div>
        <Link href="/apply" className="shrink-0 text-xs bg-[#C9A84C] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#E8C96A] transition-colors">
          Invest More
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-[#111] border border-[#222] rounded-xl p-5 group hover:border-[#C9A84C]/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey">{kpi.label}</p>
              <kpi.icon className="w-4 h-4 text-warmGrey/40" />
            </div>
            <p className="font-serif text-2xl md:text-3xl text-white mb-1">{kpi.value}</p>
            <p className={`text-xs font-mono ${kpi.up === true ? "text-emerald-400" : kpi.up === false ? "text-red-400" : "text-warmGrey"}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-lg text-white">Portfolio Growth</h3>
            <select className="bg-transparent border border-[#333] text-warmGrey text-xs outline-none px-3 py-1.5 rounded-lg">
              <option>2026</option>
              <option>All Time</option>
            </select>
          </div>

          {/* SVG Chart */}
          <div className="relative h-56 w-full">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0,1,2,3].map(i => (
                <line key={i} x1="0" y1={50*i} x2="400" y2={50*i} stroke="#222" strokeWidth="1" />
              ))}
              {/* Area */}
              <path d="M0,200 L0,160 C50,155 80,145 120,130 C160,115 180,100 220,80 C260,60 300,45 340,30 C360,22 380,18 400,15 L400,200 Z" fill="url(#goldGrad)" />
              {/* Line */}
              <path d="M0,160 C50,155 80,145 120,130 C160,115 180,100 220,80 C260,60 300,45 340,30 C360,22 380,18 400,15" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
              {/* Data point */}
              <circle cx="400" cy="15" r="5" fill="#C9A84C" />
              <circle cx="400" cy="15" r="10" fill="#C9A84C" fillOpacity="0.2" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-mono text-warmGrey/50 uppercase tracking-widest px-1">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span><span>Now</span>
            </div>
          </div>

          {/* ROI Progress Bars */}
          <div className="mt-6 pt-6 border-t border-[#222] space-y-3">
            <ROIBar label="Q1 Target (3 months)" value={35} max={90} />
            <ROIBar label="Q2 Target (6 months)" value={60} max={90} />
            <ROIBar label="Year 1 Target" value={85} max={90} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C] mb-5">Quick Actions</p>
            <div className="space-y-2">
              {[
                { href: "/dashboard/bookings", icon: Calendar, label: "Book Priority Stay" },
                { href: "/dashboard/documents", icon: Download, label: "Download PPM" },
                { href: "/apply", icon: TrendingUp, label: "Increase Allocation" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 border border-[#333] rounded-lg text-warmGrey hover:text-white hover:border-[#C9A84C]/40 transition-all text-sm group"
                >
                  <Icon className="w-4 h-4 group-hover:text-[#C9A84C] transition-colors" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Your Portfolio Summary */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C] mb-5">Positions</p>
            <div className="space-y-4">
              {PORTFOLIO.map((p) => (
                <div key={p.name} className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{p.name}</p>
                    <p className="text-warmGrey text-[10px]">{p.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-emerald-400 text-xs font-bold">{p.yield}</p>
                    <p className={`text-[10px] ${p.status === "Operating" ? "text-emerald-400/60" : "text-amber-400/60"}`}>{p.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/portfolio" className="mt-4 pt-4 border-t border-[#222] flex items-center text-xs text-warmGrey hover:text-[#C9A84C] transition-colors font-mono">
              View full portfolio <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
