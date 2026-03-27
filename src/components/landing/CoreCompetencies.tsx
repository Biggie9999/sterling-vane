"use client"

import Link from "next/link"
import { Home, Key, TrendingUp, ArrowRight, ShieldCheck, Zap, ChevronRight } from "lucide-react"

export function CoreCompetencies() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-100 relative overflow-hidden">
      {/* Subtle background glow - desktop only */}
      <div className="hidden sm:block absolute top-0 right-0 w-[500px] h-[500px] bg-[#006AFF]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16">
          <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Platform Ecosystem</p>
          <h2 className="text-slate-900 font-serif text-3xl sm:text-5xl font-bold tracking-tight">One platform. Three ways to win.</h2>
        </div>

        {/* MOBILE: Vertical stack with invest highlighted */}
        <div className="flex flex-col gap-4 sm:hidden">
          {/* Invest — BIG, first on mobile */}
          <Link href="/apply" className="group relative bg-[#0A2540] p-7 rounded-3xl border border-slate-700 overflow-hidden flex flex-col gap-5 active:scale-[0.98] transition-transform">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#006AFF]/25 rounded-full blur-[60px] pointer-events-none" />
            <div className="flex items-start justify-between relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#006AFF] flex items-center justify-center shadow-xl border border-blue-400/30">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1.5 bg-[#006AFF] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                <Zap className="w-2.5 h-2.5 fill-white" /> Top Pick
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Invest for yield</h3>
              <p className="text-slate-300 text-sm font-medium leading-relaxed mb-5">
                Earn passive yield with standardized 30/60/90 return milestones and quarterly distributions. Starting at $10,000.
              </p>
              <div className="flex items-center gap-2 mb-5">
                <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase tracking-widest bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full"><ShieldCheck className="w-3 h-3" /> SEC Compliant</span>
              </div>
              <div className="w-full bg-[#006AFF] text-white py-4 rounded-xl font-bold text-xs tracking-widest uppercase text-center shadow-lg">
                Start Investing Today
              </div>
            </div>
          </Link>

          {/* Buy + Rent — side by side on mobile */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/marketplace?tab=buy" className="group bg-slate-50 border border-slate-200 p-5 rounded-3xl flex flex-col gap-4 active:scale-[0.97] transition-transform">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <Home className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 leading-tight">Buy a home</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Off-market luxury homes with immersive data rooms.</p>
              </div>
              <span className="flex items-center text-[#006AFF] text-xs font-bold mt-auto">
                Browse <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </Link>

            <Link href="/marketplace?tab=book" className="group bg-slate-50 border border-slate-200 p-5 rounded-3xl flex flex-col gap-4 active:scale-[0.97] transition-transform">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <Key className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 leading-tight">Reserve a stay</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Live in vetted luxury fractional homes globally.</p>
              </div>
              <span className="flex items-center text-[#006AFF] text-xs font-bold mt-auto">
                Explore <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* DESKTOP: Three columns, Invest raised in center */}
        <div className="hidden sm:grid grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">

          {/* Buy */}
          <Link href="/marketplace?tab=buy" className="group bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#006AFF]/5 transition-all duration-500 shadow-sm">
                <Home className="w-7 h-7 text-slate-700 group-hover:text-[#006AFF] transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">Buy a home</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                Find your dream primary residence or vacation home with immersive data rooms, virtual tours, and off-market inventory.
              </p>
            </div>
            <span className="inline-flex items-center text-slate-900 font-bold group-hover:text-[#006AFF] transition-colors">
              Browse listings <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Invest — Center, elevated */}
          <div className="flex flex-col -mt-6 mb-0 z-20">
            <Link href="/apply" className="group flex-1 bg-[#0A2540] p-8 lg:p-10 rounded-3xl border border-slate-700 hover:border-[#006AFF] hover:shadow-[0_20px_60px_-15px_rgba(0,106,255,0.4)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#006AFF]/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#006AFF]/40 transition-colors duration-700" />
              <div className="absolute top-6 right-6">
                <div className="flex items-center gap-1.5 bg-[#006AFF] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  <Zap className="w-3 h-3 fill-white" /> Recommended
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-[#006AFF] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl border border-blue-400/30">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-4">Invest for yield</h3>
                <p className="text-slate-300 font-medium leading-relaxed mb-6 text-lg">
                  Access institutional-grade fractional assets. Earn passive yield with our standardized 30/60/90 return milestones and quarterly distributions.
                </p>
                <div className="flex items-center gap-3 mb-8">
                  <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-400/10 px-3 py-1.5 rounded-full"><ShieldCheck className="w-3.5 h-3.5" /> SEC Compliant</span>
                </div>
              </div>
              <span className="relative z-10 inline-flex items-center justify-center w-full bg-[#006AFF] text-white py-4 rounded-xl font-bold text-sm tracking-widest uppercase group-hover:bg-blue-500 transition-colors shadow-lg">
                Start Investing Today
              </span>
            </Link>
          </div>

          {/* Rent */}
          <Link href="/marketplace?tab=book" className="group bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#006AFF]/5 transition-all duration-500 shadow-sm">
                <Key className="w-7 h-7 text-slate-700 group-hover:text-[#006AFF] transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">Reserve a stay</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-8">
                Skip traditional hotels. Stay in fully-furnished, deeply vetted luxury fractional homes across the globe.
              </p>
            </div>
            <span className="inline-flex items-center text-slate-900 font-bold group-hover:text-[#006AFF] transition-colors">
              Find rentals <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

        </div>
      </div>
    </section>
  )
}
