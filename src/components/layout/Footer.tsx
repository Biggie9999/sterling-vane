import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Logo Column */}
          <div className="col-span-2 lg:col-span-2">
             <Link href="/" className="flex flex-col items-start mb-6">
              <span className="font-serif text-2xl sm:text-3xl tracking-wide text-[#1a1a1a]">
                Sterling Vane
              </span>
              <span className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#006AFF] uppercase mt-1">
                Sovereign Collection
              </span>
            </Link>
            <p className="font-serif text-[#666] text-lg max-w-sm italic mb-8">
               "Institutional-grade alternative assets."
            </p>
          </div>

          {/* Nav Columns */}
          <div className="col-span-1">
            <h4 className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#1a1a1a] mb-5">Invest</h4>
            <ul className="space-y-3">
              <li><Link href="/marketplace" className="text-[#666] hover:text-[#006AFF] transition-colors text-sm">Active Funds</Link></li>
              <li><Link href="/apply" className="text-[#666] hover:text-[#006AFF] transition-colors text-sm">Apply for Allocation</Link></li>
              <li><Link href="/login" className="text-[#666] hover:text-[#006AFF] transition-colors text-sm">Investor Portal</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#1a1a1a] mb-5">Properties</h4>
            <ul className="space-y-3">
              <li><Link href="/marketplace" className="text-[#666] hover:text-[#006AFF] transition-colors text-sm">Acquire Asset Shares</Link></li>
              <li><Link href="/marketplace?tab=book" className="text-[#666] hover:text-[#006AFF] transition-colors text-sm">Owner Reservations</Link></li>
              <li><Link href="/marketplace?location=Miami" className="text-[#666] hover:text-[#006AFF] transition-colors text-sm">Miami Portfolio</Link></li>
              <li><Link href="/marketplace?location=Aspen" className="text-[#666] hover:text-[#006AFF] transition-colors text-sm">Aspen Portfolio</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 border-t border-slate-200 md:border-0 pt-6 md:pt-0">
            <h4 className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#1a1a1a] mb-5">Company</h4>
            <ul className="flex flex-wrap md:block gap-x-6 gap-y-3 md:space-y-3">
              <li><div className="text-[#666] hover:text-[#006AFF] transition-colors text-sm cursor-pointer">Our Strategy</div></li>
              <li><div className="text-[#666] hover:text-[#006AFF] transition-colors text-sm cursor-pointer">Leadership</div></li>
              <li><div className="text-[#666] hover:text-[#006AFF] transition-colors text-sm cursor-pointer">Investor Relations</div></li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-slate-200 pt-8 mb-8">
          <p className="text-[10px] text-[#888] leading-relaxed font-sans max-w-5xl">
            Disclaimer: The Sovereign Collection is a private real estate investment fund. Investments in real estate are speculative and involve substantial risk, including the possible loss of principal. Projections and targeted returns are based on internal assumptions and comparable historical performance; they do not guarantee future results. This platform is intended solely for accredited investors who are thoroughly familiar with and capable of evaluating the risks of such investments. Past performance is not indicative of future performance.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-100 pt-8">
          <p className="text-xs text-[#888] font-sans font-medium mb-4 md:mb-0 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} STERLING VANE DEVELOPMENT GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex justify-center flex-wrap gap-4 md:gap-6">
            <Link href="#" className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#1a1a1a] hover:text-[#006AFF] transition-colors">LinkedIn</Link>
            <Link href="#" className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#1a1a1a] hover:text-[#006AFF] transition-colors">Instagram</Link>
            <Link href="#" className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#1a1a1a] hover:text-[#006AFF] transition-colors">Twitter</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
