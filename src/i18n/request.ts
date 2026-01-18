import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  // Load all translation files
  const common = (await import(`../messages/${locale}/common.json`)).default;
  const navigation = (await import(`../messages/${locale}/navigation.json`)).default;
  const home = (await import(`../messages/${locale}/home.json`)).default;
  const gallery = (await import(`../messages/${locale}/gallery.json`)).default;
  const sponsors = (await import(`../messages/${locale}/sponsors.json`)).default;
  const partners = (await import(`../messages/${locale}/partners.json`)).default;
  const codeOfConduct = (await import(`../messages/${locale}/code-of-conduct.json`)).default;
  
  // Optional: Metadata (if it exists, otherwise skip or handle error)
  // const metadata = (await import(`../messages/${locale}/metadata.json`)).default;

  return {
    locale,
    messages: {
      ...common,
      ...navigation,
      ...home,
      ...gallery,
      Sponsors: sponsors,
      Partners: partners,
      CodeOfConduct: codeOfConduct
    }
  };
});