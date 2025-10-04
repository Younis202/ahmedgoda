'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase, Testimonial } from '@/lib/supabase';
import { Loader as Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function TestimonialForm({ testimonial, open, onOpenChange, onSuccess }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_title: '',
    client_company: '',
    client_avatar: '',
    testimonial_en: '',
    testimonial_ar: '',
    rating: 5,
    approved: false,
    featured: false,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        client_name: testimonial.client_name,
        client_title: testimonial.client_title,
        client_company: testimonial.client_company,
        client_avatar: testimonial.client_avatar,
        testimonial_en: testimonial.testimonial_en,
        testimonial_ar: testimonial.testimonial_ar,
        rating: testimonial.rating,
        approved: testimonial.approved,
        featured: testimonial.featured,
      });
    } else {
      setFormData({
        client_name: '',
        client_title: '',
        client_company: '',
        client_avatar: '',
        testimonial_en: '',
        testimonial_ar: '',
        rating: 5,
        approved: true,
        featured: false,
      });
    }
  }, [testimonial, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (testimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', testimonial.id);

        if (error) throw error;
        toast.success('Testimonial updated successfully!');
      } else {
        const { error } = await supabase.from('testimonials').insert([formData]);

        if (error) throw error;
        toast.success('Testimonial created successfully!');
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {testimonial ? 'Edit Testimonial' : 'Add Testimonial'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name" className="text-gray-300">
                Client Name
              </Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_title" className="text-gray-300">
                Job Title
              </Label>
              <Input
                id="client_title"
                value={formData.client_title}
                onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_company" className="text-gray-300">
                Company
              </Label>
              <Input
                id="client_company"
                value={formData.client_company}
                onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_avatar" className="text-gray-300">
                Avatar URL
              </Label>
              <Input
                id="client_avatar"
                type="url"
                value={formData.client_avatar}
                onChange={(e) => setFormData({ ...formData, client_avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testimonial_en" className="text-gray-300">
                Testimonial (English)
              </Label>
              <Textarea
                id="testimonial_en"
                value={formData.testimonial_en}
                onChange={(e) => setFormData({ ...formData, testimonial_en: e.target.value })}
                required
                rows={6}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial_ar" className="text-gray-300">
                Testimonial (Arabic)
              </Label>
              <Textarea
                id="testimonial_ar"
                value={formData.testimonial_ar}
                onChange={(e) => setFormData({ ...formData, testimonial_ar: e.target.value })}
                required
                rows={6}
                className="bg-slate-800 border-slate-700 text-white"
                dir="rtl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating })}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      rating <= formData.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.approved}
                onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700"
              />
              <span className="text-gray-300">Approved</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700"
              />
              <span className="text-gray-300">Featured</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="border-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {testimonial ? 'Update' : 'Create'} Testimonial
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
