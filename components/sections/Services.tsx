"use client";

import { motion, useInView } from 'framer-motion';
import { FileText, Languages, AudioLines, File as FileEdit, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

interface Service {
  title: string;
  description: string;
}

interface ServicesProps {
  title: string;
  items: {
    research: Service;
    translation: Service;
    transcription: Service;
    cv: Service;
  };
  locale: string;
}

const serviceIcons = {
  research: FileText,
  translation: Languages,
  transcription: AudioLines,
  cv: FileEdit
};

const serviceColors = {
  research: { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-400', border: 'border-blue-500/30', shadow: 'shadow-blue-500/20' },
  translation: { bg: 'from-cyan-500 to-teal-500', text: 'text-cyan-400', border: 'border-cyan-500/30', shadow: 'shadow-cyan-500/20' },
  transcription: { bg: 'from-teal-500 to-emerald-500', text: 'text-teal-400', border: 'border-teal-500/30', shadow: 'shadow-teal-500/20' },
  cv: { bg: 'from-emerald-500 to-green-500', text: 'text-emerald-400', border: 'border-emerald-500/30', shadow: 'shadow-emerald-500/20' },
};

export function Services({ title, items, locale }: ServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 dark:from-slate-950 dark:to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: locale === 'ar' ? 'var(--font-palestine)' : 'system-ui' }}
          >
            {title}
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {Object.entries(items).map(([key, service], index) => {
            const Icon = serviceIcons[key as keyof typeof serviceIcons];
            const colors = serviceColors[key as keyof typeof serviceColors];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className={`h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-2 ${colors.border} hover:border-opacity-100 transition-all duration-500 group overflow-hidden relative`}>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <Icon className={`w-full h-full ${colors.text}`} />
                  </div>

                  <CardHeader className="relative z-10">
                    <motion.div
                      className={`mb-6 inline-block p-5 bg-gradient-to-br ${colors.bg} rounded-2xl shadow-lg ${colors.shadow}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </motion.div>

                    <CardTitle
                      className={`text-2xl md:text-3xl text-white mb-4 group-hover:${colors.text} transition-colors duration-300`}
                      style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
                    >
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <CardDescription
                      className="text-lg text-gray-300 leading-relaxed mb-6"
                      style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                    >
                      {service.description}
                    </CardDescription>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300"
                    >
                      <span style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}>
                        {locale === 'ar' ? 'اعرف المزيد' : 'Learn more'}
                      </span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </CardContent>

                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.bg}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
