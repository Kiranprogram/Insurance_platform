'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import { HeroCanvas } from '@/components/hero-canvas'
import { PlanCards } from '@/components/plan-cards'
import { Button } from '@/components/ui/button'
import {
  DISRUPTION_ROWS,
  FRAUD_BADGES,
  HERO_TICKER_ITEMS,
  JOURNEY_STEPS,
  LIVE_SECTION_EVENTS,
  PLATFORM_BADGES,
  RAJU_STORY,
  TRUST_POINTS,
  WHATSAPP_MESSAGE,
} from '@/lib/site-data'
import { formatCrore, formatIndianNumber } from '@/lib/format'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const problemCards = [
  {
    title: 'Workers exposed to weather and civic shutdowns',
    start: 0,
    end: 450,
    duration: 2.5,
    format: (value: number) => `${Math.round(value)}M+`,
  },
  {
    title: 'Protected by any formal income shield today',
    start: 97,
    end: 3,
    duration: 2,
    format: (value: number) => (value <= 3.5 ? '< 3%' : `${Math.round(value)}%`),
  },
  {
    title: 'Annual earnings volatility from disruption days',
    start: 0,
    end: 1.2,
    duration: 2.5,
    format: (value: number) => `₹${value.toFixed(1)}L Cr`,
  },
]

const stepVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function Home() {
  return (
    <div className="bg-background text-white">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <ProtectionLiveSection />
      <PlansSection />
      <TrustSection />
      <StorySection />
      <FinalCtaSection />
      <PlatformLogosSection />
    </div>
  )
}

function HeroSection() {
  const tickerItems = useMemo(() => [...HERO_TICKER_ITEMS, ...HERO_TICKER_ITEMS], [])

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      <HeroCanvas />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,18,0.2)_0%,rgba(8,10,18,0.72)_62%,rgba(8,10,18,0.96)_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Monsoon-grade protection built for India's gig economy
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
            When Bengaluru sleeps through the storm, <span className="gradient-text">GigShield pays before sunrise.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            Parametric income protection for delivery workers. No paperwork. No claim forms. Just AI-verified payouts when rain,
            AQI spikes, bandhs, and city shutdowns wipe out a working day.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
              <Link href="/onboarding">
                Get Protected
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-12 rounded-full border border-white/15 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
              <Link href="/live">Watch the live payout feed</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['97.4%', 'confidence before auto-payout'],
              ['8.3 min', 'average payout time'],
              ['₹1,800/week', 'Shield Plus coverage'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-sm text-white/55">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d1a]">
          <div className="marquee-track flex w-max items-center gap-4 py-2 text-sm font-medium text-primary">
            {tickerItems.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-4 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-secondary">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const valueRefs = useRef<Array<HTMLDivElement | null>>([])

  useGSAP(
    () => {
      problemCards.forEach((card, index) => {
        const target = valueRefs.current[index]
        if (!target) return

        const state = { value: card.start }
        gsap.to(state, {
          value: card.end,
          duration: card.duration,
          ease: 'power2.out',
          delay: index * 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
          onUpdate: () => {
            target.textContent = card.format(state.value)
          },
        })
      })
    },
    { scope: containerRef },
  )

  return (
    <section id="problem" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">The Problem</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">One storm can erase a worker's entire week.</h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            Delivery workers absorb the full shock of weather, air quality shutdowns, and civic disruptions. Traditional insurance never
            showed up for these moments because the loss is real, but the paperwork economics never worked.
          </p>
        </div>

        <div ref={containerRef} className="mt-12 grid gap-5 lg:grid-cols-3">
          {problemCards.map((card, index) => (
            <div key={card.title} className="section-shell p-7">
              <p className="text-sm uppercase tracking-[0.24em] text-white/45">Stat {index + 1}</p>
              <div
                ref={(element) => {
                  valueRefs.current[index] = element
                }}
                className="mt-5 text-5xl font-bold text-white"
              >
                {card.format(card.start)}
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">{card.title}</p>
            </div>
          ))}
        </div>

        <div className="section-shell mt-10 overflow-hidden border-l-4 border-l-primary">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-white/[0.03] text-sm uppercase tracking-[0.2em] text-white/45">
                <tr>
                  <th className="px-6 py-4 font-medium">Disruption Type</th>
                  <th className="px-6 py-4 font-medium">Trigger Threshold</th>
                  <th className="px-6 py-4 font-medium">Income Impact</th>
                </tr>
              </thead>
              <tbody className="text-sm text-white/80">
                {DISRUPTION_ROWS.map((row, index) => (
                  <tr key={row[0]} className={index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}>
                    <td className="px-6 py-4">{row[0]}</td>
                    <td className="px-6 py-4 text-white/65">{row[1]}</td>
                    <td className="px-6 py-4 text-primary">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-white/10 px-6 py-5 text-base italic text-white/55">
            One monsoon storm wipes out 4 days of earnings. No insurance product existed for this. Until now.
          </p>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">How It Works</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Raju's real journey from banner tap to morning payout.</h2>
        </div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={stepVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {JOURNEY_STEPS.map((step, index) => (
            <motion.div key={step.title} variants={cardVariants} className="section-shell relative min-h-[280px] p-7">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{step.icon}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/70">{step.body}</p>

              {index === 4 ? <RainCardOverlay /> : null}
              {index === 5 ? <ConfettiCardOverlay /> : null}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProtectionLiveSection() {
  const [stats, setStats] = useState({
    workers: 28431,
    payoutCrore: 2.34,
    avgMinutes: 8.3,
    approvalRate: 97.4,
  })
  const [feed, setFeed] = useState(() =>
    LIVE_SECTION_EVENTS.slice(0, 3).map((item, index) => ({ ...item, id: Date.now() + index })),
  )

  useEffect(() => {
    const statsInterval = window.setInterval(() => {
      setStats((current) => ({
        workers: current.workers + Math.floor(Math.random() * 35) + 8,
        payoutCrore: Number((current.payoutCrore + Math.random() * 0.04).toFixed(2)),
        avgMinutes: Number((Math.max(7.8, current.avgMinutes + (Math.random() > 0.5 ? 0.1 : -0.1))).toFixed(1)),
        approvalRate: Number((Math.max(96.9, Math.min(98.2, current.approvalRate + (Math.random() > 0.5 ? 0.1 : -0.1)))).toFixed(1)),
      }))
    }, 5000)

    const feedInterval = window.setInterval(() => {
      const next = LIVE_SECTION_EVENTS[Math.floor(Math.random() * LIVE_SECTION_EVENTS.length)]
      setFeed((current) => [{ ...next, id: Date.now() }, ...current].slice(0, 5))
    }, 3500)

    return () => {
      window.clearInterval(statsInterval)
      window.clearInterval(feedInterval)
    }
  }, [])

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl section-shell px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Live Mission Control</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Protection Happening Right Now</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/60">
            Every payout signal blends real weather data, worker activity, peer validation, and platform context before money moves.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4">
            <LivePill title={`${formatIndianNumber(stats.workers)} workers protected today`} subtitle="Auto-approved across active coverage zones" />
            <LivePill title={`${formatCrore(stats.payoutCrore)} paid out this month`} subtitle="Running UPI disbursement volume" />
            <LivePill title={`Avg payout time: ${stats.avgMinutes} minutes`} subtitle="Median pipeline completion speed" />
            <LivePill title={`${stats.approvalRate}% claim approval rate`} subtitle="Fraud, weather, and zone confidence blended" />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0c0f19] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/45">Event Stream</p>
                <p className="mt-1 text-lg font-semibold text-white">Recent disruptions</p>
              </div>
              <span className="animate-floating-feed rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                LIVE
              </span>
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {feed.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 36 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-center gap-3 text-sm">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-primary">{item.city}</span>
                      <span className="text-white/80">{item.event}</span>
                    </div>
                    <p className="mt-3 text-sm text-white/60">
                      {formatIndianNumber(item.workers)} workers protected • {item.amount} auto-paid
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PlansSection() {
  return (
    <section id="plans" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Plans</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Weekly pricing because this is a weekly risk.</h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            The product lives inside the worker's earning cycle. Premiums are deducted weekly, claims are resolved in minutes, and there
            is nothing to file when a threshold breach hits.
          </p>
        </div>

        <div className="mt-12">
          <PlanCards />
        </div>

        <p className="mt-8 text-center text-sm text-white/55">
          Premium auto-deducted from your weekly platform earnings. No bank visits. No paperwork. No claim forms. Ever.
        </p>
      </div>
    </section>
  )
}

function TrustSection() {
  const [pipelineStep, setPipelineStep] = useState(0)
  const pipelineNodes = ['Weather APIs', 'AI Threshold Engine', 'Fraud Check', 'UPI Payout']

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPipelineStep((current) => (current + 1) % pipelineNodes.length)
    }, 1250)

    return () => window.clearInterval(interval)
  }, [pipelineNodes.length])

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Trust Stack</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">How We Know It's Really Raining</h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="section-shell p-7">
            <div className="relative px-2 pt-4">
              <div className="absolute left-[8%] right-[8%] top-[60px] h-px bg-white/10" />
              <div
                className="absolute top-[50px] h-5 w-5 rounded-full bg-primary shadow-[0_0_24px_rgba(255,87,34,0.8)] transition-all duration-700 ease-out"
                style={{ left: `calc(${(pipelineStep / 3) * 100}% - 2px)` }}
              />
              <div className="grid gap-6 sm:grid-cols-4">
                {pipelineNodes.map((node, index) => (
                  <div key={node} className="relative flex flex-col items-center text-center">
                    <div
                      className={cn(
                        'relative z-10 flex h-16 w-16 items-center justify-center rounded-full border text-xs font-semibold transition',
                        index === pipelineStep
                          ? 'border-primary bg-primary/15 text-primary shadow-[0_0_24px_rgba(255,87,34,0.25)]'
                          : 'border-white/10 bg-[#0c0f19] text-white/65',
                      )}
                    >
                      {index + 1}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/70">{node}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 space-y-4">
              {TRUST_POINTS.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="section-shell p-7">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-primary/20 bg-[#0b0e18]">
                <svg viewBox="0 0 240 280" className="absolute inset-0 h-full w-full">
                  <path
                    d="M120 28L193 58V130C193 182 164 224 120 248C76 224 47 182 47 130V58L120 28Z"
                    fill="none"
                    stroke="#FF5722"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="animate-scan-line absolute inset-x-8 h-12 bg-[linear-gradient(180deg,transparent,rgba(255,87,34,0.35),transparent)]" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/45">Fraud Shield</p>
                <div className="mt-5 grid gap-3">
                  {FRAUD_BADGES.map((badge) => (
                    <div key={badge} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                      {badge}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-white/55">Fraud rejection rate: 2.1% | False positive rate: &lt;0.3%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const moveTo = (next: number) => {
    setDirection(next > activeIndex ? 1 : -1)
    setActiveIndex(next)
  }

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl section-shell px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">The Story</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Meet Raju. A real GigShield story.</h2>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              onClick={() => moveTo((activeIndex - 1 + RAJU_STORY.length) % RAJU_STORY.length)}
            >
              <ChevronLeft />
              Prev
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              onClick={() => moveTo((activeIndex + 1) % RAJU_STORY.length)}
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0e18]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 48 : -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -48 : 48 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid min-h-[420px] gap-0 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <StoryVisual visual={RAJU_STORY[activeIndex].visual} />
              <div className="flex items-center p-8 sm:p-10">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-secondary">Panel {activeIndex + 1}</p>
                  <h3 className="mt-4 text-3xl font-semibold text-white">{RAJU_STORY[activeIndex].title}</h3>
                  <p className="mt-5 text-lg leading-8 text-white/68">{RAJU_STORY[activeIndex].text}</p>

                  {RAJU_STORY[activeIndex].visual === 'whatsapp' ? (
                    <div className="mt-8 max-w-xl rounded-[1.75rem] border border-white/10 bg-[#0f1720] p-4">
                      <div className="rounded-[1.4rem] bg-[#075E54] px-4 py-3 text-sm font-semibold text-white">GigShield WhatsApp Bot</div>
                      <div className="bg-[#101c23] p-4">
                        <div className="ml-auto max-w-sm rounded-2xl rounded-tr-sm bg-[#1f2c34] px-4 py-3 text-sm leading-6 text-white/85">
                          {WHATSAPP_MESSAGE}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xl text-white/30">
          {RAJU_STORY.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to story panel ${index + 1}`}
              onClick={() => moveTo(index)}
              className={cn('transition', index === activeIndex ? 'text-primary' : 'hover:text-white/55')}
            >
              ●
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-primary/20 bg-[radial-gradient(circle_at_top,_rgba(255,87,34,0.16),_transparent_30%),linear-gradient(135deg,#121525_0%,#0a0d16_70%)] px-6 py-10 sm:px-10 sm:py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Final CTA</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Don't let the monsoon be the thing that decides next week's rent.</h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            Connect your platform, let GigShield score your disruption risk, and activate a weekly shield in under three minutes.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
            <Link href="/onboarding">
              Start onboarding
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
            <Link href="/dashboard">See Raju's dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function PlatformLogosSection() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[#0f1220] px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Platform Integrations</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Integrated with India's top delivery platforms</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/55">
            Worker data accessed securely via OAuth 2.0 with explicit consent. DPDP Act compliant.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {PLATFORM_BADGES.map((badge) => (
            <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function LivePill({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div layout className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] px-5 py-5">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-7 text-white/58">{subtitle}</p>
    </motion.div>
  )
}

function RainCardOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-5 bottom-5 top-5 overflow-hidden rounded-[1.5rem]">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          className="animate-rain-fall absolute top-0 h-14 w-px bg-gradient-to-b from-secondary/0 via-secondary to-secondary/0 opacity-60"
          style={{
            left: `${8 + index * 9}%`,
            animationDelay: `${index * 0.14}s`,
          }}
        />
      ))}
    </div>
  )
}

function ConfettiCardOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-6 bottom-5 top-8 overflow-hidden">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="absolute top-0 h-3 w-2 rounded-full opacity-80"
          style={{
            left: `${10 + index * 7}%`,
            backgroundColor: ['#FF5722', '#00E5FF', '#FFD166', '#00C853'][index % 4],
            animation: `confetti-fall ${1.7 + (index % 4) * 0.2}s linear ${index * 0.08}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function StoryVisual({ visual }: { visual: string }) {
  if (visual === 'whatsapp') {
    return (
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(0,229,255,0.18),_transparent_34%),linear-gradient(180deg,#101a23_0%,#0d111c_100%)] p-8">
        <div className="absolute inset-0 subtle-grid opacity-30" />
        <div className="relative flex h-full items-center justify-center">
          <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#0b0f15] p-4 shadow-2xl">
            <div className="rounded-[1.5rem] bg-[#075E54] px-4 py-3 text-sm font-semibold text-white">WhatsApp</div>
            <div className="space-y-3 bg-[#101c23] p-4">
              <div className="rounded-2xl rounded-tl-sm bg-[#1f2c34] px-4 py-3 text-sm leading-6 text-white/80">{WHATSAPP_MESSAGE}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (visual === 'rain') {
    return (
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(0,229,255,0.18),_transparent_32%),linear-gradient(180deg,#0d1326_0%,#0b1018_100%)]">
        <RainCardOverlay />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.08),_transparent_45%)]" />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,87,34,0.28),transparent_24%),radial-gradient(circle_at_80%_25%,rgba(0,229,255,0.18),transparent_22%),linear-gradient(135deg,#121525_0%,#090b14_100%)]">
      <div className="absolute inset-0 subtle-grid opacity-20" />
      <div className="absolute left-[16%] top-[18%] h-28 w-28 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute bottom-[18%] right-[14%] h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative flex h-full min-h-[320px] items-center justify-center p-8">
        <div className="grid w-full max-w-md gap-4">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-5">
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">GigShield Signal</p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {{
                sunset: 'HSR Layout, 7:11 PM',
                notification: 'Swiggy in-app banner served',
                profile: 'Risk Score: 68/100',
                payment: 'UPI success: ₹89',
                pipeline: '1,247 workers auto-approved',
              }[visual] ?? 'Signal locked'}
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-white/10 bg-[#0e1220]/90 px-5 py-5">
            <p className="text-sm leading-7 text-white/68">
              {{
                sunset: 'Average week: ₹4,800–₹5,500. Monsoon exposure: high.',
                notification: 'Weekly plan starts at ₹49 only. Zero paperwork.',
                profile: 'App opens in Kannada and suggests Shield Plus.',
                payment: 'Policy live in 30 seconds. Auto-renews weekly.',
                pipeline: 'Razorpay payout API called. WhatsApp queued.',
              }[visual] ?? 'Pipeline armed.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
