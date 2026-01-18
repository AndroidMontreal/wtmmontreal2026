import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  // Load all translation files
  const common = (await import(`../messages/${locale}/common.json`)).default;
  const navigation = (await import(`../messages/${locale}/navigation.json`)).default;
  const home = (await import(`../messages/${locale}/home.json`)).default;
  const gallery = (await import(`../messages/${locale}/gallery.json`)).default;
  
  // Optional: Metadata (if it exists, otherwise skip or handle error)
  // const metadata = (await import(`../messages/${locale}/metadata.json`)).default;

  return {
    locale,
    messages: {
      ...common,
      ...navigation,
      ...home,
      ...gallery
    }
  };
});