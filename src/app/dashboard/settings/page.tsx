"use client"

import { GoldButton } from "@/components/shared/GoldButton"

export default function DashboardSettingsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-white mb-8">Account Settings</h1>
      
      <div className="max-w-3xl space-y-12">
        
        {/* Profile Section */}
         <section className="bg-[#111] border border-border-dark p-8 md:p-12">
           <h2 className="font-serif text-2xl text-white mb-6">Investor Profile</h2>
           
           <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-warmGrey mb-2">First Name</label>
                <input type="text" defaultValue="James" disabled className="w-full bg-[#0a0a0a] border border-border-dark text-white/50 px-4 py-3 outline-none font-sans cursor-not-allowed" />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-warmGrey mb-2">Last Name</label>
                <input type="text" defaultValue="Holden" disabled className="w-full bg-[#0a0a0a] border border-border-dark text-white/50 px-4 py-3 outline-none font-sans cursor-not-allowed" />
              </div>
             </div>

             <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-warmGrey mb-2">Email Address</label>
                <input type="email" defaultValue="james.holden@example.com" disabled className="w-full bg-[#0a0a0a] border border-border-dark text-white/50 px-4 py-3 outline-none font-sans cursor-not-allowed" />
             </div>

             <div>
                <label className="block font-mono text-xs tracking-widest uppercase text-warmGrey mb-2">Primary Phone</label>
                <input type="tel" defaultValue="+1 (555) 019-2834" className="w-full bg-black border border-border-dark text-white px-4 py-3 outline-none focus:border-gold font-sans transition-colors" />
             </div>

             <div className="pt-4 border-t border-border-dark">
                <GoldButton className="px-8">Save Profile Details</GoldButton>
             </div>
           </div>
         </section>

         {/* Preferences Section */}
         <section className="bg-[#111] border border-border-dark p-8 md:p-12">
           <h2 className="font-serif text-2xl text-white mb-6">Communication Preferences</h2>
           
           <div className="space-y-6">
             {[
               { id: "pref_dist", label: "Distribution Alerts", desc: "Get notified when funds hit your account." },
               { id: "pref_reports", label: "Quarterly Reports", desc: "Email notifications when new performance reports are published." },
               { id: "pref_offerings", label: "New Offerings (Priority)", desc: "SMS & Email alerts when new assets open to your tier." },
             ].map((pref) => (
               <label key={pref.id} className="flex items-start cursor-pointer group">
                  <div className="relative pt-0.5">
                    <input type="checkbox" defaultChecked className="peer hidden" />
                    <div className="w-5 h-5 border border-border-dark bg-[#0a0a0a] peer-checked:bg-gold peer-checked:border-gold flex items-center justify-center group-hover:border-gold/50 transition-colors">
                      <svg className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="block font-sans text-sm text-white mb-1">{pref.label}</span>
                    <span className="block font-sans text-xs text-warmGrey">{pref.desc}</span>
                  </div>
                </label>
             ))}

             <div className="pt-4 border-t border-border-dark">
                <GoldButton className="px-8 disabled:opacity-50" disabled>Save Preferences</GoldButton>
             </div>
           </div>
         </section>

      </div>
    </div>
  )
}
