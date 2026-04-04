'use client'
 
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
 
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
 
const navLinks = [
  { href: '/#problem', label: 'Problem' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/live', label: 'Live Feed' },
  { href: '/insurer', label: 'Insurer Portal' },
  { href: '/about', label: 'About' },
]

function ShieldLogo() {
  return (
    <div className="relative h-10 w-10 flex items-center justify-center group cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* SVG Shield-G Logo */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full drop-shadow-[0_0_15px_rgba(255,107,0,0.3)]"
      >
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
        
        {/* Main Shield Shape */}
        <path
          d="M50 5L10 25V45C10 65 25 85 50 95C75 85 90 65 90 45V25L50 5Z"
          fill="url(#shieldGradient)"
          className="transition-all duration-300 group-hover:brightness-110"
        />
        
        {/* Stylized G Cutout */}
        <path
          d="M65 40H40V60H55V50H50V45H60V65H35V35H65V40ZM50 78C38 72 30 60 30 45V28L50 18L70 28V45C70 60 62 72 50 78Z"
          fill="#0f0f1e"
          fillRule="evenodd"
          clipRule="evenodd"
          className="transition-opacity duration-300 opacity-90"
        />
      </svg>
    </div>
  )
}
 
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
 
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
 
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-in-out',
        isScrolled 
          ? 'backdrop-blur-3xl bg-slate-950/30 border-b border-white/5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.3)]' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4 group">
          <ShieldLogo />
          <div className="hidden sm:block">
            <p className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase transition-colors group-hover:text-primary">GIGSHIELD AI</p>
            <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">Instant protection for India's workers</p>
          </div>
        </Link>
 
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link, idx) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="relative text-sm font-medium text-white/70 transition-all hover:text-white group"
            >
              <span className="relative z-10">{link.label}</span>
              <span 
                className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-primary transition-all duration-300 group-hover:w-full"
              />
            </Link>
          ))}
        </div>
 
        <div className="hidden items-center gap-4 md:flex">
          <Button asChild variant="ghost" size="sm" className="text-white/80 hover:bg-white/5 hover:text-white transition-all">
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild size="sm" className="relative group overflow-hidden rounded-full bg-primary px-6 text-white transition-all hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]">
            <Link href="/onboarding" className="relative z-10 flex items-center gap-2">
              Get Protected
            </Link>
          </Button>
        </div>
 
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className={cn(
            "rounded-xl border border-white/10 p-2.5 text-white transition-all md:hidden",
            isOpen ? "bg-white/10 border-primary/50" : "bg-white/5"
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
 
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-slate-950/90 px-4 py-8 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <div className="mx-auto max-w-7xl space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.href}
                >
                  <Link
                    href={link.href}
                    className="block rounded-2xl bg-white/5 px-4 py-4 text-lg font-medium text-white/80 transition-all hover:bg-primary/20 hover:text-white active:scale-95"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <Button asChild variant="outline" className="rounded-2xl border-white/10 bg-white/5 text-white py-6">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="rounded-2xl bg-primary text-white py-6">
                  <Link href="/onboarding" onClick={() => setIsOpen(false)}>Setup</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
