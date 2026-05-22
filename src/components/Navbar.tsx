import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { text: 'Home', href: '#hero' },
  { text: 'Services', href: '#services' },
  { text: 'Process', href: '#process' },
  { text: 'Case Studies', href: '#case-studies' },
  { text: 'About', href: '#about' },
  { text: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dockOpen, setDockOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Only run observer on homepage
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    let observer: IntersectionObserver | null = null;

    // Small delay to let the page sections mount fully after navigation
    const timeout = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0,
        }
      );

      sections.forEach((section) => obs.observe(section));
      observer = obs;
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!scrolled) {
      setActiveSection('hero');
    }
  }, [scrolled]);

  if (location.pathname === '/book') return null;

  const navStyle = scrolled
    ? {
        width: '92%',
        maxWidth: '896px', // 4xl
        background: 'rgba(255, 255, 255, 0.04)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: '1px',
        borderStyle: 'solid',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: '9999px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        left: '50%',
        transform: 'translateX(-50%)',
        margin: '0 auto',
        padding: '10px 20px',
      }
    : {
        width: 'calc(100% - 80px)',
        maxWidth: '1280px',
        background: 'transparent',
        borderColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderRadius: '0px',
        boxShadow: 'none',
        left: '50%',
        transform: 'translateX(-50%)',
        margin: '0 auto',
        padding: '10px 0px',
      };

  return (
    <>
      <header
        className="fixed top-4 z-50 flex items-center justify-between px-10 py-4"
        style={{
          ...navStyle,
          willChange: 'transform, width, max-width, border-radius, background-color, border-color, backdrop-filter',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-bold text-2xl select-none transition-colors duration-200 ml-2 pl-5"
          style={{ color: '#FFFFFF' }}
        >
          Rapivio
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <motion.a
                key={item.text}
                href={item.href}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.05 }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  const target = item.href; // e.g. "#services"
                  const el = document.querySelector(target);
                  if (el) {
                    // Already on home page — just smooth scroll
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // On a different page — navigate home then scroll after mount
                    sessionStorage.setItem('scrollTarget', target);
                    window.location.href = '/';
                  }
                }}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive ? 'text-[#FFFFFF]' : 'text-[rgba(255,255,255,0.6)] hover:text-[#FFFFFF]'
                }`}
              >
                {item.text}
              </motion.a>
            );
          })}
        </nav>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center gap-4 mr-2">
          {/* Desktop CTA */}
          <button
            onClick={() => navigate('/book')}
            className="hidden md:inline-flex btn-primary navbar-cta"
            style={{ minWidth: '138px' }}
          >
            <span className="btn-text">
              <span className="btn-label">Book a Call</span>
              <span className="btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
              </span>
            </span>
          </button>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden flex items-center justify-center p-1"
            aria-label="Toggle menu"
            onClick={() => setDockOpen(!dockOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <motion.svg
              animate={{ rotate: dockOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {dockOpen && (
          <motion.div
            key="mobile-nav-dock"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{
              background: 'rgba(0, 0, 0, 0.82)',
              backdropFilter: 'blur(60px) saturate(180%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%)',
            }}
          >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');`}</style>

            {/* Nav Links */}
            <div className="flex flex-col justify-center flex-1 gap-6" style={{ paddingLeft: '4.25rem' }}>
              {NAV_LINKS.map((item, idx) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.a
                    key={item.text}
                    href={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setDockOpen(false);
                      const el = document.querySelector(item.href);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        sessionStorage.setItem('scrollTarget', item.href);
                        window.location.href = '/';
                      }
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(1rem)'; (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; (e.currentTarget as HTMLElement).style.color = isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)'; }}
                    style={{
                      fontSize: '2.25rem',
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      fontWeight: 400,
                      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      padding: '0.15rem 0',
                      letterSpacing: '0em',
                      lineHeight: 1.2,
                      display: 'block',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {item.text}
                  </motion.a>
                );
              })}
            </div>

            <div style={{ paddingLeft: '4.25rem', paddingRight: '2rem', paddingBottom: '1.5rem' }}>
              {/* Separator */}
              <div style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                marginBottom: '1.75rem',
              }} />



              {/* Social icons row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>

                {/* Instagram — stroke style, pink on hover via state not possible inline, use brand color */}
                <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', color: '#FFFFFF' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* X (Twitter) — fill style */}
                <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', color: '#FFFFFF' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* YouTube — fill style */}
                <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', color: '#FFFFFF' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Mail — Lucide style stroke */}
                <a href="mailto:#" style={{ display: 'flex', color: '#FFFFFF' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </a>

              </div>

              {/* Copyright */}
              <div style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.03em',
              }}>
                © 2026 Rapivio. All rights reserved.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
