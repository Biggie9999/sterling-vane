"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  name: string
}

export function PropertyGallery({ images, name }: PropertyGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setActiveIdx(i => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setActiveIdx(i => (i === images.length - 1 ? 0 : i + 1))

  if (!images || images.length === 0) return null

  return (
    <>
      {/* ── MAIN GALLERY ── */}
      <div className="relative w-full">
        {/* Hero image */}
        <div className="relative w-full h-[60vw] min-h-[260px] max-h-[560px] overflow-hidden bg-slate-900">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${name} — View ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === activeIdx ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Expand button */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/10 hover:bg-black/60 transition-all"
          >
            <Expand className="w-4 h-4" />
          </button>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/10 hover:bg-black/60 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/10 hover:bg-black/60 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest">
            {activeIdx + 1} / {images.length}
          </div>
        </div>

        {/* ── THUMBNAIL STRIP ── */}
        {images.length > 1 && (
          <div className="flex gap-2 sm:gap-3 px-3 sm:px-4 mt-2 overflow-x-auto no-scrollbar pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`shrink-0 h-14 w-20 sm:h-20 sm:w-28 rounded-xl overflow-hidden border-2 transition-all ${
                  i === activeIdx ? "border-[#2563EB] ring-2 ring-[#2563EB]/20" : "border-transparent hover:border-slate-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-4xl">
            <img
              src={images[activeIdx]}
              alt={`${name} — View ${activeIdx + 1}`}
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox thumbnail strip */}
          <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`shrink-0 h-14 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeIdx ? "border-[#2563EB]" : "border-white/10"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-4">
            {activeIdx + 1} of {images.length} — {name}
          </p>
        </div>
      )}
    </>
  )
}
