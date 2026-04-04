'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Sparkles, ShieldCheck } from 'lucide-react'
import { WEEKLY_PLANS } from '@/lib/site-data'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const PricingBento = () => {
  return (
    <section id="plans" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4"
          >
            Pricing
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Weekly pricing for <br/> <span className="gradient-text text-glow italic">weekly risks.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/50">
            Deducted directly from your earnings. No bank visits. 
            No paperwork. No claim forms. Ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WEEKLY_PLANS.map((plan, i) => (
            <motion.div
              key={plan.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-premium p-8 rounded-[2.5rem] flex flex-col justify-between border-2 ${
                plan.badge ? 'border-primary shadow-[0_0_40px_rgba(255,87,34,0.15)] shadow-primary/20' : 'border-white/5'
              }`}
            >
              <div>
                {plan.badge && (
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-white/40 font-semibold tracking-wider">/ WEEK</span>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/60 text-sm font-medium">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button asChild size="lg" className={`w-full h-14 rounded-full text-lg font-bold transition-transform hover:scale-105 active:scale-95 ${
                plan.badge ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}>
                <Link href="/onboarding">{plan.buttonLabel}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-white/30 font-medium italic">
          * Premium auto-deducted from your weekly platform earnings. DPDP Act compliant.
        </div>
      </div>
    </section>
  )
}
