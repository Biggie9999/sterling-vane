"use client"

import { motion } from "framer-motion"
import { ArrowRight, Globe, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] border-t border-[#0A0A0A]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="relative inline-block"
        >
          <div className="absolute inset-0 bg-[#C9A84C]/10 blur-[120px] rounded-full" />
          <div className="relative z-10 px-10 py-24 sm:py-32 rounded-[4rem] border border-[#0A0A0A]/5 bg-white/50 backdrop-blur-3xl shadow-2xl">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold text-[#0A0A0A] leading-[1] tracking-tighter mb-10 max-w-4xl mx-auto">
              Ready to claim your <br />
              <span className="text-[#C9A84C]">Sovereign legacy?</span>
            </h2>
            
            <p className="text-[#8A8A8A] font-sans font-medium text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-12">
              Join an exclusive cohort of intentional capital. We are now accepting allocations for Phase 1. Round closes on slot fill.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link 
                href="/apply" 
                className="w-full sm:w-auto px-12 py-6 bg-[#0A0A0A] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#C9A84C] hover:text-black transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl"
              >
                Start Your Allocation <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link 
                href="/marketplace" 
                className="w-full sm:w-auto px-12 py-6 border border-[#0A0A0A]/10 text-[#0A0A0A] rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all duration-500"
              >
                Browse Collection
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[#8A8A8A]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none pt-0.5">International Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none pt-0.5">Secure Settlement</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
