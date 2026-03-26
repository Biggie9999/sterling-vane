export function CredibilityStrip() {
  return (
    <section className="py-20 bg-black luxury-grain relative border-y border-border-dark">
      <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <div className="mb-8 text-gold">
          {/* Harvard crest / badge placeholder */}
          <div className="w-12 h-12 mx-auto rounded-full border border-gold flex items-center justify-center">
            <span className="font-serif text-xl">H</span>
          </div>
        </div>
        
        <blockquote className="font-serif text-3xl md:text-5xl text-white italic leading-tight mb-8">
          "I didn't spend a decade at Harvard learning theory just to sit in a boardroom."
        </blockquote>
        
        <div className="mb-16">
          <p className="font-mono text-sm tracking-widest uppercase text-gold">Sterling Vane</p>
          <p className="font-sans text-sm text-warmGrey mt-1">Managing Principal</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-warmGrey font-mono text-xs tracking-widest uppercase">
          <span>California</span>
          <span className="w-1 h-1 bg-gold rounded-full"></span>
          <span>Florida</span>
          <span className="w-1 h-1 bg-gold rounded-full"></span>
          <span>New York</span>
          <span className="w-1 h-1 bg-gold rounded-full"></span>
          <span>Dubai</span>
          <span className="w-1 h-1 bg-gold rounded-full"></span>
          <span>Monaco</span>
        </div>
      </div>
    </section>
  )
}
