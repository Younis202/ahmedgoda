/*
  # Create Complete Portfolio Database Schema
  
  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title_en` (text) - English title
      - `title_ar` (text) - Arabic title
      - `description_en` (text) - English description
      - `description_ar` (text) - Arabic description
      - `image_url` (text) - Project image URL
      - `category` (text) - Project category
      - `tags` (text[]) - Array of tags
      - `github_url` (text) - GitHub repository URL
      - `live_url` (text) - Live demo URL
      - `featured` (boolean) - Featured project flag
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title_en` (text) - English title
      - `title_ar` (text) - Arabic title
      - `excerpt_en` (text) - English excerpt
      - `excerpt_ar` (text) - Arabic excerpt
      - `content_en` (text) - English content
      - `content_ar` (text) - Arabic content
      - `cover_image` (text) - Cover image URL
      - `slug` (text, unique) - URL slug
      - `tags` (text[]) - Array of tags
      - `published` (boolean) - Published status
      - `views` (integer) - View count
      - `reading_time` (integer) - Reading time in minutes
      - `published_at` (timestamptz) - Published date
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `client_name` (text) - Client name
      - `client_title` (text) - Client job title
      - `client_company` (text) - Client company
      - `client_avatar` (text) - Avatar URL
      - `testimonial_en` (text) - English testimonial
      - `testimonial_ar` (text) - Arabic testimonial
      - `rating` (integer) - Rating 1-5
      - `approved` (boolean) - Approval status
      - `featured` (boolean) - Featured testimonial flag
      - `created_at` (timestamptz)
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text) - Sender name
      - `email` (text) - Sender email
      - `message` (text) - Message content
      - `status` (text) - Status: new, read, replied, archived
      - `notes` (text) - Admin notes
      - `replied_at` (timestamptz) - Reply timestamp
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public can read published/approved content
    - Authenticated users can manage all content
    - Anyone can submit contact forms
*/

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  image_url text DEFAULT '',
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  github_url text DEFAULT '',
  live_url text DEFAULT '',
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view all projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  excerpt_en text NOT NULL,
  excerpt_ar text NOT NULL,
  content_en text NOT NULL,
  content_ar text NOT NULL,
  cover_image text DEFAULT '',
  slug text UNIQUE NOT NULL,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  views integer DEFAULT 0,
  reading_time integer DEFAULT 5,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text DEFAULT '',
  client_company text DEFAULT '',
  client_avatar text DEFAULT '',
  testimonial_en text NOT NULL,
  testimonial_ar text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  approved boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (approved = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (true);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  notes text DEFAULT '',
  replied_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);

-- Create updated_at trigger for projects
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();