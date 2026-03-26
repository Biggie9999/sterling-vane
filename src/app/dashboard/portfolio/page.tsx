import { GhostButton } from "@/components/shared/GhostButton"
import { ArrowRight } from "lucide-react"

const investments = [
  { name: "Miami Waterfront Estate", amount: "$50,000", date: "Jan 12, 2024", roi: "11.2%", status: "Active" },
  { name: "The Pacific Glass House", amount: "$100,000", date: "Mar 05, 2024", roi: "14.2%", status: "Active" }
]

export default function DashboardPortfolioPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-white mb-8">Active Portfolio</h1>
      
      <div className="bg-[#111] border border-border-dark overflow-x-auto mb-12">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-[#0a0a0a] border-b border-border-dark font-mono text-[10px] uppercase tracking-widest text-warmGrey">
            <tr>
              <th className="px-6 py-4 font-normal">Asset</th>
              <th className="px-6 py-4 font-normal">Committed</th>
              <th className="px-6 py-4 font-normal">Start Date</th>
              <th className="px-6 py-4 font-normal">Current ROI</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark/50">
            {investments.map((inv, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-white font-medium">{inv.name}</td>
                <td className="px-6 py-4 text-white font-mono">{inv.amount}</td>
                <td className="px-6 py-4 text-warmGrey">{inv.date}</td>
                <td className="px-6 py-4 text-gold font-mono">{inv.roi}</td>
                <td className="px-6 py-4">
                   <span className="px-2 py-1 bg-success/10 border border-success/20 text-success text-[10px] font-mono tracking-widest uppercase rounded-sm">
                     {inv.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <GhostButton className="py-1 px-3 text-[10px]">View Asset</GhostButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#0a0a0a] border border-border-dark flex flex-col items-center justify-center p-12 text-center">
        <p className="font-serif text-xl text-white mb-2">Looking to diversify?</p>
        <p className="font-sans text-warmGrey text-sm mb-6 max-w-md">Our newest Dubai asset is opening to Growth Tier members next week.</p>
        <GhostButton href="/portfolio" className="border-gold text-gold hover:bg-gold hover:text-black transition-colors">
          Browse Open Funds <ArrowRight className="w-4 h-4 ml-2" />
        </GhostButton>
      </div>
    </div>
  )
}
