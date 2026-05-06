import { LucideIcon } from 'lucide-react';

export interface SubService {
  name: string;
  icon?: LucideIcon;
  description?: string;
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
