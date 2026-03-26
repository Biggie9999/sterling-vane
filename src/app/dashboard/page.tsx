import { GhostButton } from "@/components/shared/GhostButton"
import { GoldButton } from "@/components/shared/GoldButton"
import { ArrowRight, Download, Calendar as CalIcon } from "lucide-react"

export default function DashboardOverviewPage() {
  const kpis = [
    { label: "Total Invested", value: "$150,000", change: "+$50k (YTD)" },
    { label: "Current Portfolio Value", value: "$172,400", change: "+14.9% (IRR)" },
    { label: "Total Returns to Date", value: "$34,100", change: "Since inception" },
    { label: "Next Distribution", value: "Nov 30", change: "Est. $4,200" },
  ]

  return (
    <div>
      {/* Welcome Banner */}
      <div className="mb-12">
        <h1 className="font-serif text-3xl md:text-4xl text-black dark:text-white mb-2">
          Welcome back, James. 
        </h1>
        <p className="font-sans text-warmGrey text-lg">
          Your portfolio is performing. All assets are currently active and stabilized.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-ivory dark:bg-black border border-border-light dark:border-border-dark p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 blur-xl group-hover:bg-gold/10 transition-colors"></div>
            <p className="font-mono text-xs tracking-widest uppercase text-warmGrey mb-4">{kpi.label}</p>
            <p className="font-serif text-3xl md:text-4xl text-black dark:text-white mb-2">{kpi.value}</p>
            <p className="font-sans text-xs text-gold">{kpi.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Performance Chart Area */}
        <div className="lg:col-span-2 bg-ivory dark:bg-black border border-border-light dark:border-border-dark p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-xl text-black dark:text-white">Portfolio Growth</h3>
            <select className="bg-transparent border border-border-light dark:border-border-dark text-warmGrey text-xs outline-none px-2 py-1">
              <option>1 Year</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="h-64 w-full relative flex items-end px-4 pb-4 border-b border-border-dark/50">
            {/* Visual mock of an AreaChart */}
            <svg className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,100 L0,70 Q25,60 50,40 T100,10 L100,100 Z" fill="rgba(201,168,76,0.1)" stroke="#C9A84C" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            </svg>
            <div className="w-full flex justify-between relative z-10 text-[10px] font-mono text-warmGrey uppercase tracking-widest px-2">
              <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
            </div>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <div className="bg-[#111] dark:bg-[#111] border border-border-dark p-6">
            <h3 className="font-mono text-xs tracking-widest uppercase text-gold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <GhostButton href="/marketplace?tab=shortlet" className="w-full justify-start border-border-dark text-white text-xs h-auto py-3">
                <CalIcon className="w-4 h-4 mr-3" /> Book Priority Stay
              </GhostButton>
              <GhostButton href="/dashboard/documents" className="w-full justify-start border-border-dark text-white text-xs h-auto py-3">
                <Download className="w-4 h-4 mr-3" /> Q3 Performance Report
              </GhostButton>
              <GhostButton href="/apply" className="w-full justify-start border-border-dark text-white text-xs h-auto py-3">
                <ArrowRight className="w-4 h-4 mr-3" /> Increase Capital
              </GhostButton>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 p-6 rounded-sm">
            <h3 className="font-serif text-lg text-gold mb-2">New Offering</h3>
            <p className="font-sans text-xs text-warmGrey mb-4 leading-relaxed">
              The Aspen Ski Chalet asset is now 80% subscribed. Priority access closes in 48 hours for existing Growth tier members.
            </p>
            <Link href="/marketplace/buy/aspen-ski-chalet" className="font-mono text-[10px] uppercase tracking-widest text-white hover:text-gold transition-colors inline-flex items-center">
              View Asset Details <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}
