"use client"

import { FileText, Download, Shield, Eye, Lock, ShieldCheck } from "lucide-react"

const DOCS = [
  { name: "Private Placement Memorandum", subtitle: "Sovereign Collection — Phase 1", type: "PDF", size: "4.2 MB", date: "Mar 2026", category: "Legal" },
  { name: "Subscription Agreement", subtitle: "Investor Accreditation & Commitment", type: "PDF", size: "1.8 MB", date: "Mar 2026", category: "Legal" },
  { name: "Operating Agreement", subtitle: "SPV Structure & Governance", type: "PDF", size: "2.1 MB", date: "Mar 2026", category: "Legal" },
  { name: "Q1 2026 Performance Report", subtitle: "Portfolio metrics & occupancy data", type: "PDF", size: "890 KB", date: "Apr 2026", category: "Reports" },
  { name: "Unit Valuation Summary", subtitle: "Independent appraisals — all 3 markets", type: "PDF", size: "1.2 MB", date: "Mar 2026", category: "Reports" },
  { name: "Tax Reporting (K-1)", subtitle: "2025 Schedule K-1 for your entity", type: "PDF", size: "340 KB", date: "Feb 2026", category: "Tax" },
]

export default function DocumentsPage() {
  const categories = ["Legal", "Reports", "Tax"]

  return (
    <div className="space-y-12 animate-sovereign-in">
      <div className="relative overflow-hidden p-10 bg-white border border-[#0A0A0A]/5 rounded-[2.5rem] shadow-sm group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
             <p className="text-[#C9A84C] font-bold text-[10px] uppercase tracking-[0.4em]">The Sovereign Vault</p>
          </div>
          <h1 className="font-serif text-4xl font-bold text-[#0A0A0A] mb-3 tracking-tight">Documents</h1>
          <p className="text-[#8A8A8A] text-base font-serif italic max-w-xl">"All legal, financial, and operational assets for your position are secured here."</p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-full bg-[#C9A84C]/5 blur-[80px] rounded-full translate-x-1/2 pointer-events-none" />
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-4 bg-[#FAF9F6] border border-[#0A0A0A]/5 rounded-2xl p-6 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-white border border-[#0A0A0A]/5 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-[#C9A84C]" />
        </div>
        <p className="text-[#8A8A8A] text-sm font-medium leading-relaxed">
          All documents are encrypted and accessible only to verified accredited investors. Downloads are logged for regulatory compliance.
        </p>
      </div>

      {/* Documents by category */}
      <div className="space-y-12 pb-12">
        {categories.map(cat => {
          const catDocs = DOCS.filter(d => d.category === cat)
          return (
            <div key={cat} className="space-y-6">
              <div className="flex items-center gap-4 px-2">
                <p className="text-[#0A0A0A] font-bold text-[11px] uppercase tracking-[0.3em]">{cat}</p>
                <div className="flex-1 h-px bg-[#0A0A0A]/5" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {catDocs.map(doc => (
                  <div key={doc.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border border-[#0A0A0A]/5 rounded-[2rem] p-6 hover:border-[#C9A84C]/30 hover:shadow-xl transition-all duration-500 group">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-[#FAF9F6] border border-[#0A0A0A]/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#0A0A0A] group-hover:text-white transition-all duration-500">
                        <FileText className="w-6 h-6 text-[#C9A84C]" />
                      </div>
                      <div>
                        <p className="text-[#0A0A0A] font-bold text-base tracking-tight mb-1">{doc.name}</p>
                        <p className="text-[#8A8A8A] text-[11px] font-bold uppercase tracking-widest opacity-60 font-mono">
                          {doc.subtitle} · {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#FAF9F6] text-[#8A8A8A] hover:text-[#0A0A0A] hover:bg-white border border-transparent hover:border-[#0A0A0A]/5 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A] bg-white border border-[#0A0A0A]/10 px-6 py-4 rounded-xl hover:bg-[#0A0A0A] hover:text-white transition-all shadow-sm">
                        <Download className="w-4 h-4 text-[#C9A84C]" /> {doc.type}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
