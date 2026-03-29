"use client"

import { Check, ArrowRight, Award, Globe, Network, Shield } from "lucide-react"
import Link from "next/link"

export function SovereignStory() {
  return (
    <section className="bg-white py-24 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Investment Thesis */}
        <div className="mb-20">
          <p className="text-[#006AFF] font-bold tracking-widest uppercase text-xs mb-4 max-w-2xl mx-auto text-center">Our Investment Thesis</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-8 leading-tight text-center max-w-3xl mx-auto">
            Institutional-grade alternative assets.
          </h2>
          <div className="prose prose-lg text-[#666] leading-relaxed max-w-3xl mx-auto text-center">
            <p className="font-semibold text-[#1a1a1a]">Sterling Vane Development Group focuses exclusively on the acquisition, repositioning, and operation of ultra-luxury short-term residential assets.</p>
            <p>Our mandate is simple: identify structurally sound luxury properties in high-barrier-to-entry markets, execute targeted capital improvements, and transition them into high-yielding hospitality assets. This strategy bridges the gap between traditional real estate appreciation and the cash velocity of luxury hospitality.</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">The Market Inefficiency</h3>
            <p className="text-[#666] leading-relaxed mb-4">
              Prime luxury real estate often suffers from significant underutilization. By acquiring these assets and deploying our proprietary hospitality management framework, we convert dormant equity into active, high-yield cash flow.
            </p>
            <p className="text-[#666] leading-relaxed">
              Our vertically integrated approach ensures quality control at every stage — from underwriting and acquisition to design, guest experience, and asset disposition. We manage the complexity; our partners receive the yield.
            </p>
          </div>
          <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E5E5E5]">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Yield Milestones</h3>
            <p className="text-[#666] leading-relaxed mb-6">Our structured performance milestones deliver yield at three critical checkpoints:</p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center text-[#1a1a1a] font-medium pb-2 border-b border-[#E5E5E5]">
                <Check className="w-5 h-5 text-[#006AFF] mr-3 shrink-0" />
                <span><strong>Month 2</strong> — 30% Target Yield Milestone</span>
              </li>
              <li className="flex items-center text-[#1a1a1a] font-medium pb-2 border-b border-[#E5E5E5]">
                <Check className="w-5 h-5 text-[#006AFF] mr-3 shrink-0" />
                <span><strong>Month 4</strong> — 60% Target Yield Milestone</span>
              </li>
              <li className="flex items-center text-[#1a1a1a] font-medium">
                <Check className="w-5 h-5 text-[#006AFF] mr-3 shrink-0" />
                <span><strong>Month 6</strong> — 90% Peak Yield Milestone</span>
              </li>
            </ul>
            <p className="text-sm text-[#888] italic">Distributions are paid following each stabilization milestone.</p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Founder Photo */}
            <div className="relative">
              <div className="relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden bg-slate-100 shadow-xl">
                <img
                  src="/founder.jpg"
                  alt="Sterling Vane — Founder"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-serif text-2xl font-bold">The Founder</p>
                  <p className="text-white/70 text-sm font-medium tracking-widest uppercase">Sterling Vane Development Group</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#006AFF]/10 rounded-full blur-xl pointer-events-none" />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-3xl font-serif text-[#1a1a1a] mb-6">Execution &amp; Track Record</h2>
              <div className="prose prose-lg text-[#666] leading-relaxed">
                <p>Our leadership team brings decades of experience spanning institutional private equity, luxury residential development, and global hospitality operations.</p>
                <p>We do not rely on speculative market appreciation. Our returns are driven by active operational value-add. By treating each asset as a standalone luxury enterprise, we insulate our portfolio from broader macroeconomic housing trends.</p>
                <p className="font-semibold text-[#1a1a1a]">Partners co-invest directly alongside the Sterling Vane general partnership, ensuring complete alignment of interests.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 90% Returns Block */}
        <div className="bg-[#1a1a1a] text-white rounded-3xl p-10 md:p-16 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#006AFF]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 drop-shadow-sm">The Premium Rent Arbitrage</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl leading-relaxed">
              The differential between long-term residential cap rates and stabilized short-term hospitality yields is significant. By applying institutional management standards to residential assets, we consistently generate outsized premiums compared to traditional multi-family portfolios.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-sm text-white/50 mb-1">Month 2 Milestone</p>
                <p className="text-3xl font-bold text-[#006AFF]">30%</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-sm text-white/50 mb-1">Month 4 Milestone</p>
                <p className="text-3xl font-bold text-white">60%</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-sm text-white/50 mb-1">Month 6 Peak Yield</p>
                <p className="text-3xl font-bold text-emerald-400">90%</p>
              </div>
            </div>

            <div className="inline-flex items-center px-4 py-2 bg-[#006AFF]/20 text-[#006AFF] rounded-full border border-[#006AFF]/30 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-[#006AFF] mr-2 animate-pulse"></span>
              Phase 1 Subscription Closing Soon
            </div>
            <p className="text-white/80 mt-6 max-w-2xl leading-relaxed">
              We operate exclusively under Regulation D, Rule 506(c). Investments are currently limited to verified accredited investors. Offerings are strictly ring-fenced per asset, providing absolute transparency over collateral and performance metrics.
            </p>
          </div>
        </div>

        {/* Final Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Risk Mitigation &amp; Hedging</h3>
            <p className="text-[#666] leading-relaxed mb-4">
              Real estate investing requires rigorous risk management. We prioritize assets in locations with robust year-round demand — such as tier-1 global cities and irreplaceable resort destinations.
            </p>
            <p className="text-[#666] leading-relaxed mb-4">
              Furthermore, standardizing operations through tech-enabled property management allows us to maintain incredibly low vacancy rates, effectively hedging against localized seasonal downturns.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Direct Investor Utility</h3>
            <p className="text-[#666] leading-relaxed mb-4">
              Unlike traditional private equity REITs, Sterling Vane partners benefit from direct asset utility. Limited Partners are granted priority booking privileges across the entire portfolio at preferred rates.
            </p>
            <p className="text-[#666] leading-relaxed mb-4">
              It is rare to find an investment vehicle that successfully combines tax-advantaged equity growth, quarterly cash flow, and tangible personal utility.
            </p>
          </div>
        </div>

        {/* Call to Action Final */}
        <div className="text-center max-w-2xl mx-auto bg-[#F8FAFC] p-12 rounded-3xl border border-[#E5E5E5]">
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-4">Review Current Offerings</h2>
          <p className="text-[#666] mb-8 leading-relaxed">
            Phase 1 assets are currently accepting capital commitments. Review the private placement memorandums, detailed financial models, and property appraisals in our secure investor portal.
          </p>
          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-8">Ready to review the data?</h3>
          <Link href="/marketplace" className="inline-flex items-center justify-center px-8 py-4 w-full md:w-auto bg-[#1a1a1a] text-white rounded-lg font-bold shadow-lg hover:bg-black transition-colors text-lg">
            View Private Listings <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="mt-6 text-sm text-[#888]">By accessing the portal, you acknowledge this is a Rule 506(c) offering.</p>
        </div>

      </div>
    </section>
  )
}
