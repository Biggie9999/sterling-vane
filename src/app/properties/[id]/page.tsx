import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  MapPin, Bed, Bath, Maximize, ChevronLeft,
  Shield, TrendingUp, Globe, Lock,
  ArrowUpRight, CheckCircle2, Star
} from "lucide-react"

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: params.id }
      ]
    },
    include: { investments: true }
  })

  if (!property) return notFound()

  const images = typeof property.images === "string" ? JSON.parse(property.images) : property.images
  const amenities = typeof property.amenities === "string" ? JSON.parse(property.amenities) : property.amenities

  const totalShares = 500
  const availableShares = 500 - property.investments.length
  const percentFunded = ((totalShares - availableShares) / totalShares) * 100

  return (
    <div className="bg-[#F8FAFC] min-h-screen selection:bg-[#2563EB]/20">

      {/* ── GALLERY ─────────────────────────────────── */}
      <div className="relative w-full pt-16 sm:pt-20 lg:pt-24">
        {/* Back link — absolute so it floats over gallery */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 z-20">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F172A] hover:bg-white transition-all shadow-lg border border-black/[0.05]"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </Link>
        </div>

        {/* Hero image */}
        <div className="h-[55vw] min-h-[240px] max-h-[580px] w-full relative overflow-hidden">
          <img
            src={images[0]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-[9px] font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            {property.status === "ACTIVE" ? "Funding Open" : "Fully Funded"}
          </div>

          {/* Name overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1 rounded-full border border-white/20">
                {property.type}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
              {property.name}
            </h1>
            <p className="flex items-center text-white/70 text-sm font-medium mt-2">
              <MapPin className="w-4 h-4 mr-2 text-[#2563EB] shrink-0" />
              {property.location}
            </p>
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 sm:gap-4 px-4 sm:px-8 mt-2 sm:mt-4 overflow-x-auto no-scrollbar pb-1">
            {images.slice(1).map((img: string, i: number) => (
              <div
                key={i}
                className="shrink-0 h-16 w-24 sm:h-24 sm:w-36 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#2563EB] transition-all cursor-pointer"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── KEY METRICS STRIP ───────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mt-6 sm:mt-10">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 bg-white border border-black/[0.04] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
          <div className="text-center">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#64748B] mb-1 opacity-60">Yield</p>
            <p className="text-lg sm:text-2xl font-bold text-[#2563EB] tracking-tight">{property.yieldEstimate}%</p>
          </div>
          <div className="text-center border-l border-black/[0.04]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#64748B] mb-1 opacity-60">Cap Rate</p>
            <p className="text-lg sm:text-2xl font-bold text-[#0F172A] tracking-tight">{property.capRate}%</p>
          </div>
          <div className="text-center border-l border-black/[0.04]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#64748B] mb-1 opacity-60">Entry</p>
            <p className="text-lg sm:text-2xl font-bold text-[#0F172A] tracking-tight">${(property.pricePerShare / 1000).toFixed(0)}k</p>
          </div>
          <div className="hidden sm:block text-center border-l border-black/[0.04]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#64748B] mb-1 opacity-60">Beds</p>
            <p className="text-lg sm:text-2xl font-bold text-[#0F172A] tracking-tight">{property.bedrooms}</p>
          </div>
          <div className="hidden sm:block text-center border-l border-black/[0.04]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#64748B] mb-1 opacity-60">Sqft</p>
            <p className="text-lg sm:text-2xl font-bold text-[#0F172A] tracking-tight">{(property.sqft / 1000).toFixed(1)}k</p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mt-8 sm:mt-14 pb-32 md:pb-20 flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24">

        {/* Detail column */}
        <div className="flex-1 min-w-0">

          {/* Spec row */}
          <div className="flex flex-wrap gap-4 sm:gap-8 py-6 border-y border-black/[0.04] mb-8 sm:mb-12">
            <div className="flex items-center text-[#0F172A] text-[11px] font-bold uppercase tracking-[0.25em]">
              <Bed className="w-4 h-4 mr-2 text-[#2563EB]" /> {property.bedrooms} Bed Suites
            </div>
            <div className="flex items-center text-[#0F172A] text-[11px] font-bold uppercase tracking-[0.25em]">
              <Bath className="w-4 h-4 mr-2 text-[#2563EB]" /> {property.bathrooms} Baths
            </div>
            <div className="flex items-center text-[#0F172A] text-[11px] font-bold uppercase tracking-[0.25em]">
              <Maximize className="w-4 h-4 mr-2 text-[#2563EB]" /> {property.sqft.toLocaleString()} sqft
            </div>
          </div>

          {/* Description */}
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2 mb-4 opacity-40">
              <Star className="w-3.5 h-3.5 text-[#2563EB]" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-black">Asset Summary</p>
            </div>
            <p className="font-sans text-[#0F172A] text-base sm:text-lg leading-relaxed max-w-2xl">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-12 sm:mb-16">
            {amenities.map((a: string) => (
              <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-white border border-black/[0.04] rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#64748B] shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-[#2563EB]" /> {a}
              </span>
            ))}
          </div>

          {/* Structural integrity grid */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-black/[0.04] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/5 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#64748B] mb-6 sm:mb-10 opacity-60">Investment Structure</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 relative z-10">
              {[
                { icon: TrendingUp, title: "Yield Architecture", desc: "Performance-modeled hospitality yields with quarterly distribution cycles." },
                { icon: Shield, title: "Capital Security", desc: "Underwritten by physical premium real estate assets across global hubs." },
                { icon: Globe, title: "Secondary Market", desc: "Permissioned liquidity through our institutional trading desk." },
                { icon: Lock, title: "Legal Framework", desc: "Regulated SPV structures ensuring direct beneficial ownership rights." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F8FAFC] flex items-center justify-center shrink-0 border border-black/[0.04]">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-[11px] uppercase tracking-widest mb-1.5">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TRANSACTION PANEL (desktop) ─────────── */}
        <div className="hidden lg:block lg:w-[420px] xl:w-[460px] shrink-0">
          <div className="sticky top-28 bg-[#0F172A] text-white rounded-[2.5rem] p-10 xl:p-12 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Price */}
            <div className="pb-8 border-b border-white/5 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#64748B] mb-4 opacity-60">Entry Allocation Unit</p>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl font-bold text-white tracking-tighter">
                  ${property.pricePerShare.toLocaleString()}
                </span>
                <span className="text-[#64748B] font-bold uppercase tracking-[0.2em] text-[10px]">/ Share</span>
              </div>
            </div>

            {/* Allocation progress */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3 text-[10px] font-bold uppercase tracking-[0.25em]">
                <span className="text-[#64748B] opacity-60">Portfolio Allocation</span>
                <span className="text-[#2563EB]">{Math.round(percentFunded)}% Filled</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-5">
                <div
                  className="bg-[#2563EB] h-full rounded-full transition-all duration-[2500ms]"
                  style={{ width: `${percentFunded}%` }}
                />
              </div>
              <div className="flex justify-between items-center bg-white/[0.03] p-5 rounded-2xl border border-white/5">
                <div className="text-center flex-1">
                  <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-1 opacity-40">Available</p>
                  <p className="text-base font-bold text-white">{availableShares} Units</p>
                </div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div className="text-center flex-1">
                  <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-1 opacity-40">Total Cap</p>
                  <p className="text-base font-bold text-white">{totalShares} Shares</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4 mb-8">
              {[
                { label: "Market Valuation", value: `$${((property.askingPrice || 0) / 1000000).toFixed(1)}M` },
                { label: "Hold Period", value: "3–5 Years" },
                { label: "Liquidity", value: "Quarterly" },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] opacity-60">{stat.label}</span>
                  <span className="text-sm font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/apply?propertyId=${property.slug}`}
              className="w-full flex justify-between items-center bg-[#2563EB] text-white py-5 px-8 rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-[#0F172A] transition-all duration-500 shadow-xl group/btn"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-5 h-5 group-hover/btn:-rotate-45 transition-transform duration-500" />
            </Link>

            <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-white/5 opacity-40">
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              <p className="text-[9px] text-[#64748B] uppercase tracking-[0.4em] font-bold">Verified Partners Only</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY MOBILE CTA BAR ───────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-black/[0.06] px-4 py-3 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] opacity-60 leading-none mb-0.5">{Math.round(percentFunded)}% Filled</p>
            <p className="font-serif text-xl font-bold text-[#0F172A] tracking-tight">${property.pricePerShare.toLocaleString()} <span className="text-xs font-sans font-medium text-[#64748B]">/ share</span></p>
          </div>
          <Link
            href={`/apply?propertyId=${property.slug}`}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#2563EB] transition-all duration-500 shadow-xl shrink-0"
          >
            Invest <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  )
}
