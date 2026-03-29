"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Suspense } from "react"
import Link from "next/link"
import { Search, MapPin, TrendingUp, Home, Loader2, Star, ArrowUpRight, Globe, Filter, LayoutGrid, Map as MapIcon, SlidersHorizontal, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const TYPE_OPTIONS = [
  { label: "All Assets", value: "" },
  { label: "Elite Villa", value: "VILLA" },
  { label: "Penthouse", value: "PENTHOUSE" },
  { label: "Apartment", value: "APARTMENT" },
]

function ListingCard({ item, index }: { item: any, index: number }) {
  const fundedPct = Math.round(((item.totalShares - item.availableShares) / item.totalShares) * 100)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: (index % 6) * 0.1 }}
    >
      <Link 
        href={`/properties/${item.slug}`} 
        className="group relative flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-black/[0.03] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700"
      >
        {/* Cinematic Image Frame */}
        <div className="relative h-48 sm:h-64 lg:h-72 w-full overflow-hidden">
          <div className="absolute top-6 left-6 z-20 flex gap-2">
             <div className="bg-white/90 backdrop-blur-xl px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-black rounded-full border border-black/[0.03] shadow-lg">
               {item.type}
             </div>
          </div>
          <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md px-4 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white rounded-full border border-white/10 shadow-lg flex items-center gap-2">
             <div className={cn("w-1.5 h-1.5 rounded-full", item.status === "Funding Stage" ? "bg-[#2563EB] animate-pulse" : "bg-white/40")} />
             {item.status}
          </div>
          <img 
            src={item.images[0]} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        </div>

        {/* Editorial Info Section */}
        <div className="p-6 sm:p-8 flex flex-col flex-1">
          <div className="mb-6">
            <h3 className="text-2xl font-serif font-bold text-[#0F172A] mb-2 tracking-tight truncate group-hover:text-[#2563EB] transition-colors duration-500">{item.name}</h3>
            <p className="text-sm text-[#64748B] font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="truncate uppercase tracking-widest text-[10px] opacity-60">{item.location}</span>
            </p>
          </div>

          {/* Institutional Metrics Grid */}
          <div className="grid grid-cols-3 gap-1 py-4 sm:py-6 border-y border-black/[0.03] mb-4 sm:mb-8">
            <div className="text-center">
              <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-[0.2em] mb-1.5 opacity-40">Est. Yield</p>
              <p className="text-lg font-bold text-[#2563EB] tracking-tight">{item.targetYield}%</p>
            </div>
            <div className="text-center border-x border-black/[0.03]">
              <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-[0.2em] mb-1.5 opacity-40">Cap Rate</p>
              <p className="text-lg font-bold text-[#0F172A] tracking-tight">{item.capRate}%</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-[0.2em] mb-1.5 opacity-40">Entry</p>
              <p className="text-lg font-bold text-[#0F172A] tracking-tight">${(item.pricePerShare / 1000).toFixed(1)}k</p>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between group-hover:px-2 transition-all duration-500">
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest opacity-40 mb-1">Asset Value</span>
                <span className="text-sm font-bold text-[#0F172A] tracking-tight">${(item.propertyValue / 1e6).toFixed(1)}M</span>
             </div>
             <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-[#2563EB] group-hover:text-black transition-all duration-500 shadow-xl group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5" />
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
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
            ...p,
            propertyValue: p.askingPrice || 0,
            targetYield: p.yieldEstimate,
            status: p.status === "ACTIVE" ? "Funding Stage" : p.status === "FULLY_SUBSCRIBED" ? "Fully Funded" : "Coming Soon",
            totalShares: 500,
            availableShares: 500 - (p.investments?.length || 0)
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
      list = list.filter(p => p.location.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q))
    }
    if (activeType) {
      list = list.filter(p => p.type === activeType)
    }
    if (sort === "yield") list = list.sort((a, b) => b.targetYield - a.targetYield)
    if (sort === "price_asc") list = list.sort((a, b) => a.pricePerShare - b.pricePerShare)
    if (sort === "price_desc") list = list.sort((a, b) => b.pricePerShare - a.pricePerShare)
    return list
  }, [query, activeType, sort, properties])

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-40">
      {/* Editorial Navigation Spacer */}
      <div className="h-16 lg:h-32" />

      {/* Global Filter Architecture (Sticky on Scroll) */}
      <div className="sticky top-0 z-40 px-4 sm:px-6 py-4 sm:py-6 lg:py-8 bg-[#F8FAFC]/90 backdrop-blur-2xl border-b border-black/[0.03]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
          {/* Search Module */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] group-focus-within:text-[#2563EB] transition-colors" />
            <input 
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setQuery(inputVal)}
              placeholder="Search major global markets..."
              className="w-full bg-white rounded-full pl-14 pr-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#0F172A] placeholder:text-[#64748B]/30 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/5 border border-black/[0.03] shadow-sm transition-all"
            />
          </div>

          {/* Type Filtration Chips */}
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar px-2 lg:px-0 scroll-smooth">
             {TYPE_OPTIONS.map(t => (
               <button 
                key={t.value}
                onClick={() => setActiveType(t.value)}
                className={cn(
                  "px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap border border-black/[0.03]",
                  activeType === t.value ? "bg-[#0F172A] text-white shadow-xl" : "bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-white"
                )}
               >
                 {t.label}
               </button>
             ))}
          </div>

          {/* Mobile Sort — shown only on small screens */}
          <div className="flex lg:hidden items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-black/[0.03] shadow-sm shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-transparent text-[9px] font-bold uppercase tracking-[0.2em] text-[#0F172A] focus:outline-none cursor-pointer"
            >
              <option value="default">Relevance</option>
              <option value="yield">Top Yield</option>
              <option value="price_asc">Lowest Entry</option>
              <option value="price_desc">High Value</option>
            </select>
          </div>

          {/* Sort & Tools Cluster */}
          <div className="ml-auto hidden lg:flex items-center gap-4">
             <div className="flex items-center gap-2 px-6 py-4 bg-white rounded-full border border-black/[0.03] shadow-sm">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
                <select 
                  value={sort} 
                  onChange={e => setSort(e.target.value)}
                  className="bg-transparent text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F172A] focus:outline-none cursor-pointer"
                >
                  <option value="default">Sort by Relevance</option>
                  <option value="yield">Top Yield Performers</option>
                  <option value="price_asc">Lowest Entry Cost</option>
                  <option value="price_desc">High Value Allocation</option>
                </select>
             </div>
             
             <button className="flex items-center gap-2 px-6 py-4 bg-[#0F172A] text-white rounded-full border border-black/[0.1] shadow-xl hover:bg-[#2563EB] hover:text-black transition-all">
                <MapIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Map View</span>
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mt-10 lg:mt-24 pb-24 md:pb-0">
        {/* Market Context Line */}
        <div className="flex flex-row items-center justify-between mb-10 sm:mb-16 px-2 sm:px-4">
           <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
              <h2 className="text-[9px] sm:text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.2em] sm:tracking-[0.4em]">Live Sovereign Registry</h2>
              <span className="hidden sm:inline text-[11px] font-bold text-[#64748B] uppercase tracking-[0.4em] opacity-30">— {filtered.length} AVAILABLE ASSETS</span>
           </div>
           
           <div className="flex items-center gap-6 lg:hidden">
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-black/[0.03] flex items-center justify-center text-[#0F172A]">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
           </div>
        </div>

        {/* Global Asset Collective */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-60">
             <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin mb-8" />
             <p className="font-serif text-2xl font-bold text-[#0F172A] italic tracking-tight opacity-40">Synchronizing Ledger Assets...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
            {filtered.map((item, index) => <ListingCard key={`${item.id}-${index}`} item={item} index={index} />)}
          </div>
        ) : (
          <div className="text-center py-40 bg-white border border-black/[0.03] rounded-[4rem] shadow-2xl">
             <Home className="w-16 h-16 text-[#F8FAFC] mx-auto mb-10" />
             <p className="font-serif text-4xl font-bold text-[#0F172A] mb-4 tracking-tighter">No primary allocations found.</p>
             <p className="text-[#64748B] max-w-sm mx-auto mb-12 font-bold uppercase tracking-widest text-[11px] opacity-60 leading-relaxed">Adjust your profiling parameters or seek institutional secondary access.</p>
             <button 
              onClick={() => {setQuery(""); setInputVal(""); setActiveType("");}}
              className="px-12 py-5 bg-[#0F172A] text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#2563EB] hover:text-[#0F172A] transition-all duration-700 shadow-xl"
             >
               Clear Filters
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
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <MarketplaceInner />
    </Suspense>
  )
}
