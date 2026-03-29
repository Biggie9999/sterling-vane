import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5 pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex flex-col items-start mb-4">
              <span className="font-serif text-xl tracking-tight text-white font-bold">Sterling Vane</span>
              <span className="font-sans font-bold text-[9px] tracking-[0.4em] text-[#2563EB] uppercase mt-0.5">The Sovereign Collection</span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
              Private equity hospitality. Exclusive by design.
            </p>
          </div>

          {/* Capital */}
          <div>
            <h4 className="font-sans font-bold text-[9px] tracking-[0.3em] uppercase text-white mb-5">Capital</h4>
            <ul className="space-y-3">
              <li><Link href="/apply" className="text-slate-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-semibold">The Collection</Link></li>
              <li><Link href="/apply" className="text-slate-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-semibold">Priority Waitlist</Link></li>
              <li><Link href="/login" className="text-slate-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-semibold">Log In</Link></li>
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h4 className="font-sans font-bold text-[9px] tracking-[0.3em] uppercase text-white mb-5">Portfolio</h4>
            <ul className="space-y-3">
              <li><Link href="/marketplace" className="text-slate-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-semibold">US Flagships</Link></li>
              <li><Link href="/marketplace" className="text-slate-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-semibold">Global Units</Link></li>
              <li><Link href="/marketplace" className="text-slate-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-semibold">Data Rooms</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans font-bold text-[9px] tracking-[0.3em] uppercase text-white mb-5">Corporate</h4>
            <ul className="space-y-3">
              <li><span className="text-slate-500 text-[10px] uppercase tracking-widest font-semibold cursor-pointer hover:text-white transition-colors">Manifesto</span></li>
              <li><span className="text-slate-500 text-[10px] uppercase tracking-widest font-semibold cursor-pointer hover:text-white transition-colors">Leadership</span></li>
              <li><span className="text-slate-500 text-[10px] uppercase tracking-widest font-semibold cursor-pointer hover:text-white transition-colors">Enquiry</span></li>
            </ul>
          </div>
        </div>

        {/* Disclosure */}
        <div className="border-t border-white/5 pt-6 mb-6">
          <p className="text-[9px] text-slate-600 leading-relaxed font-sans max-w-4xl uppercase tracking-widest">
            Institutional Disclosure: The Sovereign Collection is a restricted private fund. All allocations are subject to SEC Regulation D. Investments carry significant risk. The 30/60/90 milestones are performance targets, not guarantees. Restricted to accredited investors.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Sterling Vane Development Group
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="font-bold text-[9px] uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="font-bold text-[9px] uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="font-bold text-[9px] uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">Bloomberg</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
