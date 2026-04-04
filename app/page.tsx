'use client'

import React from 'react'
import { HeroModern } from '@/components/sections/hero-modern'
import { ProblemBento } from '@/components/sections/problem-bento'
import { LiveFeedBento } from '@/components/sections/live-feed-bento'
import { PricingBento } from '@/components/sections/pricing-bento'
import { TrustStackMotion } from '@/components/sections/trust-stack-motion'
import { StoryBento } from '@/components/sections/story-bento'
import { FooterCta } from '@/components/sections/footer-cta'

/**
 * GIGSHIELD AI - LANDING PAGE (Expert Transformation)
 * Using Bento Grid systems, GSAP Motion Paths, and ShaderGradients.
 * 
 * Strategy:
 * 1. Immersive Hero (Agent 3) 
 * 2. Bento Statistics (Agent 1)
 * 3. User Journey Bento (Agent 3)
 * 4. Mission Control Feed (Agent 3)
 * 5. Weekly Risk Pricing (Agent 3)
 * 6. High-Fidelity Trust Stack (Agent 2)
 */

export default function Home() {
  return (
    <div className="bg-transparent text-white selection:bg-primary/30">
      <HeroModern />
      <ProblemBento />
      <StoryBento />
      <LiveFeedBento />
      <PricingBento />
      <TrustStackMotion />
      <FooterCta />
    </div>
  )
}
