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
  Coins
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
    title: 'Government ID Services',
    icon: FileCheck,
    subServices: [
      { 
        name: 'Aadhaar (New & Update)', 
        icon: Fingerprint,
        description: 'New Aadhaar enrollment for children (5+ years), mobile number linking, and correction of Name, Address, or DOB.',
        requiredDocuments: ['Proof of Identity (Voter ID/PAN/Passport)', 'Proof of Address', 'Birth Certificate (for children)'],
        estimatedFee: '₹50 (Print) / ₹100 (Update) + Service Charge',
        processingTime: '7 - 15 working days',
        eligibility: 'All Indian Residents and Children (5+ years)',
        faq: [
          { question: 'What documents are needed for child Aadhaar?', answer: 'Birth certificate and one parent Aadhaar card are primarily required.' },
          { question: 'Can I link my mobile number here?', answer: 'Yes, we provide full assistance for mobile number linking and biometric update appointments.' }
        ]
      },
      { 
        name: 'PAN Card Application', 
        icon: CreditCard,
        description: 'Apply for a new Individual/Business PAN card or update existing data errors.',
        requiredDocuments: ['Aadhaar Card', '2 Recent Photos', 'Digital Signature/Thumb'],
        estimatedFee: '₹107 (Govt Fee) + Processing Charge',
        processingTime: '48 Hours (e-PAN) / 10 Days (Physical)',
        eligibility: 'Individuals, Minors, and Businesses',
      },
      {
        name: 'Voter Card Assistance',
        icon: Vote,
        description: 'New Voter ID registration, correction, or migration to Chhoto Jagulia area.',
        requiredDocuments: ['Age Proof', 'Address Proof', 'Family Voter ID Reference'],
        estimatedFee: 'Nominal Service Charge',
        processingTime: '30 - 60 days (verified by ECI)',
      },
      {
        name: 'All Ration Card Services',
        icon: Utensils,
        description: 'New application, category change, member addition/deletion, and Aadhaar linking for all Ration Cards.',
        requiredDocuments: ['Existing Ration Card (if any)', 'Family Members Aadhaar Cards', 'Income Proof'],
        estimatedFee: 'Starts at ₹50',
        processingTime: '15 - 30 days',
      }
    ]
  },
  {
    id: 'banking',
    title: 'Banking & AEPS',
    icon: IndianRupee,
    subServices: [
      { 
        name: 'Instant Account Opening', 
        icon: Landmark,
        description: 'Seamless opening of Savings & Current accounts for various banks with instant ATM/Debit kits.',
        requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Linked Mobile Number'],
        estimatedFee: 'Initial Deposit + Kit Charges',
        processingTime: 'Same Day activation',
        eligibility: 'Individuals 18+',
      },
      { 
        name: 'Cash Withdrawal (AEPS)', 
        icon: Wallet,
        description: 'Micro-ATM service for instant cash withdrawal from any bank using Aadhaar biometric.',
        requiredDocuments: ['Aadhaar Number', 'Bank Name'],
        estimatedFee: 'Nil for standard amounts (limits apply)',
        processingTime: 'Instant',
        eligibility: 'Aadhaar-seeded bank account holders',
      },
      {
        name: 'Balance Enquiry & Mini Statement',
        icon: History,
        description: 'Check your current bank balance or print last 10 transactions without visiting bank.',
        requiredDocuments: ['Aadhaar Number'],
        estimatedFee: 'Service Charge ₹5 per print',
        processingTime: 'Instant',
      },
      {
        name: 'DMT (Domestic Money Transfer)',
        icon: SendHorizontal,
        description: 'Send money to any bank account in India instantly via IMPS/NEFT.',
        requiredDocuments: ['Receiver Bank Name', 'Account Number', 'IFSC Code'],
        estimatedFee: '1% of amount + GST',
        processingTime: 'Instant Credit',
      }
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance Solutions',
    icon: HeartPulse,
    subServices: [
      { 
        name: 'New LIC Policy & Premium', 
        icon: Shield,
        description: 'New LIC policy issuance and instant premium payment with official receipts.',
        requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Photo', 'Bank Details'],
        estimatedFee: 'As per Plan Selection',
        processingTime: 'Instant Receipt / Policy in 24h',
      },
      { 
        name: 'Bike & Car Insurance', 
        icon: Car,
        description: 'Instant 1st party or 3rd party insurance for all types of two-wheelers and four-wheelers.',
        requiredDocuments: ['RC Book Copy', 'Previous Insurance (if any)'],
        estimatedFee: 'Competitive Premium Rates',
        processingTime: '15 Minutes',
      },
      { 
        name: 'Life & General Insurance', 
        icon: Activity,
        description: 'Wide range of life, personal accident, and general insurance schemes available.',
        requiredDocuments: ['Personal ID', 'Address Proof'],
        estimatedFee: 'Plan Dependent',
        processingTime: 'Same Day',
      },
      { 
        name: 'Health & Mediclaim', 
        icon: HeartPulse,
        description: 'Family floater and individual health insurance policy issuance (Star, Apollo, HDFC).',
        requiredDocuments: ['Age Proof', 'Member Details'],
        estimatedFee: 'As per Policy Premium',
        processingTime: 'Same Day',
      },
      { 
        name: 'Ayushman Bharat Card', 
        icon: FileText,
        description: 'Digital creation of ABHA Health IDs and checking eligibility for PM-JAY cards.',
        requiredDocuments: ['Aadhaar Card', 'Ration Card'],
        estimatedFee: 'Nominal Service Charge',
        processingTime: 'Instant',
      }
    ]
  },
  {
    id: 'corrections',
    title: 'Corrections & Updates',
    icon: Eraser,
    subServices: [
      { 
        name: 'Govt Document Correction', 
        icon: Eraser,
        description: 'Comprehensive help for correcting errors in Caste, Income, and Residential certificates.',
        requiredDocuments: ['Original Document', 'Correct Supporting Evidence'],
        estimatedFee: 'Depends on document type',
        processingTime: '10 - 20 days',
      },
      { 
        name: 'Land Record Updates', 
        icon: MapPin,
        description: 'Checking Porcha/Khatian online and applying for corrections in land records.',
        requiredDocuments: ['Dag/Khatian Number', 'Legal ID of Owner'],
        estimatedFee: 'Processing Fee ₹100',
        processingTime: 'Varies by department',
      }
    ]
  },
  {
    id: 'education',
    title: 'Education & Forms',
    icon: GraduationCap,
    subServices: [
      { 
        name: 'Government Job Applications', 
        icon: Briefcase,
        description: 'Complete assistance for WB Police, SSC, Railways, and Central Job form fill-ups.',
        requiredDocuments: ['Education Marksheets', 'Category Certificate (if any)', 'Digital Photo & Sign'],
        estimatedFee: '₹50 - ₹100 per form',
        processingTime: 'While you wait',
        eligibility: 'As per specific job notification',
      },
      {
        name: 'Scholarship (Oasis / Aikyashree)',
        icon: BookOpen,
        description: 'Fresh application and renewal for SC/ST/OBC/Minority student scholarships.',
        requiredDocuments: ['Caste Certificate', 'Bank Passbook', 'Income Certificate', 'Academic Records'],
        estimatedFee: '₹30 - ₹50',
        processingTime: 'Verification by Institute follows',
      }
    ]
  },
  {
    id: 'loans',
    title: 'Loans & EMI Services',
    icon: Coins,
    subServices: [
      { 
        name: 'Personal Loan Assistance', 
        icon: Wallet,
        description: 'Instant personal loans for salaried or self-employed (SBI, HDFC, ICICI, Axis).',
        requiredDocuments: ['PAN Card', 'Aadhaar Card', 'Salary Slip/ITR', '6 Months Bank Statement'],
        estimatedFee: 'Consultation + Processing Fee',
        processingTime: '2 - 7 Days Approval',
      },
      { 
        name: 'Business & MSME Loan', 
        icon: Briefcase,
        description: 'Project loans and working capital solutions for small businesses and shops.',
        requiredDocuments: ['Trade License', 'MSME Certificate', 'GST Returns', 'Bank Statement'],
        estimatedFee: 'Plan Based',
        processingTime: '7 - 15 working days',
      },
      { 
        name: 'Gold Loan (Instant)', 
        icon: Coins,
        description: 'Easy gold loan assistance with low interest rates (Muthoot Finance, Manappuram, SBI).',
        requiredDocuments: ['Aadhaar Card', 'Gold Ornaments'],
        estimatedFee: 'Interest as per Bank',
        processingTime: '30 Minutes',
      },
      { 
        name: 'Home & Property Loan', 
        icon: Home,
        description: 'New home purchase loans or loan against property (LAP) from leading banks.',
        requiredDocuments: ['Deed/Porcha Copies', 'Income Proof', 'KYC Documents'],
        estimatedFee: 'Appraisal Based',
        processingTime: '15 - 30 days',
      },
      { 
        name: 'Vehicle Loan (Bike/Car)', 
        icon: Car,
        description: 'Fast track financing for new/used two-wheelers and cars (HDFC, Shriram, TVS).',
        requiredDocuments: ['KYC', 'Proforma Invoice', 'Income Proof'],
        estimatedFee: 'As per Down Payment',
        processingTime: '24 - 48 Hours',
      }
    ]
  },
  {
    id: 'online_works',
    title: 'All Online Works',
    icon: Monitor,
    subServices: [
      { 
        name: 'Digital Form Fill-ups', 
        icon: FileText,
        description: 'If it\'s online, we can do it. Any website application, survey, or portal work.',
        estimatedFee: 'Starts at ₹20',
        processingTime: 'Instant',
      },
      { 
        name: 'PF & EPF Services', 
        icon: Building2,
        description: 'PF Withdrawal, Kyc Update, and Balance checking for employees.',
        requiredDocuments: ['UAN Number', 'Aadhaar Card'],
        estimatedFee: '₹100 - ₹500 depending on task',
        processingTime: '7 - 15 days for withdrawal',
      },
      { 
        name: 'PASSPORT Application', 
        icon: Plane,
        description: 'Offline/Online Passport application assistance and appointment booking.',
        requiredDocuments: ['Aadhaar Card', 'Voter ID', 'Marksheets'],
        estimatedFee: 'Govt Fee + Consultation',
        processingTime: 'Appointment scheduling',
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
