'use client';

import { useTranslations } from 'next-intl';
import { useCountdown } from '@/hooks/useCountdown';
import { motion, AnimatePresence } from 'framer-motion';

// Event Date: April 18th, 2026 at 9:00 AM EDT (Montreal is UTC-4 in April)
const EVENT_DATE = new Date('2026-04-18T09:00:00-04:00');

const TimeBox = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-5 md:p-8 
      bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl 
      min-w-[90px] md:min-w-[140px]
      shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]
      hover:border-white/20 transition-colors duration-300"
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="text-4xl md:text-6xl font-bold text-white tabular-nums tracking-tight block drop-shadow-lg"
          >
            {value < 10 ? `0${value}` : value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-teal-400 mt-2 md:mt-3">
        {label}
      </span>
    </div>
  );
};

export default function Countdown() {
  const t = useTranslations('Hero.countdown');
  const timeLeft = useCountdown(EVENT_DATE);

  // If the event has passed (all zeros), we could show a message or nothing.
  // For now, it stays at 00:00:00:00 per hook logic.

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12">
      <TimeBox value={timeLeft.days} label={t('days')} />
      <TimeBox value={timeLeft.hours} label={t('hours')} />
      <TimeBox value={timeLeft.minutes} label={t('minutes')} />
      <TimeBox value={timeLeft.seconds} label={t('seconds')} />
    </div>
  );
}
