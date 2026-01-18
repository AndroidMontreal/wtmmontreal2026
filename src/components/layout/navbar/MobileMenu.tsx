'use client';

import React, { useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/types/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { Home, Users, Mic, Calendar, Ticket } from 'lucide-react';

// Icon Mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  team: Users,
  speakers: Mic,
  schedule: Calendar,
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: Record<string, MenuItem>;
  ticketLabel: string;
  hidden: boolean;
}

export default function MobileMenu({ isOpen, onClose, items, ticketLabel, hidden }: MobileMenuProps) {
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40 flex flex-col bg-slate-900/98 backdrop-blur-xl animate-in fade-in duration-300 md:hidden pt-[72px]"
    >
      <div className="flex flex-1 flex-col gap-4 p-6 overflow-y-auto">

        {/* Navigation Links with Icons */}
        <div className="flex flex-col gap-1">
          {Object.entries(items).map(([key, item]) => {
            const isActive = pathname === item.href;
            const Icon = iconMap[key.toLowerCase()] || Home;

            return (
              <Link
                key={key}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                  isActive
                    ? 'bg-white/10 text-[#00A896] border border-white/10'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-[#00A896]" : "text-slate-400")} />
                <span className="text-sm font-bold tracking-wide uppercase">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-6 pb-8">
          {/* CTA Button - Compact */}
          <Link
            href="/tickets"
            onClick={onClose}
            className="w-full rounded-lg bg-[#00A896] py-3 text-center text-sm font-bold text-white shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 hover:bg-[#008f80] transition-colors"
          >
            <Ticket className="h-4 w-4" />
            <span>{ticketLabel}</span>
          </Link>

          {/* Language Switcher */}
          <div className="w-full border-t border-white/10 pt-4">
            <LanguageSwitcher variant="full" onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
