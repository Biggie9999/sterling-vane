import { GoldButton } from "@/components/shared/GoldButton"

const tiers = [
  {
    name: "Entry",
    minimum: "$10,000",
    popular: true,
    rois: { "3m": "30%", "9m": "50%", "12m": "90%+" },
    perks: [
      "Quarterly distributions",
      "Full document access",
      "Basic reporting",
    ],
    cta: "Lock In My Position"
  },
  {
    name: "Growth",
    minimum: "$50,000",
    popular: false,
    rois: { "3m": "30%", "9m": "50%", "12m": "90%+ + Priority" },
    perks: [
      "Priority booking access",
      "Quarterly distributions",
      "Full document access",
      "Enhanced reporting",
    ],
    cta: "Secure Growth Tier"
  },
  {
    name: "Private",
    minimum: "$100,000+",
    popular: false,
    rois: { "3m": "Custom terms", "9m": "Custom", "12m": "Dedicated mgr." },
    perks: [
      "Custom investment terms",
      "Dedicated manager",
      "Direct asset acquisition option",
      "VIP booking privileges",
    ],
    cta: "Contact Principal"
  }
]

export function InvestmentTiers() {
  return (
    <section className="py-24 bg-offWhite dark:bg-[#0f0f0f]">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-black dark:text-white mb-16 text-center max-w-3xl mx-auto">
          Choose your position.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <div 
              key={tier.name} 
              className={`relative bg-ivory dark:bg-black p-8 flex flex-col ${tier.popular ? 'border-2 border-gold transform md:-translate-y-4 shadow-xl' : 'border border-border-light dark:border-border-dark mt-4 md:mt-0'}`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1 lg:translate-x-2 -translate-y-1/2">
                  <div className="bg-gold text-black text-xs font-mono font-bold px-3 py-1 uppercase tracking-widest flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="mb-8 border-b border-border-light dark:border-border-dark pb-8">
                <h3 className="font-serif text-2xl text-black dark:text-white mb-2">{tier.name}</h3>
                <p className="font-sans text-sm text-warmGrey mb-6">Minimum Commitment</p>
                <div className="font-serif text-4xl md:text-5xl text-black dark:text-white">
                  {tier.minimum}
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-1 border-b border-border-light dark:border-border-dark pb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-sans text-warmGrey">3-Month ROI</span>
                  <span className="font-mono text-black dark:text-white">{tier.rois["3m"]}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-sans text-warmGrey">9-Month ROI</span>
                  <span className="font-mono text-black dark:text-white">{tier.rois["9m"]}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-sans text-warmGrey">12-Month ROI</span>
                  <span className="font-mono text-black dark:text-white">{tier.rois["12m"]}</span>
                </div>
              </div>

              <div className="mb-8 flex-1">
                <ul className="space-y-4">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-4 h-4 text-gold mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans text-sm text-black dark:text-white/80">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tier.popular && (
                <div className="mb-6 text-center">
                  <p className="text-danger font-mono text-xs uppercase tracking-widest">
                    12 slots remaining — closes this round
                  </p>
                </div>
              )}

              <GoldButton 
                href="/apply" 
                className={`w-full ${!tier.popular ? 'bg-transparent text-gold hover:bg-gold hover:text-black border border-gold' : ''}`}
              >
                {tier.cta} &rarr;
              </GoldButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
