"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { 
  LayoutDashboard, PieChart, Calendar, FileText, 
  ArrowRightLeft, LogOut, ShieldCheck,
  Building, Users, Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  mode: "user" | "admin"
  userName?: string
  userEmail?: string
}

const userLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Collection", href: "/dashboard/portfolio", icon: PieChart },
  { name: "Reservations", href: "/dashboard/bookings", icon: Calendar },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Income", href: "/dashboard/distributions", icon: ArrowRightLeft },
]

const adminLinks = [
  { name: "Operations", href: "/admin", icon: Activity },
  { name: "Collection", href: "/admin/properties", icon: Building },
  { name: "Investors", href: "/admin/users", icon: Users },
  { name: "Financials", href: "/admin/financials", icon: PieChart },
]

export function Sidebar({ mode, userName, userEmail }: SidebarProps) {
  const pathname = usePathname()
  const rawLinks = mode === "user" ? userLinks : adminLinks
  
  // Show max 4/5 items on mobile to prevent squishing
  const mobileLinks = rawLinks.slice(0, 4)

  const initials = (userName || userEmail || "SV")
    .split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex sticky top-0 h-screen w-72 z-50 flex-col overflow-hidden bg-white border-r border-[#0F172A]/5">
        
        {/* Brand Header */}
        <div className="px-10 py-12 flex flex-col gap-1 shrink-0">
          <Link href="/" className="group inline-flex flex-col">
            <h2 className="font-serif text-2xl tracking-tighter font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-500">
              Sterling Vane
            </h2>
            <p className="font-bold text-[9px] uppercase tracking-[0.4em] mt-2 text-[#2563EB]">
              {mode === "admin" ? "Management Layer" : "The Sovereign Collection"}
            </p>
          </Link>
        </div>

        {/* User context card */}
        {userName && (
          <div className="px-8 py-2 shrink-0">
            <div className="bg-[#F8FAFC] border border-[#0F172A]/5 p-5 rounded-3xl flex items-center gap-4 transition-all duration-500 shadow-sm hover:shadow-xl group">
              <div className="w-11 h-11 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold shadow-2xl group-hover:bg-[#2563EB] transition-all">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-[#0F172A] truncate leading-tight mb-0.5">{userName}</p>
                <p className="text-[10px] truncate font-bold text-[#64748B] uppercase tracking-wider opacity-60 italic">
                  Private Access
                </p>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
            </div>
          </div>
        )}

        {/* Dynamic Navigation */}
        <nav className="flex-1 px-6 py-10 space-y-1.5 overflow-y-auto no-scrollbar scroll-smooth">
          {rawLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard" && link.href !== "/admin")
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "group relative flex items-center gap-4 px-6 py-4 rounded-2xl text-[14px] font-bold transition-all duration-500",
                  isActive
                    ? "bg-blue-50/50 text-[#0F172A] border border-[#2563EB]/10 shadow-sm"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                )}
              >
                <link.icon className={cn(
                  "w-4 h-4 shrink-0 transition-all duration-500 group-hover:scale-110",
                  isActive ? "text-[#2563EB]" : "text-[#64748B]/60"
                )} />
                <span className="flex-1 tracking-tight">{link.name}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.5)]" />}
              </Link>
            )
          })}
        </nav>

        {/* Global Footer Actions */}
        <div className="px-6 py-10 border-t border-[#0F172A]/5 space-y-3 shrink-0">
          {mode === "user" && <Link 
            href="/admin" 
            className="flex items-center gap-4 px-6 py-4 w-full bg-[#F8FAFC] text-[#64748B] hover:text-[#2563EB] hover:bg-white border border-[#0F172A]/5 hover:border-[#2563EB]/20 transition-all rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm hover:shadow-xl"
          >
            <ShieldCheck className="w-4 h-4" />
            Admin Access
          </Link>}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-4 px-6 py-4 w-full transition-all rounded-2xl text-[14px] font-bold text-[#64748B] hover:text-[#0F172A] group hover:bg-[#F8FAFC]"
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:rotate-12 transition-transform text-[#64748B]/40 group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-[#0F172A]/10 px-4 py-3 flex justify-between items-center shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.05)] pb-safe-bottom">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard" && link.href !== "/admin")
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center justify-center w-full py-1 gap-1"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-blue-50/80" : "bg-transparent"
              )}>
                <link.icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-[#2563EB] scale-110" : "text-[#64748B] scale-100"
                )} />
              </div>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-wider transition-colors",
                isActive ? "text-[#0F172A]" : "text-[#64748B]"
              )}>
                {link.name}
              </span>
            </Link>
          )
        })}
        {/* Sign Out */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex flex-col items-center justify-center w-full py-1 gap-1 group"
        >
          <div className="p-2 rounded-xl transition-all duration-300 bg-transparent group-active:bg-red-50">
            <LogOut className="w-5 h-5 text-[#64748B] group-hover:text-red-500 transition-colors" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-red-500 transition-colors">
            Sign Out
          </span>
        </button>
      </nav>
    </>
  )
}
