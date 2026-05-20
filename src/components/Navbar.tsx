import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, GitBranch, BookOpen, Mail, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  { text: 'Home', href: '#hero', id: 'hero', icon: Home },
  { text: 'About', href: '#about', id: 'about', icon: User },
  { text: 'Services', href: '#services', id: 'services', icon: Briefcase },
  { text: 'Process', href: '#process', id: 'process', icon: GitBranch },
  { text: 'Case Studies', href: '#case-studies', id: 'case-studies', icon: BookOpen },
  { text: 'Contact', href: '#contact', id: 'contact', icon: Mail },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [dockOpen, setDockOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'process', 'case-studies', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (scrollY < 40) {
      setActiveSection('hero');
    }
  }, [scrollY]);

  if (location.pathname === '/book') return null;

  const scrolled = scrollY >= 40;

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
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.text}
                href={item.href}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.05 }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
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
          <button onClick={() => navigate('/book')} className="hidden md:inline-flex btn-primary">Book a Call</button>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden flex items-center justify-center text-[#FFFFFF] hover:opacity-80 p-1"
            aria-label="Toggle menu"
            onClick={() => setDockOpen(!dockOpen)}
          >
            <ChevronDown
              size={24}
              style={{
                transform: dockOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Floating Dock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: dockOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          pointerEvents: dockOpen ? 'auto' : 'none',
        }}
        className="fixed top-[76px] left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-40 bg-black/60 border border-[#FFFFFF]/10 backdrop-blur-xl rounded-2xl px-4 py-3 md:hidden"
      >
        <div className="grid grid-cols-3 gap-3 text-center">
          {NAV_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.text}
                href={item.href}
                whileTap={{ scale: 0.88 }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setDockOpen(false);
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'text-[#FFFFFF] bg-[#FFFFFF]/15 font-semibold'
                    : 'text-[rgba(255,255,255,0.6)] opacity-50 hover:opacity-80'
                }`}
              >
                <IconComponent size={20} className="mb-1" />
                <span className="text-[10px] uppercase tracking-wider">{item.text}</span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
