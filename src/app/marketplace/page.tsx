"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Search, MapPin, ChevronRight, Bed, Bath, Maximize, Loader2, ExternalLink, AlertCircle, RefreshCw } from "lucide-react"

type Listing = {
  zpid: string
  name: string
  location: string
  price: string
  rawPrice: number
  beds: number | string
  baths: number | string
  sqft: string | null
  image: string | null
  url: string | null
  daysOnMarket: number | null
  type: string
}

const LOCATIONS = ["Miami, FL", "Los Angeles, CA", "New York, NY", "Aspen, CO", "Malibu, CA", "Palm Beach, FL"]

function ListingCard({ item, tab }: { item: Listing; tab: "rent" | "sale" }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-smooth hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-800 rounded-full shadow-sm">
          {tab === "rent" ? "For Rent" : "For Sale"}
        </div>
        {item.daysOnMarket != null && (
          <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-white rounded-full">
            {item.daysOnMarket}d on market
          </div>
        )}
        {item.image && !imgError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <MapPin className="w-12 h-12 text-slate-300" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 mb-1 truncate">{item.name}</h3>
            <p className="text-sm text-slate-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1 shrink-0" />
              <span className="truncate">{item.location}</span>
            </p>
          </div>
          <div className="text-right ml-4 shrink-0">
            <p className="text-lg font-bold text-brand-blue">{item.price}</p>
          </div>
        </div>

        <div className="flex items-center space-x-5 py-4 border-t border-slate-100 mt-auto">
          {item.beds !== "—" && (
            <div className="flex items-center text-slate-600 text-sm">
              <Bed className="w-4 h-4 mr-1.5 text-slate-400" /> {item.beds} bd
            </div>
          )}
          {item.baths !== "—" && (
            <div className="flex items-center text-slate-600 text-sm">
              <Bath className="w-4 h-4 mr-1.5 text-slate-400" /> {item.baths} ba
            </div>
          )}
          {item.sqft && (
            <div className="flex items-center text-slate-600 text-sm">
              <Maximize className="w-4 h-4 mr-1.5 text-slate-400" /> {item.sqft} sqft
            </div>
          )}
        </div>

        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex justify-center items-center py-2.5 bg-brand-light text-brand-blue font-semibold rounded-lg hover:bg-slate-100 transition-colors text-sm mt-2"
          >
            View on Zillow <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        ) : (
          <button className="w-full inline-flex justify-center items-center py-2.5 bg-brand-light text-brand-blue font-semibold rounded-lg hover:bg-slate-100 transition-colors text-sm mt-2">
            View Details <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col animate-pulse">
      <div className="h-64 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-3 bg-slate-100 rounded w-1/3 mt-4" />
        <div className="h-9 bg-slate-100 rounded-lg mt-4" />
      </div>
    </div>
  )
}

function MarketplaceInner() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"rent" | "sale">(
    (searchParams.get("type") === "for_sale" ? "sale" : "rent") as "rent" | "sale"
  )
  const [location, setLocation] = useState(searchParams.get("location") || "Miami, FL")
  const [inputValue, setInputValue] = useState(searchParams.get("location") || "Miami, FL")
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noApiKey, setNoApiKey] = useState(false)
  const [searched, setSearched] = useState(false)

  const fetchListings = useCallback(async (loc: string, tab: "rent" | "sale") => {
    setLoading(true)
    setError(null)
    setSearched(true)
    try {
      const type = tab === "rent" ? "for_rent" : "for_sale"
      const res = await fetch(`/api/properties?location=${encodeURIComponent(loc)}&type=${type}`)
      const data = await res.json()

      if (data.error?.includes("No RAPIDAPI_KEY")) {
        setNoApiKey(true)
        setListings([])
      } else if (data.error) {
        setError(data.error)
        setListings([])
      } else {
        setNoApiKey(false)
        setListings(data.listings || [])
      }
    } catch (e: any) {
      setError("Failed to fetch listings. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  // Auto-search from URL params (e.g. coming from hero) or when tab changes after first search
  useEffect(() => {
    const autoSearch = searchParams.get("autoSearch")
    if (autoSearch === "1" || searched) {
      fetchListings(location, activeTab)
    }
  }, [activeTab, location])

  // On first load auto-trigger if autoSearch param present
  useEffect(() => {
    if (searchParams.get("autoSearch") === "1") {
      fetchListings(location, activeTab)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    const loc = inputValue.trim() || location
    setLocation(loc)
    fetchListings(loc, activeTab)
  }

  return (
    <div className="bg-brand-light min-h-screen pt-24 sm:pt-32 pb-24">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 mb-10 max-w-5xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
          The Marketplace
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          Live Realtor.com data. Search luxury rentals or acquisition targets across the US.
        </p>

        {/* Tabs */}
        <div className="inline-flex bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab("rent")}
            className={`px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all ${activeTab === 'rent' ? 'bg-white text-brand-blue shadow-sm shadow-black/5' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Book a Stay
          </button>
          <button
            onClick={() => setActiveTab("sale")}
            className={`px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all ${activeTab === 'sale' ? 'bg-white text-brand-blue shadow-sm shadow-black/5' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Buy an Asset
          </button>
        </div>

        {/* Search Bar — single unified input */}
        <div className="flex gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="City, state or ZIP…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-5 py-3 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* No API Key banner */}
        {noApiKey && (
          <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 mb-1">Live property data needs a RapidAPI key</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                Add <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs font-mono">RAPIDAPI_KEY=your_key_here</code> to your <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> file, then restart the server.{" "}
                <a href="https://rapidapi.com/apidojo/api/realty-in-us" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-amber-900">
                  Get a free key here →
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !noApiKey && (
          <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-600 flex-1">{error}</p>
            <button onClick={handleSearch} className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-1 shrink-0">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        )}

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : listings.length > 0 ? (
          <>
            <p className="text-sm text-slate-500 mb-5">
              Showing <strong>{listings.length}</strong> live {activeTab === "rent" ? "rental" : "sale"} listings in <strong>{location}</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((item) => (
                <ListingCard key={item.zpid || item.name} item={item} tab={activeTab} />
              ))}
            </div>
          </>
        ) : searched && !noApiKey && !error ? (
          <div className="text-center py-20 text-slate-400">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No listings found</p>
            <p className="text-sm">Try a different location or property type</p>
          </div>
        ) : !searched ? (
          <div className="text-center py-20 text-slate-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">Search for properties</p>
            <p className="text-sm">Enter a location above and click Search to see live data</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    }>
      <MarketplaceInner />
    </Suspense>
  )
}


