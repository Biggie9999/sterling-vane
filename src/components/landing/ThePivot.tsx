"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, ShieldCheck, Zap, Coins, Building2 } from "lucide-react";

const COMPARISONS = [
  {
    category: "Asset Class",
    crypto: { label: "Digital Fragments", icon: Coins, desc: "Speculative tokens without underlying value." },
    realEstate: { label: "Sovereign Realty", icon: Building2, desc: "Fractional ownership of global luxury assets." }
  },
  {
    category: "Risk Profile",
    crypto: { label: "Extreme Volatility", icon: TrendingDown, desc: "Susceptible to market manipulation and hype." },
    realEstate: { label: "Stabilized Velocity", icon: ShieldCheck, desc: "Asset-backed stability with institutional de-risking." }
  },
  {
    category: "Yield Engine",
    crypto: { label: "Staking Noise", icon: Zap, desc: "Inflationary rewards based on network activity." },
    realEstate: { label: "Cash Velocity", icon: TrendingUp, desc: "Direct distribution from short-term rental yields." }
  }
];

export function ThePivot() {
  return (
    <section className="py-24 sm:py-32 bg-black overflow-hidden relative">
      {/* Visual background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              The Great Rotation
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-serif font-bold text-white leading-[1.1]"
            >
              Beyond Volatility.<br />
              <span className="text-white/40 italic">Into Reality.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-md pb-2"
          >
            Digital speculation is the past. Institutional-grade real estate velocity is the future. We bridge the gap between asset-backed trust and fractional efficiency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
          {COMPARISONS.map((item, idx) => (
            <motion.div 
              key={item.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-10 border-b border-white/10 pb-4">
                {item.category}
              </h4>
              
              <div className="space-y-12">
                <div className="relative pl-8 border-l border-white/5 opacity-40 group-hover:opacity-60 transition-opacity">
                  <div className="absolute left-[-5px] top-1 w-[10px] h-[10px] rounded-full bg-white/20" />
                  <div className="flex items-center gap-3 mb-3">
                    <item.crypto.icon className="w-5 h-5 text-white/40" />
                    <span className="text-sm font-bold text-white/60 uppercase tracking-widest">{item.crypto.label}</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed font-medium">{item.crypto.desc}</p>
                </div>

                <div className="relative pl-8 border-l border-accent/30 shadow-[0_0_20px_rgba(var(--accent-rgb),0.05)]">
                  <div className="absolute left-[-5px] top-1 w-[10px] h-[10px] rounded-full bg-accent animate-pulse shadow-[0_0_10px_theme(colors.accent.DEFAULT)]" />
                  <div className="flex items-center gap-3 mb-3">
                    <item.realEstate.icon className="w-5 h-5 text-accent" />
                    <span className="text-sm font-bold text-white uppercase tracking-widest">{item.realEstate.label}</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-medium">{item.realEstate.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
