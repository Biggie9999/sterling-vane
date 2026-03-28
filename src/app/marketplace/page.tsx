"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Search, MapPin, ChevronRight, Bed, Bath, Maximize, X, SlidersHorizontal, TrendingUp, Home, Key, Loader2 } from "lucide-react"
import type { PropertyAsset } from "@/data/properties"

const TYPE_OPTIONS = [
  { label: "All Listings", value: "" },
  { label: "Invest", value: "invest" },
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
]

const SORT_OPTIONS = [
  { label: "Best Match", value: "default" },
  { label: "Highest Yield", value: "yield" },
  { label: "Lowest Price", value: "price_asc" },
  { label: "Highest Price", value: "price_desc" },
]

function ListingCard({ item }: { item: PropertyAsset }) {
  const fundedPct = Math.round(((item.totalShares - item.availableShares) / item.totalShares) * 100)
  return (
    <Link href={`/properties/${item.id}`} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer block">
      {/* Image */}
      <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 rounded-full shadow-sm">
          {item.type} Asset
        </div>
        <div className={`absolute top-4 right-4 z-20 px-2.5 py-1 text-[10px] font-bold rounded-full flex items-center gap-1.5 ${item.status === "Funding Stage" ? "bg-emerald-500 text-white" : item.status === "Fully Funded" ? "bg-slate-900 text-white" : "bg-[#006AFF] text-white"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
          {item.status}
        </div>
        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="text-base font-serif font-bold text-slate-900 mb-1 truncate">{item.name}</h3>
            <p className="text-xs text-slate-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1 shrink-0 text-[#006AFF]" />
              <span className="truncate">{item.location}</span>
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Share</p>
            <p className="text-base font-bold text-slate-900">${item.pricePerShare.toLocaleString()}</p>
          </div>
        </div>

        {/* Key metric row */}
        <div className="flex items-center gap-4 py-3 border-y border-slate-100 my-2">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Yield</p>
            <p className="text-sm font-bold text-[#006AFF]">{item.targetYield}%</p>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Cap Rate</p>
            <p className="text-sm font-bold text-slate-900">{item.capRate}%</p>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Value</p>
            <p className="text-sm font-bold text-slate-900">${(item.propertyValue / 1e6).toFixed(1)}M</p>
          </div>
        </div>

        {/* Funding bar */}
        <div className="mt-2 mb-3">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
            <span className="text-slate-400">Funded</span>
            <span className="text-[#006AFF]">{fundedPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="bg-[#006AFF] h-full rounded-full" style={{ width: `${fundedPct}%` }} />
          </div>
        </div>

        <div className="w-full inline-flex justify-between items-center py-3 px-4 bg-slate-50 text-slate-900 font-bold uppercase tracking-widest rounded-xl transition-colors text-xs mt-auto border border-slate-200 group-hover:bg-[#006AFF] group-hover:text-white group-hover:border-[#006AFF]">
          <span>View Data Room</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}

function MarketplaceInner() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<PropertyAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState(searchParams.get("location") || "")
  const [inputVal, setInputVal] = useState(searchParams.get("location") || "")
  const [activeType, setActiveType] = useState(searchParams.get("type") || "")
  const [sort, setSort] = useState("default")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties")
        const data = await res.json()
        if (Array.isArray(data)) {
          // Map DB model to PropertyAsset interface if needed
          const mapped: PropertyAsset[] = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            location: p.location,
            market: p.city,
            type: p.type === "APARTMENT" ? "Growth" : p.type === "VILLA" ? "Principal" : "Seed",
            pricePerShare: p.askingPrice / 100, // Handle scale if needed, for now use as is
            totalShares: 200, // Default for demo migration
            availableShares: 200 - p.investments.length,
            propertyValue: p.askingPrice || 0,
            capRate: 8.2,
            targetYield: p.yieldEstimate,
            bedrooms: 4,
            bathrooms: 4,
            sqft: 5000,
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

  const activeFiltersCount = [query, activeType].filter(Boolean).length

  const filtered = useMemo(() => {
    let list = [...properties]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p => p.location.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.market.toLowerCase().includes(q))
    }
    if (activeType === "invest") list = list.filter(p => ["Seed", "Growth", "Principal"].includes(p.type))
    if (activeType === "buy") list = list.filter(p => p.status === "Stabilized" || p.status === "Fully Funded")
    if (sort === "yield") list = list.sort((a, b) => b.targetYield - a.targetYield)
    if (sort === "price_asc") list = list.sort((a, b) => a.pricePerShare - b.pricePerShare)
    if (sort === "price_desc") list = list.sort((a, b) => b.pricePerShare - a.pricePerShare)
    return list
  }, [query, activeType, sort])

  const hasActiveFilters = query || activeType

  return (
    <div className="bg-white min-h-screen pt-20 sm:pt-28 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 mb-8 sm:mb-12">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Phase 1 Offerings</p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">The Sovereign Collection</h1>
          <p className="text-slate-600 text-sm sm:text-lg font-medium max-w-xl mx-auto">
            Institutional-grade luxury assets available for immediate fractional allocation.
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto">
          {/* Search input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") setQuery(inputVal.trim()) }}
              placeholder="Search markets (Miami, Aspen, Tokyo…)"
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006AFF] focus:bg-white transition-all"
            />
          </div>

          {/* Filter drawer toggle (mobile) */}
          <button onClick={() => setShowFilters(v => !v)}
            className={`sm:hidden flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border font-bold text-sm transition-all ${showFilters || activeFiltersCount > 0 ? "border-[#006AFF] bg-[#006AFF] text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          {/* Desktop search button */}
          <button onClick={() => setQuery(inputVal.trim())}
            className="hidden sm:flex items-center justify-center gap-2 px-8 py-4 bg-[#006AFF] text-white rounded-2xl font-bold text-sm hover:bg-[#0050CC] transition-colors shrink-0 shadow-md">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>

        {/* Filter chips - always visible on desktop, collapsible on mobile */}
        <div className={`mt-4 max-w-4xl mx-auto ${showFilters ? "block" : "hidden sm:block"}`}>
          <div className="flex flex-wrap gap-3 items-center">
            {/* Type chips */}
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map(t => (
                <button key={t.value} onClick={() => setActiveType(t.value)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeType === t.value ? "bg-[#006AFF] text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-slate-200" />

            {/* Sort */}
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-600 border-none outline-none cursor-pointer hover:bg-slate-200 transition-colors">
              {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {filtered.length} {filtered.length === 1 ? "Asset" : "Assets"} {query && `in "${query}"`}
          </p>
          {hasActiveFilters && (
            <button onClick={() => { setQuery(""); setInputVal(""); setActiveType(""); }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
              <X className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-[#006AFF] animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading Soveign Collection...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {filtered.map((item) => <ListingCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-200 max-w-3xl mx-auto">
            <MapPin className="w-12 h-12 mx-auto mb-6 text-[#006AFF] opacity-40" />
            <p className="font-serif text-2xl font-bold text-slate-900 mb-3">No assets match your filters</p>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Try broadening your search or clearing your filters.</p>
            <button onClick={() => { setQuery(""); setInputVal(""); setActiveType(""); }}
              className="px-6 py-3 bg-[#006AFF] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#0050CC] transition-colors">
              View All Assets
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
        <div className="w-8 h-8 rounded-full border-2 border-[#006AFF] border-t-transparent animate-spin" />
      </div>
    }>
      <MarketplaceInner />
    </Suspense>
  )
}
