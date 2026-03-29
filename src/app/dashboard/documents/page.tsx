"use client"

import { FileText, Download, Shield, Eye, Lock, ShieldCheck, ChevronRight } from "lucide-react"

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
    <div className="space-y-12 pb-24 lg:pb-0 animate-sovereign-in">
      {/* Header Narrative */}
      <div className="relative overflow-hidden p-8 sm:p-16 bg-white border border-slate-100 rounded-[3rem] shadow-sm group">
        <div className="absolute top-0 right-0 w-[500px] h-full bg-blue-50/30 blur-[100px] rounded-full translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
             <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
             <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.5em]">The Sovereign Vault</p>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3 tracking-tight">Documents</h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Your legal, financial, and operational assets are secured under institutional-grade encryption.
          </p>
        </div>
      </div>

      {/* Security Banner */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
          <Shield className="w-6 h-6 text-[#2563EB]" />
        </div>
        <div>
          <p className="text-[#0F172A] text-sm font-bold mb-1 tracking-tight">Regulated Security Standards</p>
          <p className="text-slate-500 text-[13px] font-medium leading-relaxed max-w-xl">
            All documents are stored in a distributed ledger environment. Access is restricted to verified accredited partners only.
          </p>
        </div>
      </div>

      {/* Categorized Document Feed */}
      <div className="space-y-16">
        {categories.map(cat => {
          const catDocs = DOCS.filter(d => d.category === cat)
          return (
            <div key={cat} className="space-y-8">
              <div className="flex items-center gap-6 px-4">
                <p className="text-[#0F172A] font-bold text-[10px] uppercase tracking-[0.4em] shrink-0">{cat}</p>
                <div className="flex-1 h-[1px] bg-slate-100" />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {catDocs.map(doc => (
                  <div 
                    key={doc.name} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 bg-white border border-slate-100 rounded-[2.5rem] p-8 sm:p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:bg-[#0F172A] transition-all duration-500">
                        <FileText className="w-7 h-7 text-[#2563EB] group-hover:text-white" />
                      </div>
                      <div>
                        <p className="text-[#0F172A] font-bold text-xl tracking-tight mb-2 group-hover:text-[#2563EB] transition-colors">{doc.name}</p>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                           <span className="text-[#2563EB]">{doc.type}</span>
                           <span className="opacity-40">/</span>
                           <span className="tabular-nums">{doc.size}</span>
                           <span className="opacity-40">/</span>
                           <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-[#0F172A] hover:bg-white border border-transparent hover:border-slate-200 transition-all shadow-sm">
                        <Eye className="w-5 h-5" />
                      </button>
                      <a href="/demo-document.txt" download={`Sovereign_${doc.name.replace(/\s+/g, '_')}.txt`} className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white bg-[#0F172A] px-10 py-5 rounded-2xl hover:bg-[#2563EB] transition-all shadow-xl group/btn">
                         Download <Download className="w-4 h-4 text-slate-400 group-hover/btn:text-white" />
                      </a>
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
