"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { GhostButton } from "@/components/shared/GhostButton"
import { GoldButton } from "@/components/shared/GoldButton"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Calculator", href: "/calculator" },
  { name: "About", href: "/about" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Always dark on non-home pages unless scrolled? The design says sticky, blur backdrop. 
  // Mixed luxury means hero is usually dark. We can just use a dark theme for the navbar text or switch.
  // For simplicity, let's keep it luxury light/dark adaptive.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-slate-200 py-4 shadow-sm"
          : "bg-white/60 backdrop-blur-md border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-serif text-2xl tracking-wide text-brand-blue group-hover:text-brand-accent transition-colors">
            Sterling Vane
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-slate-500 uppercase mt-1">
            Global Holdings
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative text-sm font-sans tracking-wide transition-colors hover:text-brand-accent pb-1 group",
                pathname === link.href ? "text-brand-blue font-semibold" : "text-slate-600"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute left-0 bottom-0 w-full h-[2px] bg-brand-accent transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100",
                pathname === link.href && "scale-x-100"
              )} />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-sm font-sans font-semibold tracking-wide text-brand-blue hover:text-brand-accent transition-colors px-4 py-2 hover:bg-slate-50 rounded-full">
            Sign In
          </Link>
          <GoldButton href="/apply" className="py-2 px-5 text-xs rounded-full">
            Get Started
          </GoldButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-800"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black luxury-grain flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="flex flex-col items-start" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="font-serif text-2xl tracking-wide text-white">Sterling Vane</span>
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase mt-1">Global Holdings</span>
            </Link>
            <button className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>
          <nav className="flex flex-col space-y-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif text-white hover:text-gold transition-colors"
                style={{ animation: 'fade-in 0.5s ease-out forwards' }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-4 pb-8">
            <GhostButton href="/login" className="w-full justify-center border-border-dark text-white rounded-full">
              Sign In
            </GhostButton>
            <GoldButton href="/apply" className="w-full justify-center rounded-full">
              Get Started
            </GoldButton>
          </div>
        </div>
      )}
    </header>
  )
}
