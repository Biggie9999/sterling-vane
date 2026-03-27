"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, TrendingUp, CheckCircle2, ArrowRight, SlidersHorizontal, Home, Key, ChevronRight } from "lucide-react";

const POPULAR = ["Miami, FL", "Los Angeles, CA", "Aspen, CO", "New York, NY", "Tulum, Mexico", "Tokyo, Japan"]
const TYPES = [
  { label: "Invest", value: "invest", icon: TrendingUp, desc: "Earn yield via fractional ownership" },
  { label: "Buy", value: "buy", icon: Home, desc: "Browse luxury properties for sale" },
  { label: "Rent", value: "rent", icon: Key, desc: "Reserve a short-term luxury stay" },
]

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("invest");
  const [focused, setFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (mobileSearchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileSearchOpen]);

  const handleSearch = (loc?: string, t?: string) => {
    const query = loc ?? location;
    const searchType = t ?? type;
    const params = new URLSearchParams();
    if (query.trim()) params.set("location", query.trim());
    if (searchType && searchType !== "invest") params.set("type", searchType);
    setMobileSearchOpen(false);
    router.push(`/marketplace${params.toString() ? "?" + params.toString() : ""}`);
  };

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#006AFF] animate-pulse" />
          The Sovereign Collection
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-serif font-bold text-[2.6rem] leading-[1.1] sm:text-6xl md:text-7xl text-white mb-5 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hyper-growth yields<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-[#006AFF]">in luxury real estate.</span>
        </motion.h1>

        <motion.p className="hidden sm:block text-white/85 text-base sm:text-xl mb-10 max-w-2xl font-medium leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
          Fractional investing re-engineered. Buy into exclusive global properties and earn structured yield in 6 months.
        </motion.p>

        {/* 30/60/90 Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-2xl mb-8 sm:mb-10">
          <div className="grid grid-cols-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col items-center justify-center py-5 sm:py-7 px-3 border-r border-white/15">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-white leading-none mb-2">30%</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Target Yield</span>
              <span className="bg-[#006AFF] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Month 2</span>
            </div>
            <div className="flex flex-col items-center justify-center py-5 sm:py-7 px-3 border-r border-white/15 bg-white/5">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-[#60a5fa] leading-none mb-2">60%</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Target Yield</span>
              <span className="bg-[#006AFF] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Month 4</span>
            </div>
            <div className="flex flex-col items-center justify-center py-5 sm:py-7 px-3">
              <span className="text-3xl sm:text-5xl font-serif font-bold text-[#006AFF] leading-none mb-2">90%</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Target Yield</span>
              <span className="bg-emerald-500 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Month 6</span>
            </div>
          </div>
          <div className="flex items-start sm:items-center justify-center gap-2 mt-3 px-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-[10px] sm:text-xs text-white/60 font-medium text-left sm:text-center">
              Standardized milestones on fully stabilized luxury assets. Quarterly distributions.
            </p>
          </div>
        </motion.div>

        {/* ─────────── MOBILE: Tap-to-open search pill ─────────── */}
        <motion.div className="w-full max-w-sm sm:hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="w-full bg-white rounded-2xl shadow-2xl flex items-center gap-3 px-5 py-4 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#006AFF] flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 text-sm truncate">{location || "Where do you want to invest?"}</p>
              <p className="text-slate-400 text-xs font-medium capitalize">{type} · All Markets</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-slate-600" />
            </div>
          </button>
        </motion.div>

        {/* ─────────── DESKTOP: Inline search bar ─────────── */}
        <motion.div className="hidden sm:block w-full max-w-3xl relative z-20"
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          {/* Type tabs */}
          <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 mb-3 w-fit mx-auto">
            {TYPES.map(t => (
              <button key={t.value} onClick={() => setType(t.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${type === t.value ? "bg-white text-slate-900 shadow-md" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-visible relative">
            <div className="flex items-center px-5 py-5 gap-4">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={`Search markets for ${type === "invest" ? "investment" : type === "buy" ? "purchase" : "short-term stay"}…`}
                className="flex-1 bg-transparent text-base font-medium text-slate-900 outline-none placeholder-slate-400 min-w-0"
              />
              {location && (
                <button onClick={() => setLocation("")} className="p-1.5 bg-slate-100 rounded-full text-slate-500 shrink-0">
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="w-px h-8 bg-slate-200 shrink-0" />
              <button onClick={() => handleSearch()}
                className="shrink-0 bg-[#006AFF] hover:bg-[#0050CC] text-white font-bold text-sm px-7 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>

            {/* Quick market pills */}
            <div className="px-5 pb-4 pt-0 flex flex-wrap gap-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center mr-1">Popular:</span>
              {POPULAR.slice(0, 5).map(p => (
                <button key={p} onMouseDown={() => handleSearch(p)}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-[#006AFF] hover:bg-blue-50 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-full transition-colors">
                  <MapPin className="w-2.5 h-2.5" /> {p.split(",")[0]}
                </button>
              ))}
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {focused && location.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 4 }} exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                  <div className="p-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 border-b border-slate-100 mb-1">Matching Markets</p>
                    {POPULAR.filter(p => p.toLowerCase().includes(location.toLowerCase())).map((p) => (
                      <button key={p} onMouseDown={() => { setLocation(p); handleSearch(p); }}
                        className="flex items-center justify-between w-full px-3 py-3.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#006AFF] transition-colors text-left group">
                        <span className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#006AFF]/10 flex items-center justify-center shrink-0 transition-colors">
                            <MapPin className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#006AFF] transition-colors" />
                          </div>
                          {p}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#006AFF] transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div className="flex flex-wrap items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}>
          {['SEC Reg D', 'Quarterly Distributions', 'Blockchain Verified'].map(tag => (
            <span key={tag} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/55 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" /> {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─────────── MOBILE: Full-screen search modal ─────────── */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[70]"
              onClick={() => setMobileSearchOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[80] bg-white rounded-t-[2rem] shadow-2xl overflow-hidden"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>

              <div className="px-5 pb-8 pt-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-xl font-bold text-slate-900">Search Properties</h3>
                  <button onClick={() => setMobileSearchOpen(false)}
                    className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Type selector */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">I want to…</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {TYPES.map(t => (
                    <button key={t.value} onClick={() => setType(t.value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${type === t.value ? "border-[#006AFF] bg-[#006AFF]/5" : "border-slate-200 bg-slate-50"}`}>
                      <t.icon className={`w-6 h-6 ${type === t.value ? "text-[#006AFF]" : "text-slate-500"}`} />
                      <span className={`text-xs font-bold ${type === t.value ? "text-[#006AFF]" : "text-slate-700"}`}>{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Location input */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Location</p>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 gap-3 mb-4 focus-within:border-[#006AFF] focus-within:ring-2 focus-within:ring-[#006AFF]/20 transition-all">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="City, market, or property name…"
                    autoFocus
                    className="flex-1 bg-transparent text-base font-medium text-slate-900 outline-none placeholder-slate-400"
                  />
                  {location && (
                    <button onClick={() => setLocation("")} className="p-1 bg-slate-200 rounded-full text-slate-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Popular Markets */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Popular Markets</p>
                <div className="grid grid-cols-2 gap-2 mb-8">
                  {POPULAR.map(p => (
                    <button key={p} onClick={() => { setLocation(p); handleSearch(p); }}
                      className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-[#006AFF] hover:text-[#006AFF] hover:bg-blue-50 active:scale-95 transition-all text-left">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-[#006AFF]" />
                      </div>
                      <span className="truncate">{p}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleSearch()}
                  className="w-full bg-[#006AFF] text-white py-5 rounded-2xl font-bold text-base tracking-wide shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <Search className="w-5 h-5" />
                  Search {type === "invest" ? "Investments" : type === "buy" ? "Properties for Sale" : "Rentals"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
