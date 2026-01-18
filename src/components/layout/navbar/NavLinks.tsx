'use client';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/types/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Home, Users, Mic, Calendar } from 'lucide-react';

interface NavLinksProps {
  items: Record<string, MenuItem>;
  scrolled: boolean;
}

// Icon Mapping
const iconMap: Record<string, React.ElementType> = {
  home: Home,
  team: Users,
  speakers: Mic,
  schedule: Calendar,
};

export default function NavLinks({ items, scrolled }: NavLinksProps) {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  if (!items || typeof items !== 'object') return null;

  return (
    <div className="flex items-center gap-1 relative">
      {Object.entries(items).map(([key, item]) => {
        const isActive = pathname === item.href;
        const Icon = iconMap[key.toLowerCase()] || Home;

        return (
          <Link
            key={key}
            href={item.href}
            className={cn(
              "relative group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
              "text-sm font-semibold uppercase tracking-wide z-10",
              // Same color scheme for both scrolled and non-scrolled
              isActive ? "text-[#00A896]" : "text-slate-600 hover:text-[#00A896]"
            )}
            onMouseEnter={() => setHoveredPath(item.href)}
            onMouseLeave={() => setHoveredPath(null)}
          >
            <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-current" : "opacity-60 group-hover:opacity-100 group-hover:text-inherit")} />
            <span>{item.label}</span>

            {/* Sliding Theme Pill Background - Consistent Style */}
            {isActive && (
              <motion.div
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-full -z-10 bg-[#00A896]/15 backdrop-blur-sm"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Hover Pill (Subtle) */}
            {hoveredPath === item.href && !isActive && (
                <motion.div
                    layoutId="nav-hover-pill"
                    className={cn(
                        "absolute inset-0 rounded-full -z-10",
                        scrolled ? "bg-[#00A896]/5" : "bg-white/10"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}
          </Link>
        );
      })}
    </div>
  );
}
