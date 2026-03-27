"use client"

import Link from "next/link"
import { Home, Key, TrendingUp, ArrowRight, ShieldCheck, Zap } from "lucide-react"

export function CoreCompetencies() {
  return (
    <section className="bg-slate-50 py-24 border-b border-slate-100 relative overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#006AFF]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#006AFF] font-bold text-xs uppercase tracking-widest mb-4">Platform Ecosystem</p>
          <h2 className="text-slate-900 font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-6">Explore the full spectrum of modern real estate.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Buy */}
          <div className="flex flex-col">
            <Link href="/marketplace?tab=buy" className="group flex-1 bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#006AFF]/5 transition-all duration-500 shadow-sm">
                  <Home className="w-7 h-7 text-slate-700 group-hover:text-[#006AFF] transition-colors" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">Buy a home</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                  Find your dream primary residence or vacation home with our immersive data rooms, cutting-edge virtual tours, and off-market inventory.
                </p>
              </div>
              <span className="inline-flex items-center text-slate-900 font-bold group-hover:text-[#006AFF] transition-colors">
                Browse listings <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Invest - Center Highlight */}
          <div className="flex flex-col md:-mt-6 md:mb-6 z-20">
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
                <p className="text-slate-300 font-medium leading-relaxed mb-8 text-lg">
                  Access institutional-grade fractional assets. Earn passive yield with standardized, targeted 30/60/90 return milestones and quarterly distributions.
                </p>
                <div className="flex items-center gap-4 mb-8">
                   <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-400/10 px-3 py-1.5 rounded-full"><ShieldCheck className="w-3.5 h-3.5" /> SEC Compliant</span>
                </div>
              </div>
              <span className="relative z-10 inline-flex items-center justify-center w-full bg-[#006AFF] text-white py-4 rounded-xl font-bold text-sm tracking-widest uppercase group-hover:bg-blue-500 transition-colors shadow-lg">
                Start Investing Today
              </span>
            </Link>
          </div>

          {/* Rent */}
          <div className="flex flex-col">
            <Link href="/marketplace?tab=book" className="group flex-1 bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#006AFF]/5 transition-all duration-500 shadow-sm">
                  <Key className="w-7 h-7 text-slate-700 group-hover:text-[#006AFF] transition-colors" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">Reserve a stay</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                  Skip traditional hotels. Stay in fully-furnished, deeply vetted luxury fractional homes across the globe. Unmatched privacy and amenities.
                </p>
              </div>
              <span className="inline-flex items-center text-slate-900 font-bold group-hover:text-[#006AFF] transition-colors">
                Find rentals <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
