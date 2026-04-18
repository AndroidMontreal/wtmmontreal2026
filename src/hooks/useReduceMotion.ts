import { useEffect, useState } from 'react';

/**
 * Custom hook to respect user's prefers-reduced-motion setting
 * and disable animations during SSR/initial render for performance
 */
export function useReduceMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(true); // Default true for SSR perf

  useEffect(() => {
    // Check for user preference after hydration
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    // Set initial value
    handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reduceMotion;
}
