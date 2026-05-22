import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { RevealWrapper } from './ui/RevealWrapper';
import { AmbientLight } from './ui/AmbientLight';

interface Stat {
  value: string;
  label: string;
}

interface CaseStudy {
  company: string;
  industry: string;
  quote: string;
  stats: [Stat, Stat, Stat, Stat];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    company: 'PhysioFlow',
    industry: 'Healthcare',
    quote: 'Rapivio cut our lead response time from 2 days to under a minute.',
    stats: [
      { value: '3×', label: 'Leads Captured' },
      { value: '94%', label: 'Follow-Up Rate' },
      { value: '<60s', label: 'Response Time' },
      { value: '2 Mo.', label: 'ROI' },
    ],
  },
  {
    company: 'LegalEdge',
    industry: 'Law Firm',
    quote: 'We used to lose clients to faster firms. Not anymore.',
    stats: [
      { value: '5×', label: 'More Consultations' },
      { value: '80%', label: 'Less Manual Work' },
      { value: '40%', label: 'Close Rate' },
      { value: '6 Wks', label: 'ROI' },
    ],
  },
  {
    company: 'FitCore Studios',
    industry: 'Fitness',
    quote: 'Our DMs are handled automatically. We just show up and coach.',
    stats: [
      { value: '200+', label: 'Leads/Month' },
      { value: '70%', label: 'Conversion Lift' },
      { value: '0', label: 'Missed Follow-Ups' },
      { value: '3 Mo.', label: 'ROI' },
    ],
  },
  {
    company: 'BrightSmile Dental',
    industry: 'Healthcare',
    quote: 'Appointment bookings went up 60% in the first month.',
    stats: [
      { value: '60%', label: 'More Bookings' },
      { value: '88%', label: 'Show Rate' },
      { value: '24/7', label: 'Lead Capture' },
      { value: '45d', label: 'ROI' },
    ],
  },
];

function Card({ company, industry, quote, stats }: CaseStudy) {
  return (
    <div
      style={{
        padding: '1px',
        borderRadius: '1.3rem',
        background: 'linear-gradient(135deg, rgba(223, 172, 232, 0.35) 0%, rgba(223, 172, 232, 0.05) 50%, rgba(223, 172, 232, 0.2) 100%)',
        flexShrink: 0,
        minWidth: '320px',
        boxShadow: '0 0 0 1px rgba(223, 172, 232, 0.08), 0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1.25rem',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {/* Inner top glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(223, 172, 232, 0.4), transparent)',
          filter: 'blur(3px)',
          zIndex: 0,
        }} />

        {/* Radial corner glow */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '-40px',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(223, 172, 232, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Content wrapper */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Company + industry tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.125rem' }}>
              {company}
            </span>
            <span
              style={{
                background: 'rgba(223, 172, 232, 0.08)',
                border: '1px solid rgba(223, 172, 232, 0.2)',
                borderRadius: '999px',
                padding: '0.3rem 0.85rem',
                fontSize: '0.8rem',
                color: '#dface8',
                display: 'inline-block',
                fontWeight: 500,
              }}
            >
              {industry}
            </span>
          </div>

          {/* Quote */}
          <p
            style={{
              color: '#AAAAAA',
              fontSize: '0.875rem',
              fontStyle: 'italic',
              lineHeight: 1.7,
              marginTop: '1rem',
            }}
          >
            "{quote}"
          </p>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginTop: '1.5rem',
            }}
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(223, 172, 232, 0.06)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem',
                }}
              >
                <p style={{ color: '#dface8', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>
                  {value}
                </p>
                <p style={{ color: '#AAAAAA', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '200px' });
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const speed = useRef(0.5);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isInView) return;
    const totalWidth = track.scrollWidth / 2;

    const tick = () => {
      posRef.current += speed.current;
      if (posRef.current >= totalWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isInView]);

  const CARDS = [...CASE_STUDIES, ...CASE_STUDIES];

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="section-fade-bottom"
      style={{
        background: '#000000',
        padding: '7rem 0',
        width: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <AmbientLight color="rgb(223, 172, 232)" opacity={0.9} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header — constrained width */}
        <RevealWrapper variant="fade-up">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', marginBottom: '3rem' }}>
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
            CASE STUDIES
          </p>
          <h2
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
            }}
          >
            Real results,<br />real businesses.
          </h2>
        </div>
      </RevealWrapper>

      {/* Auto-scrolling carousel */}
      <div
        style={{
          background: 'transparent',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
          paddingRight: '1.5rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <div
          ref={trackRef}
          onMouseEnter={() => { speed.current = 0.1; }}
          onMouseLeave={() => { speed.current = 0.5; }}
          style={{
            display: 'flex',
            gap: '1.5rem',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {CARDS.map((cs, i) => (
            <Card key={`${cs.company}-${i}`} {...cs} />
          ))}
        </div>
        
        {/* Left fade */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '70px',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '70px',
          height: '100%',
          background: 'linear-gradient(270deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }} />
      </div>
      </div>
    </section>
  );
}
