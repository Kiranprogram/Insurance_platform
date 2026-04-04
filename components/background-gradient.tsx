'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ShaderGradient components to avoid SSR/Hydration errors
const ShaderGradientCanvas = dynamic(
  () => import('@shadergradient/react').then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
)
const ShaderGradient = dynamic(
  () => import('@shadergradient/react').then((mod) => mod.ShaderGradient),
  { ssr: false }
)

export const BackgroundGradient = () => {
  return (
    <div className="fixed inset-0 -z-30 h-screen w-screen opacity-30 pointer-events-none">
      <Suspense fallback={<div className="h-full w-full bg-[#06080f]" />}>
        <ShaderGradientCanvas
          style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
        >
          <ShaderGradient
            type='sphere'
            cDistance={8}
            cPolarAngle={100}
            color1='#ff5722'
            color2='#00e5ff'
            color3='#ffd166'
            animate='on'
            uSpeed={0.05}
            uStrength={1.5}
            uDensity={1.5}
            grain='on'
          />
        </ShaderGradientCanvas>
      </Suspense>
    </div>
  )
}
