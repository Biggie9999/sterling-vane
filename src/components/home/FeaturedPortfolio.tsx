"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, MapPin, Building2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { DEMO_PROPERTIES } from "@/data/properties"

export function FeaturedPortfolio() {
  const properties = DEMO_PROPERTIES.slice(0, 3)

  return (
    <section className="py-16 sm:py-32 bg-[#F6F5F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-6 bg-[#2563EB]" />
              <p className="text-[#64748B] font-sans font-bold text-[10px] uppercase tracking-[0.4em]">The Destinations</p>
            </div>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-[#0F172A] leading-[1.05]">
               Elite Assets.<br />
               <span className="text-[#2563EB]">Performance Driven.</span>
            </h2>
          </div>
          <div className="lg:max-w-xs">
            <Link 
              href="/marketplace"
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#0F172A] hover:text-[#2563EB] transition-colors group"
            >
              Explore Full Collection <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {properties.map((prop, i) => (
             <motion.div
               key={prop.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.8 }}
               className="group flex flex-col bg-white rounded-[3rem] overflow-hidden border border-[#0F172A]/5 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700"
             >
                <div className="aspect-[4/5] relative overflow-hidden">
                   <img 
                     src={prop.images[0]} 
                     alt={prop.name}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                   />
                   <div className="absolute top-8 left-8 flex gap-3">
                      <div className="px-5 py-2 bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                         {prop.market}
                      </div>
                      <div className="px-5 py-2 bg-white/80 backdrop-blur-md text-[#0F172A] text-[10px] font-bold uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-700">
                         {prop.type === "Principal" ? "Direct Access" : "Venture Asset"}
                      </div>
                   </div>
                   <div className="absolute bottom-4 left-4 right-4 p-4 sm:bottom-8 sm:left-8 sm:right-8 sm:p-6 bg-white/90 backdrop-blur-xl rounded-2xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 pointer-events-none border border-white/20 shadow-2xl">
                      <div className="flex justify-between items-center text-[#0F172A]">
                         <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">Target Yield</p>
                         <p className="text-2xl font-serif font-bold text-[#2563EB]">{prop.targetYield}%</p>
                      </div>
                   </div>
                </div>

                <div className="p-8 sm:p-12 flex flex-col items-center text-center">
                   <h3 className="text-3xl font-serif font-bold text-[#0F172A] mb-3">{prop.name}</h3>
                   <p className="text-[#64748B] text-sm font-medium mb-10 flex items-center justify-center gap-2 tracking-wide"><MapPin className="w-4 h-4 text-[#2563EB]" /> {prop.location}</p>
                   
                   <div className="w-full pt-10 border-t border-[#0F172A]/5 grid grid-cols-2 gap-10 mb-6">
                      <div className="text-left">
                         <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-2">Status</p>
                         <p className="text-sm font-bold text-[#0F172A]">{prop.status}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-2">Min Entry</p>
                         <p className="text-sm font-bold text-[#0F172A]">$10,000</p>
                      </div>
                   </div>

                   <Link 
                     href={`/marketplace?id=${prop.id}`}
                     className="mt-8 text-[11px] font-bold uppercase tracking-widest text-[#0F172A] hover:text-[#2563EB] transition-all flex items-center gap-2 group/link"
                   >
                     View Financials <ArrowUpRight className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                   </Link>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}
