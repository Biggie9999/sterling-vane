import Link from "next/link"
import { GhostButton } from "@/components/shared/GhostButton"
import { ArrowRight, Filter } from "lucide-react"

export default function PortfolioPage() {
  const properties = [
    { slug: "miami-waterfront-estate", name: "Miami Waterfront Estate", loc: "Miami, FL", yield: "11.2%", value: "$12.5M", status: "Active" },
    { slug: "pacific-glass-house", name: "The Pacific Glass House", loc: "California", yield: "14.2%", value: "$8.5M", status: "Active" },
    { slug: "aspen-ski-chalet", name: "Aspen Ski Chalet", loc: "Colorado", yield: "9.5%", value: "$18.2M", status: "Funding" },
    { slug: "palm-royale-retreat", name: "Palm Royale Retreat", loc: "Florida", yield: "12.0%", value: "$4.1M", status: "Stabilized" }
  ]

  return (
    <div className="bg-brand-light min-h-screen pt-32 pb-24">
      
      {/* Page Header */}
      <div className="container mx-auto px-6 mb-16 max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Active Funds & Portfolio
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Examine the current stabilizing assets within The Sovereign Collection. 
        </p>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm text-sm">
          <div className="flex items-center text-slate-600 mb-4 md:mb-0">
            <Filter className="w-4 h-4 mr-2" />
            <span className="font-semibold">Filter by Status</span>
          </div>
          
          <div className="flex gap-4">
            <button className="text-brand-blue font-semibold border-b-2 border-brand-accent pb-1">All Assets</button>
            <button className="text-slate-500 hover:text-slate-800 transition-colors pb-1">Funding</button>
            <button className="text-slate-500 hover:text-slate-800 transition-colors pb-1">Active / Stabilized</button>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {properties.map((prop, i) => (
            <div key={i} className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-smooth hover:border-slate-300 transition-all duration-300">
              {/* Image Container */}
              <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                <div className="absolute top-4 right-4 z-20">
                  <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm ${
                    prop.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' :
                    prop.status === 'Funding' ? 'bg-blue-100 text-brand-blue border border-blue-200' :
                    'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {prop.status}
                  </span>
                </div>
                {/* Image Placeholder */}
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">
                  [ Asset Image ]
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {prop.loc}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  {prop.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">Target Yield</p>
                    <p className="text-lg font-bold text-brand-blue">{prop.yield}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">Asset Value</p>
                    <p className="text-lg font-bold text-slate-900">{prop.value}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href={`/portfolio/${prop.slug}`} className="w-full py-3 px-4 bg-brand-light text-brand-blue font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center text-sm">
                    View Complete Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
      
    </div>
  )
}
