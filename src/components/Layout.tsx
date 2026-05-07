import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Menu, X, Home, Briefcase, Info, Phone, MessageSquare, 
  MapPin, ShieldCheck, AlertCircle, Sun, Moon,
  Facebook, Twitter, Linkedin, Download, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_INFO } from '../constants';
import { usePWA } from '../hooks/usePWA';
import LoadingScreen from './LoadingScreen';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { deferredPrompt, install } = usePWA();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Contact', path: '/contact', icon: Phone },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-main transition-colors duration-300">
      {/* Top Bar */}
      <header className="sticky top-0 w-full h-20 bg-background/80 backdrop-blur-md border-b border-border z-[100] px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Chakraborty Enterprise Home">
          <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-cyan-500/10 transition-transform group-hover:scale-110 group-hover:rotate-6 overflow-hidden border border-border/30" aria-hidden="true">
            <Logo className="w-full h-full p-1" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl text-text-main leading-none uppercase tracking-tighter italic">Chakraborty Enterprise</span>
            <span className="text-[10px] text-text-muted font-black tracking-widest uppercase flex items-center gap-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
              CSC & Digital Centre
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10" aria-label="Desktop Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              aria-current={({ isActive }: { isActive: boolean }) => (isActive ? 'page' : undefined)}
              className={({ isActive }) => 
                `group relative text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0'} group-hover:w-full`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 bg-surface dark:bg-white/5 text-text-main rounded-[1.25rem] border border-border shadow-sm hover:border-primary transition-all active:scale-95"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link 
            to="/services" 
            className="hidden sm:flex px-6 py-4 bg-cyan-950 dark:bg-cyan-600 text-surface rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-cyan-900/10 active:scale-95 border border-white/10"
          >
            Get Expert Help
          </Link>
          <button 
            onClick={toggleMenu}
            className="p-3 text-text-main bg-surface dark:bg-white/5 hover:bg-primary/10 rounded-2xl transition-all border border-border lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>


      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[500]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-[320px] bg-background shadow-2xl p-8 flex flex-col border-l border-border/50 optimize-gpu overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="font-black text-2xl text-text-main italic uppercase tracking-tighter">Menu</span>
                <button onClick={toggleMenu} className="p-3 text-text-muted hover:text-text-main transition-colors">
                  <X size={28} />
                </button>
              </div>
              <nav className="flex flex-col gap-6 mb-12">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={toggleMenu}
                    className={({ isActive }) => 
                      `flex items-center gap-6 p-6 rounded-[2rem] text-2xl font-black uppercase tracking-tight italic border-2 transition-all ${
                        isActive 
                          ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/30 scale-[1.02]' 
                          : 'bg-surface border-border/50 text-text-main hover:border-primary/20 hover:scale-[1.02]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={28} strokeWidth={isActive ? 3 : 2} className={isActive ? "text-white" : "text-primary"} />
                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              <div className="space-y-4">
                 <Link 
                  to="/services?book=true" 
                  onClick={toggleMenu}
                  className="block p-6 bg-text-main text-surface rounded-[2rem] font-black uppercase italic tracking-tighter text-xl text-center shadow-2xl shadow-cyan-500/5 active:scale-95 transition-all"
                >
                  Book Appointment
                </Link>
                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hi, I need assistance with a digital service.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-3 p-6 bg-[#25D366] text-white rounded-[2rem] font-black uppercase italic tracking-tighter text-xl text-center shadow-2xl shadow-green-500/20 active:scale-95 transition-all"
                >
                  <MessageSquare size={24} strokeWidth={3} /> Chat on WhatsApp
                </a>
                {deferredPrompt && (
                  <button 
                    className="w-full p-6 bg-primary text-white rounded-[2rem] font-black uppercase italic tracking-tighter text-xl text-center shadow-2xl shadow-cyan-500/30 active:scale-95 transition-all flex items-center justify-center gap-3"
                    onClick={install}
                  >
                    <Download size={24} strokeWidth={3} /> Install App
                  </button>
                )}
                <div className="flex items-center gap-2 justify-center py-3 bg-primary/10 rounded-xl">
                    <ShieldCheck size={14} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Certified CSC Point</span>
                </div>
              </div>

              <div className="mt-auto pt-10 border-t border-border">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center text-primary border border-border">
                      <Phone size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Direct Support</p>
                      <p className="text-lg font-black text-text-main">{CONTACT_INFO.verifiedPhone}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-grow pb-24 lg:pb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-20 py-20 relative z-[40] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-xl overflow-hidden border border-border/30 group-hover:scale-105 transition-transform">
                <Logo className="w-full h-full p-3" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-text-main uppercase tracking-tighter italic">Chakraborty Enterprise</span>
                <span className="text-[10px] text-text-muted font-black tracking-widest uppercase">Digital Governance & Banking</span>
              </div>
            </Link>
            <p className="text-sm text-text-muted font-medium italic leading-relaxed max-w-sm">
              An authorized Common Service Centre (CSC) dedicated to empowering not only Chhoto Jagulia but citizens across West Bengal with seamless digital access to government schemes and banking.
            </p>
            <div className="p-8 bg-background rounded-[2rem] border border-border space-y-4">
               <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-primary mt-1" />
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-text-main leading-relaxed italic">{CONTACT_INFO.fullAddress}</p>
                    <a 
                      href={CONTACT_INFO.googleMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:underline hover:opacity-80 transition-all"
                    >
                      Open in Maps
                    </a>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <ShieldCheck size={18} className="text-primary mt-1" />
                  <p className="text-xs font-bold text-text-main">VLE ID: <span className="text-primary">{CONTACT_INFO.vleId}</span></p>
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] mb-10">Exploration</h4>
            <nav className="flex flex-col gap-5">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ))}
              <a href={CONTACT_INFO.googleMapLink} target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors">Locate VLE Point</a>
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] mb-10">Direct Contact</h4>
            <div className="flex flex-col gap-6">
              <a 
                href={`tel:${CONTACT_INFO.normalizedPhone}`} 
                className="flex items-center gap-4 group"
                aria-label={`Call us at ${CONTACT_INFO.verifiedPhone}`}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-primary/5">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Phone Support</p>
                  <p className="text-sm font-black text-text-main">{CONTACT_INFO.verifiedPhone}</p>
                </div>
              </a>
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hi, I have a query regarding your services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                aria-label="Chat on WhatsApp"
              >
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm border border-green-500/5">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">WhatsApp VLE</p>
                  <p className="text-sm font-black text-text-main hover:text-primary transition-colors">Chat Now</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">© 2026 Chakraborty Enterprise. All Rights Reserved.</p>
            <p className="text-[9px] font-bold text-text-muted/70 uppercase tracking-tight max-w-md text-center md:text-left">Unauthorized copying, reproduction, or distribution of this software or its UI is strictly prohibited.</p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter italic">Professional Digital Support.</p>
              <div className="w-1 h-1 bg-border rounded-full" />
              <div className="flex items-center gap-2">
                <AlertCircle size={10} className="text-primary" />
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Authorized CSC Point</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
               { icon: <Facebook size={18} strokeWidth={2.5} />, label: 'Facebook', href: 'https://www.facebook.com/share/1CBBd9krbv/' },
               { icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 4.21A9 9 0 1 1 7.5 19.79" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                    <path d="M4.21 16.5A9 9 0 0 1 4.21 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                    <path d="M3.8 6L13.5 12L3.8 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               ), label: 'Meta Business', href: 'https://www.facebook.com/share/1aQkbCBMWo/' },
               { icon: <Twitter size={18} strokeWidth={2.5} />, label: 'X', href: 'https://x.com/atanutamasi1' },
               { icon: <Linkedin size={18} strokeWidth={2.5} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/atanu-chakraborty09' },
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background border border-border rounded-xl flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all active:scale-95 shadow-sm"
                aria-label={`Follow us on ${social.label}`}
              >
                {social.icon}
              </a>
            ))}
            <a
              href="https://linktr.ee/atanutamasi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-background border border-border rounded-xl flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all active:scale-95 shadow-sm"
              aria-label="Follow us on Linktree"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.511 5.853l4.005-3.96 2.001 2.095-4.052 3.913h5.88v2.771h-5.936l4.052 3.913-2 2.095-5.46-5.457-5.46 5.457-2.001-2.095 4.052-3.913H2.656V8.901h5.879L4.483 4.988l2-2.095 4.006 3.96V.5h3.022v5.353zm-3.022 10.564h3.022V23.5h-3.022v-7.083z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile Nav - Modern Pill Design */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-sm h-16 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-full border border-white/10 z-[100] flex items-center justify-around px-1 lg:hidden shadow-2xl transition-all duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center gap-1 w-full h-full transition-all relative ${
                  isActive ? 'text-primary' : 'text-slate-400 opacity-70'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-bg"
                      className="absolute inset-2 bg-primary/20 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                    className="relative z-10"
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                  <span className="text-[8px] font-black uppercase tracking-widest relative z-10">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
        {/* PWA Install for Mobile Nav */}
        {deferredPrompt && (
          <button 
            className="flex flex-col items-center justify-center gap-1 w-full h-full transition-all relative text-text-muted opacity-60"
            onClick={install}
            aria-label="Download App"
          >
            <div className="relative z-10">
              <Download size={20} strokeWidth={2.5} className="text-primary" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest relative z-10">Install</span>
          </button>
        )}
      </div>
    </div>
  );
}
