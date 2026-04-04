'use client'

import { useMemo, useState } from 'react'

import { CITY_POINTS } from '@/lib/site-data'
import { cn } from '@/lib/utils'

interface MapMarker {
  city: string
  event?: string
  workers?: number
  amount?: string
  color?: string
  pulse?: boolean
}

interface TooltipState {
  city: string
  event: string
  workers: number
  amount: string
  x: number
  y: number
}

interface IndiaMapProps {
  markers: MapMarker[]
  className?: string
  showTooltip?: boolean
}

const INDIA_PATH =
  'M170 42L215 70L251 82L279 120L297 158L316 180L309 214L338 257L322 317L287 346L286 391L256 440L230 468L212 506L173 482L152 431L131 405L120 362L95 336L102 289L81 240L95 196L119 147L139 108L155 73Z'

const NORTH_EAST_PATH = 'M298 141L335 125L362 147L351 175L321 184L301 167Z'

function projectCity(lat: number, lng: number) {
  const minLat = 6
  const maxLat = 36
  const minLng = 68
  const maxLng = 91

  const x = 82 + ((lng - minLng) / (maxLng - minLng)) * 270
  const y = 62 + (1 - (lat - minLat) / (maxLat - minLat)) * 390

  return { x, y }
}

export function IndiaMap({ markers, className, showTooltip = true }: IndiaMapProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const markerMap = useMemo(
    () =>
      markers.reduce<Record<string, MapMarker>>((acc, marker) => {
        acc[marker.city] = marker
        return acc
      }, {}),
    [markers],
  )

  return (
    <div className={cn('relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#10101d]', className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,87,34,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,229,255,0.1),_transparent_35%)]" />
      <svg viewBox="0 0 420 520" className="relative h-full w-full">
        <defs>
          <linearGradient id="indiaFill" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1e2137" />
            <stop offset="100%" stopColor="#0e101d" />
          </linearGradient>
        </defs>

        <rect width="420" height="520" fill="transparent" />
        <path d={INDIA_PATH} fill="url(#indiaFill)" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
        <path d={NORTH_EAST_PATH} fill="url(#indiaFill)" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />

        {CITY_POINTS.map((city) => {
          const projected = projectCity(city.lat, city.lng)
          const marker = markerMap[city.name]
          const color = marker?.color ?? '#FF5722'
          const pulse = marker?.pulse ?? true

          return (
            <g
              key={city.name}
              onMouseEnter={(event) => {
                if (!showTooltip || !marker?.event || !marker.workers || !marker.amount) {
                  return
                }

                const bounds = (event.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                setTooltip({
                  city: city.name,
                  event: marker.event,
                  workers: marker.workers,
                  amount: marker.amount,
                  x: event.clientX - bounds.left,
                  y: event.clientY - bounds.top,
                })
              }}
              onMouseMove={(event) => {
                if (!showTooltip || !marker?.event || !marker.workers || !marker.amount) {
                  return
                }

                const bounds = (event.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                setTooltip((current) =>
                  current
                    ? {
                        ...current,
                        x: event.clientX - bounds.left,
                        y: event.clientY - bounds.top,
                      }
                    : current,
                )
              }}
              onMouseLeave={() => setTooltip(null)}
              className="cursor-pointer"
            >
              {pulse ? (
                <circle
                  cx={projected.x}
                  cy={projected.y}
                  r="10"
                  fill={color}
                  fillOpacity="0.18"
                  className="origin-center animate-city-pulse"
                />
              ) : null}
              <circle cx={projected.x} cy={projected.y} r="6" fill={color} stroke="white" strokeWidth="1.2" />
            </g>
          )
        })}
      </svg>

      {tooltip ? (
        <div
          className="pointer-events-none absolute z-10 rounded-xl border border-white/10 bg-[#16192a] px-3 py-2 text-xs text-white shadow-xl"
          style={{ left: tooltip.x + 14, top: tooltip.y - 10 }}
        >
          {tooltip.city} — {tooltip.event} — {tooltip.workers.toLocaleString('en-IN')} workers — {tooltip.amount} paid
        </div>
      ) : null}
    </div>
  )
}
