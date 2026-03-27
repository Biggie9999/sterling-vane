"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  return (
    <section className="relative w-full h-[600px] md:h-[750px] flex items-center justify-center pt-24 overflow-hidden bg-slate-50">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-full"
        style={{ backgroundImage: "url('/hero.png')", backgroundPosition: "center 80%" }}
      >
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text readability */}
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        <motion.h1 
          className="font-sans font-extrabold text-4xl md:text-6xl lg:text-[5.5rem] text-white tracking-tight mb-8 drop-shadow-xl text-center leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Find your next luxury escape.
        </motion.h1>

        {/* Airbnb-style Search Pill */}
        <motion.div 
          className="bg-white rounded-full shadow-2xl p-2 md:p-3 w-full max-w-4xl flex flex-col md:flex-row items-center border border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          {/* Location */}
          <div className="flex-[1.5] w-full flex flex-col px-6 py-3 cursor-pointer hover:bg-slate-50 rounded-full transition-colors group">
            <span className="text-xs font-bold text-slate-800">Where</span>
            <input 
              type="text" 
              placeholder="Search destinations (e.g. Bali)" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && location) {
                  router.push(`/?location=${encodeURIComponent(location)}`);
                }
              }}
              className="bg-transparent text-sm text-slate-500 outline-none w-full truncate placeholder-slate-400 group-hover:bg-slate-50"
            />
          </div>

          {/* Check In */}
          <div className="flex-1 w-full flex flex-col px-6 py-3 cursor-pointer hover:bg-slate-50 rounded-full transition-colors hidden sm:flex">
            <span className="text-xs font-bold text-slate-800">Check in</span>
            <span className="text-sm text-slate-500">Add dates</span>
          </div>

          {/* Check Out */}
          <div className="flex-1 w-full flex flex-col px-6 py-3 cursor-pointer hover:bg-slate-50 rounded-full transition-colors hidden md:flex">
            <span className="text-xs font-bold text-slate-800">Check out</span>
            <span className="text-sm text-slate-500">Add dates</span>
          </div>

          {/* Guests & Search Button */}
          <div className="flex-1 w-full flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-slate-50 rounded-full transition-colors">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">Who</span>
              <span className="text-sm text-slate-500">Add guests</span>
            </div>
            <button 
              onClick={() => {
                if (location) {
                  router.push(`/?location=${encodeURIComponent(location)}`);
                }
              }}
              className="bg-[#FF385C] hover:bg-[#E31C5F] text-white p-4 rounded-full transition-colors shadow-lg flex items-center justify-center ml-2"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
