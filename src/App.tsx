/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import PWAInstall from './components/PWAInstall';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import { Privacy, Terms, Refund } from './pages/Legal';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function CopyProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Allow right-click inside inputs/textareas
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      e.preventDefault();
    };
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);
  return null;
}

export default function App() {
  return (
    <Router>
      <CopyProtection />
      <ScrollToTop />
      <PWAInstall />
      <FloatingWhatsApp />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
        </Routes>
      </Layout>
    </Router>
  );
}
