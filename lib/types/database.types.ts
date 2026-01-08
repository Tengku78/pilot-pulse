export type UserRole = 'pilot' | 'cabin_crew' | 'recruiter' | 'admin';

export type ContractType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';

export type JobStatus = 'active' | 'closed' | 'draft' | 'pending_approval';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  title: string;
  airline_name: string;
  airline_logo_url: string | null;
  contract_type: ContractType;
  region: string;
  country: string;
  city: string | null;
  description: string;
  requirements: string | null;
  benefits: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  salary_period: string | null;
  tags: string[];
  status: JobStatus;
  posted_by: string;
  posted_at: string;
  expires_at: string | null;
  application_url: string | null;
  is_featured: boolean;
  views_count: number;
  applications_count: number;
  created_at: string;
  updated_at: string;
}

export interface CabinCrewJob {
  id: string;
  title: string;
  airline_name: string;
  airline_logo_url: string | null;
  contract_type: ContractType;
  region: string;
  country: string;
  description: string;
  requirements: string;
  salary_range: string | null;
  tags: string[];
  status: JobStatus;
  posted_by: string;
  posted_at: string;
  expires_at: string | null;
  application_url: string | null;
  is_featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface FlightSchool {
  id: string;
  name: string;
  logo_url: string | null;
  description: string;
  country: string;
  city: string;
  address: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  rating: number;
  total_reviews: number;
  programs: string[];
  certifications: string[];
  is_accredited: boolean;
  tuition_range: string | null;
  created_at: string;
  updated_at: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string | null;
  threads_count: number;
  posts_count: number;
  created_at: string;
}

export interface ForumThread {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  author_id: string;
  is_pinned: boolean;
  is_locked: boolean;
  views_count: number;
  posts_count: number;
  created_at: string;
  updated_at: string;
  last_post_at: string | null;
}

export interface ForumPost {
  id: string;
  thread_id: string;
  author_id: string;
  content: string;
  is_edited: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  source: string;
  source_url: string;
  author: string | null;
  published_at: string;
  category: string;
  tags: string[];
  views_count: number;
  created_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  job_type: 'pilot' | 'cabin_crew';
  applicant_id: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  cover_letter: string;
  resume_url: string | null;
  additional_info: string | null;
  phone: string;
  linkedin_url: string | null;
  notice_period: string | null;
  current_salary: number | null;
  expected_salary: number | null;
  applied_at: string;
  created_at: string;
  updated_at: string;
}

export interface FeaturedAirline {
  id: string;
  name: string;
  logo_url: string;
  website: string | null;
  description: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
}
