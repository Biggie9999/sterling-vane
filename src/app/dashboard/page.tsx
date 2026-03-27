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
      <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#006AFF] rounded-full transition-all duration-1000"
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#006AFF] mb-2">Investor Portal</p>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2 font-bold">Welcome back, {firstName}.</h1>
          <p className="text-slate-500 text-sm font-medium">Your portfolio is tracking target yields perfectly: 30% at Month 2, 60% at Month 4, and 90% at Month 6.</p>
        </div>
        <Link href="/apply" className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-[#006AFF] hover:bg-[#0050CC] transition-colors py-3 px-6 rounded-xl">
          Increase Allocation <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Offering Alert */}
      <div className="bg-[#006AFF]/5 border border-[#006AFF]/20 rounded-2xl p-5 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-[#006AFF] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-bold text-[#006AFF] text-sm mb-1">Phase 1 — 12 Allocation Slots Remaining</p>
          <p className="text-slate-600 text-sm leading-relaxed">Phase 1 is 88% subscribed. The entry minimum is $10,000. Once closed, Phase 2 pricing increases. Priority extended to existing investors for 48 hours.</p>
        </div>
        <Link href="/apply" className="shrink-0 text-xs bg-white text-[#006AFF] border border-[#006AFF]/20 font-bold px-4 py-2 rounded-lg hover:bg-[#006AFF]/10 transition-colors uppercase tracking-widest hidden sm:block">
          Invest More
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-5 group hover:border-slate-300 transition-colors shadow-sm">
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
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-xl font-bold text-slate-900">Portfolio Growth</h3>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-widest outline-none px-4 py-2 rounded-lg">
              <option>2026</option>
              <option>All Time</option>
            </select>
          </div>

          {/* SVG Chart */}
          <div className="relative h-56 w-full">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#006AFF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#006AFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0,1,2,3].map(i => (
                <line key={i} x1="0" y1={50*i} x2="400" y2={50*i} stroke="#e2e8f0" strokeWidth="1" />
              ))}
              {/* Area */}
              <path d="M0,200 L0,160 C50,155 80,145 120,130 C160,115 180,100 220,80 C260,60 300,45 340,30 C360,22 380,18 400,15 L400,200 Z" fill="url(#goldGrad)" />
              {/* Line */}
              <path d="M0,160 C50,155 80,145 120,130 C160,115 180,100 220,80 C260,60 300,45 340,30 C360,22 380,18 400,15" fill="none" stroke="#006AFF" strokeWidth="2.5" strokeLinecap="round" />
              {/* Data point */}
              <circle cx="400" cy="15" r="5" fill="#006AFF" />
              <circle cx="400" cy="15" r="10" fill="#006AFF" fillOpacity="0.2" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span><span>Now</span>
            </div>
          </div>

          {/* ROI Progress Bars */}
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
            <ROIBar label="2 Months Target" value={30} max={100} />
            <ROIBar label="4 Months Target" value={60} max={100} />
            <ROIBar label="6 Months Target" value={90} max={100} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Quick Actions</p>
            <div className="space-y-2">
              {[
                { href: "/dashboard/bookings", icon: Calendar, label: "Book Priority Stay" },
                { href: "/dashboard/documents", icon: Download, label: "Download PPM" },
                { href: "/apply", icon: TrendingUp, label: "Increase Allocation" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3.5 border border-slate-200 bg-slate-50 rounded-xl text-slate-700 font-semibold hover:text-[#006AFF] hover:border-[#006AFF]/30 transition-all text-sm group"
                >
                  <Icon className="w-4 h-4 group-hover:text-[#006AFF] transition-colors" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Your Portfolio Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Positions</p>
            <div className="space-y-4">
              {PORTFOLIO.map((p) => (
                <div key={p.name} className="flex items-center justify-between gap-3">
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
            <Link href="/dashboard/portfolio" className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center text-xs text-slate-500 hover:text-[#006AFF] transition-colors font-bold uppercase tracking-widest">
              View full portfolio <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
