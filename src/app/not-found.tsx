'use client';

import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import enCommon from '@/messages/en/common.json';
import frCommon from '@/messages/fr/common.json';
import '@/app/globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function GlobalNotFound() {
  const pathname = usePathname();
  
  // Detection Logic
  const isFrench = pathname?.startsWith('/fr');
  const isEnglish = pathname?.startsWith('/en');
  
  // Default to English if not explicitly French
  const messages = isFrench ? frCommon : enCommon;
  const t = messages.NotFound;

  return (
    <html lang={isFrench ? 'fr' : 'en'}>
      <body className={`${plusJakartaSans.className} bg-slate-50 text-slate-900 min-h-screen flex items-center justify-center p-6 font-sans`}>
        <div className="flex flex-col items-center justify-center text-center max-w-md">
          <h1 className="text-9xl font-black text-[#00A896]/20 mb-4 select-none">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t.title}
          </h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            {t.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* If we know the locale, show that home button. Otherwise show both. */}
            {(isFrench || !isEnglish) && (
              <Button href="/fr" variant="primary" size="lg" external>
                {frCommon.NotFound.backHome}
              </Button>
            )}
            {(isEnglish || !isFrench) && (
              <Button href="/en" variant="secondary" size="lg" external>
                {enCommon.NotFound.backHome}
              </Button>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
