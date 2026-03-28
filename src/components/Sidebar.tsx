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
  { name: "The Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Collection", href: "/dashboard/portfolio", icon: PieChart },
  { name: "Reservations", href: "/dashboard/bookings", icon: Calendar },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Income", href: "/dashboard/distributions", icon: ArrowRightLeft },
]

const adminLinks = [
  { name: "Operations", href: "/admin", icon: Activity },
  { name: "The Collection", href: "/admin/properties", icon: Building },
  { name: "Investor Relations", href: "/admin/users", icon: Users },
  { name: "Asset Financials", href: "/admin/financials", icon: PieChart },
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
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-[#0A0A0A] text-white rounded-full shadow-2xl border border-white/10"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar Container */}
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 w-72 z-50 transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] md:translate-x-0 flex flex-col overflow-hidden bg-white border-r border-[#0A0A0A]/5",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        
        {/* Brand Header */}
        <div className="px-10 py-12 flex flex-col gap-1 shrink-0">
          <Link href="/" className="group inline-flex flex-col">
            <h2 className="font-serif text-2xl tracking-tighter font-bold text-[#0A0A0A] group-hover:text-[#C9A84C] transition-colors duration-500">
              Sterling Vane
            </h2>
            <p className="font-bold text-[9px] uppercase tracking-[0.4em] mt-2 text-[#C9A84C]">
              {mode === "admin" ? "Management Layer" : "The Sovereign Collection"}
            </p>
          </Link>
        </div>

        {/* User context card */}
        {userName && (
          <div className="px-8 py-2 shrink-0">
            <div className="bg-[#FAF9F6] border border-[#0A0A0A]/5 p-5 rounded-3xl flex items-center gap-4 transition-all duration-500 shadow-sm hover:shadow-xl group">
              <div className="w-11 h-11 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center text-xs font-bold shadow-2xl group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] transition-all">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-[#0A0A0A] truncate leading-tight mb-0.5">{userName}</p>
                <p className="text-[10px] truncate font-bold text-[#8A8A8A] uppercase tracking-wider opacity-60 italic">
                  Private Access
                </p>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#C9A84C] shrink-0" />
            </div>
          </div>
        )}

        {/* Dynamic Navigation */}
        <nav className="flex-1 px-6 py-10 space-y-1.5 overflow-y-auto no-scrollbar scroll-smooth">
          {links.map((link, idx) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard" && link.href !== "/admin")
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group relative flex items-center gap-4 px-6 py-4 rounded-2xl text-[14px] font-bold transition-all duration-500",
                  isActive
                    ? "bg-[#FAF9F6] text-[#0A0A0A] border border-[#0A0A0A]/5 shadow-sm"
                    : "text-[#8A8A8A] hover:text-[#0A0A0A] hover:bg-[#FAF9F6]/50"
                )}
              >
                <link.icon className={cn(
                  "w-4 h-4 shrink-0 transition-all duration-500 group-hover:scale-110",
                  isActive ? "text-[#C9A84C]" : "text-[#8A8A8A]/40"
                )} />
                <span className="flex-1 tracking-tight">{link.name}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.5)]" />}
              </Link>
            )
          })}
        </nav>

        {/* Global Footer Actions */}
        <div className="px-6 py-10 border-t border-[#0A0A0A]/5 space-y-3 shrink-0">
          {mode === "user" && <Link 
            href="/admin" 
            className="flex items-center gap-4 px-6 py-4 w-full bg-[#FAF9F6] text-[#8A8A8A] hover:text-[#C9A84C] hover:bg-white border border-[#0A0A0A]/5 hover:border-[#C9A84C]/20 transition-all rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm hover:shadow-xl"
          >
            <ShieldCheck className="w-4 h-4" />
            Admin Access
          </Link>}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-4 px-6 py-4 w-full transition-all rounded-2xl text-[14px] font-bold text-[#8A8A8A] hover:text-[#0A0A0A] group hover:bg-[#FAF9F6]"
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:rotate-12 transition-transform text-[#8A8A8A]/40 group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
