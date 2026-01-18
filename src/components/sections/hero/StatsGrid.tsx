'use client';

import { useMessages } from 'next-intl';
import { useMemo } from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface StatItemProps {
  label: string;
  value: string;
  color: string;
  idx: number;
}

interface Messages {
  Home: {
    stats: Array<{
      value: string;
      label: string;
      color: string;
    }>;
  };
}

function StatItem({ label, value, color, idx }: StatItemProps) {
  const isMobileRight = (idx + 1) % 2 !== 0;
  const isDesktopRight = idx !== 3;

  return (
    <div
      className={`group relative p-6 py-3 bg-transparent transition-all duration-300 ease-out cursor-pointer
      border-0 border-white/20
      ${isMobileRight ? 'border-r' : ''}
      md:border-b-0
      ${isDesktopRight ? 'md:border-r' : 'md:border-r-0'}
      `}
    >
      <div className={`text-3xl md:text-5xl font-bold ${color} mb-3 transition-all duration-300 group-hover:scale-110`}>
        <AnimatedCounter value={value} duration={2} />
      </div>
      <div className="text-[10px] font-semibold uppercase text-white tracking-wide transition-all duration-300 group-hover:scale-110">
        {label}
      </div>
    </div>
  );
}

export default function StatsGrid() {
  const messages = useMessages() as unknown as Messages;

  const stats = useMemo(() => {
    return messages?.Home?.stats || [];
  }, [messages]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-10 w-full max-w-2xl mx-auto overflow-hidden">
      {stats.map((stat, idx) => (
        <StatItem key={stat.label} idx={idx} {...stat} />
      ))}
    </div>
  );
}
