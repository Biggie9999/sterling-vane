"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Suspense } from "react"
import Link from "next/link"
import { Search, MapPin, ChevronRight, TrendingUp, Home, Loader2, Star, ArrowUpRight, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

const TYPE_OPTIONS = [
  { label: "All Assets", value: "" },
  { label: "Elite", value: "Principal" },
  { label: "Growth", value: "Growth" },
  { label: "Venture", value: "Seed" },
]

function ListingCard({ item }: { item: any }) {
  const fundedPct = Math.round(((item.totalShares - item.availableShares) / item.totalShares) * 100)
  
  return (
    <Link 
      href={`/properties/${item.id}`} 
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-[#0A0A0A]/5 hover:shadow-[0_80px_120px_-40px_rgba(201,168,76,0.1)] transition-all duration-700 block"
    >
      {/* Cinematic Image Frame */}
      <div className="relative h-80 w-full overflow-hidden">
        <div className="absolute top-8 left-8 z-20 flex gap-2">
           <div className="bg-[#0A0A0A]/80 backdrop-blur-md px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] rounded-full border border-white/10 shadow-xl">
             {item.type}
           </div>
        </div>
        <div className="absolute top-8 right-8 z-20 bg-white/10 backdrop-blur-md px-5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white rounded-full border border-white/10 shadow-xl flex items-center gap-2">
           <div className={cn("w-2 h-2 rounded-full", item.status === "Funding Stage" ? "bg-[#C9A84C] animate-pulse" : "bg-white/40")} />
           {item.status}
        </div>
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-40" />
      </div>

      {/* Editorial Info Section */}
      <div className="p-12 flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-3xl font-serif font-bold text-[#0A0A0A] mb-2 tracking-tight truncate group-hover:text-[#C9A84C] transition-colors duration-500">{item.name}</h3>
            <p className="text-sm text-[#8A8A8A] font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span className="truncate uppercase tracking-widest text-[11px]">{item.location}</span>
            </p>
          </div>
        </div>

        {/* Institutional Metrics */}
        <div className="grid grid-cols-3 gap-1 py-10 border-y border-[#0A0A0A]/5 mb-10">
          <div className="text-center">
            <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-[0.2em] mb-2">Yield</p>
            <p className="text-xl font-bold text-[#C9A84C] tracking-tight">{item.targetYield}%</p>
          </div>
          <div className="text-center border-x border-[#0A0A0A]/5">
            <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-[0.2em] mb-2">Cap Rate</p>
            <p className="text-xl font-bold text-[#0A0A0A] tracking-tight">{item.capRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-[0.2em] mb-2">Value</p>
            <p className="text-xl font-bold text-[#0A0A0A] tracking-tight">${(item.propertyValue / 1e6).toFixed(1)}M</p>
          </div>
        </div>

        {/* Allocation Progress */}
        <div className="mb-12">
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
            <span className="text-[#8A8A8A]">Funding Progress</span>
            <span className="text-[#C9A84C]">{fundedPct}%</span>
          </div>
          <div className="w-full h-2 bg-[#F5F0E8] rounded-full overflow-hidden relative">
            <div 
              className="bg-[#C9A84C] h-full rounded-full transition-all duration-[2500ms] cubic-bezier(0.16, 1, 0.3, 1)" 
              style={{ width: `${fundedPct}%` }} 
            />
          </div>
        </div>

        <div className="w-full flex justify-between items-center py-6 px-10 bg-[#0A0A0A] text-white font-bold uppercase tracking-[0.2em] rounded-2xl transition-all duration-700 text-[11px] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] group-hover:scale-[1.02] shadow-xl">
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  )
}

function MarketplaceInner() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState(searchParams.get("location") || "")
  const [inputVal, setInputVal] = useState(searchParams.get("location") || "")
  const [activeType, setActiveType] = useState(searchParams.get("type") || "")
  const [sort, setSort] = useState("default")

  useEffect(() => {
    if (status === "authenticated") {
      // @ts-ignore
      if (session?.user?.onboardingComplete === false) {
        router.push("/onboarding")
      }
    }
  }, [status, session, router])

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties")
        const data = await res.json()
        if (Array.isArray(data)) {
          const mapped = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            location: p.location,
            market: p.city,
            type: p.type === "APARTMENT" ? "Growth" : p.type === "VILLA" ? "Elite" : "Venture",
            pricePerShare: Math.round(p.askingPrice / 200), 
            totalShares: 200,
            availableShares: 200 - p.investments.length,
            propertyValue: p.askingPrice || 0,
            capRate: 8.2,
            targetYield: p.yieldEstimate,
            images: p.images,
            description: p.description,
            status: p.status === "ACTIVE" ? "Funding Stage" : p.status === "FULLY_SUBSCRIBED" ? "Fully Funded" : "Coming Soon"
          }))
          setProperties(mapped)
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const filtered = useMemo(() => {
    let list = [...properties]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p => p.location.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.market.toLowerCase().includes(q))
    }
    if (activeType) {
      const typeMap: Record<string, string> = { "Principal": "Elite", "Growth": "Growth", "Seed": "Venture" };
      list = list.filter(p => p.type === (typeMap[activeType] || activeType))
    }
    if (sort === "yield") list = list.sort((a, b) => b.targetYield - a.targetYield)
    if (sort === "price_asc") list = list.sort((a, b) => a.pricePerShare - b.pricePerShare)
    if (sort === "price_desc") list = list.sort((a, b) => b.pricePerShare - a.pricePerShare)
    return list
  }, [query, activeType, sort, properties])

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-40">
      {/* Editorial Marketplace Header */}
      <div className="relative pt-44 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
           <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white border border-[#0A0A0A]/5 rounded-full mb-10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0A0A0A]">Active Collection</p>
           </div>
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-[#0A0A0A] mb-10 tracking-tighter leading-[0.9]">
             The <br /> <span className="text-[#C9A84C]">Collection.</span>
           </h1>
           <p className="text-xl md:text-2xl text-[#8A8A8A] font-medium max-w-2xl mx-auto leading-relaxed italic font-serif">
             "Curated hospitality assets. Driven by performance."
           </p>
        </div>
        
        {/* Abstract Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[700px] bg-[#C9A84C]/5 blur-[160px] rounded-full -z-10" />
      </div>

      {/* Filter Architecture */}
      <div className="max-w-7xl mx-auto px-8 -translate-y-16">
        <div className="bg-white/60 backdrop-blur-3xl border border-[#0A0A0A]/5 p-3 rounded-[3.5rem] shadow-2xl flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 relative w-full lg:w-auto">
             <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A84C]" />
             <input 
               type="text"
               value={inputVal}
               onChange={(e) => setInputVal(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && setQuery(inputVal)}
               placeholder="Search by Location (e.g. London, Miami, Tokyo...)"
               className="w-full bg-white rounded-[2.5rem] pl-20 pr-10 py-7 text-base font-bold text-[#0A0A0A] placeholder:text-[#8A8A8A]/40 focus:outline-none tracking-widest text-[12px] uppercase shadow-sm"
             />
          </div>
          <div className="flex gap-4 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0 px-4 lg:px-0">
             {TYPE_OPTIONS.map(t => (
               <button 
                key={t.value}
                onClick={() => setActiveType(t.value)}
                className={cn(
                  "px-10 py-6 rounded-3xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap",
                  activeType === t.value ? "bg-[#0A0A0A] text-white shadow-2xl" : "text-[#8A8A8A] hover:text-[#0A0A0A] hover:bg-white"
                )}
               >
                 {t.label}
               </button>
             ))}
          </div>
        </div>

        {/* Dynamic Market Chips */}
        <div className="mt-8 flex items-center gap-6 px-10 overflow-x-auto no-scrollbar">
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A8A8A] opacity-40 shrink-0">Trending Markets:</span>
           <div className="flex gap-4">
              {["London", "Miami", "Tokyo", "Dubai", "New York"].map(loc => (
                <button 
                  key={loc}
                  onClick={() => {setQuery(loc); setInputVal(loc);}}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A] hover:text-[#C9A84C] transition-colors border-b border-transparent hover:border-[#C9A84C]/40 pb-0.5 whitespace-nowrap"
                >
                  {loc}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Asset Grid Grid */}
      <div className="max-w-7xl mx-auto px-8 mt-16">
        <div className="flex items-center justify-between mb-20 px-6">
           <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-[#C9A84C]" />
              <p className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-[0.4em]">{filtered.length} Flagships</p>
           </div>
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-[0.3em] opacity-40">Sort By</span>
              <select 
                value={sort} 
                onChange={e => setSort(e.target.value)}
                className="bg-transparent text-[11px] font-bold uppercase tracking-[0.3em] text-[#0A0A0A] focus:outline-none cursor-pointer border-b border-[#C9A84C]/60 pb-1"
              >
                <option value="default">Relevance</option>
                <option value="yield">Target Yield</option>
                <option value="price_asc">Investment Low</option>
                <option value="price_desc">Investment High</option>
              </select>
           </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-60">
             <div className="w-14 h-14 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-10" />
             <p className="font-serif text-3xl font-bold text-[#0A0A0A] italic tracking-tight opacity-40">Curating the Data Room...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {filtered.map((item) => <ListingCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center py-40 bg-white border border-[#0A0A0A]/5 rounded-[4rem] shadow-xl">
             <Home className="w-20 h-20 text-[#FAF9F6] mx-auto mb-10" />
             <p className="font-serif text-4xl font-bold text-[#0A0A0A] mb-4 tracking-tighter">No assets matching criteria.</p>
             <p className="text-[#8A8A8A] max-w-sm mx-auto mb-12 font-bold uppercase tracking-widest text-[11px] leading-relaxed">Adjust your profiling parameters to view secondary allocations.</p>
             <button 
              onClick={() => {setQuery(""); setInputVal(""); setActiveType("");}}
              className="px-12 py-6 bg-[#0A0A0A] text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-700 shadow-xl"
             >
               Reset Filters
             </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
        <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <MarketplaceInner />
    </Suspense>
  )
}
