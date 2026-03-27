"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

const POPULAR = ["Miami, FL", "Los Angeles, CA", "Aspen, CO", "New York, NY", "Palm Beach, FL", "Tulum, Mexico"]

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (loc?: string) => {
    const query = loc || location;
    if (!query.trim()) { inputRef.current?.focus(); return; }
    router.push(`/marketplace?location=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#006AFF] animate-pulse" />
          The Sovereign Collection
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-serif font-bold text-[2.6rem] leading-[1.1] sm:text-6xl md:text-7xl text-white mb-5 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hyper-growth yields<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-[#006AFF]">in luxury real estate.</span>
        </motion.h1>

        {/* Subtitle — hidden on smallest mobile to save space */}
        <motion.p
          className="hidden sm:block text-white/85 text-base sm:text-xl mb-10 max-w-2xl font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Fractional investing re-engineered. Buy into exclusive global properties and capture targeted structural alpha over 6 months.
        </motion.p>

        {/* 30/60/90 ROI PANEL - fully horizontal on mobile, no stacking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-2xl mb-8 sm:mb-10"
        >
          <div className="grid grid-cols-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {/* Month 2 */}
            <div className="flex flex-col items-center justify-center py-5 sm:py-7 px-3 border-r border-white/15">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-white leading-none mb-2">30%</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Target Yield</span>
              <span className="bg-[#006AFF] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Month 2</span>
            </div>
            {/* Month 4 - highlighted */}
            <div className="flex flex-col items-center justify-center py-5 sm:py-7 px-3 border-r border-white/15 bg-white/5">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-[#60a5fa] leading-none mb-2">60%</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Target Yield</span>
              <span className="bg-[#006AFF] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Month 4</span>
            </div>
            {/* Month 6 - peak */}
            <div className="flex flex-col items-center justify-center py-5 sm:py-7 px-3">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-[#006AFF] leading-none mb-2">90%</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Target Yield</span>
              <span className="bg-emerald-500 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Month 6</span>
            </div>
          </div>
          <div className="flex items-start sm:items-center justify-center gap-2 mt-3 px-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-[10px] sm:text-xs text-white/60 font-medium tracking-wide text-left sm:text-center">
              Standardized milestones on fully stabilized luxury assets. Quarterly distributions.
            </p>
          </div>
        </motion.div>

        {/* Search Box */}
        <motion.div
          className="w-full max-w-2xl relative z-20"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Input Row */}
            <div className="flex items-center px-5 py-4 gap-3 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search markets (Miami, Aspen, Tokyo...)"
                className="flex-1 bg-transparent text-base font-medium text-slate-900 outline-none placeholder-slate-400 min-w-0"
              />
              {location && (
                <button onClick={() => setLocation("")} className="p-1.5 bg-slate-100 rounded-full text-slate-500 shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {/* Action Row */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 flex flex-wrap gap-2">
                {POPULAR.slice(0, 3).map(p => (
                  <button key={p} onMouseDown={() => handleSearch(p)} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#006AFF] hover:bg-blue-50 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-full transition-colors">
                    <MapPin className="w-2.5 h-2.5" /> {p.split(",")[0]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleSearch()}
                className="shrink-0 bg-[#006AFF] hover:bg-[#0050CC] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                Search <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {focused && location.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 4 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
              >
                <div className="p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Markets</p>
                  {POPULAR.filter(p => p.toLowerCase().includes(location.toLowerCase())).map((p) => (
                    <button
                      key={p}
                      onMouseDown={() => { setLocation(p); handleSearch(p); }}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#006AFF] transition-colors text-left"
                    >
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {p}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {['SEC Reg D', 'Quarterly Distributions', 'Blockchain Verified'].map(tag => (
            <span key={tag} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/55 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
