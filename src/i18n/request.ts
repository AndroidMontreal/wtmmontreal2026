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
  const header = (await import(`../messages/${locale}/header.json`)).default;
  const footer = (await import(`../messages/${locale}/footer.json`)).default;
  const hero = (await import(`../messages/${locale}/hero.json`)).default;
  const stats = (await import(`../messages/${locale}/stats.json`)).default;
  const gallery = (await import(`../messages/${locale}/gallery.json`)).default;
  const sponsors = (await import(`../messages/${locale}/sponsors.json`)).default;
  const partners = (await import(`../messages/${locale}/partners.json`)).default;
  const team = (await import(`../messages/${locale}/team.json`)).default;
  const codeOfConduct = (await import(`../messages/${locale}/code-of-conduct.json`)).default;
  const metadata = (await import(`../messages/${locale}/metadata.json`)).default;

  return {
    locale,
    messages: {
      Common: common,
      Header: header,
      Footer: footer,
      Hero: hero,
      Stats: stats,
      ...gallery,
      Sponsors: sponsors,
      Partners: partners,
      Team: team.Team, // Flatten it since the JSON has "Team" key at root
      CodeOfConduct: codeOfConduct,
      Metadata: metadata.Metadata
    }
  };
});