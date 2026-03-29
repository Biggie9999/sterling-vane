"use client"

import { ArrowRight, Globe, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 bg-[#F8FAFC] border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="relative inline-block w-full">
          <div className="absolute inset-0 bg-[#2563EB]/5 blur-[120px] rounded-full" />
          <div className="relative z-10 px-6 py-24 sm:py-32 rounded-[4rem] border border-slate-200 bg-white/50 backdrop-blur-3xl shadow-xl">
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-serif font-bold text-[#0F172A] leading-[0.85] tracking-tighter mb-12 max-w-5xl mx-auto">
              Ready to claim your <br />
              <span className="text-[#2563EB] italic">legacy?</span>
            </h2>
            
            <p className="text-[#64748B] font-sans font-medium text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed mb-16">
              Join an exclusive cohort of intentional capital. Phase 1 allocations are closing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link 
                href="/apply" 
                className="w-full sm:w-auto px-12 py-6 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#2563EB] transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl"
              >
                Get Started Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/marketplace" 
                className="w-full sm:w-auto px-12 py-6 border border-slate-200 text-[#0F172A] rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all duration-500"
              >
                Browse Collection
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 text-[#64748B]">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] leading-none pt-0.5">Global Reach</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] leading-none pt-0.5">Verified SEC Reg D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
