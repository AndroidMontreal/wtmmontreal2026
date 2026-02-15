'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  tag: string;
  title: string;
  subtitle: string;
  highlightColor: string; // Tailwind class for text color (e.g., "text-blue-600")
  titleColor?: string;
  subtitleColor?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  tagStyles?: {
    bg: string;
    text: string;
    border: string;
  };
}

export default function SectionTitle({ 
  tag, 
  title, 
  subtitle, 
  highlightColor,
  titleColor = "text-slate-900",
  subtitleColor = "text-slate-600",
  className = "mb-16",
  as = "h2",
  tagStyles = {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200'
  }
}: SectionTitleProps) {
  
  // Logic to split title and highlight the last word
  const words = title.trim().split(' ');
  const lastWord = words.pop(); // Removes and returns the last word
  const firstPart = words.join(' ');

  const MotionHeading = motion[as];

  return (
    <div className={`text-left max-w-3xl ${className}`}>
      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block mb-4"
      >
        <span className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest ${tagStyles.bg} ${tagStyles.border} ${tagStyles.text}`}>
          {tag}
        </span>
      </motion.div>

      {/* Title */}
      <MotionHeading 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${titleColor}`}
      >
        {firstPart} <span className={highlightColor}>{lastWord}.</span>
      </MotionHeading>

      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-lg leading-relaxed ${subtitleColor}`}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
