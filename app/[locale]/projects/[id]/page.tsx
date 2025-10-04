import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Github, ExternalLink, Tag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProjectPageProps {
  params: {
    locale: string;
    id: string;
  };
}

async function getProject(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, id } = params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const title = locale === 'ar' ? project.title_ar : project.title_en;
  const description = locale === 'ar' ? project.description_ar : project.description_en;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-6 py-24">
        <Link href={`/${locale}/projects`}>
          <Button variant="outline" className="mb-8 border-blue-500/30 hover:bg-blue-500/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'العودة للمشاريع' : 'Back to Projects'}
          </Button>
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              {project.image_url && (
                <div className="aspect-video w-full rounded-2xl overflow-hidden border-2 border-blue-500/20 mb-6">
                  <img
                    src={project.image_url}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30 flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                {project.github_url && (
                  <Button
                    asChild
                    className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700"
                    size="lg"
                  >
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      {locale === 'ar' ? 'عرض الكود المصدري' : 'View Source Code'}
                    </a>
                  </Button>
                )}

                {project.live_url && (
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    size="lg"
                  >
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      {locale === 'ar' ? 'معاينة مباشرة' : 'Live Demo'}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div>
              <div className="mb-6">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="ml-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30">
                    {locale === 'ar' ? 'مميز' : 'Featured'}
                  </span>
                )}
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: locale === 'ar' ? 'var(--font-palestine)' : 'system-ui' }}
              >
                {title}
              </h1>

              <div className="flex items-center gap-2 text-gray-400 mb-8">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(project.created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div
                className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
