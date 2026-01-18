'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-30"
      onClick={scrollToContent}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-[-5px] opacity-70 hover:opacity-100 transition-opacity"
      >
        {/* Double Chevron for Modern Look */}
        <ChevronDown className="h-6 w-6 text-white/60" strokeWidth={1.5} />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-white/60 -mt-3" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
