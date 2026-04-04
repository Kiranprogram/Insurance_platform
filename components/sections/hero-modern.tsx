'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { HERO_TICKER_ITEMS } from '@/lib/site-data'
import { cn } from '@/lib/utils'

// Static imports for premium textures
import speedBg from '@/src/assets/images/bento/speed.png'
import trustBg from '@/src/assets/images/bento/trust.png'
import payoutBg from '@/src/assets/images/bento/payout.png'

export const HeroModern = () => {
  const tickerItems = useMemo(() => HERO_TICKER_ITEMS, [])
  const tickerRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!tickerRef.current) return

    const items = tickerRef.current.children
    const totalWidth = Array.from(items).reduce((acc, item) => acc + item.clientWidth + 48, 0) // 48 is gap-12

    gsap.to(tickerRef.current, {
      x: `-=${totalWidth / 2}`,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % (totalWidth / 2))
      }
    })
  }, { scope: tickerRef })

  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content - Main Messaging */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl glass-premium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Monsoon-grade protection for India&apos;s gig economy
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter"
            >
              When Bengaluru <br/> 
              <span className="text-white/40 italic font-medium">sleeps through</span> <br/>
              the storm, <span className="gradient-text text-glow">GigShield pays.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg sm:text-xl text-white/60 leading-relaxed"
            >
              Parametric income protection for delivery workers. No paperwork. No claims. 
              AI-verified payouts when rain, AQI spikes, or city shutdowns wipe out your earnings.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button asChild size="lg" className="h-14 rounded-full bg-primary px-8 text-lg font-semibold hover:scale-105 transition-transform">
                <Link href="/onboarding">
                  Get Protected <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 rounded-full border-white/10 bg-white/5 px-8 text-lg hover:bg-white/10 backdrop-blur-md">
                <Link href="/live">Watch Live Feed</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Bento Stats Card Group */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full">
            <BentoHeroCard 
              delay={0.4}
              icon={<Zap className="text-secondary h-6 w-6" />}
              value="8.3 min"
              label="Avg Payout Time"
              className="col-span-2 row-span-1"
              bgImage={speedBg.src}
            />
            <BentoHeroCard 
              delay={0.5}
              icon={<ShieldCheck className="text-accent h-6 w-6" />}
              value="97.4%"
              label="Claim Approval"
              bgImage={trustBg.src}
            />
            <BentoHeroCard 
              delay={0.6}
              icon={<BarChart3 className="text-primary h-6 w-6" />}
              value="₹1.1 Cr"
              label="Paid this month"
              bgImage={payoutBg.src}
            />
          </div>
        </div>

        {/* Marquee Ticker */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
        >
          <div 
            ref={tickerRef}
            className="flex items-center gap-12 py-6"
          >
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center gap-4 whitespace-nowrap px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-white/10">
                  <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-tight">{item.name}</span>
                  <span className="text-[10px] text-primary/80 font-medium">{item.city} — {item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BentoHeroCard({ value, label, icon, delay, className, bgImage }: { value: string, label: string, icon: React.ReactNode, delay: number, className?: string, bgImage?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass-premium p-6 rounded-[2rem] flex flex-col justify-between group hover:border-primary/50 transition-all duration-500 shadow-2xl relative overflow-hidden",
        className
      )}
    >
      {/* Background Image Layer */}
      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 pointer-events-none">
          <img src={bgImage} alt="" className="h-full w-full object-cover mix-blend-overlay" />
        </div>
      )}
      
      <div className="relative z-10 h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
        {icon}
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">{value}</h3>
        <p className="text-sm text-white/40 mt-1 uppercase tracking-wider font-semibold">{label}</p>
      </div>
    </motion.div>
  )
}
