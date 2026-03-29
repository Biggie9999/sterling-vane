"use client"

import { Clock, Globe, Award, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CoreCompetencies() {
  return (
    <section className="py-24 sm:py-32 bg-[#F1F5F9] border-t border-slate-200 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 sm:mb-24">
          <div className="max-w-2xl">
            <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Structural Integrity</p>
            <h2 className="font-serif text-5xl sm:text-7xl text-[#0F172A] leading-[0.9] tracking-tighter">
              Institutional <br />Foundation.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-600 font-medium text-lg sm:text-xl leading-relaxed">
              Our model is built on physical underpinnings, not market sentiment. We operate with complete vertical integration.
            </p>
          </div>
        </div>

        {/* ── PILLARS: Horizontal Swipe on Mobile ── */}
        <div className="flex flex-row flex-nowrap lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-8 lg:pb-0 snap-x snap-mandatory lg:snap-none">
          {[
            {
              icon: Clock,
              title: "Legacy",
              desc: "Three decades of institutional execution in primary global hubs."
            },
            {
              icon: Award,
              title: "Experience",
              desc: "Deep expertise in luxury repositioning and hospitality operations."
            },
            {
              icon: Globe,
              title: "Network",
              desc: "Proprietary off-market deal flow within exclusive family office circles."
            },
            {
              icon: ShieldCheck,
              title: "Integrity",
              desc: "SEC Reg D compliance with absolute transparency in reporting."
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[80vw] sm:w-[320px] lg:w-full group flex flex-col items-start p-10 rounded-[3rem] bg-white border border-slate-200 hover:border-[#2563EB]/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-colors duration-500">
                <pillar.icon className="w-6 h-6 text-[#0F172A] group-hover:text-white transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#0F172A] mb-4">{pillar.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
           <Link href="/about" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#0F172A] hover:text-[#2563EB] transition-colors">
             Learn More About Our Foundation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  )
}
