'use client'

import Link from 'next/link'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { EssGauge } from '@/components/ess-gauge'
import { Button } from '@/components/ui/button'
import { DASHBOARD_CLAIMS, DASHBOARD_FORECAST } from '@/lib/site-data'

const forecastColors = DASHBOARD_FORECAST.map((item) =>
  item.day === 'Wed' || item.day === 'Thu' ? '#FF5722' : '#4f6b8a',
)

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="section-shell p-7 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <EssGauge />

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-secondary">Raju Kumar • Bengaluru</p>
              <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Shield Plus is working exactly when you need it.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
                Active weekly plan. Auto-renewing from Swiggy earnings. High-risk signals are stacked on Wednesday and Thursday, with
                rain still the biggest earnings disruption in HSR Layout.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/65">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Shield Plus</span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">₹89/week</span>
                <span className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-accent">Coverage active</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['This Week', '₹1,800', 'Coverage Active', 'text-white'],
            ['Month Premium', '₹356', '4 weeks paid', 'text-white'],
            ['Claims Received', '₹1,784', '2 events', 'text-white'],
            ['Net Benefit', '+₹1,428', 'This month', 'text-accent'],
          ].map(([title, value, subtitle, color]) => (
            <div key={title} className="section-shell p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-white/45">{title}</p>
              <p className={`mt-4 text-4xl font-semibold ${color}`}>{value}</p>
              <p className="mt-2 text-sm text-white/58">{subtitle}</p>
            </div>
          ))}
        </section>

        <section className="section-shell overflow-hidden">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-2xl font-semibold text-white">Recent claims</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/[0.03] uppercase tracking-[0.2em] text-white/45">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Event Type</th>
                  <th className="px-6 py-4 font-medium">Zone</th>
                  <th className="px-6 py-4 font-medium">Coverage</th>
                  <th className="px-6 py-4 font-medium">Payout</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-white/78">
                {DASHBOARD_CLAIMS.map((row, index) => (
                  <tr key={row.join('-')} className={index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}>
                    {row.map((cell) => (
                      <td key={cell} className="px-6 py-4">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="section-shell p-6 sm:p-7">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5">
              <h2 className="text-2xl font-semibold text-white">7-Day Disruption Risk Forecast</h2>
              <p className="text-sm text-white/55">Probability of a payout trigger across Raju's active delivery zones.</p>
            </div>

            <div className="relative mt-6 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DASHBOARD_FORECAST} margin={{ top: 24, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    stroke="rgba(255,255,255,0.45)"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                    contentStyle={{
                      background: '#101426',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '16px',
                    }}
                    formatter={(value: number) => [`${value}% disruption probability`, 'Risk']}
                  />
                  <Bar dataKey="value" radius={[14, 14, 6, 6]}>
                    {DASHBOARD_FORECAST.map((_, index) => (
                      <Cell key={index} fill={forecastColors[index]} />
                    ))}
                  </Bar>
                  <ReferenceDot
                    x="Wed"
                    y={76}
                    r={0}
                    label={{ value: '⚠️ Rain Likely', position: 'top', fill: '#f7f7fb', fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="section-shell overflow-hidden">
              <div className="bg-[#075E54] px-6 py-4">
                <h2 className="text-lg font-semibold text-white">GigShield WhatsApp Bot</h2>
              </div>
              <div className="space-y-4 bg-[#0e1a22] p-6">
                <ChatBubble sender="GigShield" type="bot">
                  Namaskar Raju! 🙏 ₹892 credited to raju@okaxis ✅ — Heavy rain claim processed
                </ChatBubble>
                <ChatBubble sender="GigShield" type="bot">
                  ⚠️ High AQI alert in your zone today. Stay safe and consider staying home.
                </ChatBubble>
                <ChatBubble sender="Raju" type="user">
                  What is my policy status?
                </ChatBubble>
                <ChatBubble sender="GigShield" type="bot">
                  Shield Plus active until Mar 23. Auto-renews Sunday. Coverage: ₹1,800/week ✅
                </ChatBubble>
              </div>
            </div>

            <div className="section-shell p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Upgrade Signal</p>
              <p className="mt-4 text-2xl font-semibold text-white">
                ⚠️ High disruption week ahead — Wed & Thu look risky. Upgrade to Shield Max for just ₹60/week more and get ₹1,700
                extra coverage. Don't get caught short.
              </p>
              <Button asChild className="mt-6 h-12 rounded-full bg-primary px-6 text-white hover:bg-primary/90">
                <Link href="/onboarding">Upgrade to Shield Max →</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ChatBubble({
  children,
  sender,
  type,
}: {
  children: string
  sender: string
  type: 'bot' | 'user'
}) {
  return (
    <div className={type === 'user' ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          type === 'user'
            ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-[#144d37] px-4 py-3 text-sm leading-6 text-white'
            : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-[#1f2c34] px-4 py-3 text-sm leading-6 text-white/85'
        }
      >
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-white/45">{sender}</p>
        <p>{children}</p>
      </div>
    </div>
  )
}
