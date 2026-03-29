"use client"

import { useState, useRef, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { Eye, EyeOff, ArrowRight, Shield, Lock, Mail, CheckCircle2, RefreshCw, Loader2, Star, Globe, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type AuthMode = "signin" | "signup"

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

function AuthInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<AuthMode>(searchParams.get("mode") === "signup" ? "signup" : "signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGoogleAuth = async () => {
    setLoading(true)
    setError("")
    signIn("google", { callbackUrl: "/dashboard" })
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await signIn("credentials", { email, password, redirect: false })
    if (res?.error) {
      setError("Log in failed. Please check your credentials.")
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError("Please enter your full name."); return }
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Account creation failed.")
        setLoading(false)
        return
      }
      
      const signInRes = await signIn("credentials", { email, password, redirect: false })
      if (signInRes?.error) {
        setError("Account created, but failed to log in automatically.")
        setLoading(false)
      } else {
        router.push("/onboarding")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred.")
      setLoading(false)
    }
  }

  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      // @ts-ignore
      if (session?.user?.onboardingComplete === false) {
        router.push("/onboarding")
      } else {
        router.push("/dashboard")
      }
    }
  }, [status, session, router])

  const switchMode = (m: AuthMode) => {
    setMode(m); setError(""); setEmail(""); setPassword(""); setName("")
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] antialiased">
      {/* Editorial Identity Panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-white flex-col justify-between p-20 relative overflow-hidden shrink-0 border-r border-[#0F172A]/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/5 blur-[120px] rounded-full" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-block flex flex-col items-start gap-2">
            <h1 className="font-serif text-3xl font-bold text-[#0F172A] tracking-tight">Sterling Vane</h1>
            <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB]">The Sovereign Collection</p>
          </Link>
        </div>

        <div className="relative z-10 space-y-12">
          <div className="space-y-8">
             <div className="w-14 h-14 rounded-3xl bg-[#F1F5F9] border border-[#0F172A]/5 flex items-center justify-center">
                <Star className="w-6 h-6 text-[#2563EB] fill-current" />
             </div>
             <blockquote className="text-[#0F172A] text-5xl sm:text-6xl font-serif font-bold leading-[1.05] tracking-tighter max-w-sm">
               Real estate <br /><span className="text-[#2563EB] italic">reimagined.</span>
             </blockquote>
             <p className="text-[#64748B] text-xl font-serif italic font-medium opacity-60">"The next chapter in luxury hospitality."</p>
          </div>
          
          <div className="grid grid-cols-2 gap-12 pt-12 border-t border-[#0F172A]/5">
            {[
              { label: "Market Status", value: "Verified" },
              { label: "Global Presence", value: "Flagship" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-[#0F172A] font-bold text-xl font-serif tracking-tight">{s.value}</p>
                <p className="text-[#2563EB] text-[9px] font-bold uppercase tracking-[0.3em] mt-2 leading-none pt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[#64748B]/40 text-[9px] font-bold uppercase tracking-[0.4em]">
           <span>Partner Access Portal</span>
           <span className="flex items-center gap-3">
             <ShieldCheck className="w-4 h-4 text-[#2563EB]" /> Secure
           </span>
        </div>
      </div>

      {/* Main Entrance Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto selection:bg-[#2563EB]/20 bg-[#F8FAFC] lg:bg-transparent">
        <div className="w-full max-w-md">
          {/* Mobile Identity */}
          <div className="lg:hidden mb-16">
            <Link href="/" className="inline-block w-full text-center">
               <h2 className="font-serif text-3xl font-bold text-[#0F172A] tracking-tighter">Sterling Vane</h2>
               <p className="font-montserrat text-[9px] uppercase tracking-[0.5em] text-[#2563EB] font-bold mt-2">Sovereign Collection</p>
            </Link>
          </div>

          <div className="mb-14 text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] mb-4 tracking-tighter">
              {mode === "signin" ? "Partner Access." : "Join Us."}
            </h1>
            <p className="text-[#64748B] font-bold text-[10px] uppercase tracking-[0.3em] opacity-60">
              {mode === "signin" ? "Log in to your private dashboard" : "Start your journey with The Sovereign Collection"}
            </p>
          </div>

          <div className="space-y-10">
            <button 
              onClick={handleGoogleAuth} 
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 bg-white hover:bg-[#F8FAFC] border border-[#0F172A]/5 text-[#0F172A] py-4 sm:py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-500 shadow-sm disabled:opacity-50 group active:scale-95"
            >
              <GoogleIcon /> Continue with Google
            </button>

            <div className="relative py-4 flex items-center gap-6">
              <div className="flex-1 h-px bg-[#0F172A]/5" />
              <span className="text-[9px] text-[#64748B] font-bold uppercase tracking-[0.4em] opacity-40">Or</span>
              <div className="flex-1 h-px bg-[#0F172A]/5" />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-white border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-2xl flex items-center gap-4 shadow-xl"
              >
                <div className="w-2 h-2 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            <form onSubmit={mode === "signin" ? handleSignIn : handleSignUpSubmit} className="space-y-6">
              {mode === "signup" && (
                <div className="space-y-3">
                  <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.4em] pl-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="w-full px-6 py-5 rounded-2xl bg-white border border-[#0F172A]/5 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/5 transition-all text-sm font-medium text-[#0F172A] placeholder-[#64748B]/30"
                    placeholder="Enter your name" 
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.4em] pl-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-6 py-5 rounded-2xl bg-white border border-[#0F172A]/5 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/5 transition-all text-sm font-medium text-[#0F172A] placeholder-[#64748B]/30"
                  placeholder="name@example.com" 
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-[9px] font-bold text-[#64748B] uppercase tracking-[0.4em]">Password</label>
                </div>
                <div className="relative">
                  <input 
                    type={showPwd ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-6 py-5 pr-14 rounded-2xl bg-white border border-[#0F172A]/5 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/5 transition-all text-sm font-medium text-[#0F172A] placeholder-[#64748B]/30"
                    placeholder="••••••••" 
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#2563EB] transition-colors">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 bg-[#0F172A] hover:bg-[#2563EB] hover:text-[#0F172A] text-white py-5 sm:py-6 rounded-2xl font-bold transition-all duration-700 disabled:opacity-20 shadow-2xl active:scale-95 text-[10px] uppercase tracking-[0.4em] group"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    {mode === "signin" ? "Log In" : "Get Started"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-10 text-center">
               <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.3em] mb-6 opacity-60">
                 {mode === "signin" ? "New to Sterling Vane?" : "Already have an account?"}
               </p>
               <button 
                onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                className="text-[9px] font-bold text-[#0F172A] border-b-2 border-[#2563EB] pb-1 hover:text-[#2563EB] transition-all uppercase tracking-[0.2em]"
               >
                 {mode === "signin" ? "Create Account" : "Sign In"}
               </button>
            </div>
          </div>

          <div className="mt-24 pt-10 border-t border-[#0F172A]/5 text-[9px] text-[#64748B] font-bold leading-relaxed uppercase tracking-[0.3em] flex items-start gap-4 opacity-40">
             <Globe className="w-4 h-4 shrink-0 mt-0.5 text-[#2563EB]" />
             <p>All access is monitored for security. Verified under SEC protocol. Sterling Vane Global Asset Management.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-12 h-12 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AuthInner />
    </Suspense>
  )
}
