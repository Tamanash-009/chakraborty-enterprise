import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, MessageSquare, Activity, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/services', icon: LayoutGrid, label: 'Services' },
  { 
    path: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi!`, 
    icon: MessageSquare, 
    label: 'WhatsApp',
    external: true
  },
  { path: '/services#faq', icon: Activity, label: 'Track' },
  { path: '/contact', icon: Phone, label: 'Contact' },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border pb-safe pt-2 px-4 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        
        if (item.external) {
          return (
            <a 
              key={idx}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center w-14 h-12 gap-1"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30">
                <item.icon size={16} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-text-muted mt-0.5">{item.label}</span>
            </a>
          );
        }

        return (
          <NavLink 
            key={idx}
            to={item.path}
            className={({ isActive }) => `flex flex-col items-center justify-center w-14 h-12 gap-1 transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
          >
            <item.icon size={20} className={isActive ? "drop-shadow-[0_0_8px_rgba(8,145,178,0.5)]" : ""} />
            <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : ''}`}>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
