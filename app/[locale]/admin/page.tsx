'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, FileText, MessageSquare, Users, TrendingUp } from 'lucide-react';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { ProjectsManager } from '@/components/admin/ProjectsManager';
import { ContactManager } from '@/components/admin/ContactManager';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';
import { BlogManager } from '@/components/admin/BlogManager';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { user } = await getCurrentUser();
    if (!user) {
      router.push('/admin/login');
      return;
    }
    setUser(user);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-blue-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.email}</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-blue-500/30 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-blue-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-blue-600">
              <Users className="w-4 h-4 mr-2" />
              Testimonials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
