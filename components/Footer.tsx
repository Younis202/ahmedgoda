"use client";

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, Heart, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

interface FooterProps {
  quote: string;
  locale: string;
}

export function Footer({ quote, locale }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Mail, href: 'mailto:contact@ahmedgoda.com', label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const quickLinks = [
    { label: locale === 'ar' ? 'عن' : 'About', href: '#about' },
    { label: locale === 'ar' ? 'الخدمات' : 'Services', href: '#services' },
    { label: locale === 'ar' ? 'المشاريع' : 'Portfolio', href: '#portfolio' },
    { label: locale === 'ar' ? 'تواصل' : 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
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

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: locale === 'ar' ? 'var(--font-palestine)' : 'system-ui' }}
            >
              {locale === 'ar' ? 'أحمد جودة' : 'Ahmed Goda'}
            </h3>
            <p
              className="text-gray-400 leading-relaxed"
              style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
            >
              {locale === 'ar'
                ? 'كاتب أبحاث ومترجم محترف متخصص في إنتاج محتوى عالي الجودة بالعربية والإنجليزية.'
                : 'Professional research writer and translator specializing in high-quality content in Arabic and English.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
            >
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-blue-400 transition-colors"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h4
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
            >
              {locale === 'ar' ? 'تواصل معي' : 'Connect With Me'}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 rounded-xl border border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-blue-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-blue-500/10 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-lg text-blue-400/80 italic text-center md:text-left"
              style={{ fontFamily: locale === 'ar' ? 'var(--font-poetry)' : 'system-ui' }}
            >
              {quote}
            </p>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-full"
            >
              <ChevronUp className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center mt-8 text-gray-500 text-sm">
            <p className="flex items-center justify-center gap-2">
              {locale === 'ar' ? 'صنع بـ' : 'Made with'}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              © {new Date().getFullYear()} {locale === 'ar' ? 'أحمد جودة' : 'Ahmed Goda'}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
