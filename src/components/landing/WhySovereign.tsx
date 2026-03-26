import { Target, TrendingUp, Globe } from "lucide-react";

const features = [
  {
    title: "Asset Appreciation",
    description: "Prime properties in high-demand global markets. We acquire assets with clear upside potential.",
    icon: <Globe className="w-6 h-6 text-gold" />,
  },
  {
    title: "Operational Cash Flow",
    description: "Boutique Airbnb-level nightly rates without hotel overhead. Yields distributed quarterly.",
    icon: <TrendingUp className="w-6 h-6 text-gold" />,
  },
  {
    title: "Precision Management",
    description: "Capital is perfectly hedged across markets. No ambiguity. Just disciplined returns.",
    icon: <Target className="w-6 h-6 text-gold" />,
  },
];

export function WhySovereign() {
  return (
    <section className="py-24 bg-offWhite dark:bg-card relative border-t-2 border-gold/20">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-black dark:text-white mb-16 text-center max-w-3xl mx-auto leading-tight">
          We solved the inefficiency of luxury real estate.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-ivory dark:bg-black p-8 group hover:-translate-y-2 transition-transform duration-500 border-l border-transparent hover:border-gold relative overflow-hidden shadow-sm"
            >
              <div className="mb-6 bg-black dark:bg-[#111] p-3 inline-block">
                {feature.icon}
              </div>
              <h3 className="font-serif text-2xl text-black dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="font-sans text-warmGrey dark:text-warmGrey/80 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
              
              {/* Hover effect glow line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gold transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
