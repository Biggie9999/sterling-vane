"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingAgent } from "@/components/FloatingAgent"

// Routes that manage their own full-screen layout (no public nav/footer)
const PRIVATE_ROUTES = ["/dashboard", "/admin", "/login", "/apply"]

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPrivate = PRIVATE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))

  if (isPrivate) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <FloatingAgent />
    </>
  )
}
