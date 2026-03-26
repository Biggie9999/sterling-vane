import { GoldButton } from "@/components/shared/GoldButton"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    num: "01",
    title: "Apply & Qualify",
    desc: "Submit your investor profile. We verify accreditation and assess alignment with our fund’s objectives. Not all capital is accepted."
  },
  {
    num: "02",
    title: "Commit Capital",
    desc: "Select your tier starting at $10,000. Review the subscription agreement, sign digitally, and transfer funds securely via Stripe or wire."
  },
  {
    num: "03",
    title: "We Deploy",
    desc: "Assets are acquired, rapidly repositioned to our elite design standards, and listed across premium short-term rental channels."
  },
  {
    num: "04",
    title: "You Earn",
    desc: "Watch your portfolio perform. Yields are distributed directly to your account every quarter, backed by fully transparent reporting."
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-offWhite dark:bg-card">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-black dark:text-white mb-6">
            From capital to returns in 4 steps.
          </h2>
          <p className="font-sans text-warmGrey text-lg">
            A frictionless process engineered for passive yield.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-dark transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0 relative z-10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Box */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                    <div className="bg-ivory dark:bg-black p-8 border border-border-light dark:border-border-dark hover:border-gold transition-colors duration-300">
                      <p className="font-mono text-4xl font-light text-gold/30 mb-4">{step.num}</p>
                      <h3 className="font-serif text-2xl text-black dark:text-white mb-3">{step.title}</h3>
                      <p className="font-sans text-warmGrey text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-black border border-gold flex items-center justify-center transform -translate-x-1/2">
                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <GoldButton href="/apply">
            Start the Process <ArrowRight className="w-4 h-4 ml-2" />
          </GoldButton>
        </div>
      </div>
    </section>
  )
}
