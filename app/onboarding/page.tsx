'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { PlanCards } from '@/components/plan-cards'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { ONBOARDING_TERMINAL_LINES, WEEKLY_PLANS } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const stepLabels = ['Platform Login', 'AI Risk Profiling', 'Choose Plan & Pay'] as const

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [platformState, setPlatformState] = useState<'idle' | 'connecting' | 'verified'>('idle')
  const [typedLines, setTypedLines] = useState<string[]>([])
  const [currentTyping, setCurrentTyping] = useState('')
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'plus' | 'max'>('plus')
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [upiId, setUpiId] = useState('raju@okaxis')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const activePlan = useMemo(() => WEEKLY_PLANS.find((plan) => plan.slug === selectedPlan) ?? WEEKLY_PLANS[1], [selectedPlan])

  useEffect(() => {
    if (currentStep !== 2) return

    let cancelled = false

    const runTyping = async () => {
      setTypedLines([])
      setCurrentTyping('')
      setAnalysisComplete(false)

      const sleep = (delay: number) => new Promise((resolve) => window.setTimeout(resolve, delay))

      for (const line of ONBOARDING_TERMINAL_LINES) {
        let built = ''
        for (const char of line) {
          if (cancelled) return
          built += char
          setCurrentTyping(built)
          await sleep(18)
        }

        setTypedLines((current) => [...current, line])
        setCurrentTyping('')
        await sleep(600)
      }

      await sleep(500)
      if (!cancelled) setAnalysisComplete(true)
    }

    runTyping()

    return () => {
      cancelled = true
    }
  }, [currentStep])

  useEffect(() => {
    if (!showSuccess) return

    const redirectTimer = window.setTimeout(() => {
      router.push('/dashboard')
    }, 3000)

    return () => window.clearTimeout(redirectTimer)
  }, [router, showSuccess])

  const handleSwiggyLogin = async () => {
    if (platformState !== 'idle') return
    setPlatformState('connecting')
    await new Promise((resolve) => window.setTimeout(resolve, 1500))
    setPlatformState('verified')
  }

  const handlePayment = async () => {
    setIsProcessingPayment(true)
    await new Promise((resolve) => window.setTimeout(resolve, 2000))
    setIsProcessingPayment(false)
    setPaymentOpen(false)
    setShowConfetti(true)
    setShowSuccess(true)
    window.setTimeout(() => setShowConfetti(false), 2800)
  }

  return (
    <div className="relative min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      {showConfetti ? <ConfettiOverlay /> : null}

      <div className="mx-auto max-w-5xl">
        <div className="section-shell px-6 py-8 sm:px-8 sm:py-10">
          <div className="border-b border-white/10 pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
              Step {currentStep} of 3 — {stepLabels[currentStep - 1]}
            </p>
            <div className="mt-5 flex items-center gap-4">
              {stepLabels.map((label, index) => (
                <div key={label} className="flex flex-1 items-center gap-3">
                  <div
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold',
                      index + 1 <= currentStep
                        ? 'border-primary bg-primary text-white'
                        : 'border-white/10 bg-white/5 text-white/45',
                    )}
                  >
                    {index + 1}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(currentStep / 3) * 100}%` }} />
            </div>
          </div>

          {showSuccess ? (
            <div className="mt-8 rounded-[2rem] border border-accent/20 bg-accent/10 p-8 text-center">
              <p className="text-4xl">🎉</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">You're Protected, Raju!</h2>
              <p className="mt-2 text-lg text-accent">Shield Plus is now ACTIVE</p>
              <div className="mx-auto mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
                {[
                  ['Policy #', 'GS-BLR-2026-8831'],
                  ['Coverage', '₹1,800/week'],
                  ['Auto-renews', 'Sunday, Mar 22'],
                  ['Payout UPI', upiId],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/55">Redirecting to your dashboard...</p>
            </div>
          ) : null}

          {!showSuccess && currentStep === 1 ? (
            <div className="mt-8 space-y-6">
              <div>
                <h1 className="text-4xl font-semibold text-white">Connect your delivery platform</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
                  We'll securely fetch your earnings history to calculate your personalised risk profile.
                </p>
              </div>

              <div className="grid gap-4">
                <PlatformButton
                  title="🟠 Login with Swiggy"
                  subtitle="Demo flow is wired to the live Swiggy partner profile"
                  active
                  onClick={handleSwiggyLogin}
                  loading={platformState === 'connecting'}
                />
                <PlatformButton title="🔴 Login with Zomato" subtitle="Coming next in the platform rollout" disabled />
                <PlatformButton title="🔵 Login with Amazon Flex" subtitle="Coming next in the platform rollout" disabled />
              </div>

              {platformState === 'verified' ? (
                <div className="rounded-[1.8rem] border border-accent/20 bg-accent/10 p-5">
                  <p className="text-lg font-semibold text-accent">✅ Verified: Raju Kumar</p>
                  <p className="mt-2 text-sm text-white/75">Partner since: January 2021 | Rating: 4.8⭐ | Zone: Bengaluru</p>
                </div>
              ) : null}

              <div className="flex justify-end">
                <Button
                  type="button"
                  disabled={platformState !== 'verified'}
                  onClick={() => setCurrentStep(2)}
                  className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90"
                >
                  Continue →
                </Button>
              </div>
            </div>
          ) : null}

          {!showSuccess && currentStep === 2 ? (
            <div className="mt-8 space-y-6">
              <div>
                <h1 className="text-4xl font-semibold text-white">Analyzing your earnings profile</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
                  Our AI is reviewing your history to calculate your personalised risk score.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-[#080a12] p-5 font-mono text-sm">
                <div className="space-y-3">
                  {typedLines.map((line) => (
                    <div key={line} className="text-accent">
                      {line}
                    </div>
                  ))}
                  {currentTyping ? <div className="text-white/75">{currentTyping}<span className="animate-pulse">|</span></div> : null}
                </div>
              </div>

              {analysisComplete ? (
                <div className="rounded-[1.8rem] border border-primary/20 bg-primary/10 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Recommended plan</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Shield Plus</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                    Based on Bengaluru monsoon patterns and your ₹4,950/week earnings, Shield Plus gives you the best value at your
                    current risk level.
                  </p>
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  disabled={!analysisComplete}
                  onClick={() => setCurrentStep(3)}
                  className="h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90"
                >
                  Continue to Plans →
                </Button>
              </div>
            </div>
          ) : null}

          {!showSuccess && currentStep === 3 ? (
            <div className="mt-8 space-y-8">
              <div>
                <h1 className="text-4xl font-semibold text-white">Choose Plan & Pay</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
                  Shield Plus is preselected based on your earnings volatility, but you can choose any weekly plan.
                </p>
              </div>

              <PlanCards
                selectedPlan={selectedPlan}
                onSelect={(plan) => {
                  setSelectedPlan(plan)
                  setPaymentOpen(true)
                }}
              />

              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>
                <Button type="button" className="rounded-full bg-primary text-white hover:bg-primary/90" onClick={() => setPaymentOpen(true)}>
                  Continue with {activePlan.name}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-md rounded-[2rem] border-white/10 bg-[#0d101b] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Complete Payment</DialogTitle>
            <DialogDescription className="text-white/55">
              {activePlan.name} | {activePlan.price}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">UPI ID</label>
              <Input
                value={upiId}
                onChange={(event) => setUpiId(event.target.value)}
                className="h-12 rounded-xl border-white/10 bg-white/5 text-white"
              />
            </div>

            <Button
              type="button"
              disabled={isProcessingPayment}
              onClick={handlePayment}
              className="h-12 w-full rounded-full bg-primary text-white hover:bg-primary/90"
            >
              {isProcessingPayment ? (
                <>
                  <Spinner />
                  Processing payment...
                </>
              ) : (
                `Pay ${activePlan.price.replace('/week', '')}`
              )}
            </Button>

            <p className="text-center text-sm text-white/45">Secured by Razorpay • IRDAI Licensed</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PlatformButton({
  title,
  subtitle,
  onClick,
  active = false,
  disabled = false,
  loading = false,
}: {
  title: string
  subtitle: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  loading?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between rounded-[1.8rem] border px-5 py-5 text-left transition',
        active && !disabled ? 'border-primary/35 bg-primary/10 hover:bg-primary/15' : 'border-white/10 bg-white/[0.03]',
        disabled ? 'cursor-not-allowed opacity-65' : 'hover:border-primary/35',
      )}
    >
      <div>
        <p className="text-lg font-semibold text-white">{title}</p>
        <p className="mt-2 text-sm text-white/55">{loading ? 'Connecting to Swiggy...' : subtitle}</p>
      </div>
      {loading ? <Spinner className="size-5 text-primary" /> : null}
    </button>
  )
}

function ConfettiOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {Array.from({ length: 48 }).map((_, index) => (
        <span
          key={index}
          className="absolute top-0 h-3 w-2 rounded-full"
          style={{
            left: `${(index / 48) * 100}%`,
            backgroundColor: ['#FF5722', '#00E5FF', '#00C853', '#FFD166'][index % 4],
            animation: `confetti-fall ${2.6 + (index % 5) * 0.16}s linear ${index * 0.04}s forwards`,
          }}
        />
      ))}
    </div>
  )
}
