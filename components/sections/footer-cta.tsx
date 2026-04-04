import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PLATFORM_BADGES } from '@/lib/site-data'

export const FooterCta = () => {
  return (
    <footer className="py-24 space-y-12">
      <div className="container mx-auto px-4">
        {/* Final CTA */}
        <div className="glass-premium rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
           <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                Don't let the weather <span className="text-white/40 italic">decide your rent.</span>
              </h2>
              <p className="text-xl text-white/60 mb-12 leading-relaxed font-medium">
                Connect your platform, let GigShield score your disruption risk, 
                and activate a weekly shield in under three minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <Button asChild size="lg" className="h-16 rounded-full bg-primary px-10 text-xl font-bold hover:scale-105 transition-transform">
                   <Link href="/onboarding">Start Onboarding <ArrowRight className="ml-2 h-6 w-6" /></Link>
                 </Button>
                 <Button asChild variant="outline" size="lg" className="h-16 rounded-full border-white/10 bg-white/5 px-10 text-xl font-bold hover:bg-white/10 backdrop-blur-md">
                   <Link href="/dashboard">See Demo Dashboard</Link>
                 </Button>
              </div>
           </div>
           
           <div className="absolute top-0 left-0 h-64 w-64 bg-primary/20 blur-[120px] -z-10" />
           <div className="absolute bottom-0 right-0 h-64 w-64 bg-secondary/20 blur-[120px] -z-10" />
        </div>

        {/* Platform Integration Logos */}
        <div className="glass-premium rounded-[2.5rem] p-10 mt-12 bg-black/20 border-white/5">
            <div className="flex flex-col lg:flex-row gap-8 justify-between items-center text-center lg:text-left">
               <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Platform Integrations</h3>
                  <p className="text-sm text-white/40 font-bold uppercase tracking-widest leading-loose">Secure OAuth 2.0 • DPDP Act Compliant</p>
               </div>
               <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
                 {PLATFORM_BADGES.map((badge) => (
                   <div key={badge} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/60 hover:bg-white/10 transition-colors">
                     {badge}
                   </div>
                 ))}
               </div>
            </div>
        </div>
      </div>
    </footer>
  )
}
