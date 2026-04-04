'use client';

import { Card } from '@/components/ui/card';
import { Code } from 'lucide-react';

export default function APIDocs() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl font-bold mb-4">REST API Documentation</h1>
          <p className="text-lg text-foreground/60">
            Integrate GigShield into your platform with our simple REST API
          </p>
        </div>

        {/* Base URL */}
        <Card className="bg-card border-border p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-bold mb-2">Base URL</h3>
          <code className="bg-background/50 p-3 rounded text-sm text-secondary block">
            https://api.gigshield.ai/v1
          </code>
        </Card>

        {/* Authentication */}
        <Card className="bg-card border-border p-8 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-bold mb-4">Authentication</h3>
          <p className="text-foreground/70 mb-4">All requests require an API key in the Authorization header:</p>
          <code className="bg-background/50 p-3 rounded text-sm text-secondary block mb-4">
            Authorization: Bearer YOUR_API_KEY
          </code>
          <p className="text-foreground/70 text-sm">
            Get your API key from your <a href="#" className="text-primary hover:underline">Dashboard Settings</a>.
          </p>
        </Card>

        {/* Endpoints */}
        <div className="space-y-8">
          {[
            {
              method: 'POST',
              path: '/claims/submit',
              title: 'Submit Claim',
              desc: 'Submit a claim for a disruption event',
              request: {
                worker_id: 'string',
                event_type: 'string',
                zone: 'string',
                timestamp: 'ISO 8601',
              },
              response: {
                claim_id: 'CLM20260319001',
                status: 'approved',
                payout: 850,
                payout_time_estimate: '8 minutes',
              },
            },
            {
              method: 'GET',
              path: '/workers/:id',
              title: 'Get Worker Profile',
              desc: 'Retrieve worker profile and ESS score',
              request: {
                id: 'string (path parameter)',
              },
              response: {
                id: '1',
                name: 'Raju Kumar',
                city: 'Bengaluru',
                ess_score: 72,
                coverage: 'Shield Plus',
                earnings_7d: 8500,
              },
            },
            {
              method: 'GET',
              path: '/disruptions/live',
              title: 'Live Disruption Feed',
              desc: 'Get real-time disruption events across India',
              request: {
                city: 'optional',
                limit: 'optional (default: 10)',
              },
              response: {
                events: [
                  {
                    id: 'EVT-001',
                    city: 'Bengaluru',
                    event_type: 'Rain',
                    timestamp: '2026-03-19T14:30:00Z',
                    workers_affected: 145,
                  },
                ],
              },
            },
            {
              method: 'POST',
              path: '/payouts/upi',
              title: 'Trigger UPI Payout',
              desc: 'Initiate a direct UPI transfer to worker',
              request: {
                worker_id: 'string',
                amount: 'number',
                claim_id: 'string',
              },
              response: {
                payout_id: 'PAY-20260319001',
                status: 'processing',
                expected_delivery: '7 minutes',
              },
            },
            {
              method: 'GET',
              path: '/analytics/dashboard',
              title: 'Portfolio Analytics',
              desc: 'Get portfolio KPIs for insurers',
              request: {
                period: 'optional (month/quarter)',
              },
              response: {
                active_policies: 3970,
                gross_premium: 28700000,
                claims_paid: 16500000,
                loss_ratio: 0.575,
              },
            },
          ].map((endpoint, idx) => (
            <Card
              key={idx}
              className="bg-card border-border p-8 animate-slide-up"
              style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
            >
              <div className="flex gap-4 mb-4">
                <span
                  className={`px-3 py-1 rounded font-bold text-sm whitespace-nowrap ${
                    endpoint.method === 'GET'
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-primary/20 text-primary'
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="text-foreground font-mono">{endpoint.path}</code>
              </div>

              <h3 className="text-xl font-bold mb-2">{endpoint.title}</h3>
              <p className="text-foreground/60 mb-6">{endpoint.desc}</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Request */}
                <div>
                  <h4 className="font-bold text-sm mb-3 text-primary">Request Parameters</h4>
                  <div className="bg-background/50 p-4 rounded">
                    {typeof endpoint.request === 'object' &&
                      Object.entries(endpoint.request).map(([key, value]) => (
                        <div key={key} className="mb-2">
                          <span className="text-secondary">{key}:</span>
                          <span className="ml-2 text-foreground/60 text-sm">{String(value)}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Response */}
                <div>
                  <h4 className="font-bold text-sm mb-3 text-secondary">Response Example</h4>
                  <div className="bg-background/50 p-4 rounded text-sm">
                    <pre className="text-foreground/70 overflow-x-auto">
                      {JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Error Handling */}
        <Card className="bg-card border-border p-8 mt-8 animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <h3 className="text-xl font-bold mb-4">Error Handling</h3>
          <p className="text-foreground/70 mb-4">All errors return standard HTTP status codes:</p>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-mono text-destructive">400</span>
              <span className="ml-4 text-foreground/60">Bad Request - Invalid parameters</span>
            </div>
            <div>
              <span className="font-mono text-destructive">401</span>
              <span className="ml-4 text-foreground/60">Unauthorized - Invalid API key</span>
            </div>
            <div>
              <span className="font-mono text-destructive">429</span>
              <span className="ml-4 text-foreground/60">Too Many Requests - Rate limit exceeded</span>
            </div>
            <div>
              <span className="font-mono text-destructive">500</span>
              <span className="ml-4 text-foreground/60">Internal Server Error</span>
            </div>
          </div>
        </Card>

        {/* Rate Limits */}
        <Card className="bg-card border-border p-8 mt-8 animate-slide-up" style={{ animationDelay: '1s' }}>
          <h3 className="text-xl font-bold mb-4">Rate Limits</h3>
          <p className="text-foreground/70 mb-4">API rate limits depend on your plan:</p>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-bold">Starter:</span>
              <span className="ml-4 text-foreground/60">100 requests/minute</span>
            </div>
            <div>
              <span className="font-bold">Pro:</span>
              <span className="ml-4 text-foreground/60">1,000 requests/minute</span>
            </div>
            <div>
              <span className="font-bold">Enterprise:</span>
              <span className="ml-4 text-foreground/60">Unlimited</span>
            </div>
          </div>
        </Card>

        {/* Support */}
        <div className="mt-12 text-center text-foreground/60">
          <p className="mb-2">Need help?</p>
          <p>
            Contact us at{' '}
            <a href="mailto:api@gigshield.ai" className="text-primary hover:underline">
              api@gigshield.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
