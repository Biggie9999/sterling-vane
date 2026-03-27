"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, TrendingUp, CheckCircle2 } from "lucide-react";

const POPULAR = ["Miami, FL", "Los Angeles, CA", "Aspen, CO", "New York, NY", "Palm Beach, FL", "Malibu, CA"]

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (loc?: string) => {
    const query = loc || location;
    if (!query.trim()) {
      inputRef.current?.focus();
      return;
    }
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
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full mb-8 shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#006AFF] animate-pulse" />
          The Sovereign Collection
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hyper-growth yields in <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-[#006AFF]">luxury real estate.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/90 text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl font-medium leading-relaxed drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Fractional investing re-engineered. Buy into exclusive global properties and capture targeted structural alpha that scales aggressively over a 6-month timeline.
        </motion.p>

        {/* Core Value Proposition (30/60/90) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#006AFF]/20 via-transparent to-[#006AFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/20 w-full mb-6">
            
            <div className="flex-1 flex flex-col items-center text-center px-4 py-2 sm:py-0 w-full">
              <span className="text-4xl sm:text-5xl font-serif font-bold text-white mb-2 tracking-tight group-hover:text-blue-100 transition-colors">30%</span>
              <span className="text-[#006AFF] bg-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm">Month 2</span>
            </div>

            <div className="flex-1 flex flex-col items-center text-center px-4 py-4 sm:py-0 w-full">
              <span className="text-4xl sm:text-5xl font-serif font-bold text-white mb-2 tracking-tight group-hover:text-blue-100 transition-colors">60%</span>
              <span className="text-[#006AFF] bg-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm">Month 4</span>
            </div>

            <div className="flex-1 flex flex-col items-center text-center px-4 pt-4 sm:py-0 sm:pt-0 w-full">
              <span className="text-4xl sm:text-5xl font-serif font-bold text-white mb-2 tracking-tight group-hover:text-[#006AFF] transition-colors">90%</span>
              <span className="text-white bg-[#006AFF] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-md border border-[#0050CC]">Month 6</span>
            </div>
            
          </div>
          <div className="flex items-center justify-center gap-2 max-w-xl mx-auto border-t border-white/10 pt-5">
             <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
             <p className="text-xs sm:text-sm text-white/80 font-medium tracking-wide">
               Institutional arbitrage. Standardized, guaranteed milestones on fully stabilized luxury assets.
             </p>
          </div>
        </motion.div>

        {/* Search Engine */}
        <motion.div
          className="w-full max-w-4xl relative z-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white rounded-[2rem] shadow-2xl p-2.5 flex flex-col sm:flex-row items-center gap-2 border-[4px] border-white/20 backdrop-blur-md relative z-30">
            <div className="flex-1 flex items-center w-full px-5 py-3 relative group">
              <Search className="w-6 h-6 text-slate-400 group-focus-within:text-[#006AFF] transition-colors shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Where do you want to invest? (e.g. Miami, Aspen, Tokyo)"
                className="w-full bg-transparent text-lg font-medium text-slate-900 outline-none placeholder-slate-400 ml-4 placeholder:font-medium"
              />
              {location && (
                <button 
                  onClick={() => setLocation("")} 
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => handleSearch()}
              className="w-full sm:w-auto bg-[#006AFF] hover:bg-[#0050CC] text-white font-bold text-sm uppercase tracking-[0.15em] px-10 py-5 rounded-[1.5rem] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0"
            >
              Analyze Markets
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 12, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-full left-0 right-0 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 z-50 overflow-hidden"
              >
                 <div className="p-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 py-3 mb-2 border-b border-slate-100">Popular Markets</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {POPULAR.filter(p => !location || p.toLowerCase().includes(location.toLowerCase())).map((p) => (
                      <button
                        key={p}
                        onMouseDown={() => { setLocation(p); handleSearch(p); }}
                        className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-base font-semibold text-slate-700 hover:bg-[#F4F7FA] hover:text-[#006AFF] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#006AFF]/10 flex items-center justify-center shrink-0 transition-colors">
                          <MapPin className="w-5 h-5 text-slate-500 group-hover:text-[#006AFF] transition-colors" />
                        </div>
                        {p}
                      </button>
                    ))}
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Feature Tags */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {['SEC Reg D Compliant', 'Quarterly Distributions', 'Blockchain Verified'].map(tag => (
            <span key={tag} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/60 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
