// About Page TypeScript Interfaces

export interface Company {
  id: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string | null;
  taglineAr: string | null;
  descriptionEn: string;
  descriptionAr: string;
  missionEn: string | null;
  missionAr: string | null;
  visionEn: string | null;
  visionAr: string | null;
  valuesEn: string[];
  valuesAr: string[];
  foundedYear: string | null;
  employeeCount: string | null;
  projectsCompleted: string | null;
  countriesServed: string | null;
  yearsOfExperience: string | null;
  featuredImage: string | null;
  backgroundVideo: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
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
  email: string | null;
  linkedin: string | null;
  yearsOfExperience: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Founder {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  education: string[];
  recognition: string[];
  quote: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AboutPageData {
  company: Company | null;
  teamMembers: TeamMember[];
  founder?: Founder | null;
}

export interface AboutSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredData: AboutStructuredData;
}

export interface AboutStructuredData {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  founder?: {
    "@type": "Person";
    name: string;
    jobTitle: string;
  };
  numberOfEmployees?: string;
  address?: {
    "@type": "PostalAddress";
    addressCountry: string;
  };
  sameAs?: string[];
}
