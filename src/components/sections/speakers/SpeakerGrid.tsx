'use client';

import { motion } from 'framer-motion';
import { Speaker } from '@/types/speaker';
import { Session } from '@/types/session';
import SpeakerCard from './SpeakerCard';

interface SpeakerGridItem {
  speaker: Speaker;
  session?: Session;
}

interface SpeakerGridProps {
  items: SpeakerGridItem[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 15 } }
} as const;

export default function SpeakerGrid({ items }: SpeakerGridProps) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      {items.map((item) => (
        <motion.div key={item.speaker.id} variants={itemAnim}>
          <SpeakerCard 
            speaker={item.speaker} 
            session={item.session} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
