'use client';

import { useState, useCallback } from 'react';

export interface SimulationStage {
  stage: 'trigger' | 'detection' | 'analysis' | 'fraud_check' | 'payout';
  message: string;
  timestamp: string;
  success: boolean;
}

export interface SimulationResult {
  eventId: string;
  city: string;
  workersAffected: number;
  totalPayout: number;
  payoutTime: number;
  stages: SimulationStage[];
}

export function useDisruptionSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [stages, setStages] = useState<SimulationStage[]>([]);

  const simulateEvent = useCallback(async () => {
    setIsRunning(true);
    setStages([]);
    setResult(null);

    const eventId = `EVT-${Date.now()}`;
    const city = 'Bengaluru';
    const workersAffected = Math.floor(Math.random() * 100) + 50;
    const totalPayout = workersAffected * (Math.random() * 600 + 300);
    const payoutTime = Math.floor(Math.random() * 8) + 7;

    const newStages: SimulationStage[] = [];

    // Stage 1: Trigger
    await new Promise((resolve) => setTimeout(resolve, 800));
    const stage1: SimulationStage = {
      stage: 'trigger',
      message: `[${new Date().toLocaleTimeString()}] TRIGGER: Heavy rain detected in ${city}`,
      timestamp: new Date().toLocaleTimeString(),
      success: true,
    };
    newStages.push(stage1);
    setStages([...newStages]);

    // Stage 2: Detection
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const stage2: SimulationStage = {
      stage: 'detection',
      message: `[${new Date().toLocaleTimeString()}] DETECTION: ${workersAffected} workers detected in disruption zone`,
      timestamp: new Date().toLocaleTimeString(),
      success: true,
    };
    newStages.push(stage2);
    setStages([...newStages]);

    // Stage 3: Analysis
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const stage3: SimulationStage = {
      stage: 'analysis',
      message: `[${new Date().toLocaleTimeString()}] ANALYSIS: Calculating payouts based on earnings profile...`,
      timestamp: new Date().toLocaleTimeString(),
      success: true,
    };
    newStages.push(stage3);
    setStages([...newStages]);

    // Stage 4: Fraud Check
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const stage4: SimulationStage = {
      stage: 'fraud_check',
      message: `[${new Date().toLocaleTimeString()}] FRAUD CHECK: AI analysis complete. Risk score: 8/100`,
      timestamp: new Date().toLocaleTimeString(),
      success: true,
    };
    newStages.push(stage4);
    setStages([...newStages]);

    // Stage 5: Payout
    await new Promise((resolve) => setTimeout(resolve, 1800));
    const stage5: SimulationStage = {
      stage: 'payout',
      message: `[${new Date().toLocaleTimeString()}] PAYOUT: ₹${Math.round(totalPayout)} approved. Processing in ${payoutTime} minutes...`,
      timestamp: new Date().toLocaleTimeString(),
      success: true,
    };
    newStages.push(stage5);
    setStages([...newStages]);

    setResult({
      eventId,
      city,
      workersAffected,
      totalPayout: Math.round(totalPayout),
      payoutTime,
      stages: newStages,
    });

    setIsRunning(false);
  }, []);

  return { isRunning, stages, result, simulateEvent };
}
