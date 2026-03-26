"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, ChevronRight, Bed, Maximize } from "lucide-react"

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<"book" | "buy">("book")

  const shortlets = [
    { slug: "miami-waterfront-estate", name: "Miami Waterfront Estate", loc: "Miami, FL", price: "$4,500/night", beds: 6, sqft: "8,500" },
    { slug: "pacific-glass-house", name: "The Pacific Glass House", loc: "California", price: "$2,800/night", beds: 4, sqft: "6,200" },
  ]

  const sales = [
    { slug: "aspen-ski-chalet", name: "Aspen Ski Chalet", loc: "Colorado", price: "$18,200,000", cap: "6.8%", beds: 7, sqft: "12,000" },
    { slug: "palm-royale-retreat", name: "Palm Royale Retreat", loc: "Florida", price: "$4,100,000", cap: "8.2%", beds: 5, sqft: "5,400" },
  ]

  return (
    <div className="bg-brand-light min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12 max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          The Marketplace
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
          Reserve an exclusive stay in a Sovereign property, or acquire full ownership of a stabilized asset.
        </p>

        {/* Custom Tab Switcher */}
        <div className="inline-flex bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200">
          <button 
            onClick={() => setActiveTab("book")}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === 'book' ? 'bg-white text-brand-blue shadow-sm shadow-black/5' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Book a Stay
          </button>
          <button 
            onClick={() => setActiveTab("buy")}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === 'buy' ? 'bg-white text-brand-blue shadow-sm shadow-black/5' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Buy an Asset
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {activeTab === "book" && shortlets.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-smooth transition-all group flex flex-col cursor-pointer">
              <Link href={`/marketplace/shortlet/${item.slug}`} className="block relative h-72 w-full bg-slate-100 overflow-hidden">
                 <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-800 rounded-full shadow-sm">
                   Shortlet
                 </div>
                 {/* Image placeholder */}
                 <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium group-hover:scale-105 transition-transform duration-700">
                   [ {item.name} Image ]
                 </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center"><MapPin className="w-3 h-3 mr-1" />{item.loc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-brand-blue">{item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 py-4 border-t border-slate-100 mb-2">
                  <div className="flex items-center text-slate-600 text-sm">
                    <Bed className="w-4 h-4 mr-2 text-slate-400" /> {item.beds} Beds
                  </div>
                  <div className="flex items-center text-slate-600 text-sm">
                    <Maximize className="w-4 h-4 mr-2 text-slate-400" /> {item.sqft} SqFt
                  </div>
                </div>

                <Link href={`/marketplace/shortlet/${item.slug}`} className="w-full inline-flex justify-center items-center py-3 bg-brand-light text-brand-blue font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                  Check Dates <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}

          {activeTab === "buy" && sales.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-smooth transition-all group flex flex-col cursor-pointer">
              <Link href={`/marketplace/buy/${item.slug}`} className="block relative h-72 w-full bg-slate-100 overflow-hidden">
                 <div className="absolute top-4 left-4 z-20 bg-brand-blue text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                   For Sale
                 </div>
                 {/* Image placeholder */}
                 <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium group-hover:scale-105 transition-transform duration-700">
                   [ {item.name} Image ]
                 </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center"><MapPin className="w-3 h-3 mr-1" />{item.loc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-900">{item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 py-4 border-t border-slate-100 mb-2">
                  <div className="flex items-center text-slate-600 text-sm">
                    <span className="font-semibold text-brand-accent mr-1">Cap Rate:</span> {item.cap}
                  </div>
                  <div className="flex items-center text-slate-600 text-sm">
                    <span className="font-semibold text-slate-900 mr-1">{item.sqft}</span> SqFt
                  </div>
                </div>

                <Link href={`/marketplace/buy/${item.slug}`} className="w-full inline-flex justify-center items-center py-3 bg-brand-light text-brand-blue font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                  View Setup <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
