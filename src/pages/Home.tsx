import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, MessageSquare, MapPin, ArrowRight, ShieldCheck, 
  Clock, Users, ChevronRight, Star, Quote, Laptop, 
  CheckCircle2, AlertCircle, Building2, Smartphone, FileCheck,
  Plus, Minus
} from 'lucide-react';
import { CONTACT_INFO, SERVICE_CATEGORIES, TESTIMONIALS } from '../constants';
import { Link } from 'react-router-dom';
import { HomeSkeleton } from '../components/Skeletons';
import SEO from '../components/SEO';

import ReviewMarquee from '../components/ReviewMarquee';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) return <HomeSkeleton />;

  return (
    <>
      <SEO 
        title="Home" 
        description="Empowering citizens across West Bengal from our Digital Service Center in Chhoto Jagulia. Expertise in Aadhaar updates, PAN cards, banking, and government scholarship applications."
        keywords="Aadhaar Update Chhoto Jagulia, PAN Card Barasat, Banking Service North 24 Parganas, CSC Center Chhoto Jagulia"
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Chakraborty Enterprise",
            "url": "https://chakraborty-enterprise.vercel.app/"
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Chakraborty Enterprise",
            "url": "https://chakraborty-enterprise.vercel.app/",
            "logo": "https://chakraborty-enterprise.vercel.app/logo-large.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": CONTACT_INFO.normalizedPhone,
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Bengali", "Hindi"]
            }
          }
        ]}
      />
      <motion.div 
        variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-20"
    >
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-8 bento-card-hero p-8 md:p-12 flex flex-col justify-center min-h-[450px] relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                <ShieldCheck size={16} className="text-cyan-200" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Verified CSC Digital Centre</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[0.9] text-white uppercase italic">
                Empowering <br /> 
                <span className="text-cyan-300">Digital Citizens.</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 font-medium italic">
                Chakraborty Enterprise is on a mission of empowering not only Chhoto Jagulia but every citizen across West Bengal with seamless digital banking and government services. Fast, reliable, and secure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/services"
                  className="px-8 py-5 bg-cyan-950 text-white rounded-[2.5rem] font-black transition-all hover:scale-105 active:scale-95 text-center shadow-2xl shadow-cyan-900/20 flex items-center gap-2 uppercase tracking-tight group border border-white/10"
                >
                   View All Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hi, I want to inquire about your digital services.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-5 bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-[2.5rem] font-black transition-all hover:bg-white/20 active:scale-95 text-center flex items-center gap-2 uppercase tracking-tight"
                >
                  <MessageSquare size={20} /> Chat with VLE
                </a>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl opacity-50" />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 bento-card flex flex-col justify-between dark:bg-surface/30 dark:backdrop-blur-sm"
          >
            <div>
              <div className="w-14 h-14 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm border border-primary/10">
                <MapPin size={28} />
              </div>
              <h3 className="text-2xl font-black text-text-main mb-2 uppercase tracking-tight leading-none italic">Visit Our Centre</h3>
              <p className="text-text-muted font-medium italic leading-relaxed mb-4">
                {CONTACT_INFO.fullAddress}
              </p>
              <div className="p-6 bg-background dark:bg-background/40 rounded-[2rem] border border-dashed border-border mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Operating Hours</p>
                <p className="text-sm font-extrabold text-text-main opacity-80">{CONTACT_INFO.timings}</p>
              </div>
            </div>
            <a 
              href={CONTACT_INFO.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 bg-slate-900 dark:bg-slate-700 text-white rounded-[2rem] font-black text-center shadow-xl shadow-cyan-500/5 hover:bg-primary transition-all active:scale-95 uppercase tracking-widest text-xs"
            >
              Locate on Maps
            </a>
          </motion.div>
        </div>
      </section>

      {/* Most Requested Services (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:pl-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-text-main uppercase tracking-tighter leading-none mb-2 italic">Most Requested</h2>
            <p className="text-text-muted font-medium italic">Our most popular digital services this month.</p>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs group px-2 py-1">
            Explore Full Catalog <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Aadhaar Update', icon: FileCheck, color: 'bg-orange-500/10 text-orange-600', text: 'Identity & Address', path: '/services#government' },
            { title: 'PAN Correction', icon: Smartphone, color: 'bg-blue-500/10 text-blue-600', text: 'Tax & Compliance', path: '/services#government' },
            { title: 'Banking (AEPS)', icon: Laptop, color: 'bg-green-500/10 text-green-600', text: 'Instant Cash Withdrawal', path: '/services#banking' },
            { title: 'Exam Form', icon: Building2, color: 'bg-purple-500/10 text-purple-600', text: 'Education & Careers', path: '/services#education' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 bg-surface dark:bg-surface/30 dark:backdrop-blur-sm border border-border rounded-[2.5rem] flex flex-col gap-8 group cursor-pointer hover:shadow-2xl hover:shadow-primary/5 transition-all"
            >
              <div className={`w-14 h-14 ${item.color} dark:bg-opacity-20 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform border border-current border-opacity-10`}>
                <item.icon size={28} />
              </div>
              <div>
                <h3 className="text-lg font-black text-text-main uppercase tracking-tight mb-1 italic">{item.title}</h3>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-relaxed">
                  {item.text}
                </p>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between">
                 <Link to={item.path} className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                   Details <ArrowRight size={12} />
                 </Link>
                 <Link to={item.path} className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowRight size={18} />
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-auto">
        <div className="bg-surface rounded-[3rem] p-8 md:p-12 border border-border shadow-sm">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-text-main uppercase tracking-tighter mb-4 italic">How it Works</h2>
              <p className="text-text-muted font-medium italic max-w-lg mx-auto">Get your digital work done in 3 simple steps without standing in long queues.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {[
                { step: '01', title: 'Consult or Book', text: 'Book an appointment online or consult us via WhatsApp about your requirements.' },
                { step: '02', title: 'Visit Centre', text: 'Visit our Chhoto Jagulia centre with the required documents at your preferred time.' },
                { step: '03', title: 'Get it Done', text: 'Let our experts process your application with high accuracy and professional care.' }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center group px-4">
                  <div className="w-20 h-20 bg-background border-4 border-surface rounded-full flex items-center justify-center text-2xl font-black text-primary shadow-xl mb-8 group-hover:scale-110 transition-transform italic relative">
                    {item.step}
                    {i < 2 && (
                      <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden md:flex text-border group-hover:text-primary transition-colors">
                        <ArrowRight size={32} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-text-main uppercase tracking-tight mb-4 italic leading-none">{item.title}</h3>
                  <p className="text-text-muted font-medium italic leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Trust & Testimonials - New Marquee Implementation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-md ml-2 text-center md:text-left">
            <h2 className="text-3xl font-black text-text-main uppercase tracking-tighter leading-none mb-2 italic">Citizen Trust</h2>
            <p className="text-text-muted font-medium italic">Hear from the people who regularly use our digital services.</p>
          </div>
          <div className="flex gap-1 text-amber-500 justify-center">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
          </div>
        </div>

        <ReviewMarquee />
      </section>

      {/* Verified Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-10 bg-slate-900 dark:bg-slate-800 text-white rounded-[3rem] relative overflow-hidden transition-all shadow-2xl shadow-cyan-500/5">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                  <AlertCircle size={16} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Local Area Statement</span>
               </div>
               <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none italic">
                  Serving the North 24 Parganas Community.
               </h2>
               <p className="opacity-70 font-medium max-w-xl text-lg italic">
                  {CONTACT_INFO.serviceArea}
               </p>
               <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary" size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest leading-none">Doorstep Pickup Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary" size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest leading-none">Digital Receipts for all</span>
                  </div>
               </div>
            </div>
            <div className="w-full lg:w-auto">
               <Link 
                to="/contact" 
                className="w-full lg:w-auto inline-flex items-center justify-center gap-4 py-6 px-12 bg-surface text-text-main rounded-[2rem] font-black uppercase italic tracking-tighter text-xl hover:scale-105 transition-all shadow-2xl"
               >
                  Start your enquiry <ArrowRight size={24} />
               </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </section>

      {/* FAQ Selection for AEO (Answer Engine Optimization) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 font-black italic">
            Common Inquiries
          </div>
          <h2 className="text-3xl font-black text-text-main uppercase tracking-tighter italic">Frequent Questions</h2>
        </div>
        
        <div className="space-y-4">
          {[
            {
              q: "What documents are required for an Aadhaar Mobile Link?",
              a: "You just need your Original Aadhaar Card. Biometric authentication is done at our center to link or update your mobile number. It usually reflects within 24-72 hours."
            },
            {
              q: "Can I withdraw cash from any bank at your center?",
              a: "Yes, using our AEPS (Aadhaar Enabled Payment System) service, you can withdraw cash from almost any Indian bank using your Aadhaar number and thumb impression."
            },
            {
              q: "How long does it take to get a new PAN Card?",
              a: "A digital e-PAN is usually generated within 48-72 hours, and the physical card is delivered to your home address via Speed Post within 10-15 working days."
            },
            {
              q: "Do you provide doorstep services for seniors?",
              a: "Yes, for elders or specially-abled citizens in the Chhoto Jagulia area, we provide doorstep pickup of documents for specific services. Please contact us on WhatsApp to schedule."
            }
          ].map((faq, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface dark:bg-zinc-900 border border-border rounded-3xl p-6 md:p-8 hover:border-primary/30 transition-colors group"
            >
              <h3 className="text-lg font-black text-text-main mb-3 italic flex items-start gap-3 group-hover:text-primary transition-colors">
                <span className="text-primary mt-1">Q.</span> {faq.q}
              </h3>
              <p className="text-text-muted font-medium italic leading-relaxed pl-8">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
    </>
  );
}
