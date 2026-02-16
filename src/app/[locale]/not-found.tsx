import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('Common.NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-black text-primary/20 mb-4 select-none">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
        {t('title')}
      </h2>
      <p className="text-slate-600 text-lg max-w-md mb-10 leading-relaxed">
        {t('description')}
      </p>
      
      <div className="flex gap-4">
        <Button href="/" variant="primary" size="lg">
          {t('backHome')}
        </Button>
      </div>
    </div>
  );
}
