import { useEffect } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
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

function HomePage() {
  return (
    <>
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
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ background: '#000000' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
      </Routes>
    </div>
  )
}

export default App
