import { getTranslations } from 'next-intl/server';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main className="min-h-screen">
      <Navigation
        locale={locale}
        nav={{
          about: t('nav.about'),
          services: t('nav.services'),
          portfolio: t('nav.portfolio'),
          contact: t('nav.contact')
        }}
      />

      <Hero
        locale={locale}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        cta1={t('hero.cta1')}
        cta2={t('hero.cta2')}
      />

      <About
        locale={locale}
        title={t('about.title')}
        content={t('about.content')}
        skills={{
          research: t('about.skills.research'),
          reports: t('about.skills.reports'),
          translation: t('about.skills.translation'),
          transcription: t('about.skills.transcription'),
          tools: t('about.skills.tools')
        }}
      />

      <Services
        locale={locale}
        title={t('services.title')}
        items={{
          research: {
            title: t('services.items.research.title'),
            description: t('services.items.research.description')
          },
          translation: {
            title: t('services.items.translation.title'),
            description: t('services.items.translation.description')
          },
          transcription: {
            title: t('services.items.transcription.title'),
            description: t('services.items.transcription.description')
          },
          cv: {
            title: t('services.items.cv.title'),
            description: t('services.items.cv.description')
          }
        }}
      />

      <Portfolio
        locale={locale}
        title={t('portfolio.title')}
        subtitle={t('portfolio.subtitle')}
      />

      <Testimonials locale={locale} />

      <Contact
        locale={locale}
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        form={{
          name: t('contact.form.name'),
          email: t('contact.form.email'),
          message: t('contact.form.message'),
          submit: t('contact.form.submit')
        }}
      />

      <Footer quote={t('footer.quote')} locale={locale} />
    </main>
  );
}
