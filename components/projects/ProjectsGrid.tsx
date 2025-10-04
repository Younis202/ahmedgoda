'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase, Project } from '@/lib/supabase';
import { FileText, ExternalLink } from 'lucide-react';

interface ProjectsGridProps {
  locale: string;
}

export function ProjectsGrid({ locale }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  }

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const allCategories = Array.from(new Set(projects.map(p => p.category)));
  const categories = ['all', ...allCategories];

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-12">
        <div className="animate-pulse">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? 'default' : 'outline'}
              className={filter === category
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                : 'border-blue-500/30 text-gray-300 hover:bg-blue-500/10'
              }
            >
              {category === 'all'
                ? (locale === 'ar' ? 'الكل' : 'All')
                : category}
            </Button>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardContent className="py-12 text-center text-gray-400">
            {locale === 'ar' ? 'لا توجد مشاريع في هذه الفئة' : 'No projects in this category'}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const title = locale === 'ar' ? project.title_ar : project.title_en;
            const description = locale === 'ar' ? project.description_ar : project.description_en;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a href={`/${locale}/projects/${project.id}`}>
                  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/30 hover:border-blue-500/70 transition-all duration-300 overflow-hidden group h-full flex flex-col cursor-pointer">
                    {project.image_url && (
                      <div className="aspect-video w-full overflow-hidden bg-slate-900">
                        <img
                          src={project.image_url}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <CardContent className="p-6 flex-1 flex flex-col space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge className="mb-3 bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {project.category}
                          </Badge>
                          <h3
                            className="text-xl font-bold text-white"
                            style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
                          >
                            {title}
                          </h3>
                        </div>
                      </div>

                      <p
                        className="text-gray-300 leading-relaxed flex-1 line-clamp-3"
                        style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                      >
                        {description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} className="bg-slate-700/50 text-gray-300 border-slate-600">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 gap-2 group/btn"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        {locale === 'ar' ? 'عرض المشروع' : 'View Project'}
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
