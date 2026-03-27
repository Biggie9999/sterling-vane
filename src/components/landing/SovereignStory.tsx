"use client"

import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SovereignStory() {
  return (
    <section className="bg-white py-24 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* The Introduction */}
        <div className="mb-20">
          <p className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-4">The Introduction</p>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 leading-tight">
            The next chapter in luxury hospitality
          </h2>
          <div className="prose prose-lg text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800">Sterling Vane here. Harvard-trained, developer by trade, perfectionist by nature.</p>
            <p>I&apos;m not looking for passive partners. I&apos;m looking for strategic investors to join me in unveiling The Sovereign Collection; a housing project that redefines high-end hospitality. This isn&apos;t just real estate; it&apos;s a private asset fund wrapped in marble and glass.</p>
            <p>Think you have the appetite for 30% returns in the first quarter? Let&apos;s talk.</p>
          </div>
        </div>

        {/* Two Column Layout for Middle Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why I built Sovereign Collection</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Most luxury apartments sit empty 80% of the year. It&apos;s inefficient. The Sovereign Collection solves that. We are acquiring premium assets and running them as boutique Airbnb flagships. We capture the nightly rate of a 5-star hotel without the overhead of a hotel chain. It&apos;s asset appreciation plus operational cash flow.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I&apos;ve designed this for investors who want to own a piece of the skyline while their capital works harder than they do.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">30% in 90 days? Let&apos;s do the math</h3>
            <p className="text-slate-600 leading-relaxed mb-6">I run the numbers like I run my sites: with precision. For investors entering the Sovereign Collection:</p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center text-slate-800 font-medium pb-2 border-b border-slate-200">
                <Check className="w-5 h-5 text-brand-accent mr-3" /> Minimum Commitment: $10,000
              </li>
              <li className="flex items-center text-slate-800 font-medium pb-2 border-b border-slate-200">
                <Check className="w-5 h-5 text-brand-accent mr-3" /> Projected ROI (3 months): 30%
              </li>
              <li className="flex items-center text-slate-800 font-medium">
                <Check className="w-5 h-5 text-brand-accent mr-3" /> Projected ROI (9 months): 50%
              </li>
            </ul>
            <p className="text-sm text-slate-500 italic">We are already pre-selling occupancy. The yield is locked in before the paint dries. This is velocity of money most funds only dream of.</p>
          </div>
        </div>

        {/* Credibility */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif text-slate-900 mb-6">From Harvard Yard to High-End Real Estate</h2>
          <div className="prose prose-lg text-slate-600 leading-relaxed">
            <p>I didn&apos;t spend a decade at Harvard learning theory just to sit in a boardroom.</p>
            <p>I learned to build structures that withstand market volatility. Sterling Vane Global Holdings isn&apos;t a startup; it&apos;s a legacy in motion. I&apos;ve executed high-end developments across three markets, and The Sovereign Collection is my masterwork.</p>
            <p className="font-semibold text-slate-800">I only invite capital that appreciates the difference between a spec builder and a legacy architect.</p>
          </div>
        </div>

        {/* 90% Returns Block */}
        <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 drop-shadow-sm">The math of 90% returns</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl leading-relaxed">
              Let&apos;s skip the fluff. High-end short-term rentals yield 3x what traditional long-term leases do. When you couple that with the tax advantages of real estate ownership in Dubai and Monaco and the current scarcity of luxury inventory, the runway is exponential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-400 mb-1">3 Months</p>
                <p className="text-3xl font-bold text-brand-accent">30% ROI</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-400 mb-1">9 Months</p>
                <p className="text-3xl font-bold text-white">50% ROI</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-400 mb-1">First Year</p>
                <p className="text-3xl font-bold text-white">&gt; 90%</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6">We are capping this round. The $10,000 minimum ensures exclusivity, not exclusion.</p>
            
            <div className="inline-flex items-center px-4 py-2 bg-brand-accent/20 text-brand-accent rounded-full border border-brand-accent/30 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-brand-accent mr-2 animate-pulse"></span>
              12 units left. Then it&apos;s locked.
            </div>
            <p className="text-slate-300 mt-6 max-w-2xl leading-relaxed">
              We are currently closing on Phase 1 of The Sovereign Collection. The architecture is finalized. The marketing stack for Airbnb is ready. The only variable left is the allocation of private capital. I have 12 slots left at the $10,000 entry level. Once these are subscribed, we close the round to maintain the integrity of the investor pool. I don&apos;t oversubscribe. I over-deliver.
            </p>
          </div>
        </div>

        {/* Final Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Why this isn&apos;t &quot;just&quot; an Airbnb play</h3>
            <p className="text-slate-600 leading-relaxed mb-4">I know what you&apos;re thinking: &quot;Isn&apos;t the short-term rental market volatile?&quot;</p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Not when you own the asset class at this tier. The Sovereign Collection targets the corporate executive and luxury traveler, the demographic that travels regardless of the economy. We are diversifying risk across multiple high-yield units within a single gated asset.
            </p>
            <p className="font-semibold text-slate-800">Your $10,000 buys you a diversified slice of the entire collection, not just a single unit. We hedge for you.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Where do you want to stay in Q4?</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              One of the privileges of investing in The Sovereign Collection isn&apos;t just the 30–50% ROI; it&apos;s the access. 
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Partners in this fund receive priority booking privileges. When you&apos;re in the city, your asset is your residence. I build spaces that feel like home for the investor, but rent like a palace for the guest.
            </p>
            <p className="font-semibold text-slate-800">It&apos;s the only investment you can actually use.</p>
          </div>
        </div>

        {/* Call to Action Final */}
        <div className="text-center max-w-2xl mx-auto bg-brand-light p-12 rounded-3xl border border-brand-accent/10">
          <h2 className="text-3xl font-serif text-slate-900 mb-4">Welcome to the collection</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            High-end real estate isn&apos;t about the square footage. It&apos;s about the exclusivity of the address. The Sovereign Collection is the address I&apos;m building for my top-tier investors. With a Harvard-trained developer at the helm, projected returns of 30% in 3 months, and a hard cap on the number of investors, this is a rare liquidity event in the private markets.
          </p>
          <div className="mb-8 p-4 bg-white rounded-lg border border-slate-200 shadow-sm inline-block">
            <p className="text-red-600 font-bold mb-1">1 Slot Left</p>
            <p className="text-slate-500 text-sm">at the $10,000 minimum before we raise the entry.</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Are you ready to build?</h3>
          <Link href="/apply" className="inline-flex items-center justify-center px-8 py-4 w-full md:w-auto bg-brand-blue text-white rounded-lg font-bold shadow-lg hover:bg-slate-800 transition-colors text-lg">
            Finalize Your Position <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="mt-6 text-sm text-slate-500 italic">"Returns start accruing at closing. Do you have 10 minutes today?" - Sterling Vane</p>
        </div>

      </div>
    </section>
  )
}
