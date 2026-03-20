import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

import { ExtensionErrorGuard } from '@/components/extension-error-guard'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { PageTransition } from '@/components/page-transition'
import { PayoutToastProvider } from '@/components/payout-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'GigShield AI | Parametric Insurance for India\'s Gig Workers',
  description: 'AI-powered parametric insurance protecting India\'s 450M+ gig workers from disruptions. Instant claims, no paperwork.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'GigShield AI',
    description: 'Parametric insurance for gig workers',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FF5722',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background font-sans antialiased text-foreground">
        <Script id="extension-error-guard" strategy="beforeInteractive">
          {`
            (function () {
              if (window.__gigshieldExtensionGuardInstalled) return;
              window.__gigshieldExtensionGuardInstalled = true;

              function isExtensionSource(value) {
                return typeof value === 'string' && (
                  value.indexOf('chrome-extension://') !== -1 ||
                  value.indexOf('moz-extension://') !== -1 ||
                  value.indexOf('safari-web-extension://') !== -1
                );
              }

              function looksLikeExtensionReact299(message, source, stack) {
                return (
                  String(message || '').indexOf('Minified React error #299') !== -1 &&
                  (isExtensionSource(source) || isExtensionSource(stack))
                );
              }

              var previousOnError = window.onerror;
              window.onerror = function (message, source, lineno, colno, error) {
                var stack = error && error.stack ? String(error.stack) : '';
                if (looksLikeExtensionReact299(message, source, stack) || isExtensionSource(source) || isExtensionSource(stack)) {
                  return true;
                }

                if (typeof previousOnError === 'function') {
                  return previousOnError.call(this, message, source, lineno, colno, error);
                }

                return false;
              };

              var previousOnUnhandledRejection = window.onunhandledrejection;
              window.onunhandledrejection = function (event) {
                var reason = event && event.reason;
                var stack = reason && reason.stack ? String(reason.stack) : String(reason || '');
                if (isExtensionSource(stack)) {
                  if (event && typeof event.preventDefault === 'function') {
                    event.preventDefault();
                  }
                  return true;
                }

                if (typeof previousOnUnhandledRejection === 'function') {
                  return previousOnUnhandledRejection.call(this, event);
                }

                return false;
              };

              function silenceEvent(event) {
                if (typeof event.preventDefault === 'function') {
                  event.preventDefault();
                }
                if (typeof event.stopImmediatePropagation === 'function') {
                  event.stopImmediatePropagation();
                }
              }

              window.addEventListener('error', function (event) {
                var stack = event && event.error && event.error.stack ? String(event.error.stack) : '';
                if (looksLikeExtensionReact299(event && event.message, event && event.filename, stack) || isExtensionSource(event && event.filename) || isExtensionSource(stack)) {
                  silenceEvent(event);
                }
              }, true);

              window.addEventListener('unhandledrejection', function (event) {
                var reason = event && event.reason;
                var stack = reason && reason.stack ? String(reason.stack) : String(reason || '');
                if (isExtensionSource(stack)) {
                  silenceEvent(event);
                }
              }, true);
            })();
          `}
        </Script>
        <ExtensionErrorGuard />
        <Navbar />
        <main className="overflow-x-clip pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <PayoutToastProvider />
        <Analytics />
      </body>
    </html>
  )
}
