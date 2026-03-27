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
    <div className="text-center px-4 py-8 sm:py-12 border-b sm:border-b-0 sm:border-r border-slate-100 last:border-0">
      <p className="font-serif text-4xl sm:text-5xl md:text-6xl text-slate-900 mb-2 font-bold">
        {stat.prefix || ""}{animate ? count : 0}{stat.suffix}
      </p>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
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
    <div ref={ref} className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 sm:flex sm:divide-x sm:divide-slate-100">
          {STATS.map((s) => (
            <StatItem key={s.label} stat={s} animate={animate} />
          ))}
        </div>
      </div>
    </div>
  )
}
