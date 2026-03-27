"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Search, MapPin, ChevronRight, Bed, Bath, Maximize } from "lucide-react"
import { DEMO_PROPERTIES } from "@/data/properties"

function ListingCard({ item }: { item: typeof DEMO_PROPERTIES[0] }) {
  return (
    <Link href={`/properties/${item.id}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer block">
      {/* Image */}
      <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] rounded-full shadow-sm">
          {item.type} Asset
        </div>
        <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-white rounded-full flex items-center gap-1.5 border border-white/10">
          <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Funding Stage" ? "bg-emerald-400" : "bg-[#006AFF]"}`}></span>
          {item.status}
        </div>
        
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-lg font-serif font-bold text-[#1a1a1a] mb-1 truncate">{item.name}</h3>
            <p className="text-sm text-[#666] flex items-center">
              <MapPin className="w-3 h-3 mr-1 shrink-0 text-[#006AFF]" />
              <span className="truncate">{item.location}</span>
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1">Share Price</p>
            <p className="text-lg font-bold text-[#1a1a1a]">${item.pricePerShare.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-5 py-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center text-[#666] text-sm font-medium">
            <Bed className="w-4 h-4 mr-1.5 text-[#006AFF]" /> {item.bedrooms} bd
          </div>
          <div className="flex items-center text-[#666] text-sm font-medium">
            <Bath className="w-4 h-4 mr-1.5 text-[#006AFF]" /> {item.bathrooms} ba
          </div>
          <div className="flex items-center text-[#666] text-sm font-medium">
            <Maximize className="w-4 h-4 mr-1.5 text-[#006AFF]" /> {item.sqft.toLocaleString()} sqft
          </div>
        </div>

        <div className="w-full inline-flex justify-between items-center py-3 px-4 bg-[#FAF9F6] text-[#1a1a1a] font-bold uppercase tracking-widest rounded-lg transition-colors text-xs mt-2 border border-slate-200 group-hover:bg-[#1a1a1a] group-hover:text-white group-hover:border-[#1a1a1a]">
          <span>View Data Room</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}

function MarketplaceInner() {
  const searchParams = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get("location") || "")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("location") || "")

  const handleSearch = () => {
    setSearchQuery(inputValue.trim())
  }

  const filteredProperties = useMemo(() => {
    if (!searchQuery) return DEMO_PROPERTIES;
    const lowerQuery = searchQuery.toLowerCase();
    return DEMO_PROPERTIES.filter(p => 
      p.location.toLowerCase().includes(lowerQuery) || 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.market.toLowerCase().includes(lowerQuery)
    )
  }, [searchQuery])

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-24 sm:pt-32 pb-24">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 mb-12 max-w-5xl text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1a1a1a] mb-6 tracking-tight">
          The Sovereign Collection
        </h1>
        <p className="text-base sm:text-lg text-[#666] leading-relaxed mb-10 max-w-2xl mx-auto">
          Explore our premier portfolio of high-yield luxury assets. Available for immediate fractional allocation.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search markets (e.g., Miami, Aspen)..."
              className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-base font-medium text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#006AFF] shadow-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-4 bg-[#1a1a1a] text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#006AFF] transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {filteredProperties.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <p className="text-sm font-bold text-[#1a1a1a] uppercase tracking-widest">
                Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'Asset' : 'Assets'}
              </p>
              {searchQuery && (
                <button onClick={() => { setInputValue(""); setSearchQuery(""); }} className="text-xs font-bold text-[#888] hover:text-[#1a1a1a] uppercase tracking-widest transition-colors flex items-center">
                  Clear Filters
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
            <MapPin className="w-12 h-12 mx-auto mb-6 text-[#006AFF] opacity-50" />
            <p className="font-serif text-2xl text-[#1a1a1a] mb-3">No assets available in "{searchQuery}"</p>
            <p className="text-[#888] mb-8 max-w-md mx-auto">Our acquisitions team is continuously underwriting new markets. Try searching for Miami or Aspen.</p>
            <button 
              onClick={() => { setInputValue(""); setSearchQuery(""); }}
              className="px-6 py-3 bg-[#FAF9F6] border border-slate-200 text-[#1a1a1a] font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors"
            >
              View All Properties
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
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <div className="w-8 h-8 rounded-full border-2 border-[#006AFF] border-t-transparent animate-spin" />
      </div>
    }>
      <MarketplaceInner />
    </Suspense>
  )
}
