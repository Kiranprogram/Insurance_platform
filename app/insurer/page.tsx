'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { IndiaMap } from '@/components/india-map'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  INSURER_CLAIMS,
  INSURER_OVERVIEW_STATS,
  PREMIUM_CLAIMS_DATA,
  ZONE_RISK_ROWS,
} from '@/lib/site-data'
import { formatIndianNumber } from '@/lib/format'

export default function InsurerPage() {
  const [activePolicies, setActivePolicies] = useState(0)
  const [eventFilter, setEventFilter] = useState('All Events')
  const [zoneFilter, setZoneFilter] = useState('All Zones')
  const [statusFilter, setStatusFilter] = useState('All Statuses')

  useEffect(() => {
    let frame = 0
    const duration = 1400
    const start = performance.now()
    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      setActivePolicies(Math.round(124351 * progress))
      if (progress < 1) {
        frame = window.requestAnimationFrame(animate)
      }
    }

    frame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const filteredClaims = useMemo(() => {
    return INSURER_CLAIMS.filter((claim) => {
      const event = claim[3]
      const zone = claim[2]
      const status = claim[6]
      const matchesEvent = eventFilter === 'All Events' || event === eventFilter
      const matchesZone = zoneFilter === 'All Zones' || zone === zoneFilter
      const matchesStatus = statusFilter === 'All Statuses' || status === statusFilter
      return matchesEvent && matchesZone && matchesStatus
    })
  }, [eventFilter, zoneFilter, statusFilter])

  const mapMarkers = [
    { city: 'Bengaluru', color: '#FF5252', pulse: true },
    { city: 'Mumbai', color: '#FF5252', pulse: true },
    { city: 'Chennai', color: '#FF5252', pulse: true },
    { city: 'Delhi', color: '#FFD166', pulse: true },
    { city: 'Hyderabad', color: '#FFD166', pulse: true },
    { city: 'Kolkata', color: '#FFD166', pulse: true },
    { city: 'Pune', color: '#00C853', pulse: true },
    { city: 'Ahmedabad', color: '#00C853', pulse: true },
  ]

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">GigShield Insurer Portal</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Bengaluru Zone</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/65">
            Portfolio health, automated claims analytics, and zone-level risk monitoring for platform and carrier partners.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="h-auto rounded-full border border-white/10 bg-white/5 p-1">
            <TabsTrigger value="overview" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="claims" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              Claims
            </TabsTrigger>
            <TabsTrigger value="risk-zones" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              Risk Zones
            </TabsTrigger>
            <TabsTrigger value="reports" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {INSURER_OVERVIEW_STATS.map(([label, value]) => (
                <div key={label} className="section-shell p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/45">{label}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <p className="text-4xl font-semibold text-white">
                      {label === 'Active Policies' ? formatIndianNumber(activePolicies) : value}
                    </p>
                    {label === 'Loss Ratio' ? (
                      <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        Within Target ✅
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="section-shell p-6 sm:p-7">
                <div className="border-b border-white/10 pb-5">
                  <h2 className="text-2xl font-semibold text-white">Premium vs Claims — Last 6 Months</h2>
                </div>
                <div className="mt-6 h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PREMIUM_CLAIMS_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="premiumFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="#FF5722" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#FF5722" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="claimsFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="#4f6b8a" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#4f6b8a" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="rgba(255,255,255,0.45)"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value}L`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#101426',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '16px',
                        }}
                        formatter={(value: number, name: string) => [`₹${value}L`, name === 'premium' ? 'Premium' : 'Claims']}
                      />
                      <Area type="monotone" dataKey="premium" stroke="#FF5722" fillOpacity={1} fill="url(#premiumFill)" strokeWidth={3} />
                      <Area type="monotone" dataKey="claims" stroke="#4f6b8a" fillOpacity={1} fill="url(#claimsFill)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <ZoneRiskTable />
            </div>
          </TabsContent>

          <TabsContent value="claims" className="space-y-6">
            <div className="section-shell p-6">
              <div className="grid gap-3 md:grid-cols-3">
                <FilterSelect value={eventFilter} onChange={setEventFilter} options={['All Events', 'Heavy Rain', 'Bandh', 'AQI Alert', 'Cyclone', 'Dense Fog']} />
                <FilterSelect value={zoneFilter} onChange={setZoneFilter} options={['All Zones', 'HSR Layout', 'Koramangala', 'Whitefield', 'Indiranagar', 'Electronic City', 'Jayanagar']} />
                <FilterSelect value={statusFilter} onChange={setStatusFilter} options={['All Statuses', '✅ Paid', '❌ Rejected']} />
              </div>
            </div>

            <div className="section-shell overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-white/[0.03] uppercase tracking-[0.2em] text-white/45">
                    <tr>
                      {['Claim ID', 'Worker', 'Zone', 'Event', 'Payout', 'Fraud', 'Status', 'Time'].map((heading) => (
                        <th key={heading} className="px-6 py-4 font-medium">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-white/78">
                    {filteredClaims.map((row, index) => (
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
            </div>
          </TabsContent>

          <TabsContent value="risk-zones" className="space-y-8">
            <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
              <div className="section-shell p-6">
                <h2 className="text-2xl font-semibold text-white">India disruption heatmap</h2>
                <p className="mt-2 text-sm text-white/55">Red = high frequency, yellow = medium, green = low.</p>
                <div className="mt-6 h-[460px]">
                  <IndiaMap markers={mapMarkers} className="h-full" showTooltip={false} />
                </div>
              </div>
              <ZoneRiskTable />
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                ['March portfolio report', 'Ready for export', 'Loss ratio stable, fraud below target, claim speed improving'],
                ['Carrier summary pack', 'Updated 12 min ago', 'Includes premium trend, paid-claim trend, zone exposure'],
                ['Platform partner digest', 'Scheduled at 6:00 PM', 'Daily zone notes for Bengaluru operations teams'],
              ].map(([title, status, body]) => (
                <div key={title} className="section-shell p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-secondary">{status}</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{title}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/65">{body}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ZoneRiskTable() {
  return (
    <div className="section-shell overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-2xl font-semibold text-white">Zone Risk Table</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/[0.03] uppercase tracking-[0.2em] text-white/45">
            <tr>
              {['Zone', 'Workers', 'Risk Level', 'Payouts This Month'].map((heading) => (
                <th key={heading} className="px-6 py-4 font-medium">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-white/78">
            {ZONE_RISK_ROWS.map((row, index) => (
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
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-[#0d101b]">
          {option}
        </option>
      ))}
    </select>
  )
}
