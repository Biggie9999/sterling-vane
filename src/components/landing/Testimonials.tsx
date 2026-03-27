"use client"

import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      imageFile: "/testimonials/1.jpg",
      quote: "Trusting you with my $90,000 retirement fund is the ultimate decision I've ever made. You changed my life in a short time.",
      author: "Retirement Investor",
      role: "Phase 1 Participant"
    },
    {
      id: 2,
      imageFile: "/testimonials/2.jpg",
      quote: "Cleared $87K in debt in 4 weeks. Thank you Sterling Vane.",
      author: "Debt-Free Couple",
      role: "Phase 1 Participants"
    },
    {
      id: 3,
      imageFile: "/testimonials/3.jpg",
      quote: "I get to live the jetset lifestyle while my money works for me. Thanks for this opportunity, Vane. You're a blessing.",
      author: "Jetset Investor",
      role: "Sovereign Collection Partner"
    },
    {
      id: 4,
      imageFile: "/testimonials/4.jpg",
      quote: "$440,000 in ROI in 6 months. This is every investor's dream. Thank you for this opportunity Mr. Vane.",
      author: "High Conviction Investor",
      role: "Principal Investor"
    }
  ]

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
          <p className="text-[#006AFF] font-bold text-[10px] uppercase tracking-widest mb-3">Investor Relations</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">Proven Execution</h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Institutional and accredited capital from around the world, drawn by disciplined underwriting.
          </p>
        </div>

        {/* MOBILE: Vertical scroll stack — full width cards with horizontal image */}
        <div className="flex flex-col gap-5 sm:hidden">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-row">
              {/* Side image */}
              <div className="w-24 shrink-0 relative overflow-hidden">
                <img
                  src={t.imageFile}
                  alt="Investor Testimonial"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
              </div>
              {/* Content */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#006AFF] text-[#006AFF] mr-0.5" />
                    ))}
                  </div>
                  <p className="text-slate-800 text-sm font-medium leading-relaxed italic mb-4">"{t.quote}"</p>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <p className="font-bold text-slate-900 text-xs">{t.author}</p>
                  <p className="text-[#006AFF] text-[9px] font-bold uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: 4-column grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 bg-white flex flex-col">
              <div className="relative w-full h-64 overflow-hidden bg-slate-100">
                <img src={t.imageFile} alt="Investor Testimonial" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#006AFF] text-[#006AFF] mr-1" />
                    ))}
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed text-sm mb-8 italic">"{t.quote}"</p>
                </div>
                <div className="pt-5 border-t border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                  <p className="text-[#006AFF] text-[10px] font-bold uppercase tracking-widest mt-1.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
