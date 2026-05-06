import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { 
  MapPin, Phone, MessageSquare, Clock, ExternalLink, 
  Send, CheckCircle2, ShieldCheck, HelpCircle, 
  User, Mail, PhoneCall, ChevronDown, Search, X, Star, ChevronRight
} from 'lucide-react';
import { CONTACT_INFO, SERVICE_CATEGORIES } from '../constants';
import { ContactSkeleton } from '../components/Skeletons';

const PURPOSE_OPTIONS = [
  'General Inquiry',
  'Service Price Quote',
  'Document Requirement Help',
  'Application Status Follow-up',
  'Business Collaboration',
  'Other'
];

export default function Contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    purpose: '',
    service: '',
    message: '',
    callbackMethod: 'whatsapp'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [purposeSearch, setPurposeSearch] = useState('');

  // Feedback State
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackHover, setFeedbackHover] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackRating === 0) return;
    
    setIsFeedbackLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsFeedbackLoading(true); // Keep spinner for a bit
      setTimeout(() => {
        setIsFeedbackLoading(false);
        setFeedbackSubmitted(true);
        // Log feedback for demo purposes
        console.log('Feedback Received:', {
          rating: feedbackRating,
          comment: feedbackComment,
          timestamp: new Date().toISOString()
        });
      }, 1000);
    }, 500);
  };

  const filteredPurposes = PURPOSE_OPTIONS.filter(option => 
    option.toLowerCase().includes(purposeSearch.toLowerCase())
  );

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 2) error = 'Minimum 2 characters';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone is required';
        else if (!/^\d{10}$/.test(value.trim().replace(/\s/g, ''))) error = 'Invalid 10-digit number';
        break;
      case 'purpose':
        if (!value) error = 'Please select a purpose';
        break;
      case 'message':
        if (!value.trim()) error = 'Details are required';
        else if (value.trim().length < 5) error = 'Explain your query briefly';
        break;
    }
    return error;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const getInputStatus = (field: string) => {
    if (!touched[field]) return 'default';
    return errors[field] ? 'error' : 'success';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allFields = ['name', 'phone', 'purpose', 'message'];
    const newTouched = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(newTouched);

    const newErrors: Record<string, string> = {};
    allFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    const baseUrl = CONTACT_INFO.googleFormUrl;
    const isPlaceholder = baseUrl.includes('your-form-id') || !baseUrl || baseUrl === '#';

    if (isPlaceholder) {
      // Fallback to WhatsApp if config is incomplete
      const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
        `Hi, I have a query.\nName: ${formData.name}\nPurpose: ${formData.purpose}\nMessage: ${formData.message}`
      )}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Construct pre-filled Google Form URL if field IDs are known
      const params = new URLSearchParams({
        'entry.1000001': formData.name,
        'entry.1000002': formData.phone,
        'entry.1000003': formData.purpose,
        'entry.1000004': formData.service,
        'entry.1000005': formData.message,
        'entry.1000006': formData.callbackMethod
      });
      
      const prefilledUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${params.toString()}`;
      window.open(prefilledUrl, '_blank');
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (loading) return <ContactSkeleton />;

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with Chakraborty Enterprise. Serving citizens across West Bengal with digital services. Visit our center in Chhoto Jagulia or chat with us on WhatsApp."
        keywords="Contact Chakraborty Enterprise, Digital Center Location, Chhoto Jagulia CSC, Barasat digital work help"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 max-w-7xl mx-auto px-4"
      >
      <header className="mb-16 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
          Support & Assistance
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-text-main uppercase tracking-tighter leading-none mb-4 italic">Get in Touch with our <span className="text-primary not-italic">VLE Team.</span></h1>
        <p className="text-text-muted font-medium italic text-lg max-w-2xl">Have a specialized request? Fill out the form or use our direct contact channels below.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Side */}
        <div className="lg:col-span-5 space-y-8">
          <a 
            href={CONTACT_INFO.googleFormUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 bg-primary text-white rounded-[2.5rem] shadow-2xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all group border-2 border-white/10"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Star size={24} className="fill-current" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Direct Application</p>
              <h3 className="text-xl font-black uppercase tracking-tighter italic leading-tight">Digital Request Form</h3>
            </div>
            <ChevronRight size={24} className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </a>

          <section className="bento-card p-8 bg-surface border-primary/20 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Search size={18} strokeWidth={3} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-text-main">Search Inquiry Type</h3>
            </div>
            <div className="relative">
               <input 
                type="text"
                placeholder="Search for a purpose (e.g. Aadhaar, PAN)..."
                className="w-full px-5 py-4 bg-background border border-border rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 font-bold italic text-sm transition-all text-text-main"
                value={purposeSearch}
                onChange={(e) => setPurposeSearch(e.target.value)}
               />
               {purposeSearch && (
                 <button 
                  onClick={() => setPurposeSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-surface rounded-full transition-colors"
                 >
                   <X size={14} className="text-text-muted" />
                 </button>
               )}
            </div>
            {purposeSearch && (
              <div className="mt-4 px-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Matching Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {filteredPurposes.length > 0 ? filteredPurposes.map(p => (
                    <button 
                      key={p}
                      onClick={() => handleInputChange('purpose', p)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all ${formData.purpose === p ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-primary/10'}`}
                    >
                      {p}
                    </button>
                  )) : (
                    <span className="text-[10px] font-bold text-red-400 italic">No exact matches found.</span>
                  )}
                </div>
              </div>
            )}
            {!purposeSearch && (
              <div className="mt-6 px-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-3 italic">Common Tasks:</p>
                <div className="flex flex-wrap gap-2">
                  {['Aadhaar Help', 'PAN Status', 'Bank Account', 'Exam Form'].map(task => (
                    <button 
                      key={task}
                      onClick={() => {
                        setPurposeSearch(task);
                      }}
                      className="px-3 py-1.5 bg-background border border-border rounded-lg text-[10px] font-bold uppercase tracking-tight hover:border-primary hover:text-primary transition-all text-text-muted"
                    >
                      {task}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="bento-card border-none bg-text-main text-surface p-10 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-tight mb-8 italic">Direct Channels</h3>
            <div className="space-y-6">
              <a href={`tel:${CONTACT_INFO.normalizedPhone}`} className="flex items-center gap-4 group">
                <div className="p-4 bg-surface/5 rounded-[1.5rem] group-hover:bg-primary transition-colors shadow-sm">
                  <PhoneCall size={24} className="text-surface" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Call for immediate help</p>
                  <p className="text-lg font-bold">{CONTACT_INFO.verifiedPhone}</p>
                </div>
              </a>
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hi, I need help with a digital service enquiry.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="p-4 bg-surface/5 rounded-[1.5rem] group-hover:bg-green-500 transition-colors">
                  <MessageSquare size={24} className="text-surface" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Message on WhatsApp</p>
                  <p className="text-lg font-bold">Fastest Response</p>
                </div>
              </a>
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-surface/5 rounded-[1.5rem]">
                  <Clock size={24} className="text-surface" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Operating Hours</p>
                  <p className="text-lg font-bold">{CONTACT_INFO.timings}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bento-card p-10 bg-surface">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <MapPin size={24} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight italic">Visit our Centre</h3>
            </div>
            <p className="text-text-muted font-medium italic leading-relaxed mb-6">
              {CONTACT_INFO.fullAddress}
            </p>
            <div className="p-5 bg-background rounded-2xl border border-dashed border-border mb-6">
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1 italic">Landmark</p>
               <p className="text-sm font-bold text-text-main italic">{CONTACT_INFO.address.landmark}</p>
            </div>
            <a 
              href={CONTACT_INFO.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-4"
            >
              Get Directions <ExternalLink size={14} strokeWidth={3} />
            </a>
          </section>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-7">
          <div className="bento-card p-10 h-full bg-white dark:bg-surface border-2 border-slate-200 dark:border-border shadow-lg">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-2xl font-black text-text-main uppercase tracking-tighter mb-8 italic">Digital Enquiry Form</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-30" size={18} />
                            <input 
                              type="text" 
                              className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-background border-2 ${getInputStatus('name') === 'error' ? 'border-red-500' : 'border-slate-300 dark:border-border'} rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-text-main italic`}
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              onBlur={() => handleBlur('name')}
                              placeholder="Shibam Mondal"
                            />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Contact Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-30" size={18} />
                          <input 
                            type="tel" 
                            className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-background border-2 ${getInputStatus('phone') === 'error' ? 'border-red-500' : 'border-slate-300 dark:border-border'} rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-text-main italic`}
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            onBlur={() => handleBlur('phone')}
                            placeholder="9876543210"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Enquiry Purpose</label>
                        <div className="relative">
                          <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-30" size={18} />
                          <select 
                            className="w-full pl-12 pr-10 py-4 bg-white dark:bg-background border-2 border-slate-300 dark:border-border rounded-[2rem] outline-none appearance-none font-bold italic text-text-main"
                            value={formData.purpose}
                            onChange={(e) => handleInputChange('purpose', e.target.value)}
                          >
                            <option value="">Select Purpose</option>
                            {(purposeSearch ? filteredPurposes : PURPOSE_OPTIONS).map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted opacity-50 pointer-events-none" size={18} strokeWidth={3} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Specific Service</label>
                        <select 
                          className="w-full px-4 py-4 bg-white dark:bg-background border-2 border-slate-300 dark:border-border rounded-[2rem] outline-none font-bold italic text-text-main appearance-none"
                          value={formData.service}
                          onChange={(e) => handleInputChange('service', e.target.value)}
                        >
                          <option value="">Optionally choose a service</option>
                          {SERVICE_CATEGORIES.map(cat => (
                            <optgroup key={cat.id} label={cat.title}>
                              {cat.subServices.map((sub, i) => <option key={i} value={sub.name}>{sub.name}</option>)}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Response Preference</label>
                      <div className="flex gap-4 p-2 bg-slate-50 dark:bg-background border-2 border-slate-200 dark:border-border rounded-2xl">
                         {['whatsapp', 'phone', 'email'].map(method => (
                           <button
                             key={method}
                             type="button"
                             onClick={() => handleInputChange('callbackMethod', method)}
                             className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all italic ${formData.callbackMethod === method ? 'bg-primary text-surface shadow-xl shadow-cyan-900/10' : 'text-text-muted hover:bg-surface'}`}
                           >
                            {method}
                           </button>
                         ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 italic">Message Details</label>
                      <textarea 
                        rows={4}
                        className={`w-full px-4 py-4 bg-white dark:bg-background border-2 ${getInputStatus('message') === 'error' ? 'border-red-500' : 'border-slate-300 dark:border-border'} rounded-[2rem] outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold resize-none text-text-main italic`}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div className="pt-4 space-y-4">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase italic tracking-tighter text-xl hover:bg-primary-dark transition-all shadow-2xl shadow-cyan-500/20 disabled:opacity-50"
                      >
                         {isSubmitting ? 'Sending Request...' : 'Finalize on Google Form'}
                      </button>
                      <div className="flex items-center gap-2 justify-center py-3 bg-primary/10 rounded-xl border border-primary/20">
                        <ShieldCheck size={14} className="text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-tight italic">Privacy Guaranteed for all citizens.</span>
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <CheckCircle2 size={56} strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl font-black text-text-main mb-2 uppercase tracking-tighter leading-none italic">Form Redirected.</h2>
                  <p className="text-text-muted max-w-xs font-bold italic mb-10">
                    Thank you, {formData.name}. We've opened the details form. Our team will manually review your query and reply to your <strong>{formData.callbackMethod}</strong> soon.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline decoration-2 underline-offset-8 italic"
                  >
                    Start another enquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <section className="mt-20">
        <div className="bg-surface rounded-[3rem] p-8 md:p-12 border border-border shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000 pointer-events-none">
            <Star size={120} strokeWidth={1} />
          </div>

          <div className="max-w-xl mx-auto text-center relative z-10">
            <AnimatePresence mode="wait">
              {!feedbackSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-3xl font-black text-text-main uppercase tracking-tighter italic mb-4">Rate Your Experience</h2>
                  <p className="text-sm font-semibold text-text-muted mb-8 italic">Your feedback helps us provide better digital services to the community.</p>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-8">
                    <div className="flex justify-center gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setFeedbackHover(star)}
                          onMouseLeave={() => setFeedbackHover(0)}
                          onClick={() => setFeedbackRating(star)}
                          className="focus:outline-none transition-transform active:scale-90"
                        >
                          <Star 
                            size={44} 
                            strokeWidth={1.5}
                            className={`transition-all duration-300 ${
                              (feedbackHover || feedbackRating) >= star 
                                ? 'fill-amber-400 text-amber-400 scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]' 
                                : 'text-border hover:text-amber-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <textarea
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        placeholder="Optional comment: How can we improve our CSC services?"
                        className="w-full bg-background border border-border rounded-[2rem] p-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[140px] resize-none no-scrollbar text-text-main italic"
                        maxLength={300}
                      />
                      <div className="absolute bottom-4 right-6 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-30 mt-2">
                        {feedbackComment.length} / 300
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        type="submit"
                        disabled={feedbackRating === 0 || isFeedbackLoading}
                        className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:scale-100 disabled:shadow-none"
                      >
                        {isFeedbackLoading ? (
                          <div className="w-5 h-5 border-3 border-surface/30 border-t-surface rounded-full animate-spin" />
                        ) : (
                          <>Internal Feedback <ChevronRight size={18} /></>
                        )}
                      </button>
                      <a 
                        href={CONTACT_INFO.googleReviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-surface border border-border text-text-main px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-3 active:scale-95"
                      >
                        <Star size={18} className="fill-current" /> Rate on Google
                      </a>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10"
                >
                  <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-green-500/20">
                    <CheckCircle2 size={48} className="animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-black text-text-main uppercase tracking-tighter italic mb-4">Dhanyabad!</h2>
                  <p className="text-sm font-semibold text-text-muted mb-8 italic max-w-sm mx-auto">Thank you for your valuable response. We've recorded your <span className="text-primary font-black">{feedbackRating}-star</span> review for Chakraborty Enterprise.</p>
                  
                  <button
                    onClick={() => {
                      setFeedbackSubmitted(false);
                      setFeedbackRating(0);
                      setFeedbackComment('');
                    }}
                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:gap-3 transition-all flex items-center justify-center gap-2 mx-auto"
                  >
                     Send another review <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Local Verification Badge */}
      <div className="mt-20 p-12 bg-surface border border-border rounded-[3rem] text-center shadow-sm">
         <div className="max-w-2xl mx-auto space-y-4">
            <h4 className="text-2xl font-black text-text-main uppercase tracking-tighter italic">Authorized VLE Digital Gateway</h4>
            <p className="text-text-muted font-medium italic">Our centre is a registered CSC digital point serving the Chhoto Jagulia, Duttapukur, and Barasat-1 regions. We are committed to transparency in all citizen services.</p>
            <div className="pt-6 flex flex-wrap justify-center gap-4">
               <div className="px-6 py-3 bg-background rounded-2xl border border-border font-black text-[10px] uppercase tracking-[0.2em] text-text-muted italic">ID: {CONTACT_INFO.vleId}</div>
               <div className="px-6 py-3 bg-background rounded-2xl border border-border font-black text-[10px] uppercase tracking-[0.2em] text-text-muted italic">Center verified: {CONTACT_INFO.verifiedPhone}</div>
            </div>
         </div>
      </div>
    </motion.div>
    </>
  );
}
