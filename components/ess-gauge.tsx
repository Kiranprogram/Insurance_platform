'use client'

import { useEffect, useMemo, useState } from 'react'

export function EssGauge() {
  const radius = 54
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius])
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setAnimated(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-white/10 bg-[#111322] p-8">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#2c314a" strokeWidth="10" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#FF5722"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? circumference * 0.28 : circumference}
            style={{ transition: 'stroke-dashoffset 1.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">72</span>
          <span className="text-xs uppercase tracking-[0.24em] text-white/50">ESS Score</span>
        </div>
      </div>
      <p className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        Medium-High Protection
      </p>
    </div>
  )
}
