import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { constructMetadata } from '@/lib/metadata';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/ui/FloatingContact';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.default' });

  return constructMetadata({
    t,
    locale,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="relative min-h-screen bg-background selection:bg-primary/30 text-slate-800">
            <FloatingContact />
            <AnnouncementBar />
            <Navbar />
            <main className="flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
