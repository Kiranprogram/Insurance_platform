'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Radio, CreditCard, Users, Zap } from 'lucide-react'
import { LIVE_SECTION_EVENTS } from '@/lib/site-data'
import { formatIndianNumber, formatCrore } from '@/lib/format'

export const LiveFeedBento = () => {
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
    const statsInterval = setInterval(() => {
      setStats((current) => ({
        workers: current.workers + Math.floor(Math.random() * 35) + 8,
        payoutCrore: Number((current.payoutCrore + Math.random() * 0.04).toFixed(2)),
        avgMinutes: Number((Math.max(7.8, current.avgMinutes + (Math.random() > 0.5 ? 0.1 : -0.1))).toFixed(1)),
        approvalRate: Number((Math.max(96.9, Math.min(98.2, current.approvalRate + (Math.random() > 0.5 ? 0.1 : -0.1)))).toFixed(1)),
      }))
    }, 5000)

    const feedInterval = setInterval(() => {
      const next = LIVE_SECTION_EVENTS[Math.floor(Math.random() * LIVE_SECTION_EVENTS.length)]
      setFeed((current) => [{ ...next, id: Date.now() }, ...current].slice(0, 5))
    }, 3500)

    return () => {
      clearInterval(statsInterval)
      clearInterval(feedInterval)
    }
  }, [])

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-end mb-12">
           <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">Real-time Operations</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Mission Control: <br/> <span className="gradient-text text-glow">Protection in-flight.</span></h2>
              <p className="text-lg text-white/50">
                Every payout signal blends real weather data, worker activity, peer validation, and platform context.
              </p>
           </div>
           <div className="hidden lg:flex items-center gap-3 glass-premium px-4 py-2 rounded-full border-primary/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-primary">System Live • {stats.avgMinutes}m Payout</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Left Stat Grid */}
           <div className="lg:col-span-4 grid grid-cols-1 gap-4">
              <StatCard title="Active Shields" value={formatIndianNumber(stats.workers)} icon={<Users className="text-secondary" />} subText="Workers protected today" />
              <StatCard title="Total Payouts" value={formatCrore(stats.payoutCrore)} icon={<CreditCard className="text-primary" />} subText="Auto-paid this month" />
              <StatCard title="Confidence" value={`${stats.approvalRate}%`} icon={<ShieldCheck className="text-accent" />} subText="Validation accuracy" />
           </div>

           {/* Right Feed Panel */}
           <div className="lg:col-span-8 glass-premium rounded-[2.5rem] p-8 relative overflow-hidden bg-black/20">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Automated Event Stream
                 </h3>
                 <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/5">
                    Updated Every 3.5s
                 </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {feed.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 50, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="glass-premium p-5 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                           {item.city[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{item.city}</span>
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                            <span className="text-white/60 text-sm">{item.event}</span>
                          </div>
                          <p className="text-[12px] font-semibold text-white/30 uppercase tracking-widest mt-1">
                            {formatIndianNumber(item.workers)} WORKERS • {item.amount} DISBURSED
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-widest">
                         <Zap className="h-3 w-3" />
                         AUTO-PAID
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
           </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ title, value, subText, icon }: { title: string, value: string, subText: string, icon: React.ReactNode }) {
  return (
    <div className="glass-premium p-6 rounded-[2rem] border-white/5 bg-white/[0.02]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold uppercase tracking-wider text-white/30">{title}</span>
        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-white tracking-tighter">{value}</p>
      <p className="text-xs text-white/40 font-medium mt-1 uppercase tracking-widest">{subText}</p>
    </div>
  )
}

import { ShieldCheck } from 'lucide-react'
