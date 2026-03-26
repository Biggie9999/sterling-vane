"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Users, ChevronDown, CheckCircle } from "lucide-react"

export default function ShortletDetailPage({ params }: { params: { slug: string } }) {
  const [dates, setDates] = useState("Select Dates")
  const [guests, setGuests] = useState(2)

  const property = {
    name: "The Pacific Glass House",
    location: "California, USA",
    price: 2800,
    rating: "4.98",
    reviews: 124,
    description: "Experience architectural mastery floating above the Pacific Ocean. This award-winning glass estate offers complete privacy and unparalleled panoramic views of the coast.",
    features: ["Infinity Pool", "Chef's Kitchen", "Private Beach Access", "Smart Home Integration", "Daily Housekeeping"]
  }

  return (
    <div className="bg-brand-light min-h-screen pt-24 pb-24">
      {/* Back Navigation */}
      <div className="container mx-auto px-6 mb-8 max-w-6xl">
        <Link href="/marketplace" className="inline-flex items-center text-slate-500 hover:text-brand-accent transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Link>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Gallery */}
        <div className="grid grid-cols-4 gap-4 h-[50vh] min-h-[400px] mb-12">
           <div className="col-span-4 md:col-span-2 row-span-2 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-500 font-medium">
             [ Main Hero View ]
           </div>
           <div className="col-span-2 md:col-span-1 bg-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-500">[ Pool ]</div>
           <div className="col-span-2 md:col-span-1 bg-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-500 overflow-hidden relative">
             <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all cursor-pointer">
               <span className="bg-white px-4 py-2 rounded-lg shadow-sm font-semibold text-sm">View All Photos</span>
             </div>
           </div>
           <div className="col-span-2 md:col-span-1 bg-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-500">[ Bedroom ]</div>
           <div className="col-span-2 md:col-span-1 bg-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-500">[ Kitchen ]</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{property.name}</h1>
              <p className="text-lg text-slate-600 mb-4">{property.location}</p>
              <div className="flex items-center space-x-4 text-sm text-slate-800 font-medium pb-6 border-b border-slate-200">
                <span className="flex items-center"><span className="text-brand-accent mr-1">★</span> {property.rating} ({property.reviews} reviews)</span>
                <span>•</span>
                <span className="text-brand-blue">Superhost Level</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">The Space</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((feat, i) => (
                  <div key={i} className="flex items-center text-slate-700">
                    <CheckCircle className="w-5 h-5 mr-3 text-brand-blue" /> {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white border border-slate-200 p-8 rounded-2xl shadow-smooth">
               <div className="flex items-end justify-between mb-6">
                 <div>
                   <span className="text-3xl font-bold text-slate-900">${property.price.toLocaleString()}</span>
                   <span className="text-slate-500 font-medium"> / night</span>
                 </div>
               </div>

               <div className="border border-slate-200 rounded-xl mb-6 overflow-hidden">
                 <button className="w-full flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left">
                   <div>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Check-in / Checkout</p>
                     <p className="font-medium text-slate-800 flex items-center"><Calendar className="w-4 h-4 mr-2 text-brand-blue"/> {dates}</p>
                   </div>
                 </button>
                 <button className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left" onClick={() => setGuests(guests === 10 ? 1 : guests + 1)}>
                   <div>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Guests</p>
                     <p className="font-medium text-slate-800 flex items-center"><Users className="w-4 h-4 mr-2 text-brand-blue"/> {guests} Guests</p>
                   </div>
                   <ChevronDown className="w-4 h-4 text-slate-400" />
                 </button>
               </div>

               <button className="w-full py-4 bg-brand-accent text-white font-bold rounded-lg hover:bg-brand-accent/90 transition-colors shadow-sm shadow-brand-accent/30 text-lg mb-6">
                 Reserve
               </button>

               <div className="space-y-4 text-sm text-slate-600">
                 <div className="flex justify-between">
                   <span className="underline decoration-slate-300">Total (3 nights)</span>
                   <span className="font-semibold text-slate-800">${(property.price * 3).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="underline decoration-slate-300">Cleaning fee</span>
                   <span className="font-semibold text-slate-800">$450</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="underline decoration-slate-300">Sovereign Service fee</span>
                   <span className="font-semibold text-slate-800">$680</span>
                 </div>
                 <div className="flex justify-between pt-4 border-t border-slate-200 text-base font-bold text-slate-900">
                   <span>Total before taxes</span>
                   <span>${(property.price * 3 + 450 + 680).toLocaleString()}</span>
                 </div>
               </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
