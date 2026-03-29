"use client"

import { useState, useEffect } from "react"
import { Plus, Image as ImageIcon, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/properties")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setProperties(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-1">Admin</p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">Asset Management</h1>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#2563EB] transition-all shadow-lg">
          <Plus className="w-4 h-4" /> Add Asset
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  {["Property", "Type", "Yield", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {properties.map((p, i) => {
                  const imgs: string[] = typeof p.images === "string" ? JSON.parse(p.images) : (p.images ?? [])
                  return (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {imgs[0] ? (
                            <img src={imgs[0]} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-100" />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                              <ImageIcon className="w-4 h-4 text-slate-300" />
                            </div>
                          )}
                          <div>
                            <p className="font-serif font-bold text-[#0F172A] text-sm leading-tight">{p.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium truncate max-w-[160px]">{p.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-widest rounded-full">{p.type}</span>
                      </td>
                      <td className="px-5 py-4 font-mono text-sm font-bold text-[#2563EB]">{p.yieldEstimate}%</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                          p.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600" :
                          p.status === "FULLY_SUBSCRIBED" ? "bg-blue-50 text-blue-600" :
                          "bg-amber-50 text-amber-600"
                        }`}>
                          {p.status === "ACTIVE" ? "Active" : p.status === "FULLY_SUBSCRIBED" ? "Funded" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/properties/${p.id}/images`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#2563EB]/5 text-[#2563EB] rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-[#2563EB]/10 transition-colors"
                          >
                            <ImageIcon className="w-3 h-3" /> Images ({imgs.length})
                          </Link>
                          <Link
                            href={`/properties/${p.slug}`}
                            target="_blank"
                            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-[#0F172A] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {properties.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-400 font-medium text-sm">No properties found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
