'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase, Project } from '@/lib/supabase';
import { Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectFormProps {
  project?: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ProjectForm({ project, open, onOpenChange, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    image_url: '',
    category: '',
    tags: '',
    github_url: '',
    live_url: '',
    featured: false,
    order_index: 0,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title_en: project.title_en,
        title_ar: project.title_ar,
        description_en: project.description_en,
        description_ar: project.description_ar,
        image_url: project.image_url,
        category: project.category,
        tags: project.tags.join(', '),
        github_url: project.github_url,
        live_url: project.live_url,
        featured: project.featured,
        order_index: project.order_index,
      });
    } else {
      setFormData({
        title_en: '',
        title_ar: '',
        description_en: '',
        description_ar: '',
        image_url: '',
        category: '',
        tags: '',
        github_url: '',
        live_url: '',
        featured: false,
        order_index: 0,
      });
    }
  }, [project, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const projectData = {
      title_en: formData.title_en,
      title_ar: formData.title_ar,
      description_en: formData.description_en,
      description_ar: formData.description_ar,
      image_url: formData.image_url,
      category: formData.category,
      tags: tagsArray,
      github_url: formData.github_url,
      live_url: formData.live_url,
      featured: formData.featured,
      order_index: formData.order_index,
    };

    try {
      if (project) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);

        if (error) throw error;
        toast.success('Project updated successfully!');
      } else {
        const { error } = await supabase.from('projects').insert([projectData]);

        if (error) throw error;
        toast.success('Project created successfully!');
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-blue-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title_en" className="text-gray-300">
                Title (English)
              </Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title_ar" className="text-gray-300">
                Title (Arabic)
              </Label>
              <Input
                id="title_ar"
                value={formData.title_ar}
                onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                required
                className="bg-slate-800 border-slate-700 text-white"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description_en" className="text-gray-300">
                Description (English)
              </Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                required
                rows={4}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_ar" className="text-gray-300">
                Description (Arabic)
              </Label>
              <Textarea
                id="description_ar"
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                required
                rows={4}
                className="bg-slate-800 border-slate-700 text-white"
                dir="rtl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url" className="text-gray-300">
              Image URL
            </Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">
                Category
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="research">Research & Report Writing</option>
                <option value="translation">Translation</option>
                <option value="transcription">Transcription</option>
                <option value="cv">CV Formatting</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-gray-300">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Academic Writing, Medical, Business"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github_url" className="text-gray-300">
                Project File URL (Optional)
              </Label>
              <Input
                id="github_url"
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://drive.google.com/file/..."
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="live_url" className="text-gray-300">
                Portfolio Link (Optional)
              </Label>
              <Input
                id="live_url"
                type="url"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                placeholder="https://your-portfolio-link.com"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order_index" className="text-gray-300">
                Display Order
              </Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700"
                />
                <span className="text-gray-300">Featured Project</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {project ? 'Update' : 'Create'} Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
