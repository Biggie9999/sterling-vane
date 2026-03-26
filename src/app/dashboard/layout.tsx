"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PieChart, Calendar, FileText, ArrowRightLeft, Settings, LogOut } from "lucide-react"

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: <Home className="w-4 h-4" /> },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: <PieChart className="w-4 h-4" /> },
  { name: "Bookings", href: "/dashboard/bookings", icon: <Calendar className="w-4 h-4" /> },
  { name: "Documents", href: "/dashboard/documents", icon: <FileText className="w-4 h-4" /> },
  { name: "Distributions", href: "/dashboard/distributions", icon: <ArrowRightLeft className="w-4 h-4" /> },
  { name: "Settings", href: "/dashboard/settings", icon: <Settings className="w-4 h-4" /> },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-offWhite dark:bg-[#0f0f0f] flex flex-col md:flex-row mt-[88px]">
      
      {/* Sidebar (Desktop) */}
      <aside className="w-full md:w-64 bg-black border-r border-border-dark flex flex-col luxury-grain shrink-0 hidden md:flex">
        <div className="p-6 pb-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold mb-8">Investor Portal</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/dashboard")
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors text-sm font-sans ${isActive ? 'bg-[#111] text-gold border border-border-dark' : 'text-warmGrey hover:bg-white/5 hover:text-white'}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border-dark mt-auto">
           <button className="flex items-center space-x-3 px-4 py-3 w-full text-warmGrey hover:text-danger hover:bg-danger/10 transition-colors rounded-sm text-sm font-sans">
             <LogOut className="w-4 h-4" />
             <span>Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Mobile nav indicator (simplified) */}
      <div className="md:hidden bg-black p-4 border-b border-border-dark overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav className="flex space-x-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/dashboard")
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-sm ${isActive ? 'bg-gold text-black' : 'text-warmGrey border border-border-dark'}`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden pt-8 md:pt-12 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  )
}
