"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { User, Bell, Shield, CreditCard, CheckCircle2 } from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#006AFF] mb-2">Account Settings</p>
        <h1 className="font-serif text-3xl text-white mb-1">Settings</h1>
        <p className="text-warmGrey text-sm">Manage your investor account and notification preferences.</p>
      </div>

      {/* Profile */}
      <section className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-4 h-4 text-[#006AFF]" />
          <h2 className="text-white font-semibold">Profile Information</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "First Name", placeholder: "James", value: "" },
            { label: "Last Name", placeholder: "Holden", value: "" },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs font-mono uppercase tracking-widest text-warmGrey mb-2">{f.label}</label>
              <input defaultValue={f.value} placeholder={f.placeholder} className="w-full bg-[#1a1a1a] border border-[#333] text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#006AFF]/50 transition-colors" />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-warmGrey mb-2">Email</label>
          <input defaultValue={session?.user?.email || ""} className="w-full bg-[#1a1a1a] border border-[#333] text-warmGrey text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#006AFF]/50" />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-warmGrey mb-2">Phone Number</label>
          <input placeholder="+1 (555) 000-0000" className="w-full bg-[#1a1a1a] border border-[#333] text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#006AFF]/50" />
        </div>
      </section>

      {/* Accreditation */}
      <section className="bg-[#111] border border-[#222] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-4 h-4 text-[#006AFF]" />
          <h2 className="text-white font-semibold">Accreditation Status</h2>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-emerald-400 font-semibold text-sm">Verified Accredited Investor</p>
            <p className="text-warmGrey text-xs mt-0.5">Your accreditation was verified on Jan 10, 2026. Valid through Jan 2027.</p>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-4 h-4 text-[#006AFF]" />
          <h2 className="text-white font-semibold">Notification Preferences</h2>
        </div>
        {[
          { label: "Distribution Payments", sub: "Receive email when distributions are processed", default: true },
          { label: "Portfolio Updates", sub: "Monthly portfolio performance reports", default: true },
          { label: "New Offerings", sub: "Priority access to new investment opportunities", default: true },
          { label: "Stay Confirmations", sub: "Booking confirmations for priority stays", default: false },
        ].map((n) => (
          <label key={n.label} className="flex items-center justify-between gap-4 cursor-pointer group">
            <div>
              <p className="text-white text-sm">{n.label}</p>
              <p className="text-warmGrey text-xs">{n.sub}</p>
            </div>
            <div className="relative shrink-0">
              <input type="checkbox" defaultChecked={n.default} className="sr-only peer" />
              <div className="w-10 h-6 bg-[#333] rounded-full peer peer-checked:bg-[#006AFF] transition-colors" />
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </div>
          </label>
        ))}
      </section>

      {/* Banking */}
      <section className="bg-[#111] border border-[#222] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-4 h-4 text-[#006AFF]" />
          <h2 className="text-white font-semibold">Distribution Banking</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-warmGrey mb-2">Bank Name</label>
            <input placeholder="Chase Bank" className="w-full bg-[#1a1a1a] border border-[#333] text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#006AFF]/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-warmGrey mb-2">Routing Number</label>
              <input placeholder="•••••••••" type="password" className="w-full bg-[#1a1a1a] border border-[#333] text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#006AFF]/50" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-warmGrey mb-2">Account Number</label>
              <input placeholder="•••••••••••" type="password" className="w-full bg-[#1a1a1a] border border-[#333] text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#006AFF]/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="px-8 py-3.5 bg-[#006AFF] text-black font-bold rounded-xl hover:bg-[#E8C96A] transition-colors"
        >
          Save Changes
        </button>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Changes saved
          </div>
        )}
      </div>
    </div>
  )
}
