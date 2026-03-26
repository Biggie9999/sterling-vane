"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2, FileText, Download, Building } from "lucide-react"

export default function BuyDetailPage({ params }: { params: { slug: string } }) {
  // Mock Data
  const property = {
    name: "Aspen Ski Chalet",
    location: "Colorado, USA",
    price: "$18,200,000",
    cap: "6.8%",
    noi: "$1,237,600",
    status: "Off-Market",
    highlights: ["Ski-in/Ski-out Access", "Stabilized Asset", "Seller Financing Available", "High historical occupancy"]
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Gallery */}
          <div className="space-y-4">
            <div className="w-full h-96 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-500 font-medium">
              [ Main Property Hero ]
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 bg-slate-200 rounded-xl flex items-center justify-center text-sm text-slate-500">[ Image ]</div>
              <div className="h-48 bg-slate-200 rounded-xl flex items-center justify-center text-sm text-slate-500">[ Image ]</div>
            </div>
          </div>

          {/* Right Column - Setup & Form */}
          <div className="space-y-8">
            <div>
               <div className="inline-block bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                 Full Acquisition
               </div>
               <h1 className="text-4xl font-bold text-slate-900 mb-2">{property.name}</h1>
               <p className="text-lg text-slate-500 flex items-center"><Building className="w-4 h-4 mr-2"/> {property.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Asking Price</p>
                <p className="text-2xl font-bold text-slate-900">{property.price}</p>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Trailing NOI</p>
                <p className="text-2xl font-bold text-slate-900">{property.noi}</p>
              </div>
              <div className="p-6 bg-brand-blue text-white rounded-xl text-center shadow-sm col-span-2">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Stabilized Cap Rate</p>
                <p className="text-3xl font-bold">{property.cap}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Acquisition Diligence Room</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-brand-accent hover:bg-white transition-colors text-left group">
                  <div className="flex items-center text-slate-700 font-medium">
                    <FileText className="w-4 h-4 mr-3 text-slate-400 group-hover:text-brand-accent" /> Offering Memorandum
                  </div>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-brand-accent hover:bg-white transition-colors text-left group">
                  <div className="flex items-center text-slate-700 font-medium">
                    <FileText className="w-4 h-4 mr-3 text-slate-400 group-hover:text-brand-accent" /> Trailing 12M Financials
                  </div>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Request Private Showing</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent font-sans text-sm" />
                  <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent font-sans text-sm" />
                </div>
                <input type="email" placeholder="Corporate Email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent font-sans text-sm" />
                <textarea placeholder="Tell us about your acquisition timeline and capital structure..." rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent font-sans text-sm resize-none"></textarea>
                <button type="button" className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                  Submit Acquisition Request
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
