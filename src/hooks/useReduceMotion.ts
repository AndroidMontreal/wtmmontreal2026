import { useEffect, useState } from 'react';

/**
 * Custom hook to respect user's prefers-reduced-motion setting
 * and disable animations during SSR/initial render for performance
 */
export function useReduceMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(true); // Default true for SSR perf

  useEffect(() => {
    // Enable animations after hydration on client-side
    setReduceMotion(false);

    // Check for user preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reduceMotion;
}
