"use client"

import { GhostButton } from "@/components/shared/GhostButton"
import { Search } from "lucide-react"

const users = [
  { id: "USR-001", name: "James Holden", tier: "Growth", email: "james.h@example.com", kyc: "Verified", status: "Active" },
  { id: "USR-002", name: "Eleanor Wright", tier: "Private", email: "eleanor.w@example.com", kyc: "Pending", status: "Review" },
  { id: "USR-003", name: "Sarah Jenkins", tier: "Entry", email: "s.jenkins@example.com", kyc: "Verified", status: "Active" }
]

export default function AdminUsersPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="font-serif text-3xl text-white">Investor Directory</h1>
        
        <div className="relative w-full md:w-64">
           <Search className="w-4 h-4 text-warmGrey absolute left-3 top-1/2 -translate-y-1/2" />
           <input 
             type="text" 
             placeholder="Search investors..." 
             className="w-full bg-[#111] border border-border-dark text-white pl-10 pr-4 py-2 outline-none focus:border-gold font-sans text-sm"
           />
        </div>
      </div>

      <div className="bg-[#111] border border-border-dark overflow-x-auto">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-[#0a0a0a] border-b border-border-dark font-mono text-[10px] uppercase tracking-widest text-warmGrey">
            <tr>
              <th className="px-6 py-4 font-normal text-gold">ID</th>
              <th className="px-6 py-4 font-normal">Investor Name</th>
              <th className="px-6 py-4 font-normal">Contact</th>
              <th className="px-6 py-4 font-normal">Tier</th>
              <th className="px-6 py-4 font-normal">KYC/AML</th>
              <th className="px-6 py-4 font-normal">Account</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark/50">
            {users.map((u, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors text-white">
                <td className="px-6 py-4 font-mono text-xs uppercase">{u.id}</td>
                <td className="px-6 py-4 font-serif">{u.name}</td>
                <td className="px-6 py-4 text-warmGrey">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-gold">{u.tier}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-mono tracking-widest uppercase rounded-sm border ${
                    u.kyc === 'Verified' ? 'bg-success/10 border-success/20 text-success' : 'bg-gold/10 border-gold/20 text-gold'
                  }`}>
                    {u.kyc}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-mono tracking-widest uppercase rounded-sm border ${
                    u.status === 'Active' ? 'bg-success/10 border-success/20 text-success' : 'bg-danger/10 border-danger/20 text-danger'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <GhostButton className="py-1 px-3 text-[10px] border-border-dark hover:border-gold">Manage</GhostButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
