import { 
  Building2, 
  FileCheck, 
  IndianRupee, 
  Printer, 
  ShieldCheck, 
  Globe, 
  Smartphone, 
  Bus, 
  GraduationCap,
  HeartPulse,
  UserPlus,
  Eraser,
  Monitor,
  Fingerprint,
  CreditCard,
  Vote,
  Utensils,
  Wallet,
  History,
  SendHorizontal,
  Car,
  Shield,
  Activity,
  FileSearch,
  Briefcase,
  BookOpen,
  Plane,
  FileText,
  Landmark,
  MapPin,
  Home,
  Coins,
  Sprout,
  Scale,
  Train,
  Zap
} from 'lucide-react';
import { ServiceCategory } from './types';

export const CONTACT_INFO = {
  name: 'Chakraborty Enterprise',
  operatorName: 'Atanu Chakraborty',
  vleId: '516324110018',
  verifiedPhone: '+91 98308 61042',
  normalizedPhone: '+919830861042',
  whatsapp: '919830861042',
  email: 'chakrabortyenterprise.chhotojagulia@gmail.com',
  address: {
    street: '2nd Floor, Dakshin Paschim Para',
    landmark: 'Near Mitali Garden',
    locality: 'Chhoto Jagulia',
    policeStation: 'Duttapukur',
    city: 'Barasat-1',
    district: 'North 24 Parganas',
    state: 'West Bengal',
    pincode: '743294'
  },
  fullAddress: '2nd Floor, Dakshin Paschim Para, Near Mitali Garden, Chhoto Jagulia, Duttapukur, Barasat-1, North 24 Parganas, West Bengal - 743294',
  googleFormUrl: 'https://forms.gle/Kje5uij1MAmSFAdT7',
  googleReviewLink: 'https://share.google/eBmPQdVgY2mwuooTY',
  timings: 'Monday - Saturday: 9:00 AM to 8:00 PM',
  googleMapLink: 'https://maps.app.goo.gl/BeBSYgJmKbG32eEV9',
  serviceArea: 'Chhoto Jagulia, Duttapukur, Barasat and surrounding areas of North 24 Parganas. Home service available up to Barasat.'
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'government',
    title: 'Government & Citizen Services',
    icon: FileCheck,
    subServices: [
      {
        name: 'Aadhaar Services',
        icon: Fingerprint,
        description: 'Includes Aadhaar Enrollment, Aadhaar Update, Aadhaar Address Change, Aadhaar Mobile Number Update, Aadhaar Biometric Update, Aadhaar PVC Print, Aadhaar eKYC, Aadhaar Authentication, and Aadhaar UCL Services.',
      },
      {
        name: 'PAN & Identity Services',
        icon: CreditCard,
        description: 'Includes PAN Card Apply, PAN Correction, Instant ePAN, Voter ID Services, Senior Citizen Card, E-Shram Card, Labour Card, Ration Card Services, Birth Certificate, and Death Certificate.',
      },
      {
        name: 'Ayushman Bharat & Health',
        icon: HeartPulse,
        description: 'Includes Ayushman Bharat Card, ABHA Health Card, Swasthya Sathi, Health Scheme Registration, and Telemedicine Support.',
      },
      {
        name: 'Pension & Social Welfare',
        icon: ShieldCheck,
        description: 'Includes PM Shram Yogi Maandhan, National Pension Scheme (NPS), Widow Pension, Joy Johar Pension, Taposili Bandhu, Manabik Pension, and Senior Citizen Pension Services.',
      },
      {
        name: 'Agriculture & Farmer Services',
        icon: Sprout,
        description: 'Includes PM Kisan Yojana, Krishak Bandhu, PM Kisan Credit Card, PM Fasal Bima Yojana, and Agriculture Registration Support.',
      },
      {
        name: 'Women & Student Schemes',
        icon: GraduationCap,
        description: 'Includes Lakshmir Bhandar, Kanyashree, Rupashree, Sabooj Sathi, Aikyashree Scholarship, SVMCM Scholarship, Student Credit Card, Student Internship Programme, Tuition Fee Payment, and School Fee Payment.',
      },
      {
        name: 'Employment & Skill Development',
        icon: Briefcase,
        description: 'Includes Banglar Yuba Sathi, Utkarsh Bangla, Karmashree, Bhabishyat Credit Card, CSC Academy Courses, and Skill Development Registration.',
      },
      {
        name: 'Legal & Administrative',
        icon: Scale,
        description: 'Includes E-Courts Services, Tele-Legal Consultation, E-District Services, Election Services, Passport Services, and FSSAI Registration.',
      }
    ]
  },
  {
    id: 'transport',
    title: 'Transport & Driving Services',
    icon: Car,
    subServices: [
      {
        name: 'Driving License Services',
        icon: Car,
        description: 'Includes Learner License, Driving License Apply, Driving License Renewal, International Driving Permit, and Duplicate License.',
      },
      {
        name: 'Vehicle & RTO Services',
        icon: FileText,
        description: 'Includes Vehicle RC Services, Vehicle Ownership Transfer, Fitness Certificate, Pollution Certificate, E-Vahan Services, and Sarathi Services.',
      }
    ]
  },
  {
    id: 'banking',
    title: 'Banking & Financial Services',
    icon: IndianRupee,
    subServices: [
      {
        name: 'Bank Accounts',
        icon: Landmark,
        description: 'Includes Savings Account, Current Account, Salary Account, FD & RD, and NRI Accounts.',
      },
      {
        name: 'Loan Services',
        icon: Coins,
        description: 'Includes Personal Loan, Home Loan, Education Loan, Business Loan, MSME Loan, Gold Loan, Vehicle Loan, Agriculture Loan, and Loan Against Property.',
      },
      {
        name: 'Credit Card Services',
        icon: CreditCard,
        description: 'Includes Cashback Credit Cards, Travel Credit Cards, Fuel Credit Cards, Rewards Credit Cards, and Premium Cards.',
      },
      {
        name: 'Financial Services',
        icon: Wallet,
        description: 'Includes AEPS, DigiPay, FASTag, CIBIL Support, Banking Assistance, Insurance Premium Payment, Pension Services, and Bharat BillPay.',
      }
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance Services',
    icon: Shield,
    subServices: [
      {
        name: 'Life Insurance',
        icon: ShieldCheck,
        description: 'Includes Term Insurance, Whole Life Insurance, Child Plans, ULIP Plans, and Retirement Plans.',
      },
      {
        name: 'Health Insurance',
        icon: HeartPulse,
        description: 'Includes Individual Health Insurance, Family Floater, Critical Illness, Senior Citizen Insurance, and Accident Insurance.',
      },
      {
        name: 'Motor Insurance',
        icon: Car,
        description: 'Includes Bike Insurance, Car Insurance, and Commercial Vehicle Insurance.',
      },
      {
        name: 'Travel Insurance',
        icon: Plane,
        description: 'Includes Domestic Travel Insurance, International Travel Insurance, and Student Travel Insurance.',
      },
      {
        name: 'Business & Property Insurance',
        icon: Building2,
        description: 'Includes Fire Insurance, Marine Insurance, Crop Insurance, Liability Insurance, Home Insurance, and Business Insurance.',
      }
    ]
  },
  {
    id: 'travel',
    title: 'Travel & Ticket Booking',
    icon: Plane,
    subServices: [
      {
        name: 'Flight Booking',
        icon: Plane,
        description: 'Includes Domestic Flights, International Flights, One Way Tickets, Round Trip Booking, and Multi-City Booking.',
      },
      {
        name: 'Train Booking',
        icon: Train,
        description: 'Includes Railway Ticket Booking, Tatkal Booking, and PNR Status Support.',
      },
      {
        name: 'Bus Booking',
        icon: Bus,
        description: 'Includes AC/Non-AC Bus Booking, Sleeper & Seater Booking, and Intercity Bus Tickets.',
      },
      {
        name: 'Hotel Booking',
        icon: Home,
        description: 'Includes Budget Hotels, Luxury Hotels, Homestays, and International Hotel Booking.',
      },
      {
        name: 'Cab & Taxi',
        icon: Car,
        description: 'Includes Local Cab Booking, Airport Pickup & Drop, and Intercity Cab Services.',
      },
      {
        name: 'Holiday Packages',
        icon: MapPin,
        description: 'Includes Tour Packages, Flight + Hotel Packages, and Group Tours.',
      }
    ]
  },
  {
    id: 'digital_utility',
    title: 'Digital Utility Services',
    icon: Zap,
    subServices: [
      {
        name: 'Bill Payments & Recharges',
        icon: Zap,
        description: 'Includes Electricity Bill Payment, Water Bill Payment, LPG Booking, Mobile Recharge, DTH Recharge, and Broadband Recharge.',
      },
      {
        name: 'Online Forms & Digital Services',
        icon: Monitor,
        description: 'Includes Online Form Fillup, Online Exam Registration, Digital Signature Services, and Document Printing & Scanning.',
      }
    ]
  },
  {
    id: 'business',
    title: 'Business & Commerce Services',
    icon: Building2,
    subServices: [
      {
        name: 'Business Registrations & Licenses',
        icon: Briefcase,
        description: 'Includes GST Registration, MSME Registration, Shop License, and Trade License.',
      },
      {
        name: 'Commerce & Support Services',
        icon: Globe,
        description: 'Includes Business Documentation, Product Distribution, E-Commerce Services, and Digital Business Support.',
      }
    ]
  }
];

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
