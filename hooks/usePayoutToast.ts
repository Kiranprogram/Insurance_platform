'use client';

import { useEffect, useState, useCallback } from 'react';
import { getRandomWorker, getRandomCity } from '@/lib/mockData';

export interface PayoutNotification {
  id: string;
  workerName: string;
  city: string;
  amount: number;
  timestamp: string;
}

export function usePayoutToast() {
  const [notifications, setNotifications] = useState<PayoutNotification[]>([]);

  const generateNotification = useCallback((): PayoutNotification => {
    const worker = getRandomWorker();
    const city = getRandomCity();
    const amount = Math.floor(Math.random() * 800) + 400;

    return {
      id: `NOTIF-${Date.now()}`,
      workerName: worker.name,
      city: city.name,
      amount,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const notif = generateNotification();
      setNotifications((prev) => [notif, ...prev].slice(0, 1)); // Keep only last notification
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, [generateNotification]);

  return { notifications, generateNotification };
}
