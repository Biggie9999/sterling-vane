"use client"

import { useState } from "react"
import { MapPin, Bed, Bath, Star, Calendar, CheckCircle2 } from "lucide-react"

const PROPERTIES = [
  {
    id: 1,
    name: "The Pacific Glass House",
    location: "Santa Monica, CA",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    nightly: 1200, beds: 4, baths: 4, rating: 4.97,
    description: "Contemporary coastal elegance. Private pool, ocean views, smart home system.",
    available: ["Apr 10–15", "Apr 22–28", "May 5–12"],
    note: "Investor priority — 30% discount on published rate",
  },
  {
    id: 2,
    name: "The Palm Royale Retreat",
    location: "Miami Beach, FL",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    nightly: 950, beds: 5, baths: 5, rating: 4.99,
    description: "Resort-style tropical sanctuary. Private cabana, waterfront terrace, concierge access.",
    available: ["Apr 8–14", "Apr 25–May 2", "May 15–20"],
    note: "Highest rated unit — book 7+ days for premium discount",
  },
  {
    id: 3,
    name: "The Manhattan Velvet Suite",
    location: "Midtown, New York",
    image: "https://images.unsplash.com/photo-1496664444929-8c75efb9546f?w=600&q=80",
    nightly: 1500, beds: 3, baths: 3, rating: 4.95,
    description: "Penthouse-level urban retreat. Floor-to-ceiling views, premium finishes, valet parking.",
    available: ["Apr 12–18", "Apr 29–May 5", "May 20–26"],
    note: "Executive stays. Business-class amenities included.",
  },
]

export default function BookingsPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [selectedProp, setSelectedProp] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState("")

  const handleSubmit = (propId: number, date: string) => {
    setSelectedProp(propId)
    setSelectedDate(date)
    setSubmitted(true)
  }

  if (submitted) {
    const prop = PROPERTIES.find(p => p.id === selectedProp)!
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-10 text-center max-w-md">
          <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-6" />
          <h2 className="font-serif text-2xl text-white mb-2">Stay Requested</h2>
          <p className="text-warmGrey text-sm leading-relaxed mb-4">
            Your priority booking request for <strong className="text-white">{prop.name}</strong> ({selectedDate}) has been submitted. Our concierge team will confirm within 24 hours.
          </p>
          <p className="text-[#006AFF] text-xs font-mono uppercase tracking-widest">As an investor, you receive 30% off published nightly rates.</p>
          <button onClick={() => setSubmitted(false)} className="mt-8 px-6 py-3 border border-[#333] text-warmGrey text-sm rounded-lg hover:text-white transition-colors">
            Book Another Stay
          </button>
        </div>
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
        {PROPERTIES.map((p) => (
          <div
            key={p.id}
            className={`bg-[#111] border rounded-2xl overflow-hidden transition-all ${selected === p.id ? "border-[#006AFF]/50" : "border-[#222] hover:border-[#333]"}`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-64 h-48 md:h-auto relative overflow-hidden shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
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
                    <span className="text-white font-semibold text-sm">{p.rating}</span>
                  </div>
                </div>

                <p className="text-warmGrey text-xs leading-relaxed mb-4">{p.description}</p>

                <div className="flex items-center gap-4 text-xs text-warmGrey mb-4">
                  <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {p.beds} bed</span>
                  <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {p.baths} bath</span>
                  <span className="text-[#006AFF] font-bold">${(p.nightly * 0.7).toLocaleString()}<span className="text-warmGrey font-normal">/night (investor rate)</span></span>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-3 text-xs text-warmGrey mb-4">
                  <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[#006AFF]" />
                  <strong className="text-white">Available windows:</strong> {p.available.join(" · ")}
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.available.map((date) => (
                    <button
                      key={date}
                      onClick={() => { setSelected(p.id); handleSubmit(p.id, date) }}
                      className="text-xs border border-[#006AFF]/30 text-[#006AFF] px-4 py-2 rounded-lg hover:bg-[#006AFF]/10 transition-colors font-mono"
                    >
                      {date}
                    </button>
                  ))}
                </div>

                <p className="text-[10px] text-warmGrey/50 mt-3 italic">{p.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
