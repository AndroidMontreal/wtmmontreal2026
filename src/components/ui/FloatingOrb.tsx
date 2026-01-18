'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

interface FloatingOrbProps {
  color: string;
  size: string;
}

export default function FloatingOrb({ color, size }: FloatingOrbProps) {
  const shouldReduceMotion = useReducedMotion();

  // Use a lazy state initializer to generate random positions safely.
  const [randomMotion] = useState(() => ({
    top: [
      Math.random() * 80 + "%", 
      Math.random() * 80 + "%", 
      Math.random() * 80 + "%"
    ],
    left: [
      Math.random() * 80 + "%", 
      Math.random() * 80 + "%", 
      Math.random() * 80 + "%"
    ],
  }));

  return (
    <motion.div
      className="absolute rounded-full blur-[100px]"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
      }}
      animate={shouldReduceMotion ? {} : {
        top: randomMotion.top,
        left: randomMotion.left,
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}
