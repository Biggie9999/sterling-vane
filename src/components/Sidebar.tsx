"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { 
  LayoutDashboard, PieChart, Calendar, FileText, 
  ArrowRightLeft, LogOut, ShieldCheck,
  Building, Users, Activity, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  mode: "user" | "admin"
  userName?: string
  userEmail?: string
}

const userLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: PieChart },
  { name: "Reservations", href: "/dashboard/bookings", icon: Calendar },
  { name: "Legal & Docs", href: "/dashboard/documents", icon: FileText },
  { name: "Distributions", href: "/dashboard/distributions", icon: ArrowRightLeft },
]

const adminLinks = [
  { name: "Operations", href: "/admin", icon: Activity },
  { name: "The Collection", href: "/admin/properties", icon: Building },
  { name: "Investors", href: "/admin/users", icon: Users },
  { name: "Corporate Fin", href: "/admin/financials", icon: PieChart },
]

export function Sidebar({ mode, userName, userEmail }: SidebarProps) {
  const pathname = usePathname()
  const rawLinks = mode === "user" ? userLinks : adminLinks
  
  // Show max 4 items on mobile
  const mobileLinks = rawLinks.slice(0, 4)

  const initials = (userName || userEmail || "SV")
    .split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex sticky top-0 h-screen w-80 z-50 flex-col overflow-hidden bg-white border-r border-slate-100">
        
        {/* Brand Header */}
        <div className="px-10 py-16 flex flex-col gap-1 shrink-0">
          <Link href="/" className="group inline-flex flex-col">
            <h2 className="font-serif text-3xl tracking-tighter font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-500">
              Sterling Vane
            </h2>
            <div className="h-[2px] w-12 bg-[#2563EB] mt-3 group-hover:w-20 transition-all duration-500" />
            <p className="font-bold text-[9px] uppercase font-sans tracking-[0.5em] mt-4 text-[#2563EB]">
              {mode === "admin" ? "Management Layer" : "The Sovereign Collection"}
            </p>
          </Link>
        </div>

        {/* User context card (Small / Luxury) */}
        {userName && (
          <div className="px-8 pb-10 shrink-0">
            <div className="bg-slate-50 border border-slate-100/50 p-6 rounded-[2rem] flex items-center gap-5 group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold shadow-xl group-hover:bg-[#2563EB] transition-all duration-500">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-[#0F172A] truncate leading-tight mb-1">{userName}</p>
                <div className="flex items-center gap-1.5 opacity-60">
                   <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
                   <p className="text-[9px] truncate font-bold text-slate-500 uppercase tracking-widest leading-none pt-0.5">
                     Private Access
                   </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto no-scrollbar scroll-smooth">
          {rawLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard" && link.href !== "/admin")
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "group relative flex items-center gap-4 px-6 py-5 rounded-2xl text-[13px] font-bold transition-all duration-500",
                  isActive
                    ? "bg-slate-50 text-[#0F172A] border border-slate-100 shadow-sm"
                    : "text-slate-400 hover:text-[#0F172A] hover:bg-slate-50/50"
                )}
              >
                <link.icon className={cn(
                  "w-4 h-4 shrink-0 transition-transform duration-500 group-hover:scale-110",
                  isActive ? "text-[#2563EB]" : "text-slate-300 group-hover:text-slate-500"
                )} />
                <span className="flex-1 tracking-tight">{link.name}</span>
                {isActive && (
                   <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Support & Logout */}
        <div className="px-6 py-12 border-t border-slate-50 space-y-4 shrink-0">
          <div className="bg-[#0F172A] p-6 rounded-3xl text-white relative overflow-hidden group mb-6">
             <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 blur-2xl rounded-full" />
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Priority Support</p>
             <p className="text-[11px] font-medium leading-relaxed mb-4 text-slate-300">"Direct concierge line open 24/7."</p>
             <Link href="/dashboard/support" className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#2563EB]">
                Request Callback <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-4 px-6 py-4 w-full transition-all rounded-2xl text-[13px] font-bold text-slate-400 hover:text-red-500 group"
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:rotate-12 transition-transform opacity-40 group-hover:opacity-100" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAVIGATION ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-100 px-4 py-3 pb-8 flex justify-between items-center shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.15)]">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard" && link.href !== "/admin")
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center justify-center w-full py-1 gap-1.5"
            >
               <link.icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive ? "text-[#2563EB] scale-110" : "text-slate-300"
                )} />
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors",
                isActive ? "text-[#0F172A]" : "text-slate-300"
              )}>
                {link.name.split(" ")[0]}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#2563EB]" />
              )}
            </Link>
          )
        })}
        {/* Sign Out on Mobile */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex flex-col items-center justify-center w-full py-1 gap-1.5 group"
        >
          <LogOut className="w-5 h-5 text-slate-300 group-hover:text-red-500 transition-colors" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 group-hover:text-red-500">
            Esc
          </span>
        </button>
      </nav>
    </>
  )
}
