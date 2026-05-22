import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealWrapper } from './ui/RevealWrapper';
import { AmbientLight } from './ui/AmbientLight';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The AI follow-up system paid for itself in the first week. We captured three clients we would have lost.",
    name: "Sarah K.",
    role: "Director @ PhysioFlow",
  },
  {
    quote: "I was skeptical about AI. Now I can't imagine running the business without it.",
    name: "James T.",
    role: "Founder @ LegalEdge",
  },
  {
    quote: "Setup was fast, the team was responsive, and the results were immediate.",
    name: "Priya M.",
    role: "Owner @ FitCore Studios",
  },
  {
    quote: "Our booking rate jumped 60% and we didn't have to hire anyone new.",
    name: "Dr. Arjun S.",
    role: "Principal @ BrightSmile Dental",
  },
  {
    quote: "Rapivio didn't just automate our workflow — they made us look like a tech company. Our clients noticed immediately.",
    name: "Marcus L.",
    role: "CEO @ NovaBuild Agency",
  },
];

function TestimonialCard({ quote, name, role }: Testimonial) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 1 }}
      style={{ height: '100%' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#000000',
          border: `1px solid ${hovered ? '#dface8' : '#2A114B'}`,
          borderRadius: '1rem',
          padding: '2rem',
          transition: 'border-color 300ms',
          height: '100%',
        }}
      >
        <div
          style={{
            color: '#dface8',
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: 'serif',
            marginBottom: '0.5rem',
          }}
        >
          "
        </div>
        <p
          style={{
            color: '#AAAAAA',
            fontSize: '0.875rem',
            lineHeight: 1.7,
          }}
        >
          {quote}
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <p
            style={{
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            {name}
          </p>
          <p
            style={{
              color: '#AAAAAA',
              fontSize: '0.75rem',
              marginTop: '0.125rem',
            }}
          >
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    setCurrent((idx + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (!isMobile) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCardGridStyle = (idx: number) => {
    const baseStyle = { height: '100%' };
    if (isMobile) {
      return {
        ...baseStyle,
        gridColumn: 'auto',
        gridRow: 'auto',
      };
    }

    switch (idx) {
      case 0:
        return {
          ...baseStyle,
          gridColumn: '1 / 3',
          gridRow: '1',
        };
      case 1:
        return {
          ...baseStyle,
          gridColumn: '3 / 4',
          gridRow: '1',
        };
      case 2:
        return {
          ...baseStyle,
          gridColumn: '4 / 5',
          gridRow: '1 / 3',
        };
      case 3:
        return {
          ...baseStyle,
          gridColumn: '1 / 2',
          gridRow: '2',
        };
      case 4:
        return {
          ...baseStyle,
          gridColumn: '2 / 4',
          gridRow: '2',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <section
      className="section-fade-bottom"
      style={{
        background: '#000000',
        padding: '7rem 1.5rem',
        width: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <AmbientLight color="rgb(223, 172, 232)" opacity={0.9} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <RevealWrapper variant="scale-in">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <p
              style={{
                color: '#dface8',
                fontSize: '1.13rem',
                letterSpacing: '0.2em',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              TESTIMONIALS
            </p>
            <h2
              style={{
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                lineHeight: 1.15,
              }}
            >
              Trusted by founders
              <br />
              who move fast.
            </h2>
          </div>
        </RevealWrapper>

        {/* Testimonials grid */}
        {isMobile ? (
          <div style={{ marginTop: '3rem' }}>
            {/* Carousel */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ padding: '0 0.25rem' }}
                >
                  <TestimonialCard {...TESTIMONIALS[current]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => goTo(current - 1)}
                style={{
                  background: 'transparent',
                  border: '1px solid #2A114B',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#dface8',
                }}
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === current ? '20px' : '6px',
                      height: '6px',
                      borderRadius: '9999px',
                      background: i === current ? '#dface8' : '#2A114B',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                    aria-label={`Go to ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(current + 1)}
                style={{
                  background: 'transparent',
                  border: '1px solid #2A114B',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#dface8',
                }}
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              marginTop: '4rem',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr',
              gridTemplateRows: 'auto auto',
              gap: '1.25rem',
            }}
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <RevealWrapper
                key={idx}
                variant="fade-up"
                delay={idx * 0.1}
                style={getCardGridStyle(idx)}
              >
                <TestimonialCard {...testimonial} />
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
