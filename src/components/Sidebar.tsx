"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { 
  LayoutDashboard, PieChart, Calendar, FileText, 
  ArrowRightLeft, Settings, LogOut, ShieldCheck,
  Building, Users, Activity, ChevronRight, Menu, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SidebarProps {
  mode: "user" | "admin"
  userName?: string
  userEmail?: string
}

const userLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: PieChart },
  { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Distributions", href: "/dashboard/distributions", icon: ArrowRightLeft },
]

const adminLinks = [
  { name: "Operations Hub", href: "/admin", icon: Activity },
  { name: "Asset Management", href: "/admin/properties", icon: Building },
  { name: "Investor Relations", href: "/admin/users", icon: Users },
  { name: "System Financials", href: "/admin/financials", icon: PieChart },
]

export function Sidebar({ mode, userName, userEmail }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const links = mode === "user" ? userLinks : adminLinks
  
  const initials = (userName || userEmail || "SV")
    .split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <>
      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-primary text-white rounded-full glass-dark border border-white/20 shadow-xl"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar Container */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 w-72 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-x-0 flex flex-col overflow-hidden shadow-2xl md:shadow-none border-r border-[#E2E8F0]/30",
        mode === "admin" ? "bg-slate-950 text-white border-white/5" : "bg-[#F8FAFC] text-slate-900",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Brand Header */}
        <div className="px-8 py-10 flex flex-col gap-1 shrink-0">
          <Link href="/" className="group inline-flex flex-col">
            <h2 className="font-serif text-2xl tracking-tighter font-bold bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent group-hover:to-accent transition-all duration-500">
              {mode === "admin" ? (
                <span className="text-white bg-clip-text inline-flex items-center gap-2">
                  Sterling Vane <span className="text-[10px] font-mono border border-accent/40 text-accent px-2 py-0.5 rounded-full uppercase tracking-tighter">Ops</span>
                </span>
              ) : "Sterling Vane"}
            </h2>
            <p className={cn(
              "font-mono text-[9px] uppercase tracking-[0.4em] font-bold mt-1",
              mode === "admin" ? "text-accent/80" : "text-[#006AFF]"
            )}>
              {mode === "admin" ? "Sovereign Command Center" : "The Sovereign Collection"}
            </p>
          </Link>
        </div>

        {/* User context card (Premium look) */}
        {userName && (
          <div className="px-6 py-2 shrink-0">
            <div className={cn(
              "px-4 py-4 rounded-2xl border flex items-center gap-3 transition-all duration-500 hover:shadow-lg",
              mode === "admin" ? "bg-white/5 border-white/10 glass-dark" : "bg-white border-[#E2E8F0] luxury-shadow"
            )}>
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white text-xs font-bold font-mono shadow-inner">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold truncate leading-tight">{userName}</p>
                <p className={cn("text-[10px] truncate font-medium", mode === "admin" ? "text-white/40" : "text-slate-400")}>
                  {userEmail}
                </p>
              </div>
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
            </div>
          </div>
        )}

        {/* Dynamic Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto no-scrollbar scroll-smooth">
          {links.map((link, idx) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard" && link.href !== "/admin")
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all duration-500 animate-links",
                  isActive
                    ? mode === "admin" 
                      ? "bg-white/10 text-accent shadow-inner border border-white/5" 
                      : "bg-[#006AFF]/5 text-[#006AFF] shadow-sm border border-[#006AFF]/10 sidebar-link-active"
                    : mode === "admin"
                      ? "text-white/50 hover:text-white hover:bg-white/5"
                      : "text-slate-500 hover:text-slate-950 hover:bg-white hover:shadow-sm"
                )}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <link.icon className={cn(
                  "w-4 h-4 shrink-0 transition-all duration-500 group-hover:scale-110",
                  isActive ? "text-accent" : "text-slate-400"
                )} />
                <span className="flex-1">{link.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-40 animate-pulse" />}
              </Link>
            )
          })}
        </nav>

        {/* Global Footer Actions */}
        <div className={cn(
          "px-4 py-8 border-t space-y-2 shrink-0",
          mode === "admin" ? "border-white/5" : "border-[#E2E8F0]"
        )}>
          {mode === "user" && <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-accent hover:bg-white transition-all rounded-xl text-[11px] font-bold uppercase tracking-widest border border-transparent hover:border-accent/10 shadow-none hover:shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            Switch to Command Center
          </Link>}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(
              "flex items-center gap-3 px-4 py-3 w-full transition-all rounded-xl text-[14px] font-bold group",
              mode === "admin" ? "text-white/40 hover:text-rose-400 hover:bg-rose-500/10" : "text-slate-400 hover:text-rose-600 hover:bg-rose-50"
            )}
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:rotate-12 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
