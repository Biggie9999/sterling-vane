"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight, TrendingUp, Shield, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await signIn("credentials", { email, password, redirect: false })
    if (res?.error) {
      setError("Invalid credentials. Use any email and password to sign in.")
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0A2540] flex-col justify-between p-16 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #635BFF 0%, transparent 40%)`
        }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <p className="font-serif text-2xl text-white">Sterling Vane</p>
            <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[#C9A84C] uppercase">Global Holdings</p>
          </Link>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <blockquote className="text-white/80 text-xl font-serif leading-relaxed mb-8 max-w-sm">
            "The Sovereign Collection is built for investors who want their capital to work as hard as they do."
          </blockquote>
          <p className="text-[#C9A84C] font-mono text-xs tracking-widest">— STERLING VANE, PRINCIPAL</p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: "Target Q1 Return", value: "35%" },
            { label: "Min. Investment", value: "$10K" },
            { label: "Luxury Units", value: "20" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-white font-bold text-2xl">{s.value}</p>
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link href="/">
              <p className="font-serif text-2xl text-[#0A2540]">Sterling Vane</p>
              <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[#C9A84C] uppercase">Global Holdings</p>
            </Link>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              <Lock className="w-3 h-3" /> Secure Investor Access
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back.</h1>
            <p className="text-slate-500 text-sm">Sign in to access your investor portal.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A2540] transition-all text-sm"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs text-[#635BFF] hover:text-[#0A2540] font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A2540] transition-all text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#0A2540] hover:bg-slate-800 text-white py-4 rounded-xl font-semibold transition-all disabled:opacity-60 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 text-xs text-slate-400">
            <Shield className="w-4 h-4 shrink-0" />
            <p>Your session is encrypted and secured with JWT. We never store passwords in plain text.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Not yet an investor?{" "}
              <Link href="/apply" className="text-[#635BFF] font-semibold hover:text-[#0A2540] transition-colors">
                Apply for Allocation →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
