"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Wallet, ShieldCheck, Zap } from "lucide-react";

export function AlphaMath() {
  const tiers = [
    {
      month: 2,
      yield: 30,
      label: "Initial Stabilization",
      desc: "Short-term rental optimization and preliminary capital repositioning.",
      color: "from-accent/50 to-accent"
    },
    {
      month: 4,
      yield: 60,
      label: "Performance Acceleration",
      desc: "Institutional lease structures and global travel-demand peak alignment.",
      color: "from-blue-400 to-blue-600"
    },
    {
      month: 6,
      yield: 90,
      label: "Full Maturity",
      desc: "Capitalized dividend velocity and exit strategy execution.",
      color: "from-emerald-400 to-emerald-600"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-black overflow-hidden relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            Mathematical Alpha
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-bold text-white mb-6"
          >
            The Velocity Protocol
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 font-medium"
          >
            Beyond simple dividends. We engineer yield milestones to accelerate capital efficiency across a curated global portfolio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
          {/* Animated line behind tiers */}
          <div className="hidden md:block absolute top-[2.5rem] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {tiers.map((tier, idx) => (
            <motion.div 
              key={tier.month}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: "spring", damping: 20 }}
              className="relative bg-white/5 border border-white/10 p-8 sm:p-10 rounded-[2.5rem] hover:border-accent/40 transition-all group overflow-hidden"
            >
              {/* Background gradient hint */}
              <div className={`absolute bottom-[-20%] left-[-20%] w-[150%] h-[150%] bg-gradient-to-tr ${tier.color} opacity-[0.03] blur-[80px] pointer-events-none group-hover:opacity-[0.05] transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-serif text-xl font-bold text-white group-hover:bg-accent group-hover:text-black transition-colors">
                    {tier.month}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-accent transition-colors">
                    Month Milestone
                  </div>
                </div>

                <div className="mb-4">
                  <span className={`text-6xl sm:text-7xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-br ${tier.color}`}>
                    {tier.yield}%
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {tier.label}
                </h3>
                
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  {tier.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Institutional Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            { tag: "Liquidity", icon: Wallet, label: "Quarterly Exit Windows", desc: "Access liquidity events on a structured horizon." },
            { tag: "Security", icon: ShieldCheck, label: "Asset-Backed Tokens", desc: "Every share represents direct legal deeds." },
            { tag: "Alpha", icon: TrendingUp, label: "High-Beta Rental Premia", desc: "Targeting ultra-high-end concierge stays." },
            { tag: "Efficiency", icon: Zap, label: "Tax-Advantaged Yields", desc: "Leverage standard institutional structures." }
          ].map((item, idx) => (
            <motion.div 
              key={item.tag}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-widest">{item.label}</h4>
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
