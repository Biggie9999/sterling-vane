"use client"

import { motion } from "framer-motion"
import { TrendingUp, ArrowRight, TrendingDown } from "lucide-react"
import Link from "next/link"

const TIERS = [
  {
    label: "2 Months",
    pct: -30,
    bar: 30,
    color: "#EF4444",
    bgColor: "bg-red-500",
    textColor: "text-red-500",
    icon: <TrendingDown className="w-4 h-4" />,
    desc: "Early stabilization phase",
  },
  {
    label: "4 Months",
    pct: 60,
    bar: 60,
    color: "#2563EB",
    bgColor: "bg-[#2563EB]",
    textColor: "text-[#2563EB]",
    icon: <TrendingUp className="w-4 h-4" />,
    desc: "Velocity acceleration",
  },
  {
    label: "6 Months",
    pct: 90,
    bar: 90,
    color: "#0F172A",
    bgColor: "bg-[#0F172A]",
    textColor: "text-[#0F172A]",
    icon: <TrendingUp className="w-4 h-4" />,
    desc: "Full yield maturity",
  },
]

export function ROICalculator() {
  return (
    <div className="bg-white border border-[#0F172A]/5 rounded-3xl sm:rounded-[3rem] p-6 sm:p-16 shadow-2xl shadow-[#2563EB]/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/5 blur-[120px] pointer-events-none group-hover:bg-[#2563EB]/10 transition-colors duration-1000" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 lg:items-center">
        {/* Left: copy */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#2563EB]/10 rounded-full mb-8">
            <TrendingUp className="w-4 h-4 text-[#2563EB]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">Performance Projection</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-serif font-bold text-[#0F172A] mb-6 leading-[1.05]">
            Invest in <br />
            <span className="text-[#2563EB]">Excellence.</span>
          </h2>

          <p className="text-[#64748B] font-sans text-base font-medium leading-relaxed mb-10 max-w-sm">
            Our capital program follows a phased performance cycle — early stabilization, acceleration, and full maturity yield across a 6-month horizon.
          </p>

          <Link
            href="/apply"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#0F172A] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#2563EB] transition-all duration-500 shadow-xl"
          >
            Start Your Allocation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: projection tiers */}
        <div className="lg:w-[480px] space-y-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#0F172A]/5 hover:border-[#2563EB]/20 transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`${tier.textColor}`}>{tier.icon}</span>
                  <p className="text-sm font-bold text-[#0F172A]">{tier.label}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-serif font-bold ${tier.textColor}`}>
                    {tier.pct > 0 ? "+" : ""}{tier.pct}%
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">return</span>
                </div>
              </div>

              {/* Bar */}
              <div className="w-full bg-[#0F172A]/5 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tier.bar}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 + 0.3, ease: "easeOut" }}
                  className={`h-full rounded-full ${tier.bgColor}`}
                />
              </div>

              <p className="text-[10px] font-medium text-[#64748B] uppercase tracking-widest mt-3">{tier.desc}</p>
            </motion.div>
          ))}

          <p className="text-[10px] text-[#64748B]/60 leading-relaxed uppercase tracking-widest font-medium px-1 pt-2">
            Projections are indicative targets based on historical execution data. Past performance is not a guarantee of future returns.
          </p>
        </div>
      </div>
    </div>
  )
}
