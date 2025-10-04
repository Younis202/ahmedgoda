"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationProps {
  locale: string;
  nav: {
    about: string;
    services: string;
    portfolio: string;
    contact: string;
  };
  showBlog?: boolean;
  showProjects?: boolean;
}

export function Navigation({ locale, nav, showBlog = true, showProjects = true }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${locale}#${id}`;
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg shadow-blue-500/10 border-b border-blue-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <h1
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-palestine)' }}
              >
                {locale === 'ar' ? 'أحمد جودة' : 'Ahmed Goda'}
              </h1>
            </motion.div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1">
                {Object.entries(nav).map(([key, label], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(key)}
                      className="text-white hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                      style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                    >
                      {label}
                    </Button>
                  </motion.div>
                ))}
                {showProjects && (
                  <Button
                    variant="ghost"
                    onClick={() => window.location.href = `/${locale}/projects`}
                    className="text-white hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                  >
                    {locale === 'ar' ? 'المشاريع' : 'Projects'}
                  </Button>
                )}
                {showBlog && (
                  <Button
                    variant="ghost"
                    onClick={() => window.location.href = `/${locale}/blog`}
                    className="text-white hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                  >
                    {locale === 'ar' ? 'المدونة' : 'Blog'}
                  </Button>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center gap-2"
              >
                <ThemeToggle />
                <LanguageSwitcher currentLocale={locale} />

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:text-blue-400 hover:bg-blue-500/10"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-slate-900/98 backdrop-blur-md border-b border-blue-500/10 md:hidden"
          >
            <div className="container mx-auto px-6 py-6 space-y-2">
              {Object.entries(nav).map(([key, label]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(key)}
                    className="w-full text-white hover:text-blue-400 hover:bg-blue-500/10 justify-start text-lg py-6"
                    style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                  >
                    {label}
                  </Button>
                </motion.div>
              ))}
              {showProjects && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = `/${locale}/projects`;
                  }}
                  className="w-full text-white hover:text-blue-400 hover:bg-blue-500/10 justify-start text-lg py-6"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                >
                  {locale === 'ar' ? 'المشاريع' : 'Projects'}
                </Button>
              )}
              {showBlog && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = `/${locale}/blog`;
                  }}
                  className="w-full text-white hover:text-blue-400 hover:bg-blue-500/10 justify-start text-lg py-6"
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                >
                  {locale === 'ar' ? 'المدونة' : 'Blog'}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
