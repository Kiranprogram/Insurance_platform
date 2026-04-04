import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { WEEKLY_PLANS } from '@/lib/site-data'
import { cn } from '@/lib/utils'

interface PlanCardsProps {
  selectedPlan?: 'basic' | 'plus' | 'max'
  onSelect?: (plan: 'basic' | 'plus' | 'max') => void
  className?: string
}

export function PlanCards({ selectedPlan, onSelect, className }: PlanCardsProps) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-3', className)}>
      {WEEKLY_PLANS.map((plan) => {
        const isSelected = selectedPlan ? selectedPlan === plan.slug : plan.slug === 'plus'

        return (
          <div
            key={plan.slug}
            className={cn(
              'relative flex h-full flex-col rounded-[2rem] border border-white/10 bg-[#111322] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition duration-300',
              plan.slug === 'plus' ? 'lg:-mt-4 lg:mb-4 lg:scale-[1.02]' : '',
              isSelected ? 'border-primary/70 bg-[#17192b]' : 'hover:border-primary/40',
            )}
          >
            {plan.badge ? (
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                {plan.badge}
              </div>
            ) : null}

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                  Weekly
                </span>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">{plan.price}</p>
                <p className="mt-2 text-sm text-white/60">{plan.weeklyCoverage}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-white/80">
              {plan.features.map((feature) => (
                <div key={feature} className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              {onSelect ? (
                <Button
                  type="button"
                  onClick={() => onSelect(plan.slug)}
                  className={cn(
                    'w-full rounded-full',
                    plan.slug === 'plus'
                      ? 'h-12 bg-primary text-white hover:bg-primary/90'
                      : 'h-11 bg-white/5 text-white hover:bg-white/10',
                  )}
                >
                  {plan.buttonLabel}
                </Button>
              ) : (
                <Button
                  asChild
                  className={cn(
                    'w-full rounded-full',
                    plan.slug === 'plus'
                      ? 'h-12 bg-primary text-white hover:bg-primary/90'
                      : 'h-11 bg-white/5 text-white hover:bg-white/10',
                  )}
                >
                  <Link href="/onboarding">{plan.buttonLabel}</Link>
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
