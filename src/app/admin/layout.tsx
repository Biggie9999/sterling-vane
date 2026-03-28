"use client"

import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/Sidebar"
import { Loader2, ShieldAlert } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    )
  }

  // Double check admin role here if necessary, but middleware should handle it.
  
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row antialiased transition-all duration-700">
      
      {/* Universal sidebar in Admin mode */}
      <Sidebar 
        mode="admin" 
        userName={session?.user?.name || "Operations Officer"} 
        userEmail={session?.user?.email || "admin@sterlingvane.com"} 
      />

      {/* Admin Operations Viewport */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#020617] border-l border-white/5 relative overflow-hidden">
        
        {/* Subtle decorative background noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none luxury-grain" />
        
        {/* Restrictive Access Banner (Premium Style) */}
        <div className="bg-rose-500/10 border-b border-rose-500/20 px-6 py-2 flex items-center justify-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-400/80 font-bold">
            Secure Command Center — Authorized Personnel Only
          </p>
        </div>

        <div className="flex-1 px-6 py-10 md:px-12 md:py-16 overflow-y-auto no-scrollbar animate-sovereign-in">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>

        {/* Design Accents */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      </main>
    </div>
  )
}
