import { GhostButton } from "@/components/shared/GhostButton"
import { Users, AlertCircle, Building, DollarSign } from "lucide-react"

export default function AdminOverviewPage() {
  const adminKpis = [
    { label: "Assets Under Mgmt", value: "$42.5M", change: "12 Properties", icon: <Building className="w-5 h-5 text-gold" /> },
    { label: "Total Committed", value: "$38.1M", change: "89% Funded", icon: <DollarSign className="w-5 h-5 text-gold" /> },
    { label: "Active Investors", value: "124", change: "+3 this month", icon: <Users className="w-5 h-5 text-gold" /> },
    { label: "Pending Approvals", value: "8", change: "Requires KYC review", icon: <AlertCircle className="w-5 h-5 text-danger" /> },
  ]

  return (
    <div>
      <div className="mb-12">
        <h1 className="font-serif text-3xl text-white mb-2">Platform Command</h1>
        <p className="font-sans text-warmGrey text-sm">
          System operational. All secure routes active.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {adminKpis.map((kpi, i) => (
          <div key={i} className="bg-[#111] border border-border-dark p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <p className="font-mono text-[10px] tracking-widest uppercase text-warmGrey">{kpi.label}</p>
              {kpi.icon}
            </div>
            <p className="font-serif text-3xl text-white mb-2">{kpi.value}</p>
            <p className={`font-mono text-[10px] tracking-widest uppercase ${i === 3 ? 'text-danger' : 'text-gold'}`}>{kpi.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Action Required Panel */}
        <div className="bg-[#111] border border-border-dark p-6">
           <h3 className="font-serif text-xl text-white mb-6 border-b border-white/5 pb-4">Pending Investor Applications</h3>
           
           <div className="space-y-4">
             {[
               { name: "Eleanor Wright", tier: "Growth", amount: "$50k", date: "Today, 09:14 AM" },
               { name: "Michael Chen", tier: "Private", amount: "$250k", date: "Yesterday, 14:30 PM" },
               { name: "Sarah Jenkins", tier: "Entry", amount: "$15k", date: "Oct 22, 11:05 AM" }
             ].map((app, i) => (
               <div key={i} className="flex justify-between items-center p-4 bg-[#0a0a0a] border border-border-dark">
                 <div>
                   <p className="font-sans text-sm text-white mb-1">{app.name}</p>
                   <p className="font-mono text-[10px] text-warmGrey uppercase tracking-widest">{app.tier} ({app.amount}) • {app.date}</p>
                 </div>
                 <GhostButton className="py-1 px-4 text-[10px] border-gold text-gold hover:bg-gold hover:text-black">
                   Review
                 </GhostButton>
               </div>
             ))}
           </div>
           
           <div className="mt-6 text-center">
             <GhostButton href="/admin/users" className="border-border-dark text-warmGrey w-full justify-center">
               View All Applications
             </GhostButton>
           </div>
        </div>

        {/* System Logs / Recent Activity */}
        <div className="bg-[#111] border border-border-dark p-6">
           <h3 className="font-serif text-xl text-white mb-6 border-b border-white/5 pb-4">Recent Activity Logs</h3>
           
           <div className="space-y-4 font-mono text-xs">
             {[
               { action: "SYS_DISTRIBUTION_QUEUED", detail: "Q3 Yield calculated for Aspen Asset", time: "10 mins ago", status: "success" },
               { action: "USER_KYC_VERIFIED", detail: "ID: usr_9481j (James Holden)", time: "1 hr ago", status: "success" },
               { action: "ASSET_MARKET_UPDATE", detail: "Miami Waterfront Estate valuation updated", time: "3 hrs ago", status: "info" },
               { action: "STRIPE_WEBHOOK_FAILED", detail: "Payment intent pi_3P9...", time: "5 hrs ago", status: "danger" },
               { action: "ADMIN_LOGIN", detail: "IP: 192.168.1.1 (Sterling Vane)", time: "6 hrs ago", status: "info" }
             ].map((log, i) => (
               <div key={i} className="flex justify-between items-start border-b border-white/5 pb-3">
                 <div className="flex items-start space-x-3">
                   <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${log.status === 'success' ? 'bg-success' : log.status === 'danger' ? 'bg-danger' : 'bg-gold'}`}></div>
                   <div>
                     <p className="text-white mb-1">{log.action}</p>
                     <p className="text-warmGrey font-sans">{log.detail}</p>
                   </div>
                 </div>
                 <span className="text-warmGrey shrink-0">{log.time}</span>
               </div>
             ))}
           </div>
        </div>

      </div>

    </div>
  )
}
