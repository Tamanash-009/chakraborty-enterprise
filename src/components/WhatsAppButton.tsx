import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hi, I need assistance with a digital service.')}`;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragTransition={{ power: 0.2, timeConstant: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, cursor: 'grabbing' }}
      className="fixed bottom-24 right-6 z-[1000] cursor-grab"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba59] transition-all relative group border-4 border-white dark:border-white/10"
        title="Chat with us"
      >
        <MessageCircle size={32} fill="currentColor" className="text-white group-hover:rotate-12 transition-transform" />
        
        {/* Modern Tooltip */}
        <div className="absolute right-20 bg-background dark:bg-surface border border-border px-4 py-2 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
           <p className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">Live Chat Support</p>
           <p className="text-xs font-bold text-text-main italic">Connect with {CONTACT_INFO.operatorName}</p>
        </div>
        
        {/* Glow & Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <div className="absolute -inset-1 bg-[#25D366] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity -z-10" />
      </a>
    </motion.div>
  );
}
