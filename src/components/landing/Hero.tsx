"use client";

import { motion } from "framer-motion";
import { GoldButton } from "@/components/shared/GoldButton";
import { GhostButton } from "@/components/shared/GhostButton";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const headline = "The Next Chapter in Luxury Hospitality.";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black luxury-grain">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] text-white mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl text-warmGrey max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A private asset fund built on premium real estate. 30% returns in 90 days. <strong className="text-white font-medium">12 investor slots remaining.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <GoldButton href="/apply" icon={<ArrowRight className="w-4 h-4" />}>
            Apply to Invest
          </GoldButton>
          <GhostButton href="/portfolio">
            View the Collection
          </GhostButton>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 border-t border-b border-border-dark py-8"
        >
          <div className="text-center md:border-r border-border-dark">
            <p className="font-serif text-3xl md:text-4xl text-white mb-2">$42M</p>
            <p className="font-mono text-[0.65rem] tracking-widest text-gold uppercase">Total Portfolio Value</p>
          </div>
          <div className="text-center md:border-r border-border-dark">
            <p className="font-serif text-3xl md:text-4xl text-white mb-2">18</p>
            <p className="font-mono text-[0.65rem] tracking-widest text-gold uppercase">Active Units</p>
          </div>
          <div className="text-center md:border-r border-border-dark">
            <p className="font-serif text-3xl md:text-4xl text-white mb-2">32%</p>
            <p className="font-mono text-[0.65rem] tracking-widest text-gold uppercase">Avg. Quarterly ROI</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl text-white mb-2">45</p>
            <p className="font-mono text-[0.65rem] tracking-widest text-gold uppercase">Investors Onboarded</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}
