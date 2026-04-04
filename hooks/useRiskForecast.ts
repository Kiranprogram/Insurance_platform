'use client';

import { useState, useEffect } from 'react';

export interface RiskDay {
  day: string;
  probability: number;
}

export function useRiskForecast() {
  const [forecast, setForecast] = useState<RiskDay[]>([]);

  useEffect(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay();

    const forecastData: RiskDay[] = days.map((day, index) => {
      const daysFromToday = (index - today + 7) % 7;
      const baseProb = 30 + Math.random() * 40; // 30-70%
      const adjustment = daysFromToday * 5; // Slight trend
      const probability = Math.min(Math.max(baseProb + adjustment, 20), 85);

      return {
        day,
        probability: Math.round(probability),
      };
    });

    setForecast(forecastData);
  }, []);

  return forecast;
}
