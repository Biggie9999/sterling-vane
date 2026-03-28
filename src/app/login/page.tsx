"use client"

import { useState, useRef, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { Eye, EyeOff, ArrowRight, Shield, Lock, Mail, CheckCircle2, RefreshCw, Loader2, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type AuthMode = "signin" | "signup"
type SignupStage = "details" | "verify"

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
  const [stage, setStage] = useState<SignupStage>("details")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(r => r - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [resendTimer])

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
      setError("Security verification failed. Please check your credentials.")
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError("Complete identification required."); return }
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
        setError(data.error || "Onboarding protocol failed")
        setLoading(false)
        return
      }
      
      const signInRes = await signIn("credentials", { email, password, redirect: false })
      if (signInRes?.error) {
        setError("Account authorized, but failed to initialize session.")
        setLoading(false)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("A protocol error occurred during initialization.")
      setLoading(false)
    }
  }

  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  const switchMode = (m: AuthMode) => {
    setMode(m); setError(""); setStage("details"); setEmail(""); setPassword(""); setName("")
  }

  return (
    <div className="min-h-screen flex bg-white antialiased">
      {/* Cinematic Brand Panel */}
      <div className="hidden lg:flex lg:w-[48%] bg-slate-950 flex-col justify-between p-16 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-20 luxury-grain pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-blue-500/5 blur-[120px]" />
        
        <div className="relative z-10 transition-all duration-700 animate-sovereign-in">
          <Link href="/" className="inline-block group">
            <h1 className="font-serif text-3xl font-bold text-white tracking-tighter">Sterling Vane</h1>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold mt-2">The Sovereign Collection</p>
          </Link>
        </div>

        <div className="relative z-10 space-y-12 animate-sovereign-in [animation-delay:0.2s]">
          <div className="space-y-6">
             <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                <Star className="w-6 h-6 text-accent fill-current" />
             </div>
             <blockquote className="text-white text-4xl font-serif font-bold leading-[1.1] tracking-tighter max-w-sm">
               Institutional access to the world's most <span className="text-accent underline decoration-accent/30 underline-offset-8">coveted assets</span>.
             </blockquote>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
            {[
              { label: "Asset Liquidity", value: "Verified" },
              { label: "Global Collection", value: "Phase 1" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-accent font-bold text-lg font-serif tracking-tight">{s.value}</p>
                <p className="text-white/30 text-[9px] font-mono font-bold uppercase tracking-[0.2em] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-white/20 text-[9px] font-mono font-bold uppercase tracking-[0.2em]">
           <span>© 2026 Sovereign Assets</span>
           <span className="flex items-center gap-2">
             <Shield className="w-3 h-3" /> Encrypted Session
           </span>
        </div>
      </div>

      {/* Elegant Form Panel */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white overflow-y-auto selection:bg-accent/10 selection:text-accent">
        <div className="w-full max-w-md animate-sovereign-in">
          {/* Mobile Identifier */}
          <div className="lg:hidden mb-12">
            <Link href="/" className="inline-block">
               <h2 className="font-serif text-2xl font-bold text-slate-900 tracking-tighter">Sterling Vane</h2>
               <p className="font-mono text-[8px] uppercase tracking-widest text-accent font-bold">Investor Access</p>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tighter">
              {mode === "signin" ? "Investor Entrance" : "Begin Onboarding"}
            </h1>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              {mode === "signin" ? "Authorized access to your global real estate holdings." : "Step into the sovereign layer of property ownership."}
            </p>
          </div>

          {/* Core Auth Flow */}
          <div className="space-y-8">
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-[13px] rounded-2xl flex items-center gap-3 font-medium animate-pulse">
                <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                {error}
              </div>
            )}

            <button 
              onClick={handleGoogleAuth} 
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 bg-white hover:bg-slate-50 border border-slate-100 text-slate-900 py-4.5 rounded-2xl font-bold text-[14px] transition-all shadow-sm disabled:opacity-50 group active:scale-95"
            >
              <GoogleIcon /> Continue via Secure Identification
            </button>

            <div className="relative py-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[10px] text-slate-300 font-mono font-bold uppercase tracking-widest">Protocol Sync</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <form onSubmit={mode === "signin" ? handleSignIn : handleSignUpSubmit} className="space-y-6">
              {mode === "signup" && (
                <div className="animate-sovereign-in">
                  <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2.5">Full Identification</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="w-full px-5 py-4.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all text-sm font-medium"
                    placeholder="E.g. James Alexander Holden" 
                  />
                </div>
              )}
              
              <div className="animate-sovereign-in [animation-delay:0.1s]">
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2.5">Verified Email</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-5 py-4.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all text-sm font-medium"
                  placeholder="investor@sovereign.io" 
                />
              </div>

              <div className="animate-sovereign-in [animation-delay:0.2s]">
                <div className="flex justify-between items-center mb-2.5">
                  <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">Security Key</label>
                  {mode === "signin" && <button type="button" className="text-[10px] text-accent font-bold uppercase tracking-widest hover:underline">Forgot Key?</button>}
                </div>
                <div className="relative">
                  <input 
                    type={showPwd ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-5 py-4.5 pr-12 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent transition-all text-sm font-medium"
                    placeholder="••••••••" 
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors">
                    {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-slate-950 hover:bg-black text-white py-5 rounded-2xl font-bold transition-all disabled:opacity-50 shadow-2xl active:scale-95 text-[14px] uppercase tracking-widest"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    {mode === "signin" ? "Unseal Dashboard" : "Authorize Account"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-8 text-center animate-sovereign-in [animation-delay:0.3s]">
               <p className="text-sm font-medium text-slate-400 mb-6">
                 {mode === "signin" ? "New to the Sovereign Collection?" : "Already an authorized investor?"}
               </p>
               <button 
                onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                className="text-xs font-bold text-slate-900 border-2 border-slate-100 px-8 py-3 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest"
               >
                 {mode === "signin" ? "Request Onboarding" : "Sign In to Access"}
               </button>
            </div>
          </div>

          {/* Compliance Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 text-[10px] text-slate-300 font-medium leading-relaxed uppercase tracking-widest flex items-start gap-4">
             <Lock className="w-4 h-4 shrink-0 mt-0.5 opacity-40 text-accent" />
             <p>All sessions are encrypted with TLS 1.3 protocol. Access is restricted to authorized financial representatives and invited investors.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    }>
      <AuthInner />
    </Suspense>
  )
}
