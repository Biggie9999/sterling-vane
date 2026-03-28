import { prisma } from "@/lib/prisma"
import { PropertyStatus } from "@prisma/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Bed, Bath, Maximize, ChevronLeft, Calendar, Shield, TrendingUp, Info, Star, Globe, Lock, ArrowUpRight } from "lucide-react"

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      investments: true
    }
  })

  if (!property) return notFound()

  // Derived metrics
  const totalShares = 200
  const availableShares = 200 - property.investments.length
  const percentFunded = ((totalShares - availableShares) / totalShares) * 100

  return (
    <div className="bg-[#F5F0E8] min-h-screen pt-32 pb-40">
      {/* Header Architecture */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <Link href="/marketplace" className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.4em] text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors mb-12 group">
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white border border-[#0A0A0A]/5 text-[#C9A84C] text-[10px] uppercase tracking-[0.3em] font-bold px-6 py-2.5 rounded-full shadow-sm">
                {property.type} Asset
              </div>
              <div className="flex items-center gap-3 bg-[#0A0A0A] text-white text-[10px] font-bold tracking-[0.3em] uppercase px-6 py-2.5 rounded-full shadow-xl">
                 <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                 {property.status === PropertyStatus.ACTIVE ? "Active Allocation" : "Fully Subscribed"}
              </div>
            </div>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[#0A0A0A] mb-8 font-bold tracking-tight leading-[0.95]">
              {property.name}
            </h1>
            <p className="flex items-center text-[#8A8A8A] text-xl font-bold uppercase tracking-[0.2em] font-sans">
              <MapPin className="w-6 h-6 mr-3 text-[#C9A84C]" /> {property.location}
            </p>
          </div>

          {/* Core Metrics */}
          <div className="flex gap-8 pb-4">
            <div className="bg-white border border-[#0A0A0A]/5 px-10 py-10 rounded-[3rem] shadow-2xl text-center group min-w-[200px]">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8A8A8A] mb-4">Target Yield</p>
              <p className="font-bold text-5xl text-[#C9A84C] tracking-tighter group-hover:scale-110 transition-transform duration-500">{property.yieldEstimate}%</p>
            </div>
            <div className="bg-white border border-[#0A0A0A]/5 px-10 py-10 rounded-[3rem] shadow-2xl text-center group min-w-[200px]">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8A8A8A] mb-4">Cap Rate</p>
              <p className="font-bold text-5xl text-[#0A0A0A] tracking-tighter">{property.capRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Asset Gallery */}
      <div className="max-w-7xl mx-auto px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
          <div className="lg:col-span-8 relative rounded-[3.5rem] overflow-hidden group shadow-2xl border border-[#0A0A0A]/5">
            <img 
              src={property.images[0]} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
              alt={property.name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-40" />
          </div>
          <div className="lg:col-span-4 grid grid-rows-2 gap-8">
            {property.images.slice(1, 3).map((img, i) => (
              <div key={i} className="relative rounded-[3rem] overflow-hidden group shadow-xl border border-[#0A0A0A]/5">
                <img 
                  src={img} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                  alt={`${property.name} detail ${i+1}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Room Split View */}
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-24">
        
        {/* Left: Narrative */}
        <div className="flex-1">
          {/* Hardware Specs */}
          <div className="flex flex-wrap items-center gap-14 py-12 border-y border-[#0A0A0A]/5 mb-16">
            <div className="flex items-center text-[#0A0A0A] text-[12px] font-bold uppercase tracking-[0.3em]">
              <Bed className="w-6 h-6 mr-3 text-[#C9A84C]" /> {property.bedrooms} Suites
            </div>
            <div className="flex items-center text-[#0A0A0A] text-[12px] font-bold uppercase tracking-[0.3em]">
              <Bath className="w-6 h-6 mr-3 text-[#C9A84C]" /> {property.bathrooms} Baths
            </div>
            <div className="flex items-center text-[#0A0A0A] text-[12px] font-bold uppercase tracking-[0.3em]">
              <Maximize className="w-6 h-6 mr-3 text-[#C9A84C]" /> {property.sqft.toLocaleString()} SQFT
            </div>
          </div>

          {/* Narrative */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
               <Star className="w-5 h-5 text-[#C9A84C]" />
               <h2 className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#8A8A8A]">Asset Narrative</h2>
            </div>
            <p className="font-serif text-[#0A0A0A] text-4xl leading-tight tracking-tight mb-12 first-letter:text-8xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-[#C9A84C]">
              {property.description}
            </p>
          </div>

          {/* The Opportunity */}
          <div className="bg-white rounded-[4rem] p-12 lg:p-20 border border-[#0A0A0A]/5 shadow-sm mb-16 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 blur-[120px] rounded-full group-hover:bg-[#C9A84C]/10 transition-colors duration-1000" />
            <h2 className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#8A8A8A] mb-14">The Opportunity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 relative z-10">
              {[
                { icon: TrendingUp, title: "Yield Alpha", desc: "Optimized for elite hospitality rates through our specialized operating model." },
                { icon: Shield, title: "Verified Ownership", desc: "Institutional legal frameworks ensure secure individual ownership." },
                { icon: Globe, title: "Global Access", desc: "Secondary trading enabled after initial fulfillment phases." },
                { icon: Lock, title: "Secured Asset", desc: "Your capital is directly backed by high-value physical collateral." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-[#FAF9F6] flex items-center justify-center shrink-0 border border-[#0A0A0A]/5 shadow-sm group-hover:bg-[#C9A84C] group-hover:text-white transition-all duration-500">
                    <item.icon className="w-6 h-6 text-[#C9A84C] group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] text-[11px] uppercase tracking-widest mb-3">{item.title}</h4>
                    <p className="text-sm text-[#8A8A8A] leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky Terminal */}
        <div className="lg:w-[480px] shrink-0">
          <div className="sticky top-32 bg-[#0A0A0A] text-white rounded-[4rem] p-14 shadow-2xl relative overflow-hidden border border-white/5 group">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#C9A84C]/10 blur-[120px] rounded-full group-hover:bg-[#C9A84C]/20 transition-colors duration-1000" />
            
            {/* Share Price */}
            <div className="pb-12 border-b border-white/10 mb-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#8A8A8A] mb-6">Entry Share Price</p>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-7xl font-bold text-white tracking-tighter">
                  ${property.pricePerShare.toLocaleString()}
                </span>
                <span className="text-[#8A8A8A] font-bold uppercase tracking-[0.2em] text-[11px] italic">/ Share</span>
              </div>
            </div>

            {/* Funding Progress */}
            <div className="mb-14">
              <div className="flex justify-between items-end mb-6 font-bold uppercase tracking-[0.3em] text-[11px]">
                <span className="text-[#8A8A8A]">Funding Progress</span>
                <span className="text-[#C9A84C]">{Math.round(percentFunded)}%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-8 relative">
                <div className="bg-[#C9A84C] h-full rounded-full transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1)" style={{ width: `${percentFunded}%` }} />
              </div>
              <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5">
                 <div className="text-center flex-1">
                    <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1">Available</p>
                    <p className="text-lg font-bold text-white tracking-tight">{availableShares} Units</p>
                 </div>
                 <div className="w-[1px] h-8 bg-white/10" />
                 <div className="text-center flex-1">
                    <p className="text-[9px] font-bold text-[#8A8A8A] uppercase tracking-widest mb-1">Hard Cap</p>
                    <p className="text-lg font-bold text-white tracking-tight">{totalShares} CAP</p>
                 </div>
              </div>
            </div>

            {/* Core Stats */}
            <div className="space-y-6 mb-14">
              {[
                { label: "Asset Valuation", value: `$${((property.askingPrice || 0) / 1000000).toFixed(1)}M` },
                { label: "Lockup Period", value: "6 Months" },
                { label: "Settlement Cycle", value: "Quarterly" },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center group/stat">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A8A8A] group-hover/stat:text-white transition-colors">{stat.label}</span>
                  <span className="text-base font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* CTA Trigger */}
            <Link
              href={`/apply?propertyId=${property.id}`}
              className="w-full flex justify-between items-center bg-[#C9A84C] text-[#0A0A0A] py-7 px-12 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[12px] hover:bg-white transition-all duration-500 shadow-2xl group/btn"
            >
              <span>Invest Now</span>
              <ArrowUpRight className="w-6 h-6 group-hover/btn:-rotate-45 transition-transform duration-500" />
            </Link>
            
            <p className="text-center text-[10px] text-[#8A8A8A] mt-10 uppercase tracking-[0.4em] font-bold border-t border-white/5 pt-8">
              Accredited Partners Only
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
