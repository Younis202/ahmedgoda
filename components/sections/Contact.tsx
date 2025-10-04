"use client";

import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Linkedin, Mail, Send, MessageSquare, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface ContactProps {
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
  locale: string;
}

export function Contact({ title, subtitle, form, locale }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            status: 'new'
          }
        ]);

      if (error) throw error;

      toast({
        title: locale === 'ar' ? 'تم إرسال الرسالة' : 'Message Sent',
        description: locale === 'ar'
          ? 'شكراً لتواصلك! سنرد عليك قريباً.'
          : 'Thank you for reaching out! We\'ll get back to you soon.',
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: locale === 'ar' ? 'حدث خطأ' : 'Error',
        description: locale === 'ar'
          ? 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.'
          : 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 dark:from-black dark:via-slate-950 dark:to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
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
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 mx-auto rounded-full mb-8"
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

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-2 border-blue-500/30 shadow-xl shadow-blue-500/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}>
                    {locale === 'ar' ? 'أرسل رسالتك' : 'Send a Message'}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Input
                      placeholder={form.name}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="text-lg p-6 bg-slate-900/50 border-blue-500/30 focus:border-blue-500 text-white placeholder:text-gray-500 backdrop-blur-sm"
                      style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Input
                      type="email"
                      placeholder={form.email}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="text-lg p-6 bg-slate-900/50 border-blue-500/30 focus:border-blue-500 text-white placeholder:text-gray-500 backdrop-blur-sm"
                      style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Textarea
                      placeholder={form.message}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="text-lg p-6 bg-slate-900/50 border-blue-500/30 focus:border-blue-500 text-white placeholder:text-gray-500 backdrop-blur-sm resize-none"
                      style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-lg py-6 rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                          {locale === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {form.submit}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>

            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white" style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}>
                      {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </h4>
                    <p className="text-sm text-gray-400" style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}>
                      contact@ahmedgoda.com
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                  asChild
                >
                  <a href="mailto:contact@ahmedgoda.com">
                    <Mail className="w-4 h-4" />
                    {locale === 'ar' ? 'أرسل بريد' : 'Send Email'}
                  </a>
                </Button>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-2 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white" style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}>
                      LinkedIn
                    </h4>
                    <p className="text-sm text-gray-400" style={{ fontFamily: locale === 'ar' ? 'var(--font-tido)' : 'system-ui' }}>
                      {locale === 'ar' ? 'تواصل مهني' : 'Professional Network'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                  asChild
                >
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                    {locale === 'ar' ? 'زر الملف' : 'Visit Profile'}
                  </a>
                </Button>
              </Card>

              <motion.div
                className="p-6 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm border-2 border-emerald-500/30 rounded-xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(16, 185, 129, 0.1)',
                    '0 0 40px rgba(16, 185, 129, 0.2)',
                    '0 0 20px rgba(16, 185, 129, 0.1)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-sm text-gray-300 text-center leading-relaxed" style={{ fontFamily: locale === 'ar' ? 'var(--font-poetry)' : 'system-ui' }}>
                  {locale === 'ar'
                    ? '"التواصل الفعّال هو جسر النجاح"'
                    : '"Effective communication is the bridge to success"'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
