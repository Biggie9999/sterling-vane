"use client"

import { FileText, Download, Shield, Eye } from "lucide-react"

const DOCS = [
  { name: "Private Placement Memorandum", subtitle: "Sovereign Collection — Phase 1", type: "PDF", size: "4.2 MB", date: "Mar 2026", icon: FileText, category: "Legal" },
  { name: "Subscription Agreement", subtitle: "Investor Accreditation & Commitment", type: "PDF", size: "1.8 MB", date: "Mar 2026", icon: FileText, category: "Legal" },
  { name: "Operating Agreement", subtitle: "SPV Structure & Governance", type: "PDF", size: "2.1 MB", date: "Mar 2026", icon: FileText, category: "Legal" },
  { name: "Q1 2026 Performance Report", subtitle: "Portfolio metrics & occupancy data", type: "PDF", size: "890 KB", date: "Apr 2026", icon: FileText, category: "Reports" },
  { name: "Unit Valuation Summary", subtitle: "Independent appraisals — all 3 markets", type: "PDF", size: "1.2 MB", date: "Mar 2026", icon: FileText, category: "Reports" },
  { name: "Tax Reporting (K-1)", subtitle: "2025 Schedule K-1 for your entity", type: "PDF", size: "340 KB", date: "Feb 2026", icon: FileText, category: "Tax" },
]

const CATEGORIES = ["All", "Legal", "Reports", "Tax"]

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#006AFF] mb-2">Investor Vault</p>
        <h1 className="font-serif text-3xl text-white mb-1">Documents</h1>
        <p className="text-warmGrey text-sm">All legal, financial, and operational documents for your position.</p>
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-xl p-4">
        <Shield className="w-5 h-5 text-[#006AFF] shrink-0" />
        <p className="text-warmGrey text-xs">All documents are encrypted and accessible only to verified accredited investors. Downloads are logged for compliance.</p>
      </div>

      {/* Documents */}
      {CATEGORIES.slice(1).map((cat) => {
        const catDocs = DOCS.filter((d) => d.category === cat)
        return (
          <div key={cat}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey mb-3">{cat}</p>
            <div className="space-y-2">
              {catDocs.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between gap-4 bg-[#111] border border-[#222] rounded-xl p-5 hover:border-[#006AFF]/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#006AFF]/10 rounded-xl flex items-center justify-center shrink-0">
                      <doc.icon className="w-5 h-5 text-[#006AFF]" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{doc.name}</p>
                      <p className="text-warmGrey text-xs">{doc.subtitle} · {doc.size} · {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="text-warmGrey hover:text-white transition-colors p-2">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#006AFF] border border-[#006AFF]/30 px-3 py-2 rounded-lg hover:bg-[#006AFF]/10 transition-colors">
                      <Download className="w-3 h-3" /> {doc.type}
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
