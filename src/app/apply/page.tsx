"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Suspense } from "react"
import {
  ChevronRight, Lock, CheckCircle2, Copy, Building2,
  Globe, Hash, CreditCard, AlertCircle, Clock, Mail, Info
} from "lucide-react"
import { DEMO_PROPERTIES } from "@/data/properties"

// Wire transfer details
const WIRE_DETAILS = {
  bankName: "JPMorgan Chase Bank, N.A.",
  routingNumber: "021000021",
  accountNumber: "734-825-9160",
  accountName: "Sterling Vane Development Group LLC",
  swiftCode: "CHASUS33",
  bankAddress: "383 Madison Avenue, New York, NY 10017",
  memo: "SVDG-PHASE1-[YOUR-REF]",
  minimumAmount: 10000,
}

type Step = 1 | 2 | 3 | 4 | 5

function ApplyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyId = searchParams.get("propertyId")
  const selectedProperty = DEMO_PROPERTIES.find((p) => p.id === propertyId) || DEMO_PROPERTIES[0]

  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "",
    shares: "1", accreditation: "", entity: false,
  })
  const [copied, setCopied] = useState<string | null>(null)

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }))

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const goNext = async () => {
    if (step < 4) {
      setStep((s) => (s + 1) as Step)
    } else if (step === 4) {
      // Move to wire transfer
      setStep(5)
    } else {
      // Final — auto sign in
      setLoading(true)
      await signIn("credentials", {
        email: form.email || "investor@sovereign.com",
        password: form.password || "password123",
        redirect: false,
      })
      setLoading(false)
      router.push("/dashboard/pending")
    }
  }

  const STEPS = ["Personal Info", "Asset Allocation", "Accreditation", "Review", "Wire Payment"]
  const progress = ((step - 1) / (STEPS.length - 1)) * 100
  const totalAmount = Number(form.shares) * selectedProperty.pricePerShare

  if (step === 5) {
    return <WireTransferStep form={form} selectedProperty={selectedProperty} totalAmount={totalAmount} onComplete={goNext} loading={loading} copied={copied} onCopy={handleCopy} />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-80 xl:w-96 bg-[#1a1a1a] flex-col justify-between px-10 py-16 shrink-0">
          <div>
            <p className="font-serif text-2xl text-white mb-1">Sterling Vane</p>
            <p className="font-sans text-[0.6rem] tracking-[0.3em] text-[#C9A84C] uppercase mb-12">Sovereign Collection</p>

            {/* Step indicators */}
            <div className="space-y-6">
              {STEPS.map((s, i) => {
                const stepNum = i + 1
                const done = step > stepNum
                const active = step === stepNum
                return (
                  <div key={s} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                      done ? "bg-[#C9A84C] text-black" : active ? "bg-white text-[#1a1a1a]" : "border border-white/20 text-white/50"
                    }`}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                    </div>
                    <span className={`text-sm transition-colors ${active ? "text-white font-semibold" : done ? "text-[#C9A84C]" : "text-white/30"}`}>
                      {s}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-[#C9A84C] text-xs font-sans uppercase tracking-widest mb-3">Target Asset</p>
            <p className="text-white text-xl font-serif mb-1">{selectedProperty.name}</p>
            <p className="text-white/50 text-xs mb-4">{selectedProperty.location}</p>
            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="flex-1">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Share Price</p>
                <p className="font-medium text-white">${selectedProperty.pricePerShare.toLocaleString()}</p>
              </div>
              <div className="flex-1 border-l border-white/10 pl-3">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Target Yield</p>
                <p className="font-medium text-[#C9A84C]">{selectedProperty.targetYield}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex-1 flex items-start justify-center px-4 sm:px-8 py-16 lg:py-24 bg-[#F6F9FC]">
          <div className="w-full max-w-xl">
            {/* Mobile step badge */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <span className="bg-[#1a1a1a] text-white text-xs font-sans px-4 py-1.5 rounded-full">
                Step {step} of {STEPS.length}
              </span>
              <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#C9A84C] rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">

              {/* Step 1 — Personal */}
              {step === 1 && (
                <div>
                  <p className="text-[#C9A84C] font-sans font-bold text-xs uppercase tracking-[0.2em] mb-3">Step 1</p>
                  <h2 className="text-3xl font-serif text-[#1a1a1a] mb-8">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="First Name" placeholder="James" value={form.firstName} onChange={(v) => update("firstName", v)} />
                      <Field label="Last Name" placeholder="Holden" value={form.lastName} onChange={(v) => update("lastName", v)} />
                    </div>
                    <Field label="Email Address" type="email" placeholder="james@company.com" value={form.email} onChange={(v) => update("email", v)} />
                    <Field label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(v) => update("phone", v)} />
                    <Field label="Create Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={(v) => update("password", v)} />
                  </div>
                </div>
              )}

              {/* Step 2 — Investment Profile */}
              {step === 2 && (
                <div>
                  <p className="text-[#C9A84C] font-sans font-bold text-xs uppercase tracking-[0.2em] mb-3">Step 2</p>
                  <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2">Asset Allocation</h2>
                  <p className="text-slate-500 text-sm mb-8">Select how many shares you wish to acquire in {selectedProperty.name}.</p>
                  
                  <div className="bg-[#F6F9FC] border border-slate-200 rounded-2xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-sm font-semibold text-slate-900">Purchase Shares</p>
                      <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-500 font-medium">1 Share = ${selectedProperty.pricePerShare.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={form.shares}
                        onChange={(e) => update("shares", e.target.value)}
                        className="flex-1 accent-[#1a1a1a]"
                      />
                      <div className="w-16 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-bold text-lg text-slate-900">
                        {form.shares}
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl p-6">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Total Investment</p>
                    <p className="text-4xl font-serif text-[#1a1a1a]">${totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              )}

              {/* Step 3 — Accreditation */}
              {step === 3 && (
                <div>
                  <p className="text-[#C9A84C] font-sans font-bold text-xs uppercase tracking-[0.2em] mb-3">Step 3</p>
                  <h2 className="text-3xl font-serif text-[#1a1a1a] mb-8">Accreditation Status</h2>
                  <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 text-sm text-slate-600">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                    This offering is a Regulation D Rule 506(c) private placement. SEC verification of accredited investor status is required.
                  </div>
                  <div className="space-y-3">
                    {[
                      { val: "income", title: "Individual Income", desc: "Annual income >$200K (or $300K joint) in each of the last 2 years" },
                      { val: "net_worth", title: "Net Worth", desc: "Net worth exceeds $1,000,000 excluding primary residence" },
                      { val: "entity", title: "Entity / Institution", desc: "Investing via an entity with assets exceeding $5,000,000" },
                    ].map((a) => (
                      <label
                        key={a.val}
                        className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          form.accreditation === a.val ? "border-[#1a1a1a] bg-[#1a1a1a]/5" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <input type="radio" name="acc" className="mt-1" checked={form.accreditation === a.val} onChange={() => update("accreditation", a.val)} />
                        <div>
                          <p className="font-semibold text-slate-900">{a.title}</p>
                          <p className="text-slate-500 text-sm">{a.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 — Review */}
              {step === 4 && (
                <div>
                  <p className="text-[#C9A84C] font-sans font-bold text-xs uppercase tracking-[0.2em] mb-3">Step 4</p>
                  <h2 className="text-3xl font-serif text-[#1a1a1a] mb-8">Review & Submit</h2>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mb-6">
                    {[
                      ["Applicant", `${form.firstName || "—"} ${form.lastName || "—"}`],
                      ["Email", form.email || "—"],
                      ["Target Asset", selectedProperty.name],
                      ["Shares", form.shares],
                      ["Total Investment", `$${totalAmount.toLocaleString()}`],
                      ["Accreditation", form.accreditation === "income" ? "Individual Income" : form.accreditation === "net_worth" ? "Net Worth >$1M" : form.accreditation === "entity" ? "Entity / Institution" : "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between px-5 py-3.5 border-b border-slate-200 last:border-0">
                        <span className="text-slate-500 text-sm">{k}</span>
                        <span className="text-slate-900 font-semibold text-sm">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    By continuing you confirm that all information is accurate and you understand this application is for a private securities offering. Upon review, you will receive wire transfer instructions to complete your investment.
                  </p>
                </div>
              )}

              {/* Nav */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                {step > 1 ? (
                  <button onClick={() => setStep((s) => (s - 1) as Step)} className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
                    ← Back
                  </button>
                ) : <div />}
                <button
                  onClick={goNext}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-xl font-semibold hover:bg-black transition-all disabled:opacity-50 shadow-md"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                    step === 4 ? "Proceed to Payment →" : <>Continue <ChevronRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div></div>}>
      <ApplyForm />
    </Suspense>
  )
}

function Field({ label, type = "text", placeholder, value, onChange }: { label: string; type?: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A2540] transition-all text-sm"
      />
    </div>
  )
}

function WireDetail({ icon: Icon, label, value, field, copied, onCopy }: { icon: any; label: string; value: string; field: string; copied: string | null; onCopy: (v: string, f: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-5 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
          <Icon className="w-4 h-4 text-[#C9A84C]" />
        </div>
        <div>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] font-sans mb-1">{label}</p>
          <p className="text-[#1a1a1a] font-mono text-sm font-medium">{value}</p>
        </div>
      </div>
      <button
        onClick={() => onCopy(value, field)}
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1a1a1a] transition-colors shrink-0 px-3 py-1.5 rounded-lg hover:bg-slate-50 font-medium"
      >
        {copied === field ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
        <span>{copied === field ? "Copied" : "Copy"}</span>
      </button>
    </div>
  )
}

function WireTransferStep({ form, selectedProperty, totalAmount, onComplete, loading, copied, onCopy }: { form: any; selectedProperty: any; totalAmount: number; onComplete: () => void; loading: boolean; copied: string | null; onCopy: (v: string, f: string) => void }) {
  const ref = `SVDG-${(form.lastName || "INV").toUpperCase()}-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-start px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-serif text-2xl text-[#1a1a1a] mb-1">Sterling Vane</p>
          <p className="font-sans text-[0.6rem] tracking-[0.3em] text-[#C9A84C] uppercase mb-8">Sovereign Collection</p>
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] px-4 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-[0.1em] mb-6">
            <Clock className="w-4 h-4" />
            Step 5 — Wire Transfer
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">Complete Your Investment</h1>
          <p className="text-[#666] text-sm max-w-md mx-auto leading-relaxed">
            To secure your {form.shares} {Number(form.shares) === 1 ? "share" : "shares"} in <strong className="text-[#1a1a1a]">{selectedProperty.name}</strong>, please initiate a wire transfer for <strong className="text-[#C9A84C]">${totalAmount.toLocaleString()}</strong> to the account below.
          </p>
        </div>

        {/* Amount Box */}
        <div className="bg-[#1a1a1a] text-white rounded-3xl p-8 mb-8 text-center shadow-xl">
          <p className="text-white/50 text-xs font-bold font-sans uppercase tracking-[0.2em] mb-2">Amount to Wire</p>
          <p className="text-[#C9A84C] text-5xl font-serif mb-2">${totalAmount.toLocaleString()}</p>
          <p className="text-white/60 text-xs">USD · For {form.shares} Shares of {selectedProperty.name}</p>
        </div>

        {/* Wire Instructions */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <p className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-slate-500">Wire Transfer Details</p>
          </div>
          <div className="px-6">
            <WireDetail icon={Building2} label="Bank Name" value={WIRE_DETAILS.bankName} field="bank" copied={copied} onCopy={onCopy} />
            <WireDetail icon={Hash} label="Routing Number (ABA)" value={WIRE_DETAILS.routingNumber} field="routing" copied={copied} onCopy={onCopy} />
            <WireDetail icon={CreditCard} label="Account Number" value={WIRE_DETAILS.accountNumber} field="account" copied={copied} onCopy={onCopy} />
            <WireDetail icon={Globe} label="SWIFT / BIC Code" value={WIRE_DETAILS.swiftCode} field="swift" copied={copied} onCopy={onCopy} />
            <WireDetail icon={Building2} label="Account Name" value={WIRE_DETAILS.accountName} field="name" copied={copied} onCopy={onCopy} />
            <WireDetail icon={Hash} label="Wire Memo (Required)" value={ref} field="memo" copied={copied} onCopy={onCopy} />
          </div>
        </div>

        {/* Bank Address */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <p className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Bank Address</p>
          <p className="text-[#1a1a1a] text-sm font-medium">{WIRE_DETAILS.bankAddress}</p>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900 leading-relaxed space-y-2">
            <p><strong className="text-amber-700">Important:</strong> You MUST include the wire memo reference exactly as shown. This is how we match your wire to your application.</p>
            <p>Processing time: 1–3 business days. You will receive a confirmation email once your allocation is confirmed and your portal access is activated.</p>
            <p>For support: <span className="font-semibold text-amber-800">ir@sterlingvane.com</span></p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onComplete}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-black text-white font-bold py-5 rounded-2xl transition-all text-sm disabled:opacity-50 shadow-xl"
        >
          {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
            <>
              <Mail className="w-4 h-4" />
              I've Initiated the Wire Transfer — Access My Portal
            </>
          )}
        </button>
        <p className="text-center text-slate-500 text-xs mt-4">Your portal access will be pending admin confirmation. We'll email you when it's live.</p>
      </div>
    </div>
  )
}
