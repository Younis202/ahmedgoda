"use client";

import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Languages, AudioLines, FileCheck, ExternalLink, Loader as Loader2 } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { supabase, Project } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface PortfolioProps {
  title: string;
  subtitle: string;
  locale: string;
}

const categoryIcons: Record<string, any> = {
  research: FileText,
  translation: Languages,
  transcription: AudioLines,
  cv: FileCheck
};

const categoryColors: Record<string, any> = {
  research: { bg: 'from-blue-600 via-cyan-600 to-blue-700', border: 'border-blue-500/40', glow: 'shadow-blue-500/30', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  translation: { bg: 'from-cyan-600 via-teal-600 to-emerald-600', border: 'border-cyan-500/40', glow: 'shadow-cyan-500/30', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  transcription: { bg: 'from-teal-600 via-emerald-600 to-green-600', border: 'border-teal-500/40', glow: 'shadow-teal-500/30', badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
  cv: { bg: 'from-orange-600 via-amber-600 to-yellow-600', border: 'border-orange-500/40', glow: 'shadow-orange-500/30', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30' }
};

export function Portfolio({ title, subtitle, locale }: PortfolioProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  }

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-black dark:to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: locale === 'ar' ? 'var(--font-palestine)' : 'system-ui' }}
          >
            {title}
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => {
              const Icon = categoryIcons[project.category] || FileText;
              const colors = categoryColors[project.category] || categoryColors.research;
              const projectTitle = locale === 'ar' ? project.title_ar : project.title_en;
              const projectDescription = locale === 'ar' ? project.description_ar : project.description_en;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Card className={`h-full overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-2 ${colors.border} hover:border-opacity-100 transition-all duration-500 group cursor-pointer hover:shadow-2xl ${colors.glow}`}>
                    <div className="relative h-56 overflow-hidden">
                      {project.image_url ? (
                        <>
                          <Image
                            src={project.image_url}
                            alt={projectTitle}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                        </>
                      ) : (
                        <div className={`h-full bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                          <motion.div
                            className="relative z-10"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="w-24 h-24 text-white drop-shadow-lg" />
                          </motion.div>
                        </div>
                      )}

                      <motion.div
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </motion.div>

                      <div className="absolute top-4 left-4">
                        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>

                    <CardContent className="p-6 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm relative space-y-4">
                      <motion.div
                        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50"
                        transition={{ duration: 0.3 }}
                      />

                      <h3
                        className="text-xl font-bold text-white leading-relaxed group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300 line-clamp-2"
                        style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
                      >
                        {projectTitle}
                      </h3>

                      <p
                        className="text-sm text-gray-400 leading-relaxed line-clamp-3"
                        style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                      >
                        {projectDescription}
                      </p>

                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <Badge key={i} variant="outline" className={`${colors.badge} text-xs`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <motion.div
                        className="pt-2 flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                      >
                        <span style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}>
                          {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        </span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
