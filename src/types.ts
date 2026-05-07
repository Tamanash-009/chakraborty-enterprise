import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  name: string;
  description: string;
  badge?: string;
  status?: string;
  processingTime?: string;
  documents?: string[];
  featured?: boolean;
  schemeType?: string[];
}

export interface SubService {
  name: string;
  icon?: LucideIcon;
  description?: string;
  items?: ServiceItem[];
  requiredDocuments?: string[];
  estimatedFee?: string;
  processingTime?: string;
  eligibility?: string;
  faq?: { question: string; answer: string }[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  subServices: SubService[];
}
