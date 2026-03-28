import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Bed, Bath, Maximize, ChevronLeft, Calendar, Shield, TrendingUp, Info, Star, Globe, Lock, ArrowUpRight, CheckCircle2 } from "lucide-react"

export default async function PropertyPage({ params }: { params: { id: string } }) {
  // Support both ID and Slug for fluid navigation
  const property = await prisma.property.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: params.id }
      ]
    },
    include: {
      investments: true
    }
  })

  if (!property) return notFound()

  // Parse JSON for SQLite compatibility
  const images = JSON.parse(property.images)
  const amenities = JSON.parse(property.amenities)

  // Derived metrics
  const totalShares = 500
  const availableShares = 500 - property.investments.length
  const percentFunded = ((totalShares - availableShares) / totalShares) * 100

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-24 lg:pt-32 pb-40 selection:bg-[#C9A84C]/20">
      {/* Header Architecture */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12 lg:mb-20">
        <Link href="/marketplace" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.4em] text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors mb-10 lg:mb-16 group">
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Collective
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white border border-black/[0.03] text-black text-[9px] uppercase tracking-[0.3em] font-bold px-5 py-2 rounded-full shadow-sm">
                Property: {property.type}
              </div>
              <div className="flex items-center gap-2 bg-black text-white text-[9px] font-bold tracking-[0.3em] uppercase px-5 py-2 rounded-full shadow-xl">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                 {property.status === "ACTIVE" ? "Direct Allocation" : "Fully Synchronized"}
              </div>
            </div>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-[#0A0A0A] mb-8 font-bold tracking-tighter leading-[0.9] lg:leading-[0.85]">
              {property.name}
            </h1>
            <p className="flex items-center text-[#8A8A8A] text-lg lg:text-xl font-medium tracking-tight font-serif italic opacity-60">
              <MapPin className="w-5 h-5 mr-3 text-[#C9A84C] not-italic shrink-0" /> {property.location}
            </p>
          </div>

          {/* Core Performance Metrics */}
          <div className="flex gap-4 lg:gap-8 overflow-x-auto no-scrollbar pb-4">
            <div className="bg-white border border-black/[0.03] px-10 py-10 rounded-[2.5rem] shadow-sm text-center min-w-[200px] hover:shadow-xl transition-all duration-700">
              <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#8A8A8A] mb-4 opacity-40">Target Yield</p>
              <p className="font-bold text-5xl text-[#C9A84C] tracking-tighter">{property.yieldEstimate}%</p>
            </div>
            <div className="bg-white border border-black/[0.03] px-10 py-10 rounded-[2.5rem] shadow-sm text-center min-w-[200px] hover:shadow-xl transition-all duration-700">
              <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#8A8A8A] mb-4 opacity-40">Cap Rate</p>
              <p className="font-bold text-5xl text-[#0A0A0A] tracking-tighter">{property.capRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Asset Gallery */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20 lg:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 lg:h-[750px] xl:h-[850px]">
          <div className="lg:col-span-8 relative rounded-[3rem] overflow-hidden group shadow-2xl border border-black/[0.03]">
            <img 
              src={images[0]} 
              className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105" 
              alt={property.name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-10">
            {images.slice(1, 3).map((img : string, i: number) => (
              <div key={i} className="relative rounded-[2.5rem] overflow-hidden group shadow-xl border border-black/[0.03]">
                <img 
                  src={img} 
                  className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105" 
                  alt={`${property.name} detail ${i+1}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Institutional Intelligence Layer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 xl:gap-32">
        
        {/* Detail Narrative Column */}
        <div className="flex-1">
          {/* Hardware Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-12 border-y border-black/[0.03] mb-16 lg:mb-20">
            <div className="flex items-center text-[#0A0A0A] text-[11px] font-bold uppercase tracking-[0.3em]">
              <Bed className="w-5 h-5 mr-3 text-[#C9A84C]" /> {property.bedrooms} Bed Suites
            </div>
            <div className="flex items-center text-[#0A0A0A] text-[11px] font-bold uppercase tracking-[0.3em]">
              <Bath className="w-5 h-5 mr-3 text-[#C9A84C]" /> {property.bathrooms} Baths
            </div>
            <div className="flex items-center text-[#0A0A0A] text-[11px] font-bold uppercase tracking-[0.3em]">
              <Maximize className="w-5 h-5 mr-3 text-[#C9A84C]" /> {property.sqft.toLocaleString()} SQFT
            </div>
          </div>

          {/* Narrative Content */}
          <div className="mb-20 lg:mb-24">
            <div className="flex items-center gap-3 mb-10 opacity-30">
               <Star className="w-4 h-4 text-[#C9A84C]" />
               <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-black">Asset Summary</h2>
            </div>
            <p className="font-serif text-[#0A0A0A] text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-16 max-w-4xl">
              {property.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
               {amenities.map((a: string) => (
                 <span key={a} className="px-6 py-3 bg-white border border-black/[0.03] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A] shadow-sm">
                   {a}
                 </span>
               ))}
            </div>
          </div>

          {/* Sovereign Security & Structure */}
          <div className="bg-white rounded-[4rem] p-12 lg:p-20 border border-black/[0.03] shadow-sm mb-16 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A84C]/5 blur-[160px] rounded-full group-hover:bg-[#C9A84C]/10 transition-all duration-[2000ms] pointer-events-none" />
            <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#8A8A8A] mb-16 opacity-30">Structural Integrity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 relative z-10">
              {[
                { icon: TrendingUp, title: "Yield Architecture", desc: "Performance-modeled hospitality yields with quarterly distribution cycles." },
                { icon: Shield, title: "Capital Security", desc: "Underwritten by physical premium real estate assets across global hubs." },
                { icon: Globe, title: "Secondary Market", desc: "Permissioned liquidity through our institutional trading desk." },
                { icon: Lock, title: "Legal Framework", desc: "Regulated SPV structures ensuring direct beneficial ownership rights." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group/item">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-[#FAF9F6] flex items-center justify-center shrink-0 border border-black/[0.03] group-hover/item:bg-black group-hover/item:text-white transition-all duration-500">
                    <item.icon className="w-6 h-6 text-[#C9A84C] group-hover/item:text-[#C9A84C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] text-[11px] uppercase tracking-widest mb-3">{item.title}</h4>
                    <p className="text-sm text-[#8A8A8A] leading-relaxed font-medium opacity-80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Terminal Column */}
        <div className="lg:w-[480px] shrink-0">
          <div className="sticky top-40 bg-[#0A0A0A] text-white rounded-[3.5rem] p-12 lg:p-14 shadow-2xl relative overflow-hidden border border-white/5 group">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#C9A84C]/10 blur-[140px] rounded-full group-hover:bg-[#C9A84C]/20 transition-all duration-[2000ms] pointer-events-none" />
            
            {/* Share Price Section */}
            <div className="pb-12 border-b border-white/5 mb-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8A8A8A] mb-6 opacity-60">Entry Allocation Unit</p>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-7xl font-bold text-white tracking-tighter">
                  ${property.pricePerShare.toLocaleString()}
                </span>
                <span className="text-[#8A8A8A] font-bold uppercase tracking-[0.2em] text-[10px] italic">/ Share</span>
              </div>
            </div>

            {/* Allocation Progress Tracker */}
            <div className="mb-14">
              <div className="flex justify-between items-end mb-6 text-[10px] font-bold uppercase tracking-[0.3em]">
                <span className="text-[#8A8A8A] opacity-60">Portfolio Allocation</span>
                <span className="text-[#C9A84C]">{Math.round(percentFunded)}% Filled</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-8 relative">
                <div 
                  className="bg-[#C9A84C] h-full rounded-full transition-all duration-[2500ms] cubic-bezier(0.16, 1, 0.3, 1)" 
                  style={{ width: `${percentFunded}%` }} 
                />
              </div>
              <div className="flex justify-between items-center bg-white/[0.02] p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                 <div className="text-center flex-1">
                    <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1 opacity-40">Available</p>
                    <p className="text-lg font-bold text-white tracking-tight">{availableShares} Units</p>
                 </div>
                 <div className="w-[1px] h-8 bg-white/10" />
                 <div className="text-center flex-1">
                    <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1 opacity-40">Total Cap</p>
                    <p className="text-lg font-bold text-white tracking-tight">{totalShares} Shares</p>
                 </div>
              </div>
            </div>

            {/* Asset Performance Summary */}
            <div className="space-y-6 mb-14">
              {[
                { label: "Market Valuation", value: `$${((property.askingPrice || 0) / 1000000).toFixed(1)}M` },
                { label: "Hold Period", value: "3-5 Years" },
                { label: "Liquidity Status", value: "Quarterly" },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center group/stat">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A] opacity-60 group-hover/stat:opacity-100 transition-opacity">{stat.label}</span>
                  <span className="text-base font-bold text-white tracking-tight">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Strategic Call to Action */}
            <Link
              href={`/apply?propertyId=${property.slug}`}
              className="w-full h-24 flex justify-between items-center bg-[#C9A84C] text-black py-7 px-12 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-white transition-all duration-700 shadow-2xl group/btn overflow-hidden"
            >
              <span className="relative z-10">Initiate Allocation</span>
              <ArrowUpRight className="w-6 h-6 group-hover/btn:-rotate-45 transition-transform duration-700 relative z-10" />
            </Link>
            
            <div className="flex items-center justify-center gap-3 mt-12 pt-8 border-t border-white/5 opacity-50">
               <Shield className="w-3.5 h-3.5 text-[#C9A84C]" />
               <p className="text-[9px] text-[#8A8A8A] uppercase tracking-[0.5em] font-bold">Verified Partners Only</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
