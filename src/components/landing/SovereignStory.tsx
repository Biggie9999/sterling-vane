"use client"

import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SovereignStory() {
  return (
    <section className="bg-white py-24 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* The Introduction */}
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

        {/* Two Column Layout for Middle Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">The Market Inefficiency</h3>
            <p className="text-[#666] leading-relaxed mb-4">
              Prime luxury real estate often suffers from significant underutilization. By acquiring these assets and deploying our proprietary hospitality management framework, we convert dormant equity into active, high-yield cash flow. 
            </p>
            <p className="text-[#666] leading-relaxed">
              Our vertically integrated approach ensures quality control at every stage—from underwriting and acquisition to design, guest experience, and asset disposition. We manage the complexity; our partners receive the yield.
            </p>
          </div>
          <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E5E5E5]">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Target Metrics</h3>
            <p className="text-[#666] leading-relaxed mb-6">Our Phase 1 portfolio has been underwritten with conservative assumptions targeting the following metrics:</p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center text-[#1a1a1a] font-medium pb-2 border-b border-[#E5E5E5]">
                <Check className="w-5 h-5 text-[#006AFF] mr-3" /> Minimum Investment: $10,000 / Share
              </li>
              <li className="flex items-center text-[#1a1a1a] font-medium pb-2 border-b border-[#E5E5E5]">
                <Check className="w-5 h-5 text-[#006AFF] mr-3" /> Target Annual Yield: 14.8%
              </li>
              <li className="flex items-center text-[#1a1a1a] font-medium">
                <Check className="w-5 h-5 text-[#006AFF] mr-3" /> Target IRR (3-Year Hold): 18.5%
              </li>
            </ul>
            <p className="text-sm text-[#888] italic">Distributions are paid quarterly following a 90-day stabilization period post-acquisition.</p>
          </div>
        </div>

        {/* Credibility */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif text-[#1a1a1a] mb-6">Execution & Track Record</h2>
          <div className="prose prose-lg text-[#666] leading-relaxed">
            <p>Our leadership team brings decades of experience spanning institutional private equity, luxury residential development, and global hospitality operations.</p>
            <p>We do not rely on speculative market appreciation. Our returns are driven by active operational value-add. By treating each asset as a standalone luxury enterprise, we insulate our portfolio from broader macroeconomic housing trends.</p>
            <p className="font-semibold text-[#1a1a1a]">Partners co-invest directly alongside the Sterling Vane general partnership, ensuring complete alignment of interests.</p>
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
                <p className="text-sm text-white/50 mb-1">Target Annual Cash Yield</p>
                <p className="text-3xl font-bold text-[#006AFF]">14.8%</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-sm text-white/50 mb-1">Target 3-Year Equity Multiple</p>
                <p className="text-3xl font-bold text-white">1.6x</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-sm text-white/50 mb-1">Target LTV Ratio</p>
                <p className="text-3xl font-bold text-white">&lt; 55%</p>
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
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Risk Mitigation & Hedging</h3>
            <p className="text-[#666] leading-relaxed mb-4">
              Real estate investing requires rigorous risk management. We prioritize assets in locations with robust year-round demand—such as tier-1 global cities and irreplaceable resort destinations.
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
