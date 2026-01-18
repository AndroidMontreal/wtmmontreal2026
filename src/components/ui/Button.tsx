'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  external?: boolean;
  shimmer?: boolean;
}

const variants = {
  primary: "bg-[#00A896] text-white border border-[#00A896] shadow-lg shadow-teal-500/20 hover:bg-[#008f80]",
  secondary: "bg-[#4285F4] text-white border border-[#4285F4] shadow-lg shadow-blue-500/20 hover:bg-[#3367D6]",
  glass: "bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/40",
  outline: "bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/5",
  ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
};

const sizes = {
  sm: "px-4 py-1.5 text-xs font-bold",
  md: "px-6 py-2.5 text-sm font-bold",
  lg: "px-8 py-3 text-sm font-bold",
};

export default function Button({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  external,
  shimmer,
  className,
  ...props 
}: ButtonProps) {
  
  const content = (
    <>
      {/* Icon First (Left) */}
      {icon && <span>{icon}</span>}
      <span className="relative z-10">{children}</span>
      {(variant === 'primary' || shimmer) && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0 pointer-events-none" />
      )}
    </>
  );

  const baseClass = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 overflow-hidden",
    variants[variant],
    sizes[size],
    className
  );

  const animationProps = {
    whileHover: { y: -3, scale: 1.02 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring", stiffness: 400, damping: 10 } as const
  };

  if (href) {
    if (external) {
      return (
        <motion.a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={baseClass}
          {...animationProps}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div {...animationProps} className="inline-block">
        <Link href={href} className={baseClass}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button className={baseClass} {...animationProps} {...props}>
      {content}
    </motion.button>
  );
}
