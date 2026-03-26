"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Building, Users, Activity, Settings, LogOut } from "lucide-react"

const adminLinks = [
  { name: "Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
  { name: "Properties", href: "/admin/properties", icon: <Building className="w-4 h-4" /> },
  { name: "Users & Approvals", href: "/admin/users", icon: <Users className="w-4 h-4" /> },
  { name: "Financials", href: "/admin/financials", icon: <Activity className="w-4 h-4" /> },
  { name: "Settings", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row mt-[88px]">
      
      {/* Sidebar (Desktop) */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-border-dark flex flex-col shrink-0 hidden md:flex">
        <div className="p-6 pb-2">
           <div className="flex items-center space-x-2 mb-8">
             <div className="w-2 h-2 rounded-full bg-danger animate-pulse"></div>
             <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey">Admin Control</p>
           </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/admin")
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors text-sm font-sans ${isActive ? 'bg-[#111] text-gold border border-border-dark shadow-[inset_2px_0_0_#C9A84C]' : 'text-warmGrey hover:bg-white/5 hover:text-white'}`}
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
             <span>Exit Admin</span>
           </button>
        </div>
      </aside>

      {/* Mobile nav indicator */}
      <div className="md:hidden bg-[#0a0a0a] p-4 border-b border-border-dark overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav className="flex space-x-2">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/admin")
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-sm flex items-center ${isActive ? 'bg-gold text-black' : 'bg-[#111] text-warmGrey border border-border-dark'}`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden pt-8 md:pt-12 px-6 pb-24 text-white">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  )
}
