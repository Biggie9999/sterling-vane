"use client"

import { ShieldCheck, ArrowRight, Quote } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-40 pb-32 text-[#0F172A] selection:bg-[#2563EB]/20 animate-sovereign-in">
      
      {/* Header */}
      <div className="container mx-auto px-6 max-w-5xl text-center mb-32">
        <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#2563EB] mb-8">The Philosophy</p>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#0F172A] mb-10 tracking-tighter leading-none">
          The Sovereign <br /><span className="italic text-[#2563EB]">Ethos.</span>
        </h1>
        <p className="text-2xl text-[#64748B] font-serif italic leading-relaxed max-w-3xl mx-auto">
          "We do not seek appreciation. <br className="hidden md:block" />  We manufacture equity through operational excellence."
        </p>
      </div>

      {/* Intro Grid */}
      <div className="container mx-auto px-6 max-w-7xl mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div className="relative group">
            <div className="relative h-[700px] rounded-[3rem] overflow-hidden shadow-2xl bg-[#0F172A] flex items-center justify-center border border-[#0F172A]/5">
               <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 z-10" />
               <div className="relative z-20 text-center px-12">
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-4">The Principal</p>
                 <h3 className="text-3xl font-serif text-white italic">"Alpha is built, not found."</h3>
               </div>
               {/* Decorative elements */}
               <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-[#2563EB]/30 rounded-tr-3xl" />
               <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-[#2563EB]/30 rounded-bl-3xl" />
            </div>
          </div>
          <div className="space-y-12">
            <div className="flex items-center gap-4 mb-2">
               <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
               <h2 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-[0.4em]">Operational Alpha</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] leading-tight tracking-tight">
              Redefining the timeline of <span className="text-[#2563EB] italic">wealth generation.</span>
            </h3>
            <div className="text-xl text-[#64748B] font-serif italic leading-relaxed space-y-8">
              <p>
                Sterling Vane was founded on a singular premise: the traditional real estate hold cycle is fundamentally inefficient for the modern era.
              </p>
              <p className="text-[#0F172A] not-italic font-bold tracking-tight">
                By targeting distressed luxury assets in irreplicable locations, we eliminate speculative risk. Our vertically integrated design and hospitality teams step in immediately upon acquisition. 
              </p>
              <p>
                What takes a standard developer three years, we compress into ninety days. The Sovereign Collection is the financial realization of this operational advantage—delivering institutional-grade arbitrage directly to private partners.
              </p>
            </div>
            
            <div className="pt-10 flex items-center gap-10 border-t border-[#0F172A]/5">
               <div>
                  <p className="text-3xl font-serif font-bold text-[#0F172A] mb-1">90 Days</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]">Stabilization Cycle</p>
               </div>
               <div>
                  <p className="text-3xl font-serif font-bold text-[#0F172A] mb-1">30%+</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]">Target Yield</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Track Record */}
      <div className="bg-white py-40 border-y border-[#0F172A]/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#F8FAFC]/30 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center mb-24">
            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#2563EB] mb-6">The Manifest</p>
            <h2 className="text-5xl font-serif font-bold text-[#0F172A] tracking-tight">Track Record</h2>
          </div>
          
          <div className="space-y-16">
            {[
              { year: "2019", title: "The Initial Acquisition", desc: "First distressed asset acquired in the Hollywood Hills. Stabilized in 45 days, achieving a 42% cash-on-cash return in year one." },
              { year: "2021", title: "Vertical Integration", desc: "Brought all design, construction, and property management in-house, compressing rehab timelines by 60% compared to industry averages." },
              { year: "2023", title: "The Sovereign Collection", desc: "Launched the formal fund structure to accommodate $50M in committed capital from private offices and high-net-worth individuals." },
              { year: "Present", title: "Global Expansion", desc: "Currently managing an active $120M pipeline across four tier-one coastal markets in North America." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:row gap-10 md:gap-20 items-start group">
                <div className="md:w-1/4 pt-1">
                  <h3 className="text-4xl font-serif font-bold text-[#2563EB] opacity-40 group-hover:opacity-100 transition-opacity duration-700">{item.year}</h3>
                </div>
                <div className="md:w-3/4 pb-12 border-l-2 border-[#0F172A]/5 pl-10 group-hover:border-[#2563EB]/30 transition-all duration-700">
                  <h4 className="text-2xl font-serif font-bold text-[#0F172A] mb-4 tracking-tight">{item.title}</h4>
                  <p className="text-lg text-[#64748B] font-serif italic leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2563EB]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2563EB]/5 blur-[120px] rounded-full" />
      </div>
    </div>
  )
}
