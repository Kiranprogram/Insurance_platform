'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Cloud, Brain, CreditCard, Zap } from 'lucide-react'
import { TRUST_POINTS } from '@/lib/site-data'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  { title: 'Weather APIs', icon: <Cloud />, description: 'Hyper-local data gathering' },
  { title: 'AI Engine', icon: <Brain />, description: 'Parametric threshold analysis' },
  { title: 'Fraud Check', icon: <ShieldCheck />, description: 'Proof-of-work validation' },
  { title: 'UPI Payout', icon: <CreditCard />, description: 'Instant liquidity settlement' },
]

export const TrustStackMotion = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const pulseRef = useRef<SVGCircleElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const [pathData, setPathData] = useState('')
  const [activeStep, setActiveStep] = useState(-1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Calculate dynamic path coordinate centers
  useGSAP(() => {
    if (!mounted || !leftColumnRef.current) return

    const updatePath = () => {
      const containerRect = leftColumnRef.current!.getBoundingClientRect()
      const points: { x: number, y: number }[] = []

      iconRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          points.push({
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
          })
        }
      })

      if (points.length < 2) return

      // Generate Rounded 90-degree path
      const radius = 30
      let d = `M ${points[0].x} ${points[0].y}`
      
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i]
        const p2 = points[i + 1]
        
        // Corner point (Horizontal first, then Vertical)
        const cx = p2.x
        const cy = p1.y

        // Line to start of corner curve
        const xSign = p2.x > p1.x ? 1 : -1
        const ySign = p2.y > p1.y ? 1 : -1

        d += ` L ${cx - radius * xSign} ${cy}`
        d += ` Q ${cx} ${cy} ${cx} ${cy + radius * ySign}`
        d += ` L ${p2.x} ${p2.y}`
      }
      setPathData(d)
    }

    // Wrap in a small timeout to ensure initial layout is stable
    const timer = setTimeout(updatePath, 100)
    window.addEventListener('resize', updatePath)
    
    // Path Progress and Pulse Animation
    if (pathRef.current && pathData) {
      const length = pathRef.current.getTotalLength()
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 30%',
          end: 'bottom 70%',
          scrub: 1,
          onUpdate: (self) => {
             const progress = self.progress
             setActiveStep(Math.floor(progress * (stages.length + 0.5)))
          }
        },
        overwrite: 'auto'
      })

      tl.to(pathRef.current, { strokeDashoffset: 0, ease: 'none' })
      
      if (pulseRef.current) {
        tl.to(pulseRef.current, {
           motionPath: {
             path: pathRef.current,
             align: pathRef.current,
             alignOrigin: [0.5, 0.5],
             autoRotate: true
           },
           duration: tl.duration(),
           ease: 'none'
        }, 0)
      }
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updatePath)
    }
  }, { dependencies: [mounted, pathData === ''], scope: containerRef })

  if (!mounted) return null

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4"
          >
            Verification Protocol
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How we verify the <br/> 
            <span className="text-white/40 italic">unverifiable.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative min-h-[600px] flex flex-col justify-between py-8" ref={leftColumnRef}>
            {/* Dynamic Circuitry Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF5722" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FF5722" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path 
                ref={pathRef}
                d={pathData} 
                className="stroke-primary/20 fill-none transition-opacity duration-500" 
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path 
                d={pathData} 
                className="stroke-primary fill-none opacity-20" 
                strokeWidth="1"
                filter="url(#glow)"
              />
              {/* Pulse Particle */}
              <circle 
                ref={pulseRef}
                r="6" 
                fill="#FF5722" 
                className="shadow-[0_0_15px_#ff5722]"
                style={{ filter: 'drop-shadow(0 0 8px #FF5722)' }}
              />
            </svg>

            {stages.map((stage, i) => (
              <div 
                key={i}
                className={`relative flex items-center gap-8 group ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'}`}
              >
                {/* Icon Container */}
                <div 
                  ref={el => { iconRefs.current[i] = el }}
                  className={`h-20 w-20 rounded-3xl flex items-center justify-center transition-all duration-500 relative z-20 
                    ${activeStep >= i 
                      ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(255,87,34,0.3)]' 
                      : 'bg-white/5 border-white/10'
                    } border backdrop-blur-2xl`}
                >
                  {React.cloneElement(stage.icon as React.ReactElement<any>, { 
                    className: `h-10 w-10 transition-colors duration-500 ${activeStep >= i ? 'text-primary' : 'text-white/40'}` 
                  })}
                  
                  {/* Status Indicator */}
                  {activeStep >= i && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full border-2 border-background flex items-center justify-center"
                    >
                      <Zap className="h-3 w-3 text-white fill-current" />
                    </motion.div>
                  )}
                </div>

                {/* Label */}
                <div className="max-w-[200px]">
                  <h3 className={`text-xl font-bold transition-colors duration-500 ${activeStep >= i ? 'text-white' : 'text-white/40'}`}>
                    {stage.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-1">STAGE 0{i + 1}</p>
                  <p className="text-sm text-white/40 leading-tight">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column Details */}
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Immutable Verification</h3>
              <p className="text-white/40">Our multi-layered stack ensures 100% fraud protection and zero-latency triggers.</p>
            </div>
            
            {TRUST_POINTS.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "circOut" }}
                className="glass-premium p-8 rounded-[2.5rem] flex items-start gap-6 border border-white/5 relative group hover:border-primary/20 transition-colors"
              >
                <div className="mt-1.5 h-3 w-3 rounded-full bg-primary/40 group-hover:bg-primary shadow-[0_0_15px_rgba(255,87,34,0.5)] transition-all" />
                <div>
                   <p className="text-white/80 font-medium leading-relaxed text-lg">{point}</p>
                   <div className="mt-4 flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-tighter">Verified Protocol</div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
