"use client"

import { useState } from "react"
import { GoldButton } from "@/components/shared/GoldButton"
import { ArrowRight } from "lucide-react"

export function InlineCalculator() {
  const [amount, setAmount] = useState<number>(50000)
  const [duration, setDuration] = useState<"3m" | "6m" | "9m" | "12m">("9m")

  // Simple mock calculation logic
  const getRoiRate = () => {
    switch(duration) {
      case "3m": return 0.30;
      case "6m": return 0.40;
      case "9m": return 0.50;
      case "12m": return 0.90;
      default: return 0.30;
    }
  }

  const projectedReturn = amount * getRoiRate()
  const totalValue = amount + projectedReturn
  const quarterly = projectedReturn / (parseInt(duration.replace('m','')) / 3)

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
  }

  return (
    <section className="py-24 bg-black luxury-grain relative border-t border-border-dark">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Run the numbers.
          </h2>
          <p className="font-sans text-warmGrey text-lg max-w-2xl mx-auto">
            Interactive yield projection based on our targeted asset performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#0a0a0a] border border-border-dark p-8 md:p-12">
          
          {/* Inputs */}
          <div className="flex flex-col justify-center">
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="font-mono text-xs tracking-widest text-warmGrey uppercase">Investment Amount</label>
                <span className="font-serif text-3xl text-gold">{formatCurrency(amount)}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="500000" 
                step="5000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1 bg-border-dark rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between mt-3 text-xs font-mono text-warmGrey">
                <span>$10k</span>
                <span>$500k+</span>
              </div>
            </div>

            <div>
              <label className="font-mono text-xs tracking-widest text-warmGrey uppercase mb-4 block">Term Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {(["3m", "6m", "9m", "12m"] as const).map((term) => (
                  <button
                    key={term}
                    onClick={() => setDuration(term)}
                    className={`py-3 text-sm font-mono tracking-wider transition-colors border ${
                      duration === term 
                        ? 'bg-gold text-black border-gold' 
                        : 'bg-transparent text-warmGrey border-border-dark hover:border-gold hover:text-white'
                    }`}
                  >
                    {term.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="bg-[#111] p-8 border border-white/5 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>
            
            <div className="space-y-8 relative z-10">
              <div>
                <p className="font-sans text-sm text-warmGrey mb-2">Projected Total Value</p>
                <p className="font-serif text-5xl text-white">{formatCurrency(totalValue)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border-dark">
                <div>
                  <p className="font-sans text-xs text-warmGrey mb-2">Net ROI</p>
                  <p className="font-mono text-2xl text-gold">{(getRoiRate() * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="font-sans text-xs text-warmGrey mb-2">Est. Quarterly Dist.</p>
                  <p className="font-mono text-2xl text-white">{formatCurrency(quarterly)}</p>
                </div>
              </div>

              <div className="pt-8">
                <GoldButton href="/calculator" className="w-full justify-center">
                  Get Full Projection Report <ArrowRight className="w-4 h-4 ml-2" />
                </GoldButton>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
