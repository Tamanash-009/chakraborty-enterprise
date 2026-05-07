import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SERVICE_CATEGORIES, CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { 
  Search, X, CheckCircle2, ChevronRight, Phone, MessageSquare, 
  Calendar, Clock, User, Check, ChevronDown, Info, MapPin, 
  AlertCircle, ShieldCheck, ArrowRight, FileText, IndianRupee, HelpCircle,
  Users, Star, Send, Activity, Fingerprint, Smartphone, Filter, LayoutGrid
} from 'lucide-react';
import { ServicesSkeleton } from '../components/Skeletons';
import DatePicker from '../components/DatePicker';
import { SubService } from '../types';

export default function Services() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'form' | 'summary' | 'success'>('form');
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    serviceDescription: '',
    date: '',
    time: '',
    contactMethod: 'phone',
    notes: ''
  });
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
  const [schemeFilter, setSchemeFilter] = useState('');
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const schemeTypes = useMemo(() => {
    return Array.from(new Set(SERVICE_CATEGORIES.flatMap(cat => 
      cat.subServices.flatMap(sub => 
        (sub.items || []).map(item => item.status).filter(Boolean)
      )
    )));
  }, []);

  const featuredItems = useMemo(() => {
    return SERVICE_CATEGORIES.flatMap(cat => 
      cat.subServices.flatMap(sub => 
        (sub.items || []).filter(item => item.status === 'Popular' || item.status === 'New')
          .map(item => ({ ...item, category: cat.title }))
      )
    ).slice(0, 6);
  }, []);

  // Post-booking feedback
  const [postBookingRating, setPostBookingRating] = useState(0);
  const [postBookingHover, setPostBookingHover] = useState(0);
  const [showFeedbackThanks, setShowFeedbackThanks] = useState(false);

  const scrollToCategory = (id: string) => {
    setSearchQuery('');
    setExpandedCategory(id);
    setHighlightedCategory(id);
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Remove highlight after animation
    setTimeout(() => {
      setHighlightedCategory(null);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setExpandedCategory(id);
        }, 300);
      }
    }
  }, [location, loading]);

  const FAQs = [
    { q: "What documents are needed for Aadhaar update?", a: "Generally, you need an original Proof of Identity (Aadhaar Card) and Proof of Address (Voter ID, Bank Passbook, or Electricity Bill). Mobile number linking requires a physical visit." },
    { q: "How long does a PAN card application take?", a: "New PAN applications usually take 7-10 working days for the digital e-PAN and 15-20 days for the physical card to arrive by post." },
    { q: "Can I pay electricity bills for any district?", a: "Yes, we can process WBSEDCL electricity bill payments for any consumer ID across West Bengal and provide official receipts." },
    { q: "Do you provide doorstep services?", a: "Yes, for senior citizens and urgent cases in the Chhoto Jagulia area, we provide document collection and delivery services." },
    { q: "Are the services officially recognized?", a: "Yes, we are an authorized CSC (Common Service Centre) verified operator, fully authorized to process government documentation." },
    { q: "How can I check my Ayushman Bharat eligibility?", a: "You can visit our center with your Aadhaar Card and Ration Card, and we will instantly verify your eligibility and apply for the health card." },
    { q: "Do you assist with MSME or Trade Licenses?", a: "Absolutely. We provide end-to-end assistance for GST registration, MSME (Udyam) certificates, and local Panchayat Trade Licenses for businesses." },
    { q: "Can I book Tatkal train tickets here?", a: "Yes, we offer IRCTC train ticket booking services, including Tatkal bookings, subject to availability at the time of booking." }
  ];

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const scheme = schemeFilter.toLowerCase().trim();

    return SERVICE_CATEGORIES.map(category => {
      const categoryMatches = !scheme && category.title.toLowerCase().includes(query);
      
      const matchingSubServices = category.subServices.filter(sub => {
        const matchesQuery = !query || sub.name.toLowerCase().includes(query) || (sub.description && sub.description.toLowerCase().includes(query));
        const matchesScheme = !scheme || (sub.items || []).some(item => item.status?.toLowerCase() === scheme);
        return matchesQuery && matchesScheme;
      });

      if (categoryMatches || matchingSubServices.length > 0) {
        return {
          ...category,
          subServices: categoryMatches ? category.subServices : matchingSubServices
        };
      }
      return null;
    }).filter(Boolean) as typeof SERVICE_CATEGORIES;
  }, [searchQuery, schemeFilter]);

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];
    return FAQs.filter(faq => 
      faq.q.toLowerCase().includes(query) || 
      faq.a.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 2) error = 'Minimum 2 characters';
        else if (/[0-9]/.test(value)) error = 'Names should not contain numbers';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone is required';
        else {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) error = 'Must be exactly 10 digits';
        }
        break;
      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error = 'Invalid email address';
        break;
      case 'service':
        if (!value) error = 'Please select a service';
        break;
      case 'date':
        if (!value) error = 'Date is required';
        else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) error = 'Date cannot be in the past';
        }
        break;
      case 'time':
        if (!value) error = 'Time is required';
        break;
    }
    return error;
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setBookingErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, bookingData[field as keyof typeof bookingData]);
    setBookingErrors(prev => ({ ...prev, [field]: error }));
  };

  const getInputStatus = (field: string) => {
    if (!touched[field]) return 'default';
    return bookingErrors[field] ? 'error' : 'success';
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allFields = ['name', 'phone', 'service', 'date', 'time'];
    const newTouched = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(newTouched);

    const errors: Record<string, string> = {};
    allFields.forEach(field => {
      const error = validateField(field, bookingData[field as keyof typeof bookingData]);
      if (error) errors[field] = error;
    });

    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }

    setBookingStep('summary');
  };

  const finalizeBooking = () => {
    setIsBookingSubmitting(true);
    
    // Support safe fallback if the form URL is missing or is placeholder
    const baseUrl = CONTACT_INFO.googleFormUrl;
    const isPlaceholder = baseUrl.includes('your-form-id') || !baseUrl || baseUrl === '#';

    if (isPlaceholder) {
      // Fallback to WhatsApp if config is incomplete
      const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
        `Hi, I want to book an appointment.\nName: ${bookingData.name}\nService: ${bookingData.service}\nDate: ${bookingData.date}\nTime: ${bookingData.time}`
      )}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Construct pre-filled Google Form URL if field IDs are known
      // These are example IDs, the user should replace them with real entry.xxxx IDs
      const params = new URLSearchParams({
        'entry.1000001': bookingData.name,
        'entry.1000002': bookingData.phone,
        'entry.1000003': bookingData.service,
        'entry.1000004': bookingData.date,
        'entry.1000005': bookingData.time
      });
      
      const prefilledUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${params.toString()}`;
      window.open(prefilledUrl, '_blank');
    }
    
    setTimeout(() => {
      setIsBookingSubmitting(false);
      setBookingStep('success');
    }, 1500);
  };

  const openBookingModal = (serviceName: string, description: string = '') => {
    setBookingData({
      name: '',
      phone: '',
      email: '',
      service: serviceName,
      serviceDescription: description,
      date: '',
      time: '',
      contactMethod: 'phone',
      notes: ''
    });
    setBookingErrors({});
    setTouched({});
    setBookingStep('form');
    setIsBookingOpen(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('book') === 'true') {
      openBookingModal('', '');
      // Clean up URL parameter
      navigate(location.pathname + location.hash, { replace: true });
    }
  }, [location.search, navigate]);

  const [trackingId, setTrackingId] = useState('');
  const [trackingService, setTrackingService] = useState('aadhaar');
  const [trackingResult, setTrackingResult] = useState<null | 'loading' | 'found' | 'error'>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    
    setTrackingResult('loading');
    setTimeout(() => {
      // Logic for demo tracking
      if (trackingId.length > 5) {
        setTrackingResult('found');
      } else {
        setTrackingResult('error');
      }
    }, 1500);
  };

  const getStatusPortal = (service: string) => {
    switch(service) {
      case 'aadhaar': return 'https://myaadhaar.uidai.gov.in/check-aadhaar-status';
      case 'pan': return 'https://www.tin-nsdl.com/services/pan/pan-index.html';
      case 'passport': return 'https://www.passportindia.gov.in/AppOnlineProject/statusTracker/trackStatusInpNew';
      case 'voter': return 'https://voters.eci.gov.in/';
      default: return '#';
    }
  };

  if (loading) return <ServicesSkeleton />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <>
      <SEO 
        title="Services" 
        description="Comprehensive Digital Services for citizens across West Bengal. Aadhaar, PAN, Banking, Insurance, Travel, Loans, and Online Government Schemes. Fast and secure processing."
        keywords="CSC services, Aadhaar services, PAN card services, Ayushman Bharat, ABHA card, PM Kisan, Annapurna Bhandar, West Bengal Government Schemes, Travel booking, Insurance services, Loan services, Driving license services, Online government services, Banking assistance"
      />
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-8"
      >
      <header className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left md:pl-4">
            <h1 className="text-3xl font-extrabold text-text-main mb-2 uppercase tracking-tight italic">Our Services</h1>
            <p className="text-text-muted font-medium italic">Professional Digital & Government Service Centre</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:min-w-[400px] group flex items-center h-16">
              <div className="absolute left-6 z-10 text-text-muted group-focus-within:text-primary transition-colors flex items-center justify-center pointer-events-none h-full">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder="Search for any service (e.g. Aadhaar, Passport, PAN)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-16 pr-14 bg-surface dark:bg-surface/50 border-2 border-border/50 rounded-[2rem] shadow-xl shadow-cyan-500/5 focus:ring-8 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-text-main placeholder:font-medium placeholder:opacity-40 text-base"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 p-2 text-text-muted hover:text-primary transition-colors"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            <a 
              href={CONTACT_INFO.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-surface border-2 border-border text-text-main h-16 px-10 rounded-[2rem] font-black shadow-lg hover:border-primary hover:text-primary active:scale-95 transition-all text-xs uppercase tracking-widest shrink-0"
            >
               <FileText size={20} /> Custom Request Form
            </a>
            
            <button 
              onClick={() => openBookingModal('', '')}
              className="flex items-center justify-center gap-3 bg-primary text-white h-16 px-10 rounded-[2rem] font-black shadow-2xl shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest shrink-0 border-2 border-white/10"
            >
              <Calendar size={20} /> Reserve Appointment
            </button>
          </div>
        </div>

        {/* Tracking Section */}
        <section className="mt-12 content-auto">
          <div className="bg-surface rounded-[2.5rem] p-8 md:p-12 border border-border shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
              <Activity size={120} strokeWidth={1} />
            </div>

            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Fingerprint size={24} />
                </div>
                <h2 className="text-2xl font-black text-text-main uppercase tracking-tighter italic">Track Application</h2>
              </div>
              <p className="text-sm font-semibold text-text-muted mb-8 italic">Check status of your Aadhaar, PAN, Passport or Ration Card application submitted through our centre.</p>

              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow space-y-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter Reference Number (e.g. 1234/56789/101)"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12"
                    />
                    <Activity className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted opacity-30" size={18} />
                  </div>
                </div>
                <select 
                  value={trackingService}
                  onChange={(e) => setTrackingService(e.target.value)}
                  className="bg-background border border-border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="aadhaar">Aadhaar Status</option>
                  <option value="pan">PAN Card</option>
                  <option value="passport">Passport</option>
                  <option value="voter">Voter ID</option>
                  <option value="ration">Ration Card</option>
                  <option value="pmkisan">PM Kisan Status</option>
                  <option value="bhandar">Annapurna Bhandar</option>
                  <option value="dl">Driving License</option>
                  <option value="swasthya">Swasthya Sathi</option>
                  <option value="pension">Pension Status</option>
                </select>
                <button 
                  type="submit"
                  disabled={trackingResult === 'loading'}
                  className="bg-primary text-surface px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {trackingResult === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                  ) : <Search size={16} />}
                  Check Now
                </button>
              </form>

              <AnimatePresence mode="wait">
                {trackingResult === 'found' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-10 overflow-hidden"
                  >
                    <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Status Found</p>
                          <h4 className="text-xl font-black text-text-main uppercase tracking-tighter italic">Application Processing</h4>
                        </div>
                        <div className="px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/10">
                          Verify Pending
                        </div>
                      </div>

                      <div className="relative pt-2 pb-6 px-2">
                        <div className="absolute top-2 bottom-6 left-[18px] w-0.5 bg-border" />
                        <div className="space-y-8 relative">
                          <div className="flex gap-4 items-start">
                            <div className="w-9 h-9 bg-primary text-surface rounded-full flex items-center justify-center shadow-lg shadow-primary/20 z-10">
                              <CheckCircle2 size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-text-main italic">Application Submitted</p>
                              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">April 28, 2026 • 10:45 AM</p>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-9 h-9 bg-primary text-surface rounded-full flex items-center justify-center shadow-lg shadow-primary/20 z-10">
                              <ShieldCheck size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-text-main italic">Document Verification</p>
                              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">In Progress • Under Review by Authority</p>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start opacity-30">
                            <div className="w-9 h-9 bg-surface border-2 border-border rounded-full flex items-center justify-center z-10">
                              <Smartphone size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-text-main italic">Ready for Dispatch</p>
                              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Estimated: May 10, 2026</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-6 border-t border-primary/10">
                        <a 
                          href={getStatusPortal(trackingService)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-3 transition-all"
                        >
                          Visit Official Government Portal <ChevronRight size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {trackingResult === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-10 p-6 bg-red-500/5 rounded-[2rem] border border-red-500/10 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-text-main uppercase tracking-tighter italic">ID Not Found</h4>
                      <p className="text-[10px] font-semibold text-text-muted mt-1 leading-relaxed">We couldn't locate any application with ID <span className="font-bold text-red-500">"{trackingId}"</span>. Please double check the reference slip provided by our centre or WhatsApp us for manual help.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <div className="mt-20">
          <h3 className="text-sm font-black text-text-main uppercase tracking-widest mb-4 flex items-center gap-2 italic"><Filter size={14} className="text-primary"/> Filter by Category</h3>
          <div className="flex flex-wrap gap-2 no-scrollbar overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button 
              onClick={() => { setSearchQuery(''); setExpandedCategory(null); setHighlightedCategory(null); }}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm hover:shadow-md ${!searchQuery && !expandedCategory ? 'bg-primary text-surface shadow-cyan-500/20' : 'bg-surface text-text-muted border border-border hover:border-primary'}`}
            >
              All Services
            </button>
            {SERVICE_CATEGORIES.map(cat => (
               <button 
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm flex items-center gap-2 hover:shadow-md ${expandedCategory === cat.id ? 'bg-primary text-surface shadow-cyan-500/20 ring-2 ring-primary/30 ring-offset-2 ring-offset-background' : 'bg-surface text-text-muted border border-border hover:border-primary hover:text-text-main'}`}
              >
                <cat.icon size={12} className={expandedCategory === cat.id ? 'text-surface' : 'text-primary/70'} />
                {cat.title}
              </button>
            ))}
          </div>

          {/* Scheme Filters */}
          <h3 className="text-sm font-black text-text-main uppercase tracking-widest mt-8 mb-4 flex items-center gap-2 italic"><Activity size={14} className="text-primary"/> Government Schemes</h3>
          <div className="flex flex-wrap gap-2 no-scrollbar overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button 
              onClick={() => setSchemeFilter('')}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${!schemeFilter ? 'bg-primary text-surface shadow-cyan-500/20' : 'bg-surface text-text-muted border border-border hover:border-primary'}`}
            >
              All Schemes
            </button>
            {schemeTypes.map(scheme => (
               <button 
                key={scheme}
                onClick={() => setSchemeFilter(scheme)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm flex items-center gap-2 ${schemeFilter === scheme ? 'bg-primary text-surface shadow-cyan-500/20' : 'bg-surface text-text-muted border border-border hover:border-primary hover:text-text-main'}`}
              >
                {scheme}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* Removed Duplicate Navigation Chips */}

      
      {/* Popular Services */}
      {!searchQuery && !schemeFilter && (
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
              <Star size={24} className="fill-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-text-main uppercase tracking-tighter italic">Most Popular Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="p-6 bg-surface dark:bg-surface/30 border border-border rounded-[2rem] hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {item.icon ? <item.icon size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-main group-hover:text-primary transition-colors italic leading-tight">{item.name}</h4>
                      <p className="text-[9px] text-text-muted uppercase tracking-widest font-black mt-1">{item.category}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-text-muted italic leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-green-500/10 text-green-600 rounded-lg">{item.processingTime || 'Instant'}</span>
                  {item.status && <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary rounded-lg">{item.status}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Primary Services Grid */}
      <div className="space-y-12 mb-20 scroll-mt-32">
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => (
                <motion.div 
                key={category.id}
                id={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: highlightedCategory === category.id ? [1, 1.02, 1] : 1,
                  boxShadow: highlightedCategory === category.id ? "0 0 40px rgba(8, 145, 178, 0.3)" : "none"
                }}
                transition={{
                  scale: { duration: 0.5, repeat: 1 },
                  boxShadow: { duration: 1 }
                }}
                className={`bento-card group flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border-border scroll-mt-32 dark:bg-surface/30 dark:backdrop-blur-sm ${highlightedCategory === category.id ? 'border-primary ring-2 ring-primary/20' : ''}`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-primary/10 rounded-[1.5rem] text-primary group-hover:bg-primary group-hover:text-surface transition-all duration-500 shadow-sm border border-primary/5">
                    <category.icon size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-text-main uppercase tracking-tighter leading-none mb-1 italic">{category.title}</h2>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{category.subServices.length} Specialized Services</p>
                  </div>
                </div>

                <div className="flex-grow space-y-4">
                  {category.subServices.map((sub, idx) => (
                    <div 
                      key={idx} 
                      className="flex flex-col p-5 bg-background dark:bg-background/40 rounded-[1.75rem] border border-transparent hover:border-primary/20 transition-all group/item hover:bg-surface dark:hover:bg-surface/50 hover:shadow-md"
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          {sub.icon && <sub.icon size={18} className="text-primary/70 group-hover/item:text-primary transition-colors shrink-0" />}
                          <h3 className="text-sm font-bold text-text-main leading-tight group-hover/item:text-primary transition-colors italic">{sub.name}</h3>
                        </div>
                        <button 
                          onClick={() => setSelectedSubService(sub)}
                          className="text-primary hover:bg-primary/20 p-2 rounded-full transition-colors flex-shrink-0"
                          title="View Details"
                          aria-label={`View details for ${sub.name}`}
                        >
                          <Info size={16} />
                        </button>
                      </div>
                      {sub.description && (
                        <p className="text-xs text-text-muted mb-4 italic leading-relaxed">{sub.description}</p>
                      )}
                      
                      
                      {sub.items && sub.items.length > 0 && (
                        <div className="mt-2 mb-6 space-y-2">
                          {sub.items.map((item, i) => (
                            <button 
                              key={i} 
                              onClick={() => setSelectedItem(item)}
                              className="w-full text-left p-4 bg-surface/50 dark:bg-background/60 rounded-xl border border-border/50 hover:border-primary/30 transition-all group/nested hover:shadow-md"
                            >
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h4 className="text-xs font-bold text-text-main group-hover/nested:text-primary transition-colors">{item.name}</h4>
                                  <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{item.description}</p>
                                </div>
                                {item.status && (
                                  <span className="text-[9px] font-black px-2 py-1 bg-primary/10 text-primary rounded-lg shrink-0 uppercase tracking-widest">
                                    {item.status}
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}


                      <button 
                        onClick={() => openBookingModal(sub.name, sub.description || '')}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-surface dark:bg-background/80 text-cyan-800 dark:text-cyan-400 border border-border dark:border-border/30 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95 mt-auto"
                      >
                        <Calendar size={12} /> Book Now
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 grid grid-cols-2 gap-4">
                  <a 
                    href={`tel:${CONTACT_INFO.normalizedPhone}`}
                    className="flex items-center justify-center gap-3 py-4 bg-background dark:bg-background/20 text-text-main border border-border rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-surface dark:hover:bg-surface/50 transition-all active:scale-95 shadow-sm"
                    aria-label={`Call for ${category.title} services`}
                  >
                    <Phone size={14} strokeWidth={3} /> Call Support
                  </a>
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${category.title} services.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-[#20ba59] transition-all shadow-lg shadow-green-500/20 active:scale-95"
                    aria-label={`Chat on WhatsApp about ${category.title}`}
                  >
                    <MessageSquare size={14} strokeWidth={3} /> Chat
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 bg-surface dark:bg-surface/20 rounded-[2.5rem] border border-dashed border-border dark:border-border/40 text-center space-y-6 backdrop-blur-xl"
          >
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto border border-primary/10">
              <Search size={32} className="text-text-muted/30" />
            </div>
            <div>
              <h3 className="text-xl font-black text-text-main uppercase tracking-tighter mb-2 italic">Nothing Found.</h3>
              <p className="text-text-muted font-medium italic">We couldn't find matches for "{searchQuery}". Try browsing categories above or chat with us for help.</p>
            </div>
            <div className="pt-4">
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`Hi, I couldn't find "${searchQuery}" on your website. Do you offer this service?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-5 bg-[#25D366] text-white rounded-[2.25rem] font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl shadow-green-500/20 active:scale-95 italic"
              >
                <MessageSquare size={18} strokeWidth={3} /> Direct Chat Assistance
              </a>
            </div>
          </motion.div>
        )}
      </div>

      
      {/* Why Choose Chakraborty Enterprise */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-black text-text-main uppercase tracking-tighter italic">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: "Fast Processing", icon: Activity, desc: "Quickest turnaround time for applications." },
            { title: "Secure Data", icon: Shield, desc: "Your personal details are completely safe." },
            { title: "Trusted Support", icon: HeartPulse, desc: "Dedicated VLE assistance." },
            { title: "Multi-Service", icon: LayoutGrid, desc: "All digital services under one roof." },
            { title: "Affordable", icon: IndianRupee, desc: "Government approved low charges." },
            { title: "Responsive", icon: MessageSquare, desc: "Active WhatsApp support." }
          ].map((trust, idx) => (
            <div key={idx} className="p-6 bg-surface dark:bg-surface/20 border border-border rounded-[2rem] text-center hover:border-primary/30 transition-all">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <trust.icon size={20} />
              </div>
              <h4 className="text-xs font-black text-text-main uppercase tracking-widest mb-2 italic">{trust.title}</h4>
              <p className="text-[10px] text-text-muted font-bold">{trust.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ & Help Assistance Area */}
      {(filteredFAQs.length > 0 || !searchQuery) && (
        <section className="mb-32 scroll-mt-32 content-auto" id="faq">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm border border-primary/5">
                <HelpCircle size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-text-main uppercase tracking-tighter italic leading-none">Help Assistance</h2>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-1 italic">Quick resolutions for common queries</p>
              </div>
            </div>
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Search FAQs..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-primary pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted opacity-50" size={16} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {((searchQuery || faqSearch ? FAQs.filter(f => f.q.toLowerCase().includes((searchQuery||faqSearch).toLowerCase()) || f.a.toLowerCase().includes((searchQuery||faqSearch).toLowerCase())) : FAQs)).map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-surface dark:bg-surface/20 border-border/40 border rounded-[2rem] hover:border-primary/30 transition-all group hover:shadow-xl backdrop-blur-sm"
              >
                <h3 className="text-base font-black text-text-main mb-4 italic group-hover:text-primary transition-colors pr-8 relative">
                  Q: {faq.q}
                </h3>
                <p className="text-sm text-text-muted font-medium italic leading-relaxed opacity-80">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Unified Action Section */}
      <section id="support" className="mt-16 scroll-mt-32">
        <Link 
          to="/contact" 
          className="block p-10 bg-text-main text-surface rounded-[3rem] shadow-2xl shadow-cyan-500/5 relative overflow-hidden group border border-surface/5"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Can't find your service?</h2>
              <p className="opacity-60 font-medium max-w-md italic text-sm">We handle all kinds of digital applications, specialized forms, and governance portal works. Visit our centre for direct assistance.</p>
            </div>
            <div className="flex items-center gap-4 bg-primary text-surface px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs group-hover:gap-6 transition-all shadow-xl shadow-cyan-500/20 active:scale-95 italic">
              Talk to VLE <ArrowRight size={22} />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </Link>
      </section>
      <AnimatePresence>
        {selectedSubService && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubService(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-surface rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-border"
            >
              <div className="p-8 pb-4 flex justify-between items-start border-b border-border bg-background/50">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 font-black italic">
                    Service Insights
                  </div>
                  <div className="flex items-center gap-4">
                    {selectedSubService.icon && <selectedSubService.icon size={32} className="text-primary shrink-0" />}
                    <h2 className="text-2xl font-extrabold text-text-main uppercase tracking-tight italic">{selectedSubService.name}</h2>
                  </div>
                </div>
                <button onClick={() => setSelectedSubService(null)} className="p-2 text-text-muted hover:bg-background rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto no-scrollbar space-y-8 bg-surface">
                {selectedSubService.description && (
                  <section>
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 flex items-center gap-2 italic">
                      <FileText size={14} className="text-primary" /> About the service
                    </h3>
                    <p className="text-text-main/80 leading-relaxed font-medium italic">{selectedSubService.description}</p>
                  </section>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedSubService.requiredDocuments && (
                    <section className="bg-background p-6 rounded-3xl border border-border shadow-inner">
                      <h3 className="text-xs font-black text-text-main uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                        <CheckCircle2 size={16} className="text-green-500" /> Required Docs
                      </h3>
                      <ul className="space-y-2">
                        {selectedSubService.requiredDocuments.map((doc, i) => (
                          <li key={i} className="flex gap-2 text-sm text-text-muted font-bold italic">
                            <span className="text-primary">•</span> {doc}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  <div className="space-y-6">
                    {selectedSubService.estimatedFee && (
                      <section className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <h3 className="text-xs font-black text-text-main uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                          <IndianRupee size={16} className="text-primary" /> Charges
                        </h3>
                        <p className="text-2xl font-black text-primary italic leading-none">{selectedSubService.estimatedFee}</p>
                        <p className="text-[10px] text-text-muted mt-2 uppercase font-black tracking-widest">* Gov portal fees vary</p>
                      </section>
                    )}

                    {selectedSubService.processingTime && (
                      <section className="bg-amber-500/5 p-6 rounded-3xl border border-amber-200/20">
                        <h3 className="text-xs font-black text-text-main uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                          <Clock size={16} className="text-amber-500" /> Timelines
                        </h3>
                        <p className="text-xl font-black text-amber-600 italic leading-none">{selectedSubService.processingTime}</p>
                      </section>
                    )}
                  </div>
                </div>

                {selectedSubService.faq && selectedSubService.faq.length > 0 && (
                  <section>
                    <h3 className="text-xs font-bold text-text-main uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                      <HelpCircle size={16} className="text-primary" /> Frequent Questions
                    </h3>
                    <div className="space-y-3">
                      {selectedSubService.faq.map((item, i) => (
                        <div key={i} className="p-4 bg-background rounded-2xl border border-border">
                          <p className="text-sm font-bold text-text-main mb-1 italic leading-snug">{item.question}</p>
                          <p className="text-xs text-text-muted font-medium italic opacity-80">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="p-8 border-t border-border flex flex-col sm:flex-row gap-4 bg-background/30">
                <button 
                  onClick={() => {
                    openBookingModal(selectedSubService.name, selectedSubService.description);
                    setSelectedSubService(null);
                  }}
                  className="flex-1 py-5 bg-primary text-surface rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-cyan-500/20 active:scale-[0.98] transition-all italic"
                >
                  Confirm Appointment
                </button>
                <div className="flex gap-3">
                  <a 
                    href={`tel:${CONTACT_INFO.normalizedPhone}`}
                    className="p-5 bg-background text-primary border border-border rounded-3xl hover:border-primary transition-all shadow-sm active:scale-95"
                    aria-label="Call Support"
                  >
                    <Phone size={22} strokeWidth={2.5} />
                  </a>
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${selectedSubService.name} services.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-green-50 text-green-600 border border-green-100 rounded-3xl hover:bg-green-100 transition-all shadow-sm active:scale-95"
                    aria-label="WhatsApp VLE"
                  >
                    <MessageSquare size={22} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[115] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-surface rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-border"
            >
              <div className="p-8 pb-4 flex justify-between items-start border-b border-border bg-background/50">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 font-black italic">
                    Service Details
                  </div>
                  <h2 className="text-2xl font-extrabold text-text-main uppercase tracking-tight italic">{selectedItem.name}</h2>
                  <div className="text-[10px] font-black text-primary/60 uppercase tracking-widest italic mt-1">VLE ID: {CONTACT_INFO.vleId}</div>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 text-text-muted hover:bg-background rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto no-scrollbar space-y-6 bg-surface">
                <p className="text-text-main/80 leading-relaxed font-medium italic">{selectedItem.description}</p>

                <div className="flex flex-wrap gap-3">
                  {selectedItem.status && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl text-xs font-black uppercase tracking-widest text-primary">
                      <CheckCircle2 size={14} /> {selectedItem.status}
                    </div>
                  )}
                  {selectedItem.processingTime && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-xl text-xs font-black uppercase tracking-widest text-amber-600">
                      <Clock size={14} /> {selectedItem.processingTime}
                    </div>
                  )}
                </div>

                {selectedItem.documents && selectedItem.documents.length > 0 && (
                  <section className="bg-background p-6 rounded-3xl border border-border shadow-inner">
                    <h3 className="text-xs font-black text-text-main uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                      <FileText size={16} className="text-primary" /> Required Documents
                    </h3>
                    <ul className="space-y-3">
                      {selectedItem.documents.map((doc, i) => (
                        <li key={i} className="flex gap-3 text-sm text-text-muted font-bold italic items-start">
                          <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> 
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <div className="p-6 border-t border-border flex gap-4 bg-background/30">
                <button 
                  onClick={() => {
                    openBookingModal(selectedItem.name, selectedItem.description);
                    setSelectedItem(null);
                  }}
                  className="flex-1 py-4 bg-primary text-surface rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-cyan-500/20 active:scale-[0.98] transition-all italic flex justify-center items-center gap-2"
                >
                  <Calendar size={16} /> Book Service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unified Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => bookingStep !== 'summary' && !isBookingSubmitting && setIsBookingOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-lg bg-surface rounded-[2.5rem] shadow-2xl overflow-hidden border border-border"
            >
              <div className="p-8 max-h-[85vh] overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-text-main uppercase tracking-tight italic">
                      {bookingStep === 'form' ? 'Book Appointment' : 
                       bookingStep === 'summary' ? 'Review Details' : 'Confirmed!'}
                    </h2>
                    <div className="text-[10px] font-black text-primary/60 uppercase tracking-widest italic">VLE ID: {CONTACT_INFO.vleId}</div>
                  </div>
                  <button 
                    onClick={() => setIsBookingOpen(false)} 
                    disabled={isBookingSubmitting}
                    className="p-2 text-text-muted hover:bg-background rounded-full transition-colors disabled:opacity-0"
                  >
                    <X size={24} />
                  </button>
                </div>

                {bookingStep === 'form' && (
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 flex items-center justify-between">
                          <span className="flex items-center gap-1"><User size={12} strokeWidth={3} /> Full Name</span>
                          {getInputStatus('name') === 'success' && <CheckCircle2 size={12} className="text-green-500" />}
                        </label>
                        <input 
                          type="text"
                          className={`w-full px-5 py-4 bg-background border ${getInputStatus('name') === 'error' ? 'border-red-500' : 'border-border'} rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-text-main placeholder:text-text-muted/30 italic`}
                          value={bookingData.name}
                          onChange={e => handleInputChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          placeholder="Shibam Mondal"
                        />
                        {bookingErrors.name && touched.name && <p className="text-[10px] text-red-500 font-bold px-1 italic">{bookingErrors.name}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 flex items-center justify-between">
                          <span className="flex items-center gap-1"><Phone size={12} strokeWidth={3} /> Contact No.</span>
                          {getInputStatus('phone') === 'success' && <CheckCircle2 size={12} className="text-green-500" />}
                        </label>
                        <input 
                          type="tel"
                          className={`w-full px-5 py-4 bg-background border ${getInputStatus('phone') === 'error' ? 'border-red-500' : 'border-border'} rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-text-main placeholder:text-text-muted/30 italic`}
                          value={bookingData.phone}
                          onChange={e => handleInputChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          placeholder="Your 10-digit number"
                        />
                        {bookingErrors.phone && touched.phone && <p className="text-[10px] text-red-500 font-bold px-1 italic">{bookingErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Email Address (Optional)</label>
                      <input 
                        type="email"
                        className={`w-full px-5 py-4 bg-background border border-border rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-text-main placeholder:text-text-muted/30 italic`}
                        value={bookingData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        placeholder="yourname@gmail.com"
                      />
                    </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Service Type</label>
                        <div className="relative">
                          <select 
                            className={`w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-medium appearance-none text-text-main italic`}
                            value={bookingData.service}
                            onChange={e => handleInputChange('service', e.target.value)}
                          >
                            <option value="">Choose a specialized service</option>
                            {SERVICE_CATEGORIES.map(cat => (
                              <optgroup key={cat.id} label={cat.title}>
                                {cat.subServices.map((sub, i) => <option key={i} value={sub.name}>{sub.name}</option>)}
                              </optgroup>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                        </div>
                      </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1 flex items-center justify-between">
                          <span className="flex items-center gap-1"><Calendar size={12} /> Appointment Date</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsDatePickerOpen(true)}
                          className="w-full px-4 py-3 bg-background border border-border text-left rounded-xl flex items-center justify-between font-medium italic"
                        >
                          <span className={bookingData.date ? 'text-text-main' : 'text-text-muted opacity-30'}>
                            {bookingData.date ? new Date(bookingData.date).toLocaleDateString() : 'Select Date'}
                          </span>
                          <Calendar size={16} className="text-primary" />
                        </button>
                        <AnimatePresence>
                          {isDatePickerOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute z-[160] left-4 right-4"
                            >
                              <DatePicker 
                                value={bookingData.date} 
                                onChange={(d) => { handleInputChange('date', d); setIsDatePickerOpen(false); }}
                                minDate={new Date().toISOString().split('T')[0]}
                                onClose={() => setIsDatePickerOpen(false)}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Planned Time</label>
                        <input 
                          type="time"
                          className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-black text-text-main outline-none italic"
                          value={bookingData.time}
                          onChange={e => handleInputChange('time', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted italic">Contact Preference</label>
                        <span className="text-[10px] font-black text-primary uppercase italic">Selected: {bookingData.contactMethod}</span>
                      </div>
                      <div className="flex gap-4 p-2 bg-background border border-border rounded-[2rem]">
                        {['phone', 'whatsapp', 'email'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => handleInputChange('contactMethod', method)}
                            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-[1.5rem] transition-all italic border-2 ${
                              bookingData.contactMethod === method 
                                ? 'bg-primary text-white border-primary shadow-xl scale-105 z-10' 
                                : 'bg-transparent border-transparent text-text-muted hover:bg-surface hover:text-text-main'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Special Instructions (Optional)</label>
                      <textarea 
                        className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-black text-text-main outline-none resize-none h-24 italic placeholder:text-text-muted/30"
                        placeholder="Any specific document you might need help with..."
                        value={bookingData.notes}
                        onChange={e => handleInputChange('notes', e.target.value)}
                      />
                    </div>

                    <div className="pt-6 space-y-4">
                      <button 
                        type="submit"
                        className="w-full py-5 bg-cyan-950 text-surface rounded-[2rem] font-black uppercase italic tracking-tighter text-xl hover:bg-primary transition-all shadow-2xl border border-white/10 active:scale-[0.98] transition-all"
                      >
                        Review Booking Summary
                      </button>
                      <div className="flex items-center gap-2 justify-center py-3 px-4 bg-primary/10 rounded-[1.5rem] border border-primary/20">
                        <ShieldCheck size={16} className="text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-tight italic leading-none">Manual VLE Verification.</span>
                      </div>
                    </div>
                  </form>
                )}

                {bookingStep === 'summary' && (
                  <div className="space-y-6">
                    <div className="p-8 bg-background rounded-[2rem] border border-border shadow-inner space-y-5">
                      <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] border-b border-border pb-3 italic">Data Check</h3>
                      <div className="grid grid-cols-2 gap-y-6">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Client Name</p>
                          <p className="text-sm font-black text-text-main italic">{bookingData.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Contact</p>
                          <p className="text-sm font-black text-text-main italic">{bookingData.phone}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Digital Service</p>
                          <p className="text-sm font-black text-primary italic leading-tight">{bookingData.service}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Timing</p>
                          <p className="text-sm font-black text-text-main italic">{new Date(bookingData.date).toLocaleDateString()} @ {bookingData.time}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border flex justify-between items-center">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Preference</p>
                        <p className="text-sm font-black capitalize text-primary italic">{bookingData.contactMethod}</p>
                      </div>
                      {bookingData.notes && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Details</p>
                          <p className="text-xs text-text-main font-semibold italic opacity-80 leading-relaxed">"{bookingData.notes}"</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-border mt-auto flex flex-col gap-4">
                      <section className="bg-primary/5 p-6 rounded-3xl border border-primary/20">
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 italic">Secure Verification</p>
                         <p className="text-xs font-medium text-text-muted italic leading-tight">We'll bridge your data to our official record system via our secure Google Form connector. This verifies your identity for the VLE team.</p>
                      </section>
                      <button 
                        onClick={finalizeBooking}
                        disabled={isBookingSubmitting}
                        className="w-full py-6 bg-cyan-900 dark:bg-cyan-600 text-white rounded-[2.5rem] font-black uppercase italic tracking-tighter text-xl hover:bg-primary transition-all shadow-2xl border border-white/10 active:scale-95 flex items-center justify-center gap-4 disabled:opacity-70 group"
                      >
                        {isBookingSubmitting ? (
                          <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Check size={26} strokeWidth={3} className="group-hover:scale-125 transition-transform" /> 
                            Finalize Record
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => setBookingStep('form')}
                        disabled={isBookingSubmitting}
                        className="w-full py-4 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-primary transition-colors italic disabled:opacity-0"
                      >
                        ← Back to Correction
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 'success' && (
                  <div className="py-12 flex flex-col items-center text-center space-y-6">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ type: 'spring', damping: 10 }}
                      className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-inner"
                    >
                      <CheckCircle2 size={56} />
                    </motion.div>
                 <div>
                      <h3 className="text-3xl font-black text-text-main uppercase tracking-tighter mb-2 italic">Step 1 Ready.</h3>
                      <p className="text-text-muted font-medium max-w-xs mx-auto italic leading-relaxed">
                        We've opened the booking link. Once you submit the Form, we will <strong>manually verify</strong> your request via {bookingData.contactMethod}.
                      </p>
                    </div>
                    <div className="p-6 bg-background rounded-[2rem] border border-border w-full text-left shadow-inner">
                      <div className="flex items-center gap-3 mb-4">
                        <Star size={16} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-main italic">Help Us Grow</span>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-[11px] font-bold text-text-muted italic">Share your experience with the community on Google Maps.</p>
                        <a 
                          href={CONTACT_INFO.googleReviewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-4 bg-surface border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          <Star size={14} className="fill-current" /> Rate on Google Maps
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-background rounded-[2rem] border border-border w-full text-left shadow-inner">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertCircle size={16} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-main italic">Next Steps</span>
                      </div>
                      <ul className="space-y-3 text-[11px] font-black text-text-muted uppercase tracking-widest italic">
                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" /> Keep Aadhaar/Docs ready</li>
                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" /> Await VLE call (2 hrs)</li>
                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" /> Visit centre on time</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setIsBookingOpen(false)}
                      className="w-full py-5 bg-text-main text-surface rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all italic"
                    >
                      Close and continue
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Production Trust Block */}
      <section className="mt-16 bg-surface rounded-[3rem] p-12 border border-border overflow-hidden relative shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border shadow-sm">
              <ShieldCheck size={18} className="text-primary" />
              <span className="text-[11px] font-black uppercase tracking-tight text-text-main italic">CSC Verified Digital Centre</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-text-main uppercase tracking-tighter leading-none italic">
              Your Trust is our <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-4 not-italic">Digital Identity.</span>
            </h2>
            <p className="text-lg text-text-muted font-medium leading-relaxed italic">
              Serving the people of North 24 Parganas with integrity since our inception. We ensure 100% processing transparency and data privacy for every citizen.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-1">
                <p className="text-2xl font-black text-primary italic">50k+</p>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">Happy Clients</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-primary italic">15 Min</p>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">Avg. Response</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-primary italic">Secure</p>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">Data Handling</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col gap-4">
             <div className="p-8 bg-background rounded-[2.5rem] shadow-xl shadow-cyan-500/5 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/5">
                    <User size={24} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main italic">{CONTACT_INFO.name}</h4>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">Operator: {CONTACT_INFO.operatorName}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="text-primary pt-1"><MapPin size={16} strokeWidth={3} /></div>
                    <p className="text-sm font-medium text-text-muted italic">{CONTACT_INFO.fullAddress}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-primary pt-1"><Clock size={16} strokeWidth={3} /></div>
                    <p className="text-sm font-medium text-text-muted italic">{CONTACT_INFO.timings}</p>
                  </div>
                </div>
                    <div className="mt-8 flex gap-4">
                      <Link to="/contact" className="flex-1 py-4 bg-text-main text-surface text-center rounded-[1.5rem] text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all italic">Directions</Link>
                      <a 
                        href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hi, I need assistance with a service.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 border border-green-500/30 bg-green-500/5 rounded-[1.5rem] flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all"
                        aria-label="Chat on WhatsApp"
                      >
                        <MessageSquare size={20} strokeWidth={3} />
                      </a>
                      <a 
                        href={`tel:${CONTACT_INFO.normalizedPhone}`} 
                        className="px-6 border border-border rounded-[1.5rem] flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all"
                        aria-label="Call VLE Operator"
                      >
                        <Phone size={20} strokeWidth={3} />
                      </a>
                    </div>
             </div>
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mb-32 -mr-32" />
      </section>
    </motion.div>
    </>
  );
}
