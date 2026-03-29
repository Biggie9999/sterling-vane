import Link from "next/link"
import { ShieldCheck, Globe, TrendingUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#0F172A]/5 pt-16 sm:pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 sm:gap-16 lg:gap-12 mb-16 sm:mb-20">
          
          {/* Logo Column */}
          <div className="col-span-2 lg:col-span-2">
             <Link href="/" className="flex flex-col items-start mb-10">
              <span className="font-serif text-3xl tracking-tight text-[#0F172A] font-bold">
                Sterling Vane
              </span>
              <span className="font-montserrat font-bold text-[10px] tracking-[0.4em] text-[#2563EB] uppercase mt-1">
                The Sovereign Collection
              </span>
            </Link>
            <p className="font-serif text-[#64748B] text-xl max-w-sm italic mb-10 leading-relaxed">
               "The new standard in private equity hospitality. Curated through precision and exclusive by design."
            </p>
            <div className="flex items-center gap-6">
               <ShieldCheck className="w-5 h-5 text-[#2563EB] opacity-40" />
               <Globe className="w-5 h-5 text-[#2563EB] opacity-40" />
               <TrendingUp className="w-5 h-5 text-[#2563EB] opacity-40" />
            </div>
          </div>

          {/* Nav Columns */}
          <div className="col-span-1">
            <h4 className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase text-[#0F172A] mb-8">Capital</h4>
            <ul className="space-y-4">
              <li><Link href="/apply" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">The Collection</Link></li>
              <li><Link href="/apply" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">Priority Waitlist</Link></li>
              <li><Link href="/login" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">Log In</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase text-[#0F172A] mb-8">Portfolio</h4>
            <ul className="space-y-4">
              <li><Link href="/marketplace" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">US Flagships</Link></li>
              <li><Link href="/marketplace" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">Global Units</Link></li>
              <li><Link href="/marketplace" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">Data Rooms</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
             <h4 className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase text-[#0F172A] mb-8">Suites</h4>
             <ul className="space-y-4">
               <li><Link href="/marketplace?tab=book" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">Reservations</Link></li>
               <li><Link href="/marketplace?tab=book" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">Priority Access</Link></li>
               <li><Link href="/marketplace?tab=book" className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold">Concierge</Link></li>
             </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-montserrat font-bold text-[10px] tracking-[0.3em] uppercase text-[#0F172A] mb-8">Corporate</h4>
            <ul className="space-y-4">
              <li><div className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold cursor-pointer">Manifesto</div></li>
              <li><div className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold cursor-pointer">Leadership</div></li>
              <li><div className="text-[#64748B] hover:text-[#2563EB] transition-colors text-[10px] uppercase tracking-widest font-bold cursor-pointer">Enquiry</div></li>
            </ul>
          </div>
        </div>

        {/* Institutional Disclosure */}
        <div className="border-t border-[#0F172A]/5 pt-12 mb-12">
          <p className="text-[9px] text-[#64748B] leading-relaxed font-sans max-w-5xl uppercase tracking-widest opacity-60">
            Institutional Disclosure: The Sovereign Collection is a restricted private real estate investment fund. All allocations are subject to SEC Regulation D protocol. Investments in alternative assets are illiquid and carry significant risk. Projections, including the 30/60/90 return milestones, are performance targets based on algorithmic modelling and historical arbitrage data; they are not guarantees of future yield. Past execution is not a guarantee of future outcomes. Access is restricted to qualified capital partners.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-[#0F172A]/5 pt-10">
          <p className="text-[9px] text-[#64748B] font-sans font-bold mb-6 md:mb-0 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} STERLING VANE DEVELOPMENT GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex justify-center flex-wrap gap-8 md:gap-12">
            <Link href="#" className="font-montserrat font-bold text-[9px] uppercase tracking-[0.4em] text-[#0F172A] hover:text-[#2563EB] transition-colors">Bloomberg</Link>
            <Link href="#" className="font-montserrat font-bold text-[9px] uppercase tracking-[0.4em] text-[#0F172A] hover:text-[#2563EB] transition-colors">LinkedIn</Link>
            <Link href="#" className="font-montserrat font-bold text-[9px] uppercase tracking-[0.4em] text-[#0F172A] hover:text-[#2563EB] transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
