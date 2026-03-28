"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Compass, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"

export function HomeHero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-[#FAF9F6]">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: "url('file:///Users/Guest/.gemini/antigravity/brain/ed4c8745-d5ff-4eb1-8779-e4b3f73bfce3/sovereign_flagship_daylight_ivory_hero_1774719881968.png')" }}
        />
        {/* Sophisticated Ivory Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/40 via-transparent to-[#FAF9F6]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/80 via-[#FAF9F6]/20 to-transparent hidden lg:block" />
      </div>

      {/* Main Narrative Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-[#C9A84C]/20 text-[#C9A84C] text-[9px] font-bold uppercase tracking-[0.4em] mb-10 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Institutional Asset Stabilization
          </motion.div>

          {/* Core Thesis Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.4 }}
            className="text-6xl sm:text-8xl lg:text-9xl font-serif font-bold text-[#0A0A0A] leading-[0.95] tracking-tight mb-10"
          >
            The Sovereign<br />
            <span className="italic font-light text-[#0A0A0A]/30">Collection.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="text-[#0A0A0A]/60 font-sans text-xl sm:text-2xl font-medium leading-relaxed mb-14 max-w-xl"
          >
            Volatility is noise. Tangible alpha is the signal. <br className="hidden sm:block" />
            Sterling Vane re-engineers elite residential assets into high-velocity liquidity milestones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link 
              href="/apply" 
              className="w-full sm:w-auto px-12 py-6 bg-[#0A0A0A] text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#C9A84C] hover:text-white transition-all duration-700 flex items-center justify-center gap-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] group"
            >
              Inquire for Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/marketplace" 
              className="group w-full sm:w-auto px-12 py-6 glass-ivory text-[#0A0A0A] rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all duration-700 flex items-center justify-center gap-4"
            >
              <Compass className="w-4 h-4" /> Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating Flagship Data Card (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute bottom-16 right-12 z-20 hidden lg:block"
      >
        <div className="glass-ivory p-8 rounded-[2.5rem] w-80 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/10 blur-3xl rounded-full" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.4em]">Live Flagship</p>
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-[#0A0A0A] mb-2 leading-none">The Ivory Manor</h3>
          <p className="text-[10px] font-bold text-[#0A0A0A]/40 uppercase tracking-widest mb-8">Malibu, California</p>
          
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#0A0A0A]/5">
            <div>
              <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1">Target Yield</p>
              <p className="text-xl font-serif font-bold text-[#0A0A0A]">14.2%</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1">Status</p>
              <p className="text-[10px] font-bold text-[#0A0A0A] uppercase tracking-[0.1em]">Fundraising</p>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-between group-hover:translate-x-1 transition-transform cursor-pointer">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A]">View Performance</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A84C]" />
          </div>
        </div>
      </motion.div>

      {/* Scroll Discovery */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-3"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#C9A84C] to-transparent" />
        <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]">The Thesis</span>
      </motion.div>
    </section>
  )
}
