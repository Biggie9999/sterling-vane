import Image from "next/image"
import { GhostButton } from "@/components/shared/GhostButton"
import { ArrowRight } from "lucide-react"

const properties = [
  {
    name: "The Pacific Glass House",
    location: "California, USA",
    rate: "$2,400",
    yield: "14.2%",
    status: "Active",
    image: "/api/placeholder/800/600", // placeholder image since we don't have assents yet
    statusColor: "bg-success"
  },
  {
    name: "The Palm Royale Retreat",
    location: "Florida, USA",
    rate: "$1,850",
    yield: "12.8%",
    status: "Fully Subscribed",
    image: "/api/placeholder/800/600",
    statusColor: "bg-warmGrey"
  },
  {
    name: "The Manhattan Velvet Suite",
    location: "New York, USA",
    rate: "$3,200",
    yield: "15.5%",
    status: "Coming Soon",
    image: "/api/placeholder/800/600",
    statusColor: "bg-gold text-black"
  }
]

export function FeaturedProperties() {
  return (
    <section className="py-24 bg-gradient-to-b from-offWhite to-black dark:from-[#0f0f0f] dark:to-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-black dark:text-white max-w-2xl">
            The Collection.
          </h2>
          <GhostButton href="/portfolio" className="hidden md:inline-flex mt-6 md:mt-0 text-white border-border-dark" light={false}>
            View Full Portfolio <ArrowRight className="w-4 h-4 ml-2" />
          </GhostButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((prop, idx) => (
            <div 
              key={idx} 
              className="group relative bg-[#111] border border-border-dark overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-64 w-full overflow-hidden bg-black/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-sm border border-white/10 text-white">
                  <span className={`w-2 h-2 rounded-full ${prop.statusColor}`}></span>
                  {prop.status}
                </div>
                {/* Fallback pattern until images exist */}
                <div className="w-full h-full bg-border-dark group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center text-warmGrey font-mono text-xs">
                  [Property Image]
                </div>
              </div>

              <div className="p-6 relative z-20">
                <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-3">
                  {prop.location}
                </p>
                <h3 className="font-serif text-2xl text-white mb-6">
                  {prop.name}
                </h3>
                
                <div className="flex justify-between items-center border-t border-white/10 pt-6">
                  <div>
                    <p className="font-sans text-xs text-warmGrey mb-1">Est. Nightly</p>
                    <p className="font-mono text-white text-lg">{prop.rate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-xs text-warmGrey mb-1">Proj. Yield</p>
                    <p className="font-mono text-gold text-lg">{prop.yield}</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border border-transparent group-hover:border-gold/50 pointer-events-none transition-colors duration-500 rounded-sm"></div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        <div className="text-center md:hidden mt-8">
          <GhostButton href="/portfolio" className="w-full justify-center text-white border-border-dark" light={false}>
            View Full Portfolio <ArrowRight className="w-4 h-4 ml-2" />
          </GhostButton>
        </div>
      </div>
    </section>
  )
}
