import { useState, useEffect } from "react"
import { MapPin, Bed, Bath, Star, Calendar, CheckCircle2, Loader2 } from "lucide-react"

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
        if (Array.isArray(data)) {
          setProperties(data)
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const handleSubmit = async (prop: any, dateRange: string) => {
    setIsSubmitting(true)
    try {
      // For demo, we'll parse "Apr 10–15" as a simplified date range
      // In a real app, this would be a proper date picker
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: prop.id,
          checkIn: new Date(),
          checkOut: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)), // 7 days from now
          amount: prop.nightlyRate * 0.7 * 7 // 7 nights at 30% discount
        })
      })
      setSelectedProp(prop)
      setSelectedDate(dateRange)
      setSubmitted(true)
    } catch (err) {
      console.error("Booking failed:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted && selectedProp) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-10 text-center max-w-md">
          <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-6" />
          <h2 className="font-serif text-2xl text-white mb-2">Stay Requested</h2>
          <p className="text-warmGrey text-sm leading-relaxed mb-4">
            Your priority booking request for <strong className="text-white">{selectedProp.name}</strong> ({selectedDate}) has been submitted. Our concierge team will confirm within 24 hours.
          </p>
          <p className="text-[#006AFF] text-xs font-mono uppercase tracking-widest">As an investor, you receive 30% off published nightly rates.</p>
          <button onClick={() => setSubmitted(false)} className="mt-8 px-6 py-3 border border-[#333] text-warmGrey text-sm rounded-lg hover:text-white transition-colors">
            Book Another Stay
          </button>
        </div>
      </div>
    )
  }

  const [selected, setSelected] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-[#006AFF] animate-spin mb-4" />
        <p className="text-warmGrey font-medium">Loading property calendars...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#006AFF] mb-2">Investor Privilege</p>
        <h1 className="font-serif text-3xl text-white mb-1">Book a Priority Stay</h1>
        <p className="text-warmGrey text-sm">As a Sovereign Collection investor, you receive priority booking access and 30% off published rates.</p>
      </div>

      <div className="grid gap-6">
        {properties.map((p: any) => {
          // Fallback availability dates for demo
          const available = ["Apr 10–15", "Apr 22–28", "May 5–12"]
          return (
            <div
              key={p.id}
              className={`bg-[#111] border rounded-2xl overflow-hidden transition-all ${selected === p.id ? "border-[#006AFF]/50" : "border-[#222] hover:border-[#333]"}`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-64 h-48 md:h-auto relative overflow-hidden shrink-0">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-[#006AFF] text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full">
                    Investor Access
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                    <div>
                      <h3 className="font-serif text-xl text-white">{p.name}</h3>
                      <p className="text-warmGrey text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {p.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[#006AFF]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-white font-semibold text-sm">4.97</span>
                    </div>
                  </div>

                  <p className="text-warmGrey text-xs leading-relaxed mb-4 line-clamp-2">{p.description}</p>

                  <div className="flex items-center gap-4 text-xs text-warmGrey mb-4">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {p.bedrooms} bed</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {p.bathrooms} bath</span>
                    <span className="text-[#006AFF] font-bold">${((p.nightlyRate || 1000) * 0.7).toLocaleString()}<span className="text-warmGrey font-normal">/night (investor rate)</span></span>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-xl p-3 text-xs text-warmGrey mb-4">
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[#006AFF]" />
                    <strong className="text-white">Available windows:</strong> {available.join(" · ")}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {available.map((dateRange: string) => (
                      <button
                        key={dateRange}
                        disabled={isSubmitting}
                        onClick={() => { setSelected(p.id); handleSubmit(p, dateRange) }}
                        className="text-xs border border-[#006AFF]/30 text-[#006AFF] px-4 py-2 rounded-lg hover:bg-[#006AFF]/10 transition-colors font-mono disabled:opacity-50 flex items-center gap-2"
                      >
                        {isSubmitting && selected === p.id && dateRange === selectedDate && <Loader2 className="w-3 h-3 animate-spin" />}
                        {dateRange}
                      </button>
                    ))}
                  </div>

                  <p className="text-[10px] text-warmGrey/50 mt-3 italic">Investor priority — 30% discount on published rate</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
