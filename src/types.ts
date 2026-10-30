export interface Project {
  id: string;
  title: string;
  category: 'Özel Web Sitesi' | 'Web Yazılımı' | 'Marka Vitrini' | 'Arayüz Sistemi' | 'Ürün Tasarımı' | 'Web Geliştirme' | 'Marka Kimliği' | 'SaaS Mimarisi' | string;
  summary: string;
  year: string;
  client: string;
  metrics: string;
  technologies: string[];
  link?: string;
  image?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
  badge?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  url?: string;
  paragraphs?: string[];
}

export interface Stat {
  value: string;
  label: string;
  detail: string;
}
