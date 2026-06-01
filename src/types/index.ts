// Project Types
export interface Project {
  id: string;
  title: string;
  client: string;
  slug: string;
  category: 'explainer' | 'promotional' | 'branding' | 'educational';
  accentColor: string;
  accentColorLight: string;
  textColor: string;
  bgClass: string;
  description: string;
  shortDescription: string;
  thumbnail?: string;
  videoId?: string;
  websiteUrl?: string;
  tags: ProjectTag[];
  brief: ProjectBrief;
  research: ProjectResearch;
  scripting: ProjectScripting;
  result: ProjectResult;
  gallery?: GalleryItem[];
  relatedProjects?: string[]; // Project IDs
  featured?: boolean;
  date?: string;
}

export interface ProjectTag {
  icon: string;
  label: string;
}

export interface ProjectBrief {
  overview: string;
  targetAudience: string[];
  keyMessage: string;
  desiredFeeling: string[];
  deliverables: string[];
}

export interface ProjectResearch {
  competitiveAudit: string;
  audienceInsight: string;
  moodReference: string;
  motionStudy: string;
}

export interface ProjectScripting {
  fullScript: string;
  structure: ScriptSection[];
}

export interface ScriptSection {
  step: string;
  title: string;
  description: string;
  quote?: string;
}

export interface ProjectResult {
  summary: string;
  metrics?: { label: string; value: string }[];
  testimonial?: string;
  impact: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image?: string;
  video?: string;
  description?: string;
  type: 'image' | 'video';
}

// Page Types
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
}

// Team Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating?: number;
}

// Feature Types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  price?: string;
}
