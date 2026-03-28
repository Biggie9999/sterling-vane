"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Home, Key, ShieldCheck, ArrowRight, CheckCircle2, Globe, Shield } from "lucide-react"

const INTENTS = [
  { value: "invest", label: "Invest in the Fund", icon: TrendingUp, desc: "Allocate capital for high-yield hospitality performance and quarterly distributions." },
  { value: "buy", label: "Property Ownership", icon: Home, desc: "Acquire direct or fractional equity in single high-value flagship assets." },
  { value: "rent", label: "Boutique Stays", icon: Key, desc: "Reserve a stay at one of our active global flagship suites." },
]

const ELIGIBILITY_OPTIONS = [
  { id: "income", label: "Annual Income", sub: ">$200k/year (or $300k joint)" },
  { id: "networth", label: "Capital Net Worth", sub: ">$1M excluding primary residence" },
  { id: "entity", label: "Institutional Entity", sub: "Corporation or Trust with >$5M assets" },
  { id: "none", label: "Other / Not Accredited", sub: "I am interested in learning more first" }
]

export default function OnboardingPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [step, setStep] = useState(1)
  const [intent, setIntent] = useState("invest")
  const [accreditation, setAccreditation] = useState("")
  const [loading, setLoading] = useState(false)

  const handleComplete = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent, accreditation, onboardingComplete: true }),
      })

      if (res.ok) {
        router.push("/marketplace")
      }
    } catch (err) {
      console.error("Onboarding failed:", err)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6 py-24 selection:bg-[#C9A84C]/30 selection:text-[#0A0A0A]">
      <div className="w-full max-w-2xl relative">
        {/* Editorial Accents */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#C9A84C]/5 blur-[100px] rounded-full" />
        
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="relative z-10"
            >
              <div className="text-center mb-16">
                <p className="font-montserrat font-bold text-[10px] uppercase tracking-[0.4em] text-[#C9A84C] mb-4">Step 01 / 02</p>
                <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#0A0A0A] mb-8 leading-[1.05] tracking-tight">
                  What is your <br /><span className="text-[#C9A84C]">primary goal?</span>
                </h1>
                <p className="text-[#8A8A8A] text-lg font-medium leading-relaxed max-w-md mx-auto">
                  Select your objective to customize your experience and view relevant assets.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 mb-16">
                {INTENTS.map((i, idx) => (
                  <label 
                    key={i.value}
                    className={`group flex items-center gap-8 p-10 border transition-all duration-700 cursor-pointer rounded-[3rem] ${intent === i.value ? "border-[#C9A84C] bg-white shadow-2xl scale-[1.02]" : "border-[#0A0A0A]/5 bg-white/50 hover:bg-white"}`}
                  >
                    <input type="radio" className="sr-only" checked={intent === i.value} onChange={() => setIntent(i.value)} />
                    
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${intent === i.value ? "bg-[#C9A84C] text-[#0A0A0A]" : "bg-[#FAF9F6] text-[#8A8A8A] group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]"}`}>
                      <i.icon className="w-8 h-8" />
                    </div>

                    <div className="flex-1">
                      <p className={`font-serif font-bold text-xl mb-1 ${intent === i.value ? "text-[#0A0A0A]" : "text-[#8A8A8A]"}`}>{i.label}</p>
                      <p className={`text-[11px] font-bold uppercase tracking-widest ${intent === i.value ? "text-[#8A8A8A]" : "text-[#8A8A8A]/60"}`}>{i.desc}</p>
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${intent === i.value ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#0A0A0A]/10"}`}>
                      {intent === i.value && <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />}
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-20 py-6 bg-[#0A0A0A] text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl group"
                >
                  Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="relative z-10"
            >
              <div className="text-center mb-16">
                <p className="font-montserrat font-bold text-[10px] uppercase tracking-[0.4em] text-[#C9A84C] mb-4">Step 02 / 02</p>
                <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#0A0A0A] mb-8 leading-[1.05] tracking-tight">
                  Verify your <br /><span className="text-[#C9A84C]">investor status.</span>
                </h1>
                <p className="text-[#8A8A8A] text-lg font-medium leading-relaxed max-w-md mx-auto">
                  Private real estate offerings are restricted to participants meeting specific income or net worth thresholds.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-16">
                {ELIGIBILITY_OPTIONS.map((opt, idx) => (
                  <label 
                    key={opt.id}
                    className={`group flex items-center justify-between p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${accreditation === opt.id ? "border-[#C9A84C] bg-white shadow-xl" : "border-[#0A0A0A]/5 bg-white/50 hover:bg-white"}`}
                  >
                    <input type="radio" className="sr-only" checked={accreditation === opt.id} onChange={() => setAccreditation(opt.id)} />
                    <div>
                      <p className={`font-serif font-bold text-lg mb-1 ${accreditation === opt.id ? "text-[#0A0A0A]" : "text-[#8A8A8A]"}`}>{opt.label}</p>
                      <p className="text-[10px] text-[#8A8A8A] font-bold uppercase tracking-widest">{opt.sub}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${accreditation === opt.id ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#0A0A0A]/10"}`}>
                      {accreditation === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />}
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button onClick={() => setStep(1)} className="text-[11px] font-bold uppercase tracking-widest text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors order-2 sm:order-1">← Back</button>
                <button 
                  onClick={handleComplete}
                  disabled={loading || !accreditation}
                  className="w-full sm:w-auto px-20 py-6 bg-[#0A0A0A] text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl disabled:opacity-20 group order-1 sm:order-2"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-[#C9A84C] border-t-white rounded-full animate-spin" /> : (
                    <>Complete Setup <CheckCircle2 className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 text-[#8A8A8A] mt-16 mt-20">
          <Shield className="w-4 h-4 text-[#C9A84C]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Secure Protocol & Verified Access</span>
        </div>
      </div>
    </div>
  )
}
