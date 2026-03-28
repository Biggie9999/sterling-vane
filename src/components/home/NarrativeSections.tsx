"use client"

import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Globe2, Home, Layers, PieChart, ShieldCheck, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1.5, ease: "easeOut" }
}

export function NarrativeSections() {
  return (
    <div className="bg-[#FAF9F6] relative">
      {/* 01 | The Inefficiency Gap */}
      <section className="py-32 lg:py-48 px-6 sm:px-12 border-b border-[#0A0A0A]/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...FADE_UP}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]">The Inefficiency Gap</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-serif font-bold text-[#0A0A0A] leading-tight mb-10">
              Most luxury assets sit <span className="italic font-light text-[#0A0A0A]/30">empty 80% of the year.</span>
            </h2>
            <p className="text-[#0A0A0A]/60 text-lg sm:text-xl font-medium leading-relaxed max-w-xl">
              Traditional real estate is a game of slow settlement and low velocity. Sterling Vane identifies premium residential vacancies and transforms them into elite short-term hospitality flagships. 
            </p>
          </motion.div>
          
          <motion.div 
             {...FADE_UP}
             className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden group shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
               <div className="flex items-center gap-6">
                  <div>
                    <p className="text-4xl font-serif font-bold text-white">80%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Average Vacancy</p>
                  </div>
                  <div className="h-10 w-[1px] bg-white/20" />
                  <div>
                    <p className="text-4xl font-serif font-bold text-[#C9A84C]">24.5%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Sovereign Yield Alpha</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 | The Stabilization Cycle */}
      <section className="py-32 lg:py-48 px-6 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...FADE_UP} className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C] mb-8 block">Operational Alpha</span>
            <h2 className="text-5xl sm:text-7xl font-serif font-bold text-[#0A0A0A] leading-tight mb-10">
              The 90-Day <span className="italic font-light text-[#0A0A0A]/30">Velocity Model.</span>
            </h2>
            <p className="text-[#8A8A8A] text-lg font-medium">
              We don't just hold assets. We manufacture equity. Our proprietary stabilization cycle takes an under-utilized property to a cash-flowing flagship in under a quarter.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 sm:gap-16">
            {[
              {
                icon: <Globe2 className="w-6 h-6" />,
                title: "Acquisition",
                desc: "Data-driven targeting of distressed or under-managed trophies in global Tier-one markets.",
                step: "01"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Stabilization",
                desc: "High-spec interior optimization and integration into the Sovereign hospitality engine.",
                step: "02"
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Distribution",
                desc: "Fractional tokenization and automated quarterly yield distribution to our global partners.",
                step: "03"
              }
            ].map((phase, i) => (
              <motion.div 
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.3 }}
                className="relative p-10 rounded-[2.5rem] bg-[#FAF9F6] border border-[#0A0A0A]/5 hover:border-[#C9A84C]/30 transition-all duration-700 group"
              >
                <div className="absolute top-8 right-10 text-5xl font-serif font-bold text-[#0A0A0A]/5 group-hover:text-[#C9A84C]/10 transition-colors">
                  {phase.step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#C9A84C] shadow-sm mb-8">
                  {phase.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0A0A0A] mb-4">{phase.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-[#8A8A8A]">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 | Global Expansion Presentation */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-40">
           <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div {...FADE_UP}>
            <h2 className="text-5xl sm:text-8xl font-serif font-bold text-white leading-[0.9] mb-12">
              The World is Your <br />
              <span className="italic font-light text-white/30">Stablecoin.</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
              {[
                { label: "Assets Controlled", value: "$450M+" },
                { label: "Target Alpha", value: "20.1%" },
                { label: "Markets Active", value: "14" }
              ].map(stat => (
                <div key={stat.label} className="text-center">
                   <p className="text-4xl sm:text-6xl font-serif font-bold text-[#C9A84C] mb-2">{stat.value}</p>
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link 
              href="/marketplace" 
              className="inline-flex items-center gap-4 mt-20 px-12 py-6 bg-white text-[#0A0A0A] rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#C9A84C] hover:text-white transition-all duration-700 shadow-2xl"
            >
              Access the Map <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
