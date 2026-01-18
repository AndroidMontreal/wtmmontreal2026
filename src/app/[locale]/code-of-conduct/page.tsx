import { setRequestLocale, getTranslations } from 'next-intl/server';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';

export default async function CodeOfConductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('CodeOfConduct');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AnnouncementBar />
      <Navbar />

      <main className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-4xl font-black text-slate-900 mb-10">{t('title')}</h1>

        <div className="space-y-8 text-lg leading-relaxed">
          {/* Why Policy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('whyPolicy')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              {['0', '1', '2'].map((i) => (
                <li key={i}>{t(`policyReasons.${i}`)}</li>
              ))}
            </ul>
          </section>

          {/* Dedication */}
          <section>
            <p className="mb-4">{t('dedicationIntro')}</p>
            <ul className="list-disc pl-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['0', '1', '2', '3', '4', '5', '6', '7'].map((i) => (
                <li key={i}>{t(`protectedCharacteristics.${i}`)}</li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">{t('notExhaustive')}</p>
          </section>

          {/* Harassment Definition */}
          <section>
            <p className="font-bold text-red-600 mb-4">{t('sexualContent')}</p>
            <p className="mb-4">{t('harassmentIntro')}</p>
            <ul className="list-disc pl-6 space-y-2">
              {['0', '1', '2', '3', '4', '5', '6', '7'].map((i) => (
                <li key={i}>{t(`harassmentExamples.${i}`)}</li>
              ))}
            </ul>
          </section>

          {/* Reporting */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t('reportingInfo').split('.')[0]}.</h3>
            <p className="mb-6 text-base">{t('reportingInfo')}</p>
            
            <div className="font-bold text-slate-900 mb-2">{t('contacts.title')}</div>
            <div className="flex flex-col gap-1">
              <a href="mailto:info@wtmmontreal.com" className="text-[#00A896] hover:underline">info@wtmmontreal.com</a>
              <a href="mailto:stefania@wtmmontreal.com" className="text-[#00A896] hover:underline">stefania@wtmmontreal.com</a>
            </div>
          </section>

          {/* Conclusion & License */}
          <section className="text-sm text-slate-500 border-t border-slate-200 pt-8 mt-12">
            <p className="mb-4">{t('conclusion')}</p>
            <h4 className="font-bold mb-2">{t('license.title')}</h4>
            <p>{t('license.text')}</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
