'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { CloudRain, ThermometerSun, AlertTriangle, TrendingDown } from 'lucide-react'
import { DISRUPTION_ROWS } from '@/lib/site-data'

// Static imports for premium textures
import exposureBg from '@/src/assets/images/crisis/exposure.png'
import gapBg from '@/src/assets/images/crisis/gap.png'

const problemStats = [
  {
    title: '450M+',
    label: 'Gig Workers Exposed',
    description: 'Workers in India have zero formal income protection against weather shocks.',
    icon: <AlertTriangle className="h-4 w-4 text-primary" />,
    className: 'md:col-span-2',
    start: 0,
    end: 450,
    suffix: 'M+',
    bgImage: exposureBg.src,
    overlayColor: 'rgba(255, 87, 34, 0.05)'
  },
  {
    title: '< 3%',
    label: 'Income Protected',
    description: 'The coverage gap is massive. Traditional insurance failed this sector.',
    icon: <TrendingDown className="h-4 w-4 text-destructive" />,
    className: 'md:col-span-1',
    start: 97,
    end: 3,
    suffix: '%',
    prefix: '< ',
    bgImage: gapBg.src,
    overlayColor: 'rgba(255, 59, 48, 0.15)'
  },
  {
    title: '₹1.2L Cr',
    label: 'Annual Earnings At Risk',
    description: 'Volatility from disruption days wipes out billions in potential livelihood.',
    icon: <CloudRain className="h-4 w-4 text-secondary" />,
    className: 'md:col-span-3 border-t-2 border-t-destructive/20',
    start: 0,
    end: 1.2,
    prefix: '₹',
    suffix: 'L Cr',
    bgImage: exposureBg.src,
    overlayColor: 'rgba(255, 59, 48, 0.1)'
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

export const ProblemBento = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)

  // GSAP only for count-up numbers — no layout/opacity control
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const triggers: ScrollTrigger[] = []

    statRefs.current.forEach((el, i) => {
      if (!el) return
      const target = problemStats[i]
      const obj = { value: target.start }

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            value: target.end,
            duration: 2.5,
            ease: 'expo.out',
            onUpdate: () => {
              const flicker = Math.random() > 0.92
              const val = `${target.prefix || ''}${obj.value.toFixed(target.end % 1 === 0 ? 0 : 1)}${target.suffix || ''}`
              if (el) {
                el.textContent = flicker ? '███,███' : val
                el.style.opacity = flicker ? '0.4' : '1'
                el.style.color = flicker ? '#FF3B30' : ''
              }
            },
            onComplete: () => {
              if (el) {
                el.textContent = `${target.prefix || ''}${target.end.toFixed(target.end % 1 === 0 ? 0 : 1)}${target.suffix || ''}`
                el.style.opacity = '1'
                el.style.color = ''
              }
            }
          })
        }
      })
      triggers.push(st)
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <section id="problem" className="py-24 relative overflow-hidden">


      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-ping" />
            <span className="text-sm font-bold uppercase tracking-[0.4em] text-secondary">The Crisis</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-8 leading-[1.1]"
          >
            One storm can erase a <br />
            <span className="text-white/40 italic font-medium">worker&apos;s entire week.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 max-w-2xl leading-relaxed"
          >
            Delivery workers absorb the full shock of weather and city shutdowns.
            Paperwork economics never worked for them.
            <span className="text-primary font-semibold ml-1">GigShield AI changes that.</span>
          </motion.p>
        </div>

        {/* Bento Grid — always visible, Framer Motion handles entrance */}
        <div ref={containerRef}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <BentoGrid className="mb-12">
              {problemStats.map((item, i) => (
                <motion.div key={item.label} variants={cardVariants} className={item.className}>
                  <BentoGridItem
                    title={
                      <div className="relative group">
                        <span
                          ref={el => { statRefs.current[i] = el }}
                          className="stat-value text-6xl font-bold tracking-tighter digital-meter block mb-4 group-hover:text-primary transition-colors duration-500"
                        >
                          {item.title}
                        </span>
                        <div className="h-1 w-12 bg-primary/40 rounded-full group-hover:w-full transition-all duration-700" />
                      </div>
                    }
                    description={<p className="text-white/60 leading-relaxed text-lg max-w-[280px]">{item.description}</p>}
                    header={
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">{item.icon}</div>
                        <span className="text-xs uppercase tracking-widest text-white/40 font-bold">{item.label}</span>
                      </div>
                    }
                    bgImage={item.bgImage}
                    className="relative group overflow-hidden border border-white/5 hover:border-white/20 transition-all rounded-[3rem] p-10 bg-black/40 backdrop-blur-xl h-full"
                  >
                    {/* Colour overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity group-hover:opacity-60"
                      style={{ backgroundColor: item.overlayColor }}
                    />
                    {/* Scanline */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
                  </BentoGridItem>
                </motion.div>
              ))}
            </BentoGrid>
          </motion.div>

          {/* EKG Trigger visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="glass-premium rounded-[3rem] overflow-hidden border border-white/10 group hover:border-primary/30 transition-all"
          >
            <div className="p-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <ThermometerSun className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Live Disruption Triggers</h3>
                    <p className="text-white/40">Real-time threshold monitoring via IMD/Tomorrow.io</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {DISRUPTION_ROWS.slice(0, 4).map((row, i) => (
                    <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 group/tip hover:bg-white/10 hover:border-primary/20 transition-all">
                      <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">{row[0]}</div>
                      <div className="text-sm font-bold text-white mb-2">{row[1]}</div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <div className="text-sm font-bold text-primary">{row[2]} impact</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pulsing SVG EKG */}
              <div className="w-full lg:w-[300px] h-[150px] relative bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden flex items-center justify-center p-4">
                <svg width="100%" height="80" viewBox="0 0 200 80" className="opacity-40">
                  <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <motion.path
                    d="M0 40 L40 40 L50 20 L60 60 L70 40 L110 40 L120 10 L130 70 L140 40 L200 40"
                    fill="transparent"
                    stroke="#FF5722"
                    strokeWidth="2"
                    animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-4 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary animate-pulse">Scanning Bio-Grid...</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
