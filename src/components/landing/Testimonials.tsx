"use client"

import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      imageFile: "1.jpg",
      quote: "I know I am crazy to invest that much but now $440,000 in ROI in 6 months, this is all Investors dream. Thank you for this Opportunity Mr. Vane.",
      alt: "Mr Vane Convertible Testimonial"
    },
    {
      id: 2,
      imageFile: "2.jpg",
      quote: "I get to live the jetset lifestyle while my money works, thanks for this opportunity Vane, you're a blessing.",
      alt: "Jetset Lifestyle Testimonial"
    },
    {
      id: 3,
      imageFile: "3.jpg",
      quote: "DEBT NAILED $87K IN 4 WEEKS THANK YOU STERLING VANE.",
      alt: "Debt Nailed Testimonial"
    },
    {
      id: 4,
      imageFile: "4.jpg",
      quote: "Trusting you with my $90,000 retirement fund is the ultimate retirement fund. You changed my life in a short time. I am forever indebted to you for this once in a lifetime opportunity.",
      alt: "Ford Raptor Retirement Testimonial"
    },
    {
      id: 5,
      imageFile: "5.jpg",
      quote: "Vacationing while my money works for me. I couldn't be more grateful Mr. Sterling Vane. This is the most secure investment i have made!",
      alt: "Balcony Vacation Testimonial"
    }
  ]

  return (
    <section className="bg-brand-light py-24 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Proven Velocity</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            The Sovereign Collection attracts capital from all over the world, but our investors all share the same experience: rapid appreciation and unparalleled cash velocity.
          </p>
        </div>

        {/* Dynamic masonry grid behavior for 5 items */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-10">
          {testimonials.map((t) => (
            <div key={t.id} className="break-inside-avoid relative group rounded-[2rem] overflow-hidden shadow-smooth border border-slate-200 bg-white">
              <div className="bg-slate-100 w-full overflow-hidden aspect-[4/5] relative">
                <img 
                  src={`/testimonials/${t.imageFile}`} 
                  alt={t.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback visual helper
                    const target = e.target as HTMLImageElement;
                    if (!target.classList.contains("failed")) {
                      target.classList.add("failed");
                      target.style.display = 'none';
                      if (target.parentElement) {
                        const fallback = document.createElement("div");
                        fallback.className = "flex flex-col items-center justify-center p-8 text-center h-full text-slate-400 bg-slate-100 absolute inset-0";
                        fallback.innerHTML = `<span class="font-bold text-slate-800 mb-2">Image Missing</span><span class="text-xs">Drag your image here into<br /> <code class="bg-white p-1 rounded">public/testimonials/${t.imageFile}</code></span>`;
                        target.parentElement.appendChild(fallback);
                      }
                    }
                  }}
                />
              </div>
              <div className="p-8 bg-white border-t border-slate-100 relative z-10">
                <div className="flex text-brand-accent mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current mr-1" />
                  ))}
                </div>
                <p className="text-slate-800 font-medium leading-relaxed italic text-lg">&quot;{t.quote}&quot;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
