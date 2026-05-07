import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Fingerprint, FileText, HeartPulse, Plane, CreditCard, Shield } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const quickActions = [
  { name: 'Aadhaar Service', icon: Fingerprint, text: 'Hi, I need help with Aadhaar services.' },
  { name: 'PAN Card', icon: CreditCard, text: 'Hi, I need help with PAN Card application.' },
  { name: 'Insurance', icon: Shield, text: 'Hi, I want to know about Insurance plans.' },
  { name: 'Ayushman Bharat', icon: HeartPulse, text: 'Hi, I need help with Ayushman Bharat.' },
  { name: 'Ticket Booking', icon: Plane, text: 'Hi, I want to book tickets.' }
];

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      drag
      dragMomentum={false}
      dragTransition={{ power: 0.2, timeConstant: 200 }}
      whileTap={{ cursor: 'grabbing' }}
      className="fixed bottom-24 right-6 z-[100] flex flex-col items-end sm:bottom-6 sm:right-6 cursor-grab"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-surface dark:bg-background/90 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 w-64 origin-bottom-right"
          >
            <div className="flex items-center gap-3 mb-4 border-b border-border pb-3">
              <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366]">
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-text-main italic">Need Help?</h4>
                <p className="text-[10px] text-text-muted font-bold">Fastest way to reach us</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {quickActions.map((action, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(action.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:bg-primary/5 rounded-xl transition-colors group"
                >
                  <action.icon size={14} className="text-text-muted group-hover:text-primary transition-colors" />
                  <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors italic">{action.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all"
        aria-label="WhatsApp Us"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40"></span>
        <MessageSquare size={24} />
      </button>
    </motion.div>
  );
};

export default FloatingWhatsApp;
