import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  MapPin, Bed, Bath, Maximize, ChevronLeft,
  Shield, TrendingUp, Globe, Lock,
  ArrowUpRight, CheckCircle2, Star, Building2, Calendar
} from "lucide-react"
import { PropertyGallery } from "@/components/PropertyGallery"

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

  const images: string[] = (
    typeof property.images === "string" ? JSON.parse(property.images) : property.images
  ) as string[]

  const amenities: string[] = (
    typeof property.amenities === "string" ? JSON.parse(property.amenities) : property.amenities
  ) as string[]

  const totalShares = 500
  const availableShares = 500 - property.investments.length
  const percentFunded = ((totalShares - availableShares) / totalShares) * 100

  return (
    <div className="bg-[#F8FAFC] min-h-screen selection:bg-[#2563EB]/20">

      {/* ── BACK NAV ── */}
      <div className="fixed top-0 left-0 right-0 z-40 pt-safe-top">
        <div className="max-w-[1400px] mx-auto px-4 pt-4 sm:pt-6 flex items-center justify-between">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F172A] hover:bg-white transition-all shadow-lg border border-black/[0.06]"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[9px] font-bold tracking-[0.3em] uppercase border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            {property.status === "ACTIVE" ? "Funding Open" : "Fully Funded"}
          </div>
        </div>
      </div>

      {/* ── IMAGE GALLERY ── */}
      <div className="pt-16 sm:pt-20">
        {/* Property title overlaid on gallery */}
        <div className="relative">
          <PropertyGallery images={images} name={property.name} />
          {/* Title overlay on hero */}
          <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 px-4 sm:px-8 z-10 pointer-events-none">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1 rounded-full border border-white/20">
                  {property.type}
                </span>
              </div>
              <h1 className="font-serif text-xl sm:text-3xl lg:text-5xl text-white font-bold tracking-tight leading-tight drop-shadow-lg max-w-2xl">
                {property.name}
              </h1>
              <p className="flex items-center text-white/80 text-sm font-medium mt-2 drop-shadow">
                <MapPin className="w-4 h-4 mr-1.5 text-[#60A5FA] shrink-0" />
                {property.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── KEY METRICS STRIP ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 mt-4 sm:mt-6">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 bg-white border border-slate-100 rounded-2xl p-3 sm:p-5 shadow-sm">
          {[
            { label: "Yield", value: `${property.yieldEstimate}%`, accent: true },
            { label: "Cap Rate", value: `${property.capRate}%` },
            { label: "Entry", value: `$${(property.pricePerShare / 1000).toFixed(0)}k` },
            { label: "Beds", value: `${property.bedrooms}`, hidden: true },
            { label: "Sqft", value: `${(property.sqft / 1000).toFixed(1)}k`, hidden: true },
          ].map((m, i) => (
            <div key={i} className={`text-center py-1 ${i > 0 ? "border-l border-slate-100" : ""} ${m.hidden ? "hidden sm:block" : ""}`}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">{m.label}</p>
              <p className={`text-lg sm:text-2xl font-bold tracking-tight ${m.accent ? "text-[#2563EB]" : "text-[#0F172A]"}`}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 mt-6 sm:mt-10 pb-36 md:pb-20 flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24">

        {/* Detail Column */}
        <div className="flex-1 min-w-0 space-y-8 sm:space-y-12">

          {/* Quick specs */}
          <div className="flex flex-wrap gap-4 py-5 border-b border-slate-100">
            {[
              { icon: Bed, label: `${property.bedrooms} Bed Suites` },
              { icon: Bath, label: `${property.bathrooms} Baths` },
              { icon: Maximize, label: `${property.sqft.toLocaleString()} sqft` },
              { icon: Building2, label: property.type },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-[#0F172A] text-[11px] font-bold uppercase tracking-[0.2em]">
                <s.icon className="w-4 h-4 text-[#2563EB]" /> {s.label}
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-4 opacity-50">
              <Star className="w-3.5 h-3.5 text-[#2563EB]" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-black">Asset Summary</p>
            </div>
            <p className="text-[#0F172A] text-base sm:text-lg leading-relaxed font-medium">{property.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-400 mb-4">Amenities & Features</p>
            <div className="flex flex-wrap gap-2">
              {amenities.map((a: string) => (
                <span key={a} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#64748B] shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-[#2563EB]" /> {a}
                </span>
              ))}
            </div>
          </div>

          {/* Investment structure */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-400 mb-6">Investment Structure</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: TrendingUp, title: "Yield Architecture", desc: "Performance-modeled hospitality yields with quarterly distributions." },
                { icon: Shield, title: "Capital Security", desc: "Underwritten by physical premium real estate across global hubs." },
                { icon: Globe, title: "Secondary Market", desc: "Permissioned liquidity through our institutional trading desk." },
                { icon: Lock, title: "Legal Framework", desc: "Regulated SPV structures with direct beneficial ownership rights." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <item.icon className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-[11px] uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TRANSACTION PANEL (desktop) ── */}
        <div className="hidden lg:block lg:w-[400px] xl:w-[440px] shrink-0">
          <div className="sticky top-24 bg-[#0F172A] text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute -top-32 -right-32 w-[350px] h-[350px] bg-[#2563EB]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="pb-7 border-b border-white/5 mb-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-500 mb-3">Entry Allocation</p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-white tracking-tighter">
                  ${property.pricePerShare.toLocaleString()}
                </span>
                <span className="text-slate-500 font-bold uppercase text-[9px]">Minimum</span>
              </div>
            </div>

            <div className="mb-7">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-2">
                <span className="text-slate-500">Allocation Progress</span>
                <span className="text-[#2563EB]">{Math.round(percentFunded)}% Filled</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-4">
                <div className="bg-[#2563EB] h-full rounded-full transition-all duration-[2500ms]" style={{ width: `${percentFunded}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 text-center">
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Available</p>
                  <p className="font-bold text-white text-sm">{availableShares} Units</p>
                </div>
                <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 text-center">
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Cap</p>
                  <p className="font-bold text-white text-sm">{totalShares} Shares</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-7">
              {[
                { label: "Market Valuation", value: `$${((property.askingPrice || 0) / 1000000).toFixed(1)}M` },
                { label: "Hold Period", value: "3–5 Years" },
                { label: "Distributions", value: "Quarterly" },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</span>
                  <span className="text-sm font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>

            <Link
              href={`/apply?propertyId=${property.slug}`}
              className="w-full flex justify-between items-center bg-[#2563EB] text-white py-4 px-7 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#0F172A] transition-all duration-500 shadow-xl group/btn"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-5 h-5 group-hover/btn:-rotate-45 transition-transform duration-500" />
            </Link>

            <div className="flex items-center justify-center gap-2 mt-5 pt-5 border-t border-white/5 opacity-40">
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              <p className="text-[9px] text-slate-500 uppercase tracking-[0.4em] font-bold">Verified Partners Only</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY MOBILE CTA BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-100 px-4 py-3 pb-8 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-0.5">{Math.round(percentFunded)}% Filled</p>
            <p className="font-serif text-lg font-bold text-[#0F172A] tracking-tight">
              ${property.pricePerShare.toLocaleString()} <span className="text-xs font-sans font-medium text-slate-400">Min.</span>
            </p>
          </div>
          <Link
            href={`/apply?propertyId=${property.slug}`}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#2563EB] transition-all shadow-xl shrink-0"
          >
            Get Started <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  )
}
