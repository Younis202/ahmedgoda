import { getTranslations } from 'next-intl/server';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {locale === 'ar' ? 'معرض الأعمال' : 'Portfolio'}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}>
            {locale === 'ar'
              ? 'استعرض مجموعة من المشاريع التي تعكس خبرتي في الكتابة، الترجمة، والتفريغ'
              : 'Browse a collection of projects showcasing my expertise in writing, translation, and transcription'}
          </p>
        </div>

        <ProjectsGrid locale={locale} />
      </div>

      <Footer quote={t('footer.quote')} locale={locale} />
    </main>
  );
}
