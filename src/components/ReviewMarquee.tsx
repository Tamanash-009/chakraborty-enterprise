import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export default function ReviewMarquee() {
  return (
    <div className="w-full overflow-hidden bg-background py-16 border-y border-border/50 relative group content-auto">
      {/* Google Review Sync Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-border">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-black text-text-main uppercase italic">Google Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-widest text-text-muted">Live Sync Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold text-text-muted italic">4.9 / 5.0 Based on 250+ reviews</span>
        </div>
      </div>

      {/* Subtle background text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden select-none">
        <span className="text-[20rem] font-black uppercase tracking-tighter italic whitespace-nowrap">
          Customer Stories • Digital Excellence • Trusted by Thousands • 
        </span>
      </div>

      <div className="relative z-10">
        <motion.div 
          className="flex gap-6 px-6 optimize-gpu"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 50, 
            repeat: Infinity, 
            ease: "linear"
          }}
          style={{ width: 'max-content' }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-[350px] sm:w-[400px] bg-surface dark:bg-surface/30 backdrop-blur-xl border border-border/60 rounded-[2.5rem] p-8 hover:shadow-primary/5 hover:border-primary/20 transition-all group/card"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote size={32} className="text-primary/10 group-hover/card:text-primary/20 transition-colors" />
              </div>

              <p className="text-text-main font-semibold text-sm italic leading-relaxed mb-8 min-h-[4.5rem]">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-[1.25rem] bg-background object-cover border border-border/50"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-surface flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-black text-text-main uppercase italic leading-none truncate">{testimonial.name}</h4>
                  <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mt-1 opacity-60 italic">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Side Gradients for fading effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
    </div>
  );
}
