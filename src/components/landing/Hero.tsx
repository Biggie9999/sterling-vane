"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, TrendingUp, ShieldCheck, Zap, ArrowRight, ChevronRight } from "lucide-react";

const POPULAR = ["Miami", "Saint-Tropez", "Dubai", "Aspen", "Tokyo", "London"];

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = (loc?: string) => {
    const query = loc ?? location;
    const params = new URLSearchParams();
    if (query.trim()) params.set("location", query.trim());
    router.push(`/marketplace${params.toString() ? "?" + params.toString() : ""}`);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('file:///Users/Guest/.gemini/antigravity/brain/ed4c8745-d5ff-4eb1-8779-e4b3f73bfce3/sovereign_luxury_real_estate_hero_1774704885711.png')" }}
        />
        {/* Institutional Vignette */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Copy Column */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-8"
          >
            <ShieldCheck className="w-3 h-3" /> Institutional Grade Alpha
          </motion.div>

          <motion.h1
            className="font-serif font-bold text-5xl sm:text-7xl lg:text-8xl text-white mb-8 tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Beyond Crypto.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-accent">Real World Alpha.</span>
          </motion.h1>

          <motion.p 
            className="text-white/60 text-lg sm:text-xl mb-12 max-w-2xl font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Volatility is noise. Fractional real estate is the signal. Sterling Vane re-engineers institutional-grade assets into high-velocity liquidity milestones.
          </motion.p>

          {/* Search Pill */}
          <motion.div 
            className="w-full max-w-2xl relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className={`bg-white/5 backdrop-blur-3xl border ${focused ? 'border-accent/50 ring-4 ring-accent/5 shadow-[0_0_40px_rgba(var(--accent-rgb),0.1)]' : 'border-white/10'} rounded-[2.5rem] p-2 flex items-center transition-all duration-500`}>
              <div className="flex-1 flex items-center px-6 gap-4 border-r border-white/10">
                <Search className="w-5 h-5 text-accent" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 200)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Enter market (e.g., Tokyo, Dubai)..."
                  className="w-full bg-transparent text-white font-medium placeholder-white/20 outline-none"
                />
              </div>
              <button 
                onClick={() => handleSearch()}
                className="px-8 py-4 bg-accent hover:opacity-90 text-black font-bold rounded-[2rem] transition-all flex items-center gap-2 group whitespace-nowrap"
              >
                Access Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Popular Pill Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 mt-4 px-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 mr-2">Top Performance:</span>
              {POPULAR.slice(0, 4).map(market => (
                <button 
                  key={market}
                  onClick={() => handleSearch(market)}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-accent transition-colors"
                >
                  {market}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 30-60-90 Display Column (Visual High-Yield Focus) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full lg:w-[450px] relative"
        >
          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
            
            <h3 className="text-xs font-bold text-accent uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
              <Zap className="w-4 h-4 fill-accent" /> Institutional Velocity Model
            </h3>

            <div className="space-y-10 group/list">
              {[
                { label: "Target Alpha", value: "30%", date: "Month 2", color: "text-white" },
                { label: "Performance Milestone", value: "60%", date: "Month 4", color: "text-accent/80" },
                { label: "Collection Maturity", value: "90%", date: "Month 6", color: "text-accent" },
              ].map((tier) => (
                <div key={tier.date} className="relative pl-10 border-l border-white/5 group-hover/list:border-accent/20 transition-colors">
                  <div className="absolute left-[-5px] top-1 w-[10px] h-[10px] rounded-full bg-white/10 group-hover/list:bg-accent/40 transition-colors" />
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">{tier.label}</p>
                      <p className={`text-5xl font-serif font-bold ${tier.color} leading-none`}>{tier.value}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold text-white/50 group-hover/list:text-accent transition-colors">
                      {tier.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-4 text-white/40 border-t border-white/5 pt-8">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Standardized quarterly distributions.<br />
                Asset-backed legal deeds.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ChevronRight className="rotate-90 w-6 h-6" />
      </motion.div>
    </section>
  );
}
