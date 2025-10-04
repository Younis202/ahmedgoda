'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  featured: boolean;
  image_url: string;
  github_url: string;
  live_url: string;
  tags: string[];
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  content_en: string;
  content_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  cover_image: string;
  published: boolean;
  published_at: string | null;
  views: number;
  reading_time: number;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  client_title: string;
  client_company: string;
  testimonial_en: string;
  testimonial_ar: string;
  rating: number;
  client_avatar: string;
  featured: boolean;
  approved: boolean;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  replied_at: string | null;
  notes: string;
  created_at: string;
};

export type AnalyticsEvent = {
  id: string;
  event_type: string;
  page_path?: string;
  referrer?: string;
  user_agent?: string;
  locale?: string;
  metadata: Record<string, any>;
  created_at: string;
};
