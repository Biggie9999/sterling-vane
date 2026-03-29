import Image from "next/image"
import { GhostButton } from "@/components/shared/GhostButton"
import { ArrowRight } from "lucide-react"
import { DEMO_PROPERTIES } from "@/data/properties"

export function FeaturedProperties() {
  return (
    <section className="py-24 bg-[#F1F5F9]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] max-w-2xl">
            The Collection.
          </h2>
          <GhostButton href="/marketplace" className="hidden md:inline-flex mt-6 md:mt-0 text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#1a1a1a] hover:text-white" light={false}>
            View Marketplace <ArrowRight className="w-4 h-4 ml-2" />
          </GhostButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {DEMO_PROPERTIES.map((prop) => (
            <div 
              key={prop.id} 
              className="group relative bg-white border border-[#E5E5E5] overflow-hidden hover:-translate-y-2 transition-all duration-500 rounded-2xl shadow-sm"
            >
              <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20 font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full shadow-md text-[#1a1a1a]">
                  <span className={`w-1.5 h-1.5 rounded-full ${prop.status === "Funding Stage" ? "bg-emerald-500" : prop.status === "Coming Soon" ? "bg-[#006AFF]" : "bg-slate-400"}`}></span>
                  {prop.status}
                </div>
                
                <Image
                  src={prop.images[0]}
                  alt={prop.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-8 relative z-20">
                <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#006AFF] uppercase mb-3">
                  {prop.location}
                </p>
                <h3 className="font-serif text-2xl text-[#1a1a1a] mb-6 min-h-[64px]">
                  {prop.name}
                </h3>
                
                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <div>
                    <p className="font-sans text-xs text-[#888] font-bold uppercase tracking-widest mb-1.5">Share Price</p>
                    <p className="font-serif text-[#1a1a1a] text-xl font-medium">${prop.pricePerShare.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-xs text-[#888] font-bold uppercase tracking-widest mb-1.5">Target Yield</p>
                    <p className="font-sans text-[#006AFF] text-xl font-semibold">{prop.targetYield}%</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#006AFF]/20 pointer-events-none transition-colors duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>

        <div className="text-center md:hidden mt-8">
          <GhostButton href="/marketplace" className="w-full justify-center text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#1a1a1a] hover:text-white" light={false}>
            View Marketplace <ArrowRight className="w-4 h-4 ml-2" />
          </GhostButton>
        </div>
      </div>
    </section>
  )
}
