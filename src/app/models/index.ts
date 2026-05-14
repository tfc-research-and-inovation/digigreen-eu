export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  event_time?: string;
  location?: string;
  event_type?: 'Roundtable' | 'Workshop' | 'Hackathon' | 'Conference' | 'Webinar' | 'Other';
  registration_url?: string;
  is_upcoming: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image_url?: string;
  image_alt?: string;
  publish_date: string;
  tags?: string[];
  is_archived: boolean;
  is_published: boolean;
}

export interface Partner {
  id: string;
  name: string;
  acronym: string;
  country: string;
  logo_url?: string;
  website?: string;
  is_coordinator: boolean;
  description?: string;
  order: number;
}

export interface SisterProject {
  id: string;
  name: string;
  description: string;
  website?: string;
  logo_url?: string;
  status: 'Onboard' | 'Collaborator';
  tags?: string[];
  contact_name?: string;
  contact_email?: string;
  is_featured: boolean;
  order: number;
  featured_only?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  resource_type: 'Deliverable' | 'Publication' | 'Better Practice Guide' | 'Policy Brief' | 'Data & DMP';
  description?: string;
  file_url?: string;
  publish_date?: string;
  authors?: string;
  work_package?: string;
  deliverable_number?: string;
  is_published: boolean;
}

