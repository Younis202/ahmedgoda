import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Eye, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error || !data) return null;

  await supabase
    .from('blog_posts')
    .update({ views: data.views + 1 })
    .eq('id', data.id);

  return data;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const title = locale === 'ar' ? post.title_ar : post.title_en;
  const content = locale === 'ar' ? post.content_ar : post.content_en;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-6 py-24">
        <Link href={`/${locale}/blog`}>
          <Button variant="outline" className="mb-8 border-orange-500/30 hover:bg-orange-500/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {post.cover_image && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border-2 border-orange-500/20">
              <img
                src={post.cover_image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: locale === 'ar' ? 'var(--font-palestine)' : 'system-ui' }}
            >
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span>{formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{post.reading_time} {locale === 'ar' ? 'دقائق قراءة' : 'min read'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>{post.views} {locale === 'ar' ? 'مشاهدة' : 'views'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full border border-orange-500/30 flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="prose prose-invert prose-lg max-w-none"
            style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
