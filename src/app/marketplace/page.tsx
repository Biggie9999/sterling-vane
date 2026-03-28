"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Search, MapPin, ChevronRight, Bed, Bath, SlidersHorizontal, TrendingUp, Home, Loader2, Star, ArrowUpRight } from "lucide-react"

const TYPE_OPTIONS = [
  { label: "All Assets", value: "" },
  { label: "Principal", value: "Principal" },
  { label: "Growth", value: "Growth" },
  { label: "Seed", value: "Seed" },
]

function ListingCard({ item }: { item: any }) {
  const fundedPct = Math.round(((item.totalShares - item.availableShares) / item.totalShares) * 100)
  
  return (
    <Link 
      href={`/properties/${item.id}`} 
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 block"
    >
      {/* Cinematic Image Frame */}
      <div className="relative h-72 w-full overflow-hidden">
        <div className="absolute top-6 left-6 z-20 flex gap-2">
           <div className="glass-dark px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-accent rounded-xl border border-white/10 shadow-xl">
             {item.type} Tier
           </div>
        </div>
        <div className="absolute top-6 right-6 z-20 glass-dark px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white rounded-xl border border-white/10 shadow-xl flex items-center gap-2">
           <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", item.status === "Funding Stage" ? "bg-emerald-400" : "bg-accent")} />
           {item.status}
        </div>
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Sophisticated Info Section */}
      <div className="p-8 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-2">
               <Star className="w-3.5 h-3.5 text-accent fill-current" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Collection</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1 tracking-tighter truncate group-hover:text-accent transition-colors duration-500">{item.name}</h3>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-accent/60" />
              <span className="truncate">{item.location}</span>
            </p>
          </div>
          <div className="text-right shrink-0 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Entry Share</p>
            <p className="text-xl font-bold text-slate-900 tracking-tighter">${item.pricePerShare.toLocaleString()}</p>
          </div>
        </div>

        {/* Dynamic Key Metrics */}
        <div className="grid grid-cols-3 gap-2 py-6 border-y border-slate-50 mb-6">
          <div className="text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Est. Yield</p>
            <p className="text-base font-bold text-[#006AFF] tracking-tighter">{item.targetYield}%</p>
          </div>
          <div className="text-center border-x border-slate-50">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Cap Rate</p>
            <p className="text-base font-bold text-slate-900 tracking-tighter">{item.capRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Asset Value</p>
            <p className="text-base font-bold text-slate-900 tracking-tighter">${(item.propertyValue / 1e6).toFixed(1)}M</p>
          </div>
        </div>

        {/* Precise Funding Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
            <span className="text-slate-400">Subscription Progress</span>
            <span className="text-accent">{fundedPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden luxury-shadow">
            <div 
              className="bg-accent h-full rounded-full transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1)" 
              style={{ width: `${fundedPct}%` }} 
            />
          </div>
        </div>

        <div className="w-full flex justify-between items-center py-4 px-6 bg-slate-950 text-white font-bold uppercase tracking-[0.2em] rounded-2xl transition-all duration-500 text-[10px] luxury-shadow group-hover:bg-accent group-hover:scale-[1.02]">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent group-hover:text-white" /> 
            Explore Allocation
          </span>
          <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

function MarketplaceInner() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState(searchParams.get("location") || "")
  const [inputVal, setInputVal] = useState(searchParams.get("location") || "")
  const [activeType, setActiveType] = useState(searchParams.get("type") || "")
  const [sort, setSort] = useState("default")

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
            type: p.type === "APARTMENT" ? "Growth" : p.type === "VILLA" ? "Principal" : "Seed",
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
    if (activeType) list = list.filter(p => p.type === activeType)
    if (sort === "yield") list = list.sort((a, b) => b.targetYield - a.targetYield)
    if (sort === "price_asc") list = list.sort((a, b) => a.pricePerShare - b.pricePerShare)
    if (sort === "price_desc") list = list.sort((a, b) => b.pricePerShare - a.pricePerShare)
    return list
  }, [query, activeType, sort, properties])

  return (
    <div className="bg-white min-h-screen pb-32 animate-sovereign-in">
      {/* Immersive Marketplace Header */}
      <div className="relative pt-32 pb-24 overflow-hidden border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
           <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full mb-8 luxury-shadow animate-pulse">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-slate-900">Phase 1 Offerings Live</p>
           </div>
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-slate-900 mb-8 tracking-tighter leading-none">
             The Sovereign <span className="text-accent">Collection</span>
           </h1>
           <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
             Institutional-grade real estate yields, accessible via the world's most sophisticated on-chain liquidity layer.
           </p>
        </div>
        {/* Abstract Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/5 blur-[140px] rounded-full -z-10" />
      </div>

      {/* Luxury Filter Bar */}
      <div className="max-w-7xl mx-auto px-8 -translate-y-12">
        <div className="bg-white/80 backdrop-blur-2xl border border-slate-100 p-4 rounded-[2.5rem] luxury-shadow flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full lg:w-auto">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
             <input 
               type="text"
               value={inputVal}
               onChange={(e) => setInputVal(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && setQuery(inputVal)}
               placeholder="Filter by Market (e.g. London, Miami, Tokyo...)"
               className="w-full bg-transparent pl-16 pr-8 py-5 text-lg font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none"
             />
          </div>
          <div className="flex gap-2 w-full lg:w-auto shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-4 overflow-x-auto no-scrollbar">
             {TYPE_OPTIONS.map(t => (
               <button 
                key={t.value}
                onClick={() => setActiveType(t.value)}
                className={cn(
                  "px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all",
                  activeType === t.value ? "bg-accent text-white shadow-xl" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                )}
               >
                 {t.label}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-8 mt-12">
        <div className="flex items-center justify-between mb-12 px-2">
           <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.4em]">{filtered.length} Curated Assets Found</p>
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pt-0.5">Sort by</span>
              <select 
                value={sort} 
                onChange={e => setSort(e.target.value)}
                className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-slate-900 focus:outline-none cursor-pointer border-b border-slate-200 pb-1"
              >
                <option value="default">Relevance</option>
                <option value="yield">Yield (High to Low)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
              </select>
           </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <Loader2 className="w-16 h-16 text-accent animate-spin mb-8" />
             <p className="font-serif text-2xl text-slate-400 italic">Curating your collection...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((item) => <ListingCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center py-40 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
             <Home className="w-16 h-16 text-slate-200 mx-auto mb-8" />
             <p className="font-serif text-3xl font-bold text-slate-900 mb-4 tracking-tighter">No assets matching criteria</p>
             <p className="text-slate-400 max-w-sm mx-auto mb-10 font-medium leading-relaxed">Try adjusting your filters or search term to discover the Sovereign Collection.</p>
             <button 
              onClick={() => {setQuery(""); setInputVal(""); setActiveType("");}}
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-black transition-all luxury-shadow"
             >
               Refresh View
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    }>
      <MarketplaceInner />
    </Suspense>
  )
}
