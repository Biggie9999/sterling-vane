"use client"

import { FileText, Download, Shield, Eye, Lock } from "lucide-react"

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
    <div className="space-y-8">
      <div>
        <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-2">Investor Vault</p>
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-1">Documents</h1>
        <p className="text-slate-500 text-sm font-medium">All legal, financial, and operational documents for your position.</p>
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <Shield className="w-5 h-5 text-[#006AFF] shrink-0" />
        <p className="text-slate-600 text-sm font-medium">All documents are encrypted and accessible only to verified accredited investors. Downloads are logged for compliance.</p>
      </div>

      {/* Documents by category */}
      {categories.map(cat => {
        const catDocs = DOCS.filter(d => d.category === cat)
        return (
          <div key={cat}>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">{cat}</p>
            <div className="space-y-3">
              {catDocs.map(doc => (
                <div key={doc.name} className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#006AFF]/30 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#006AFF]/10 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#006AFF]" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">{doc.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{doc.subtitle} · {doc.size} · {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-lg hover:bg-slate-50">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#006AFF] border border-[#006AFF]/30 px-4 py-2 rounded-xl hover:bg-[#006AFF] hover:text-white transition-all">
                      <Download className="w-3.5 h-3.5" /> {doc.type}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
