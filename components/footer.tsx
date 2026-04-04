import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b14]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-base font-black text-[#0f0f1e]">
              G
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-white/50">GIGSHIELD AI</p>
              <p className="text-lg font-semibold text-white">Weather-grade protection for gig workers</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/60">
            Parametric protection for rain, AQI, bandhs, and disruption days across India's platform economy.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Explore</h3>
          <div className="space-y-3 text-sm text-white/70">
            <Link href="/#problem" className="block transition hover:text-primary">
              The Problem
            </Link>
            <Link href="/#plans" className="block transition hover:text-primary">
              Plans
            </Link>
            <Link href="/live" className="block transition hover:text-primary">
              Live Command Center
            </Link>
            <Link href="/dashboard" className="block transition hover:text-primary">
              Worker Dashboard
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Company</h3>
          <div className="space-y-3 text-sm text-white/70">
            <Link href="/insurer" className="block transition hover:text-primary">
              For Platforms
            </Link>
            <Link href="/about" className="block transition hover:text-primary">
              About the Team
            </Link>
            <Link href="/onboarding" className="block transition hover:text-primary">
              Get Protected
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Powered by Guidewire PolicyCenter API. Built at DEVTrails 2026.</p>
          <p>DPDP Act mindful. IRDAI-ready workflows. Bengaluru-first launch.</p>
        </div>
      </div>
    </footer>
  )
}
