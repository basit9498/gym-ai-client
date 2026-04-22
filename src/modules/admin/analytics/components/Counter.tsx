'use client';

import { useState, useEffect } from 'react';

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

export function Counter({ target, prefix = '', suffix = '' }: CounterProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) {
      setCurrent(end);
      return;
    }

    const totalMiliseconds = 1500;
    const incrementTime = (totalMiliseconds / (end || 1)) * (end > 1000 ? 50 : 1);
    
    const timer = setInterval(() => {
        start += end > 1000 ? 50 : 1;
        setCurrent(start);
        if (start >= end) {
            setCurrent(end);
            clearInterval(timer);
        }
    }, Math.max(incrementTime, 10));

    return () => clearInterval(timer);
  }, [target]);

  return <span>{prefix}{current.toLocaleString()}{suffix}</span>;
}
