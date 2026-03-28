import { prisma } from "@/lib/prisma"
import { PropertyStatus } from "@prisma/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Bed, Bath, Maximize, ChevronLeft, Calendar, Shield, TrendingUp, Info } from "lucide-react"

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      investments: true
    }
  })

  if (!property) return notFound()

  // Calculate some derived values for the UI
  const totalShares = 200 // Default for demo migration
  const availableShares = 200 - property.investments.length
  const percentFunded = ((totalShares - availableShares) / totalShares) * 100

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-24 pb-24">
      {/* 1. Header / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 pt-4">
        <Link href="/marketplace" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-[#1a1a1a] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Offerings
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white border border-[#E5E5E5] text-[#1a1a1a] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-sm">
                {property.type} Asset
              </span>
              <div className="flex items-center gap-1.5 bg-[#1a1a1a] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
                <span className={`w-1.5 h-1.5 rounded-full ${property.status === PropertyStatus.ACTIVE ? "bg-emerald-400" : "bg-[#006AFF]"}`}></span>
                {property.status}
              </div>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1a1a] mb-4">
              {property.name}
            </h1>
            <p className="flex items-center text-[#666] text-lg font-medium">
              <MapPin className="w-5 h-5 mr-2 text-[#006AFF]" /> {property.location}
            </p>
          </div>
          <div className="flex gap-6 pb-2 border-b border-transparent">
            {/* Quick stats on top right for desktop */}
            <div className="hidden sm:flex items-center gap-8 bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#888] mb-1">Target Yield</p>
                <p className="font-bold text-xl text-[#006AFF]">{property.yieldEstimate}%</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#888] mb-1">Cap Rate</p>
                <p className="font-bold text-xl text-[#1a1a1a]">{property.capRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Photo Grid Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-md bg-white border border-slate-200`}>
          {/* Main Hero Image */}
          <div className="relative w-full h-full cursor-pointer group overflow-hidden">
            <img 
              src={property.images[0]} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
              alt={`${property.name} exterior`} 
            />
          </div>
          {/* Secondary Images (or just a single large one if only 2 images exist) */}
          <div className={`hidden md:grid gap-4 ${property.images.length > 2 ? 'grid-rows-2 grid-cols-2' : 'grid-rows-1 grid-cols-1'}`}>
            {property.images.slice(1).map((img, i) => (
              <div key={i} className="relative w-full h-full overflow-hidden group cursor-pointer">
                <img 
                  src={img} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                  alt={`${property.name} detail ${i+1}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Content and Sticky Box Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left: Main Details */}
        <div className="flex-1">
          {/* Key Specs */}
          <div className="flex flex-wrap items-center gap-8 py-6 border-b border-slate-200 mb-10">
            <div className="flex items-center text-[#1a1a1a] text-lg font-bold">
              <Bed className="w-5 h-5 mr-3 text-[#006AFF]" /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex items-center text-[#1a1a1a] text-lg font-bold">
              <Bath className="w-5 h-5 mr-3 text-[#006AFF]" /> {property.bathrooms} Bathrooms
            </div>
            <div className="flex items-center text-[#1a1a1a] text-lg font-bold">
              <Maximize className="w-5 h-5 mr-3 text-[#006AFF]" /> {property.sqft.toLocaleString()} Square Feet
            </div>
          </div>

          {/* Description */}
          <div className="mb-14">
            <h2 className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#888] mb-5">About the Property</h2>
            <p className="font-serif text-[#1a1a1a] text-xl leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </div>

          {/* Data Room Highlights */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm mb-10">
            <h2 className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#888] mb-8">Investment Thesis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center shrink-0 border border-slate-100">
                  <TrendingUp className="w-5 h-5 text-[#006AFF]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-1">Asset Stabilization</h4>
                  <p className="text-sm text-[#666] leading-relaxed">Property is managed by our institutional in-house operators, maximizing high-season Arbitrage.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center shrink-0 border border-slate-100">
                  <Shield className="w-5 h-5 text-[#006AFF]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-1">Blockchain Verification</h4>
                  <p className="text-sm text-[#666] leading-relaxed">Share ownership is digitally secured, enabling frictionless secondary trading post-lockup.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center shrink-0 border border-slate-100">
                  <Calendar className="w-5 h-5 text-[#006AFF]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-1">Quarterly Distributions</h4>
                  <p className="text-sm text-[#666] leading-relaxed">Rental yield is calculated and distributed to your dashboard automatically every fiscal quarter.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sticky Action Card */}
        <div className="lg:w-[420px] shrink-0">
          <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
            
            {/* Price section */}
            <div className="pb-6 border-b border-slate-100 mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">Cost per share</p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a1a]">
                  ${property.pricePerShare.toLocaleString()}
                </span>
                <span className="text-[#666] font-medium hidden"> / share</span>
              </div>
            </div>

            {/* Shares Availability */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-bold text-[#1a1a1a]">Funding Progress</span>
                <span className="text-sm font-bold text-[#006AFF]">{Math.round(percentFunded)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-[#006AFF] h-full rounded-full transition-all duration-1000" style={{ width: `${percentFunded}%` }} />
              </div>
              <p className="text-xs text-[#888] font-medium flex justify-between">
                <span>{availableShares} Shares Available</span>
                <span>{totalShares} Total</span>
              </p>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4 mb-8 bg-[#FAF9F6] p-5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#666] flex items-center gap-1">
                  Overall Cap Rate <Info className="w-3 h-3 text-[#ccc]" />
                </span>
                <span className="text-sm font-bold text-[#1a1a1a]">{property.capRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#666]">Asset Value</span>
                <span className="text-sm font-bold text-[#1a1a1a]">${((property.askingPrice || 0) / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#666]">Lockup Period</span>
                <span className="text-sm font-bold text-[#1a1a1a]">5 Years</span>
              </div>
            </div>

            {/* Action */}
            <Link
              href={`/apply?propertyId=${property.id}`}
              className="w-full flex justify-center items-center gap-2 bg-[#1a1a1a] text-white py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#006AFF] transition-all shadow-md group"
            >
              Secure Allocation
            </Link>
            <p className="text-center text-[10px] text-[#888] mt-4 uppercase tracking-widest font-bold">
              Accredited investors only
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
