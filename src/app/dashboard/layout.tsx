"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { LayoutDashboard, PieChart, Calendar, FileText, ArrowRightLeft, Settings, LogOut, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: PieChart },
  { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Distributions", href: "/dashboard/distributions", icon: ArrowRightLeft },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const initials = (session?.user?.name || session?.user?.email || "SV")
    .split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col md:flex-row">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0">
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-slate-200">
          <Link href="/">
            <p className="font-serif text-lg text-slate-900 font-bold">Sterling Vane</p>
            <p className="font-mono text-[0.6rem] tracking-[0.25em] text-[#006AFF] uppercase font-bold mt-1">Investor Portal</p>
          </Link>
        </div>

        {/* User Card */}
        <div className="px-4 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-full bg-[#006AFF]/10 border border-[#006AFF]/20 flex items-center justify-center shrink-0">
              <span className="text-[#006AFF] text-xs font-bold font-mono">{initials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-slate-900 text-sm font-bold truncate">{session?.user?.name || "Investor"}</p>
              <p className="text-slate-500 text-[10px] truncate font-medium">{session?.user?.email}</p>
            </div>
            <ShieldCheck className="w-4 h-4 text-[#006AFF] shrink-0" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard")
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  isActive
                    ? "bg-[#006AFF]/5 text-[#006AFF] border border-[#006AFF]/10"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <link.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-[#006AFF]" : "text-slate-400")} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-6 space-y-2 border-t border-slate-200 pt-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            Admin Panel
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all rounded-xl text-sm font-semibold"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <p className="font-serif font-bold text-slate-900">Sterling Vane</p>
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#006AFF]/10 border border-[#006AFF]/20 flex items-center justify-center">
            <span className="text-[#006AFF] text-xs font-bold font-mono">{initials}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-8 pb-24 md:pb-10 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-2 pb-safe">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {sidebarLinks.slice(0, 5).map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard")
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[52px]",
                  isActive ? "text-[#006AFF]" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-widest">{link.name.slice(0, 5)}</span>
              </Link>
            )
          })}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex flex-col items-center gap-1 px-3 py-2 text-slate-400 hover:text-red-500 transition-all min-w-[52px] rounded-xl"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Out</span>
          </button>
        </div>
      </nav>

    </div>
  )
}
