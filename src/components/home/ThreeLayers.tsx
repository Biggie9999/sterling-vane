"use client"

import { motion } from "framer-motion"
import { TrendingUp, Home, Key, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const LAYERS = [
  {
    num: "01",
    label: "INVEST",
    title: "Venture Fund",
    desc: "Join a high-performance fund focused on the world's most profitable hospitality markets. Target institutional-grade yields with zero overhead.",
    icon: TrendingUp,
    link: "/apply",
    cta: "Start Investing"
  },
  {
    num: "02",
    label: "BUY",
    title: "Marketplace",
    desc: "Acquire direct ownership of premium residential assets. View full financial histories and connect with elite local agents.",
    icon: Home,
    link: "/marketplace",
    cta: "View Properties"
  },
  {
    num: "03",
    label: "BOOK",
    title: "Hospitality",
    desc: "Experience the portfolio firsthand. Book a stay at any of our active flagships and enjoy exclusive member-only nightly rates.",
    icon: Key,
    link: "/marketplace?tab=book",
    cta: "Book Private Stay"
  }
]

export function ThreeLayers() {
  return (
    <section className="py-24 sm:py-32 bg-[#F6F5F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-6 bg-[#2563EB]" />
              <p className="text-[#64748B] font-montserrat font-bold text-[10px] uppercase tracking-[0.4em]">The Ecosystem</p>
            </div>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-[#0F172A] leading-[1.05]">
               One Platform.<br />
               <span className="text-[#2563EB]">Three Ways to Engage.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-[#0F172A]/5 border border-[#0F172A]/5 rounded-[3rem] overflow-hidden shadow-2xl shadow-[#2563EB]/5">
           {LAYERS.map((layer, i) => (
             <motion.div
               key={layer.num}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.8 }}
               className="bg-[#F8FAFC] p-12 lg:p-16 hover:bg-white transition-all duration-500 group flex flex-col justify-between"
             >
               <div>
                  <div className="flex items-center justify-between mb-20">
                     <span className="text-5xl font-serif font-bold text-[#0F172A]/5 group-hover:text-[#2563EB]/20 transition-colors duration-500">{layer.num}</span>
                     <div className="p-5 bg-white rounded-3xl group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500 shadow-sm border border-[#0F172A]/5">
                        <layer.icon className="w-6 h-6 text-[#2563EB] group-hover:text-white" />
                     </div>
                  </div>
                  
                  <p className="text-[#64748B] font-montserrat font-bold text-[10px] uppercase tracking-[0.3em] mb-4 group-hover:text-[#2563EB] transition-colors">{layer.label}</p>
                  <h3 className="text-3xl font-serif font-bold text-[#0F172A] mb-5">{layer.title}</h3>
                  <p className="text-[#64748B] font-sans text-base font-medium leading-relaxed max-w-[280px] mb-16">{layer.desc}</p>
               </div>

               <Link 
                 href={layer.link}
                 className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#0F172A] group-hover:text-[#2563EB] group-hover:translate-x-3 transition-all duration-500"
               >
                 {layer.cta} <ArrowUpRight className="w-4 h-4" />
               </Link>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}
