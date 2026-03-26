import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-border-dark pt-20 pb-10 luxury-grain relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Logo Column */}
          <div className="lg:col-span-2">
             <Link href="/" className="flex flex-col items-start mb-6">
              <span className="font-serif text-3xl tracking-wide text-white">
                Sterling Vane
              </span>
              <span className="font-mono text-xs tracking-[0.2em] text-gold uppercase mt-2">
                Global Holdings
              </span>
            </Link>
            <p className="font-serif text-warmGrey text-lg max-w-sm italic mb-8">
              "The next chapter in luxury hospitality."
            </p>
          </div>

          {/* Nav Columns */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-white mb-6">Invest</h4>
            <ul className="space-y-4">
              <li><Link href="/portfolio" className="text-warmGrey hover:text-gold transition-colors text-sm">Active Funds</Link></li>
              <li><Link href="/calculator" className="text-warmGrey hover:text-gold transition-colors text-sm">Calculator</Link></li>
              <li><Link href="/apply" className="text-warmGrey hover:text-gold transition-colors text-sm">Apply for Allocation</Link></li>
              <li><Link href="/login" className="text-warmGrey hover:text-gold transition-colors text-sm">Investor Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-white mb-6">Properties</h4>
            <ul className="space-y-4">
              <li><Link href="/marketplace?tab=buy" className="text-warmGrey hover:text-gold transition-colors text-sm">Acquire Asset</Link></li>
              <li><Link href="/marketplace?tab=book" className="text-warmGrey hover:text-gold transition-colors text-sm">Reserve a Stay</Link></li>
              <li><Link href="/portfolio/dubai" className="text-warmGrey hover:text-gold transition-colors text-sm">Dubai Collection</Link></li>
              <li><Link href="/portfolio/monaco" className="text-warmGrey hover:text-gold transition-colors text-sm">Monaco Collection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-warmGrey hover:text-gold transition-colors text-sm">Our Philosophy</Link></li>
              <li><Link href="/about#team" className="text-warmGrey hover:text-gold transition-colors text-sm">Leadership</Link></li>
              <li><Link href="/contact" className="text-warmGrey hover:text-gold transition-colors text-sm">Contact</Link></li>
              <li><Link href="/press" className="text-warmGrey hover:text-gold transition-colors text-sm">Press</Link></li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-border-dark pt-8 mb-8">
          <p className="text-[10px] sm:text-xs text-warmGrey/60 leading-relaxed font-sans max-w-4xl text-justify">
            Disclaimer: The Sovereign Collection is a private real estate investment fund. Investments in real estate are speculative and involve substantial risk, including the possible loss of principal. Projections and targeted returns are based on internal assumptions and comparable historical performance; they do not guarantee future results. This platform is intended solely for accredited investors who are thoroughly familiar with and capable of evaluating the risks of such investments. Past performance is not indicative of future performance.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border-dark pt-8">
          <p className="text-xs text-warmGrey font-mono mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} STERLING VANE GLOBAL HOLDINGS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-warmGrey hover:text-gold transition-colors text-sm">LinkedIn</Link>
            <Link href="#" className="text-warmGrey hover:text-gold transition-colors text-sm">Instagram</Link>
            <Link href="#" className="text-warmGrey hover:text-gold transition-colors text-sm">X (Twitter)</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
