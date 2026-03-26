import Link from "next/link"
import { ArrowRight, ShieldCheck, TrendingUp, Building2, ChevronRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="bg-brand-light min-h-screen text-slate-800">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-118.4,34.0,10/800x400?access_token=none')] bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-3 py-1 text-sm font-medium text-brand-blue shadow-sm border border-slate-200 mb-8 mt-8">
            <span className="flex h-2 w-2 rounded-full bg-brand-accent"></span>
            <span>Q3 Fund Open to Accredited Investors</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            Institutional Real Estate. <br/> <span className="text-brand-accent">Engineered for Alpha.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The Sovereign Collection offers fractional and full-asset acquisition of global, income-producing luxury properties. Target 30% annualized yields in 90 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply" className="w-full sm:w-auto px-8 py-3.5 bg-brand-blue text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm text-center">
              Request Allocation
            </Link>
            <Link href="/portfolio" className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 rounded-lg font-medium border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm text-center flex items-center justify-center group">
              View Active Funds <ChevronRight className="w-4 h-4 ml-1 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100 text-center">
             <div>
               <p className="text-4xl font-bold text-slate-900 mb-1">$100M+</p>
               <p className="text-sm font-medium text-slate-500">Assets Managed</p>
             </div>
             <div>
               <p className="text-4xl font-bold text-slate-900 mb-1">32.4%</p>
               <p className="text-sm font-medium text-slate-500">Historical Net IRR</p>
             </div>
             <div>
               <p className="text-4xl font-bold text-slate-900 mb-1">0%</p>
               <p className="text-sm font-medium text-slate-500">Default Rate</p>
             </div>
             <div>
               <p className="text-4xl font-bold text-slate-900 mb-1">~90 days</p>
               <p className="text-sm font-medium text-slate-500">Avg. Holding Period</p>
             </div>
          </div>
        </div>
      </section>

      {/* Why Sovereign (Features) */}
      <section className="py-24 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Precision over speculation.</h2>
            <p className="text-slate-600 text-lg">We systematically de-risk high-end real estate by acquiring distressed assets, executing rapid upgrades, and leveraging vertical integration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-smooth border border-slate-100">
              <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-6 text-brand-blue">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Downside Protection</h3>
              <p className="text-slate-600 leading-relaxed">
                Assets are underwritten at institutional standards. Principal retention is prioritized through strict loan-to-value caps and rigorous structural diligence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-smooth border border-slate-100">
              <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-6 text-brand-accent">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accelerated Yield</h3>
              <p className="text-slate-600 leading-relaxed">
                We target aggressive timelines. By bypassing traditional holding friction, capital cycles every 3-12 months, radically outperforming the S&P 500.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-smooth border border-slate-100">
              <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-6 text-brand-blue">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Premium Operation</h3>
              <p className="text-slate-600 leading-relaxed">
                The Sovereign Collection is a vertically integrated hospitality operator. We own the real estate and control the guest experience end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fund CTA */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center space-x-2 bg-slate-100 rounded-md px-2 py-1 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-6">
              Featured Asset
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">The Pacific Coast Fund.</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              A meticulously curated portfolio of 4 coastal properties under active stabilization. The fund limits entry to 50 active partners to maximize individual distribution share.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <span className="text-slate-600 font-medium">Target Raise</span>
                <span className="text-slate-900 font-bold">$12.5M</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <span className="text-slate-600 font-medium">Projected Hold</span>
                <span className="text-slate-900 font-bold">9-12 Months</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <span className="text-slate-600 font-medium">Minimum Entry</span>
                <span className="text-slate-900 font-bold">$50,000</span>
              </div>
            </div>

            <Link href="/portfolio/pacific-glass-house" className="inline-flex items-center text-brand-blue font-semibold hover:text-brand-accent transition-colors">
              Explore Asset Details <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="lg:w-1/2 w-full relative">
             <div className="absolute -inset-4 bg-brand-light rounded-3xl -z-10 rotate-3"></div>
             <div className="bg-slate-800 rounded-2xl w-full h-[500px] shadow-2xl relative overflow-hidden flex items-center justify-center text-slate-500">
               {/* Visual Placeholder for high quality render */}
               [ High-Resolution Asset Image ]
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-24 bg-brand-blue text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale your capital?</h2>
          <p className="text-slate-300 text-lg mb-10">
            Join a network of high-net-worth individuals building generational wealth through off-market luxury real estate.
          </p>
          <Link href="/apply" className="inline-block px-8 py-4 bg-white text-brand-blue rounded-lg font-bold hover:bg-slate-100 transition-colors shadow-lg">
            Create Investor Profile
          </Link>
        </div>
      </section>
    </div>
  )
}
