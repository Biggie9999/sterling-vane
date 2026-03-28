"use client"

import { useState, useEffect } from "react"
import { MapPin, Bed, Bath, Star, Calendar, CheckCircle2, Loader2, Info, ArrowRight } from "lucide-react"

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
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400">Loading Sovereign Inventory...</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center animate-sovereign-in">
        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 luxury-shadow">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tighter">Reservation Requested</h2>
        <p className="text-slate-500 mb-10 leading-relaxed font-medium">
          Your priority stay at <span className="text-slate-900 font-bold">{selectedProp?.name}</span> for <span className="text-accent font-bold">{selectedDate}</span> has been logged.
        </p>
        <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl mb-10 text-left">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold flex items-center gap-2">
            <Info className="w-3 h-3" /> Concierge Note
          </p>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            As a Sovereign investor, your request has been bumped to the top of the queue. We'll verify availability for these specific dates and confirm by email within 24 hours. No payment is required at this stage.
          </p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all luxury-shadow flex items-center gap-3 mx-auto"
        >
          View More Properties <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-sovereign-in">
      <div className="relative overflow-hidden p-10 bg-slate-950 text-white rounded-[2.5rem] luxury-shadow">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-4 font-bold">In-Portfolio Privileges</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tighter leading-tight">Priority Sovereign Stays</h1>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              As an owner in the Sovereign Collection, you receive secondary priority booking access and a <span className="text-accent">30% discount</span> on the published seasonal rate.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl glass-dark">
             <div className="text-right">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Member Tier</p>
                <p className="text-xl font-serif font-bold text-accent">Principal Holder</p>
             </div>
             <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center border border-accent/30 shadow-inner">
                <Star className="w-6 h-6 text-accent fill-current" />
             </div>
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-accent/10 blur-[80px] rounded-full translate-x-1/2 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 gap-10">
        {properties.map((p: any, idx) => {
          const available = ["Apr 10–15", "Apr 22–28", "May 5–12"]
          return (
            <div
              key={p.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 flex flex-col lg:flex-row transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Cinematic Image Frame */}
              <div className="lg:w-[400px] xl:w-[480px] h-72 lg:h-auto relative overflow-hidden">
                <img 
                  src={p.images[0]} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                   <div className="px-3 py-1.5 glass-dark text-accent text-[10px] font-mono uppercase tracking-widest font-bold rounded-xl border border-white/10">
                     Phase {p.phase || 1}
                   </div>
                   <div className="px-3 py-1.5 glass-dark text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-xl border border-white/10">
                     Active Operations
                   </div>
                </div>
              </div>

              {/* Sophisticated Details Section */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-serif text-3xl font-bold text-slate-900 tracking-tighter mb-2">{p.name}</h3>
                      <p className="text-slate-500 font-medium flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-accent" /> {p.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-4 py-2.5 rounded-2xl border border-slate-100">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-slate-900 font-bold text-sm tracking-tighter">4.98</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xl font-medium line-clamp-2">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-10 pb-8 border-b border-slate-100">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Inventory</p>
                      <p className="text-slate-900 font-bold flex items-center gap-2"><Bed className="w-4 h-4 text-accent/60" /> {p.bedrooms} Beds</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Sanitation</p>
                      <p className="text-slate-900 font-bold flex items-center gap-2"><Bath className="w-4 h-4 text-accent/60" /> {p.bathrooms} Baths</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Investor Nightly</p>
                      <p className="text-accent font-bold text-lg">${((p.nightlyRate || 1000) * 0.7).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-accent" />
                       <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Priority Windows Available</span>
                    </div>
                    <span className="text-[10px] text-slate-400 italic">30% Discount Automatically Applied</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {available.map((dateRange: string) => (
                      <button
                        key={dateRange}
                        disabled={isSubmitting}
                        onClick={() => handleSubmit(p, dateRange)}
                        className="group relative px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl text-[13px] font-bold text-slate-900 hover:border-accent hover:text-white transition-all overflow-hidden disabled:opacity-50"
                      >
                        <div className="relative z-10 flex items-center gap-2">
                           {isSubmitting && selectedDate === dateRange && selectedProp?.id === p.id 
                             ? <Loader2 className="w-4 h-4 animate-spin" /> 
                             : dateRange}
                        </div>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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
