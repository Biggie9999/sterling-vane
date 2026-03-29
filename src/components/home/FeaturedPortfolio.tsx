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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {properties.map((prop, i) => (
             <motion.div
               key={prop.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.8 }}
               className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#0F172A]/5 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-700"
             >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                   <img 
                     src={prop.images[0]} 
                     alt={prop.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                   />
                   {/* Always-visible type badge */}
                   <div className="absolute top-4 left-4">
                      <div className="px-3 py-1.5 bg-[#0F172A]/70 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                         {prop.type === "Principal" ? "Direct Access" : "Venture Asset"}
                      </div>
                   </div>
                   {/* Always-visible yield badge */}
                   <div className="absolute top-4 right-4">
                      <div className="px-3 py-1.5 bg-[#2563EB] text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                         {prop.targetYield}% yield
                      </div>
                   </div>
                   {/* Gradient overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                   <div>
                      <h3 className="text-xl font-serif font-bold text-[#0F172A] leading-tight">{prop.name}</h3>
                      <p className="text-[#64748B] text-xs font-medium mt-1 flex items-center gap-1.5">
                         <MapPin className="w-3 h-3 text-[#2563EB] shrink-0" /> {prop.location}
                      </p>
                   </div>

                   <div className="flex items-center justify-between pt-4 border-t border-[#0F172A]/5">
                      <div>
                         <p className="text-[9px] font-bold text-[#2563EB] uppercase tracking-widest mb-1">Status</p>
                         <p className="text-xs font-bold text-[#0F172A]">{prop.status}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-bold text-[#2563EB] uppercase tracking-widest mb-1">Min Entry</p>
                         <p className="text-xs font-bold text-[#0F172A]">$10,000</p>
                      </div>
                      <Link 
                        href={`/marketplace?id=${prop.id}`}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#0F172A] hover:text-[#2563EB] transition-colors group/link"
                      >
                        View <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}
