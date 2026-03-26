"use client"

import { GoldButton } from "@/components/shared/GoldButton"
import { Building2 } from "lucide-react"

const history = [
  { date: "Oct 01, 2024", amount: "$4,200", type: "Quarterly Yield", asset: "Portfolio Blended", status: "Transferred" },
  { date: "Jul 01, 2024", amount: "$4,150", type: "Quarterly Yield", asset: "Portfolio Blended", status: "Transferred" },
  { date: "Apr 01, 2024", amount: "$15,000", type: "Capital Return", asset: "Aspen Asset (Refi)", status: "Transferred" },
]

export default function DashboardDistributionsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-white mb-8">Distributions & Banking</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        
        {/* Left Col: History */}
        <div className="xl:col-span-2">
          <h2 className="font-sans text-lg text-white mb-6">Distribution History</h2>
          <div className="bg-[#111] border border-border-dark overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-[#0a0a0a] border-b border-border-dark font-mono text-[10px] uppercase tracking-widest text-warmGrey">
                <tr>
                  <th className="px-6 py-4 font-normal">Date</th>
                  <th className="px-6 py-4 font-normal">Amount</th>
                  <th className="px-6 py-4 font-normal">Type / Source</th>
                  <th className="px-6 py-4 font-normal text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark/50">
                {history.map((tx, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-warmGrey whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4 font-mono text-white flex items-center">
                      <span className="text-success text-lg leading-none mr-2">+</span>{tx.amount}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {tx.type} <span className="text-warmGrey text-xs block mt-1">{tx.asset}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 bg-success/10 border border-success/20 text-success text-[10px] font-mono tracking-widest uppercase rounded-sm">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Bank Settings */}
        <div className="xl:col-span-1">
           <h2 className="font-sans text-lg text-white mb-6">Linked Accounts</h2>
           <div className="bg-[#0a0a0a] border border-border-dark p-6 relative overflow-hidden group mb-6">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-3xl rounded-full"></div>
             
             <div className="flex items-start justify-between mb-8 relative z-10">
               <div className="w-12 h-12 bg-[#111] rounded-full border border-border-dark flex items-center justify-center">
                 <Building2 className="w-5 h-5 text-gold" />
               </div>
               <span className="bg-success/10 text-success border border-success/20 px-2 py-1 font-mono text-[10px] tracking-widest uppercase rounded-sm">
                 Verified
               </span>
             </div>

             <div className="relative z-10">
               <p className="font-serif text-xl text-white mb-1">J.P. Morgan Chase</p>
               <p className="font-mono text-xs text-warmGrey tracking-[0.2em] mb-4">•••• •••• •••• 4912</p>
               
               <p className="font-sans text-xs text-warmGrey mb-1">Receiving Account For:</p>
               <p className="font-mono text-sm text-gold">All Distributions</p>
             </div>
           </div>

           <GoldButton className="w-full justify-center text-xs py-3 border border-border-dark shadow-none bg-transparent hover:bg-gold hover:text-black hover:border-gold">
             Update Banking Details
           </GoldButton>
        </div>

      </div>
    </div>
  )
}
