"use client"

import { useState, useEffect } from "react"
import { Search, Users } from "lucide-react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    // Fetch from the admin stats endpoint which includes recentUsers
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(data => {
        if (data.recentUsers) setUsers(data.recentUsers)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = users.filter(u =>
    !search ||
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-1">Admin</p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">Investor Directory</h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search investors..."
            className="bg-transparent text-sm font-medium text-[#0F172A] placeholder:text-slate-300 focus:outline-none w-48"
          />
        </div>
      </div>

      {/* Table */}
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
                  {["Investor", "Email", "Tier", "Joined", "Status"].map(h => (
                    <th key={h} className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {(u.name || u.email || "?")[0].toUpperCase()}
                        </div>
                        <p className="font-serif font-bold text-[#0F172A] text-sm">{u.name || "—"}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs font-medium">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-[#2563EB] text-[9px] font-bold uppercase tracking-widest rounded-full">
                        {u.investorProfile?.tier || "Seed"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs font-mono">
                      {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                        u.investorProfile ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {u.investorProfile ? "Active" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && !loading && (
              <div className="text-center py-16">
                <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 font-medium text-sm">No investors found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
