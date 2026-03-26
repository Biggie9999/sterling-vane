import { GoldButton } from "@/components/shared/GoldButton"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-[#050505] relative overflow-hidden luxury-grain border-b-2 border-gold">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-2 border border-danger/30 bg-danger/10 mb-8 rounded-sm">
          <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
          <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">Closing Soon</span>
        </div>

        <h2 className="font-serif text-4xl md:text-6xl text-white max-w-4xl mx-auto leading-tight mb-8">
          One slot left at the $10,000 minimum. <br />
          <span className="text-warmGrey italic">Then we raise the entry.</span>
        </h2>
        
        <p className="font-sans text-warmGrey text-lg mb-12 max-w-xl mx-auto">
          The current fund performance is exceeding targets. Once the remaining capital is committed, the minimum entry tier will be eliminated.
        </p>

        <div className="flex flex-col items-center">
          <GoldButton href="/apply" className="px-10 py-4 text-base tracking-[0.2em] shadow-lg shadow-gold/20 mb-6">
            Apply to Invest <ArrowRight className="w-5 h-5 ml-3" />
          </GoldButton>
          <p className="font-mono text-[10px] text-warmGrey uppercase tracking-widest">
            Takes 3 minutes. No commitment until you're ready.
          </p>
        </div>
      </div>
    </section>
  )
}
