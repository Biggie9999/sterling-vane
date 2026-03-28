"use client"

import { motion } from "framer-motion"
import { ShieldCheck, GraduationCap, History, Globe } from "lucide-react"

export function AboutSterlingVane() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:items-center">
          <div className="relative">
             <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10 group border border-[#0A0A0A]/5">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
                  alt="Modern Architecture"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute bottom-12 left-12 p-8 bg-white/90 backdrop-blur-xl border border-white/20 rounded-[2.5rem] opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 shadow-2xl">
                   <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1 text-[#C9A84C]">Principal & Founder</p>
                   <p className="text-3xl font-serif font-bold text-[#0A0A0A]">Sterling Vane</p>
                </div>
             </div>
             {/* Decorative element */}
             <div className="absolute -top-12 -left-12 w-48 h-48 border-t-[1px] border-l-[1px] border-[#C9A84C] rounded-tl-[4rem] opacity-30" />
             <div className="absolute -bottom-12 -right-12 w-48 h-48 border-b-[1px] border-r-[1px] border-[#C9A84C] rounded-br-[4rem] opacity-30" />
          </div>

          <div>
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FAF9F6] border border-[#0A0A0A]/5 rounded-full mb-10">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">Elite Expertise</span>
             </div>
             
             <h2 className="text-5xl sm:text-6xl font-serif font-bold text-[#0A0A0A] mb-10 leading-[1.05]">
                Global Vision. <br />
                <span className="text-[#C9A84C]">Elite Execution.</span>
             </h2>

             <div className="space-y-8 text-[#8A8A8A] font-sans font-medium text-lg mb-16 max-w-xl leading-relaxed text-left">
                <p className="italic text-[#0A0A0A]">
                  "We don't just acquire property. We build financial ecosystems around the world's most exclusive residential destinations. Precision is our standard; excellence is our baseline."
                </p>
                <p>
                  Sterling Vane is the culmination of a decade spent refining the intersection of luxury hospitality and high-yield real estate. We believe in transparency, speed, and the power of elite design to drive outsized returns.
                </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: GraduationCap, label: "Legacy", sub: "Harvard M.Arch & Real Estate" },
                  { icon: History, label: "Experience", sub: "10-Year Track Record" },
                  { icon: Globe, label: "Network", sub: "Global Asset Access" },
                  { icon: ShieldCheck, label: "Integrity", sub: "Institutional Standards" }
                ].map(item => (
                  <div key={item.label} className="flex flex-col gap-3 p-8 bg-[#FAF9F6] border border-[#0A0A0A]/5 rounded-3xl hover:bg-white transition-all duration-500 shadow-sm group">
                     <div className="w-10 h-10 rounded-2xl bg-white border border-[#0A0A0A]/5 flex items-center justify-center group-hover:bg-[#C9A84C] group-hover:text-white transition-all duration-500">
                        <item.icon className="w-5 h-5 text-[#8A8A8A] group-hover:text-white transition-colors" />
                     </div>
                     <div>
                        <p className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-[#8A8A8A] text-[10px] font-bold uppercase tracking-widest">{item.sub}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
