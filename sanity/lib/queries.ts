import { groq } from 'next-sanity'
import { client } from './client'
import type {
  Project,
  GalleryImage,
  Testimonial,
  ProcessStep,
  Service,
  Statistic,
  Founder,
  SiteSettings,
} from './types'

// Projects
export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project"] | order(order asc, _createdAt desc) {
      _id,
      _type,
      title,
      slug,
      location,
      category,
      image,
      gallery,
      description,
      year,
      area,
      budget,
      materials,
      appliances,
      features,
      duration,
      challenges,
      innovations,
      featured,
      order
    }`
  )
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      location,
      category,
      image,
      gallery,
      description,
      year,
      area,
      budget,
      materials,
      appliances,
      features,
      duration,
      challenges,
      innovations,
      featured,
      order
    }`,
    { slug }
  )
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project" && featured == true] | order(order asc) {
      _id,
      _type,
      title,
      slug,
      location,
      category,
      image,
      description,
      year,
      area,
      budget
    }`
  )
}

// Gallery Images
export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  return client.fetch(
    groq`*[_type == "galleryImage"] | order(order asc, _createdAt desc) {
      _id,
      _type,
      title,
      image,
      category,
      location,
      size,
      description,
      order
    }`
  )
}

// Testimonials
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    groq`*[_type == "testimonial"] | order(order asc, _createdAt desc) {
      _id,
      _type,
      name,
      title,
      location,
      image,
      quote,
      rating,
      project,
      featured,
      order
    }`
  )
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    groq`*[_type == "testimonial" && featured == true] | order(order asc) {
      _id,
      _type,
      name,
      title,
      location,
      image,
      quote,
      rating,
      project
    }`
  )
}

// Process Steps
export async function getAllProcessSteps(): Promise<ProcessStep[]> {
  return client.fetch(
    groq`*[_type == "processStep"] | order(order asc) {
      _id,
      _type,
      number,
      title,
      description,
      duration,
      iconName,
      order
    }`
  )
}

// Services
export async function getAllServices(): Promise<Service[]> {
  return client.fetch(
    groq`*[_type == "service"] | order(order asc, _createdAt desc) {
      _id,
      _type,
      title,
      description,
      features,
      order
    }`
  )
}

// Statistics
export async function getStatisticsBySection(
  section: 'homepage-trust' | 'gallery-stats'
): Promise<Statistic[]> {
  return client.fetch(
    groq`*[_type == "statistic" && section == $section] | order(order asc) {
      _id,
      _type,
      number,
      label,
      section,
      order
    }`,
    { section }
  )
}

// Founder
export async function getFounder(): Promise<Founder | null> {
  return client.fetch(
    groq`*[_type == "founder"][0] {
      _id,
      _type,
      name,
      title,
      image,
      bio,
      education,
      recognition,
      quote
    }`
  )
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    groq`*[_type == "siteSettings"][0] {
      _id,
      _type,
      siteTitle,
      heroTagline,
      heroHeading,
      heroSubheading,
      heroImage,
      contactPhone,
      contactEmail,
      showroomAddress,
      instagramUrl,
      pinterestUrl,
      linkedinUrl,
      houzzUrl,
      partnerships,
      seoDescription,
      seoKeywords
    }`
  )
}
