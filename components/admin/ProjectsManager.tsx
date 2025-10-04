'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase, Project } from '@/lib/supabase';
import { Plus, CreditCard as Edit, Trash2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectForm } from './ProjectForm';
import { toast } from 'sonner';

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  }

  async function deleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (!error) {
      toast.success('Project deleted successfully');
      fetchProjects();
    } else {
      toast.error('Failed to delete project');
    }
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setFormOpen(true);
  }

  function handleAdd() {
    setEditingProject(null);
    setFormOpen(true);
  }

  function handleFormClose() {
    setFormOpen(false);
    setEditingProject(null);
  }

  async function toggleFeatured(id: string, currentStatus: boolean) {
    const { error } = await supabase
      .from('projects')
      .update({ featured: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchProjects();
    }
  }

  if (loading) {
    return <div className="text-center text-gray-400 py-12">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Portfolio Projects</h2>
        <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardContent className="py-12 text-center text-gray-400">
            No projects yet. Click &quot;Add New Project&quot; to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/30 hover:border-blue-500/50 transition-all overflow-hidden group">
                {project.image_url && (
                  <div className="aspect-video w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image_url}
                      alt={project.title_en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{project.title_en}</h3>
                      {project.featured && (
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{project.description_en}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
                      {project.category}
                    </span>
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                    <Button
                      size="sm"
                      onClick={() => toggleFeatured(project.id, project.featured)}
                      className={project.featured ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-slate-600 hover:bg-slate-700'}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      {project.featured ? 'Featured' : 'Feature'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(project)} className="border-blue-500/30">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteProject(project.id)}
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

      <ProjectForm
        project={editingProject}
        open={formOpen}
        onOpenChange={handleFormClose}
        onSuccess={fetchProjects}
      />
    </div>
  );
}
