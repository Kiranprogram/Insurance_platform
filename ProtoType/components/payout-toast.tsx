'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { TOAST_WORKERS } from '@/lib/site-data'

interface ActiveToast {
  id: number
  name: string
  city: string
  amount: string
}

export function PayoutToastProvider() {
  const [toast, setToast] = useState<ActiveToast | null>(null)
  const workers = useMemo(() => TOAST_WORKERS, [])

  useEffect(() => {
    let lastIndex = -1
    const timeoutIds: number[] = []

    const showToast = () => {
      let index = Math.floor(Math.random() * workers.length)
      if (workers.length > 1 && index === lastIndex) {
        index = (index + 1) % workers.length
      }

      lastIndex = index
      const worker = workers[index]

      const toastId = Date.now()
      setToast({
        id: toastId,
        ...worker,
      })

      const timeoutId = window.setTimeout(() => {
        setToast((current) => (current?.id === toastId ? null : current))
      }, 5000)
      timeoutIds.push(timeoutId)
    }

    const interval = window.setInterval(showToast, 45000)
    return () => {
      window.clearInterval(interval)
      timeoutIds.forEach((id) => window.clearTimeout(id))
    }
  }, [workers])

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[80]">
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 32, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 32, y: 24 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-[#1a1a2e] px-4 py-4 shadow-2xl"
            style={{ borderLeft: '3px solid #FF5722' }}
          >
            <p className="text-sm font-semibold text-white">
              💸 {toast.name}, {toast.city}
            </p>
            <p className="mt-1 text-sm text-white/60">{toast.amount} credited just now</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
