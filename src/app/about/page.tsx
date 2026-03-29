"use client"

import { ShieldCheck, ArrowRight, Globe, Award, Clock } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 text-[#0F172A] selection:bg-[#2563EB]/20 animate-sovereign-in overflow-x-hidden">
      
      {/* ── HERO SECTION: High-End Magazine ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Estate Atmosphere"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-transparent to-[#F8FAFC]" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#2563EB] mb-8">Asset Philosphy</p>
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-[#0F172A] mb-12 tracking-tighter leading-[0.8] animate-sovereign-scale">
              The Sovereign <br /><span className="italic text-[#2563EB]">Ethos.</span>
            </h1>
            <div className="max-w-3xl mx-auto border-t border-slate-200 pt-12">
               <p className="text-xl sm:text-3xl text-slate-500 font-serif italic leading-relaxed">
                "We do not wait for appreciation. <br className="hidden md:block" />  We manufacture equity through operational alpha."
              </p>
            </div>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100/30 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-100/30 blur-[120px] rounded-full -z-10" />
      </section>

      {/* ── INTRO: Split Typography ── */}
      <section className="py-24 sm:py-40">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 group">
               <img 
                 src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                 alt="Luxury Interior" 
                 className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
               />
               <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 via-black/10 to-transparent">
                  <p className="text-white text-3xl font-serif italic mb-2">"Alpha is built, not found."</p>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em]">Proprietary Execution Layer</p>
               </div>
            </div>
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                 <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                 <h2 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-[0.5em]">Operational Edge</h2>
              </div>
              <h3 className="text-5xl sm:text-7xl font-serif font-bold text-[#0F172A] leading-[0.9] tracking-tighter">
                Redefining the timeline of <span className="text-[#2563EB] italic">wealth.</span>
              </h3>
              <div className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed space-y-8">
                <p>Sterling Vane was founded on a singular premise: the traditional real estate hold cycle is fundamentally inefficient.</p>
                <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                   <p className="text-[#0F172A] font-bold tracking-tight">By targeting distressed luxury assets in primary ZIP codes, we eliminate speculative risk. Our vertically integrated design team steps in immediately upon acquisition.</p>
                </div>
                <p>What takes a standard developer three years, we compress into ninety days. Our collection is the financial realization of this operational advantage—delivering institutional yield directly to private partners.</p>
              </div>
              
              <div className="pt-12 flex items-center gap-12 border-t border-slate-100">
                 <div>
                    <p className="text-4xl font-serif font-bold text-[#0F172A] mb-1">90 Days</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]">Stabilization</p>
                 </div>
                 <div className="w-[1px] h-12 bg-slate-200" />
                 <div>
                    <p className="text-4xl font-serif font-bold text-[#0F172A] mb-1">30%+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]">Yield Target</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACK RECORD: Integrated Timeline ── */}
      <section className="bg-white py-24 sm:py-40 border-y border-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 lg:mb-32 gap-10">
            <div className="max-w-2xl">
              <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.5em] mb-4">The Manifest</p>
              <h2 className="text-5xl sm:text-8xl font-serif font-bold text-[#0F172A] tracking-tighter leading-[0.85]">
                Execution <br />Integrity.
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-lg lg:text-xl max-w-sm mb-4 leading-relaxed">
              Tracking our progression from single-asset acquisition to a multi-hub hospitality ecosystem.
            </p>
          </div>
          
          <div className="relative">
            {/* The Line */}
            <div className="absolute left-[30px] lg:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 lg:-translate-x-1/2" />
            
            <div className="space-y-24 lg:space-y-32">
              {[
                { year: "2019", title: "Initial Acquisition", icon: Award, desc: "First distressed asset acquired in the Hollywood Hills. Stabilized in 45 days, achieving a 42% cash-on-cash return in year one." },
                { year: "2021", title: "Vertical Integration", icon: Globe, desc: "Brought all design, construction, and property management in-house, compressing rehab timelines by 60% compared to industry averages." },
                { year: "2023", title: "Collection Launch", icon: ShieldCheck, desc: "Launched the formal fund structure to accommodate $50M in committed capital from primary hubs and private offices." },
                { year: "Present", title: "Global Scaling", icon: Clock, desc: "Currently managing an active $120M pipeline across four tier-one coastal markets in North America." }
              ].map((item, i) => (
                <div key={i} className={`relative flex flex-col lg:flex-row items-start ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                  {/* Point */}
                  <div className="absolute left-[30px] lg:left-1/2 top-2 w-4 h-4 rounded-full bg-white border-2 border-[#2563EB] lg:-translate-x-1/2 z-10 shadow-xl" />
                  
                  {/* Year Label */}
                  <div className="lg:w-1/2 pl-16 lg:px-20 text-left lg:text-right mb-6 lg:mb-0">
                    <p className={`text-6xl sm:text-8xl font-serif font-bold ${i % 2 === 0 ? "lg:text-left" : "lg:text-right"} text-slate-100 group-hover:text-slate-200 transition-colors`}>{item.year}</p>
                  </div>
                  
                  {/* Content Card */}
                  <div className="lg:w-1/2 pl-16 lg:px-20">
                    <div className="bg-white border border-slate-100 p-8 sm:p-12 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-50 flex items-center justify-center mb-10 group-hover:bg-[#0F172A] transition-colors duration-500">
                        <item.icon className="w-5 h-5 text-[#2563EB] group-hover:text-white" />
                      </div>
                      <h4 className="text-3xl font-serif font-bold text-[#0F172A] mb-4 tracking-tight leading-none">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed italic font-serif text-lg">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-50/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-20 -left-60 w-[800px] h-[800px] bg-blue-50/20 blur-[150px] rounded-full" />
      </section>

      {/* FINAL CTA: About -> Collection */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6 max-w-5xl text-center">
           <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#0F172A] mb-10 tracking-tighter">
             Claim your position in the <br />
             <span className="italic text-[#2563EB]">Sovereign legacy.</span>
           </h2>
           <Link href="/marketplace" className="inline-flex items-center gap-4 px-12 py-6 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#2563EB] transition-all shadow-2xl group">
             Browse The Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>
    </div>
  )
}
