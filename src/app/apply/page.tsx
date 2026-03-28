"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
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
  minimumAmount: 10000,
  maximumAmount: 5000000,
}

const INTENTS = [
  { value: "invest", label: "Invest for yield", icon: TrendingUp, desc: "Fractional ownership with 30/60/90 return milestones" },
  { value: "buy", label: "Buy a property", icon: Home, desc: "Acquire full or partial ownership of a luxury home" },
  { value: "rent", label: "Reserve a stay", icon: Key, desc: "Book a short-term luxury stay at a Sovereign property" },
]

type Step = 0 | 1 | 2 | 3 | 4

function ApplyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  const prefillId = searchParams.get("propertyId") || searchParams.get("property")

  const [step, setStep] = useState<Step>(0)
  const [intent, setIntent] = useState("invest")
  const [selectedPropertyId, setSelectedPropertyId] = useState(prefillId || DEMO_PROPERTIES[0].id)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ shares: "1", accreditation: "" })
  const [copied, setCopied] = useState<string | null>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?mode=signup")
    }
  }, [status, router])

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#006AFF] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

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
          }
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err)
      }
    }
    fetchProperties()
  }, [])

  const selectedProperty = dbProperties.find(p => p.id === selectedPropertyId) || dbProperties[0] || DEMO_PROPERTIES[0]
  const update = (field: string, value: string | boolean) => setForm(f => ({ ...f, [field]: value }))
  const handleCopy = (text: string, field: string) => { 
    navigator.clipboard.writeText(text); 
    setCopied(field); 
    setTimeout(() => setCopied(null), 2000) 
  }

  const sharesNum = Math.max(1, parseInt(form.shares) || 1)
  const totalAmount = sharesNum * selectedProperty.pricePerShare
  const minShares = Math.ceil(WIRE_DETAILS.minimumAmount / selectedProperty.pricePerShare)

  const goNext = async () => {
    if (step === 3 && selectedProperty) {
      // Finalize and persist to DB
      setLoading(true)
      try {
        const res = await fetch("/api/investments/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: selectedProperty.id,
            amount: totalAmount,
            shares: sharesNum,
            accreditation: form.accreditation
          })
        })
        const data = await res.json()
        if (res.ok) {
          // Success - move to wire step
          setStep(4)
        } else {
          alert(data.error || "Submission error")
        }
      } catch (err) {
        console.error("Submission failed:", err)
      } finally {
        setLoading(false)
      }
    } else {
      setStep(s => Math.min(STEPS.length - 1, s + 1) as Step)
    }
  }

  const STEPS = ["Your Goal", "Choose Property", "Accreditation", "Review", "Wire Payment"]
  const progress = (step / (STEPS.length - 1)) * 100
  
  const userName = session?.user?.name || "Investor"
  const userEmail = session?.user?.email || "—"
  const refLastName = userName.split(" ").slice(-1)[0] || "INV"
  const ref = `SVDG-${refLastName.toUpperCase()}-${Date.now().toString().slice(-6)}`

  // Wire step is full-page
  if (step === 4) {
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

          {step > 0 && (
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

              {/* STEP 1 — Choose Property */}
              {step === 1 && (
                <div>
                  <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Step 2</p>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">Choose Your Property</h2>
                  <p className="text-slate-500 text-sm mb-6">Select which asset you'd like to invest in. Minimum investment: <strong>$10,000</strong>.</p>
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

                  {/* Investment Amount Slider */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm font-bold text-slate-700">Investment Amount</p>
                      <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-500 font-medium">
                        1 share = ${selectedProperty.pricePerShare.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <input
                        type="range"
                        min={minShares}
                        max={Math.floor(WIRE_DETAILS.maximumAmount / selectedProperty.pricePerShare)}
                        value={form.shares}
                        onChange={e => update("shares", e.target.value)}
                        className="flex-1 accent-[#006AFF]"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 font-bold mb-4">
                      <span>Min: ${WIRE_DETAILS.minimumAmount.toLocaleString()}</span>
                      <span>Max: ${WIRE_DETAILS.maximumAmount.toLocaleString()}</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Shares</p>
                        <p className="font-bold text-slate-900">{form.shares}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Investment</p>
                        <p className="font-serif text-2xl font-bold text-[#006AFF]">${totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    {totalAmount < WIRE_DETAILS.minimumAmount && (
                      <p className="text-red-500 text-xs font-bold mt-2 text-center">Minimum investment is $10,000. Please increase shares.</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2 — Accreditation */}
              {step === 2 && (
                <div>
                  <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Step 3</p>
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

              {/* STEP 3 — Review */}
              {step === 3 && (
                <div>
                  <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Step 4</p>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Review & Submit</h2>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mb-6">
                    {[
                      ["Intent", INTENTS.find(i => i.value === intent)?.label || "—"],
                      ["Applicant", userName],
                      ["Email", userEmail],
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
                  disabled={loading || (step === 1 && totalAmount < WIRE_DETAILS.minimumAmount)}
                  className="flex items-center gap-2 px-8 py-4 bg-[#006AFF] text-white rounded-xl font-bold hover:bg-[#0050CC] transition-all disabled:opacity-50 shadow-md"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                    step === 3 ? <>Proceed to Payment <ArrowRight className="w-4 h-4" /></> : <>Continue <ChevronRight className="w-4 h-4" /></>}
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
