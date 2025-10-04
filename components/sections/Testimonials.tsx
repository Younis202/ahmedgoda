'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { supabase, Testimonial } from '@/lib/supabase';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  locale: string;
}

export function Testimonials({ locale }: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching testimonials:', error);
    }

    if (data) {
      setTestimonials(data);
    }
    setLoading(false);
  }

  if (testimonials.length === 0 && !loading) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 dark:from-slate-950 dark:via-black dark:to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

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
            {locale === 'ar' ? 'آراء العملاء' : 'Client Testimonials'}
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
            {locale === 'ar'
              ? 'اكتشف ما يقوله عملائي عن جودة العمل والاحترافية'
              : 'Discover what my clients say about quality of work and professionalism'}
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-400">Loading testimonials...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
            const text = locale === 'ar' ? testimonial.testimonial_ar : testimonial.testimonial_en;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Quote className="w-8 h-8 text-blue-400 opacity-50" />
                      {testimonial.rating && (
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      )}
                    </div>

                    <p
                      className="text-gray-300 leading-relaxed italic"
                      style={{ fontFamily: locale === 'ar' ? 'var(--font-poetry)' : 'system-ui' }}
                    >
                      &ldquo;{text}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                      {testimonial.client_avatar && (
                        <img
                          src={testimonial.client_avatar}
                          alt={testimonial.client_name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50"
                        />
                      )}
                      <div>
                        <h4 className="text-white font-bold" style={{ fontFamily: locale === 'ar' ? 'var(--font-camel)' : 'system-ui' }}>
                          {testimonial.client_name}
                        </h4>
                        {testimonial.client_title && (
                          <p className="text-sm text-gray-400">{testimonial.client_title}</p>
                        )}
                        {testimonial.client_company && (
                          <p className="text-sm text-blue-400">{testimonial.client_company}</p>
                        )}
                      </div>
                    </div>
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
