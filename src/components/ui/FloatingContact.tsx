'use client';

import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingContact() {
  return (
    <motion.a
      href="mailto:socials@wtmmontreal.com"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white shadow-lg border-l border-t border-b border-slate-200 rounded-l-xl p-3 flex flex-col items-center gap-2 group hover:pr-5 transition-all duration-300 cursor-pointer"
    >
      <MessageSquare className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
      <span 
        className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        Write to us
      </span>
    </motion.a>
  );
}
