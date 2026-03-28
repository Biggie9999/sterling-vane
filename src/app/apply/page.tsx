"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, Lock, CheckCircle2, Copy, Building2,
  Globe, Hash, CreditCard, AlertCircle, Clock, Mail,
  TrendingUp, Home, Key, MapPin, ShieldCheck, ArrowRight, Info, Zap, Shield
} from "lucide-react"

import { DEMO_PROPERTIES } from "@/data/properties"

const WIRE_DETAILS = {
  bankName: "JPMorgan Chase Bank, N.A.",
  routingNumber: "021000021",
  accountNumber: "734-825-9160",
  accountName: "Sterling Vane Development Group LLC",
  swiftCode: "CHASUS33",
  bankAddress: "383 Madison Avenue, New York, NY 10017",
  minimumAmount: 10000,
  maximumAmount: 5000000,
}

type Step = 0 | 1 | 2

const STEPS = ["Amount", "Verification", "Transfer"]

function ApplyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  const prefillId = searchParams.get("propertyId") || searchParams.get("property")

  const [step, setStep] = useState<Step>(0)
  const [selectedPropertyId, setSelectedPropertyId] = useState(prefillId || "")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ shares: "1", eligibility: "" })
  const [copied, setCopied] = useState<string | null>(null)
  const [dbProperties, setDbProperties] = useState<any[]>([])

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties")
        const data = await res.json()
        if (Array.isArray(data)) {
          setDbProperties(data)
          if (!prefillId && data.length > 0) {
            setSelectedPropertyId(data[0].id)
          } else if (prefillId) {
             setSelectedPropertyId(prefillId)
          }
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err)
      }
    }
    fetchProperties()
  }, [prefillId])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?mode=signup")
    }
  }, [status, router])

  const selectedProperty = dbProperties.find(p => p.id === selectedPropertyId) || dbProperties[0] || DEMO_PROPERTIES[0]
  const update = (field: string, value: string | boolean) => setForm(f => ({ ...f, [field]: value }))
  
  const handleCopy = (text: string, field: string) => { 
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000) 
  }

  const sharesNum = Math.max(1, parseInt(form.shares) || 1)
  const totalAmount = sharesNum * (selectedProperty?.pricePerShare || 0)
  const minShares = Math.ceil(WIRE_DETAILS.minimumAmount / (selectedProperty?.pricePerShare || 1000))

  const userAccreditation = (session?.user as any)?.accreditation || "none"

  const handleApply = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/investments/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: selectedProperty.id,
          amount: totalAmount,
          shares: sharesNum,
          accreditation: form.eligibility || userAccreditation
        })
      })
      const data = await res.json()
      if (res.ok) {
        setStep(2)
      } else {
        throw new Error(data.error || "Submission failed")
      }
    } catch (err: any) {
      alert(err.message || "Failed to initiate investment.")
    } finally {
      setLoading(false)
    }
  }

  const handleContinueFromShares = () => {
    if (userAccreditation !== "none") {
      handleApply()
    } else {
      setStep(1)
    }
  }

  const userName = session?.user?.name || "Sterling Investor"
  const refLastName = userName.split(" ").slice(-1)[0] || "INV"
  const wireReference = `SV-${refLastName.toUpperCase()}-${Date.now().toString().slice(-4)}`

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-6 mb-20 max-w-lg mx-auto lg:mx-0">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col gap-3">
              <div className={`h-[2px] rounded-full transition-all duration-1000 ${i <= step ? "bg-[#C9A84C]" : "bg-[#0A0A0A]/5"}`} />
              <p className={`text-[10px] font-bold uppercase tracking-[0.3em] font-sans transition-all duration-700 ${i === step ? "text-[#0A0A0A] opacity-100" : "text-[#8A8A8A] opacity-40"}`}>
                {s}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1 max-w-2xl">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div 
                   key="step0"
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 10 }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-12">
                    <p className="font-montserrat font-bold text-[10px] uppercase tracking-[0.4em] text-[#C9A84C] mb-4">Investment Allocation</p>
                    <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#0A0A0A] mb-10 leading-[1.05] tracking-tight">
                      Confirm your <br />
                      <span className="text-[#C9A84C]">Investment.</span>
                    </h1>
                  </div>

                  <div className="bg-white rounded-[3.5rem] border border-[#0A0A0A]/5 p-12 lg:p-14 shadow-sm mb-12">
                     <div className="flex items-center gap-8 mb-14 pb-14 border-b border-[#FAF9F6]">
                        <div className="w-28 h-28 rounded-3xl overflow-hidden shrink-0 shadow-xl border border-[#0A0A0A]/5">
                           <img src={selectedProperty?.images?.[0]} className="w-full h-full object-cover" alt="Asset" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-[0.4em] mb-2">{selectedProperty?.market} Active Asset</p>
                           <h3 className="text-3xl font-serif font-bold text-[#0A0A0A] mb-2">{selectedProperty?.name}</h3>
                           <p className="text-[#8A8A8A] text-xs font-bold flex items-center gap-2 uppercase tracking-widest leading-none"><MapPin className="w-4 h-4 text-[#C9A84C]" /> {selectedProperty?.location}</p>
                        </div>
                     </div>

                     <div className="space-y-14">
                        <div>
                           <div className="flex justify-between items-end mb-8">
                              <p className="text-[11px] font-bold text-[#0A0A0A] uppercase tracking-widest">Share Allocation</p>
                              <p className="text-5xl font-serif font-bold text-[#0A0A0A]">{form.shares} <span className="text-[11px] text-[#8A8A8A] uppercase tracking-widest font-sans align-middle ml-2">Units</span></p>
                           </div>
                           <input
                              type="range"
                              min={minShares}
                              max={100}
                              value={form.shares}
                              onChange={e => update("shares", e.target.value)}
                              className="w-full h-1.5 bg-[#FAF9F6] rounded-full appearance-none cursor-pointer accent-[#C9A84C]"
                           />
                        </div>

                        <div className="p-10 bg-[#FAF9F6] rounded-[2.5rem] border border-[#0A0A0A]/5">
                           <div className="flex justify-between items-center mb-1">
                              <p className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-widest leading-none">Total Investment</p>
                              <p className="text-4xl font-serif font-bold text-[#C9A84C] tracking-tighter">${totalAmount.toLocaleString()}</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={handleContinueFromShares}
                    disabled={totalAmount < WIRE_DETAILS.minimumAmount}
                    className="w-full py-7 bg-[#0A0A0A] text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-20"
                  >
                    Continue to Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div 
                   key="step1"
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 10 }}
                >
                  <p className="font-montserrat font-bold text-[10px] uppercase tracking-[0.4em] text-[#C9A84C] mb-4">Investment Identity</p>
                  <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#0A0A0A] mb-8 leading-[1.05] tracking-tight">
                    Verify Your <br />
                    <span className="text-[#C9A84C]">Status.</span>
                  </h1>

                  <div className="bg-[#FAF9F6] border border-[#0A0A0A]/5 rounded-[2.5rem] p-10 mb-12 flex gap-6">
                     <Shield className="w-6 h-6 text-[#C9A84C] shrink-0 mt-0.5" />
                     <p className="text-xs text-[#8A8A8A] leading-relaxed font-semibold uppercase tracking-wider">
                        <strong className="text-[#0A0A0A]">Qualification Required.</strong> Private real estate offerings are restricted to participants who meet income or net worth thresholds.
                     </p>
                  </div>

                  <div className="space-y-5 mb-16 text-left">
                     {[
                        { id: "income", label: "Annual Income", sub: ">$200k/year (or $300k joint)" },
                        { id: "networth", label: "Capital Net Worth", sub: ">$1M excluding home" },
                        { id: "entity", label: "Institutional Entity", sub: "Corporation or Trust with >$5M assets" }
                     ].map(opt => (
                        <button 
                           key={opt.id}
                           onClick={() => update("eligibility", opt.id)}
                           className={`w-full flex items-center justify-between p-10 rounded-[2.5rem] border transition-all duration-700 text-left ${form.eligibility === opt.id ? "border-[#C9A84C] bg-white shadow-2xl scale-[1.02]" : "border-[#0A0A0A]/5 bg-white/50 hover:bg-white"}`}
                        >
                           <div>
                              <p className={`font-serif font-bold text-2xl mb-1 ${form.eligibility === opt.id ? "text-[#0A0A0A]" : "text-[#8A8A8A]"}`}>{opt.label}</p>
                              <p className="text-[10px] text-[#8A8A8A] font-bold uppercase tracking-widest">{opt.sub}</p>
                           </div>
                           <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${form.eligibility === opt.id ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#0A0A0A]/10"}`}>
                              {form.eligibility === opt.id && <div className="w-2 h-2 rounded-full bg-[#0A0A0A]" />}
                           </div>
                        </button>
                     ))}
                  </div>

                  <div className="flex items-center justify-between gap-10">
                     <button onClick={() => setStep(0)} className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors leading-[1]">← Back</button>
                     <button 
                        onClick={handleApply}
                        disabled={loading || !form.eligibility}
                        className="flex-1 py-7 bg-[#0A0A0A] text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 disabled:opacity-20 group"
                     >
                        {loading ? <span className="w-5 h-5 border-2 border-[#C9A84C] border-t-white rounded-full animate-spin" /> : (
                          <>Confirm & Generate Transfer <ArrowRight className="w-4 h-4 group-hover:translate-x-1" /></>
                        )}
                     </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                   key="step2"
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                   <p className="font-montserrat font-bold text-[10px] uppercase tracking-[0.4em] text-[#C9A84C] mb-6 text-center">Final Phase</p>
                   <h1 className="text-5xl sm:text-6xl font-serif font-bold text-[#0A0A0A] mb-6 leading-[1.05] text-center tracking-tight">Transfer Details</h1>
                   <p className="text-[#8A8A8A] font-sans font-medium text-base text-center mb-16 max-w-sm mx-auto">Follow these details to finalize your acquisition in <strong className="text-[#0A0A0A] font-bold">{selectedProperty.name}</strong>.</p>

                   <div className="bg-[#0A0A0A] text-white rounded-[4rem] p-14 mb-16 shadow-2xl relative overflow-hidden text-center group border border-white/5">
                      <div className="absolute top-0 right-0 w-60 h-60 bg-[#C9A84C]/20 blur-[100px] group-hover:bg-[#C9A84C]/30 transition-colors duration-[2000ms]" />
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Total Amount to Transfer (USD)</p>
                      <p className="text-6xl sm:text-8xl font-serif font-bold text-[#C9A84C] mb-4 tracking-tighter">${totalAmount.toLocaleString()}</p>
                      <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] italic">Confirmed for {form.shares} units</p>
                   </div>

                   <div className="bg-white border border-[#0A0A0A]/5 rounded-[3.5rem] overflow-hidden mb-16 shadow-sm">
                      <div className="px-12 py-8 border-b border-[#FAF9F6] bg-[#FAF9F6]/30 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <Building2 className="w-6 h-6 text-[#C9A84C]" />
                            <p className="font-bold text-[11px] uppercase tracking-[0.3em] text-[#8A8A8A] pt-0.5">Wire Protocol Details</p>
                         </div>
                         <div className="px-4 py-2 bg-[#C9A84C]/10 text-[#C9A84C] text-[9px] font-bold uppercase tracking-widest rounded-full">Secure Tier</div>
                      </div>
                      <div className="px-12 divide-y divide-[#FAF9F6]">
                         {[
                            { label: "Bank Institution", val: WIRE_DETAILS.bankName, id: "bank" },
                            { label: "ABA / Routing", val: WIRE_DETAILS.routingNumber, id: "routing" },
                            { label: "Account Number", val: WIRE_DETAILS.accountNumber, id: "acc" },
                            { label: "Transfer Reference", val: wireReference, id: "ref" }
                         ].map(field => (
                            <div key={field.id} className="py-10 flex items-center justify-between gap-10 group">
                               <div className="flex-1">
                                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8A8A8A] mb-3">{field.label}</p>
                                  <p className="text-[#0A0A0A] font-mono font-bold text-2xl leading-none tracking-tight">{field.val}</p>
                               </div>
                               <button 
                                  onClick={() => handleCopy(field.val, field.id)}
                                  className="flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A] border border-transparent hover:border-[#C9A84C]/20 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-500"
                               >
                                  {copied === field.id ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                  {copied === field.id ? "Copied" : "Copy"}
                                </button>
                            </div>
                         ))}
                      </div>
                   </div>

                   <button 
                      onClick={() => router.push("/dashboard")}
                      className="w-full py-7 bg-[#0A0A0A] text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group"
                   >
                      Go to Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="hidden lg:block w-[420px] shrink-0">
             <div className="sticky top-32 bg-white rounded-[3.5rem] border border-[#0A0A0A]/5 p-14 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 blur-3xl rounded-full" />
                <p className="font-montserrat font-bold text-[11px] uppercase tracking-[0.4em] text-[#C9A84C] mb-10">Investment Portfolio</p>
                <div className="space-y-12">
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A8A8A] mb-3">Asset Allocation</p>
                      <p className="text-2xl font-serif font-bold text-[#0A0A0A] leading-tight">{selectedProperty?.name}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-10 border-t border-[#FAF9F6] pt-12">
                      <div>
                         <p className="text-[9px] font-bold uppercase tracking-widest text-[#8A8A8A] mb-1">Target Yield</p>
                         <p className="text-2xl font-serif font-bold text-[#C9A84C]">{selectedProperty?.yieldEstimate}%</p>
                      </div>
                      <div>
                         <p className="text-[9px] font-bold uppercase tracking-widest text-[#8A8A8A] mb-1">Shares</p>
                         <p className="text-2xl font-serif font-bold text-[#0A0A0A]">{form.shares}</p>
                      </div>
                   </div>
                   <div className="border-t border-[#FAF9F6] pt-12">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A] mb-2">Total Investment</p>
                      <p className="text-5xl font-serif font-bold text-[#0A0A0A] tracking-tighter">${totalAmount.toLocaleString()}</p>
                   </div>
                   
                   <div className="p-8 bg-[#FAF9F6] rounded-3xl flex items-start gap-5 border border-[#0A0A0A]/5">
                      <ShieldCheck className="w-6 h-6 text-[#C9A84C] shrink-0 mt-0.5 transition-transform group-hover:scale-110 duration-700" />
                      <p className="text-[10px] font-bold text-[#8A8A8A] leading-relaxed uppercase tracking-wider">
                        Transfers typically execute within 1-3 business days. Your position is held under secure escrow during processing.
                      </p>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ApplyForm />
    </Suspense>
  )
}
