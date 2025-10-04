"use client";

import { motion, useInView } from 'framer-motion';
import { FileText, Languages, AudioLines, FileCheck, FileSpreadsheet, Award, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useRef } from 'react';

interface AboutProps {
  title: string;
  content: string;
  skills: {
    research: string;
    reports: string;
    translation: string;
    transcription: string;
    tools: string;
  };
  locale: string;
}

const skillIcons = {
  research: FileText,
  reports: FileCheck,
  translation: Languages,
  transcription: AudioLines,
  tools: FileSpreadsheet
};

export function About({ title, content, skills, locale }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { icon: Award, value: '5+', label: locale === 'ar' ? 'سنوات خبرة' : 'Years Experience' },
    { icon: Target, value: '200+', label: locale === 'ar' ? 'مشروع منجز' : 'Projects Completed' },
    { icon: Zap, value: '100%', label: locale === 'ar' ? 'رضا العملاء' : 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-black dark:to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-blue-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: locale === 'ar' ? 'var(--font-palestine)' : 'system-ui' }}
          >
            {title}
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative">
              <motion.div
                className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : {}}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <p
                className="text-lg md:text-xl text-gray-300 leading-relaxed ps-8"
                style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
              >
                {content}
              </p>
            </div>

            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-gradient-to-br from-blue-900/30 to-cyan-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/30"
                  whileHover={{ scale: 1.05, borderColor: 'rgb(59 130 246)' }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400" style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {Object.entries(skills).map(([key, value], index) => {
              const Icon = skillIcons[key as keyof typeof skillIcons];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-2 border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="p-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p
                          className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors"
                          style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                        >
                          {value}
                        </p>
                      </div>
                      <motion.div
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
