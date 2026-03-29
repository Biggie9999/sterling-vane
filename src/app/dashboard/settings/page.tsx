"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { User, Bell, Shield, CreditCard, CheckCircle2, ShieldCheck, Mail, Phone, Landmark, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bankName: "",
    bankRouting: "",
    bankAccount: "",
    notifications: {
      distributions: true,
      insights: true,
      offerings: true,
      stays: false
    }
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/user/settings")
        if (res.ok) {
          const data = await res.json()
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phone: data.phone || "",
            bankName: data.bankName || "",
            bankRouting: data.bankRouting || "",
            bankAccount: data.bankAccount || "",
            notifications: data.notifications || {
              distributions: true,
              insights: true,
              offerings: true,
              stays: false
            }
          })
        }
      } catch (err) {
        console.error("Failed to load settings:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(s => ({ ...s, [name]: value }))
  }

  const handleToggle = (key: keyof typeof formData.notifications) => {
    setFormData(s => ({
      ...s,
      notifications: { ...s.notifications, [key]: !s.notifications[key] }
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch("/api/user/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error("Save failed:", err)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
        <div className="w-12 h-12 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">Retrieving Profile...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 max-w-4xl animate-sovereign-in">
      <div className="relative overflow-hidden p-10 bg-white border border-[#0F172A]/5 rounded-[2.5rem] shadow-sm">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
             <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.4em]">Sovereign Profile</p>
          </div>
          <h1 className="font-serif text-4xl font-bold text-[#0F172A] mb-3 tracking-tight">Settings</h1>
          <p className="text-[#64748B] text-base font-serif italic max-w-xl">"Manage your partner credentials and portfolio notification preferences."</p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-full bg-[#2563EB]/5 blur-[80px] rounded-full translate-x-1/2 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        <div className="space-y-8">
          {/* Profile */}
          <section className="bg-white border border-[#0F172A]/5 rounded-[2rem] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#0F172A]/5 flex items-center justify-center">
                <User className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-[#0F172A] font-bold text-lg tracking-tight">Partner Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.3em] pl-1">First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="James" className="w-full bg-[#F8FAFC] border border-[#0F172A]/5 text-[#0F172A] text-sm px-6 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB]/50 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.3em] pl-1">Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Holden" className="w-full bg-[#F8FAFC] border border-[#0F172A]/5 text-[#0F172A] text-sm px-6 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB]/50 transition-all font-medium" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.3em] pl-1">Email Address</label>
              <div className="relative">
                <input defaultValue={session?.user?.email || ""} className="w-full bg-[#F8FAFC] border border-[#0F172A]/5 text-[#64748B] text-sm px-6 py-4 rounded-2xl focus:outline-none cursor-not-allowed font-medium" disabled />
                <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]/30" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.3em] pl-1">Phone Number</label>
              <div className="relative">
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full bg-[#F8FAFC] border border-[#0F172A]/5 text-[#0F172A] text-sm px-6 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB]/50 transition-all font-medium" />
                <Phone className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]/30" />
              </div>
            </div>
          </section>

          {/* Banking */}
          <section className="bg-white border border-[#0F172A]/5 rounded-[2rem] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#0F172A]/5 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-[#0F172A] font-bold text-lg tracking-tight">Distribution Banking</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.3em] pl-1">Bank Name</label>
                <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Chase Bank" className="w-full bg-[#F8FAFC] border border-[#0F172A]/5 text-[#0F172A] text-sm px-6 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB]/50 transition-all font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.3em] pl-1">Routing</label>
                  <input name="bankRouting" value={formData.bankRouting} onChange={handleChange} placeholder="•••••••••" type="password" className="w-full bg-[#F8FAFC] border border-[#0F172A]/5 text-[#0F172A] text-sm px-6 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB]/50 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.3em] pl-1">Account</label>
                  <input name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="•••••••••••" type="password" className="w-full bg-[#F8FAFC] border border-[#0F172A]/5 text-[#0F172A] text-sm px-6 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB]/50 transition-all font-medium" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Accreditation */}
          <section className="bg-white border border-[#0F172A]/5 rounded-[2rem] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#0F172A]/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-[#0F172A] font-bold text-lg tracking-tight">Accreditation Manifest</h2>
            </div>
            <div className="bg-[#F8FAFC] border border-[#2563EB]/10 rounded-[1.5rem] p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full border border-[#2563EB]/20 flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-[#2563EB]" />
              </div>
              <p className="text-[#0F172A] font-bold text-base mb-1">Verified Partner</p>
              <p className="text-[#64748B] text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
                Your accreditation was confirmed through 2027.
              </p>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white border border-[#0F172A]/5 rounded-[2rem] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#0F172A]/5 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#2563EB]" />
              </div>
              <h2 className="text-[#0F172A] font-bold text-lg tracking-tight">Communication Preferred</h2>
            </div>
            <div className="space-y-6">
              {[
                { id: "distributions" as const, label: "Distribution Payments", sub: "Status alerts on capital dividends" },
                { id: "insights" as const, label: "Portfolio Insights", sub: "Monthly performance manifests" },
                { id: "offerings" as const, label: "Private Offerings", sub: "Priority windows for new assets" },
                { id: "stays" as const, label: "Stay Confirmations", sub: "Concierge booking alerts" },
              ].map((n) => (
                <label key={n.id} className="flex items-center justify-between gap-6 cursor-pointer group">
                  <div>
                    <p className="text-[#0F172A] text-sm font-bold tracking-tight">{n.label}</p>
                    <p className="text-[#64748B] text-xs font-medium">{n.sub}</p>
                  </div>
                  <div className="relative shrink-0">
                    <input 
                      type="checkbox" 
                      checked={formData.notifications[n.id]} 
                      onChange={() => handleToggle(n.id)} 
                      className="sr-only peer" 
                    />
                    <div className="w-12 h-7 bg-[#F8FAFC] border border-[#0F172A]/5 rounded-full peer peer-checked:bg-[#0F172A] transition-all duration-500" />
                    <div className="absolute top-1 left-1 w-5 h-5 bg-white border border-[#0F172A]/5 rounded-full transition-all duration-500 peer-checked:translate-x-5 shadow-sm peer-checked:bg-[#2563EB]" />
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Save Action */}
          <div className="pt-4 flex items-center justify-between gap-6">
            <button
              disabled={isSaving}
              onClick={handleSave}
              className="px-12 py-5 bg-[#0F172A] text-white font-bold rounded-2xl hover:bg-[#2563EB] hover:text-[#0F172A] transition-all duration-500 shadow-2xl text-[10px] uppercase tracking-[0.4em] active:scale-95 disabled:opacity-50 flex items-center gap-3"
            >
              {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Committing...</> : saved ? "Manifest Updated" : "Save Changes"}
            </button>
            {saved && (
              <div className="flex items-center gap-3 text-[#2563EB] text-[10px] font-bold uppercase tracking-widest animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                Updated
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
