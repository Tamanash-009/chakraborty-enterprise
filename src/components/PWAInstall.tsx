import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePWA } from '../hooks/usePWA';

export default function PWAInstall() {
  const { deferredPrompt, isInstalled, install } = usePWA();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (deferredPrompt && !isInstalled) {
      const timer = setTimeout(() => {
        const isDismissed = sessionStorage.getItem('pwa-dismissed');
        if (!isDismissed) {
          setIsVisible(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [deferredPrompt, isInstalled]);

  const handleInstallClick = async () => {
    await install();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('pwa-dismissed', 'true');
  };

  if (isInstalled || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-96 z-[9999]"
          id="pwa-install-banner"
        >
          <div className="bg-surface dark:bg-zinc-900 border-2 border-primary/20 rounded-[2.5rem] p-6 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
            
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-primary transition-colors"
              aria-label="Dismiss"
            >
              <X size={20} />
            </button>

            <div className="flex gap-4 items-start relative z-10">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Smartphone size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-text-main uppercase tracking-tight italic leading-tight mb-1">
                  Install our App
                </h3>
                <p className="text-xs text-text-muted font-medium leading-relaxed mb-4">
                  Add <span className="text-primary font-bold">Chakraborty Enterprise</span> to your home screen for faster access & offline support.
                </p>
                
                <button 
                  onClick={handleInstallClick}
                  className="w-full bg-primary text-white py-3 px-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all group/btn"
                >
                  <Download size={16} /> Install Now <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
