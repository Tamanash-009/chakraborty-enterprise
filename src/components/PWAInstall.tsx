import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, X } from 'lucide-react';

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);

      // Check if user previously dismissed
      const isDismissed = localStorage.getItem('pwa_install_dismissed');
      
      if (!isDismissed) {
        // Show popup immediately after browser determines it is installable
        setTimeout(() => {
          setShowPopup(true);
        }, 0);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // We no longer need the prompt. Clear it up.
      setDeferredPrompt(null);
      setShowPopup(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_install_dismissed', 'true');
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-[400px] bg-surface border border-border shadow-2xl rounded-3xl p-6 z-50 overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-4 mb-6 relative z-10">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
              <Smartphone size={28} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-text-main italic leading-tight">Get the Chakraborty Enterprise App</h3>
              <p className="text-sm font-medium text-text-muted italic mt-1 leading-relaxed">
                Install directly to your device for faster access and a seamless experience.
              </p>
            </div>
          </div>

          <div className="flex gap-3 relative z-10">
            <button
              onClick={handleDismiss}
              className="flex-1 py-3 px-4 bg-background border border-border text-text-muted font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-border/50 hover:text-text-main transition-all active:scale-95 italic"
            >
              Not Now
            </button>
            <button
              onClick={handleInstall}
              className="flex-[2] py-3 px-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-cyan-500/20 hover:bg-primary-dark transition-all active:scale-95 italic"
            >
              Install App
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
