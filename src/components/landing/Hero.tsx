"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, X } from "lucide-react";

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
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          The Sovereign Collection
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Own a piece of the <br className="hidden sm:block" />
          <span className="text-[#C9A84C]">world's most desired homes.</span>
        </motion.h1>

        <motion.p
          className="text-white/80 text-base sm:text-xl mb-12 max-w-2xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Buy fractional shares in premium vacation rentals. Earn passive income and enjoy exclusive owner stays.
        </motion.p>



        {/* Search Box */}
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Desktop: simple elegant bar */}
          <div className="hidden sm:flex bg-white rounded-full shadow-2xl overflow-hidden border border-white/10 mt-4 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center px-6 py-4 relative group">
              <Search className="w-5 h-5 text-[#888] mr-3 group-focus-within:text-[#C9A84C] transition-colors" />
              <input
                ref={inputRef}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search markets, zip codes, or property names..."
                className="bg-transparent text-base font-medium text-[#1a1a1a] outline-none placeholder-[#888] w-full"
              />
              
              <AnimatePresence>
                {focused && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden"
                  >
                     <div className="p-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Popular Markets</p>
                        {POPULAR.filter(p => !location || p.toLowerCase().includes(location.toLowerCase())).map((p) => (
                          <button
                            key={p}
                            onMouseDown={() => { setLocation(p); handleSearch(p); }}
                            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                          >
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            {p}
                          </button>
                        ))}
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleSearch()}
              className="bg-[#C9A84C] hover:bg-[#b8942f] text-[#1a1a1a] font-bold px-10 py-4 transition-all text-sm uppercase tracking-widest rounded-full"
            >
              Search
            </button>
          </div>

          {/* Mobile: stacked card */}
          <div className="sm:hidden bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 mt-4">
            <div className="flex items-center gap-3 px-5 py-5">
              <Search className="w-5 h-5 text-[#C9A84C] shrink-0" />
              <div className="flex-1">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search markets or properties..."
                  className="bg-transparent text-base font-medium text-[#1a1a1a] outline-none placeholder-[#888] w-full"
                />
              </div>
              {location && (
                <button onClick={() => setLocation("")} className="text-slate-400 bg-slate-100 rounded-full p-1">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="px-4 py-4">
              <button
                onClick={() => handleSearch()}
                className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8942f] text-white font-semibold py-3.5 rounded-xl transition-all text-sm"
              >
                <Search className="w-4 h-4" />
                Search Properties
              </button>
            </div>
          </div>

          {/* Popular locations */}
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {POPULAR.slice(0, 4).map((p) => (
              <button
                key={p}
                onClick={() => handleSearch(p)}
                className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full transition-all"
              >
                <MapPin className="w-3 h-3" /> {p}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
