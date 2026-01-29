// Firestore TypeScript Types - Migrated from Prisma Schema

import { Timestamp } from "firebase/firestore";

// ===== ENUMS =====

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
}

export enum ProjectCategory {
  MODERN_WOODEN = "MODERN_WOODEN",
  CLASSIC_WOODEN = "CLASSIC_WOODEN",
  ALUMINUM = "ALUMINUM",
  BEDROOMS = "BEDROOMS",
}

export enum GallerySize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  WIDE = "WIDE",
  TALL = "TALL",
}

export enum StatSection {
  HOMEPAGE_TRUST = "HOMEPAGE_TRUST",
  GALLERY_STATS = "GALLERY_STATS",
}

export enum LeadSource {
  WEBSITE = "WEBSITE",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  REFERRAL = "REFERRAL",
  ADVERTISING = "ADVERTISING",
  SHOWROOM = "SHOWROOM",
  EVENT = "EVENT",
  PHONE = "PHONE",
  EMAIL = "EMAIL",
  OTHER = "OTHER",
}

export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  PROPOSAL_SENT = "PROPOSAL_SENT",
  NEGOTIATING = "NEGOTIATING",
  WON = "WON",
  LOST = "LOST",
  ON_HOLD = "ON_HOLD",
}

export enum LeadPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum InteractionType {
  EMAIL = "EMAIL",
  PHONE_CALL = "PHONE_CALL",
  MEETING = "MEETING",
  SITE_VISIT = "SITE_VISIT",
  PROPOSAL = "PROPOSAL",
  FOLLOW_UP = "FOLLOW_UP",
  NOTE = "NOTE",
  OTHER = "OTHER",
}

export enum InteractionDirection {
  INBOUND = "INBOUND",
  OUTBOUND = "OUTBOUND",
}

export enum InteractionOutcome {
  POSITIVE = "POSITIVE",
  NEUTRAL = "NEUTRAL",
  NEGATIVE = "NEGATIVE",
  NO_RESPONSE = "NO_RESPONSE",
  SCHEDULED = "SCHEDULED",
}

export enum CustomerType {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
  CORPORATE = "CORPORATE",
  GOVERNMENT = "GOVERNMENT",
}

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  CLOSED = "CLOSED",
}

export enum TaskType {
  FOLLOW_UP = "FOLLOW_UP",
  PROPOSAL = "PROPOSAL",
  SITE_VISIT = "SITE_VISIT",
  MEETING = "MEETING",
  CALL = "CALL",
  EMAIL = "EMAIL",
  DOCUMENTATION = "DOCUMENTATION",
  OTHER = "OTHER",
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  OVERDUE = "OVERDUE",
}

// ===== BASE TYPES =====

export interface FirestoreTimestamps {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ===== DOCUMENT TYPES =====

export interface User extends FirestoreTimestamps {
  id: string;
  email: string;
  password: string;
  name?: string;
  role: UserRole;
}

export interface Project extends FirestoreTimestamps {
  id: string;
  title?: string;
  titleEn: string;
  titleAr: string;
  slug: string;
  location: string;
  category: ProjectCategory;
  image: string;
  gallery: string[];
  description?: string;
  descriptionEn: string;
  descriptionAr: string;
  year: string;
  area: string;
  budget: string;
  materials: string[];
  appliances: string[];
  features: string[];
  duration: string;
  challenges?: string;
  challengesEn: string;
  challengesAr: string;
  innovations: string[];
  featured: boolean;
  order: number;
  published: boolean;
  leadId?: string;
  customerId?: string;
}

export interface GalleryImage extends FirestoreTimestamps {
  id: string;
  title?: string;
  titleEn: string;
  titleAr: string;
  image: string;
  category: ProjectCategory;
  location: string;
  size: GallerySize;
  description?: string;
  descriptionEn: string;
  descriptionAr: string;
  order: number;
  published: boolean;
}

export interface Testimonial extends FirestoreTimestamps {
  id: string;
  name?: string;
  nameEn: string;
  nameAr: string;
  title?: string;
  titleEn: string;
  titleAr: string;
  location: string;
  image: string;
  quote?: string;
  quoteEn: string;
  quoteAr: string;
  rating: number;
  project: string;
  featured: boolean;
  order: number;
  published: boolean;
}

export interface ProcessStep extends FirestoreTimestamps {
  id: string;
  number: string;
  title?: string;
  titleEn: string;
  titleAr: string;
  description?: string;
  descriptionEn: string;
  descriptionAr: string;
  duration: string;
  iconName: string;
  order: number;
  published: boolean;
}

export interface Service extends FirestoreTimestamps {
  id: string;
  title?: string;
  titleEn: string;
  titleAr: string;
  description?: string;
  descriptionEn: string;
  descriptionAr: string;
  features: string[];
  order: number;
  published: boolean;
}

export interface Statistic extends FirestoreTimestamps {
  id: string;
  number: string;
  label?: string;
  labelEn: string;
  labelAr: string;
  section: StatSection;
  order: number;
  published: boolean;
}

export interface Founder extends FirestoreTimestamps {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  education: string[];
  recognition: string[];
  quote: string;
  published: boolean;
}

export interface SiteSettings extends FirestoreTimestamps {
  id: string;
  siteTitle: string;
  heroTagline?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: string;
  contactPhone?: string;
  contactEmail?: string;
  showroomAddress?: string;
  instagramUrl?: string;
  pinterestUrl?: string;
  linkedinUrl?: string;
  houzzUrl?: string;
  partnerships: string[];
  seoDescription?: string;
  seoKeywords: string[];
}

export interface HeroSection extends FirestoreTimestamps {
  id: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  titleHighlightEn: string;
  titleHighlightAr: string;
  descriptionEn: string;
  descriptionAr: string;
  backgroundImage: string;
  cta1TextEn: string;
  cta1TextAr: string;
  cta1Link: string;
  cta2TextEn: string;
  cta2TextAr: string;
  cta2Link: string;
  published: boolean;
}

export interface NassGallery extends FirestoreTimestamps {
  id: string;
  collectionKey: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  titleHighlightEn: string;
  titleHighlightAr: string;
  descriptionEn: string;
  descriptionAr: string;
  order: number;
  published: boolean;
}

export interface NassImage extends FirestoreTimestamps {
  id: string;
  galleryId: string;
  src: string;
  alt: string;
  title?: string;
  size: GallerySize;
  order: number;
}

export interface NassFeature extends FirestoreTimestamps {
  id: string;
  galleryId: string;
  icon?: string;
  labelEn: string;
  labelAr: string;
  descriptionEn: string;
  descriptionAr: string;
  order: number;
}

export interface Video extends FirestoreTimestamps {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  url: string;
  thumbnail?: string;
  order: number;
  published: boolean;
}

export interface BeforeAfter extends FirestoreTimestamps {
  id: string;
  titleEn: string;
  titleAr: string;
  beforeImage: string;
  afterImage: string;
  descriptionEn?: string;
  descriptionAr?: string;
  order: number;
  published: boolean;
}

export interface TechnicalSpec extends FirestoreTimestamps {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  category: string;
  order: number;
  published: boolean;
}

export interface Innovation extends FirestoreTimestamps {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  order: number;
  published: boolean;
}

export interface Credential extends FirestoreTimestamps {
  id: string;
  titleEn: string;
  titleAr: string;
  issuer: string;
  image?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  year?: string;
  order: number;
  published: boolean;
}

export interface EngineeringMetric extends FirestoreTimestamps {
  id: string;
  number: string;
  labelEn: string;
  labelAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  icon?: string;
  order: number;
  published: boolean;
}

export interface Partnership extends FirestoreTimestamps {
  id: string;
  nameEn: string;
  nameAr: string;
  logo?: string;
  url?: string;
  order: number;
  published: boolean;
}

export interface CTASection extends FirestoreTimestamps {
  id: string;
  badgeEn?: string;
  badgeAr?: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  buttonTextEn: string;
  buttonTextAr: string;
  buttonLink: string;
  image?: string;
  published: boolean;
}

export interface Embedding extends FirestoreTimestamps {
  id: string;
  contentType: string;
  contentId: string;
  title: string;
  content: string;
  embedding: number[];
  metadata?: Record<string, unknown>;
}

export interface BlogPost extends FirestoreTimestamps {
  id: string;
  slug: string;
  titleEn: string;
  titleAr?: string;
  excerptEn: string;
  excerptAr?: string;
  contentEn: string;
  contentAr?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: number;
  views: number;
  published: boolean;
  publishedAt?: Timestamp;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];
}

export interface Subscriber extends FirestoreTimestamps {
  id: string;
  email: string;
  name?: string;
  preferences?: Record<string, unknown>;
  verified: boolean;
  verifyToken?: string;
  unsubscribeToken: string;
}

export interface AnalyticsEvent {
  id: string;
  eventType: string;
  eventName: string;
  userId?: string;
  sessionId: string;
  page: string;
  metadata?: Record<string, unknown>;
  userAgent?: string;
  ip?: string;
  country?: string;
  createdAt: Timestamp;
}

export interface Company extends FirestoreTimestamps {
  id: string;
  nameEn: string;
  nameAr: string;
  taglineEn?: string;
  taglineAr?: string;
  descriptionEn: string;
  descriptionAr: string;
  missionEn?: string;
  missionAr?: string;
  visionEn?: string;
  visionAr?: string;
  valuesEn: string[];
  valuesAr: string[];
  foundedYear?: string;
  employeeCount?: string;
  projectsCompleted?: string;
  countriesServed?: string;
  yearsOfExperience?: string;
  featuredImage?: string;
  backgroundVideo?: string;
  phone?: string;
  email?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  published: boolean;
}

export interface TeamMember extends FirestoreTimestamps {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  bioEn: string;
  bioAr: string;
  image: string;
  specialtiesEn: string[];
  specialtiesAr: string[];
  email?: string;
  linkedin?: string;
  yearsOfExperience?: string;
  order: number;
  published: boolean;
}

export interface Lead extends FirestoreTimestamps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  projectType?: ProjectCategory;
  budget?: string;
  timeline?: string;
  location?: string;
  message: string;
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string;
  notes?: string;
  lastContacted?: Timestamp;
  nextFollowUp?: Timestamp;
  tags: string[];
  metadata?: Record<string, unknown>;
}

export interface LeadInteraction extends FirestoreTimestamps {
  id: string;
  leadId: string;
  type: InteractionType;
  subject?: string;
  content: string;
  direction: InteractionDirection;
  outcome?: InteractionOutcome;
  scheduledFor?: Timestamp;
  completedAt?: Timestamp;
  createdBy?: string;
  metadata?: Record<string, unknown>;
}

export interface Customer extends FirestoreTimestamps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  address?: string;
  city?: string;
  country?: string;
  customerType: CustomerType;
  status: CustomerStatus;
  source?: LeadSource;
  leadId?: string;
  assignedTo?: string;
  notes?: string;
  tags: string[];
  metadata?: Record<string, unknown>;
}

export interface CustomerInteraction extends FirestoreTimestamps {
  id: string;
  customerId: string;
  type: InteractionType;
  subject?: string;
  content: string;
  direction: InteractionDirection;
  outcome?: InteractionOutcome;
  scheduledFor?: Timestamp;
  completedAt?: Timestamp;
  createdBy?: string;
  metadata?: Record<string, unknown>;
}

export interface Task extends FirestoreTimestamps {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  priority: LeadPriority;
  status: TaskStatus;
  dueDate?: Timestamp;
  completedAt?: Timestamp;
  assignedTo?: string;
  relatedTo?: string;
  relatedType?: string;
  metadata?: Record<string, unknown>;
}

export interface ContactSubmission extends FirestoreTimestamps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  source?: string;
  metadata?: Record<string, unknown>;
  processed: boolean;
  processedBy?: string;
  processedAt?: Timestamp;
  notes?: string;
}

export interface UITranslation extends FirestoreTimestamps {
  id: string;
  key: string;
  category: string;
  textEn: string;
  textAr: string;
  description?: string;
  order: number;
  published: boolean;
}

// ===== COLLECTION NAMES =====

export const COLLECTIONS = {
  USERS: "users",
  PROJECTS: "projects",
  GALLERY_IMAGES: "galleryImages",
  TESTIMONIALS: "testimonials",
  PROCESS_STEPS: "processSteps",
  SERVICES: "services",
  STATISTICS: "statistics",
  FOUNDER: "founder",
  SITE_SETTINGS: "siteSettings",
  HERO_SECTION: "heroSection",
  NASS_GALLERIES: "nassGalleries",
  NASS_IMAGES: "nassImages",
  NASS_FEATURES: "nassFeatures",
  VIDEOS: "videos",
  BEFORE_AFTER: "beforeAfter",
  TECHNICAL_SPECS: "technicalSpecs",
  INNOVATIONS: "innovations",
  CREDENTIALS: "credentials",
  ENGINEERING_METRICS: "engineeringMetrics",
  PARTNERSHIPS: "partnerships",
  CTA_SECTION: "ctaSection",
  EMBEDDINGS: "embeddings",
  BLOG_POSTS: "blogPosts",
  SUBSCRIBERS: "subscribers",
  ANALYTICS_EVENTS: "analyticsEvents",
  COMPANY: "company",
  TEAM_MEMBERS: "teamMembers",
  LEADS: "leads",
  LEAD_INTERACTIONS: "leadInteractions",
  CUSTOMERS: "customers",
  CUSTOMER_INTERACTIONS: "customerInteractions",
  TASKS: "tasks",
  CONTACT_SUBMISSIONS: "contactSubmissions",
  UI_TRANSLATIONS: "uiTranslations",
} as const;
