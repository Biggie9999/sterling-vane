"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogIn, LayoutDashboard, LogOut, ChevronRight, TrendingUp, ArrowRight, Search as SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Collection", href: "/marketplace" },
  { name: "Fund", href: "/apply" },
  { name: "Performance", href: "/calculator" },
  { name: "About", href: "/about" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { 
    setIsOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen || isSearchOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen, isSearchOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/marketplace?location=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const isHomePage = pathname === "/"

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled || !isHomePage
            ? "bg-[#F8FAFC]/90 backdrop-blur-xl border-b border-[#0F172A]/5 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group shrink-0">
            <span className={cn(
              "font-serif text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-700",
              "text-[#0F172A]"
            )}>
              Sterling Vane
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#2563EB] mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
              Sovereign Collection
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300",
                  pathname === link.href
                    ? "text-[#0F172A] bg-[#2563EB]/10"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#0F172A]/5"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User & Tools */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Desktop Tools */}
            <div className="hidden lg:flex items-center gap-8">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#64748B] hover:text-[#0F172A] transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#2563EB]" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] px-8 py-3.5 bg-[#0F172A] text-white rounded-full hover:bg-red-950 transition-all shadow-xl"
                  >
                    Exit Portal
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#64748B] hover:text-[#0F172A] transition-all"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/apply"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] px-10 py-4 bg-[#0F172A] text-white rounded-full hover:bg-[#2563EB] hover:text-white transition-all shadow-2xl group"
                  >
                    Inquire <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Indicators */}
            <div className="flex lg:hidden items-center gap-3">
               <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/40 border border-[#0F172A]/5 text-[#0F172A] shadow-sm backdrop-blur-md"
                >
                  <SearchIcon className="w-4 h-4 text-[#2563EB]" />
                </button>
                <button
                  onClick={() => setIsOpen(true)}
                  aria-label="Open menu"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/40 border border-[#0F172A]/5 text-[#0F172A] shadow-sm backdrop-blur-md"
                >
                  <Menu className="w-4 h-4" />
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F8FAFC]/95 backdrop-blur-3xl flex flex-col p-4 pt-24 sm:p-8 sm:pt-32"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 sm:top-10 sm:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#0F172A]/5 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="max-w-2xl mx-auto w-full">
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-8">Access the Collection</p>
               <form onSubmit={handleSearchSubmit} className="relative group">
                  <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-[#0F172A]/10 group-focus-within:text-[#2563EB] transition-colors" />
                  <input 
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by market (e.g. Dubai, London)..."
                    className="w-full bg-transparent border-b-2 border-[#0F172A]/5 py-6 pl-12 sm:py-8 sm:pl-14 text-xl sm:text-3xl font-serif font-bold text-[#0F172A] placeholder:text-[#0F172A]/5 focus:border-[#2563EB] outline-none transition-all"
                  />
               </form>
               <div className="mt-12 flex flex-wrap gap-4">
                  {["Tokyo", "Miami", "Dubai", "London"].map(loc => (
                    <button 
                      key={loc}
                      onClick={() => {setSearchQuery(loc); router.push(`/marketplace?location=${loc}`); setIsSearchOpen(false);}}
                      className="px-6 py-3 rounded-xl bg-white border border-[#0F172A]/5 text-[10px] font-bold uppercase tracking-widest text-[#64748B] hover:text-[#0F172A] transition-all"
                    >
                      {loc} market
                    </button>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer (Menu) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-[#F8FAFC] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-6 sm:px-8 sm:py-10 border-b border-[#0F172A]/5">
                <div>
                   <p className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A]">Sterling Vane</p>
                   <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mt-1">Sovereign Collection</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#0F172A]/5 text-[#0F172A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-6 sm:px-8 sm:py-12 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-5 py-5 sm:px-6 sm:py-6 rounded-2xl text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] transition-all",
                      pathname === link.href
                        ? "text-[#0F172A] bg-white shadow-xl"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-white/50"
                    )}
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 text-[#2563EB]" />
                  </Link>
                ))}
              </nav>

              <div className="px-6 pb-8 pt-6 sm:px-8 sm:pb-12 border-t border-[#0F172A]/5 flex flex-col gap-4">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-white border border-[#0F172A]/5 text-[#0F172A] font-bold text-[10px] uppercase tracking-widest shadow-sm"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#2563EB]" /> Dashboard
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full py-5 rounded-2xl bg-[#0F172A] text-white font-bold text-[10px] uppercase tracking-widest hover:bg-red-950 transition-colors"
                    >
                      Exit Portal
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center justify-center w-full py-5 rounded-2xl bg-white border border-[#0F172A]/5 text-[#0F172A] font-bold text-[10px] uppercase tracking-widest"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/apply"
                      className="flex items-center justify-center w-full py-5 rounded-2xl bg-[#0F172A] text-white font-bold text-[10px] uppercase tracking-widest shadow-xl"
                    >
                      Inquire for Access
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
