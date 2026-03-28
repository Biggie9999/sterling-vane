import { GoldButton } from "@/components/shared/GoldButton"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

export function FinalCTA() {
  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-accent/30 bg-accent/10 mb-8 rounded-full"
        >
          <ShieldCheck className="w-3 h-3 text-accent" />
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Institutional Access Level 1</span>
        </motion.div>

        <h2 className="font-serif text-4xl md:text-7xl text-white max-w-4xl mx-auto leading-[1.1] mb-8 font-bold">
          The Final Shift. <br />
          <span className="text-white/40 italic">Retail entry is closing.</span>
        </h2>
        
        <p className="font-sans text-white/50 text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          The Sovereign Collection is nearing full capitalization. Once the current tranche is fully committed, the minimum participation floor will be elevated to institutional mandates.
        </p>

        <div className="flex flex-col items-center">
          <GoldButton href="/marketplace" className="px-10 py-5 text-sm font-bold tracking-[0.2em] shadow-2xl shadow-accent/20 mb-8 rounded-2xl bg-accent hover:bg-white text-black transition-all">
            Secure Allocation <ArrowRight className="w-5 h-5 ml-3" />
          </GoldButton>
          <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.3em]">
            Blockchain Verified. Asset-Backed Deeds.
          </p>
        </div>
      </div>
    </section>
  )
}
