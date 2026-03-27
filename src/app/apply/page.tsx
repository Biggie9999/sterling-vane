"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Suspense } from "react"
import {
  ChevronRight, Lock, CheckCircle2, Copy, Building2,
  Globe, Hash, CreditCard, AlertCircle, Clock, Mail,
  TrendingUp, Home, Key, MapPin, ShieldCheck, ArrowRight, Info
} from "lucide-react"
import { DEMO_PROPERTIES } from "@/data/properties"

const WIRE_DETAILS = {
  bankName: "JPMorgan Chase Bank, N.A.",
  routingNumber: "021000021",
  accountNumber: "734-825-9160",
  accountName: "Sterling Vane Development Group LLC",
  swiftCode: "CHASUS33",
  bankAddress: "383 Madison Avenue, New York, NY 10017",
  minimumAmount: 5000,
}

const INTENTS = [
  { value: "invest", label: "Invest for yield", icon: TrendingUp, desc: "Fractional ownership with 30/60/90 return milestones" },
  { value: "buy", label: "Buy a property", icon: Home, desc: "Acquire full or partial ownership of a luxury home" },
  { value: "rent", label: "Reserve a stay", icon: Key, desc: "Book a short-term luxury stay at a Sovereign property" },
]

type Step = 0 | 1 | 2 | 3 | 4 | 5

function ApplyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefillId = searchParams.get("propertyId")

  const [step, setStep] = useState<Step>(0)
  const [intent, setIntent] = useState("invest")
  const [selectedPropertyId, setSelectedPropertyId] = useState(prefillId || DEMO_PROPERTIES[0].id)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", shares: "1", accreditation: "", })
  const [copied, setCopied] = useState<string | null>(null)

  const selectedProperty = DEMO_PROPERTIES.find(p => p.id === selectedPropertyId) || DEMO_PROPERTIES[0]
  const update = (field: string, value: string | boolean) => setForm(f => ({ ...f, [field]: value }))
  const handleCopy = (text: string, field: string) => { navigator.clipboard.writeText(text); setCopied(field); setTimeout(() => setCopied(null), 2000) }

  const sharesNum = Math.max(1, parseInt(form.shares) || 1)
  const totalAmount = sharesNum * selectedProperty.pricePerShare
  const minShares = Math.ceil(WIRE_DETAILS.minimumAmount / selectedProperty.pricePerShare)

  const goNext = async () => {
    if (step < 4) { setStep(s => (s + 1) as Step) }
    else if (step === 4) { setStep(5) }
    else {
      setLoading(true)
      await signIn("credentials", { email: form.email || "investor@sovereign.com", password: form.password || "password123", redirect: false })
      setLoading(false)
      router.push("/dashboard/pending")
    }
  }

  const STEPS = ["Your Goal", "Personal Info", "Choose Property", "Accreditation", "Review", "Wire Payment"]
  const progress = (step / (STEPS.length - 1)) * 100
  const ref = `SVDG-${(form.lastName || "INV").toUpperCase()}-${Date.now().toString().slice(-6)}`

  // Wire step is full-page
  if (step === 5) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start px-5 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <p className="font-serif text-2xl font-bold text-slate-900 mb-1">Sterling Vane</p>
            <p className="text-[10px] tracking-[0.3em] text-[#006AFF] uppercase font-bold mb-8">Sovereign Collection</p>
            <div className="inline-flex items-center gap-2 bg-[#006AFF]/10 border border-[#006AFF]/30 text-[#006AFF] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Clock className="w-4 h-4" /> Final Step — Wire Transfer
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-4">Complete Your Investment</h1>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              To secure your {form.shares} {Number(form.shares) === 1 ? "share" : "shares"} in <strong className="text-slate-900">{selectedProperty.name}</strong>, send exactly <strong className="text-[#006AFF]">${totalAmount.toLocaleString()}</strong> via wire transfer.
            </p>
          </div>

          {/* Amount Box */}
          <div className="bg-[#0A2540] text-white rounded-3xl p-8 mb-6 text-center shadow-xl">
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">Amount to Wire</p>
            <p className="text-[#006AFF] text-5xl font-serif font-bold mb-2">${totalAmount.toLocaleString()}</p>
            <p className="text-white/60 text-xs">USD · {form.shares} Shares of {selectedProperty.name}</p>
          </div>

          {/* WHY WIRE TRANSFER — OTC explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#006AFF] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 mb-3">Why do we use wire transfers?</p>
                <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                  <p>🏦 <strong>Institutional Standard:</strong> Wire transfers are the universal settlement method for private securities. They are auditable, reversible, and accepted worldwide with no processing intermediaries.</p>
                  <p>📊 <strong>OTC (Over-The-Counter) Settlement:</strong> Our private placements are structured as OTC instruments under SEC Reg D. Unlike retail investments, OTC transactions settle directly between qualified participants — no exchange intermediary, lower fees, faster processing.</p>
                  <p>🔒 <strong>Full Traceability:</strong> Every wire includes your unique reference code, creating an immutable paper trail that protects both you and us. No third-party payment processors can freeze or dispute the transfer.</p>
                  <p>⚡ <strong>No Card Limits:</strong> Wire transfers carry no dollar caps, making them the only practical method for meaningful investment positions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Wire details */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <p className="font-bold text-xs uppercase tracking-widest text-slate-500">Wire Transfer Details</p>
            </div>
            <div className="px-6">
              {[
                { icon: Building2, label: "Bank Name", value: WIRE_DETAILS.bankName, field: "bank" },
                { icon: Hash, label: "Routing Number (ABA)", value: WIRE_DETAILS.routingNumber, field: "routing" },
                { icon: CreditCard, label: "Account Number", value: WIRE_DETAILS.accountNumber, field: "account" },
                { icon: Globe, label: "SWIFT / BIC Code", value: WIRE_DETAILS.swiftCode, field: "swift" },
                { icon: Building2, label: "Account Name", value: WIRE_DETAILS.accountName, field: "name" },
                { icon: Hash, label: "Wire Memo (Required)", value: ref, field: "memo" },
              ].map(({ icon: Icon, label, value, field }) => (
                <div key={field} className="flex items-center justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                      <Icon className="w-4 h-4 text-[#006AFF]" />
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="text-slate-900 font-mono text-sm">{value}</p>
                    </div>
                  </div>
                  <button onClick={() => handleCopy(value, field)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50 font-bold shrink-0">
                    {copied === field ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === field ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 space-y-1.5">
              <p><strong>Important:</strong> Include the wire memo reference exactly as shown — this is how we match your wire to your application.</p>
              <p>Processing: 1–3 business days. You'll receive confirmation by email once your dashboard is activated.</p>
              <p>Questions? <span className="font-bold">ir@sterlingvane.com</span></p>
            </div>
          </div>

          <button onClick={goNext} disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#006AFF] hover:bg-[#0050CC] text-white font-bold py-5 rounded-2xl transition-all text-sm disabled:opacity-50 shadow-xl">
            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
              <><Mail className="w-4 h-4" /> I've Initiated the Wire — Access My Portal</>
            )}
          </button>
          <p className="text-center text-slate-400 text-xs mt-4">Your portal access will be pending admin confirmation. We'll email you when it's live.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100">
        <div className="h-full bg-[#006AFF] transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar — desktop only */}
        <div className="hidden lg:flex lg:w-80 xl:w-96 bg-slate-50 border-r border-slate-200 flex-col justify-between px-10 py-16 shrink-0">
          <div>
            <p className="font-serif text-2xl font-bold text-slate-900 mb-1">Sterling Vane</p>
            <p className="text-[10px] tracking-[0.3em] text-[#006AFF] uppercase font-bold mb-12">Sovereign Collection</p>
            <div className="space-y-6">
              {STEPS.map((s, i) => {
                const stepNum = i
                const done = step > stepNum
                const active = step === stepNum
                return (
                  <div key={s} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${active ? "bg-[#006AFF] text-white shadow-md" : done ? "bg-emerald-100 text-emerald-600" : "border border-slate-200 text-slate-400"}`}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : stepNum + 1}
                    </div>
                    <span className={`text-sm transition-colors ${active ? "text-slate-900 font-bold" : done ? "text-slate-600 font-medium" : "text-slate-400"}`}>{s}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {step > 1 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="text-[#006AFF] text-[10px] font-bold uppercase tracking-widest mb-3">Selected Asset</p>
              <p className="text-slate-900 text-lg font-serif font-bold mb-1">{selectedProperty.name}</p>
              <p className="text-slate-500 text-xs mb-4 flex items-center gap-1"><MapPin className="w-3 h-3 text-[#006AFF]" /> {selectedProperty.location}</p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Share Price</p>
                  <p className="font-bold text-slate-900">${selectedProperty.pricePerShare.toLocaleString()}</p>
                </div>
                <div className="flex-1 border-l border-slate-100 pl-3">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Target Yield</p>
                  <p className="font-bold text-[#006AFF]">{selectedProperty.targetYield}%</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main form area */}
        <div className="flex-1 flex items-start justify-center px-5 sm:px-8 py-14 sm:py-20 bg-slate-50">
          <div className="w-full max-w-xl">
            {/* Mobile step indicator */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <span className="bg-[#006AFF] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                Step {step + 1} of {STEPS.length}
              </span>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#006AFF] rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-7 sm:p-10">

              {/* STEP 0 — Intent */}
              {step === 0 && (
                <div>
                  <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Step 1</p>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">What would you like to do?</h2>
                  <p className="text-slate-500 text-sm mb-8">Choose your primary goal. You can always change this later.</p>
                  <div className="space-y-3">
                    {INTENTS.map(i => (
                      <label key={i.value}
                        className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${intent === i.value ? "border-[#006AFF] bg-[#006AFF]/5" : "border-slate-200 hover:border-slate-300"}`}>
                        <input type="radio" className="sr-only" checked={intent === i.value} onChange={() => setIntent(i.value)} />
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${intent === i.value ? "bg-[#006AFF] text-white" : "bg-slate-100 text-slate-600"}`}>
                          <i.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-bold text-base ${intent === i.value ? "text-[#006AFF]" : "text-slate-900"}`}>{i.label}</p>
                          <p className="text-slate-500 text-sm">{i.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${intent === i.value ? "border-[#006AFF] bg-[#006AFF]" : "border-slate-300"}`}>
                          {intent === i.value && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1 — Personal Info */}
              {step === 1 && (
                <div>
                  <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Step 2</p>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Personal Information</h2>
                  <div className="mb-8">
                    <button type="button"
                      className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold transition-all shadow-sm"
                      onClick={() => alert("Google Auth will be configured with Supabase.")}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Sign up with Google
                    </button>
                    <div className="flex items-center gap-4 mt-6 mb-6">
                      <div className="flex-1 h-px bg-slate-200" />
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">or continue manually</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="First Name" placeholder="James" value={form.firstName} onChange={v => update("firstName", v)} />
                      <Field label="Last Name" placeholder="Holden" value={form.lastName} onChange={v => update("lastName", v)} />
                    </div>
                    <Field label="Email Address" type="email" placeholder="james@company.com" value={form.email} onChange={v => update("email", v)} />
                    <Field label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={v => update("phone", v)} />
                    <Field label="Create Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={v => update("password", v)} />
                  </div>
                </div>
              )}

              {/* STEP 2 — Choose Property */}
              {step === 2 && (
                <div>
                  <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Step 3</p>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">Choose Your Property</h2>
                  <p className="text-slate-500 text-sm mb-6">Select which asset you'd like to invest in. Minimum investment: <strong>$5,000</strong>.</p>
                  <div className="space-y-3 mb-8">
                    {DEMO_PROPERTIES.map(p => (
                      <label key={p.id}
                        className={`flex gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${selectedPropertyId === p.id ? "border-[#006AFF] bg-[#006AFF]/5" : "border-slate-200 hover:border-slate-300"}`}>
                        <input type="radio" className="sr-only" checked={selectedPropertyId === p.id} onChange={() => setSelectedPropertyId(p.id)} />
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm truncate ${selectedPropertyId === p.id ? "text-[#006AFF]" : "text-slate-900"}`}>{p.name}</p>
                          <p className="text-slate-500 text-xs flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" />{p.location}</p>
                          <div className="flex gap-3 text-xs">
                            <span className="font-bold text-slate-700">${p.pricePerShare.toLocaleString()}<span className="text-slate-400 font-normal">/share</span></span>
                            <span className="text-emerald-600 font-bold">{p.targetYield}% yield</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 self-center ${selectedPropertyId === p.id ? "border-[#006AFF] bg-[#006AFF]" : "border-slate-300"}`}>
                          {selectedPropertyId === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Shares Slider */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm font-bold text-slate-700">Number of Shares</p>
                      <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-500 font-medium">
                        1 share = ${selectedProperty.pricePerShare.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <input type="range" min={minShares} max="20" value={form.shares}
                        onChange={e => update("shares", e.target.value)} className="flex-1 accent-[#006AFF]" />
                      <div className="w-14 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-bold text-lg text-slate-900">
                        {form.shares}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                      <p className="text-sm font-medium text-slate-600">Total Investment</p>
                      <p className="font-serif text-2xl font-bold text-slate-900">${totalAmount.toLocaleString()}</p>
                    </div>
                    {totalAmount < WIRE_DETAILS.minimumAmount && (
                      <p className="text-red-500 text-xs font-bold mt-2">Minimum investment is $5,000. Please increase shares.</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 — Accreditation */}
              {step === 3 && (
                <div>
                  <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Step 4</p>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Accreditation Status</h2>
                  <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                    <p className="text-sm text-slate-600">This offering is a Regulation D Rule 506(c) private placement. SEC verification of accredited investor status is required.</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { val: "income", title: "Individual Income", desc: "Annual income >$200K (or $300K joint) for the last 2 years" },
                      { val: "net_worth", title: "Net Worth", desc: "Net worth exceeds $1,000,000 excluding primary residence" },
                      { val: "entity", title: "Entity / Institution", desc: "Investing via entity with assets exceeding $5,000,000" },
                    ].map(a => (
                      <label key={a.val}
                        className={`flex items-start gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${form.accreditation === a.val ? "border-[#006AFF] bg-[#006AFF]/5" : "border-slate-200 hover:border-slate-300"}`}>
                        <input type="radio" name="acc" className="mt-1" checked={form.accreditation === a.val} onChange={() => update("accreditation", a.val)} />
                        <div>
                          <p className="font-bold text-slate-900">{a.title}</p>
                          <p className="text-slate-500 text-sm">{a.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4 — Review */}
              {step === 4 && (
                <div>
                  <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Step 5</p>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Review & Submit</h2>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mb-6">
                    {[
                      ["Intent", INTENTS.find(i => i.value === intent)?.label || "—"],
                      ["Applicant", `${form.firstName || "—"} ${form.lastName || "—"}`],
                      ["Email", form.email || "—"],
                      ["Selected Property", selectedProperty.name],
                      ["Location", selectedProperty.location],
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
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-emerald-800 leading-relaxed">By continuing, you confirm all information is accurate and you understand this is a private securities offering. Wire transfer instructions follow.</p>
                  </div>
                </div>
              )}

              {/* Nav Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                {step > 0 ? (
                  <button onClick={() => setStep(s => (s - 1) as Step)} className="text-sm text-slate-500 hover:text-slate-800 font-semibold transition-colors">← Back</button>
                ) : <div />}
                <button
                  onClick={goNext}
                  disabled={loading || (step === 2 && totalAmount < WIRE_DETAILS.minimumAmount)}
                  className="flex items-center gap-2 px-8 py-4 bg-[#006AFF] text-white rounded-xl font-bold hover:bg-[#0050CC] transition-all disabled:opacity-50 shadow-md"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                    step === 4 ? <>Proceed to Payment <ArrowRight className="w-4 h-4" /></> : <>Continue <ChevronRight className="w-4 h-4" /></>}
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
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#006AFF] border-t-transparent rounded-full animate-spin" /></div>}>
      <ApplyForm />
    </Suspense>
  )
}

function Field({ label, type = "text", placeholder, value, onChange }: { label: string; type?: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF] transition-all text-sm font-medium" />
    </div>
  )
}
