"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight, Lock, CheckCircle2, Copy, Building2,
  ArrowRight, ShieldCheck, Shield, MapPin
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
}

type Step = 0 | 1 | 2
const STEPS = ["Amount", "Verification", "Transfer"]

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
}

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
    fetch("/api/properties")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDbProperties(data)
          if (!prefillId && data.length > 0) setSelectedPropertyId(data[0].id)
          else if (prefillId) setSelectedPropertyId(prefillId)
        }
      })
      .catch(console.error)
  }, [prefillId])

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?mode=signup")
  }, [status, router])

  const selectedProperty = dbProperties.find(p => p.id === selectedPropertyId) || dbProperties[0] || DEMO_PROPERTIES[0]
  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const sharesNum = Math.max(1, parseInt(form.shares) || 1)
  const totalAmount = sharesNum * (selectedProperty?.pricePerShare || 0)
  const minShares = Math.ceil(WIRE_DETAILS.minimumAmount / (selectedProperty?.pricePerShare || 1000))
  const userAccreditation = (session?.user as any)?.accreditation || "none"
  const userName = session?.user?.name || "Investor"
  const wireReference = `SV-${userName.split(" ").slice(-1)[0].toUpperCase().slice(0,4)}-${Date.now().toString().slice(-4)}`

  const handleApply = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/investments/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: selectedProperty.id, amount: totalAmount, shares: sharesNum, accreditation: form.eligibility || userAccreditation })
      })
      const data = await res.json()
      if (res.ok) setStep(2)
      else throw new Error(data.error || "Submission failed")
    } catch (err: any) {
      alert(err.message || "Failed to initiate investment.")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const imgs: string[] = (typeof selectedProperty?.images === "string"
    ? JSON.parse(selectedProperty.images)
    : selectedProperty?.images) ?? []

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-24">
      <div className="max-w-lg mx-auto px-4 sm:px-6">

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col gap-2">
              <div className={`h-[2px] rounded-full transition-all duration-700 ${i <= step ? "bg-[#2563EB]" : "bg-slate-200"}`} />
              <p className={`text-[9px] font-bold uppercase tracking-[0.3em] transition-all ${i === step ? "text-[#0F172A]" : "text-slate-400"}`}>{s}</p>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── STEP 0: AMOUNT ── */}
          {step === 0 && (
            <motion.div key="step0" {...fade}>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-2">Investment Allocation</p>
              <h1 className="text-3xl font-serif font-bold text-[#0F172A] mb-6 leading-tight tracking-tight">
                Confirm your<br /><span className="text-[#2563EB]">Investment.</span>
              </h1>

              {/* Property card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 mb-5 shadow-sm">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  {imgs[0] && <img src={imgs[0]} className="w-full h-full object-cover" alt="" />}
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-1">Active Asset</p>
                  <h3 className="text-sm font-serif font-bold text-[#0F172A] leading-tight truncate">{selectedProperty?.name}</h3>
                  <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1 uppercase tracking-wider">
                    <MapPin className="w-3 h-3 text-[#2563EB]" /> {selectedProperty?.location}
                  </p>
                </div>
              </div>

              {/* Shares + total */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Share Allocation</p>
                    <p className="text-xl font-serif font-bold text-[#0F172A]">{form.shares} <span className="text-xs font-sans text-slate-400 font-medium">units</span></p>
                  </div>
                  <input
                    type="range" min={minShares} max={100} value={form.shares}
                    onChange={e => update("shares", e.target.value)}
                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#2563EB]"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">Min {minShares}</span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">Max 100</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Investment</p>
                  <p className="text-3xl font-serif font-bold text-[#2563EB] tracking-tight">${totalAmount.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 mt-1">@ ${selectedProperty?.pricePerShare?.toLocaleString()} per share</p>
                </div>
              </div>

              <button
                onClick={() => userAccreditation !== "none" ? handleApply() : setStep(1)}
                disabled={totalAmount < WIRE_DETAILS.minimumAmount}
                className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#2563EB] transition-all shadow-lg flex items-center justify-center gap-3 group disabled:opacity-30"
              >
                Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              {totalAmount < WIRE_DETAILS.minimumAmount && (
                <p className="text-center text-[10px] text-slate-400 mt-3">Minimum investment is ${WIRE_DETAILS.minimumAmount.toLocaleString()}</p>
              )}
            </motion.div>
          )}

          {/* ── STEP 1: VERIFICATION ── */}
          {step === 1 && (
            <motion.div key="step1" {...fade}>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-2">Investor Verification</p>
              <h1 className="text-3xl font-serif font-bold text-[#0F172A] mb-2 leading-tight tracking-tight">
                Verify Your <span className="text-[#2563EB]">Status.</span>
              </h1>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">Select the criterion that best describes your eligibility.</p>

              {/* Info banner */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-6">
                <Shield className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-[#0F172A]">Qualification required.</strong> Private real estate offerings are restricted to participants who meet income or net worth thresholds.
                </p>
              </div>

              {/* Eligibility options */}
              <div className="space-y-3 mb-6">
                {[
                  { id: "income", label: "Annual Income", sub: ">$200k/year (or $300k joint)" },
                  { id: "networth", label: "Net Worth", sub: ">$1M excluding primary residence" },
                  { id: "entity", label: "Institutional Entity", sub: "Corporation or Trust with >$5M assets" }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => update("eligibility", opt.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left ${
                      form.eligibility === opt.id
                        ? "border-[#2563EB] bg-blue-50 shadow-sm"
                        : "border-slate-100 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <p className={`font-serif font-bold text-base mb-0.5 ${form.eligibility === opt.id ? "text-[#0F172A]" : "text-slate-600"}`}>{opt.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{opt.sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      form.eligibility === opt.id ? "border-[#2563EB] bg-[#2563EB]" : "border-slate-200"
                    }`}>
                      {form.eligibility === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="px-5 py-4 rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#0F172A] transition-colors">
                  ← Back
                </button>
                <button
                  onClick={handleApply}
                  disabled={loading || !form.eligibility}
                  className="flex-1 py-4 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#2563EB] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-30 group"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                    <>Confirm & Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: TRANSFER ── */}
          {step === 2 && (
            <motion.div key="step2" {...fade}>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-2">Final Phase</p>
              <h1 className="text-3xl font-serif font-bold text-[#0F172A] mb-2 leading-tight tracking-tight">Transfer Details</h1>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Wire the funds below to finalise your position in <strong className="text-[#0F172A]">{selectedProperty?.name}</strong>.
              </p>

              {/* Amount highlight card */}
              <div className="bg-[#0F172A] text-white rounded-2xl p-6 mb-5 shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2563EB]/20 blur-[60px] rounded-full" />
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Total Amount to Transfer (USD)</p>
                <p className="text-4xl font-serif font-bold text-[#2563EB] mb-1 tracking-tight">${totalAmount.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">For {form.shares} unit{parseInt(form.shares) !== 1 ? "s" : ""} · {selectedProperty?.name}</p>
              </div>

              {/* Wire details */}
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden mb-5 shadow-sm">
                <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
                  <Building2 className="w-4 h-4 text-[#2563EB]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Wire Instructions</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { label: "Bank", val: WIRE_DETAILS.bankName, id: "bank" },
                    { label: "Routing / ABA", val: WIRE_DETAILS.routingNumber, id: "routing" },
                    { label: "Account No.", val: WIRE_DETAILS.accountNumber, id: "acc" },
                    { label: "Reference", val: wireReference, id: "ref" },
                    { label: "Account Name", val: WIRE_DETAILS.accountName, id: "name" },
                  ].map(field => (
                    <div key={field.id} className="px-5 py-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-1">{field.label}</p>
                        <p className="text-sm font-mono font-bold text-[#0F172A] leading-none truncate">{field.val}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(field.val, field.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-400 border border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] transition-all shrink-0"
                      >
                        {copied === field.id ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        {copied === field.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust note */}
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                  Transfers typically process within 1–3 business days. Your position is held under secure escrow during processing.
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#2563EB] transition-all shadow-lg flex items-center justify-center gap-3 group"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ApplyForm />
    </Suspense>
  )
}
