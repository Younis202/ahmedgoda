'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase, BlogPost } from '@/lib/supabase';
import { Plus, CreditCard as Edit, Trash2, Eye, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { BlogForm } from './BlogForm';
import { toast } from 'sonner';

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }

  async function togglePublished(id: string, currentStatus: boolean) {
    const { error } = await supabase
      .from('blog_posts')
      .update({
        published: !currentStatus,
        published_at: !currentStatus ? new Date().toISOString() : null
      })
      .eq('id', id);

    if (!error) {
      fetchPosts();
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (!error) {
      toast.success('Post deleted successfully');
      fetchPosts();
    } else {
      toast.error('Failed to delete post');
    }
  }

  function handleEdit(post: BlogPost) {
    setEditingPost(post);
    setFormOpen(true);
  }

  function handleAdd() {
    setEditingPost(null);
    setFormOpen(true);
  }

  function handleFormClose() {
    setFormOpen(false);
    setEditingPost(null);
  }

  if (loading) {
    return <div className="text-center text-gray-400 py-12">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
        <Button onClick={handleAdd} className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Write New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardContent className="py-12 text-center text-gray-400">
            No blog posts yet. Start writing to share your insights!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-orange-500/30 hover:border-orange-500/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {post.cover_image && (
                      <div className="w-48 h-32 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                        <img
                          src={post.cover_image}
                          alt={post.title_en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{post.title_en}</h3>
                          <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt_en}</p>
                        </div>
                        <Badge className={post.published ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-gray-500/20 text-gray-400 border-gray-500/50'}>
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {post.reading_time} min read
                        </div>
                        {post.published_at && (
                          <span>
                            Published {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded border border-orange-500/30">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => togglePublished(post.id, post.published)}
                          className={post.published ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'}
                        >
                          {post.published ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(post)} className="border-orange-500/30">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deletePost(post.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 ml-auto"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <BlogForm
        post={editingPost}
        open={formOpen}
        onOpenChange={handleFormClose}
        onSuccess={fetchPosts}
      />
    </div>
  );
}
