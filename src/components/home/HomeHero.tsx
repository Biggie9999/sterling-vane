"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Compass, ShieldCheck, Globe, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax transforms for that "Elite" feel
  const y1 = useTransform(scrollY, [0, 800], [0, 300])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020817]"
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
              backgroundImage: "url('/hero.png')",
            }}
          />
        </motion.div>
        
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/80 via-[#020817]/40 to-[#020817]" />
        <div className="absolute inset-0 bg-[#2563EB]/10 mix-blend-overlay" />
      </div>

      {/* Main Content: Dark Elite Aesthetic */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col items-center text-center">
        
        {/* Elite Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-dark border border-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-12 shadow-2xl"
        >
          <ShieldCheck className="w-4 h-4 text-[#60A5FA]" /> 
          Global Asset Registry • FY24
        </motion.div>

        {/* Bold Minimalist Typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-serif font-bold text-white leading-[0.9] tracking-tighter mb-10 drop-shadow-2xl">
            Invest in the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#2563EB] italic pr-4">Exceptional.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-white/70 font-sans text-lg sm:text-2xl font-normal leading-relaxed mb-16 max-w-3xl tracking-tight drop-shadow-lg"
        >
          Sterling Vane optimizes the world's most desired residential assets into precision-engineered liquidity milestones.
        </motion.p>

        {/* Action Suite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link 
            href="/login?mode=signup" 
            className="w-full sm:w-auto px-12 py-6 bg-[#2563EB] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs hover:bg-white hover:text-[#020817] shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all duration-500 flex items-center justify-center gap-4 group"
          >
            Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/marketplace" 
            className="w-full sm:w-auto px-12 py-6 glass-dark border border-white/10 text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-4"
          >
            <Compass className="w-5 h-5" /> The Collection
          </Link>
        </motion.div>
      </div>

      {/* Dynamic Data Floating Layer */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-12 right-12 z-20 hidden 2xl:block"
      >
        <div className="glass-dark p-8 rounded-[2.5rem] w-[20rem] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-4 h-4 text-[#60A5FA]" />
            <p className="text-[9px] font-bold text-white/50 uppercase tracking-[0.3em]">Institutional Feed</p>
          </div>
          
          <div className="space-y-5">
            <div>
              <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Market Capitalization</p>
              <p className="text-3xl font-serif font-bold text-white tracking-tighter">$1.24B</p>
            </div>
            
            <div className="pt-5 border-t border-white/10 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest mb-1">Avg Yield</p>
                <p className="text-base font-serif font-bold text-[#60A5FA]">12.4%</p>
              </div>
              <div>
                <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest mb-1">Status</p>
                <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Scaling</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-[#60A5FA] via-[#2563EB]/40 to-transparent" />
      </motion.div>
    </section>
  )
}
