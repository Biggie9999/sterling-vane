"use client"

import { useState, useEffect } from "react"
import { MapPin, Bed, Bath, Star, Calendar, CheckCircle2, Loader2, Info, ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function BookingsPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [selectedProp, setSelectedProp] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties")
        const data = await res.json()
        if (Array.isArray(data)) setProperties(data)
      } catch (err) {
        console.error("Failed to fetch properties:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const handleSubmit = async (property: any, date: string) => {
    setIsSubmitting(true)
    setSelectedDate(date)
    setSelectedProp(property)
    
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn: date.split("–")[0] + " 2026",
          checkOut: date.split("–")[1] + " 2026",
          amount: (property.nightlyRate || 1000) * 0.7 * 3, // demo 3 nights
        })
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error("Booking failed:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#64748B] font-bold">Reserving Collection Data...</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center">
        <div className="w-24 h-24 bg-[#F1F5F9] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-[#2563EB]/20">
          <CheckCircle2 className="w-10 h-10 text-[#2563EB]" />
        </div>
        <h2 className="text-4xl font-serif font-bold text-[#0F172A] mb-4 tracking-tight">Reservation Requested</h2>
        <p className="text-[#64748B] mb-12 leading-relaxed font-serif italic text-lg">
          "Your priority stay at <span className="text-[#0F172A] font-bold not-italic">{selectedProp?.name}</span> for <span className="text-[#2563EB] font-bold not-italic">{selectedDate}</span> has been successfully logged."
        </p>
        <div className="bg-[#F8FAFC] border border-[#0F172A]/5 p-10 rounded-[2.5rem] mb-12 text-left shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-4 flex items-center gap-3">
            <Info className="w-4 h-4" /> Priority Note
          </p>
          <p className="text-sm text-[#64748B] leading-relaxed font-medium">
            As a Sovereign investor, your request has been prioritized for direct confirmation. Our concierge will verify the suite availability and provide final confirmation within 24 hours. No payment is required at this stage.
          </p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-12 py-5 bg-[#0F172A] text-white rounded-full font-bold hover:bg-[#2563EB] hover:text-[#0F172A] transition-all shadow-2xl flex items-center gap-4 mx-auto text-[10px] uppercase tracking-widest"
        >
          View More Suites <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="relative overflow-hidden p-5 sm:p-10 lg:p-16 bg-white border border-[#0F172A]/5 rounded-2xl sm:rounded-[3.5rem] shadow-sm group">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
               <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB]">Portfolio Privileges</p>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0F172A] mb-4 tracking-tight leading-tight">Priority Stays</h1>
            <p className="text-[#64748B] text-lg leading-relaxed font-serif italic">
              "As a principal holder in the Sovereign Collection, you receive secondary priority booking access and a <span className="text-[#2563EB] font-bold not-italic">30% reduction</span> on seasonal rates."
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-6 bg-[#F8FAFC] border border-[#0F172A]/5 p-8 rounded-[2rem] shadow-sm">
             <div className="text-right">
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1 opacity-60">Status</p>
                <p className="text-xl font-serif font-bold text-[#0F172A] tracking-tight">Principal Partner</p>
             </div>
             <div className="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center text-[#2563EB] shadow-2xl group-hover:bg-[#2563EB] group-hover:text-[#0F172A] transition-all">
                <Star className="w-6 h-6 fill-current" />
              </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-[#2563EB]/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-12">
        {properties.map((p: any, idx) => {
          const available = ["Apr 10–15", "Apr 22–28", "May 5–12"]
          return (
            <div
              key={p.id}
              className="group bg-white rounded-2xl sm:rounded-[3.5rem] overflow-hidden border border-[#0F172A]/5 flex flex-col lg:flex-row transition-all duration-700 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="lg:w-[450px] xl:w-[500px] h-48 sm:h-64 lg:h-auto relative overflow-hidden">
                <img 
                  src={p.images[0]} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                   <div className="px-4 py-2 bg-white/10 backdrop-blur-md text-[#2563EB] text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                     Phase {p.phase || 1}
                   </div>
                   <div className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                     Flagship Asset
                   </div>
                </div>
              </div>

              <div className="flex-1 p-4 sm:p-8 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 sm:gap-6 mb-5 sm:mb-8">
                    <div>
                      <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-2">{p.name}</h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-[#F1F5F9] rounded-full w-fit">
                        <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] pt-0.5">{p.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-[#F8FAFC] px-5 py-3 rounded-2xl border border-[#0F172A]/5 shadow-sm">
                      <Star className="w-4 h-4 text-[#2563EB] fill-current" />
                      <span className="text-[#0F172A] font-bold text-sm tracking-tighter">4.98</span>
                    </div>
                  </div>

                  <p className="text-[#64748B] text-base leading-relaxed mb-10 max-w-xl font-medium line-clamp-2">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 sm:gap-8 mb-6 sm:mb-12 pb-6 sm:pb-10 border-b border-[#0F172A]/5">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2 opacity-60">Configuration</p>
                      <p className="text-[#0F172A] font-bold flex items-center gap-3 text-sm"><Bed className="w-4 h-4 text-[#2563EB]" /> {p.bedrooms} Bedrooms</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2 opacity-60">Services</p>
                      <p className="text-[#0F172A] font-bold flex items-center gap-3 text-sm"><Bath className="w-4 h-4 text-[#2563EB]" /> {p.bathrooms} Ensuites</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2 opacity-60">Partner Rate</p>
                      <p className="text-[#0F172A] font-bold text-xl tracking-tighter">${((p.nightlyRate || 1000) * 0.7).toLocaleString()}<span className="text-[10px] font-medium text-[#64748B] tracking-normal ml-1">/night</span></p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between border-l-2 border-[#2563EB] pl-6">
                    <div className="flex items-center gap-3">
                       <Calendar className="w-5 h-5 text-[#2563EB]" />
                       <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-widest">Select Reservation Window</span>
                    </div>
                    <span className="text-[10px] text-[#2563EB] font-bold uppercase tracking-widest">Discount Applied</span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {available.map((dateRange: string) => (
                      <button
                        key={dateRange}
                        disabled={isSubmitting}
                        onClick={() => handleSubmit(p, dateRange)}
                        className="group relative px-10 py-5 bg-white border border-[#0F172A]/5 rounded-2xl text-[12px] font-bold text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all overflow-hidden disabled:opacity-50 shadow-sm"
                      >
                        <div className="relative z-10 flex items-center gap-3">
                           {isSubmitting && selectedDate === dateRange && selectedProp?.id === p.id 
                             ? <Loader2 className="w-4 h-4 animate-spin" /> 
                             : dateRange}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
