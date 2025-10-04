/*
  # Create Portfolio Database Tables

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title_en` (text)
      - `title_ar` (text)
      - `description_en` (text)
      - `description_ar` (text)
      - `image_url` (text)
      - `category` (text)
      - `created_at` (timestamptz)
      - `published` (boolean)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title_en` (text)
      - `title_ar` (text)
      - `content_en` (text)
      - `content_ar` (text)
      - `image_url` (text)
      - `slug` (text, unique)
      - `published` (boolean)
      - `created_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text)
      - `position_en` (text)
      - `position_ar` (text)
      - `content_en` (text)
      - `content_ar` (text)
      - `avatar_url` (text)
      - `rating` (integer)
      - `published` (boolean)
      - `created_at` (timestamptz)
    
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamptz)
      - `read` (boolean)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
    - Add policy for public read access on published content
    - Add policy for contact form submission
*/

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated admins can read admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  image_url text DEFAULT '',
  category text NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can manage all projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  content_en text NOT NULL,
  content_ar text NOT NULL,
  image_url text DEFAULT '',
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can manage all blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position_en text NOT NULL,
  position_ar text NOT NULL,
  content_en text NOT NULL,
  content_ar text NOT NULL,
  avatar_url text DEFAULT '',
  rating integer DEFAULT 5,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can manage all testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);