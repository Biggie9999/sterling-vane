"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, ArrowRight, Zap, Target, ShieldCheck } from "lucide-react"

import { DEMO_PROPERTIES } from "@/data/properties"

function SovereignCard({ p }: { p: typeof DEMO_PROPERTIES[0] }) {
  return (
    <Link href={`/properties/${p.id}`} className="group relative flex-shrink-0 w-[85vw] sm:w-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all duration-500 block">
      {/* Image Wrap */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={p.images[0]}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* Market Badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          <MapPin className="w-3 h-3 text-accent" /> {p.location}
        </div>

        {/* Status Badge */}
        <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-accent text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          <Zap className="w-3 h-3 fill-black" /> {p.status}
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h3 className="text-white font-serif text-3xl mb-1 leading-tight">{p.name}</h3>
          <p className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Institutional {p.type} Class</p>
          
          <div className="flex items-center gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1.5 font-bold">Share Entry</p>
              <p className="text-white font-serif text-xl">${p.pricePerShare.toLocaleString()}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1.5 font-bold">Target Alpha</p>
              <p className="text-accent font-serif text-xl">{p.targetYield}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Yield Milestone Strip */}
      <div className="bg-white/[0.02] px-8 py-4 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-2 group-hover:text-accent transition-colors">
          <Target className="w-3 h-3 text-white/30 group-hover:text-accent" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white">Milestone Engine</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[10px] font-bold text-white/20">30%</span>
          <span className="text-[10px] font-bold text-white/20">60%</span>
          <span className="text-[10px] font-bold text-accent">90%</span>
        </div>
      </div>
    </Link>
  )
}

export function FeaturedCollection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="bg-black py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              The Sovereign Collection
            </motion.div>
            <h2 className="font-serif text-5xl sm:text-7xl text-white leading-tight">
              Institutional Grade.<br />
              <span className="text-white/40">Fractional Access.</span>
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-white/50 text-base max-w-sm ml-auto mb-8 leading-relaxed font-medium">
              A curated ledger of 30 global luxury assets. Every property is selected for its high-velocity rental premium and capital appreciation lock.
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
            >
              View Full Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scrolling Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-8 px-6 sm:px-[calc((100vw-1280px)/2+24px)] overflow-x-auto scrollbar-hide pb-12"
          style={{ scrollbarWidth: "none" }}
        >
          {DEMO_PROPERTIES.map((p, idx) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex-shrink-0"
            >
              <SovereignCard p={p} />
            </motion.div>
          ))}
        </div>
        
        {/* Fade effects on edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>

      {/* Trust & Stats Strip */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {[
          { icon: Zap, label: "Asset Velocity", value: "30-90%" },
          { icon: Target, label: "Execution Alpha", value: "Institutional" },
          { icon: ShieldCheck, label: "Trust Protocol", value: "SEC Reg D" },
          { icon: MapPin, label: "Global Presence", value: "30 Markets" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center">
            <stat.icon className="w-5 h-5 text-accent mb-3" />
            <p className="text-white font-serif text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
