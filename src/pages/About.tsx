import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, ShieldCheck, Users, Target, ChevronDown, 
  HelpCircle, CheckCircle2, Building2, UserCheck, 
  Briefcase, History, Milestone 
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { AboutSkeleton } from '../components/Skeletons';
import SEO from '../components/SEO';

const FAQS = [
  {
    question: "What is a CSC VLE and is this centre authorized?",
    answer: `A Village Level Entrepreneur (VLE) is the manager of a Common Service Centre (CSC). Yes, Chakraborty Enterprise is a fully authorized CSC point (ID: ${CONTACT_INFO.vleId}) under the Digital India initiative of the Government of India.`
  },
  {
    question: "What documents are required for an Aadhaar / PAN update?",
    answer: "For Aadhaar, you typically need a valid Proof of Identity (POI) and Proof of Address (POA). For PAN, you need identity proof and date of birth proof. We provide a complete checklist when you visit our centre."
  },
  {
    question: "How long does it take to process a Government Form?",
    answer: "Most form fill-ups are completed instantly. However, the official processing time by the government department (like Aadhaar or PAN) can vary from 3 to 15 working days."
  },
  {
    question: "Do you charge extra for services?",
    answer: "We charge a nominal service fee approved by the government for our technical assistance, scanning, and professional processing. Official portal fees are charged as per the government rate."
  },
  {
    question: "Can I book a same-day appointment?",
    answer: "Yes, you can check availability on our 'Services' page or simply walk into our Chhoto Jagulia centre. We prioritize booked appointments to minimize your waiting time."
  }
];

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (loading) return <AboutSkeleton />;

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Chakraborty Enterprise, an authorized Common Service Centre (CSC) in Chhoto Jagulia, West Bengal."
        keywords="About Chakraborty Enterprise, CSC VLE Chhoto Jagulia, Digital India CSC, Duttapukur CSC Point"
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Chakraborty Enterprise",
            "url": "https://chakraborty-enterprise.vercel.app/about"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]}
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 space-y-24 max-w-7xl mx-auto px-4"
      >
      {/* Hero Section */}
      <section className="text-center md:text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
          Establishment & Vision
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-text-main uppercase tracking-tighter leading-none italic">
          Powering the Rural <br />
          <span className="text-primary tracking-normal not-italic">Digital Revolution.</span>
        </h1>
        <p className="text-text-muted font-medium italic text-lg md:text-xl max-w-3xl leading-relaxed">
          Chakraborty Enterprise was founded with a vision of empowering not only Chhoto Jagulia but every citizen across West Bengal, ensuring equal access to government services and digital banking.
        </p>
      </section>

      {/* Stats & Identity */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 flex flex-col gap-8">
           <div className="bento-card p-10 bg-text-main dark:bg-surface/10 text-surface dark:text-text-main border-none flex flex-col justify-center shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6 italic">The VLE Identity</h2>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-surface/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center border border-surface/20 dark:border-primary/30">
                      <UserCheck size={32} className="text-primary" />
                  </div>
                  <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Operator Name</p>
                      <p className="text-xl font-bold uppercase italic">{CONTACT_INFO.operatorName}</p>
                  </div>
                </div>
                <p className="opacity-70 font-medium italic leading-relaxed mb-6">
                  "Our Common Service Centre is more than just a business. It's a digital bridge for farmers, students, and seniors who need professional help navigating the complex world of online government portals."
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-surface/5 dark:bg-surface/20 rounded-xl border border-surface/10 dark:border-border/30 text-[10px] font-black uppercase tracking-widest italic">{CONTACT_INFO.serviceArea}</div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bento-card p-8 dark:bg-surface/30 backdrop-blur-sm">
                 <History size={32} className="text-primary mb-4" />
                 <h3 className="text-lg font-black uppercase tracking-tight mb-2 italic">Our History</h3>
                 <p className="text-sm text-text-muted font-medium italic leading-relaxed">Serving the North 24 Parganas district for years with dedicated digital support and a proven track record of accuracy.</p>
              </div>
              <div className="bento-card p-8 dark:bg-surface/30 backdrop-blur-sm">
                 <Milestone size={32} className="text-primary mb-4" />
                 <h3 className="text-lg font-black uppercase tracking-tight mb-2 italic">Our Reach</h3>
                 <p className="text-sm text-text-muted font-medium italic leading-relaxed">Covering all Indian citizens, ensuring no one is left behind in the digital era.</p>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-1 gap-4">
           {[
             { label: 'Trusted By', val: '5000+', sub: 'Local Citizens', icon: Users },
             { label: 'Services', val: '50+', sub: 'Categories', icon: Briefcase },
             { label: 'Accuracy', val: '99%', sub: 'Success Rate', icon: Target },
             { label: 'Verified', val: 'CSC', sub: 'Authorized', icon: ShieldCheck }
           ].map((stat, i) => (
             <div key={i} className="bento-card flex items-center gap-6 p-8 relative overflow-hidden group">
                <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all border border-border group-hover:border-primary">
                   <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-2xl font-black text-text-main leading-none mb-1 uppercase tracking-tight italic">{stat.val}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{stat.sub}</p>
                </div>
                <div className="absolute top-0 right-0 p-2 opacity-5">
                   <stat.icon size={48} />
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-primary/5 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden border border-primary/10">
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
             <h2 className="text-3xl md:text-5xl font-black text-text-main uppercase tracking-tighter italic">Committed to Transparency.</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {[
                  { title: 'Zero Corruption', text: 'We adhere strictly to government mandated fees and clear professional service charges.' },
                  { title: 'Data Privacy', text: 'All citizen documents are handled with military-grade privacy. Physical copies are returned immediately.' },
                  { title: 'Digital Literacy', text: 'We dont just do the work; we explain the process to help citizens learn about digital tools.' },
                  { title: 'Fast Results', text: 'Using high-speed enterprise internet and modern hardware to minimize your time at our centre.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                     <CheckCircle2 className="text-primary mt-1 shrink-0" size={20} strokeWidth={3} />
                     <div>
                        <h4 className="font-black uppercase tracking-tight text-text-main italic">{item.title}</h4>
                        <p className="text-sm font-medium italic text-text-muted leading-relaxed mt-1">{item.text}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <Building2 size={300} className="absolute -bottom-20 -right-20 text-primary/5 -rotate-12 pointer-events-none" />
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-text-main uppercase tracking-tighter mb-4 italic">Citizen FAQ</h2>
          <p className="text-text-muted font-medium italic">Finding answers to your most frequent concerns about digital services.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`overflow-hidden border-2 transition-all duration-300 rounded-[2rem] bg-surface ${
                openFaq === index 
                  ? 'border-primary shadow-2xl shadow-primary/10 translate-x-2' 
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className={`font-black text-lg md:text-xl tracking-tighter uppercase italic transition-colors duration-300 ${
                  openFaq === index ? 'text-primary' : 'text-text-main'
                }`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  openFaq === index ? 'bg-primary text-white rotate-180 shadow-lg' : 'bg-background text-text-muted'
                }`}>
                  <ChevronDown size={20} strokeWidth={3} />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-6 lg:px-8 lg:pb-8">
                       <div className="pt-6 border-t border-dashed border-border text-text-muted text-lg font-medium italic leading-relaxed">
                          {faq.answer}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
      </motion.div>
    </>
  );
}
