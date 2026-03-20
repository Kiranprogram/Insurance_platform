'use client';

import { useEffect, useRef, useState } from 'react';

export function useCounterAnimation(target: number, duration: number = 2500) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTime: number;
            let animationId: number;

            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              setCount(Math.floor(target * progress));

              if (progress < 1) {
                animationId = requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            animationId = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationId);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, duration]);

  return { count, elementRef };
}
