'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface GalleryControlsProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function GalleryControls({ onPrev, onNext, hasPrev, hasNext }: GalleryControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
      </button>
      
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next Page"
      >
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
