'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { FileText, MessageSquare, Users, Eye, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardOverview() {
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    testimonials: 0,
    blogPosts: 0,
    totalViews: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const [projectsRes, contactsRes, testimonialsRes, blogsRes, analyticsRes] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      supabase.from('analytics_events').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      projects: projectsRes.count || 0,
      contacts: contactsRes.count || 0,
      testimonials: testimonialsRes.count || 0,
      blogPosts: blogsRes.count || 0,
      totalViews: analyticsRes.count || 0,
    });
  }

  const statCards = [
    { title: 'Total Projects', value: stats.projects, icon: FileText, color: 'from-blue-600 to-cyan-600' },
    { title: 'Contact Submissions', value: stats.contacts, icon: MessageSquare, color: 'from-emerald-600 to-teal-600' },
    { title: 'Testimonials', value: stats.testimonials, icon: Users, color: 'from-purple-600 to-pink-600' },
    { title: 'Blog Posts', value: stats.blogPosts, icon: FileText, color: 'from-orange-600 to-red-600' },
    { title: 'Total Page Views', value: stats.totalViews, icon: Eye, color: 'from-indigo-600 to-blue-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-left transition-all">
              <div className="text-white font-semibold">Add New Project</div>
              <div className="text-sm text-gray-400">Create a portfolio item</div>
            </button>
            <button className="p-4 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-lg text-left transition-all">
              <div className="text-white font-semibold">Write Blog Post</div>
              <div className="text-sm text-gray-400">Share your insights</div>
            </button>
            <button className="p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-left transition-all">
              <div className="text-white font-semibold">Review Contacts</div>
              <div className="text-sm text-gray-400">Respond to inquiries</div>
            </button>
            <button className="p-4 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-lg text-left transition-all">
              <div className="text-white font-semibold">View Analytics</div>
              <div className="text-sm text-gray-400">Check your stats</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
