import React, { useEffect } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import CaseStudies from './components/CaseStudies'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import BookingPage from './pages/BookingPage'
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

function HomePage() {
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget');
    if (target) {
      sessionStorage.removeItem('scrollTarget');
      setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 500); // delay allows page and shader to mount
    }
  }, []);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, (val) => val * -0.3);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '140vh',
          zIndex: -20,
          background: 'radial-gradient(circle at 50% 30%, #170b24 0%, #0d000d 50%, #000000 100%)',
          y: backgroundY,
          pointerEvents: 'none',
        }}
      />
      <Hero />
      <Services />
      <Process />
      <CaseStudies />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </>
  )
}

function App() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const btns = document.querySelectorAll('.btn-primary, .btn-outline');
      btns.forEach((btn) => {
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (btn as HTMLElement).style.setProperty('--x', `${x}%`);
        (btn as HTMLElement).style.setProperty('--y', `${y}%`);
      });
    };
    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ background: '#000000', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <Navbar />
      <React.Suspense
        fallback={
          <div
            style={{
              minHeight: '100vh',
              background: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                border: '2px solid #2A114B',
                borderTop: '2px solid #dface8',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>
      </React.Suspense>
    </div>
  )
}

export default App

