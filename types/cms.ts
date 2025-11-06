// CMS-related types
import { Project, GalleryImage, Testimonial, Service, Video, Innovation, Partnership } from '@prisma/client';

export type ProjectWithRelations = Project & {
  lead?: any;
  customer?: any;
};

export type ProjectCategory = 'PALACE' | 'VILLA' | 'ESTATE' | 'PENTHOUSE';
export type GallerySize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'WIDE' | 'TALL';

export interface ProjectFormData {
  title: string;
  slug: string;
  location: string;
  category: ProjectCategory;
  description: string;
  year: string;
  area: string;
  budget: string;
  duration: string;
  challenges: string;
  materials: string[];
  appliances: string[];
  features: string[];
  innovations: string[];
  featured: boolean;
  published: boolean;
}

export interface GalleryFormData {
  title: string;
  category: ProjectCategory;
  location: string;
  size: GallerySize;
  description: string;
  published: boolean;
}

export interface TestimonialFormData {
  name: string;
  title: string;
  location: string;
  quote: string;
  rating: number;
  project: string;
  featured: boolean;
  published: boolean;
}

export type { Project, GalleryImage, Testimonial, Service, Video, Innovation, Partnership };
