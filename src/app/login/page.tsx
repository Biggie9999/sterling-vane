"use client"

import { useState, useRef, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { Eye, EyeOff, ArrowRight, Shield, Lock, Mail, CheckCircle2, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Supabase-compatible email OTP simulation + real credentials auth
// When Supabase is configured, replace these with supabase.auth.signInWithOtp() etc.

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

function OTPInput({ onComplete }: { onComplete: (code: string) => void }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""])
  const refs = [
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
  ]

  const handleChange = (i: number, val: string) => {
    const clean = val.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[i] = clean
    setDigits(next)
    if (clean && i < 5) refs[i + 1].current?.focus()
    if (next.every(d => d)) onComplete(next.join(""))
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs[i - 1].current?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (paste.length === 6) {
      const next = paste.split("")
      setDigits(next)
      refs[5].current?.focus()
      onComplete(paste)
    }
  }

  useEffect(() => { refs[0].current?.focus() }, [])

  return (
    <div className="flex gap-2 sm:gap-3 justify-center my-6">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          onPaste={handlePaste}
          className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-2xl border-2 outline-none transition-all
            ${d ? "border-[#006AFF] bg-[#006AFF]/5 text-[#006AFF]" : "border-slate-200 bg-slate-50 text-slate-900"}
            focus:border-[#006AFF] focus:bg-white focus:ring-4 focus:ring-[#006AFF]/10`}
        />
      ))}
    </div>
  )
}

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
      setError("Invalid credentials. Please check your email and password.")
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
        setError(data.error || "Failed to create account")
        setLoading(false)
        return
      }
      
      const signInRes = await signIn("credentials", { email, password, redirect: false })
      if (signInRes?.error) {
        setError("Account created, but failed to log in.")
        setLoading(false)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("An error occurred during sign up.")
      setLoading(false)
    }
  }

  const handleOTPVerify = async (code: string) => {
    setLoading(true)
    setError("")
    // Simulate OTP verification (replace with supabase.auth.verifyOtp({ email, token: code, type: 'email' }))
    await new Promise(r => setTimeout(r, 1000))
    // For demo: any 6-digit code works. In production, Supabase checks the real code from email.
    if (code.length === 6) {
      // Auto sign in after verification
      await signIn("credentials", { email, password: password || "verified", redirect: false })
      router.push("/dashboard")
    } else {
      setError("Invalid code. Please check your email and try again.")
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setResendTimer(60)
    setError("")
  }

  const switchMode = (m: AuthMode) => {
    setMode(m); setError(""); setStage("details"); setEmail(""); setPassword(""); setName("")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0A2540] flex-col justify-between p-14 xl:p-16 relative overflow-hidden shrink-0">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #006AFF22 0%, transparent 60%), radial-gradient(circle at 80% 20%, #635BFF22 0%, transparent 40%)` }} />
        <div className="relative z-10">
          <Link href="/">
            <p className="font-serif text-2xl font-bold text-white">Sterling Vane</p>
            <p className="text-[10px] tracking-[0.3em] text-[#006AFF] uppercase font-bold mt-1">Investor Portal</p>
          </Link>
        </div>
        <div className="relative z-10 space-y-8">
          <blockquote className="text-white/80 text-xl font-serif leading-relaxed max-w-sm">
            "The Sovereign Collection is built for investors who want their capital to work as hard as they do."
          </blockquote>
          <p className="text-[#006AFF] text-xs font-bold uppercase tracking-[0.2em]">— Sterling Vane, Principal</p>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            {[
              { label: "Min. Investment", value: "$10K" },
              { label: "Target 6M Return", value: "90%" },
              { label: "Luxury Assets", value: "5 Live" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white font-bold text-2xl font-serif">{s.value}</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-white/20 text-[10px] tracking-widest uppercase">© 2026 Sterling Vane Development Group</p>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link href="/"><p className="font-serif text-2xl font-bold text-slate-900">Sterling Vane</p></Link>
          </div>

          {/* Mode Tabs */}
          {stage === "details" && (
            <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
              {(["signin", "signup"] as AuthMode[]).map(m => (
                <button key={m} onClick={() => switchMode(m)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                  {m === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* ── SIGN IN ── */}
            {mode === "signin" && (
              <motion.div key="signin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
                    <Lock className="w-3 h-3" /> Secure Investor Access
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back.</h1>
                  <p className="text-slate-500 text-sm">Sign in to access your investor dashboard.</p>
                </div>

                {error && <div className="mb-5 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />{error}</div>}

                <button onClick={handleGoogleAuth} disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold transition-all shadow-sm mb-5 disabled:opacity-60">
                  <GoogleIcon /> Sign in with Google
                </button>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF] transition-all text-sm"
                      placeholder="you@company.com" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-bold text-slate-700">Password</label>
                      <a href="#" className="text-xs text-[#006AFF] hover:underline font-medium">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <input type={showPwd ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF] transition-all text-sm"
                        placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#006AFF] hover:bg-[#0050CC] text-white py-4 rounded-xl font-bold transition-all disabled:opacity-60 shadow-lg mt-2">
                    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── SIGN UP — Details ── */}
            {mode === "signup" && stage === "details" && (
              <motion.div key="signup-details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Create your account.</h1>
                  <p className="text-slate-500 text-sm">Sign up to access the Sovereign investor dashboard. No investment required upfront.</p>
                </div>

                {error && <div className="mb-5 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />{error}</div>}

                <button onClick={handleGoogleAuth} disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold transition-all shadow-sm mb-5 disabled:opacity-60">
                  <GoogleIcon /> Sign up with Google
                </button>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF] transition-all text-sm"
                      placeholder="James Holden" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF] transition-all text-sm"
                      placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showPwd ? "text" : "password"} required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006AFF] transition-all text-sm"
                        placeholder="Min. 8 characters" />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#006AFF] hover:bg-[#0050CC] text-white py-4 rounded-xl font-bold transition-all disabled:opacity-60 shadow-lg mt-2">
                    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
                <p className="text-xs text-slate-400 text-center mt-4">By creating an account you agree to our Terms of Service and Privacy Policy.</p>
              </motion.div>
            )}

            {/* ── SIGN UP — Verify OTP ── */}
            {mode === "signup" && stage === "verify" && (
              <motion.div key="signup-verify" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#006AFF]/10 flex items-center justify-center mx-auto mb-5">
                    <Mail className="w-8 h-8 text-[#006AFF]" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We've sent a 6-digit verification code to<br />
                    <span className="font-bold text-slate-900">{email}</span>
                  </p>
                </div>

                {error && <div className="mb-5 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />{error}</div>}

                {loading ? (
                  <div className="flex flex-col items-center py-8">
                    <div className="w-10 h-10 border-4 border-[#006AFF]/20 border-t-[#006AFF] rounded-full animate-spin mb-4" />
                    <p className="text-slate-500 text-sm font-medium">Verifying your code…</p>
                  </div>
                ) : (
                  <>
                    <OTPInput onComplete={handleOTPVerify} />
                    <div className="flex flex-col items-center gap-3 mt-2">
                      <button onClick={handleResend} disabled={resendTimer > 0}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 disabled:opacity-50 transition-colors font-medium">
                        <RefreshCw className="w-4 h-4" />
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
                      </button>
                      <button onClick={() => setStage("details")} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                        ← Use a different email
                      </button>
                    </div>
                  </>
                )}

                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006AFF] shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <p className="font-bold text-slate-900 mb-1">What happens next?</p>
                    <p>After verification, you'll have full access to your Investor Dashboard. From there, browse our live assets and start your investment journey — completely on your own schedule.</p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
            {stage === "details" && (
              <p className="text-center text-sm text-slate-500">
                {mode === "signin" ? (
                  <>New to Sterling Vane? <button onClick={() => switchMode("signup")} className="text-[#006AFF] font-bold hover:underline">Create an account →</button></>
                ) : (
                  <>Already have an account? <button onClick={() => switchMode("signin")} className="text-[#006AFF] font-bold hover:underline">Sign in →</button></>
                )}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <Shield className="w-4 h-4 shrink-0 text-slate-300" />
              <p>Your session is encrypted and secured with JWT. We never store passwords in plain text.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-4 border-[#006AFF] border-t-transparent rounded-full animate-spin" /></div>}>
      <AuthInner />
    </Suspense>
  )
}
