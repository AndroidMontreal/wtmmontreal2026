import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(targetDate: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = differenceInSeconds(targetDate, now);

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (3600 * 24)),
          hours: Math.floor((difference % (3600 * 24)) / 3600),
          minutes: Math.floor((difference % 3600) / 60),
          seconds: Math.floor(difference % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
