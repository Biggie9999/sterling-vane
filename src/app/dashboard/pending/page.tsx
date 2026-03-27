"use client"

import { useSession } from "next-auth/react"
import { Clock, Mail, CheckCircle2, Phone, Building2, Copy, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PendingConfirmationPage() {
  const { data: session } = useSession()
  const [emailCopied, setEmailCopied] = useState(false)

  const firstName = (session?.user?.name || session?.user?.email || "Investor").split(" ")[0]
  const ref = `SVDG-${(session?.user?.email || "INV").split("@")[0].toUpperCase().slice(0, 4)}-${Date.now().toString().slice(-6)}`

  const copyEmail = () => {
    navigator.clipboard.writeText("ir@sterlingvane.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0A2540] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-[#C9A84C]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-500/20 rounded-full border border-amber-500/30 flex items-center justify-center">
            <span className="text-amber-400 text-xs font-bold">!</span>
          </div>
        </div>

        {/* Heading */}
        <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[#C9A84C] uppercase mb-4">Wire Transfer Received — Pending Confirmation</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-white mb-4">
          Your allocation is<br />in review, {firstName}.
        </h1>
        <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md mx-auto">
          Your wire transfer is being verified by the Sterling Vane investor relations team. This typically takes <strong className="text-white">1–3 business days</strong>.
          Once confirmed, your investor portal will be fully unlocked with your property positions.
        </p>

        {/* Reference */}
        <div className="bg-[#0A0A0A]/50 border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">Your Wire Reference</p>
          <p className="text-[#C9A84C] font-mono text-lg font-bold">{ref}</p>
          <p className="text-white/30 text-xs mt-1">Include this in your bank wire memo</p>
        </div>

        {/* Timeline */}
        <div className="bg-[#0A0A0A]/50 border border-white/10 rounded-2xl p-6 mb-8 text-left">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-5">What Happens Next</p>
          <div className="space-y-5">
            {[
              { icon: CheckCircle2, step: "1", label: "Application Submitted", done: true },
              { icon: Building2, step: "2", label: "Wire Transfer Processing", done: false, active: true },
              { icon: CheckCircle2, step: "3", label: "Allocation Confirmed", done: false },
              { icon: CheckCircle2, step: "4", label: "Investor Portal Unlocked", done: false },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  item.done ? "bg-emerald-500/20 border border-emerald-500/30" :
                  item.active ? "bg-[#C9A84C]/20 border border-[#C9A84C]/30" :
                  "bg-white/5 border border-white/10"
                }`}>
                  {item.done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                   item.active ? <Clock className="w-4 h-4 text-[#C9A84C] animate-pulse" /> :
                   <span className="text-white/20 text-xs font-mono">{item.step}</span>}
                </div>
                <span className={`text-sm ${item.done ? "text-emerald-400" : item.active ? "text-white font-semibold" : "text-white/30"}`}>
                  {item.label}
                </span>
                {item.active && <span className="ml-auto text-[#C9A84C] text-[10px] font-mono uppercase tracking-widest bg-[#C9A84C]/10 px-2 py-1 rounded-full">In Progress</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#0A0A0A]/50 border border-white/10 rounded-2xl p-5 mb-8">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">Need Help?</p>
          <button onClick={copyEmail} className="flex items-center justify-between w-full hover:bg-white/5 p-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-white text-sm">ir@sterlingvane.com</span>
            </div>
            {emailCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/30" />}
          </button>
        </div>

        {/* CTA to limited dashboard access */}
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl font-medium text-sm transition-all mb-3"
        >
          Preview Your Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/" className="text-white/30 text-xs hover:text-white/50 transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}
