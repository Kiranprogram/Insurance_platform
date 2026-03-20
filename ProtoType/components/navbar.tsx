'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#problem', label: 'Problem' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/live', label: 'Live Feed' },
  { href: '/insurer', label: 'Insurer Portal' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 ease-out',
        isScrolled ? 'backdrop-blur-md bg-[#1a1a2e]/80 border-white/10' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-base font-black text-[#0f0f1e]">
            G
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-[0.25em] text-white/50">GIGSHIELD AI</p>
            <p className="text-base font-semibold text-white">Instant protection for India's workers</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white/70 transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full bg-primary px-5 text-white hover:bg-primary/90">
            <Link href="/onboarding">Get Protected</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white transition hover:border-primary/50 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#111123]/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="space-y-2 border-t border-white/10 pt-3">
              <Button asChild variant="ghost" className="w-full justify-center text-white hover:bg-white/10 hover:text-white">
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild className="w-full rounded-full bg-primary text-white hover:bg-primary/90">
                <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                  Get Protected
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
