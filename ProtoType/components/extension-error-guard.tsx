'use client'

import { useEffect } from 'react'

function isExtensionSource(value: unknown) {
  if (typeof value !== 'string') return false

  return (
    value.includes('chrome-extension://') ||
    value.includes('moz-extension://') ||
    value.includes('safari-web-extension://')
  )
}

export function ExtensionErrorGuard() {
  useEffect(() => {
    const silenceEvent = (event: Event) => {
      event.preventDefault()
      if (typeof event.stopImmediatePropagation === 'function') {
        event.stopImmediatePropagation()
      }
    }

    const onError = (event: ErrorEvent) => {
      const stack = event.error instanceof Error ? event.error.stack : ''

      if (isExtensionSource(event.filename) || isExtensionSource(stack)) {
        silenceEvent(event)
      }
    }

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const stack =
        event.reason instanceof Error
          ? event.reason.stack
          : typeof event.reason === 'object' && event.reason && 'stack' in event.reason
            ? String((event.reason as { stack?: unknown }).stack ?? '')
            : String(event.reason ?? '')

      if (isExtensionSource(stack)) {
        silenceEvent(event)
      }
    }

    window.addEventListener('error', onError, true)
    window.addEventListener('unhandledrejection', onUnhandledRejection, true)

    return () => {
      window.removeEventListener('error', onError, true)
      window.removeEventListener('unhandledrejection', onUnhandledRejection, true)
    }
  }, [])

  return null
}
