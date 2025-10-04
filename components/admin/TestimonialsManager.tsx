'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase, Testimonial } from '@/lib/supabase';
import { Plus, CircleCheck as CheckCircle, Circle as XCircle, Star, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { TestimonialForm } from './TestimonialForm';
import { toast } from 'sonner';

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTestimonials(data);
    }
    setLoading(false);
  }

  async function toggleApproved(id: string, currentStatus: boolean) {
    const { error } = await supabase
      .from('testimonials')
      .update({ approved: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchTestimonials();
    }
  }

  async function toggleFeatured(id: string, currentStatus: boolean) {
    const { error } = await supabase
      .from('testimonials')
      .update({ featured: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchTestimonials();
    }
  }

  async function deleteTestimonial(id: string) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (!error) {
      toast.success('Testimonial deleted successfully');
      fetchTestimonials();
    } else {
      toast.error('Failed to delete testimonial');
    }
  }

  function handleEdit(testimonial: Testimonial) {
    setEditingTestimonial(testimonial);
    setFormOpen(true);
  }

  function handleAdd() {
    setEditingTestimonial(null);
    setFormOpen(true);
  }

  function handleFormClose() {
    setFormOpen(false);
    setEditingTestimonial(null);
  }

  if (loading) {
    return <div className="text-center text-gray-400 py-12">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Testimonials</h2>
        <Button onClick={handleAdd} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardContent className="py-12 text-center text-gray-400">
            No testimonials yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/30 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{testimonial.client_name}</h3>
                      {testimonial.client_title && (
                        <p className="text-sm text-gray-400">{testimonial.client_title}</p>
                      )}
                      {testimonial.client_company && (
                        <p className="text-sm text-blue-400">{testimonial.client_company}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {testimonial.approved && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Approved
                        </Badge>
                      )}
                      {testimonial.featured && (
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                  </div>

                  {testimonial.rating && (
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="bg-slate-900/50 p-4 rounded-lg border border-purple-500/20">
                    <p className="text-gray-300 text-sm">&ldquo;{testimonial.testimonial_en}&rdquo;</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                    <Button
                      size="sm"
                      onClick={() => toggleApproved(testimonial.id, testimonial.approved)}
                      className={testimonial.approved ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                    >
                      {testimonial.approved ? (
                        <><CheckCircle className="w-4 h-4 mr-1" /> Approved</>
                      ) : (
                        <><XCircle className="w-4 h-4 mr-1" /> Approve</>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => toggleFeatured(testimonial.id, testimonial.featured)}
                      className={testimonial.featured ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-slate-600 hover:bg-slate-700'}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      {testimonial.featured ? 'Featured' : 'Feature'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteTestimonial(testimonial.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <TestimonialForm
        testimonial={editingTestimonial}
        open={formOpen}
        onOpenChange={handleFormClose}
        onSuccess={fetchTestimonials}
      />
    </div>
  );
}
