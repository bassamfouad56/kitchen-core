import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: { current: string }
  location: string
  category: 'Palace' | 'Villa' | 'Estate' | 'Penthouse'
  image: SanityImageSource
  gallery?: SanityImageSource[]
  description: string
  year: string
  area: string
  budget: string
  materials: string[]
  appliances: string[]
  features: string[]
  duration: string
  challenges: string
  innovations: string[]
  featured?: boolean
  order?: number
}

export interface GalleryImage {
  _id: string
  _type: 'galleryImage'
  title: string
  image: SanityImageSource
  category: 'Palace' | 'Villa' | 'Estate' | 'Penthouse'
  location: string
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
  description: string
  order?: number
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  title: string
  location: string
  image: SanityImageSource
  quote: string
  rating: number
  project: string
  featured?: boolean
  order?: number
}

export interface ProcessStep {
  _id: string
  _type: 'processStep'
  number: string
  title: string
  description: string
  duration: string
  iconName: 'chat' | 'design' | 'check' | 'tools' | 'building' | 'star'
  order: number
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  description: string
  features: string[]
  order?: number
}

export interface Statistic {
  _id: string
  _type: 'statistic'
  number: string
  label: string
  section: 'homepage-trust' | 'gallery-stats'
  order?: number
}

export interface Founder {
  _id: string
  _type: 'founder'
  name: string
  title: string
  image: SanityImageSource
  bio: any[] // Portable Text blocks
  education: string[]
  recognition: string[]
  quote: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  siteTitle: string
  heroTagline?: string
  heroHeading?: string
  heroSubheading?: string
  heroImage?: SanityImageSource
  contactPhone?: string
  contactEmail?: string
  showroomAddress?: string
  instagramUrl?: string
  pinterestUrl?: string
  linkedinUrl?: string
  houzzUrl?: string
  partnerships?: string[]
  seoDescription?: string
  seoKeywords?: string[]
}
