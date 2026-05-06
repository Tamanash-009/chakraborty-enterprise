import React from 'react';
import { motion } from 'motion/react';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10"
      >
        <img
          src="/logo.png"
          alt="Chakraborty Enterprise"
          className="w-28 h-28 object-contain"
          draggable={false}
        />
      </motion.div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="flex flex-col items-center gap-1 mb-10"
      >
        <span className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">
          Chakraborty Enterprise
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
          CSC &amp; Digital Centre
        </span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-40 h-1 bg-slate-100 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
