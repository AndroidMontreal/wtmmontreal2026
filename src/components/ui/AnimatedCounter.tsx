'use client';

import { useEffect, useState, useRef } from 'react';
import { animate, useMotionValue, useTransform, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({ value, duration = 2, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Regex to separate non-digits from digits
  const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);

  const isAnimatable = !!match;
  const prefix = match ? match[1] : '';
  const targetNumber = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : '';

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // Initial state: If animatable, show "0" (with prefix/suffix), else show full value
  const [displayValue, setDisplayValue] = useState(
    isAnimatable ? `${prefix}0${suffix}` : value
  );

  useEffect(() => {
    // If not animatable, we already set the correct initial state, so just return.
    if (!isAnimatable) return;

    // Only start animation when in view
    if (isInView) {
      const controls = animate(count, targetNumber, {
        duration,
        ease: 'easeOut',
        delay,
      });

      const unsubscribe = rounded.on('change', (latest) => {
        setDisplayValue(`${prefix}${latest}${suffix}`);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, isAnimatable, targetNumber, duration, delay, prefix, suffix, count, rounded]);

  return <span ref={ref}>{displayValue}</span>;
}