'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { IndiaMap } from '@/components/india-map'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { LIVE_EVENTS, SIMULATION_LINES } from '@/lib/site-data'
import { formatCrore, formatIndianNumber } from '@/lib/format'

type FeedEntry = (typeof LIVE_EVENTS)[number] & { id: number }

export default function LivePage() {
  const [events, setEvents] = useState<FeedEntry[]>(() =>
    LIVE_EVENTS.slice(0, 4).map((event, index) => ({ ...event, id: Date.now() + index })),
  )
  const [isSimulating, setIsSimulating] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [stats, setStats] = useState({
    eventsToday: 12,
    workers: 28431,
    payoutCrore: 2.34,
    avgTime: 8.3,
  })

  useEffect(() => {
    const feedInterval = window.setInterval(() => {
      const next = LIVE_EVENTS[Math.floor(Math.random() * LIVE_EVENTS.length)]
      setEvents((current) => [{ ...next, id: Date.now() }, ...current].slice(0, 7))
    }, 4000)

    const statsInterval = window.setInterval(() => {
      setStats((current) => ({
        eventsToday: current.eventsToday + 1,
        workers: current.workers + Math.floor(Math.random() * 120) + 24,
        payoutCrore: Number((current.payoutCrore + Math.random() * 0.08).toFixed(2)),
        avgTime: Number((Math.max(7.8, current.avgTime + (Math.random() > 0.5 ? 0.1 : -0.1))).toFixed(1)),
      }))
    }, 8000)

    return () => {
      window.clearInterval(feedInterval)
      window.clearInterval(statsInterval)
    }
  }, [])

  const mapMarkers = useMemo(() => {
    const latestByCity = new Map<string, FeedEntry>()
    events.forEach((event) => {
      if (!latestByCity.has(event.city)) {
        latestByCity.set(event.city, event)
      }
    })

    return Array.from(latestByCity.values()).map((event) => ({
      city: event.city,
      event: `${event.event} ${event.emoji}`.trim(),
      workers: event.workers,
      amount: event.amount,
      color: '#FF5722',
      pulse: true,
    }))
  }, [events])

  const handleSimulate = async () => {
    if (isSimulating) return

    setIsSimulating(true)
    setShowTerminal(true)
    setShowSuccess(false)
    setTerminalLines([])

    for (const line of SIMULATION_LINES) {
      await new Promise((resolve) => window.setTimeout(resolve, 900))
      setTerminalLines((current) => [...current, line])
    }

    setShowSuccess(true)
    setIsSimulating(false)
    setEvents((current) => [
      {
        city: 'Bengaluru',
        event: 'Heavy Rain',
        emoji: '🌧',
        workers: 1247,
        amount: '₹11.2L',
        time: 'just now',
        id: Date.now(),
      },
      ...current,
    ].slice(0, 7))
    setStats((current) => ({
      eventsToday: current.eventsToday + 1,
      workers: current.workers + 1247,
      payoutCrore: Number((current.payoutCrore + 0.11).toFixed(2)),
      avgTime: current.avgTime,
    }))
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 pb-36 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Live Command Center</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">India-wide payout simulation and event monitoring.</h1>
          </div>
          <div className="rounded-full border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive">
            LIVE
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
          <section className="section-shell p-6 sm:p-7">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Active disruption map</h2>
                <p className="mt-2 text-sm text-white/55">Pulsing zones reflect the latest worker-protection events in the live feed.</p>
              </div>
              <Button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating}
                className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90"
              >
                {isSimulating ? (
                  <>
                    <Spinner className="size-4" />
                    Triggering event...
                  </>
                ) : (
                  'Simulate Event'
                )}
              </Button>
            </div>

            {showTerminal ? (
              <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-[#080a12] p-5 font-mono text-sm">
                <div className="space-y-3">
                  {terminalLines.map((line, index) => (
                    <div key={`${line}-${index}`} className={line.startsWith('✓') ? 'text-accent' : 'text-white/80'}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {showSuccess ? (
              <div className="mt-4 rounded-2xl border border-accent/25 bg-accent/10 px-5 py-4 text-sm font-semibold text-accent">
                ✅ ₹11.2L paid in 8 min 14 sec — 1,247 workers protected
              </div>
            ) : null}

            <div className="mt-6 h-[430px]">
              <IndiaMap markers={mapMarkers} className="h-full" />
            </div>
          </section>

          <section className="section-shell p-6 sm:p-7">
            <div className="border-b border-white/10 pb-5">
              <h2 className="text-2xl font-semibold text-white">Auto-generated event feed</h2>
              <p className="mt-2 text-sm text-white/55">New events appear every 4 seconds. Oldest entries fade out as the stream fills up.</p>
            </div>

            <div className="mt-6 space-y-3">
              <AnimatePresence initial={false}>
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: 36 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-white">
                          {event.emoji} {event.city} — {event.event}
                        </p>
                        <p className="mt-1 text-sm text-white/55">{event.time}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">LIVE</span>
                    </div>
                    <p className="mt-3 text-sm text-white/70">
                      {formatIndianNumber(event.workers)} workers — {event.amount}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0d0f18]/92 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          <RealtimePill label="Events Today" value={stats.eventsToday.toString()} />
          <RealtimePill label="Workers Protected" value={formatIndianNumber(stats.workers)} />
          <RealtimePill label="Total Payout" value={formatCrore(stats.payoutCrore)} />
          <RealtimePill label="Avg Payout Time" value={`${stats.avgTime} min`} />
        </div>
      </div>
    </div>
  )
}

function RealtimePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}
