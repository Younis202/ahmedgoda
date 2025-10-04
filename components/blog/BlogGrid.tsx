'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase, BlogPost } from '@/lib/supabase';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BlogGridProps {
  locale: string;
}

export function BlogGrid({ locale }: BlogGridProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }


  if (loading) {
    return (
      <div className="text-center text-gray-400 py-12">
        <div className="animate-pulse">Loading blog posts...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-blue-500/30">
        <CardContent className="py-12 text-center text-gray-400">
          {locale === 'ar' ? 'لا توجد مقالات حالياً' : 'No blog posts yet'}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => {
        const title = locale === 'ar' ? post.title_ar : post.title_en;
        const excerpt = locale === 'ar' ? post.excerpt_ar : post.excerpt_en;

        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/30 hover:border-blue-500/70 transition-all duration-300 overflow-hidden group h-full flex flex-col">
              {post.cover_image && (
                <div className="aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.cover_image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <CardContent className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.reading_time} {locale === 'ar' ? 'دقيقة' : 'min read'}
                  </span>
                  {post.published_at && (
                    <>
                      <span>•</span>
                      <span>
                        {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                      </span>
                    </>
                  )}
                </div>

                <h3
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
                >
                  {title}
                </h3>

                <p
                  className="text-gray-300 leading-relaxed flex-1 line-clamp-3"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                >
                  {excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 gap-2 group/btn"
                  asChild
                >
                  <a href={`/${locale}/blog/${post.slug}`}>
                    {locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
