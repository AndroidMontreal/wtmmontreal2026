'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SpeakerFilterProps {
  labels: {
    all: string;
    talks: string;
    workshops: string;
  };
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function SpeakerFilter({ labels, activeFilter, onFilterChange }: SpeakerFilterProps) {
  const buttons = [
    { key: 'all', label: labels.all },
    { key: 'talk', label: labels.talks },
    { key: 'workshop', label: labels.workshops },
  ];

  return (
    <div className="flex justify-start mb-16">
      <div className="inline-flex items-center bg-white/60 backdrop-blur-md border border-slate-200/50 p-1.5 rounded-full shadow-sm gap-1">
        {buttons.map((btn) => {
          const isActive = activeFilter === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => onFilterChange(btn.key)}
              className={cn(
                "relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 z-10 cursor-pointer",
                isActive 
                  ? "text-white" 
                  : "text-slate-500 hover:text-primary hover:bg-primary/10"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
