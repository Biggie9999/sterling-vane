import Link from "next/link"
import { ArrowLeft, Home, MapPin, CheckCircle2 } from "lucide-react"

// Mock router data
const propertyData: Record<string, any> = {
  "pacific-glass-house": {
    name: "The Pacific Glass House",
    location: "California, USA",
    specs: { size: "6,200 Sqft", beds: 4, baths: 5, floor: "Entire Estate" },
    financials: {
      askingPrice: "$8,500,000",
      estMonthly: "$72,000",
      projectedRoi: "14.2%",
      occupancy: "68%"
    },
    status: "Active",
    amenities: ["Ocean View", "Infinity Pool", "Smart Home", "Private Beach Access", "Wine Cellar", "Chef's Kitchen"]
  }
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = propertyData[params.slug] || propertyData["pacific-glass-house"]

  return (
    <div className="bg-brand-light min-h-screen pt-24 pb-24">
      
      {/* Back Navigation */}
      <div className="container mx-auto px-6 mb-8">
        <Link href="/portfolio" className="inline-flex items-center text-slate-500 hover:text-brand-accent transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero Image Gallery */}
      <div className="container mx-auto px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh] min-h-[400px]">
          <div className="md:col-span-2 bg-slate-200 rounded-2xl relative overflow-hidden">
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-green-200">
                {property.status}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 z-20">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 drop-shadow-md">{property.name}</h1>
              <p className="text-sm font-semibold text-slate-700 flex items-center drop-shadow-md">
                <MapPin className="w-4 h-4 mr-1 text-brand-blue" /> {property.location}
              </p>
            </div>
            {/* Main Image placeholder */}
            <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
              [Main Property Image]
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <div className="flex-1 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-medium overflow-hidden relative">
              [Gallery Image 1]
            </div>
            <div className="flex-1 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-medium overflow-hidden relative">
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <button className="bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-white transition-colors">
                  View All Photos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Specs */}
            <section className="flex items-center justify-between border border-slate-200 py-6 px-4 bg-white rounded-xl shadow-sm">
              <div className="text-center px-4 md:px-8 border-r border-slate-100 flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Size</p>
                <p className="text-2xl font-bold text-slate-900">{property.specs.size}</p>
              </div>
              <div className="text-center px-4 md:px-8 border-r border-slate-100 flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Beds</p>
                <p className="text-2xl font-bold text-slate-900">{property.specs.beds}</p>
              </div>
              <div className="text-center px-4 md:px-8 flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Baths</p>
                <p className="text-2xl font-bold text-slate-900">{property.specs.baths}</p>
              </div>
            </section>

            {/* Description */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About the Property</h2>
              <div className="text-slate-600 leading-relaxed space-y-4 text-lg">
                <p>
                  Perched on the rugged coastline, {property.name} is a masterclass in modern architectural restraint. Floor-to-ceiling retractable glass walls blur the boundary between the austere interior styling and the sweeping cinematic views of the Pacific Ocean.
                </p>
                <p>
                  Every detail has been engineered for the ultimate high-net-worth short-term rental experience. From the imported Italian marble in the chef's kitchen to the infinity edge pool that seemingly drops off into the sea, this asset commands premium nightly rates year-round.
                </p>
              </div>
            </section>

            {/* Amenities Grid */}
            <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {property.amenities.map((item: string, i: number) => (
                  <div key={i} className="flex items-center space-x-3 text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-blue">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sticky Financials Sidebar (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white border border-slate-200 p-8 rounded-xl shadow-smooth">
              <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                Financial Projections
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-slate-500">Asset Valuation</span>
                  <span className="font-bold text-lg text-slate-900">{property.financials.askingPrice}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-slate-500">Est. Monthly (Shortlet)</span>
                  <span className="font-bold text-lg text-slate-900">{property.financials.estMonthly}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-slate-500">Occupancy Target</span>
                  <span className="font-bold text-lg text-slate-900">{property.financials.occupancy}</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-slate-100 mt-2">
                  <span className="font-semibold text-slate-900">Projected Annual ROI</span>
                  <span className="text-3xl font-bold text-brand-blue">{property.financials.projectedRoi}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg mb-8 border border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed text-center">
                  Returns are distributed quarterly. Projections are based on current market comprables and operational efficiencies.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <Link href={`/apply?property=${params.slug}`} className="block w-full py-3.5 bg-brand-blue text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                  Invest in This Property
                </Link>
                <Link href={`/marketplace/shortlet/${params.slug}`} className="block w-full py-3.5 bg-white text-slate-700 border border-slate-200 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                  Book a Stay
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
