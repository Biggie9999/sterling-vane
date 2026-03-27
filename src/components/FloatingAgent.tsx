"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Phone, Mail, Calendar, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingAgent() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!message.trim()) return
    setSent(true)
    setTimeout(() => { setSent(false); setMessage("") }, 3000)
  }

  const quickQuestions = [
    "What's the minimum investment?",
    "How does the 30/60/90 return work?",
    "Is my capital secure?",
    "How do I get started?",
  ]

  return (
    <div className="fixed bottom-6 right-5 sm:right-8 z-[100]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-[0_20px_80px_-15px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0A2540] p-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#006AFF] flex items-center justify-center text-white font-serif text-lg font-bold">V</div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0A2540]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Investor Relations</p>
                  <p className="text-white/60 text-xs">Sterling Vane · Typically replies in minutes</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat body */}
            <div className="p-5 space-y-4 bg-slate-50/50 min-h-[160px]">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#006AFF] flex items-center justify-center text-white text-xs font-bold shrink-0">V</div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3.5 max-w-[260px] shadow-sm">
                  <p className="text-slate-800 text-sm font-medium leading-relaxed">
                    Hi! I'm your dedicated Sterling Vane agent. I can answer questions about our investment structure, returns, or help you get started. 👋
                  </p>
                </div>
              </div>

              {sent && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                  <div className="bg-[#006AFF] text-white rounded-2xl rounded-tr-sm p-3 max-w-[220px]">
                    <p className="text-sm">{message}</p>
                  </div>
                </motion.div>
              )}
              {sent && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#006AFF] flex items-center justify-center text-white text-xs font-bold shrink-0">V</div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3.5 max-w-[260px] shadow-sm">
                    <p className="text-slate-800 text-sm">Thanks! A member of our IR team will be in touch within 24 hours. Alternatively, book a call below. ✓</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            {!sent && (
              <div className="px-5 pb-3 flex flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Quick questions</p>
                {quickQuestions.map(q => (
                  <button key={q} onClick={() => setMessage(q)}
                    className={`text-left text-xs font-semibold px-3 py-2.5 rounded-xl border transition-all ${message === q ? "border-[#006AFF] bg-[#006AFF]/5 text-[#006AFF]" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Message input */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Type a message…"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#006AFF] focus:border-transparent transition-all"
                />
                <button onClick={handleSend}
                  className="w-10 h-10 bg-[#006AFF] hover:bg-[#0050CC] text-white rounded-xl flex items-center justify-center transition-colors shadow-md shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact options */}
            <div className="px-4 pb-5 grid grid-cols-2 gap-2">
              <a href="tel:+12125550100" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:border-[#006AFF] hover:text-[#006AFF] transition-all bg-slate-50">
                <Phone className="w-3.5 h-3.5" /> Call Us
              </a>
              <a href="mailto:ir@sterlingvane.com" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:border-[#006AFF] hover:text-[#006AFF] transition-all bg-slate-50">
                <Mail className="w-3.5 h-3.5" /> Email IR
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative bg-[#006AFF] hover:bg-[#0050CC] text-white rounded-full shadow-[0_8px_30px_rgba(0,106,255,0.4)] flex items-center gap-3 px-5 py-4 font-bold text-sm transition-colors"
      >
        <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse absolute -top-0.5 -right-0.5 border-2 border-white" />
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Talk to an Agent"}</span>
      </motion.button>
    </div>
  )
}
