"use client"

import { MapPin, TrendingUp, Home, Percent } from "lucide-react"

const UNITS = [
  {
    name: "The Pacific Glass House",
    theme: "Contemporary Coastal",
    location: "Santa Monica, CA",
    market: "California",
    status: "Operating",
    occupancy: 87,
    sharePercent: 12.5,
    nightlyRate: 1200,
    currentYield: 28.4,
    targetYield: 35,
    invested: 6250,
    currentValue: 8026,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    description: "Contemporary coastal elegance with expansive light-filled interiors and smart home technology.",
    beds: 4, baths: 4,
  },
  {
    name: "The Palm Royale Retreat",
    theme: "Tropical Resort",
    location: "Miami Beach, FL",
    market: "Florida",
    status: "Operating",
    occupancy: 92,
    sharePercent: 15,
    nightlyRate: 950,
    currentYield: 33.1,
    targetYield: 40,
    invested: 7500,
    currentValue: 9975,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    description: "Resort-inspired design blending comfort with tropical sophistication. Highest occupancy in the portfolio.",
    beds: 5, baths: 5,
  },
  {
    name: "The Manhattan Velvet Suite",
    theme: "Urban Premium",
    location: "Midtown, New York",
    market: "New York",
    status: "Stabilizing",
    occupancy: 74,
    sharePercent: 10,
    nightlyRate: 1500,
    currentYield: 19.8,
    targetYield: 38,
    invested: 5000,
    currentValue: 5990,
    image: "https://images.unsplash.com/photo-1496664444929-8c75efb9546f?w=600&q=80",
    description: "Refined urban living for the executive and international traveler. Stabilizing through Q2 2026.",
    beds: 3, baths: 3,
  },
]

export default function PortfolioPage() {
  const totalInvested = UNITS.reduce((s, u) => s + u.invested, 0)
  const totalValue = UNITS.reduce((s, u) => s + u.currentValue, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#006AFF] mb-2">Active Positions</p>
        <h1 className="font-serif text-3xl text-white mb-1">Your Portfolio</h1>
        <p className="text-warmGrey text-sm">3 units across the Sovereign Collection — Phase 1</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Invested", value: `$${totalInvested.toLocaleString()}` },
          { label: "Current Value", value: `$${totalValue.toLocaleString()}` },
          { label: "Unrealised Gain", value: `+$${(totalValue - totalInvested).toLocaleString()}` },
          { label: "Portfolio IRR", value: "24.8%" },
        ].map((s) => (
          <div key={s.label} className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-warmGrey mb-3">{s.label}</p>
            <p className="font-serif text-2xl text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Unit Cards */}
      <div className="space-y-6">
        {UNITS.map((unit) => (
          <div key={unit.name} className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden hover:border-[#006AFF]/20 transition-colors">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-72 lg:w-80 h-48 md:h-auto relative overflow-hidden shrink-0">
                <img src={unit.image} alt={unit.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/60" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                  unit.status === "Operating" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                  {unit.status}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#006AFF] mb-1">{unit.theme} · {unit.market}</p>
                    <h3 className="font-serif text-xl text-white">{unit.name}</h3>
                    <p className="text-warmGrey text-xs flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {unit.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-warmGrey text-xs mb-0.5">Current Value</p>
                    <p className="text-white font-bold text-xl">${unit.currentValue.toLocaleString()}</p>
                    <p className="text-emerald-400 text-xs">↑ ${(unit.currentValue - unit.invested).toLocaleString()} gain</p>
                  </div>
                </div>

                <p className="text-warmGrey text-xs leading-relaxed mb-5">{unit.description}</p>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                  {[
                    { label: "Occupancy", value: `${unit.occupancy}%` },
                    { label: "Nightly Rate", value: `$${unit.nightlyRate}` },
                    { label: "Your Share", value: `${unit.sharePercent}%` },
                    { label: "Invested", value: `$${unit.invested.toLocaleString()}` },
                  ].map((m) => (
                    <div key={m.label}>
                      <p className="text-warmGrey text-[10px] uppercase tracking-widest mb-0.5">{m.label}</p>
                      <p className="text-white font-semibold text-sm">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Yield Bar */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-warmGrey mb-1.5">
                    <span>Current Yield: <span className="text-[#006AFF]">{unit.currentYield}%</span></span>
                    <span>Target: {unit.targetYield}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#006AFF] to-[#E8C96A] rounded-full"
                      style={{ width: `${(unit.currentYield / unit.targetYield) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
