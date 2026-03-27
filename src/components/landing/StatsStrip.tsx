"use client"

import { useEffect, useRef, useState } from "react"

const STATS = [
  { label: "Assets Under Management", end: 45, prefix: "$", suffix: "M+" },
  { label: "Target Annual Yield", end: 14, suffix: ".8%" },
  { label: "Historical Rent Premium", end: 32, suffix: "%" },
  { label: "Sponsor Co-Investment", end: 20, suffix: "%" },
]

function useCountUp(end: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])
  return count
}

function StatItem({ stat, animate }: { stat: typeof STATS[0]; animate: boolean }) {
  const count = useCountUp(stat.end, 1200, animate)
  return (
    <div className="text-center px-6 py-12 border-r border-[#E5E5E5] last:border-0 flex-1 min-w-[200px]">
      <p className="font-serif text-5xl md:text-6xl text-[#1a1a1a] mb-3 transition-opacity duration-1000">
        {stat.prefix || ""}{animate ? count : 0}{stat.suffix}
      </p>
      <p className="text-[#888] text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</p>
    </div>
  )
}

export function StatsStrip() {
  const [animate, setAnimate] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="bg-[#FAF9F6] border-y border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} animate={animate} />
          ))}
        </div>
      </div>
    </div>
  )
}
