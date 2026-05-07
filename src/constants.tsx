import * as Icons from 'lucide-react';
import { ServiceCategory } from './types';
import servicesData from './data/services.json';

export const CONTACT_INFO = {
  phone: '+919932454652',
  whatsapp: '919932454652',
  email: 'tamanash.cr7@gmail.com',
  address: 'Chhoto Jagulia, North 24 Parganas, WB 743294',
  fullAddress: 'Chhoto Jagulia (Near Hospital), Duttapukur, North 24 Parganas, West Bengal 743294',
  googleFormUrl: 'https://forms.gle/Kje5uij1MAmSFAdT7',
  googleReviewLink: 'https://share.google/eBmPQdVgY2mwuooTY',
  timings: 'Monday - Saturday: 9:00 AM to 8:00 PM',
  googleMapLink: 'https://maps.app.goo.gl/BeBSYgJmKbG32eEV9',
  serviceArea: 'Chhoto Jagulia, Duttapukur, Barasat and surrounding areas of North 24 Parganas. Home service available up to Barasat.'
};

const getIcon = (iconName: string | undefined): any => {
  if (!iconName) return Icons.FileCheck;
  return (Icons as any)[iconName] || Icons.FileCheck;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = servicesData.map((category: any) => ({
  id: category.id,
  title: category.title,
  icon: getIcon(category.icon),
  subServices: category.subServices.map((sub: any) => ({
    name: sub.name,
    icon: getIcon(sub.icon),
    description: sub.description,
    items: sub.items,
  }))
}));

export const TESTIMONIALS = [
  {
    name: 'Dilip Kumar Mondal',
    role: 'Local Resident',
    content: 'Chakraborty Enterprise helped me get my Aadhaar corrected in just two visits. Their service is extremely professional and transparent.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dilip'
  },
  {
    name: 'Sushant Roy',
    role: 'Small Business Owner',
    content: 'Best place in Chhoto Jagulia for all digital work. I regularize my banking needs here. Reliable and fast processing every time.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sushant'
  },
  {
    name: 'Anjali Das',
    role: 'College Student',
    content: 'Very helpful staff. They helped me fill out my college application forms and scholarship documents without any errors. Highly recommended for students!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali'
  },
  {
    name: 'Bidhan Chandra',
    role: 'Retired Teacher',
    content: 'I was struggling with my pension documents. The VLE team handled everything with great patience. Truly a blessing for senior citizens.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bidhan'
  },
  {
    name: 'Moumita Paul',
    role: 'Homemaker',
    content: 'Got my Ration card updated and linked with Aadhaar easily. They explained the process clearly and didn\'t overcharge.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moumita'
  },
  {
    name: 'Rahul Sheikh',
    role: 'Farmer',
    content: 'They helped me with the PM-Kisan registration. Very honest people, they really care about helping the local people here.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
  },
  {
    name: 'Priyanka Saha',
    role: 'Aspiring Professional',
    content: 'Applied for my first passport through them. The appointment booking was quick and they double-checked all my documents. Excellent service!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanka'
  },
  {
    name: 'Subhashish Gupta',
    role: 'Local Businessman',
    content: 'Instant cash withdrawal via Aadhaar is so convenient. No need to stand in long bank queues anymore. This centre is efficient.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Subhashish'
  }
];
