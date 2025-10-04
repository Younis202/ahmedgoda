"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles, FileText, Languages, Mic } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  cta1: string;
  cta2: string;
  locale: string;
}

export function Hero({ title, subtitle, cta1, cta2, locale }: HeroProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const floatingIcons = [
    { Icon: FileText, delay: 0, position: 'top-1/4 left-1/4' },
    { Icon: Languages, delay: 0.2, position: 'top-1/3 right-1/4' },
    { Icon: Mic, delay: 0.4, position: 'bottom-1/3 left-1/3' },
    { Icon: Sparkles, delay: 0.6, position: 'bottom-1/4 right-1/3' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 dark:from-black dark:via-slate-950 dark:to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position} hidden lg:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + 0.5,
          }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: delay,
            }}
          >
            <Icon className="w-16 h-16 text-blue-400" />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={locale === 'ar' ? 'lg:order-2' : ''}
          >
            <motion.div
              className="relative w-full max-w-md mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="relative rounded-full overflow-hidden border-4 border-blue-500/50 shadow-2xl shadow-blue-500/50"
                whileHover={{ scale: 1.05, borderColor: 'rgb(59 130 246)' }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/me.png"
                  alt="Ahmed Goda"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-center lg:text-${locale === 'ar' ? 'right' : 'left'} ${locale === 'ar' ? 'lg:order-1' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                {locale === 'ar' ? 'مرحباً بك 👋' : 'Welcome 👋'}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
              style={{ fontFamily: locale === 'ar' ? 'var(--font-palestine)' : 'system-ui' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => scrollToSection('portfolio')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
                >
                  {cta1}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 bg-transparent backdrop-blur-sm"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
                >
                  {cta2}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5
          }}
        >
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </motion.div>
      </div>
    </section>
  );
}
