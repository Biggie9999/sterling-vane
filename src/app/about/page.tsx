export default function AboutPage() {
  return (
    <div className="bg-brand-light min-h-screen pt-32 pb-24 text-slate-800">
      
      {/* Header */}
      <div className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          The Philosophy Behind The Alpha.
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We don't buy for appreciation. We manufacture equity through operational excellence.
        </p>
      </div>

      {/* Intro Grid */}
      <div className="container mx-auto px-6 max-w-6xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-slate-200 flex items-center justify-center text-slate-400">
             [ Portrait of the Principal ]
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Redefining the timeline of wealth creation.</h2>
            <div className="text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                Sterling Vane was founded on a singular premise: the traditional 10-year hold cycle in real estate is fundamentally inefficient.
              </p>
              <p>
                By targeting distressed luxury assets in irreplicable geographic locations, we eliminate speculative risk. Our vertically integrated construction, design, and hospitality teams step in immediately upon acquisition. What takes a standard developer three years, we compress into 90 days.
              </p>
              <p>
                The Sovereign Collection is the financial realization of this operational advantage—a closed-door fund delivering institutional-grade arbitrage directly to private partners.
              </p>
            </div>
            
            <div className="pl-6 border-l-4 border-brand-accent pt-2 pb-2">
              <p className="font-bold text-slate-900 italic text-xl">"Alpha isn't found. It's built."</p>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-2">— Founder & Principal</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Timeline */}
      <div className="bg-white py-24 border-y border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Track Record</h2>
          
          <div className="space-y-12">
            {[
              { year: "2019", title: "The Initial Acquisition", desc: "First distressed asset acquired in the Hollywood Hills. Stabilized in 45 days, achieving a 42% cash-on-cash return in year one." },
              { year: "2021", title: "Vertical Integration", desc: "Brought all design, construction, and property management in-house, compressing rehab timelines by 60% compared to industry averages." },
              { year: "2023", title: "The Sovereign Collection", desc: "Launched the formal fund structure to accommodate $50M in committed capital from private offices and high-net-worth individuals." },
              { year: "Present", title: "Global Expansion", desc: "Currently managing an active $120M pipeline across 4 tier-one coastal markets in North America." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
                <div className="md:w-1/4 pt-2 relative">
                  <div className="absolute top-4 -right-1.5 w-3 h-3 bg-brand-accent rounded-full hidden md:block z-10"></div>
                  <h3 className="text-2xl font-bold text-brand-blue md:text-right">{item.year}</h3>
                </div>
                <div className="hidden md:block w-px bg-slate-200 relative left-[1px]"></div>
                <div className="md:w-3/4 pb-12 md:pb-0">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
