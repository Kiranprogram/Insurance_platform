'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquare, CloudRain, Smartphone, MapPin } from 'lucide-react'
import { RAJU_STORY, WHATSAPP_MESSAGE } from '@/lib/site-data'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Static imports for premium textures
import speedBg from '@/src/assets/images/bento/speed.png'
import trustBg from '@/src/assets/images/bento/trust.png'
import payoutBg from '@/src/assets/images/bento/payout.png'
import exposureBg from '@/src/assets/images/crisis/exposure.png'

export const StoryBento = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const moveTo = (next: number) => {
    setDirection(next > activeIndex ? 1 : -1)
    setActiveIndex(next)
  }

  const current = RAJU_STORY[activeIndex]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-end mb-12">
           <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-4">User Journey</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Raju. <br/> <span className="text-white/40 italic">A real GigShield story.</span></h2>
           </div>
           <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full border-white/10 bg-white/5"
                onClick={() => moveTo((activeIndex - 1 + RAJU_STORY.length) % RAJU_STORY.length)}
              >
                <ChevronLeft />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full border-white/10 bg-white/5"
                onClick={() => moveTo((activeIndex + 1) % RAJU_STORY.length)}
              >
                <ChevronRight />
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[500px]">
           {/* Visual Panel */}
           <div className="lg:col-span-7 glass-premium rounded-[2.5rem] relative overflow-hidden bg-black/40 p-1">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIndex}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute inset-0 h-full w-full flex items-center justify-center p-8"
               >
                 <StoryVisual visual={current.visual} />
               </motion.div>
             </AnimatePresence>
           </div>

           {/* Content Panel */}
           <div className="lg:col-span-5 glass-premium rounded-[2.5rem] p-8 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-4">PANEL {activeIndex + 1}</p>
                  <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{current.title}</h3>
                  <p className="text-xl text-white/60 leading-relaxed font-medium">
                    {current.text}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex gap-2">
                 {RAJU_STORY.map((_, i) => (
                   <button
                     key={i}
                     onClick={() => moveTo(i)}
                     className={cn(
                       "h-1 px-4 transition-all duration-500 rounded-full",
                       i === activeIndex ? "bg-primary w-8" : "bg-white/10 hover:bg-white/20"
                     )}
                   />
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

function StoryVisual({ visual }: { visual: string }) {
  const bgMap: Record<string, any> = {
    sunset: speedBg,
    notification: trustBg,
    profile: payoutBg,
    payment: payoutBg,
    rain: exposureBg,
    pipeline: trustBg,
    whatsapp: speedBg,
  }

  const bgImage = bgMap[visual] || bgMap.sunset

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2rem]">
      {/* Background Layer */}
      <motion.div
        key={`bg-${visual}`}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage.src} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </motion.div>

      {/* UI Overlay Layer */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <VisualContent visual={visual} />
      </div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[2rem] z-20" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/40 to-transparent z-10" />
    </div>
  )
}

function VisualContent({ visual }: { visual: string }) {
  switch (visual) {
    case 'whatsapp':
      return (
        <div className="w-full max-w-[320px] rounded-[2rem] border border-white/10 bg-[#0b0f15]/90 backdrop-blur-xl p-3 shadow-2xl relative animate-float">
          <div className="rounded-[1.8rem] bg-[#075E54] px-5 py-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">G</div>
            <div>
              <p className="text-xs font-bold text-white leading-none">GigShield Bot</p>
              <p className="text-[8px] text-white/50 font-bold uppercase tracking-widest mt-1">Online</p>
            </div>
          </div>
          <div className="space-y-3 bg-[#101c23]/80 p-5 rounded-b-[1.8rem] min-h-[180px]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mr-6 rounded-xl rounded-tl-sm bg-[#1f2c34] px-4 py-3 text-xs leading-5 text-white/90 shadow-lg border border-white/5 font-medium"
            >
              {WHATSAPP_MESSAGE}
            </motion.div>
          </div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-primary/20 blur-3xl -z-10" />
        </div>
      )

    case 'rain':
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="relative p-10 rounded-full border border-secondary/20 bg-secondary/5 backdrop-blur-md animate-float">
            <CloudRain className="h-20 w-20 text-secondary" strokeWidth={1.5} />
            <motion.div 
              animate={{ height: [0, 80] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1 bg-secondary shadow-[0_0_10px_#00e5ff]"
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-bold text-secondary uppercase tracking-[0.3em]">Threshold Breached</p>
            <p className="text-5xl font-black text-white digital-meter">148<span className="text-2xl">mm</span></p>
          </div>
        </div>
      )

    case 'notification':
      return (
        <div className="w-[300px] glass-premium rounded-3xl p-6 border-white/20 animate-float shadow-[0_0_50px_rgba(0,229,255,0.1)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Swiggy • Just Now</span>
              </div>
              <p className="text-sm font-bold text-white italic">Protect your earnings!</p>
            </div>
          </div>
          <p className="text-xs text-white/60 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
            Heavy rain forecast tonight. Get <span className="text-primary font-bold">GigShield AI</span> starting @ ₹49/week.
          </p>
        </div>
      )

    case 'profile':
      return (
        <div className="relative group">
          <div className="w-64 h-64 rounded-full border-2 border-dashed border-secondary/30 flex items-center justify-center p-4">
            <div className="w-full h-full rounded-full border border-secondary/50 bg-secondary/10 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-secondary/5 animate-pulse" />
               <Smartphone className="h-16 w-16 text-secondary mb-4 opacity-80" />
               <div className="text-center">
                 <p className="text-3xl font-black text-white digital-meter">68<span className="text-sm ml-1 text-secondary">/100</span></p>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Risk Score</p>
               </div>
               
               {/* Scan Line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-scan-line shadow-[0_0_15px_#00e5ff]" />
            </div>
          </div>
          {/* Kannada Text Indicator */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-2xl">
            <p className="text-xl font-bold text-white italic">ಕನ್ನಡ</p>
          </div>
        </div>
      )

    case 'payment':
      return (
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-24 w-24 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent shadow-[0_0_40px_rgba(0,200,83,0.3)]"
          >
            <motion.svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="h-12 w-12"
              stroke="currentColor" 
              strokeWidth={3}
            >
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                d="M5 13l4 4L19 7" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </motion.svg>
          </motion.div>
          <div className="text-center">
            <p className="text-4xl font-black text-white italic">₹89 Paid</p>
            <p className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mt-1">raju@okaxis</p>
          </div>
        </div>
      )

    case 'pipeline':
      return (
        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          <div className="grid grid-cols-2 gap-4 w-full">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 glass-premium rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-center z-10">
                   <p className="text-xs font-bold text-primary">₹{800 + i * 100}</p>
                   <p className="text-[8px] text-white/40 font-bold uppercase">Dispatched</p>
                </div>
                <motion.div 
                  animate={{ x: [-100, 200] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  className="absolute bottom-0 left-0 h-0.5 w-20 bg-primary shadow-[0_0_10px_#ff5722]"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
             <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
             <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Payout Pipeline Active</p>
          </div>
        </div>
      )

    default:
      return (
        <div className="relative group">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="absolute inset-0 scale-150 opacity-20"
          >
            <div className="w-full h-full border border-dashed border-primary rounded-full" />
          </motion.div>
          <div className="h-32 w-32 rounded-3xl glass-premium flex items-center justify-center relative overflow-hidden">
             <MapPin className="h-16 w-16 text-primary opacity-80" strokeWidth={1} />
             <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
          </div>
        </div>
      )
  }
}
