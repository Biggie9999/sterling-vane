"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { Heart, Star } from "lucide-react"

const Map = dynamic(() => import("./MapComponent"), { ssr: false })

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Panoramic Glass Villa",
    location: "Santorini, Greece",
    host: "Hosted by Elena",
    price: 890,
    rating: 4.99,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    lat: 36.393156,
    lng: 25.461509
  },
  {
    id: 2,
    title: "Eco-Lodge with Private Waterfall",
    location: "Ubud, Bali",
    host: "Hosted by Wayan",
    price: 450,
    rating: 4.96,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    lat: -8.506854,
    lng: 115.262482
  },
  {
    id: 3,
    title: "Modern Aspen Chalet",
    location: "Aspen, Colorado",
    host: "Hosted by Michael",
    price: 1200,
    rating: 4.98,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    lat: 39.191098,
    lng: -106.817539
  },
  {
    id: 4,
    title: "Cliffside Ocean Retreat",
    location: "Big Sur, California",
    host: "Hosted by Sarah",
    price: 950,
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    lat: 36.270420,
    lng: -121.808053
  },
  {
    id: 5,
    title: "Historic Tuscan Farmhouse",
    location: "Tuscany, Italy",
    host: "Hosted by Marco",
    price: 680,
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    lat: 43.771051,
    lng: 11.248621
  },
  {
    id: 6,
    title: "Penthouse with Skyline Views",
    location: "New York City, NY",
    host: "Hosted by James",
    price: 1500,
    rating: 4.89,
    image: "https://images.unsplash.com/photo-1496664444929-8c75efb9546f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    lat: 40.712776,
    lng: -74.005974
  }
]

function PropertyMapGridInner() {
  const searchParams = useSearchParams()
  const locationQuery = searchParams.get('location')?.toLowerCase()

  const filteredProperties = locationQuery 
    ? MOCK_PROPERTIES.filter(p => 
        p.location.toLowerCase().includes(locationQuery) || 
        p.title.toLowerCase().includes(locationQuery)
      ) 
    : MOCK_PROPERTIES

  return (
    <section className="flex flex-col md:flex-row min-h-[800px] border-t border-slate-200 bg-white">
      {/* Listings Column */}
      <div className="w-full md:w-1/2 lg:w-[55%] p-6 lg:p-8 overflow-y-auto h-[800px] custom-scrollbar">
        <h2 className="font-serif text-2xl mb-6 text-slate-900 font-bold">
          {locationQuery ? `Stays in ${searchParams.get('location')}` : 'Over 1,000 places globally'}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
          {filteredProperties.length === 0 && (
            <p className="text-slate-500 py-10">No properties found matching your search. Try another location.</p>
          )}
          {filteredProperties.map(p => (
            <div key={p.id} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-slate-900 tracking-tight">{p.location}</h3>
                  <span className="text-slate-500 text-sm mt-0.5">{p.host}</span>
                  <span className="text-slate-500 text-sm">Oct 14 - 20</span>
                  <div className="mt-2 text-slate-900">
                    <span className="font-semibold tracking-tight">${p.price}</span>
                    <span className="text-slate-800"> night</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 text-slate-900">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{p.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Map Column */}
      <div className="hidden md:block w-full md:w-1/2 lg:w-[45%] bg-slate-100 sticky top-0 h-[800px] z-0">
        <Map properties={filteredProperties} />
      </div>
    </section>
  )
}

export function PropertyMapGrid() {
  return (
    <Suspense fallback={<div className="min-h-[800px] flex items-center justify-center animate-pulse bg-slate-50">Loading properties...</div>}>
      <PropertyMapGridInner />
    </Suspense>
  )
}
