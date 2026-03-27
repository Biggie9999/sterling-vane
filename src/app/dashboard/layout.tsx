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
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0D0D0D] border-r border-[#1a1a1a] flex-col shrink-0">
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-[#1a1a1a]">
          <Link href="/">
            <p className="font-serif text-lg text-white">Sterling Vane</p>
            <p className="font-mono text-[0.6rem] tracking-[0.25em] text-[#C9A84C] uppercase">Investor Portal</p>
          </Link>
        </div>

        {/* User Card */}
        <div className="px-4 py-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5">
            <div className="w-9 h-9 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
              <span className="text-[#C9A84C] text-xs font-bold font-mono">{initials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-medium truncate">{session?.user?.name || "Investor"}</p>
              <p className="text-warmGrey text-[10px] truncate">{session?.user?.email}</p>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
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
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                  isActive
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-[#888] hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className={cn("w-4 h-4 shrink-0", isActive && "text-[#C9A84C]")} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-6 space-y-2 border-t border-[#1a1a1a] pt-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs text-[#666] hover:text-amber-400 hover:bg-amber-400/5 transition-all font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Panel
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-[#666] hover:text-red-400 hover:bg-red-400/5 transition-all rounded-xl text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#0D0D0D] border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <p className="font-serif text-white">Sterling Vane</p>
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center">
            <span className="text-[#C9A84C] text-xs font-bold font-mono">{initials}</span>
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D0D0D] border-t border-[#1a1a1a] px-2 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {sidebarLinks.slice(0, 5).map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard")
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[52px]",
                  isActive ? "text-[#C9A84C]" : "text-[#555] hover:text-[#888]"
                )}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-[9px] font-mono uppercase tracking-widest">{link.name.slice(0, 5)}</span>
              </Link>
            )
          })}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex flex-col items-center gap-1 px-3 py-2 text-[#555] hover:text-red-400 transition-all min-w-[52px] rounded-xl"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[9px] font-mono uppercase tracking-widest">Out</span>
          </button>
        </div>
      </nav>

    </div>
  )
}
