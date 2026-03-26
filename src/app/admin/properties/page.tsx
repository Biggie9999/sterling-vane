"use client"

import { GhostButton } from "@/components/shared/GhostButton"
import { GoldButton } from "@/components/shared/GoldButton"
import { Plus } from "lucide-react"

const properties = [
  { id: "PROP-001", name: "Miami Waterfront Estate", type: "Buy", status: "Active", yield: "11.2%", value: "$12.5M" },
  { id: "PROP-002", name: "The Pacific Glass House", type: "Shortlet", status: "Active", yield: "14.2%", value: "$8.5M" },
  { id: "PROP-003", name: "Aspen Ski Chalet", type: "Fund", status: "Funding", yield: "9.5%", value: "$18.2M" },
  { id: "PROP-004", name: "Palm Royale Retreat", type: "Shortlet", status: "Maintenance", yield: "12.0%", value: "$4.1M" }
]

export default function AdminPropertiesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-white">Asset Management</h1>
        <GoldButton className="py-2 px-4 shadow-[0_0_15px_rgba(201,168,76,0.15)] text-[10px]">
          <Plus className="w-3 h-3 mr-2" /> Add New Asset
        </GoldButton>
      </div>

      <div className="bg-[#111] border border-border-dark overflow-x-auto">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-[#0a0a0a] border-b border-border-dark font-mono text-[10px] uppercase tracking-widest text-warmGrey">
            <tr>
              <th className="px-6 py-4 font-normal text-gold">ID</th>
              <th className="px-6 py-4 font-normal">Property Name</th>
              <th className="px-6 py-4 font-normal">Type</th>
              <th className="px-6 py-4 font-normal">Valuation</th>
              <th className="px-6 py-4 font-normal">Yield</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark/50">
            {properties.map((p, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors text-white">
                <td className="px-6 py-4 font-mono text-xs uppercase">{p.id}</td>
                <td className="px-6 py-4 font-serif">{p.name}</td>
                <td className="px-6 py-4 text-warmGrey">{p.type}</td>
                <td className="px-6 py-4 font-mono">{p.value}</td>
                <td className="px-6 py-4 font-mono text-gold">{p.yield}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-mono tracking-widest uppercase rounded-sm border ${
                    p.status === 'Active' ? 'bg-success/10 border-success/20 text-success' :
                    p.status === 'Funding' ? 'bg-gold/10 border-gold/20 text-gold' :
                    'bg-danger/10 border-danger/20 text-danger'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <GhostButton className="py-1 px-3 text-[10px] border-border-dark hover:border-gold">Edit</GhostButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
