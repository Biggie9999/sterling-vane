"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, ChevronRight, Gavel, Globe2, Heart, PieChart, ShieldCheck, TrendingUp, Zap } from "lucide-react"

const STEPS = [
  {
    id: "vision",
    title: "Define your Vision",
    subtitle: "Select your primary architectural and financial focus.",
    options: [
      { id: "yield", icon: <TrendingUp className="w-5 h-5 text-[#2563EB]" />, label: "High-Yield Income", desc: "Quaterly distributions from core hospitality." },
      { id: "growth", icon: <Zap className="w-5 h-5 text-[#2563EB]" />, label: "Capital Appreciation", desc: "Long-term secondary value from development." },
      { id: "lifestyle", icon: <Heart className="w-5 h-5 text-[#2563EB]" />, label: "Strategic Booking", desc: "Exclusive access to stay in Sovereign assets." }
    ]
  },
  {
    id: "liquidity",
    title: "Partner Profile",
    subtitle: "Identify your liquidity tier for allocation priority.",
    options: [
      { id: "retail", icon: <PieChart className="w-5 h-5 text-[#2563EB]" />, label: "Sovereign Tier", desc: "Allocations from $1k - $25k." },
      { id: "accredited", icon: <ShieldCheck className="w-5 h-5 text-[#2563EB]" />, label: "Precision Tier", desc: "Allocations from $25k - $100k+." },
      { id: "institutional", icon: <Gavel className="w-5 h-5 text-[#2563EB]" />, label: "Institutional Tier", desc: "Allocations $250k+ with custom terms." }
    ]
  },
  {
    id: "market",
    title: "Global Focus",
    subtitle: "Which markets align with your portfolio thesis?",
    options: [
      { id: "tokyo", icon: <Globe2 className="w-5 h-5 text-[#2563EB]" />, label: "Pacific / Tokyo", desc: "High stability, sophisticated growth." },
      { id: "miami", icon: <Zap className="w-5 h-5 text-[#2563EB]" />, label: "The Americas", desc: "Aggressive yields, high-velocity tourism." },
      { id: "london", icon: <ShieldCheck className="w-5 h-5 text-[#2563EB]" />, label: "European Core", desc: "Historic resilience and generational alpha." }
    ]
  }
]

export function PartnerOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [isFinished, setIsFinished] = useState(false)

  const handleSelect = (optionId: string) => {
    setSelections({ ...selections, [STEPS[currentStep].id]: optionId })
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 600)
    } else {
      setTimeout(() => setIsFinished(true), 600)
    }
  }

  const step = STEPS[currentStep]

  return (
    <section className="py-24 lg:py-48 px-6 sm:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-8 block">Partner Onboarding — Step {currentStep + 1} of 3</span>
              <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#0F172A] leading-tight mb-4">
                {step.title}
              </h2>
              <p className="text-[#64748B] text-lg font-medium mb-16">
                {step.subtitle}
              </p>

              <div className="flex flex-col gap-4 text-left">
                {step.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`group flex items-center justify-between p-8 rounded-[2rem] border transition-all duration-700 ${
                      selections[step.id] === option.id 
                        ? "bg-[#2563EB]/5 border-[#2563EB] shadow-lg" 
                        : "bg-[#F8FAFC] border-[#0F172A]/5 hover:border-[#2563EB]/30 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {option.icon}
                      </div>
                      <div>
                        <p className="font-serif text-xl font-bold text-[#0F172A]">{option.label}</p>
                        <p className="text-[10px] uppercase font-bold text-[#64748B] tracking-widest mt-1">{option.desc}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                       selections[step.id] === option.id 
                        ? "bg-[#2563EB] border-[#2563EB] text-white" 
                        : "border-[#0F172A]/10 text-transparent"
                    }`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full max-w-2xl text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#2563EB] flex items-center justify-center text-white mb-10 shadow-2xl">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-5xl sm:text-7xl font-serif font-bold text-[#0F172A] leading-tight mb-8">
                Your Presentation <span className="italic font-light text-[#0F172A]/30">is Curated.</span>
              </h2>
              <p className="text-[#0F172A]/60 text-xl font-medium mb-16 max-w-lg leading-relaxed">
                Based on your profile, we have identified $24M in active allocations that align with your portfolio thesis. 
              </p>

              <div className="p-10 rounded-[3rem] bg-[#F8FAFC] border border-[#0F172A]/5 w-full mb-16 flex flex-col gap-6 text-left shadow-xl">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#64748B]">Thesis Match</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB]">98% Confidence</p>
                 </div>
                 <div className="h-[1px] w-full bg-[#0F172A]/5" />
                 <div className="grid grid-cols-3 gap-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] mb-1">Focus</p>
                        <p className="text-sm font-bold text-[#0F172A] uppercase">{selections.vision}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] mb-1">Tier</p>
                        <p className="text-sm font-bold text-[#0F172A] uppercase">{selections.liquidity}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] mb-1">Market</p>
                        <p className="text-sm font-bold text-[#0F172A] uppercase">{selections.market}</p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                <button 
                  onClick={() => (window.location.href = '/login?mode=signup')}
                  className="flex-1 py-6 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl flex items-center justify-center gap-4 hover:bg-[#2563EB] transition-all duration-700"
                >
                  Create Account <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                   onClick={() => setIsFinished(false)}
                   className="px-10 py-6 border border-[#0F172A]/10 text-[#0F172A] rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all duration-700"
                >
                  Reset Focus
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
