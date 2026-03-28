"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Compass, ShieldCheck, Globe, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax transforms for that "Elite" feel
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAF9F6] pt-20"
    >
      {/* Immersive Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/Users/Guest/.gemini/antigravity/brain/fb81b28b-73d7-420d-b46f-5e2b6d6820f6/hero_coastal_apple_style_1774730028586.png')",
              filter: "contrast(1.05) brightness(0.95)"
            }}
          />
        </motion.div>
        
        {/* Apple-style Gradient Washes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/20 via-transparent to-[#FAF9F6]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/30 to-transparent hidden lg:block" />
      </div>

      {/* Main Content: Modern Minimalism */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-4xl">
          {/* Elite Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-3xl border border-black/[0.03] text-black text-[10px] font-bold uppercase tracking-[0.4em] mb-12 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" /> 
            Global Asset Registry • FY24
          </motion.div>

          {/* Bold Minimalist Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl sm:text-8xl lg:text-[10rem] font-serif font-bold text-[#0A0A0A] leading-[0.85] tracking-tighter mb-12">
              Invest in the <br />
              <span className="text-[#C9A84C] italic pr-4">Exceptional.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-[#0A0A0A]/70 font-sans text-xl sm:text-2xl font-normal leading-relaxed mb-16 max-w-2xl tracking-tight"
          >
            Sterling Vane optimizes the world's most desired residential assets into precision-engineered liquidity milestones.
          </motion.p>

          {/* Action Suite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link 
              href="/login?mode=signup" 
              className="w-full sm:w-auto px-12 py-6 bg-[#0A0A0A] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl group"
            >
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/marketplace" 
              className="w-full sm:w-auto px-12 py-6 bg-white/40 backdrop-blur-3xl border border-black/[0.03] text-[#0A0A0A] rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all duration-500 flex items-center justify-center gap-4"
            >
              <Compass className="w-4 h-4" /> The Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Data Floating Layer */}
      <motion.div
        style={{ y: y2 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="absolute bottom-24 right-12 z-20 hidden lg:block"
      >
        <div className="bg-white/80 backdrop-blur-3xl p-10 rounded-[3rem] w-[22rem] border border-black/[0.03] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/10 blur-[60px] rounded-full" />
          
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-4 h-4 text-[#C9A84C]" />
            <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-[0.3em]">Institutional Feed</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-2 opacity-50">Market Capitalization</p>
              <p className="text-4xl font-serif font-bold text-[#0A0A0A] tracking-tighter">$1.24B</p>
            </div>
            
            <div className="pt-6 border-t border-black/[0.05] grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1 opacity-50">Avg Yield</p>
                <p className="text-lg font-serif font-bold text-[#C9A84C]">12.4%</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1 opacity-50">Status</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Scaling</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex items-center justify-between group-hover:translate-x-1 transition-transform cursor-pointer">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]">Live Ledger Access</span>
            <ArrowUpRight className="w-4 h-4 text-[#C9A84C]" />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#C9A84C] via-[#C9A84C]/20 to-transparent" />
      </motion.div>
    </section>
  )
}
