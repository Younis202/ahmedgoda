'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase, BlogPost } from '@/lib/supabase';
import { Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BlogFormProps {
  post?: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function BlogForm({ post, open, onOpenChange, onSuccess }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    excerpt_en: '',
    excerpt_ar: '',
    content_en: '',
    content_ar: '',
    cover_image: '',
    slug: '',
    tags: '',
    reading_time: 5,
    published: false,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title_en: post.title_en,
        title_ar: post.title_ar,
        excerpt_en: post.excerpt_en,
        excerpt_ar: post.excerpt_ar,
        content_en: post.content_en,
        content_ar: post.content_ar,
        cover_image: post.cover_image,
        slug: post.slug,
        tags: post.tags.join(', '),
        reading_time: post.reading_time,
        published: post.published,
      });
    } else {
      setFormData({
        title_en: '',
        title_ar: '',
        excerpt_en: '',
        excerpt_ar: '',
        content_en: '',
        content_ar: '',
        cover_image: '',
        slug: '',
        tags: '',
        reading_time: 5,
        published: false,
      });
    }
  }, [post, open]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData({ ...formData, title_en: value, slug: generateSlug(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const blogData = {
      title_en: formData.title_en,
      title_ar: formData.title_ar,
      excerpt_en: formData.excerpt_en,
      excerpt_ar: formData.excerpt_ar,
      content_en: formData.content_en,
      content_ar: formData.content_ar,
      cover_image: formData.cover_image,
      slug: formData.slug,
      tags: tagsArray,
      reading_time: formData.reading_time,
      published: formData.published,
      published_at: formData.published && !post?.published ? new Date().toISOString() : post?.published_at,
    };

    try {
      if (post) {
        const { error } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', post.id);

        if (error) throw error;
        toast.success('Blog post updated successfully!');
      } else {
        const { error } = await supabase.from('blog_posts').insert([blogData]);

        if (error) throw error;
        toast.success('Blog post created successfully!');
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-orange-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {post ? 'Edit Blog Post' : 'Write New Post'}
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
                onChange={(e) => handleTitleChange(e.target.value)}
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

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-gray-300">
              URL Slug
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="excerpt_en" className="text-gray-300">
                Excerpt (English)
              </Label>
              <Textarea
                id="excerpt_en"
                value={formData.excerpt_en}
                onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                required
                rows={3}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt_ar" className="text-gray-300">
                Excerpt (Arabic)
              </Label>
              <Textarea
                id="excerpt_ar"
                value={formData.excerpt_ar}
                onChange={(e) => setFormData({ ...formData, excerpt_ar: e.target.value })}
                required
                rows={3}
                className="bg-slate-800 border-slate-700 text-white"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="content_en" className="text-gray-300">
                Content (English)
              </Label>
              <Textarea
                id="content_en"
                value={formData.content_en}
                onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                required
                rows={8}
                className="bg-slate-800 border-slate-700 text-white font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content_ar" className="text-gray-300">
                Content (Arabic)
              </Label>
              <Textarea
                id="content_ar"
                value={formData.content_ar}
                onChange={(e) => setFormData({ ...formData, content_ar: e.target.value })}
                required
                rows={8}
                className="bg-slate-800 border-slate-700 text-white font-mono text-sm"
                dir="rtl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image" className="text-gray-300">
              Cover Image URL
            </Label>
            <Input
              id="cover_image"
              type="url"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-gray-300">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Technology, Tutorial, Tips"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reading_time" className="text-gray-300">
                Reading Time (minutes)
              </Label>
              <Input
                id="reading_time"
                type="number"
                value={formData.reading_time}
                onChange={(e) => setFormData({ ...formData, reading_time: parseInt(e.target.value) || 5 })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700"
                />
                <span className="text-gray-300">Publish immediately</span>
              </label>
            </div>
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
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {post ? 'Update' : 'Publish'} Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
