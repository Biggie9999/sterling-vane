"use client"

import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/Sidebar"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row antialiased">
      {/* Universal sidebar Component */}
      <Sidebar 
        mode="user" 
        userName={session?.user?.name || "Sovereign Investor"} 
        userEmail={session?.user?.email || ""} 
      />

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 bg-white/50 backdrop-blur-sm overflow-hidden animate-sovereign-in">
        <div className="flex-1 px-6 py-12 md:px-12 md:py-16 overflow-y-auto no-scrollbar selection:bg-accent/10 selection:text-accent">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile background decorative element */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </div>
  )
}
