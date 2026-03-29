import Link from "next/link"
import { GhostButton } from "@/components/shared/GhostButton"
import { ArrowRight, Filter } from "lucide-react"

import { DEMO_PROPERTIES } from "@/data/properties"

export default function PortfolioPage() {
  const properties = DEMO_PROPERTIES;

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
            <div key={prop.id} className="group flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Image Container */}
              <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                <div className="absolute top-5 right-5 z-20">
                  <span className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm backdrop-blur-md ${
                    prop.status === 'Stabilized' ? 'bg-emerald-400/90 text-white' :
                    prop.status === 'Funding Stage' ? 'bg-[#006AFF]/90 text-white' :
                    'bg-white/90 text-slate-900 border border-slate-200'
                  }`}>
                    {prop.status}
                  </span>
                </div>
                {/* Image */}
                <img src={prop.images[0]} alt={prop.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              
              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-[10px] font-bold text-[#006AFF] uppercase tracking-widest mb-3">
                  {prop.market}
                </p>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 leading-tight">
                  {prop.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Target Yield</p>
                    <p className="text-xl font-bold text-[#006AFF]">{prop.targetYield}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Asset Value</p>
                    <p className="text-xl font-bold text-slate-900">${(prop.propertyValue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link href={`/properties/${prop.id}`} className="w-full py-4 bg-[#F8FAFC] border border-slate-200 text-slate-900 font-bold uppercase tracking-widest text-[10px] rounded-xl group-hover:bg-[#006AFF] group-hover:text-white group-hover:border-[#006AFF] transition-colors flex items-center justify-center">
                    Data Room <ArrowRight className="w-4 h-4 ml-2" />
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
