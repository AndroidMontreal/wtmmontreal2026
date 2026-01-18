'use client';

import { Link, usePathname, routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'short' | 'full';
  onClose?: () => void;
}

export default function LanguageSwitcher({ variant = 'short', onClose }: LanguageSwitcherProps) {
  const t = useTranslations('Navigation.languages');
  const currentLocale = useLocale();
  const pathname = usePathname();

  // Dynamic Toggle Logic (Find the first locale that isn't the current one)
  const targetLocale = routing.locales.find(cur => cur !== currentLocale) as "en" | "fr" || 'en';

  const label = targetLocale.toUpperCase();
  const fullLabel = t(targetLocale);

  if (variant === 'full') {
    return (
      <div className="flex justify-center pt-4 border-t">
        <Link
          href={pathname}
          locale={targetLocale}
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
        >
          <Globe className="h-4 w-4" />
          <span>{t('switch', { lang: fullLabel })}</span>
        </Link>
      </div>
    );
  }

  // Desktop: Compact Globe Toggle
  return (
    <div className="flex items-center border-l border-l-slate-400/30 pl-2 pr-2">
      <Link
        href={pathname}
        locale={targetLocale}
        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all"
      >
        <Globe className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary transition-colors" />
        <span>{label}</span>
      </Link>
    </div>
  );
}
