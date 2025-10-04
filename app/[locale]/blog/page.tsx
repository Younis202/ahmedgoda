import { getTranslations } from 'next-intl/server';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogGrid } from '@/components/blog/BlogGrid';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navigation
        locale={locale}
        nav={{
          about: t('nav.about'),
          services: t('nav.services'),
          portfolio: t('nav.portfolio'),
          contact: t('nav.contact')
        }}
      />

      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: locale === 'ar' ? 'var(--font-palestine)' : 'system-ui' }}>
            {locale === 'ar' ? 'المدونة' : 'Blog'}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}>
            {locale === 'ar'
              ? 'أفكار ونصائح حول الكتابة، الترجمة، والتفريغ الاحترافي'
              : 'Insights and tips about professional writing, translation, and transcription'}
          </p>
        </div>

        <BlogGrid locale={locale} />
      </div>

      <Footer quote={t('footer.quote')} locale={locale} />
    </main>
  );
}
