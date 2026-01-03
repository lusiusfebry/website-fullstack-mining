// TypeScript type definitions for the backend

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category_id?: string;
  author_id?: string;
  status: string;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  icon?: string;
  image?: string;
  featured: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  location?: string;
  status: string;
  category?: string;
  featured_image?: string;
  gallery?: any;
  start_date?: Date;
  end_date?: Date;
  client?: string;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements?: string;
  benefits?: string;
  location?: string;
  type?: string;
  department?: string;
  salary_range?: string;
  status: string;
  posted_at: Date;
  expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  role?: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  email?: string;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface JobApplication {
  id: string;
  job_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  resume_url?: string;
  cover_letter?: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Settings {
  id: string;
  key: string;
  value: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  error?: string;
}