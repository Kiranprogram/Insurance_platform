export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="section-shell overflow-hidden px-6 py-10 sm:px-8 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">About GigShield</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-white sm:text-6xl">Built in 72 hours. For 450 million people.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            We built GigShield at Guidewire DEVTrails 2026 because the gig economy deserved better than "apply for insurance and wait
            45 days".
          </p>
        </section>

        <section className="section-shell px-6 py-10 sm:px-8">
          <blockquote className="max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            “When it rains in Bengaluru, Raju should sleep peacefully — knowing that by morning, his earnings are protected.”
          </blockquote>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Arjun Sharma', 'Full Stack Engineer', 'Built the real-time pipeline'],
            ['Kavya Nair', 'ML Engineer', 'Designed the fraud detection GNN'],
            ['Rohit Verma', 'Product Designer', "Crafted Raju's journey UX"],
            ['Sneha Iyer', 'Actuary & Data', 'Calibrated the parametric models'],
          ].map(([name, role, body]) => (
            <div key={name} className="section-shell p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-secondary">{role}</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{name}</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">{body}</p>
            </div>
          ))}
        </section>

        <section className="section-shell px-6 py-8 sm:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['72 hours to build', 'Hackathon sprint'],
              ['450M workers to serve', 'Why the problem matters'],
              ['₹1.2L Cr problem to solve', 'Annual volatility to attack'],
              ['1 hackathon to start', 'But not where this ends'],
            ].map(([title, subtitle]) => (
              <div key={title} className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] px-5 py-5">
                <p className="text-2xl font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm text-white/55">{subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell px-6 py-10 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Guidewire</p>
          <div className="mt-5 space-y-4 text-lg text-white/75">
            <p>Powered by Guidewire PolicyCenter API</p>
            <p>Built at DEVTrails 2026 — March 2026</p>
            <p>Submitted to the Innovation Track</p>
          </div>
        </section>
      </div>
    </div>
  )
}
