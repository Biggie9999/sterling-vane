"use client"

import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      imageFile: "/testimonials/1.jpg",
      quote: "Trusting you with my $90,000 retirement fund is the ultimate retirement fund. You changed my life in a short time. I am forever indebted to you for this once in a lifetime opportunity.",
      author: "Retirement Investor",
      role: "Phase 1 Participant"
    },
    {
      id: 2,
      imageFile: "/testimonials/2.jpg",
      quote: "DEBT NAILED $87K IN 4 WEEKS THANK YOU STERLING VANE",
      author: "Debt-Free Couple",
      role: "Phase 1 Participants"
    },
    {
      id: 3,
      imageFile: "/testimonials/3.jpg",
      quote: "I get to live the jetset lifestyle while my money works, thanks for this opportunity Vane, you're a blessing.",
      author: "Jetset Investor",
      role: "Sovereign Collection Partner"
    },
    {
      id: 4,
      imageFile: "/testimonials/4.jpg",
      quote: "I know I am crazy to invest that much but now $440,000 in ROI in 6 months, this is all Investors dream. Thank you for this Opportunity Mr. Vane",
      author: "High Conviction Investor",
      role: "Principal Investor"
    }
  ]

  return (
    <section className="bg-slate-50 py-24 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-[#006AFF] font-bold text-xs uppercase tracking-widest mb-4">Investor Relations</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">Proven Execution</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            The Sovereign Collection attracts institutional and accredited capital globally, drawn by disciplined underwriting and systematic yield generation.
          </p>
        </div>

        {/* Mobile Swipe / Desktop Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-10 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-[85vw] sm:min-w-0 shrink-0 snap-center relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 bg-white flex flex-col">
              <div className="relative w-full h-64 sm:h-72 lg:h-64 overflow-hidden bg-slate-100">
                <img src={t.imageFile} alt="Investor Testimonial" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex text-[#006AFF] mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#006AFF] mr-1" />
                    ))}
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed text-sm lg:text-base mb-8 italic">"{t.quote}"</p>
                </div>
                <div className="pt-6 border-t border-slate-100">
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
