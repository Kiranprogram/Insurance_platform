'use client';

import { useEffect, useState, useCallback } from 'react';
import { CITIES, DISRUPTION_TYPES, getRandomCity, getRandomDisruptionType, getRandomWorker } from '@/lib/mockData';

export interface LiveEvent {
  id: string;
  timestamp: string;
  city: string;
  zone: string;
  eventType: string;
  affectedWorkers: number;
  totalPayout: number;
  workersName: string;
}

export function useLiveFeed() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [isRunning, setIsRunning] = useState(true);

  const generateEvent = useCallback((): LiveEvent => {
    const city = getRandomCity();
    const disruption = getRandomDisruptionType();
    const workers = Math.floor(Math.random() * 50) + 10;
    const payout = workers * (Math.random() * 500 + 400);

    return {
      id: `EVT-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      city: city.name,
      zone: city.zone,
      eventType: disruption.type,
      affectedWorkers: workers,
      totalPayout: Math.round(payout),
      workersName: getRandomWorker().name,
    };
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setEvents((prev) => {
        const newEvent = generateEvent();
        const updated = [newEvent, ...prev];
        return updated.slice(0, 8); // Keep max 8 events
      });
    }, 4000); // Add event every 4 seconds

    return () => clearInterval(interval);
  }, [isRunning, generateEvent]);

  return { events, isRunning, setIsRunning };
}
