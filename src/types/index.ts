export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  techStack: string[];
  image: string;
  images?: string[];
  link?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface Stat {
  value?: number;
  suffix?: string;
  label: string;
  display?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}
