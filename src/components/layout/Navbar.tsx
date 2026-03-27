"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, LogIn, LayoutDashboard, LogOut, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Calculator", href: "/calculator" },
  { name: "About", href: "/about" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Trap body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const isHomePage = pathname === "/"

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group shrink-0">
            <span className={cn(
              "font-serif text-xl sm:text-2xl font-bold tracking-wide transition-colors",
              isScrolled || !isHomePage ? "text-slate-900" : "text-white drop-shadow-lg"
            )}>
              Sterling Vane
            </span>
            <span className={cn(
              "font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-colors",
              isScrolled || !isHomePage ? "text-[#006AFF]" : "text-white/70"
            )}>
              Global Holdings
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  pathname === link.href
                    ? isScrolled || !isHomePage
                      ? "text-[#1a1a1a] bg-slate-100"
                      : "text-white bg-white/15"
                    : isScrolled || !isHomePage
                    ? "text-[#666] hover:text-[#1a1a1a] hover:bg-slate-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all",
                    isScrolled || !isHomePage
                      ? "text-[#666] hover:bg-slate-100 hover:text-[#1a1a1a]"
                      : "text-white/90 hover:bg-white/10"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-[#1a1a1a] text-white rounded-full hover:bg-black transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "text-sm font-medium px-4 py-2 rounded-full transition-all",
                    isScrolled || !isHomePage
                      ? "text-[#666] hover:bg-slate-100 hover:text-[#1a1a1a]"
                      : "text-white/90 hover:bg-white/10"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/apply"
                  className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#006AFF] hover:bg-[#0050CC] text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-px"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className={cn(
              "md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all",
              isScrolled || !isHomePage ? "bg-slate-100 text-[#1a1a1a]" : "bg-white/15 text-white"
            )}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden transition-all duration-300",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in panel from right */}
        <div
          ref={drawerRef}
          className={cn(
            "absolute top-0 right-0 h-full w-[80vw] max-w-sm bg-white border-l border-slate-200 flex flex-col transition-transform duration-300 ease-out shadow-2xl",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <p className="font-serif text-xl font-bold text-slate-900">Sterling Vane</p>
              <p className="font-mono text-[0.6rem] tracking-widest font-bold text-[#006AFF] uppercase">Global Holdings</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-4 py-4 rounded-xl text-lg font-bold transition-all",
                  pathname === link.href
                    ? "text-[#006AFF] bg-[#006AFF]/10 border border-[#006AFF]/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
              >
                {link.name}
                <ChevronRight className="w-4 h-4 opacity-40 text-slate-400" />
              </Link>
            ))}
          </nav>

          {/* Drawer Footer CTA */}
          <div className="px-6 pb-10 pt-4 border-t border-slate-100 flex flex-col gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-slate-200 text-slate-900 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#006AFF]" /> Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors border border-red-100"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-slate-200 text-slate-900 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-[#006AFF]" /> Sign In
                </Link>
                <Link
                  href="/apply"
                  className="flex items-center justify-center w-full py-3.5 rounded-xl bg-[#006AFF] text-white font-semibold text-sm hover:bg-[#0050CC] transition-colors shadow-md"
                >
                  Get Started →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
