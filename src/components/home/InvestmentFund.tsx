"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

const TIER_CARDS = [
  {
    name: "Essential",
    min: "$10,000",
    roi: "12.4%",
    features: [
      "Quarterly cash distributions",
      "Standard booking access",
      "Real-time performance tracking",
      "Quarterly market reports"
    ],
    popular: false
  },
  {
    name: "Premium",
    min: "$50,000",
    roi: "14.8%",
    features: [
      "Priority booking access",
      "15% off nightly rates",
      "First right of refusal",
      "Tax documentation support"
    ],
    popular: true
  },
  {
    name: "Elite",
    min: "$250,000+",
    roi: "Dynamic",
    features: [
      "Dedicated account manager",
      "Bespoke allocation terms",
      "Advisory board access",
      "Direct asset acquisition"
    ],
    popular: false
  }
]

export function InvestmentFund() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-6 bg-[#2563EB]" />
              <p className="text-[#64748B] font-sans font-bold text-[10px] uppercase tracking-[0.4em]">Preferred Tiers</p>
            </div>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-[#0F172A] leading-[1.05]">
               The Rental <br />
               <span className="text-[#2563EB]">Venture Fund.</span>
            </h2>
          </div>
          <div className="lg:max-w-xs">
            <p className="text-[#64748B] font-sans text-base font-medium leading-relaxed">
              Curated access to Sovereign-level yields. Choose the tier that aligns with your portfolio goals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {TIER_CARDS.map((tier, i) => (
             <motion.div
                key={tier.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`flex flex-col p-12 rounded-[3.5rem] border transition-all duration-700 hover:shadow-2xl relative ${tier.popular ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-[#F8FAFC] border-[#0F172A]/5 hover:bg-white"}`}
             >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#2563EB] text-[#0F172A] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg">
                    Highest Growth
                  </div>
                )}
                
                <div className="mb-12">
                   <p className={`font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-4 ${tier.popular ? "text-[#2563EB]" : "text-[#64748B]"}`}>{tier.name} ACCESS</p>
                   <p className="text-4xl font-serif font-bold mb-3">{tier.min}</p>
                   <p className={tier.popular ? "text-white/40 text-[11px] font-bold uppercase tracking-widest" : "text-[#64748B] text-[11px] font-bold uppercase tracking-widest"}>Minimum Capital</p>
                </div>

                <div className={`mb-12 p-8 rounded-3xl ${tier.popular ? "bg-white/5 border border-white/10" : "bg-white border border-[#0F172A]/5 shadow-sm"}`}>
                   <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${tier.popular ? "text-white/40" : "text-[#64748B]"}`}>Target Yield</p>
                   <p className="text-4xl font-serif font-bold text-[#2563EB]">{tier.roi}</p>
                </div>

                <div className="space-y-5 mb-16 flex-1">
                   {tier.features.map(f => (
                     <div key={f} className="flex items-center gap-4">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${tier.popular ? "text-[#2563EB]" : "text-[#2563EB]"}`} />
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${tier.popular ? "text-white/70" : "text-[#0F172A]/60"}`}>{f}</span>
                     </div>
                   ))}
                </div>

                <Link 
                  href="/apply"
                  className={`w-full py-6 rounded-2xl font-bold uppercase tracking-widest text-[11px] transition-all duration-500 flex items-center justify-center gap-3 group shadow-xl ${tier.popular ? "bg-[#2563EB] text-[#0F172A] hover:bg-white hover:text-[#0F172A]" : "bg-[#0F172A] text-white hover:bg-[#2563EB] hover:text-[#0F172A]"}`}
                >
                  Start Investing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}
