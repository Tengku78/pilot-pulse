-- PilotPulse Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('pilot', 'cabin_crew', 'recruiter', 'admin');
CREATE TYPE contract_type AS ENUM ('Full-time', 'Part-time', 'Contract', 'Freelance');
CREATE TYPE job_status AS ENUM ('active', 'closed', 'draft', 'pending_approval');
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'accepted', 'rejected');
CREATE TYPE job_type AS ENUM ('pilot', 'cabin_crew');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'pilot',
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pilot Jobs table
CREATE TABLE jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  airline_name TEXT NOT NULL,
  airline_logo_url TEXT,
  contract_type contract_type NOT NULL,
  region TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'USD',
  salary_period TEXT,
  tags TEXT[] DEFAULT '{}',
  status job_status DEFAULT 'active',
  posted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  application_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cabin Crew Jobs table
CREATE TABLE cabin_crew_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  airline_name TEXT NOT NULL,
  airline_logo_url TEXT,
  contract_type contract_type NOT NULL,
  region TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  salary_range TEXT,
  tags TEXT[] DEFAULT '{}',
  status job_status DEFAULT 'active',
  posted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  application_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flight Schools table
CREATE TABLE flight_schools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews INTEGER DEFAULT 0,
  programs TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  is_accredited BOOLEAN DEFAULT FALSE,
  tuition_range TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Categories table
CREATE TABLE forum_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  threads_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Threads table
CREATE TABLE forum_threads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_post_at TIMESTAMPTZ,
  UNIQUE(category_id, slug)
);

-- Forum Posts table
CREATE TABLE forum_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Articles table
CREATE TABLE news_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  source TEXT NOT NULL,
  source_url TEXT NOT NULL,
  author TEXT,
  published_at TIMESTAMPTZ NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job Applications table
CREATE TABLE job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID NOT NULL,
  job_type job_type NOT NULL,
  applicant_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status application_status DEFAULT 'pending',
  cover_letter TEXT,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, job_type, applicant_id)
);

-- Featured Airlines table
CREATE TABLE featured_airlines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_posted_at ON jobs(posted_at DESC);
CREATE INDEX idx_jobs_airline ON jobs(airline_name);
CREATE INDEX idx_jobs_region ON jobs(region);
CREATE INDEX idx_cabin_crew_jobs_status ON cabin_crew_jobs(status);
CREATE INDEX idx_cabin_crew_jobs_posted_at ON cabin_crew_jobs(posted_at DESC);
CREATE INDEX idx_forum_threads_category ON forum_threads(category_id);
CREATE INDEX idx_forum_posts_thread ON forum_posts(thread_id);
CREATE INDEX idx_news_published ON news_articles(published_at DESC);
CREATE INDEX idx_job_applications_applicant ON job_applications(applicant_id);
CREATE INDEX idx_job_applications_job ON job_applications(job_id, job_type);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cabin_crew_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_airlines ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for Jobs
CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  USING (status = 'active' OR posted_by = auth.uid() OR
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'recruiter')));

CREATE POLICY "Recruiters and admins can insert jobs"
  ON jobs FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'recruiter'))
  );

CREATE POLICY "Recruiters can update own jobs, admins can update all"
  ON jobs FOR UPDATE
  USING (
    posted_by = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete jobs"
  ON jobs FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for Cabin Crew Jobs (same as jobs)
CREATE POLICY "Cabin crew jobs are viewable by everyone"
  ON cabin_crew_jobs FOR SELECT
  USING (status = 'active' OR posted_by = auth.uid() OR
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'recruiter')));

CREATE POLICY "Recruiters and admins can insert cabin crew jobs"
  ON cabin_crew_jobs FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'recruiter'))
  );

CREATE POLICY "Recruiters can update own cabin crew jobs, admins can update all"
  ON cabin_crew_jobs FOR UPDATE
  USING (
    posted_by = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete cabin crew jobs"
  ON cabin_crew_jobs FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for Flight Schools
CREATE POLICY "Flight schools are viewable by everyone"
  ON flight_schools FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage flight schools"
  ON flight_schools FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for Forum Categories
CREATE POLICY "Forum categories are viewable by everyone"
  ON forum_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage forum categories"
  ON forum_categories FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for Forum Threads
CREATE POLICY "Forum threads are viewable by everyone"
  ON forum_threads FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create threads"
  ON forum_threads FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Thread authors and admins can update threads"
  ON forum_threads FOR UPDATE
  USING (
    author_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete threads"
  ON forum_threads FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for Forum Posts
CREATE POLICY "Forum posts are viewable by everyone"
  ON forum_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Post authors and admins can update posts"
  ON forum_posts FOR UPDATE
  USING (
    author_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Post authors and admins can delete posts"
  ON forum_posts FOR DELETE
  USING (
    author_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for News Articles
CREATE POLICY "News articles are viewable by everyone"
  ON news_articles FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage news articles"
  ON news_articles FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for Job Applications
CREATE POLICY "Users can view own applications"
  ON job_applications FOR SELECT
  USING (
    applicant_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'recruiter'))
  );

CREATE POLICY "Authenticated users can create applications"
  ON job_applications FOR INSERT
  WITH CHECK (
    auth.uid() = applicant_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('pilot', 'cabin_crew'))
  );

CREATE POLICY "Recruiters and admins can update applications"
  ON job_applications FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'recruiter'))
  );

-- RLS Policies for Featured Airlines
CREATE POLICY "Featured airlines are viewable by everyone"
  ON featured_airlines FOR SELECT
  USING (is_active = true OR
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage featured airlines"
  ON featured_airlines FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'pilot')::user_role,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cabin_crew_jobs_updated_at BEFORE UPDATE ON cabin_crew_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_flight_schools_updated_at BEFORE UPDATE ON flight_schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_threads_updated_at BEFORE UPDATE ON forum_threads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default forum categories
INSERT INTO forum_categories (name, description, slug, icon) VALUES
  ('Career Advice', 'Get guidance on your aviation career path', 'career-advice', 'briefcase'),
  ('Interviews', 'Share interview experiences and tips', 'interviews', 'users'),
  ('Lifestyle', 'Discuss work-life balance and aviation lifestyle', 'lifestyle', 'coffee'),
  ('Training', 'Questions about flight training and certifications', 'training', 'award'),
  ('General Discussion', 'General aviation topics', 'general', 'message-circle');

-- Function to increment job applications count
CREATE OR REPLACE FUNCTION increment_job_applications(job_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE jobs
  SET applications_count = applications_count + 1
  WHERE id = job_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement job applications count
CREATE OR REPLACE FUNCTION decrement_job_applications(job_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE jobs
  SET applications_count = GREATEST(0, applications_count - 1)
  WHERE id = job_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample featured airlines (you can update these)
INSERT INTO featured_airlines (name, logo_url, website, is_active, display_order) VALUES
  ('Emirates', '/images/airlines/emirates.svg', 'https://www.emirates.com/careers', true, 1),
  ('Qatar Airways', '/images/airlines/qatar.svg', 'https://careers.qatarairways.com', true, 2),
  ('Singapore Airlines', '/images/airlines/singapore.svg', 'https://www.singaporeair.com/careers', true, 3),
  ('Lufthansa', '/images/airlines/lufthansa.svg', 'https://careers.lufthansa.com', true, 4),
  ('British Airways', '/images/airlines/ba.svg', 'https://careers.ba.com', true, 5),
  ('Delta Air Lines', '/images/airlines/delta.svg', 'https://careers.delta.com', true, 6);
